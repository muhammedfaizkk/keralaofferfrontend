import { useEffect, useState } from "react"
import { useNavigate, useLocation, useSearchParams } from "react-router-dom"
import OfferCard from "../../components/user/OfferCard"
import SearchFilters from "../../components/user/SearchFilters"
import { useFetchAds } from "../../hooks/user/Userads"
import { toast } from "react-toastify"

const Offers = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const { ads, loading: adsLoading, error: adsError, refetch: refetchAds } = useFetchAds()
  const [filteredAds, setFilteredAds] = useState([])
  const [likedOffers, setLikedOffers] = useState({})
  const [showExpired, setShowExpired] = useState(searchParams.get("showExpired") === "true")

  // Get initial filters from URL parameters - standardize parameter names
  const getInitialFilters = () => {
    return {
      searchQuery: searchParams.get("search") || "",
      "All Stores": searchParams.get("store") ? { label: searchParams.get("store") } : null,
      "All Categories": searchParams.get("category") ? { label: searchParams.get("category") } : null,
      "All Districts": searchParams.get("district") ? { label: searchParams.get("district") } : null,
      "All Locations": searchParams.get("location") ? { label: searchParams.get("location") } : null,
      "All Offer Types": searchParams.get("offerType") ? { label: searchParams.get("offerType") } : null,
    };
  };
  
  const [filters, setFilters] = useState(getInitialFilters())

  // Update URL when filters change - standardize parameter names
  const updateUrlParams = (newFilters, newShowExpired) => {
    const params = new URLSearchParams()

    if (newFilters.searchQuery) params.set("search", newFilters.searchQuery)
    if (newFilters["All Stores"]?.label) params.set("store", newFilters["All Stores"].label)
    if (newFilters["All Categories"]?.label) params.set("category", newFilters["All Categories"].label)
    if (newFilters["All Districts"]?.label) params.set("district", newFilters["All Districts"].label)
    if (newFilters["All Locations"]?.label) params.set("location", newFilters["All Locations"].label)
    if (newFilters["All Offer Types"]?.label) params.set("offerType", newFilters["All Offer Types"].label)
    if (newShowExpired) params.set("showExpired", "true")

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

  // Apply filters to ads
  const applyFilters = (filters, ads) => {
    if (!ads || !Array.isArray(ads)) return []

    let filtered = [...ads]
    const now = new Date()

    // First filter out expired offers if not showing them
    if (!showExpired) {
      filtered = filtered.filter((ad) => {
        const endDate = new Date(ad.endDate)
        return endDate > now
      })
    }

    // Apply search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter((ad) => {
        const description = ad.description?.toLowerCase() || ""
        const storeName = ad.storeId?.storeName?.toLowerCase() || ""
        const category = ad.storeId?.category?.toLowerCase() || ""
        return description.includes(query) || storeName.includes(query) || category.includes(query)
      })
    }

    // Apply store filter
    if (filters["All Stores"]?.label) {
      filtered = filtered.filter((ad) => ad.storeId?.storeName === filters["All Stores"].label)
    }

    // Apply category filter
    if (filters["All Categories"]?.label) {
      filtered = filtered.filter((ad) => ad.storeId?.category === filters["All Categories"].label)
    }

    // Apply district filter
    if (filters["All Districts"]?.label) {
      filtered = filtered.filter((ad) => ad.storeId?.district === filters["All Districts"].label)
    }

    // Apply location filter
    if (filters["All Locations"]?.label) {
      filtered = filtered.filter((ad) => ad.storeId?.location === filters["All Locations"].label)
    }

    // Apply offer type filter
    if (filters["All Offer Types"]?.label) {
      filtered = filtered.filter((ad) => ad.offerType === filters["All Offer Types"].label)
    }

    // Sort by end date (soonest ending first)
    return filtered.sort((a, b) => new Date(a.endDate) - new Date(b.endDate))
  }

  // Initialize filters and handle ads updates
  useEffect(() => {
    if (ads) {
      const filteredResults = applyFilters(filters, ads)
      setFilteredAds(filteredResults)
    }
  }, [ads, filters, showExpired])

  // Update filters when URL params change
  useEffect(() => {
    const newFilters = getInitialFilters()
    setFilters(newFilters)
    // When URL changes but not because of our setSearchParams, also update showExpired state
    setShowExpired(searchParams.get("showExpired") === "true")
  }, [location.search])

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
          totalResults={filteredAds.length}
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
              {filteredAds.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-[16px] text-gray-500 text-center">
                    {showExpired
                      ? "No offers found matching your criteria."
                      : "No active offers found matching your criteria. Try showing expired offers or adjusting your filters."}
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-[14px] text-gray-600 mb-4 text-right">Total Offers: {filteredAds.length}</div>
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredAds.map((ad) => (
                      <OfferCard
                        key={ad._id}
                        offer={{
                          ...ad,
                          image: ad.adsImages?.[0],
                          store: ad.storeId,
                        }}
                        isLiked={likedOffers[ad._id]}
                        onLikeToggle={() => toggleLike(ad._id)}
                        onClick={() => handleOfferClick(ad._id)}
                        onCopyLink={() => handleCopyLink(ad._id)}
                      />
                    ))}
                  </div>
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