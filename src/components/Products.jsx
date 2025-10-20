'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  CATEGORIES_TRANSLATIONS,
  PRODUCT_CATEGORIES,
  CATEGORIES_URLS,
  HAIR_LENGTHS_TRANSLATIONS
} from "@/utils/constants"
import Breadcrumb from "./BreadCrumb"
import Filters from "./Filters"
import Sort from "./Sort"
import Pagination from "./Pagination"
import ProductCard from "./ProductCard"
import styles from '@/styles/pages.module.css'
import Link from 'next/link'

export default function Products({ products, totalPages, selectedCategory }) {
  const searchParams = useSearchParams()

  const lengthParam = searchParams.get('length') || ''
  const typeParam = searchParams.get('type') || ''
  const pageParam = searchParams.get('page') || '1'

  const lengthFilters = lengthParam.split(',').filter(Boolean)
  const typeFilters = typeParam.split(',').filter(Boolean)
  const page = Number(pageParam)

  const safeProducts = Array.isArray(products) ? products : []

  const [width, setWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const buildFilterUrl = ({ length, type, page }) => {
    const params = new URLSearchParams()
    if (length.length) params.set('length', length.join(','))
    if (type.length) params.set('type', type.join(','))
    params.set('page', String(page))
    return `/products/${CATEGORIES_URLS[selectedCategory]}?${params.toString()}`
  }

  return (
    <div className={`${styles['category-page']} container`}>
      <h1>{CATEGORIES_TRANSLATIONS[selectedCategory]}</h1>

      <Breadcrumb categoryId={selectedCategory} />

      <div className={`${styles['custom-filters']} ${selectedCategory !== PRODUCT_CATEGORIES.WIGS ? styles.hidden : ''}`}>
        {['SHORT', 'MEDIUM', 'LONG'].map(length => {
          const isSelected = lengthFilters.includes(length)
          const newLengths = isSelected
            ? lengthFilters.filter(l => l !== length)
            : [...lengthFilters, length]

          const href = buildFilterUrl({
            length: newLengths,
            type: typeFilters,
            page: 1
          })

          return (
            <Link key={length} href={href}>
              <button className={isSelected ? styles.selected : ''}>
                {HAIR_LENGTHS_TRANSLATIONS[length]}
              </button>
            </Link>
          )
        })}
      </div>

      <div className={styles['content-wrapper']}>
        <div className={styles['filters-wrapper']}>
          <Filters selectedCategory={selectedCategory} />
          {width < 768 && <Sort />}
        </div>

        <div className={styles['cards-grid-wrapper']}>
          {width > 768 && <Sort />}
          <div className={styles['cards-grid']}>
            {!safeProducts.length && <p>Немає продуктів</p>}
            {safeProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        selectedCategory={selectedCategory}
      />
    </div>
  )
}
