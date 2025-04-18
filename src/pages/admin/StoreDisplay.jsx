import React, { useState } from 'react';
import {
    MapPin, Trash2, User, Phone, Mail, Home, Tag,
    Clock, Star, Search, Plus, Image as ImageIcon, ChevronRight, X
} from 'lucide-react';

import Addstoreads from '../../components/admin/forms/Addstoreads';
import { useDeleteStoreads, useGetStoreads } from '../../hooks/admin/Storeads';
import { useParams } from 'react-router-dom';
import DeleteConfirmation from '../../components/common/DeleteConfirmation';

const StoreDisplay = () => {
    const [showAddStore, setShowAddStore] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAd, setSelectedAd] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [adToDelete, setAdToDelete] = useState(null);
    const { id } = useParams();
    const { storeads, refetch, loading } = useGetStoreads(id);
    const { deleteStoreads } = useDeleteStoreads();

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

    const handleDeleteClick = (adId) => {
        setAdToDelete(adId);
    };

    const handleConfirmDelete = async () => {
        if (adToDelete) {
            await deleteStoreads(adToDelete);
            refetch();
            setAdToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setAdToDelete(null);
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
        <div className="min-h-screen bg-gray-50 py-6 md:px-4 sm:px-6 lg:py-8 lg:px-8 max-w-7xl mx-auto">
            {/* Store Header */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                <div className="relative h-48 md:h-56 lg:h-64">
                    <img
                        src={storeData.logoUrl}
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
                    <div className="bg-white rounded-xl shadow-sm p-5">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <User className="w-5 h-5 text-gray-500 mr-2" />
                            Store Owner
                        </h2>
                        <p className="text-gray-700 font-medium">{storeData.ownerName}</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-5">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <Phone className="w-5 h-5 text-gray-500 mr-2" />
                            Contact Info
                        </h2>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <a href={`tel:${storeData.contact}`} className="text-blue-600 hover:text-blue-800 font-medium">
                                    {storeData.contact}
                                </a>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <a href={`mailto:${storeData.email}`} className="text-blue-600 hover:text-blue-800 font-medium">
                                    {storeData.email}
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-5">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                            <Home className="w-5 h-5 text-gray-500 mr-2" />
                            Address
                        </h2>
                        <p className="text-gray-700">{storeData.address}</p>
                        <div className="mt-4">
                            <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                                View on map <ChevronRight className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="relative flex-grow">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search ads by title or description..."
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={() => setShowAddStore(true)}
                                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm whitespace-nowrap"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Add New Ad
                            </button>
                        </div>
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
                                        className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer relative"
                                        onClick={() => openImageModal(ad)}
                                    >
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteClick(ad._id);
                                            }}
                                            className="absolute top-2 right-2 z-10 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                            title="Delete this ad"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>

                                        <div className="relative h-48 bg-gray-100">
                                            {ad.adsImages && ad.adsImages.length > 0 ? (
                                                <img
                                                    src={ad.adsImages[0]}
                                                    alt={`Ad ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                                    <ImageIcon className="w-12 h-12 text-gray-400" />
                                                </div>
                                            )}
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                                                <span className="text-xs bg-white text-gray-800 px-2 py-1 rounded">
                                                    {new Date(ad.startDate).toLocaleDateString()} - {new Date(ad.endDate).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-medium text-lg text-gray-800 mb-2">{ad.offerType || 'Special Offer'}</h3>
                                            <p className="text-gray-600 mb-4 line-clamp-2">{ad.description || 'No description provided'}</p>
                                            <div className="flex justify-between items-center">
                                                <span className="inline-flex items-center text-sm text-gray-500">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    {new Date(ad.createdAt).toLocaleDateString()}
                                                </span>
                                                <button
                                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        openImageModal(ad);
                                                    }}
                                                >
                                                    View details
                                                </button>
                                            </div>
                                        </div>
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
                            {/* Image Gallery */}
                            <div className="mb-6">
                                {selectedAd.adsImages && selectedAd.adsImages.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {selectedAd.adsImages.map((img, idx) => (
                                            <div key={idx} className="rounded-lg overflow-hidden">
                                                <img
                                                    src={img}
                                                    alt={`Ad image ${idx + 1}`}
                                                    className="w-full h-64 object-cover"
                                                />
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
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {adToDelete && (
                <DeleteConfirmation
                    itemName="ad"
                    onCancel={handleCancelDelete}
                    onDelete={handleConfirmDelete}
                />
            )}
        </div>
    );
};

export default StoreDisplay;