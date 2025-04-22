import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useCreateBanner } from '../../../hooks/admin/Bannerhooks';
import { toast } from 'react-toastify';

const Addbanner = ({ onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [titleImage, setTitleImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { createBanner } = useCreateBanner();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTitleImage(file);
    }
  };

  const resetForm = () => {
    setTitle('');
    setTitleImage(null);
  };

  const handleClose = () => {
    resetForm();
    if (onClose) onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !titleImage || title === '') {
      toast.warning('Please select a screen type and upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('bannerImage', titleImage);

    setLoading(true);
    try {
      await createBanner(formData);
      toast.success('Banner added successfully!');
      if (onSuccess) onSuccess();
      handleClose();
    } catch (err) {
      console.error(err);
      toast.error('Failed to upload banner');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md transition-all transform scale-100 animate-fadeIn">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Add Banner</h2>
          <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="screenType" className="block text-sm font-medium text-gray-700 mb-1">
              Screen Type
            </label>
            <select
              id="screenType"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select screen type</option>
              <option value="mobile">📱 Mobile Screen</option>
              <option value="desktop">💻 Desktop/Large Screen</option>
            </select>
          </div>

          <div>
            <label htmlFor="titleImage" className="block text-sm font-medium text-gray-700 mb-1">
              Title Image
            </label>
            <input
              id="titleImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {titleImage && (
              <img
                src={URL.createObjectURL(titleImage)}
                alt="Preview"
                className="mt-2 h-32 rounded shadow border object-cover"
              />
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
            >
              {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addbanner;
