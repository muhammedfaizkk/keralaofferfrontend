import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import Header from '../../components/user/Header';

function ContactUs() {
  return (
    <>
      <Header />
      {/* Hero Section */}
      <div className="relative bg-black text-white">
        <div className="absolute inset-0">
          <img 
            src="/Images/contact-hero.jpg" 
            alt="Contact Us" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <h1 className="text-5xl font-bold mb-4">Contact us</h1>
          <div className="flex items-center text-blue-500">
            <span>HOME</span>
            <span className="mx-2">»</span>
            <span>CONTACT US</span>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Address Card */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Address</h3>
              <p className="text-gray-600">67GR+XV2, Unnamed Road, Chatmohar</p>
            </div>

            {/* Contact Info Card */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Contact Info</h3>
              <p className="text-gray-600">+ 163-6589-9654</p>
              <p className="text-gray-600">info@fitkit.com</p>
            </div>

            {/* Opening Hours Card */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Opening Hours</h3>
              <p className="text-gray-600">Mon to Sat: 6AM - 8PM</p>
              <p className="text-gray-600">Sunday <span className="text-blue-600">Closed</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-4 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-4 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full p-4 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select className="w-full p-4 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Service</option>
                  <option value="1">Personal Training</option>
                  <option value="2">Group Classes</option>
                  <option value="3">Nutrition Consultation</option>
                </select>
                <textarea
                  rows="4"
                  placeholder="Write Message..."
                  className="w-full p-4 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition">
                  SEND MESSAGE NOW
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="hidden md:block">
              <img
                src="/Images/contact-form.jpg"
                alt="Contact"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;