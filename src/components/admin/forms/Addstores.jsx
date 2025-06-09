import React, { useState, useEffect } from 'react';
import { X, MapPin, Mail, Phone, User, ShoppingBag, Image as ImageIcon } from 'lucide-react';
import { useGetLocations } from '../../../hooks/admin/ManageDatahooks';
import { useGetstorecategory } from '../../../hooks/admin/Storecategory';
import { useGetLocationByDistrict } from '../../../hooks/admin/ManageDatahooks';
import { useCreateStore, useUpdateStore } from '../../../hooks/admin/Storehooks';
import { toast } from 'react-toastify';

const AddStores = ({ mode = 'add', store = null, onClose, refetch }) => {
    const { locations: allLocations } = useGetLocations();
    const { categories } = useGetstorecategory();
    const { createStore, loading: createLoading } = useCreateStore();
    const { updateStore, loading: updateLoading } = useUpdateStore();

    const [formData, setFormData] = useState({
        storeName: '',
        ownerName: '',
        contact: '',
        email: '',
        address: '',
        district: '',
        location: '',
        category: '',
        logoUrl: null
    });
    console.log('store', store);

    const [errors, setErrors] = useState({
        storeName: false,
        ownerName: false,
        contact: false,
        email: false,
        address: false,
        district: false,
        location: false,
        category: false,
        logoUrl: false
    });

    const [previewImage, setPreviewImage] = useState(null);
    const { location: locations, loading: locationLoading } = useGetLocationByDistrict(formData.district);

    useEffect(() => {
        if (mode === 'edit' && store) {
            setFormData({
                storeName: store.storeName || '',
                ownerName: store.ownerName || '',
                contact: store.contact || '',
                email: store.email || '',
                address: store.address || '',
                district: store.district || '',
                location: store.location?.locationName || '', // Changed to locationName
                category: store.category?.title || '', // Changed to title
                logoUrl: null
            });
            setPreviewImage(store.logoUrl);
        }
    }, [mode, store]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: false }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, logoUrl: file }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {
            storeName: !formData.storeName,
            ownerName: !formData.ownerName,
            contact: !formData.contact,
            email: !formData.email,
            address: !formData.address,
            district: !formData.district,
            location: !formData.location,
            category: !formData.category,
            logoUrl: mode === 'add' && !formData.logoUrl
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some(error => error)) {
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('storeName', formData.storeName);
        formDataToSend.append('ownerName', formData.ownerName);
        formDataToSend.append('contact', formData.contact);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('district', formData.district);
        formDataToSend.append('location', formData.location);
        formDataToSend.append('category', formData.category);
        if (formData.logoUrl) {
            formDataToSend.append('logoUrl', formData.logoUrl);
        }

        try {
            if (mode === 'add') {
                await createStore(formDataToSend);
                toast.success('Store created successfully');
            } else {
                await updateStore(store._id, formDataToSend);
                toast.success('Store updated successfully');
            }
            refetch();
            onClose();
        } catch (error) {
            toast.error(`Failed to ${mode === 'add' ? 'create' : 'update'} store`);
            console.error(`Error ${mode === 'add' ? 'creating' : 'updating'} store:`, error);
        }
    };

    const uniqueDistricts = [...new Set(allLocations?.map(loc => loc.district))];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-2 my-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-semibold">
                        {mode === 'add' ? 'Add New Store' : 'Edit Store'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Close modal"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Store Name *</label>
                                <div className="relative">
                                    <ShoppingBag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <input
                                        type="text"
                                        name="storeName"
                                        value={formData.storeName}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-3 py-2 border ${errors.storeName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="Store Name"
                                    />
                                </div>
                                {errors.storeName && (
                                    <p className="mt-1 text-sm text-red-600">Store name is required</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name *</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <input
                                        type="text"
                                        name="ownerName"
                                        value={formData.ownerName}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-3 py-2 border ${errors.ownerName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="Owner Name"
                                    />
                                </div>
                                {errors.ownerName && (
                                    <p className="mt-1 text-sm text-red-600">Owner name is required</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <input
                                        type="tel"
                                        name="contact"
                                        value={formData.contact}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-3 py-2 border ${errors.contact ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="Contact Number"
                                    />
                                </div>
                                {errors.contact && (
                                    <p className="mt-1 text-sm text-red-600">Contact number is required</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="Email Address"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">Email is required</p>
                                )}
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className={`w-full pl-10 pr-3 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="Address"
                                    />
                                </div>
                                {errors.address && (
                                    <p className="mt-1 text-sm text-red-600">Address is required</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">District *</label>
                                <select
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    className={`w-full py-2 px-3 border ${errors.district ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                >
                                    <option value="">Select District</option>
                                    {uniqueDistricts.map((dist, index) => (
                                        <option key={index} value={dist}>
                                            {dist}
                                        </option>
                                    ))}
                                </select>
                                {errors.district && (
                                    <p className="mt-1 text-sm text-red-600">District is required</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                                <select
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className={`w-full py-2 px-3 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    disabled={!formData.district || locationLoading}
                                >
                                    <option value="">Select Location</option>
                                    {locations?.map((loc) => (
                                        <option key={loc._id} value={loc.locationName}>
                                            {loc.locationName}
                                        </option>
                                    ))}
                                </select>
                                {errors.location && (
                                    <p className="mt-1 text-sm text-red-600">Location is required</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className={`w-full py-2 px-3 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                >
                                    <option value="">Select Category</option>
                                    {categories?.map((cat) => (
                                        <option key={cat._id} value={cat.title}>
                                            {cat.title}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && (
                                    <p className="mt-1 text-sm text-red-600">Category is required</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {mode === 'add' ? 'Store Logo *' : 'Store Logo'}
                        </label>
                        <div className="flex items-center space-x-4">
                            <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                                <div className="flex flex-col items-center justify-center">
                                    <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-500">
                                        {formData.logoUrl ? 'Change image' : 'Click to upload'}
                                    </p>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </label>
                            {previewImage && (
                                <div className="w-20 h-20 rounded-md overflow-hidden border">
                                    <img
                                        src={previewImage}
                                        alt="Store logo preview"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                        {errors.logoUrl && mode === 'add' && (
                            <p className="mt-1 text-sm text-red-600">Store logo is required</p>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end space-x-3 pt-6 pb-2 sticky bottom-0 bg-white">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                            disabled={createLoading || updateLoading}
                        >
                            {mode === 'add'
                                ? (createLoading ? 'Creating...' : 'Add Store')
                                : (updateLoading ? 'Updating...' : 'Update Store')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStores;