import React from 'react';
import { Play } from 'lucide-react';

const AboutUs = () => {
  return (
    <>
      <div className="bg-white text-gray-800 font-sans">
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
          <h1 className="text-5xl font-bold mb-4">About us</h1>
          <div className="flex items-center text-blue-500">
            <span>HOME</span>
            <span className="mx-2">»</span>
            <span>ABOUT US</span>
          </div>
        </div>
      </div>

        {/* Testimonial Section */}
        <div className="bg-violet-100 text-gray-900 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col items-center text-center">
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light mb-8 max-w-4xl italic">
                "Working with <span className="font-semibold">Rufflevo</span> helped us realize projects that are creative and
                researchable. Their work is always excellent. We enjoy how they build all the
                study cases and make them like a puzzle. Then, we have the product like magic."
              </blockquote>
              <div>
                <p className="font-semibold text-xl">Jacon Somber</p>
                <p className="text-gray-600">Founder of Narina Studio</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vision, Mission, Values */}
        <div className="bg-violet-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Vision */}
              <div className="bg-white p-8 shadow-md rounded-lg">
                <div className="w-12 h-12 bg-violet-200 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-violet-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Our Vision</h3>
                <p className="text-gray-700">
                  To be the leading technology solutions provider, transforming businesses through innovative digital solutions and creating lasting value for our clients worldwide.
                </p>
              </div>

              {/* Mission */}
              <div className="bg-white p-8 shadow-md rounded-lg">
                <div className="w-12 h-12 bg-violet-200 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-violet-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                <p className="text-gray-700">
                  To empower businesses with cutting-edge technology solutions that drive growth, efficiency, and innovation while maintaining the highest standards of quality and customer satisfaction.
                </p>
              </div>

              {/* Values */}
              <div className="bg-white p-8 shadow-md rounded-lg">
                <div className="w-12 h-12 bg-violet-200 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-violet-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Our Values</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Innovation & Excellence</li>
                  <li>• Customer-Centric Approach</li>
                  <li>• Integrity & Transparency</li>
                  <li>• Continuous Improvement</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
