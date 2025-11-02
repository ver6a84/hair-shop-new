'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import styles from './ProductCard.module.css'
import { getImageUrlByKey } from '@/api/images'
import { HAIR_TYPES_TRANSLATIONS, CATEGORIES_URLS } from '@/utils/constants'
import Icon from './icon'
import Rating from '@/components/Rating.jsx'

export default function ProductCard({ product }) {
  const [selectedVariant, setSelectedVariant] = useState(0)
  const variantsRef = useRef(null)

  const scrollLeft = () => {
    variantsRef.current?.scrollBy({ left: -85, behavior: 'smooth' })
  }

  const scrollRight = () => {
    variantsRef.current?.scrollBy({ left: 85, behavior: 'smooth' })
  }

  const handleVariantClick = (e, variantIndex) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedVariant(variantIndex)
  }

  const selected = product.variants[selectedVariant]

  const categorySlug = CATEGORIES_URLS[product.category] || 'wigs'

  return (
    <div className={styles['product-card']}>
      <div className={styles['product-image-container']}>
        <Link 
        href={`/products/${categorySlug}/${product.id}`} 
        className={styles['product-card-link']}
        >
          <div className={styles['main-image-wrapper']}>
            <img
              src={getImageUrlByKey(product.variants[selectedVariant].images[0], { width: 400, height: 600, quality: 100 })}
            srcSet={`
              ${getImageUrlByKey(product.variants[selectedVariant].images[0], { width: 320, height: 480, quality: 100 })} 320w,
              ${getImageUrlByKey(product.variants[selectedVariant].images[0], { width: 600, height: 900, quality: 100 })} 600w
            `}
            sizes="(max-width: 600px) 160px, 300px"
            width={400}
            height={600}
            alt={product.display_name}
            loading="lazy"
            decoding="async"
            className={styles['product-main-image']}
            />
            <div className={styles['product-material']}>
              {HAIR_TYPES_TRANSLATIONS[product.type]}
            </div>
          </div>
        </Link>

        {product.variants.length > 1 && (
          <div className={styles['product-variants-wrapper']}>
            <div
              className={`${styles['product-variants']} ${product.variants.length < 4 ? styles.centered : ''}`}
              ref={variantsRef}
            >
              {product.variants.map((variant, index) => (
                <button
                  key={index}
                  className={`${styles['variant-thumbnail']} ${selectedVariant === index ? styles.active : ''}`}
                  onClick={(e) => handleVariantClick(e, index)}
                  tabIndex="-1"
                  aria-label={`Варіант ${index + 1}`}
                >
                 <img
                    src={getImageUrlByKey(variant.images[0], { width: 60, height: 60, quality: 100 })}
                    alt={`${product.display_name} variant ${index + 1}`}
                    title={`${variant.color}`}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

            {product.variants.length > 4 && (
              <div className={styles['variants-select-btn']}>
                <div onClick={scrollLeft} className={styles['btn-prev']}>
                  <Icon name="arrow_left" />
                </div>
                <div onClick={scrollRight} className={styles['btn-next']}>
                  <Icon name="arrow_right" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles['product-card-content']}>
       <Rating product_id={product.id} />
       <Link 
        href={`/products/${categorySlug}/${product.id}`} 
        className={styles['product-card-link']}
        >
          <h3>{product.display_name}</h3>
        </Link>

        <div className={styles.promo}>
          <p className={styles['old-price']}>{selected.price} грн</p>
          <p className={styles.discount}>
            {Math.round(((selected.promo_price - selected.price) / selected.price) * 100)}%
          </p>
        </div>

        <p className={styles['product-price']}>{selected.promo_price} грн</p>
      </div>
    </div>
  )
}
