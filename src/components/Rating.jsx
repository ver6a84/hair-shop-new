'use client'

import { useState, useEffect } from 'react'
import { baseUrl } from '@/api/index'
import styles from './Rating.module.css'

export default function Rating({ product_id }) {
  const [rating, setRating] = useState(null)

  useEffect(() => {
    fetch(`${baseUrl}/rating?product_id=${product_id}`)
      .then(res => res.json())
      .then(data => setRating(data))
  }, [product_id])

  if (!rating || rating.count === 0) return null

  function StarRating({ value, max = 5 }) {
    const fullStars = Math.floor(value)
    const halfStar = value - fullStars >= 0.25 && value - fullStars < 0.75
    const emptyStars = max - fullStars - (halfStar ? 1 : 0)

    return (
      <span className={styles['star-rating']}>
        {'★'.repeat(fullStars)}
        {halfStar && '⯨'}
        {'☆'.repeat(emptyStars)}
      </span>
    )
  }

  return (
    <div className={styles['average-rating-reviews']}>
      <div className={styles['average-rating']}>
        <div className={styles['rating-stars']}>
          <StarRating value={Number(rating.average)} />
        </div>
        <div className={styles['rating-numbers']}>
          {Number(rating.average).toFixed(1)}
        </div>
      </div>
      <div className={styles['reviews-count']}>
        {rating.count}
        {
          rating.count % 10 === 1 && rating.count % 100 !== 11
            ? 'відгук'
            : rating.count % 10 >= 2 && rating.count % 10 <= 4 &&
              (rating.count % 100 < 10 || rating.count % 100 >= 20)
            ? 'відгуки'
            : 'відгуків'
        }
      </div>
    </div>
  )
}
