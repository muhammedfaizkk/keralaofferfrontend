import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaClock } from 'react-icons/fa';
import Header from '../../components/user/Header';

function ContactUs() {
  return (
    <>
      <Header />
      <div className="w-full text-center py-6 bg-white shadow">
        <h1 className="text-4xl font-bold text-violet-700 uppercase tracking-wide">Contact Us</h1>
      </div>

      <div className="flex flex-col items-center justify-center px-4 py-8 font-sans bg-gray-100">
        <div className="w-full max-w-6xl flex flex-col gap-6">

          {/* Info Cards Row */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Address Card */}
            <div className="bg-white shadow-md p-6 rounded-lg flex-1 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
                <FaMapMarkerAlt className="text-violet-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Address</h3>
                <p className="text-gray-600">676R+XV2, Unnamed Road, Chatmohar</p>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white shadow-md p-6 rounded-lg flex-1 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
                <FaPhoneAlt className="text-violet-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Contact Info</h3>
                <p className="text-gray-600">+ 163-6589-9654</p>
                <p className="text-gray-600">info@fikit.com</p>
              </div>
            </div>

            {/* Opening Hours Card */}
            <div className="bg-white shadow-md p-6 rounded-lg flex-1 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center">
                <FaClock className="text-violet-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">Opening Hours</h3>
                <p className="text-gray-600">Mon to Sat: 6AM - 8PM</p>
                <p className="text-gray-600">Sunday Closed</p>
              </div>
            </div>
          </div>

          {/* Get In Touch Form */}
          <div className="bg-white shadow-md  p-6 rounded-lg w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Get In Touch!</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Your Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">Your Email</label>
                  <input
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">Select Service</label>
                <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white">
                  <option value="">Select a service</option>
                  <option value="service1">Service 1</option>
                  <option value="service2">Service 2</option>
                  <option value="service3">Service 3</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">Write Message...</label>
                <textarea
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                ></textarea>
              </div>

              <button className="w-full bg-violet-600 text-white px-6 py-3 rounded-md font-bold hover:bg-blue-700 transition mt-4 uppercase tracking-wide">
                Send Message Now
              </button>
            </div>
          </div>
        </div>



        {/* Newsletter Footer */}
        <div className="w-full bg-gray-800 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Column - Newsletter */}
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Subscribe to KeralaOffer</h2>
              <p className="text-xl mb-2">Get exclusive offers and updates on top deals in Kerala!</p>
              <div className="flex mt-6">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 p-3 rounded-l-md text-gray-800 focus:outline-none"
                />
                <button className="bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-r-md font-medium">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Right Column - Brand Info */}
            <div className="md:w-1/2 text-center md:text-right">
              <h3 className="text-4xl font-bold mb-4">Kerala<span className="text-violet-400">Offer</span></h3>
              <p className="text-gray-300 mb-2">
                Discover the best discounts, local deals, and travel offers<br />
                across God's Own Country – Kerala!
              </p>
              <p className="text-xl font-medium text-violet-400">Your Local Savings Partner</p>
              <p className="text-gray-300 mt-2">support@keralaoffer.com</p>
            </div>
          </div>
          {/* Social Icons */}
          <div className="mt-10 text-center">
            <h3 className="text-lg font-semibold text-violet-800 mb-3">Follow Us</h3>
            <div className="flex justify-center gap-4">
              {[FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter].map((Icon, index) => (
                <div
                  key={index}
                  className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow hover:bg-gray-100 cursor-pointer transition border border-gray-200"
                >
                  <Icon className="text-violet-700" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default ContactUs;