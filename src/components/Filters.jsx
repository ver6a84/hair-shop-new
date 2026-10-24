'use client'

import styles from './Filters.module.css'
import Icon from './icon'
import { useState, useEffect } from 'react'
import { useFilters } from '@/context'
import { useTranslation } from '@/hooks/useTranslation'

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
    clearPriceFilter, 
    clearFilters,

    
    // UI Actions
    toggleFiltersOpen,
    toggleMaterialOpen,
    togglePriceOpen,
    toggleLengthOpen
  } = useFilters();
  const { t } = useTranslation()
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
        <div className={styles['filters-btn']}>{t('filters.title')}</div>
      </div>

      <div className={`${styles['filter-menu']} ${isFiltersOpen ? styles.active : ''}`}>
        <div className={styles['filter-heading']}>
          <h2>{t('filters.title')}</h2>
          <div className={styles['close-btn']} onClick={toggleFiltersOpen}>
            <Icon name="close" />
          </div>
        </div>

        {/* Матеріал */}
        <div className={styles['filter-material']}>
          <div className={styles['material-heading']}>
            <h2>{t('filters.material')}</h2>
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
              <span>{t('filters.natural')}</span>
            </li>
            <li>
              <input
                type="checkbox"
                checked={selectedType.includes('2')}
                onChange={() => toggleType(2)}
              />
              <span>{t('filters.synthetic')}</span>
            </li>
          </ul>
        </div>

        {/* Ціна */}
        <div className={styles['filter-price']}>
          <div className={styles['price-heading']}>
            <h2>{t('filters.price')}</h2>
            <div className={styles['price-options-btn']} onClick={ () =>{
              togglePriceOpen()
              clearPriceFilter()
              setLocalMinPrice('')
              setLocalMaxPrice('')
              }}>
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
                  max={99999}
                  value={localMinPrice}
                  onChange={(e) => {
                  const raw = e.target.value;
                  if (raw === "") {
                    setLocalMinPrice(""); 
                  } else {
                    const value = Number(raw);
                    if (value <= 99999) {
                      setLocalMinPrice(value);
                    }
                  }
                }}
                />
                <span className={styles.at}>{t('filters.from')}</span>
              </label>
              <div className={styles['price-separator']}></div>
              <label className={styles['max-price']} htmlFor="max-price">
                <input
                  id="max-price"
                  step="100"
                  max={99999}
                  type="number"
                  value={localMaxPrice}
                  onChange={(e) => {
                  const raw = e.target.value;
                  if (raw === "") {
                    setLocalMaxPrice(""); 
                  } else {
                    const value = Number(raw);
                    if (value <= 99999) {
                      setLocalMaxPrice(value);
                    }
                  }
                }}
                />
                <span className={styles.to}>{t('filters.to')}</span>
              </label>
            </div>
            <button type="button" onClick={handleApplyPriceFilter}>
              {t('filters.ok')}
            </button>
          </form>
        </div>

        {/* Довжина */}
        <div className={styles['filter-length']}>
          <div className={styles['length-heading']}>
            <h2>{t('filters.length')}</h2>
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
              <span>{t('hairLengths.LONG')}</span>
            </li>
            <li>
              <input
                type="checkbox"
                checked={selectedLength.includes('MEDIUM')}
                onChange={() => toggleLength('MEDIUM')}
              />
              <span>{t('hairLengths.MEDIUM')}</span>
            </li>
            <li>
              <input
                type="checkbox"
                checked={selectedLength.includes('SHORT')}
                onChange={() => toggleLength('SHORT')}
              />
              <span>{t('hairLengths.SHORT')}</span>
            </li>
          </ul>
        </div>
        <div className={styles.filtersBtn}>
        <div className={styles['reset-btn']} onClick={() => {
          clearFilters()
          setLocalMinPrice('')
          setLocalMaxPrice('')
          }}>
          {t('filters.reset')}
        </div>      
        <div className={styles['apply-btn']} onClick={toggleFiltersOpen}>
          {t('filters.apply')}
        </div>
        </div>
      </div>
    </div>
  )
}
