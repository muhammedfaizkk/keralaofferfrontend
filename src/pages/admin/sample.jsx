import React, { useState } from 'react';
import {
    MapPin, User, Phone, Mail, Home, Tag,
    Clock, Star, Search, Plus, Image as ImageIcon,
    ChevronRight, X, Trash2
} from 'lucide-react';
import Addstoreads from '../../components/admin/forms/Addstoreads';
import { useGetStoreads, useDeleteAdImage } from '../../hooks/admin/Storeads';
import { useParams } from 'react-router-dom';

const StoreDisplay = () => {
    const [showAddStore, setShowAddStore] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAd, setSelectedAd] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const { id } = useParams();
    const { storeads, refetch, loading } = useGetStoreads(id);
    const { deleteImage } = useDeleteAdImage();

    const onClose = () => setShowAddStore(false);
    const onSuccess = () => {
        setShowAddStore(false);
        refetch();
    };

    const filteredAds = storeads?.filter(ad =>
        ad.offerType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ad.description?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    const openImageModal = (ad) => {
        setSelectedAd(ad);
        setShowImageModal(true);
    };

    const handleDeleteImage = async (adId, imageUrl) => {
        try {
            await deleteImage({ adId, imageUrl });
            refetch(); // Refresh the data after deletion
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!storeads || storeads.length === 0) {
        return (
            <div className="min-h-screen py-6 px-4 sm:px-6 lg:py-8 lg:px-8 max-w-7xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <ImageIcon className="w-12 h-12 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">No Ads Found</h2>
                    <p className="text-gray-600 mb-6">This store doesn't have any active ads yet.</p>
                    <button
                        onClick={() => setShowAddStore(true)}
                        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        Create First Ad
                    </button>
                </div>
                {showAddStore && <Addstoreads onClose={onClose} onSuccess={onSuccess} />}
            </div>
        );
    }

    const storeData = storeads[0].storeId;
    const storeLocation = storeads[0].storeId.location;

    return (
        <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:py-8 lg:px-8 max-w-7xl mx-auto">
            {/* Store Header */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                <div className="relative h-48 md:h-56 lg:h-64">
                    <img
                        src={storeData.logoUrl || '/default-store.jpg'}
                        alt={storeData.storeName}
                        className="absolute w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                        <div className="absolute bottom-0 left-0 w-full p-6">
                            <div className="flex flex-col md:flex-row md:items-end md:justify-between">
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">{storeData.storeName}</h1>
                                    <div className="flex items-center">
                                        <Tag className="w-4 h-4 text-white mr-2" />
                                        <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs sm:text-sm backdrop-blur-sm">
                                            {storeData.category || 'General Store'}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0 flex items-center bg-white/90 backdrop-blur rounded-lg px-4 py-2 shadow-sm">
                                    <MapPin className="w-5 h-5 text-blue-500 mr-2" />
                                    <span className="font-medium text-gray-800">{storeData.district || 'Unknown Location'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar - Store Info */}
                <div className="lg:col-span-1 space-y-6">
                    {/* ... (keep the existing sidebar content unchanged) ... */}
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3">
                    {/* Search and Actions */}
                    <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
                        {/* ... (keep the existing search bar unchanged) ... */}
                    </div>

                    {/* Ads Section */}
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="border-b border-gray-200 p-5">
                            <h2 className="text-xl font-semibold text-gray-800">Current Ads ({filteredAds.length})</h2>
                        </div>

                        {filteredAds.length === 0 ? (
                            <div className="p-8 text-center">
                                <Search className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-lg font-medium text-gray-900">No ads found</h3>
                                <p className="mt-1 text-gray-500">Try adjusting your search query</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5">
                                {filteredAds.map((ad, index) => (
                                    <div
                                        key={index}
                                        className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
                                        onClick={() => openImageModal(ad)}
                                    >
                                        {/* ... (keep the existing ad card content unchanged) ... */}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Store Modal */}
            {showAddStore && <Addstoreads onClose={onClose} onSuccess={onSuccess} />}

            {/* Image Modal */}
            {showImageModal && selectedAd && (
                <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
                        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                            <h3 className="text-xl font-semibold">{selectedAd.offerType || 'Ad Details'}</h3>
                            <button
                                onClick={() => setShowImageModal(false)}
                                className="p-1 rounded-full hover:bg-gray-100"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6">
                            {/* Image Gallery with Delete Buttons */}
                            <div className="mb-6">
                                {selectedAd.adsImages && selectedAd.adsImages.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {selectedAd.adsImages.map((img, idx) => (
                                            <div key={idx} className="relative group rounded-lg overflow-hidden">
                                                <img
                                                    src={img}
                                                    alt={`Ad image ${idx + 1}`}
                                                    className="w-full h-64 object-cover"
                                                />
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteImage(selectedAd._id, img);
                                                    }}
                                                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                                                    title="Delete image"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                                        <ImageIcon className="w-12 h-12 text-gray-400" />
                                        <span className="ml-2 text-gray-500">No images available</span>
                                    </div>
                                )}
                            </div>

                            {/* Ad Details */}
                            <div className="space-y-4">
                                {/* ... (keep the existing ad details unchanged) ... */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoreDisplay;