import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useCreatestorecategory, useUpdatestorecategory } from '../../../hooks/admin/Storecategory';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addstorecategory = ({ onClose, editData }) => {
  const [storeCategory, setStoreCategory] = useState('');
  const [catPhotographs, setCatPhotographs] = useState([]);
  const [uploading, setUploading] = useState(false);
  const isEdit = Boolean(editData);

  const { createCategory, loading: creating } = useCreatestorecategory();
  const { updateCategory, loading: updating } = useUpdatestorecategory();

  // Set initial data when editing
  useEffect(() => {
    if (editData) {
      setStoreCategory(editData.title || '');
      setCatPhotographs(editData.catPhotographs || []);
    }
  }, [editData]);

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      catPhotographs.forEach(img => {
        if (typeof img === 'string' && img.startsWith('blob:')) {
          URL.revokeObjectURL(img);
        }
      });
    };
  }, []);

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files.length === 0) return;

    setUploading(true);
    try {
      // Store the actual file objects instead of creating URLs
      const newFiles = Array.from(files);
      setCatPhotographs(prev => [...prev, ...newFiles]);
    } catch (err) {
      toast.error('Failed to process images');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setCatPhotographs(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!storeCategory.trim()) {
      toast.error('Please enter a store category.');
      return;
    }
    
    try {
      const formData = new FormData();
      formData.append('title', storeCategory);
      
      // Handle both new file uploads and existing image URLs
      catPhotographs.forEach((photo) => {
        if (photo instanceof File) {
          // For newly uploaded files
          formData.append('catPhotographs', photo);
        } else if (typeof photo === 'string') {
          // For existing image URLs from the database
          formData.append('existingPhotos', photo);
        }
      });
      
      if (isEdit) {
        await updateCategory(editData._id, formData);
        toast.success('Store category updated successfully!');
      } else {
        await createCategory(formData);
        toast.success('Store category created successfully!');
      }
      
      setStoreCategory('');
      setCatPhotographs([]);
      onClose();
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md">
        {(creating || updating || uploading) && (
          <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10 rounded-lg">
            <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-8 h-8 animate-spin"></div>
          </div>
        )}

        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">
            {isEdit ? 'Edit Store Category' : 'Add Store Category'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Store Category</label>
            <input
              type="text"
              value={storeCategory}
              onChange={(e) => setStoreCategory(e.target.value)}
              placeholder="Type category name"
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              accept="image/*"
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={uploading}
            />
            <div className="mt-2 grid grid-cols-3 gap-2">
              {catPhotographs.map((img, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={img instanceof File ? URL.createObjectURL(img) : img} 
                    alt={`Category ${index}`}
                    className="w-full h-20 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={creating || updating || uploading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {isEdit ? (updating ? 'Updating...' : 'Update') : (creating ? 'Submitting...' : 'Submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addstorecategory;