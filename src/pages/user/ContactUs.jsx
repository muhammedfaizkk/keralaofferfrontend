import React, { useState } from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { useContactSubmit } from '../../hooks/user/Contacthooks';
import { toast } from 'react-toastify';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const { submitContact, loading } = useContactSubmit();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter your email');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!formData.phone.trim()) {
      toast.error('Please enter your phone number');
      return false;
    }
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      toast.error('Please enter a valid 10-digit phone number');
      return false;
    }
    if (!formData.service) {
      toast.error('Please select a service');
      return false;
    }
    if (!formData.message.trim()) {
      toast.error('Please enter your message');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await submitContact(formData);
      toast.success('Message sent successfully!');
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    } catch (error) {
      toast.error(error.message || 'Failed to send message');
    }
  };

  return (
    <>
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

      {/* Info Cards Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Address Card */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Address</h3>
              <a href="https://g.co/kgs/qweF48p" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline block">
                Perumba, Payyanur
              </a>
            </div>
            {/* Contact Info Card */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Contact Info</h3>
              <p className="text-gray-600">+91 8921016178</p>
            </div>
            {/* Opening Hours Card */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Opening Hours</h3>
              <p className="text-gray-600">Mon to Sat: 10:00am - 5:00pm</p>
              <p className="text-gray-600">Sunday <span className="text-blue-600">Closed</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form and Map Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full p-4 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full p-4 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full p-4 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select 
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full p-4 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Service</option>
                  <option value="myshop">Advertise my shop</option>
                  <option value="enquire">Enquire About An Offer</option>
                  <option value="complaint">Complaint About An Offer</option>
                </select>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write Message..."
                  className="w-full p-4 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                <button 
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-blue-600 text-white py-4 rounded-lg font-bold transition
                    ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                >
                  {loading ? 'SENDING MESSAGE...' : 'SEND MESSAGE NOW'}
                </button>
              </form>
            </div>

            {/* Map */}
            <div className="h-full">
              <div className="rounded-lg overflow-hidden shadow-lg h-full">
                <iframe
                  src="https://www.google.com/maps?q=Perumba,+Payyanur&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Perumba, Payyanur Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;