'use client'

import styles from './Filters.module.css'
import Icon from './icon'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export default function Filters({ selectedCategory }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [isMaterialOpen, setIsMaterialOpen] = useState(false)
  const [isPriceOpen, setIsPriceOpen] = useState(false)
  const [isLengthOpen, setIsLengthOpen] = useState(false)
  const [localMinPrice, setLocalMinPrice] = useState('')
  const [localMaxPrice, setLocalMaxPrice] = useState('')

  const selectedType = searchParams.get('type')?.split(',') || []
  const selectedLength = searchParams.get('length')?.split(',') || []

  const updateQuery = (updates) => {
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

    params.set('page', '1')
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleTypeClick = (type) => {
    const typeStr = String(type)
    const newTypes = selectedType.includes(typeStr)
      ? selectedType.filter(t => t !== typeStr)
      : [...selectedType, typeStr]
    updateQuery({ type: newTypes })
  }

  const handleLengthClick = (length) => {
    const newLengths = selectedLength.includes(length)
      ? selectedLength.filter(l => l !== length)
      : [...selectedLength, length]
    updateQuery({ length: newLengths })
  }

  const applyPriceFilter = () => {
    updateQuery({
      minPrice: localMinPrice.trim(),
      maxPrice: localMaxPrice.trim()
    })
  }

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', isFiltersOpen)
  }, [isFiltersOpen])

  useEffect(() => {
    if (!isPriceOpen) {
      setLocalMinPrice('')
      setLocalMaxPrice('')
    }
  }, [isPriceOpen])

  return (
    <div className={styles.filters}>
      <div className={styles['filters-btn-wrapper']} onClick={() => setIsFiltersOpen(true)}>
        <Icon name="filter" />
        <div className={styles['filters-btn']}>Фільтри</div>
      </div>

      <div className={`${styles['filter-menu']} ${isFiltersOpen ? styles.active : ''}`}>
        <div className={styles['filter-heading']}>
          <h2>Фільтри</h2>
          <div className={styles['close-btn']} onClick={() => setIsFiltersOpen(false)}>
            <Icon name="close" />
          </div>
        </div>

        {/* Матеріал */}
        <div className={styles['filter-material']}>
          <div className={styles['material-heading']}>
            <h2>Матеріал</h2>
            <div className={styles['material-list-btn']} onClick={() => setIsMaterialOpen(!isMaterialOpen)}>
              <Icon name="arrow_down" />
            </div>
          </div>
          <ul className={`${styles['material-list']} ${isMaterialOpen ? styles.active : ''}`}>
            <li>
              <input
                type="checkbox"
                checked={selectedType.includes('1')}
                onChange={() => handleTypeClick(1)}
              />
              <span>Натуральне волосся</span>
            </li>
            <li>
              <input
                type="checkbox"
                checked={selectedType.includes('2')}
                onChange={() => handleTypeClick(2)}
              />
              <span>Синтетика</span>
            </li>
          </ul>
        </div>

        {/* Ціна */}
        <div className={styles['filter-price']}>
          <div className={styles['price-heading']}>
            <h2>Ціна</h2>
            <div className={styles['price-options-btn']} onClick={() => setIsPriceOpen(!isPriceOpen)}>
              <Icon name="arrow_down" />
            </div>
          </div>
          <form className={`${styles['price-options']} ${isPriceOpen ? styles.active : ''}`}>
            <div className={styles['price-inputs']}>
              <label className={styles['min-price']} htmlFor="min-price">
                <input
                  id="min-price"
                  step="100"
                  type="number"
                  value={localMinPrice}
                  onChange={(e) => setLocalMinPrice(e.target.value)}
                />
                <span className={styles.at}>від</span>
              </label>
              <div className={styles['price-separator']}></div>
              <label className={styles['max-price']} htmlFor="max-price">
                <input
                  id="max-price"
                  step="100"
                  type="number"
                  value={localMaxPrice}
                  onChange={(e) => setLocalMaxPrice(e.target.value)}
                />
                <span className={styles.to}>до</span>
              </label>
            </div>
            <button type="button" onClick={applyPriceFilter}>
              ОК
            </button>
          </form>
        </div>

        {/* Довжина */}
        <div className={styles['filter-length']}>
          <div className={styles['length-heading']}>
            <h2>Довжина</h2>
            <div className={styles['length-list-btn']} onClick={() => setIsLengthOpen(!isLengthOpen)}>
              <Icon name="arrow_down" />
            </div>
          </div>
          <ul className={`${styles['length-list']} ${isLengthOpen ? styles.active : ''}`}>
            <li>
              <input
                type="checkbox"
                checked={selectedLength.includes('LONG')}
                onChange={() => handleLengthClick('LONG')}
              />
              <span>Довга</span>
            </li>
            <li>
              <input
                type="checkbox"
                checked={selectedLength.includes('MEDIUM')}
                onChange={() => handleLengthClick('MEDIUM')}
              />
              <span>Середня</span>
            </li>
            <li>
              <input
                type="checkbox"
                checked={selectedLength.includes('SHORT')}
                onChange={() => handleLengthClick('SHORT')}
              />
              <span>Коротка</span>
            </li>
          </ul>
        </div>

        <div className={styles['apply-btn']} onClick={() => setIsFiltersOpen(false)}>
          Застосувати фільтри
        </div>
      </div>
    </div>
  )
}
