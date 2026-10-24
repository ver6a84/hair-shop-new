'use client'

import styles from './Reviews.module.css'
import { useState, useEffect, useRef } from 'react'
import Icon from './icon'
import { baseUrl } from '@/api/index'
import Pagination from '@/components/Pagination'
import { useSearchParams } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'

export default function Reviews({ product_id }) {
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState('')
  const [newRating, setNewRating] = useState(null)
  const [reviewerName, setReviewerName] = useState('')
  const [isFormAddReview, setIsFormAddReview] = useState(false)
  const [alertMessage, setIsAlertMessage] = useState('')
  const [hoveredStar, setHoveredStar] = useState(null)
  const reviewsRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 4
  const { t } = useTranslation()

  const searchParams = useSearchParams()
  const scrollTo = searchParams.get('scrollTo')

  const sortedReviews = [...reviews].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  )

  const paginatedReviews = sortedReviews.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const totalPages = Math.ceil(reviews.length / pageSize)

  useEffect(() => {
    if (scrollTo === 'reviews') {
      reviewsRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [scrollTo])

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setIsAlertMessage(''), 1500)
      return () => clearTimeout(timer)
    }
  }, [alertMessage])

  useEffect(() => {
    if (product_id) {
      fetch(`${baseUrl}/comments?product_id=${product_id}`)
        .then(res => {
          if (!res.ok) throw new Error('Помилка завантаження')
          return res.json()
        })
        .then(data => setReviews(data.comments || []))
        .catch(err => {
          console.error('Помилка при завантаженні:', err)
          setReviews([])
        })
    }
    setCurrentPage(1)
  }, [product_id])

  const handleAddReview = async () => {
    if (!newRating) {
      setIsAlertMessage(t('reviews.ratingRequired'))
      return
    }

    try {
      const res = await fetch(`${baseUrl}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: reviewerName.trim() || t('reviews.anonymous'),
          rating: newRating,
          review: newReview.trim() || null,
          product_id
        })
      })

      if (!res.ok) throw new Error('Помилка при додаванні коментаря')

      const updated = await fetch(`${baseUrl}/comments?product_id=${product_id}`)
      const data = await updated.json()
      setReviews(data.comments || [])

      setCurrentPage(1)
      setNewReview('')
      setNewRating(null)
      setReviewerName('')
      setIsFormAddReview(false)
      setIsAlertMessage('')
    } catch (err) {
      console.error(err)
      setIsAlertMessage(t('reviews.error'))
    }
  }

  return (
    <div className={styles['reviews-wrapper']}>
      <div className={styles['reviews-heading']}>
        <h2>{t('reviews.title')}</h2>
        <div className={styles['add-review-btn']} title={t('reviews.add')} onClick={() => setIsFormAddReview(true)}>
  <span className={styles['review-label']}>
    {t('reviews.leave')}
  </span>
  <span className={styles['review-icon']}>
    <Icon name="plus_white" />
  </span>
</div>


      </div>

      {isFormAddReview && (
        <div className={styles['review-form-wrapper']}>
          <div className={styles['review-form-heading']}>
            <h2>{t('reviews.formTitle')}</h2>
            <Icon
              className={styles['close-review-form']}
              name="close"
              size={16}
              onClick={() => setIsFormAddReview(false)}
            />
          </div>
          <form className={styles['review-form']}>
            <input
              type="text"
              placeholder={t('reviews.namePlaceholder')}
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
            />
            <div className={styles.rating}>
              <span>{t('reviews.chooseRating')}</span>
              <div className={styles['rating-stars']}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    aria-label={t('reviews.ratingLabel', { star })}
                    role="button"
                    tabIndex={0}
                    className={`${styles.star} ${star <= (hoveredStar || newRating) ? styles.active : ''}`}
                    key={star}
                    onClick={() => setNewRating(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(null)}
                  >
                    ★
                  </span>
                ))}
              </div>
              {alertMessage && <div className={styles['alert-message']}>{alertMessage}</div>}
            </div>
            <textarea
              rows={4}
              placeholder={t('reviews.commentPlaceholder')}
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
            />
            <button type="button" onClick={handleAddReview}>
              {t('reviews.leave')}
            </button>
          </form>
        </div>
      )}

      <div ref={reviewsRef} id="reviews" className={styles.reviews}>
        {paginatedReviews.map((r, i) => (
          <div key={i} className={styles['review-item']}>
            <div className={styles['rating-name']}>
              <div className={styles['reviews-name']}>{r.author}</div>
              <div className={styles['rating-date']}>
                <div className={styles['review-rating']}>{'⭐'.repeat(r.rating)}</div>
                <div className={styles['review-date']}>
                  {new Date(r.created_at).toLocaleDateString(t('dateLocale'), {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
            {r.text && <div className={styles['review-comment']}>{r.text}</div>}
          </div>
        ))}
        {reviews.length > pageSize && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  )
}
