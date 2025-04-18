import React, { useState, useEffect } from 'react';
import { X, Loader2, Image as ImageIcon } from 'lucide-react';
import { useCreateStoreads, useUpdateStoreads } from '../../../hooks/admin/Storeads';
import { useGetOffertypes } from '../../../hooks/admin/Offertypehooks';
import { toast } from 'react-toastify';
import { MdDescription } from 'react-icons/md';
import { useParams } from 'react-router-dom';

const Addstoreads = ({ onClose, onSuccess, editData }) => {
    const { id } = useParams()
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [offerType, setOfferType] = useState('');
    const [adsImages, setAdsImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [description, setDescription] = useState('');
    const { createStoreads, loading: createLoading } = useCreateStoreads();
    const { updateStoreads, loading: updateLoading } = useUpdateStoreads();
    const { offertypes } = useGetOffertypes();

    const loading = createLoading || updateLoading;

    useEffect(() => {
        if (editData) {
            setStartDate(editData.startDate?.split('T')[0] || '');
            setEndDate(editData.endDate?.split('T')[0] || '');
            setOfferType(editData.offerType || '');
            setDescription(editData.description || '');
            setExistingImages(editData.adsImages || []);
        }
    }, [editData]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const remainingSlots = 5 - existingImages.length;

        if (files.length > remainingSlots) {
            toast.warning(`You can only upload ${remainingSlots} more image(s) (max 5 total).`);
            return;
        }

        // Validate image types and sizes
        const validFiles = files.filter(file => {
            if (!file.type.startsWith('image/')) {
                toast.warning(`File ${file.name} is not an image and was skipped.`);
                return false;
            }
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast.warning(`Image ${file.name} is too large (max 5MB).`);
                return false;
            }
            return true;
        });

        setAdsImages(prev => [...prev, ...validFiles]);
    };

    const removeImage = (index, isExisting) => {
        if (isExisting) {
            setExistingImages(prev => prev.filter((_, i) => i !== index));
        } else {
            setAdsImages(prev => prev.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!startDate || !endDate || !offerType || !description) {
            toast.warning('Please fill all required fields.');
            return;
        }

        if (new Date(endDate) < new Date(startDate)) {
            toast.warning('End date cannot be before start date.');
            return;
        }

        if (adsImages.length === 0 && existingImages.length === 0) {
            toast.warning('Please upload at least one image.');
            return;
        }

        const formData = new FormData();
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);
        formData.append('offerType', offerType);
        formData.append('description', description);

        adsImages.forEach((image) => {
            formData.append('adsImages', image);
        });

        existingImages.forEach(image => {
            formData.append('existingImages', image);
        });

        try {
            if (editData) {
                await updateStoreads(editData._id, formData);
                toast.success('Ad updated successfully!');
            } else {
                await createStoreads(formData, id);
                toast.success('Ad created successfully!');
            }

            if (onSuccess) onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            toast.error(err.message || 'Failed to save ad');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl md:max-w-4xl transition-all transform scale-100 animate-fadeIn my-8">
                <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {editData ? 'Edit Store Ad' : 'Add New Store Ad'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                        aria-label="Close modal"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Start Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    required
                                    min={new Date().toISOString().split('T')[0]}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    End Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={endDate}
                                    min={startDate || new Date().toISOString().split('T')[0]}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Offer Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={offerType}
                                    onChange={(e) => setOfferType(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                    required
                                >
                                    <option value="" disabled>Select offer type</option>
                                    {offertypes && offertypes.map((offer) => (
                                        <option key={offer._id} value={offer.title}>
                                            {offer.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                        placeholder="Enter a detailed description for the ad..."
                                        required
                                        rows={4}
                                    />
                                    <MdDescription className="absolute right-3 top-3 text-gray-400" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ad Images <span className="text-red-500">*</span>
                                    <span className="text-xs text-gray-500 ml-1">(Max 5 images, 5MB each)</span>
                                </label>

                                <label className={`flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer transition-all ${existingImages.length + adsImages.length >= 5 ? 'border-gray-200 bg-gray-50' : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'}`}>
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                                        <p className="text-sm text-gray-600">
                                            {existingImages.length + adsImages.length >= 5 ?
                                                'Maximum images reached' :
                                                'Click to upload or drag and drop'}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            PNG, JPG up to 5MB
                                        </p>
                                        <p className="text-xs text-blue-600 mt-1">
                                            {5 - existingImages.length - adsImages.length} slots remaining
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg, image/jpg"
                                        multiple
                                        onChange={handleImageChange}
                                        className="hidden"
                                        disabled={existingImages.length + adsImages.length >= 5}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Image Previews */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium text-gray-700">
                            Selected Images ({existingImages.length + adsImages.length}/5)
                        </h3>

                        {existingImages.length === 0 && adsImages.length === 0 ? (
                            <div className="text-center py-4 text-gray-500">
                                No images selected yet
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                {existingImages.map((image, index) => (
                                    <div key={`existing-${index}`} className="relative group">
                                        <img
                                            src={image}
                                            alt={`Existing ${index}`}
                                            className="h-32 w-full rounded-lg shadow-sm border object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index, true)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            aria-label="Remove image"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}

                                {adsImages.map((image, index) => (
                                    <div key={`new-${index}`} className="relative group">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`Preview ${index}`}
                                            className="h-32 w-full rounded-lg shadow-sm border object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index, false)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            aria-label="Remove image"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                                            {image.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Form Actions */}
                    <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-6 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <span>{editData ? 'Update Ad' : 'Create Ad'}</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Addstoreads;