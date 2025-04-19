import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { FaLightbulb, FaProjectDiagram, FaChartLine, FaVial } from 'react-icons/fa';

import Header from '../../components/user/Header';

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="bg-white text-gray-800 font-sans">
        {/* About Us Heading */}
        <div className="text-center py-12 bg-white font-nunlic">
          <h1 className="text-5xl font-bold text-violet-800 uppercase ">
            About Us
          </h1>
        </div>

        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-violet-700 to-indigo-800 text-white py-16 px-4 text-left sm:text-center">
          <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold mb-4 leading-snug">
            We help your business grow through powerful ad promotions
          </h1>
          <p className="text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-light">
            Unlock your business potential with custom promotional strategies across Kerala and beyond. We make marketing effective and simple.
          </p>
        </div>

        {/* Testimonial Section - Side-by-side always, even on mobile */}
        <div className="bg-violet-600 text-white py-16 px-6 w-full">
          <div className="max-w-4xl mx-auto flex items-center gap-4 sm:gap-6 text-left flex-row">
            <div className="flex-shrink-0">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Alex Mathews"
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-4 border-white object-cover"
              />
            </div>
            <div className="text-xs sm:text-sm md:text-base leading-relaxed">
              <p className="italic mb-2">
                "Working with <span className="font-semibold text-white">Ruffleyo</span> helped us realize projects that are creative and researchable.
                Their work is always excellent — we enjoy how they build all the study cases and make them like a puzzle. Then, we have the product like magic."
              </p>
              <p className="text-[11px] sm:text-xs font-semibold uppercase text-white/80">
                Alex Mathews — Founder of Creative Minds
              </p>
            </div>
          </div>
        </div>

        {/* Our Mission and Values Section */}
        <div className="bg-gradient-to-r from-violet-700 to-indigo-800 text-white py-16 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
            {/* Our Mission */}
            <div>
              <h2 className="text-3xl font-bold mb-4 font-jakarta">Our Mission</h2>
              <p className="text-sm md:text-base font-light leading-relaxed text-white/90">
                At Ruffleyo, our mission is to empower businesses across Kerala and beyond with innovative and results-driven advertising solutions.
                We aim to simplify marketing while maximizing visibility and growth for every brand we work with.
              </p>
            </div>

            {/* Our Values */}
            <div>
              <h2 className="text-3xl font-bold mb-4 font-jakarta">Our Values</h2>
              <ul className="text-sm md:text-base font-light space-y-3 text-white/90">
                <li>✅ Creativity: Delivering unique and engaging promotional ideas</li>
                <li>✅ Integrity: Transparent and honest collaboration with our clients</li>
                <li>✅ Results-Oriented: Driving measurable impact and growth</li>
                <li>✅ Customer Focus: Personalized solutions tailored to your needs</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold text-violet-700 mb-6">Why Choose Us?</h2>
            <ul className="space-y-4 text-gray-700">
              <li>✅ Tailored promotional solutions for every business type</li>
              <li>✅ Affordable, impactful ad placements</li>
              <li>✅ Dedicated team with proven results</li>
              <li>✅ Trusted by 200+ brands across Kerala</li>
            </ul>
          </div>

          <div>
            <img
              src="https://i.pinimg.com/736x/2d/b5/b2/2db5b2884af57df10b2e448c4546b5ed.jpg"
              alt="About Us Banner"
              className="w-full h-80 object-cover rounded-xl shadow-md"
            />
          </div>
        </div>

        {/* Structured Business Model Section - With Icons */}
        <div className="bg-gradient-to-r from-violet-700 to-indigo-800 py-16 px-6 w-full">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-jakarta">
              They like how we structure their business models
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto text-gray-700">
            <div className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4">
              <div className="text-violet-600 text-3xl">
                <FaLightbulb />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-violet-600 mb-2">Define the strategy</h3>
                <p className="text-sm font-light">
                  A clear and well-defined strategy is essential for achieving success in business. It outlines goals and provides a roadmap for achieving them.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4">
              <div className="text-violet-600 text-3xl">
                <FaProjectDiagram />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-violet-600 mb-2">Re-structure business model</h3>
                <p className="text-sm font-light">
                  Re-structuring can help you streamline operations, eliminate inefficiency, and drive growth. A strategic re-structure can be a powerful tool for success.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4">
              <div className="text-violet-600 text-3xl">
                <FaChartLine />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-violet-600 mb-2">Improve Performance</h3>
                <p className="text-sm font-light">
                  Improving performance is key to achieving success and enhancing the value of the business. There are many strategies that can help improve efficiency.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md flex items-start gap-4">
              <div className="text-violet-600 text-3xl">
                <FaVial />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-violet-600 mb-2">Testing and evaluation</h3>
                <p className="text-sm font-light">
                  This results in higher quality outcomes, increased customer satisfaction, and the ability to compete in the changing marketplace.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
