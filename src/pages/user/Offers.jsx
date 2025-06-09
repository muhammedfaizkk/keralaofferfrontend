import React, { useState, useEffect, useMemo } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import OfferCard from "../../components/user/OfferCard"
import SearchFilters from "../../components/user/SearchFilters"
import { toast } from "react-toastify"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useFetchAds } from '../../hooks/user/Userads';



const Offers = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number.parseInt(searchParams.get("page")) || 1
  const [likedOffers, setLikedOffers] = useState({})

  
  const getFiltersFromParams = () => {
    const filterKeys = [
      'storeName', 
      'category', 
      'district', 
      'location', 
      'offerType', 
      'searchQuery'
    ]
    
    return filterKeys.reduce((acc, key) => {
      const value = searchParams.get(key)
      if (value) acc[key] = value
      return acc
    }, {})
  }

  const backendFilters = getFiltersFromParams()
  const showExpired = searchParams.get("showExpired") === "true"

  const {
    ads = [],
    loading: adsLoading,
    error: adsError,
    totalPages,
    currentPage: serverPage,
    setPage,
  } = useFetchAds(currentPage, backendFilters)

  // Initialize filters state from URL
  const [filters, setFilters] = useState(() => {
    const initialFilters = {
      searchQuery: searchParams.get("searchQuery") || ""
    }
    
    const filterMap = {
      "All Stores": "storeName",
      "All Categories": "category",
      "All Districts": "district",
      "All Locations": "location",
      "All Offer Types": "offerType"
    }

    Object.entries(filterMap).forEach(([filterKey, paramKey]) => {
      const value = searchParams.get(paramKey)
      if (value) {
        initialFilters[filterKey] = { label: decodeURIComponent(value) }
      }
    })

    return initialFilters
  })

  const updateUrlParams = (newFilters, expiredFlag) => {
    const params = new URLSearchParams()
    params.set("page", "1")

    // Handle search query
    if (newFilters.searchQuery) {
      params.set("searchQuery", newFilters.searchQuery)
    }

    // Handle other filters
    const filterMap = {
      "All Stores": "storeName",
      "All Categories": "category",
      "All Districts": "district",
      "All Locations": "location",
      "All Offer Types": "offerType"
    }

    Object.entries(filterMap).forEach(([filterKey, paramKey]) => {
      if (newFilters[filterKey]?.label) {
        params.set(paramKey, newFilters[filterKey].label)
      }
    })

    if (expiredFlag) {
      params.set("showExpired", "true")
    }

    setSearchParams(params)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    updateUrlParams(newFilters, showExpired)
  }

  const handleExpiredToggle = (e) => {
    updateUrlParams(filters, e.target.checked)
  }

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return
    
    const params = new URLSearchParams(searchParams)
    params.set("page", newPage.toString())
    setSearchParams(params)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Offer interaction handlers
  const handleOfferClick = (adId) => navigate(`/offer/${adId}`)
  
  const toggleLike = (adId) => {
    setLikedOffers(prev => ({ ...prev, [adId]: !prev[adId] }))
  }

  const handleCopyLink = async (adId) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/offer/${adId}`)
      toast.success("Offer link copied!")
    } catch (error) {
      toast.error("Failed to copy link")
    }
  }

  const handleShareFilters = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success("Filter URL copied!")
    } catch (error) {
      toast.error("Failed to copy URL")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchFilters
          onFilterChange={handleFilterChange}
          totalResults={ads.length}
          initialFilters={filters}
          handleShareFilters={handleShareFilters}
        />

        <div className="my-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
            {filters["All Stores"]?.label 
              ? `Offers from ${filters["All Stores"].label}` 
              : "Latest Offers"}
          </h1>

          {adsLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600"></div>
            </div>
          ) : adsError ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-red-500">{adsError}</div>
            </div>
          ) : ads.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-gray-500">No offers found</div>
            </div>
          ) : (
            <>
              <div className="text-sm text-gray-600 mb-4 text-right">
                Showing {ads.length} offers
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {ads.map(ad => (
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

              {totalPages > 1 && (
                <div className="mt-8 flex justify-center items-center gap-2">
                  <button
                    onClick={() => handlePageChange(serverPage - 1)}
                    disabled={serverPage === 1}
                    className={`p-2 rounded-full ${
                      serverPage === 1 ? "bg-gray-100 text-gray-400" : "bg-violet-100 text-violet-600 hover:bg-violet-200"
                    }`}
                  >
                    <FaChevronLeft />
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum
                      if (totalPages <= 5) {
                        pageNum = i + 1
                      } else if (serverPage <= 3) {
                        pageNum = i + 1
                      } else if (serverPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i
                      } else {
                        pageNum = serverPage - 2 + i
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-10 h-10 rounded-full ${
                            serverPage === pageNum ? "bg-violet-600 text-white" : "bg-gray-100 hover:bg-violet-100"
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(serverPage + 1)}
                    disabled={serverPage === totalPages}
                    className={`p-2 rounded-full ${
                      serverPage === totalPages ? "bg-gray-100 text-gray-400" : "bg-violet-100 text-violet-600 hover:bg-violet-200"
                    }`}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Offers