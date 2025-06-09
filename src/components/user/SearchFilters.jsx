"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { Search, ChevronDown, X, Filter, RefreshCw, Share2, Copy } from "lucide-react"
import {
  useGetOffertypes,
  useGetstorecategory,
  useFetchDistricts,
  useGetLocations,
  useGetallstorenames,
} from "../../hooks/user/Filtershook"
import { toast } from "react-toastify"
import { useNavigate, useLocation } from "react-router-dom"
import { useIncrementCategoryClick } from "../../hooks/admin/Storecategory"

function SearchFilters({ handleShareFilters, onFilterChange, totalResults, initialFilters = {} }) {
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const [selectedValues, setSelectedValues] = useState({})
  const [searchQuery, setSearchQuery] = useState("")
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  const [dropdownSearchQueries, setDropdownSearchQueries] = useState({})
  const [initialLoadComplete, setInitialLoadComplete] = useState(false)
  const dropdownRef = useRef(null)
  const searchInputRef = useRef(null)

  // React Router hooks for URL handling
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search])
  const { incrementClick, loading: clickLoading, error: clickError } = useIncrementCategoryClick()

  // Fetch filter data
  const { offertypes, loading: offerTypesLoading } = useGetOffertypes({ paginated: false })
  const { categories, loading: categoriesLoading } = useGetstorecategory()
  const { districts, loading: districtsLoading } = useFetchDistricts()
 const { locations, loading: locationsLoading } = useGetLocations({ paginated: false });
  const { storeNames, loading: storesLoading } = useGetallstorenames()

  // Check if screen is mobile
  const [isMobile, setIsMobile] = useState(false)

  // Handle copying the current URL with filters
  const handleCopyLink = () => {
    const params = new URLSearchParams()
    if (searchQuery) {
      params.append("search", searchQuery)
    }

    // Map filter keys to URL parameter names
    const paramMap = {
      "All Stores": "storeName",
      "All Categories": "category",
      "All Districts": "district",
      "All Locations": "location",
      "All Offer Types": "offerType",
    }

    Object.entries(selectedValues).forEach(([key, value]) => {
      if (value && paramMap[key]) {
        // Use label for all filters in the URL
        params.append(paramMap[key], value.label)
      }
    })

    const baseUrl = window.location.href.split("?")[0]
    const linkToCopy = `${baseUrl}${params.toString() ? `?${params.toString()}` : ""}`

    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {
        toast.success("Link copied to clipboard!")
      })
      .catch((err) => {
        toast.error("Failed to copy link")
        console.error("Failed to copy link:", err)
      })
  }

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint in Tailwind is 768px
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Process API responses to handle complex objects
  const processData = (data, type) => {
    if (!data) return []

    // Handle cases where data might be nested in a 'data' property
    const rawData = Array.isArray(data) ? data : data.data || []

    if (!Array.isArray(rawData)) return []

    switch (type) {
      case "offertypes":
        return rawData.map((item) => ({
          id: item._id || item.id,
          label: item.title || item.offerType,
          originalData: item,
        }))

      case "categories":
        return rawData.map((item) => ({
          id: item._id || item.id,
          label: item.category || item.title,
          originalData: item,
        }))

      case "districts":
        return rawData.map((item) => ({
          id: item.id || String(Math.random()),
          label: item.title || item.district,
          originalData: item,
        }))

      case "locations":
        return rawData.map((item) => ({
          id: item._id || item.id,
          label: item.locationName || item.location,
          district: item.district,
          originalData: item,
        }))

      case "stores":
        return rawData.map((item) => ({
          id: item._id,
          label: item.storeName,
          originalData: item,
        }))

      default:
        return []
    }
  }

  // Process data for each filter type
  const processedStoreNames = useMemo(() => processData(storeNames, "stores"), [storeNames])
  const processedCategories = useMemo(() => processData(categories, "categories"), [categories])
  const processedDistricts = useMemo(() => processData(districts, "districts"), [districts])
  const processedLocations = useMemo(() => processData(locations, "locations"), [locations])
  const processedOfferTypes = useMemo(() => processData(offertypes, "offertypes"), [offertypes])

  // Define dropdown items
  const dropdownItems = useMemo(
    () => [
      {
        id: "stores",
        label: "All Stores",
        data: processedStoreNames,
        icon: "🏪",
        loading: storesLoading,
        paramName: "storeName",
      },
      {
        id: "categories",
        label: "All Categories",
        data: processedCategories,
        icon: "📑",
        loading: categoriesLoading,
        paramName: "category",
      },
      {
        id: "districts",
        label: "All Districts",
        data: processedDistricts,
        icon: "🏛️",
        loading: districtsLoading,
        paramName: "district",
      },
      {
        id: "locations",
        label: "All Locations",
        data: processedLocations,
        icon: "📍",
        loading: locationsLoading,
        paramName: "location",
        filterBy: (location, filters) => {
          if (filters["All Districts"] && filters["All Districts"].label) {
            return location.district === filters["All Districts"].label
          }
          return true
        },
      },
      {
        id: "offertypes",
        label: "All Offer Types",
        data: processedOfferTypes,
        icon: "🏷️",
        loading: offerTypesLoading,
        paramName: "offerType",
      },
    ],
    [
      processedStoreNames,
      processedCategories,
      processedDistricts,
      processedLocations,
      processedOfferTypes,
      storesLoading,
      categoriesLoading,
      districtsLoading,
      locationsLoading,
      offerTypesLoading,
    ],
  )

  // Load filters from URL on initial load - ONLY ONCE
  useEffect(() => {
    // Skip if we've already done the initial load or if dropdownItems aren't ready
    if (initialLoadComplete || dropdownItems.some((item) => item.loading)) {
      return
    }

    const loadFiltersFromURL = () => {
      const newFilters = {}
      const query = searchParams.get("search")

      if (query) {
        setSearchQuery(query)
      }

      // Process each possible filter from URL
      dropdownItems.forEach((item) => {
        const paramValue = searchParams.get(item.paramName)
        if (!paramValue) return

        // For all filters, match by label which is what appears in the URL
        const decodedValue = decodeURIComponent(paramValue)
        const matchedOption = item.data.find((option) => option.label.toLowerCase() === decodedValue.toLowerCase())

        if (matchedOption) {
          newFilters[item.label] = matchedOption
        }
      })

      // Only update state if there are actual filters to set
      if (Object.keys(newFilters).length > 0 || query) {
        setSelectedValues(newFilters)
        onFilterChange?.({
          ...newFilters,
          searchQuery: query || "",
        })
      }

      // Mark initial load as complete to prevent further loads
      setInitialLoadComplete(true)
    }

    loadFiltersFromURL()
  }, [searchParams, dropdownItems, onFilterChange, initialLoadComplete])

  // Initialize filters from props
  useEffect(() => {
    if (!initialFilters || typeof initialFilters !== "object" || initialLoadComplete) return

    const validFilters = {}

    // Process search query
    if (initialFilters.searchQuery) {
      setSearchQuery(initialFilters.searchQuery)
    }

    // Process each filter value
    Object.entries(initialFilters).forEach(([key, value]) => {
      if (key === "searchQuery" || !value) return

      const dropdownItem = dropdownItems.find((item) => item.label === key)
      if (!dropdownItem?.data) return

      // If value is already an object with label, use it directly
      if (value?.label) {
        validFilters[key] = {
          id: value.id || value._id || String(Math.random()),
          label: value.label,
          originalData: value.originalData || value,
        }
        return
      }

      // Find matching option in the processed data
      const matchingOption = dropdownItem.data.find(
        (option) => option.label.toLowerCase() === String(value).toLowerCase(),
      )

      if (matchingOption) {
        validFilters[key] = matchingOption
      }
    })

    if (Object.keys(validFilters).length > 0) {
      setSelectedValues(validFilters)
    }
  }, [initialFilters, dropdownItems, initialLoadComplete])

  // Toggle dropdown
  const toggleDropdown = (label) => {
    setDropdownOpen(dropdownOpen === label ? null : label)

    // Reset dropdown search when opening a dropdown
    if (dropdownOpen !== label) {
      setDropdownSearchQueries((prev) => ({
        ...prev,
        [label]: "",
      }))
    }
  }

  // Toggle mobile filters
  const toggleMobileFilters = () => {
    setIsMobileFiltersOpen(!isMobileFiltersOpen)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
      if (e.key === "Escape") {
        setDropdownOpen(null)
        setIsMobileFiltersOpen(false)
        if (document.activeElement === searchInputRef.current) {
          searchInputRef.current.blur()
        }
      }
    }

    document.addEventListener("keydown", handleKeyPress)
    return () => document.removeEventListener("keydown", handleKeyPress)
  }, [])

  // Update URL when filters change
  const updateURLWithFilters = (newValues, newQuery) => {
    const params = new URLSearchParams()

    // Add search query if exists
    if (newQuery) {
      params.set("search", newQuery)
    }

    // Add selected filters
    Object.entries(newValues).forEach(([key, value]) => {
      if (!value) return

      // Find param name for this filter
      const dropdownItem = dropdownItems.find((item) => item.label === key)
      if (dropdownItem?.paramName) {
        // For all filters, use the label value which is more human-readable
        params.set(dropdownItem.paramName, value.label)
      }
    })

    // Update URL using React Router navigate
    navigate(
      {
        pathname: location.pathname,
        search: params.toString(),
      },
      { replace: true },
    )
  }

 // Modified handleSelect function to track category clicks

const handleSelect = (dropdownLabel, option) => {
  if (!option) return

  // For all filters, use consistent format
  const newValues = {
    ...selectedValues,
    [dropdownLabel]: {
      id: option.id,
      label: option.label,
      originalData: option.originalData,
    },
  }

  setSelectedValues(newValues)
  setDropdownOpen(null)

  // Track category click when "All Categories" is selected
  if (dropdownLabel === "All Categories" && option.id) {
    incrementClick(option.id)
      .then(() => {
        // Optional: You could add a success toast or other feedback here
        console.log("Category click tracked successfully")
      })
      .catch((error) => {
        console.error("Failed to track category click:", error)
        // Optional: You could add error handling here
      })
  }

  // Update both component state and URL
  updateURLWithFilters(newValues, searchQuery)

  // Ensure we pass the correct format to parent
  onFilterChange?.({
    ...newValues,
    searchQuery,
  })
}

  // Clear a single filter
  const clearFilter = (label) => {
    const newValues = { ...selectedValues }
    delete newValues[label]

    // If clearing district, also clear location
    if (label === "All Districts" && selectedValues["All Locations"]) {
      delete newValues["All Locations"]
    }

    setSelectedValues(newValues)

    // Update URL and notify parent component
    updateURLWithFilters(newValues, searchQuery)
    onFilterChange?.({
      ...newValues,
      searchQuery,
    })
  }

  // Clear all filters
  const clearAllFilters = () => {
    // Clear all state
    setSelectedValues({})
    setSearchQuery("")

    // Clear URL parameters
    navigate(location.pathname, { replace: true })

    // Notify parent component
    onFilterChange?.({ searchQuery: "" })
  }

  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)

    // Debounce URL updates for search
    const delayDebounceFn = setTimeout(() => {
      updateURLWithFilters(selectedValues, query)

      onFilterChange?.({
        ...selectedValues,
        searchQuery: query,
      })
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }

  // Handle dropdown search input changes
  const handleDropdownSearchChange = (e, dropdownLabel) => {
    const query = e.target.value
    setDropdownSearchQueries((prev) => ({
      ...prev,
      [dropdownLabel]: query,
    }))
  }

  // Count active filters
  const getActiveFiltersCount = () => {
    return Object.keys(selectedValues).length + (searchQuery ? 1 : 0)
  }

  // Filter dropdown options based on search query
  const getFilteredOptions = (dropdownLabel, options) => {
    const searchQuery = dropdownSearchQueries[dropdownLabel] || ""
    if (!searchQuery) return options

    return options.filter((option) => option.label.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  // Render filter chips
  const renderFilterChips = () => {
    return Object.entries(selectedValues)
      .map(([dropdownLabel, value]) => {
        if (!value || !value.label) return null

        const dropdownItem = dropdownItems.find((item) => item.label === dropdownLabel)
        if (!dropdownItem) return null

        return (
          <div
            key={dropdownLabel}
            className="inline-flex items-center gap-2 bg-violet-50 text-violet-700 px-3 py-1.5 rounded-full text-sm font-medium group hover:bg-violet-100 transition-colors"
          >
            <span className="text-violet-500">{dropdownItem.icon}</span>
            <span className="max-w-[120px] truncate">{value.label}</span>
            <button
              onClick={() => clearFilter(dropdownLabel)}
              className="group-hover:bg-violet-200 rounded-full p-0.5 transition-colors"
              aria-label={`Remove ${dropdownLabel} filter`}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )
      })
      .filter(Boolean)
  }

  return (
    <div>
      <div className="fixed top-28 left-4 z-50 flex flex-col gap-2">
        {/* Filter Toggle Button */}
        <button
          onClick={isMobile ? toggleMobileFilters : () => setIsCollapsed(!isCollapsed)}
          className="sm:hidden bg-white border border-violet-200 text-gray-600 hover:text-violet-700 hover:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400 p-2 rounded-full shadow transition-all duration-300"
          aria-label={
            isMobile
              ? isMobileFiltersOpen
                ? "Close filters"
                : "Open filters"
              : isCollapsed
                ? "Expand filters"
                : "Collapse filters"
          }
        >
          <Filter
            className={`w-5 h-5 transition-transform duration-300 ${
              (isMobile && isMobileFiltersOpen) || (!isMobile && isCollapsed) ? "text-violet-600 rotate-180" : ""
            }`}
          />
        </button>

        {/* Share Filters Button */}
        <button
          onClick={handleShareFilters}
          className="sm:hidden bg-white border border-violet-200 text-gray-600 hover:text-violet-700 hover:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400 p-2 rounded-full shadow transition-all duration-300"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Hide the entire container on mobile unless the filter button is clicked */}
      {(!isMobile || (isMobile && isMobileFiltersOpen)) && (
        <div className="w-full bg-white rounded-xl shadow-sm">
          <div
            className={`border border-gray-200 rounded-xl bg-white transition-all duration-300 
          ${isCollapsed ? "py-2" : "py-4"}`}
          >
            <div className="px-3 sm:px-6 flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {getActiveFiltersCount() > 0 && (
                    <span className="bg-violet-100 text-violet-800 px-2 py-0.5 rounded-full text-xs font-medium">
                      {getActiveFiltersCount()}
                    </span>
                  )}
                </div>
              </div>

              {getActiveFiltersCount() > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="flex items-center gap-2 text-sm text-violet-600 hover:text-violet-800 focus:outline-none"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="hidden sm:inline">Clear all</span>
                </button>
              )}
            </div>

            {(!isMobile && !isCollapsed) || (isMobile && isMobileFiltersOpen) ? (
              <>
                {/* Filter Chips */}
                {Object.keys(selectedValues).length > 0 && (
                  <div className="px-3 sm:px-6 flex flex-wrap gap-2 mb-4">{renderFilterChips()}</div>
                )}

                {/* Search and Dropdowns */}
                <div className="px-3 sm:px-6">
                  <div className="flex flex-col gap-3">
                    {/* Search Input */}
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="w-4 h-4 text-gray-400" />
                      </div>
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search offers, stores, categories... (Ctrl + K)"
                        className="block w-full pl-10 pr-10 py-2.5 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg 
                        focus:ring-2 focus:ring-violet-300 focus:border-violet-400 transition-colors"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => {
                            setSearchQuery("")
                            updateURLWithFilters(selectedValues, "")
                            onFilterChange?.({ ...selectedValues, searchQuery: "" })
                          }}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          aria-label="Clear search"
                        >
                          <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                        </button>
                      )}
                    </div>

                    {/* Filter Dropdowns */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2" ref={dropdownRef}>
                      {dropdownItems.map((item) => {
                        // Apply filtering logic for dependent dropdowns
                        let filteredData = item.data
                        if (item.filterBy) {
                          filteredData = item.data.filter((option) => item.filterBy(option, selectedValues))
                        }

                        return (
                          <div key={item.id} className="relative">
                            <button
                              onClick={() => toggleDropdown(item.label)}
                              disabled={item.loading}
                              className={`flex items-center justify-between gap-2 border rounded-lg px-3 py-2.5 text-sm w-full
                              ${
                                selectedValues[item.label]
                                  ? "bg-violet-50 border-violet-300 text-violet-700"
                                  : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                              }
                              ${item.loading ? "opacity-50 cursor-not-allowed" : ""}
                              transition-all duration-200`}
                              aria-expanded={dropdownOpen === item.label}
                              aria-haspopup="listbox"
                            >
                              <span className="flex items-center gap-2 truncate">
                                <span className="text-base">{item.icon}</span>
                                <span className="truncate">{selectedValues[item.label]?.label || item.label}</span>
                              </span>
                              <ChevronDown
                                className={`w-4 h-4 transition-transform duration-200 
                                ${dropdownOpen === item.label ? "rotate-180" : ""}`}
                              />
                            </button>

                            {dropdownOpen === item.label && (
                              <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-xl w-full min-w-[150px] max-h-[300px] overflow-y-auto border border-gray-200 z-50">
                                <div className="sticky top-0 bg-gray-50/80 backdrop-blur-sm border-b border-gray-200 px-3 py-2">
                                  <input
                                    type="text"
                                    placeholder={`Search ${item.label.toLowerCase()}...`}
                                    className="w-full px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-violet-400"
                                    onClick={(e) => e.stopPropagation()}
                                    value={dropdownSearchQueries[item.label] || ""}
                                    onChange={(e) => handleDropdownSearchChange(e, item.label)}
                                    autoFocus
                                  />
                                </div>

                                <div className="py-1">
                                  {item.loading ? (
                                    <div className="px-4 py-3 text-sm text-gray-500 italic flex items-center justify-center">
                                      <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                                        Loading...
                                      </div>
                                    </div>
                                  ) : filteredData.length > 0 ? (
                                    getFilteredOptions(item.label, filteredData).map((option) => (
                                      <button
                                        key={option.id}
                                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-violet-50 cursor-pointer
                                        ${
                                          selectedValues[item.label]?.id === option.id
                                            ? "bg-violet-100 text-violet-700 font-medium"
                                            : "text-gray-700"
                                        }
                                        flex items-center justify-between`}
                                        onClick={() => handleSelect(item.label, option)}
                                        role="option"
                                        aria-selected={selectedValues[item.label]?.id === option.id}
                                      >
                                        <span className="truncate">{option.label}</span>
                                        {selectedValues[item.label]?.id === option.id && (
                                          <span className="text-violet-500">✓</span>
                                        )}
                                      </button>
                                    ))
                                  ) : (
                                    <div className="px-4 py-3 text-sm text-gray-500 italic text-center">
                                      No options available
                                    </div>
                                  )}

                                  {filteredData.length > 0 &&
                                    getFilteredOptions(item.label, filteredData).length === 0 && (
                                      <div className="px-4 py-3 text-sm text-gray-500 italic text-center">
                                        No matching results
                                      </div>
                                    )}
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div className="w-full flex flex-wrap justify-between items-center">
                  {totalResults !== undefined && (
                    <div className="px-3 sm:px-6 mt-4 text-sm text-gray-600">
                      <span>
                        {totalResults} result{totalResults !== 1 ? "s" : ""} found
                      </span>
                    </div>
                  )}

                  <div className="px-3 sm:px-6 mt-4 flex items-center gap-2 cursor-pointer" onClick={handleCopyLink}>
                    <Copy className="w-4 h-4 text-violet-600 hover:text-violet-700 transition-colors" />
                    <span className="text-sm text-violet-600 hover:text-violet-700 transition-colors">Copy Link</span>
                  </div>
                </div>
              </>
            ) : null}

            {isMobile && !isMobileFiltersOpen && getActiveFiltersCount() > 0 && (
              <div className="px-3 text-sm text-gray-600 mt-1">
                <span className="text-violet-600 font-medium">
                  {getActiveFiltersCount()} filter{getActiveFiltersCount() !== 1 ? "s" : ""} applied
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {isMobile && !isMobileFiltersOpen && getActiveFiltersCount() > 0 && (
        <div className="mt-2 text-sm text-violet-600 font-medium">
          {getActiveFiltersCount()} filter{getActiveFiltersCount() !== 1 ? "s" : ""} applied
        </div>
      )}
    </div>
  )
}

export default SearchFilters
