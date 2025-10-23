'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

const FilterContext = createContext()

export function FilterProvider({ children }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  // Filter state
  const [selectedType, setSelectedType] = useState([])
  const [selectedLength, setSelectedLength] = useState([])
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sortOrder, setSortOrder] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  
  // UI state
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [isMaterialOpen, setIsMaterialOpen] = useState(false)
  const [isPriceOpen, setIsPriceOpen] = useState(false)
  const [isLengthOpen, setIsLengthOpen] = useState(false)

  // Initialize state from URL params
  useEffect(() => {
    const typeParam = searchParams.get('type')
    const lengthParam = searchParams.get('length')
    const minPriceParam = searchParams.get('minPrice')
    const maxPriceParam = searchParams.get('maxPrice')
    const sortOrderParam = searchParams.get('sortOrder')
    const pageParam = searchParams.get('page')

    if (typeParam) {
      setSelectedType(typeParam.split(',').map(t => t.trim()))
    } else {
      setSelectedType([])
    }

    if (lengthParam) {
      setSelectedLength(lengthParam.split(',').map(l => l.trim().toUpperCase()))
    } else {
      setSelectedLength([])
    }

    setMinPrice(minPriceParam || '')
    setMaxPrice(maxPriceParam || '')
    setSortOrder(sortOrderParam || '')
    setCurrentPage(Number(pageParam) || 1)
  }, [searchParams])

  // Update URL when filters change
  const updateQuery = (updates, resetPage = true) => {
  const params = new URLSearchParams(searchParams.toString())

  Object.entries(updates).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.length ? params.set(key, value.join(',')) : params.delete(key)
    } else if (value !== null && value !== undefined && value !== '') {
      params.set(key, String(value))
    } else {
      params.delete(key)
    }
  })

  if (resetPage) {
    params.set('page', '1')
    setCurrentPage(1)
  }

  router.push(`${pathname}?${params.toString()}`)
}


  // Filter actions
  const toggleType = (type) => {
    const typeStr = String(type)
    const newTypes = selectedType.includes(typeStr)
      ? selectedType.filter(t => t !== typeStr)
      : [...selectedType, typeStr]
    
    setSelectedType(newTypes)
    updateQuery({ type: newTypes })
  }

  const toggleLength = (length) => {
    const newLengths = selectedLength.includes(length)
      ? selectedLength.filter(l => l !== length)
      : [...selectedLength, length]
    
    setSelectedLength(newLengths)
    updateQuery({ length: newLengths })
  }

  const applyPriceFilter = (min, max) => {
    setMinPrice(min)
    setMaxPrice(max)
    updateQuery({
      minPrice: min.trim(),
      maxPrice: max.trim()
    })
  }

  const setSort = (order) => {
    setSortOrder(order)
    updateQuery({ sortOrder: order })
  }

  const setPage = (page) => {
    setCurrentPage(page)
    updateQuery({ page: String(page) })
  }

  const clearFilters = () => {
    setSelectedType([])
    setSelectedLength([])
    setMinPrice('')
    setMaxPrice('')
    setSortOrder('')
    setCurrentPage(1)
    
    // Clear URL params
    const params = new URLSearchParams()
    params.set('page', '1')
    router.push(`${pathname}?${params.toString()}`)
  }

  const clearPriceFilter = () => {
    setMinPrice('')
    setMaxPrice('')
    updateQuery({
      minPrice: '',
      maxPrice: ''
    })
  }

  // UI actions
  const toggleFiltersOpen = () => setIsFiltersOpen(!isFiltersOpen)
  const toggleMaterialOpen = () => setIsMaterialOpen(!isMaterialOpen)
  const togglePriceOpen = () => setIsPriceOpen(!isPriceOpen)
  const toggleLengthOpen = () => setIsLengthOpen(!isLengthOpen)

  // Close price filter and reset local values when closed
  useEffect(() => {
    if (!isPriceOpen) {
      // Reset local price values when price filter is closed
      // This is handled by the component's local state
    }
  }, [isPriceOpen])

  // Add body class when filters menu is open
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', isFiltersOpen)
  }, [isFiltersOpen])

  // Build filter URL for navigation
  const buildFilterUrl = ({ length, type, page, sortOrder: sort }) => {
    const params = new URLSearchParams()
    if (length && length.length) params.set('length', length.join(','))
    if (type && type.length) params.set('type', type.join(','))
    if (sort) params.set('sortOrder', sort)
    params.set('page', String(page))
    return `${pathname}?${params.toString()}`
  }

  // Get current filter state as object
  const getCurrentFilters = () => ({
    type: selectedType,
    length: selectedLength,
    minPrice,
    maxPrice,
    sortOrder,
    page: currentPage
  })

  const value = {
    // State
    selectedType,
    selectedLength,
    minPrice,
    maxPrice,
    sortOrder,
    currentPage,
    isFiltersOpen,
    isMaterialOpen,
    isPriceOpen,
    isLengthOpen,
    
    // Actions
    toggleType,
    toggleLength,
    applyPriceFilter,
    setSort,
    setPage,
    clearFilters,
    clearPriceFilter,
    
    // UI Actions
    toggleFiltersOpen,
    toggleMaterialOpen,
    togglePriceOpen,
    toggleLengthOpen,
    
    // Utilities
    buildFilterUrl,
    getCurrentFilters
  }

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider')
  }
  return context
}

// Convenience hook for just the filter state
export function useFilterState() {
  const { selectedType, selectedLength, minPrice, maxPrice, sortOrder, currentPage } = useFilters()
  return { selectedType, selectedLength, minPrice, maxPrice, sortOrder, currentPage }
}

// Convenience hook for just the filter actions
export function useFilterActions() {
  const { 
    toggleType, 
    toggleLength, 
    applyPriceFilter, 
    setSort, 
    setPage, 
    clearFilters, 
    clearPriceFilter,
    buildFilterUrl,
    getCurrentFilters
  } = useFilters()
  
  return { 
    toggleType, 
    toggleLength, 
    applyPriceFilter, 
    setSort, 
    setPage, 
    clearFilters, 
    clearPriceFilter,
    buildFilterUrl,
    getCurrentFilters
  }
}
