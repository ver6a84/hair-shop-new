'use client'

import styles from './Filters.module.css'
import Icon from './icon'
import { useState, useEffect } from 'react'
import { useFilters } from '@/context'

export default function Filters({ selectedCategory }) {
  const {
    // State
    selectedType,
    selectedLength,
    minPrice,
    maxPrice,
    isFiltersOpen,
    isMaterialOpen,
    isPriceOpen,
    isLengthOpen,
    
    // Actions
    toggleType,
    toggleLength,
    applyPriceFilter,
    
    // UI Actions
    toggleFiltersOpen,
    toggleMaterialOpen,
    togglePriceOpen,
    toggleLengthOpen
  } = useFilters();
  // Local state for price inputs (before applying)
  const [localMinPrice, setLocalMinPrice] = useState(minPrice)
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice)

  useEffect(() => {
    setLocalMinPrice(minPrice)
    setLocalMaxPrice(maxPrice)
  }, [minPrice, maxPrice])

  const handleApplyPriceFilter = () => {
    applyPriceFilter(localMinPrice, localMaxPrice)
  }

  return (
    <div className={styles.filters}>
      <div className={styles['filters-btn-wrapper']} onClick={toggleFiltersOpen}>
        <Icon name="filter" />
        <div className={styles['filters-btn']}>Фільтри</div>
      </div>

      <div className={`${styles['filter-menu']} ${isFiltersOpen ? styles.active : ''}`}>
        <div className={styles['filter-heading']}>
          <h2>Фільтри</h2>
          <div className={styles['close-btn']} onClick={toggleFiltersOpen}>
            <Icon name="close" />
          </div>
        </div>

        {/* Матеріал */}
        <div className={styles['filter-material']}>
          <div className={styles['material-heading']}>
            <h2>Матеріал</h2>
            <div className={styles['material-list-btn']} onClick={toggleMaterialOpen}>
              <Icon name="arrow_down" />
            </div>
          </div>
          <ul className={`${styles['material-list']} ${isMaterialOpen ? styles.active : ''}`}>
            <li>
              <input
                type="checkbox"
                checked={selectedType.includes('1')}
                onChange={() => toggleType(1)}
              />
              <span>Натуральне волосся</span>
            </li>
            <li>
              <input
                type="checkbox"
                checked={selectedType.includes('2')}
                onChange={() => toggleType(2)}
              />
              <span>Синтетика</span>
            </li>
          </ul>
        </div>

        {/* Ціна */}
        <div className={styles['filter-price']}>
          <div className={styles['price-heading']}>
            <h2>Ціна</h2>
            <div className={styles['price-options-btn']} onClick={togglePriceOpen}>
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
            <button type="button" onClick={handleApplyPriceFilter}>
              ОК
            </button>
          </form>
        </div>

        {/* Довжина */}
        <div className={styles['filter-length']}>
          <div className={styles['length-heading']}>
            <h2>Довжина</h2>
            <div className={styles['length-list-btn']} onClick={toggleLengthOpen}>
              <Icon name="arrow_down" />
            </div>
          </div>
          <ul className={`${styles['length-list']} ${isLengthOpen ? styles.active : ''}`}>
            <li>
              <input
                type="checkbox"
                checked={selectedLength.includes('LONG')}
                onChange={() => toggleLength('LONG')}
              />
              <span>Довга</span>
            </li>
            <li>
              <input
                type="checkbox"
                checked={selectedLength.includes('MEDIUM')}
                onChange={() => toggleLength('MEDIUM')}
              />
              <span>Середня</span>
            </li>
            <li>
              <input
                type="checkbox"
                checked={selectedLength.includes('SHORT')}
                onChange={() => toggleLength('SHORT')}
              />
              <span>Коротка</span>
            </li>
          </ul>
        </div>

        <div className={styles['apply-btn']} onClick={toggleFiltersOpen}>
          Застосувати фільтри
        </div>
      </div>
    </div>
  )
}
