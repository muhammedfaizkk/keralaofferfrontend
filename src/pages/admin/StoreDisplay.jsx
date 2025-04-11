import React from 'react';
import { MapPin, User, Phone, Mail, Home, Tag, Store, Clock, Star } from 'lucide-react';

export default function StoreDisplay() {
    const storeData = {
        storeName: "Urban Grocery Market",
        ownerName: "Alex Johnson",
        contact: "+1 (555) 123-4567",
        email: "contact@urbangrocery.com",
        address: "123 Main Street, Suite 101",
        location: "San Francisco",
        category: "Grocery & Fresh Food",
        rating: 4.8,
        hours: "8:00 AM - 9:00 PM",
        imageUrl: "/api/placeholder/800/400"
    };

    const otherLocations = ["New York", "Los Angeles", "Chicago", "Houston", "Seattle"];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="relative h-64 lg:h-80">
                        <img src={storeData.imageUrl} alt={storeData.storeName} className="absolute w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent">
                            <div className="absolute bottom-0 left-0 w-full p-6">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <h1 className="text-3xl font-bold text-white">{storeData.storeName}</h1>
                                        <div className="flex items-center mt-2">
                                            <Tag className="w-4 h-4 text-white mr-2" />
                                            <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">{storeData.category}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 md:mt-0 flex items-center bg-white/90 backdrop-blur rounded-lg px-3 py-2">
                                        <Star className="w-5 h-5 text-yellow-500 mr-1" />
                                        <span className="font-bold text-gray-800">{storeData.rating}</span>
                                        <span className="text-gray-500 text-sm ml-1">/ 5</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 lg:p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-6">Store Information</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                                        <div className="flex">
                                            <div className="bg-indigo-100 p-3 rounded-xl">
                                                <User className="w-6 h-6 text-indigo-600" />
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-sm font-medium text-gray-500">Owner Name</h3>
                                                <p className="mt-1 text-base font-medium text-gray-900">{storeData.ownerName}</p>
                                            </div>
                                        </div>

                                        <div className="flex">
                                            <div className="bg-indigo-100 p-3 rounded-xl">
                                                <Phone className="w-6 h-6 text-indigo-600" />
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                                                <p className="mt-1 text-base font-medium text-gray-900">{storeData.contact}</p>
                                            </div>
                                        </div>

                                        <div className="flex">
                                            <div className="bg-indigo-100 p-3 rounded-xl">
                                                <Mail className="w-6 h-6 text-indigo-600" />
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                                                <a href={`mailto:${storeData.email}`} className="mt-1 block text-base font-medium text-indigo-600 hover:text-indigo-800">
                                                    {storeData.email}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex">
                                            <div className="bg-indigo-100 p-3 rounded-xl">
                                                <Clock className="w-6 h-6 text-indigo-600" />
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-sm font-medium text-gray-500">Hours</h3>
                                                <p className="mt-1 text-base font-medium text-gray-900">{storeData.hours}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                                        <h3 className="text-lg font-medium text-gray-800 flex items-center">
                                            <Home className="w-5 h-5 mr-2 text-indigo-600" />
                                            Address
                                        </h3>
                                    </div>
                                    <div className="p-5">
                                        <p className="text-gray-800 font-medium">{storeData.address}</p>
                                        <p className="text-indigo-600 font-medium mt-1">{storeData.location}</p>
                                    </div>
                                </div>

                                <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                                        <h3 className="text-lg font-medium text-gray-800 flex items-center">
                                            <Store className="w-5 h-5 mr-2 text-indigo-600" />
                                            Other Locations
                                        </h3>
                                    </div>
                                    <div className="p-5">
                                        <p className="text-gray-500 mb-3">Select a different store location:</p>
                                        <ul className="space-y-2">
                                            {otherLocations.map((loc, idx) => (
                                                <li key={idx} className="text-indigo-600 hover:text-indigo-800 cursor-pointer">
                                                    {loc}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Ad Section */}
                                <section className="mt-6 grid grid-cols-2 gap-4">
                                    {[1, 2, 3, 4].map((item, idx) => (
                                        <div key={idx} className="bg-gray-50 rounded-xl p-2 shadow-sm">
                                            <h3 className="text-sm font-medium text-gray-700 mb-1">Ad Title {item}</h3>
                                            <img
                                                src={`https://via.placeholder.com/150x100?text=Ad+${item}`}
                                                alt={`Ad ${item}`}
                                                className="w-full h-24 object-cover rounded-md"
                                            />
                                        </div>
                                    ))}
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
