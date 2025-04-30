import React from 'react';
import { useEffect, useState } from "react"
import { useNavigate, useLocation, useSearchParams } from "react-router-dom"
import OfferCard from "../../components/user/OfferCard"
import SearchFilters from "../../components/user/SearchFilters"
import { useFetchAds } from "../../hooks/user/Userads"
import { toast } from "react-toastify"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

const Offers = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = parseInt(searchParams.get("page")) || 1
  
  const getFiltersFromParams = (searchParams) => {
    const filters = {};
    
    // Get storeName from the selected store filter
    const storeName = searchParams.get('storeName');
    if (storeName) filters.storeName = storeName;
    
    // Get other filters
    const category = searchParams.get('category');
    if (category) filters.category = category;
    
    const district = searchParams.get('district');
    if (district) filters.district = district;
    
    const location = searchParams.get('location');
    if (location) filters.location = location;
    
    const offerType = searchParams.get('offerType');
    if (offerType) filters.offerType = offerType;

    console.log('Filters being sent to backend:', filters);
    return filters;
  };

  const backendFilters = getFiltersFromParams(searchParams);

  const { ads = [], loading: adsLoading, error: adsError, totalPages, currentPage: serverPage, setPage } = useFetchAds(currentPage, backendFilters);
  const [likedOffers, setLikedOffers] = useState({})
  const [showExpired, setShowExpired] = useState(searchParams.get("showExpired") === "true")

  // Update getInitialFilters to properly handle store selection
  const getInitialFilters = () => {
    const storeName = searchParams.get("storeName");
    return {
      searchQuery: searchParams.get("search") || "",
      "All Stores": storeName ? { 
        id: storeName,  // Use storeName as id
        label: storeName,
        originalData: { storeName } 
      } : null,
      "All Categories": searchParams.get("category") ? { 
        label: searchParams.get("category") 
      } : null,
      "All Districts": searchParams.get("district") ? { 
        label: searchParams.get("district") 
      } : null,
      "All Locations": searchParams.get("location") ? { 
        label: searchParams.get("location") 
      } : null,
      "All Offer Types": searchParams.get("offerType") ? { 
        label: searchParams.get("offerType") 
      } : null,
    };
  };
  
  const [filters, setFilters] = useState(getInitialFilters())

  console.log('ads-------->',ads);
  
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return
    
    // Update URL with new page number while preserving other params
    const newParams = new URLSearchParams(searchParams)
    newParams.set("page", newPage.toString())
    setSearchParams(newParams)
    
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Update URL when filters change - standardize parameter names
  const updateUrlParams = (newFilters, newShowExpired) => {
    // Start with existing params to preserve them
    const params = new URLSearchParams(searchParams)

    // Reset to page 1 when filters change
    params.set("page", "1")

    // Update or remove search params based on new filters
    if (newFilters.searchQuery) {
      params.set("search", newFilters.searchQuery)
    } else {
      params.delete("search")
    }

    // Handle store name
    if (newFilters["All Stores"]?.label) {
      params.set("storeName", newFilters["All Stores"].label)
    } else {
      params.delete("storeName")
    }

    // Handle other filters
    if (newFilters["All Categories"]?.label) {
      params.set("category", newFilters["All Categories"].label)
    } else {
      params.delete("category")
    }

    if (newFilters["All Districts"]?.label) {
      params.set("district", newFilters["All Districts"].label)
    } else {
      params.delete("district")
    }

    if (newFilters["All Locations"]?.label) {
      params.set("location", newFilters["All Locations"].label)
    } else {
      params.delete("location")
    }

    if (newFilters["All Offer Types"]?.label) {
      params.set("offerType", newFilters["All Offer Types"].label)
    } else {
      params.delete("offerType")
    }

    if (newShowExpired) {
      params.set("showExpired", "true")
    } else {
      params.delete("showExpired")
    }

    console.log('Updating URL params:', Object.fromEntries(params.entries()));
    setSearchParams(params)
  }

  // Handle filter changes from SearchFilters component
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    updateUrlParams(newFilters, showExpired)
  }

  // Handle expired offers toggle
  const handleExpiredToggle = (e) => {
    const newShowExpired = e.target.checked
    setShowExpired(newShowExpired)
    updateUrlParams(filters, newShowExpired)
  }

  // Share current filters
  const handleShareFilters = async () => {
    try {
      const url = `${window.location.origin}${window.location.pathname}${window.location.search}`
      await navigator.clipboard.writeText(url)
      toast.success("Filter URL copied to clipboard!")
    } catch (error) {
      toast.error("Failed to copy filter URL")
    }
  }

  const handleOfferClick = (adId) => {
    navigate(`/offer/${adId}`)
  }

  const toggleLike = (adId) => {
    setLikedOffers((prev) => ({
      ...prev,
      [adId]: !prev[adId],
    }))
  }

  const handleCopyLink = (adId) => {
    const offerUrl = `${window.location.origin}/offerdetails/${adId}`
    navigator.clipboard
      .writeText(offerUrl)
      .then(() => {
        toast.success("Offer link copied to clipboard!")
      })
      .catch((error) => {
        console.error("Failed to copy link:", error)
        toast.error("Failed to copy link. Please try again.")
      })
  }

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
        <SearchFilters
          onFilterChange={handleFilterChange}
          totalResults={ads.length}
          initialFilters={filters}
          handleShareFilters={handleShareFilters}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />

        <div className="py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-semibold text-gray-900 text-center sm:text-left">
              Latest Offers
            </h1>
            {/* Commented out for brevity but can be uncommented if needed */}
          </div>

          {adsLoading && (
            <div className="min-h-screen bg-gray-100 font-poppins">
              <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
                </div>
              </div>
            </div>
          )}

          {adsError && (
            <div className="flex justify-center items-center h-64">
              <div className="text-[16px] text-red-500">{adsError}</div>
            </div>
          )}

          {!adsLoading && !adsError && (
            <>
              {ads.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-[16px] text-gray-500 text-center">
                    No offers found matching your criteria.
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-[14px] text-gray-600 mb-4 text-right">
                    Total Offers: {ads.length}
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {ads.map((ad) => (
                      <OfferCard
                        key={ad._id}
                        offer={{
                          ...ad,
                          image: ad.adsImages?.[0],
                          store: ad.storeName,
                        }}
                        isLiked={likedOffers[ad._id]}
                        onLikeToggle={() => toggleLike(ad._id)}
                        onClick={() => handleOfferClick(ad._id)}
                        onCopyLink={() => handleCopyLink(ad._id)}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex justify-center items-center gap-2">
                      <button
                        onClick={() => handlePageChange(serverPage - 1)}
                        disabled={serverPage === 1}
                        className={`p-2 rounded-full ${
                          serverPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-violet-100 text-violet-600 hover:bg-violet-200'
                        } transition-colors`}
                      >
                        <FaChevronLeft className="w-5 h-5" />
                      </button>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter(page => {
                            // Show first page, last page, current page, and pages around current page
                            return (
                              page === 1 ||
                              page === totalPages ||
                              Math.abs(page - serverPage) <= 1
                            )
                          })
                          .map((page, index, array) => (
                            <React.Fragment key={page}>
                              {index > 0 && array[index - 1] !== page - 1 && (
                                <span className="px-2 text-gray-400">...</span>
                              )}
                              <button
                                onClick={() => handlePageChange(page)}
                                className={`w-10 h-10 rounded-full ${
                                  serverPage === page
                                    ? 'bg-violet-600 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-violet-100'
                                } transition-colors text-sm font-medium`}
                              >
                                {page}
                              </button>
                            </React.Fragment>
                          ))}
                      </div>

                      <button
                        onClick={() => handlePageChange(serverPage + 1)}
                        disabled={serverPage === totalPages}
                        className={`p-2 rounded-full ${
                          serverPage === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-violet-100 text-violet-600 hover:bg-violet-200'
                        } transition-colors`}
                      >
                        <FaChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Offers