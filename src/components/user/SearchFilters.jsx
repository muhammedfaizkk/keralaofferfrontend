import React, { useState } from 'react';
import { Search, Share2 } from "lucide-react";

function SearchFilters() {
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [selectedValues, setSelectedValues] = useState({});

  const dropdownItems = [
    { label: "All Stores", data: ["Store1", "Store2", "Store3"] },
    { label: "All Categories", data: ["Electronics", "Clothing", "Grocery"] },
    { label: "All Districts", data: ["Kozhikode", "Ernakulam", "Trivandrum"] },
    { label: "All Locations", data: ["City Center", "Mall Road", "MG Road"] },
    { label: "All Offer Types", data: ["BOGO", "Discounts", "Flash Sale"] },
  ];

  const toggleDropdown = (label) => {
    setDropdownOpen(dropdownOpen === label ? null : label);
  };

  const handleSelect = (label, option) => {
    setSelectedValues(prev => ({ ...prev, [label]: option }));
    setDropdownOpen(null);
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/offers?` + new URLSearchParams(selectedValues).toString();
    const shareText = `Check out offers in ${location}!`;
  
    if (navigator.share) {
      navigator.share({
        title: "Exclusive Offers",
        text: shareText,
        url: shareUrl,
      })
      .then(() => console.log("Thanks for sharing!"))
      .catch((error) => console.log("Sharing failed", error));
    } else {
      navigator.clipboard.writeText(shareUrl)
        .then(() => alert("Link copied to clipboard!"))
        .catch(() => alert("Failed to copy link."));
    }
  };
  

  const requiredItems = dropdownItems.filter(item => item.label !== "All Offer Types");
  const requiredSelected = requiredItems.every(item => selectedValues[item.label]);
  const location = selectedValues["All Locations"];

  return (
    <div className="w-full sticky top-0 bg-white z-[9999] mt-4 px-2 sm:px-4 md:px-6">
      <div className="border border-gray-300 rounded-xl shadow-sm bg-white px-3 sm:px-6 py-2">
        <div className="scroll-container">
          <div className="flex gap-3 md:grid md:grid-cols-6 md:gap-4 min-w-max md:min-w-0">
            {/* Search Input */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-md px-3 py-2 h-10 w-full">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search here..."
                className="bg-transparent outline-none text-sm text-gray-600 w-full ml-2"
              />
            </div>

            {/* Dropdown Buttons */}
            {dropdownItems.map((item, idx) => (
              <div key={idx} className="dropdown-wrapper w-full">
                <button
                  onClick={() => toggleDropdown(item.label)}
                  className="flex items-center justify-between bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 h-10 w-full"
                >
                  <span className="truncate">
                    {selectedValues[item.label] || item.label}
                  </span>
                  <span className="ml-2">▼</span>
                </button>

                {dropdownOpen === item.label && (
                  <div className="dropdown-menu">
                    <div className="px-4 py-2 font-semibold text-sm text-gray-500 border-b bg-gray-50">
                      {item.label}
                    </div>
                    {item.data.map((option, i) => (
                      <div
                        key={i}
                        className={`px-4 py-3 text-sm hover:bg-gray-100 cursor-pointer border-b last:border-b-0 whitespace-nowrap ${
                          selectedValues[item.label] === option ? 'bg-gray-50' : ''
                        }`}
                        onClick={() => handleSelect(item.label, option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Share Button (Desktop) */}
            {requiredSelected && location && (
              <div className="hidden md:flex items-center justify-center">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 text-sm font-medium font-nunito text-gray-500 bg-white border border-gray-300 hover:bg-gray-300 px-4 py-2 rounded-md"
                >
                  <Share2 className="w-4 h-4 text-black" />
                  Share offers in {location}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="border ...">
  <div className="scroll-container">
    <div className="flex ...">
      {/* Dropdowns */}
    </div>
  </div>
</div>

{/* Mobile Share Button (New Line) */}
{requiredSelected && location && (
  <div className="md:hidden mt-3 px-2">
    <button
      onClick={handleShare}
      className="w-full flex items-center justify-center font-nunito gap-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-300 px-4 py-2 rounded-md"
    >
      <Share2 className="w-4 h-4 text-black" />
      Share offers in {location}
    </button>
  </div>
)}

      <style jsx>{`
        .scroll-container {
          overflow-x: auto;
          overflow-y: visible;
          -webkit-overflow-scrolling: touch;
          -ms-overflow-style: none;
          scrollbar-width: none;
          padding-bottom: 150px;
          margin-bottom: -150px;
        }

        .scroll-container::-webkit-scrollbar {
          display: none;
        }

        .dropdown-wrapper {
          position: relative;
          z-index: 1;
        }

        .dropdown-wrapper:hover {
          z-index: 2;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 0.375rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                      0 2px 4px -1px rgba(0, 0, 0, 0.06);
          width: 180px;
          max-height: 300px;
          overflow-y: auto;
          z-index: 10000;
        }
      `}</style>
    </div>
  );
}

export default SearchFilters;
