'use client'

import Link from 'next/link'
import styles from './CategoriesCard.module.css'
import { CATEGORIES_URLS } from '@/utils/constants'
import { useTranslation } from '@/hooks/useTranslation'

export default function CategoriesCard({ categoryId }) {
  const { t } = useTranslation()
  const title = t(`categories.${categoryId}`)
  const url = CATEGORIES_URLS[categoryId]
  const srcSet = `
  ${url}.webp 190w,
  ${url}_desktop.webp 576w
`;

  return (
    <Link href={`/products/${url}`} className={styles['offers-card']}>
      <img
      src={`/${url}.webp`} 
      loading='lazy' 
      alt={title} 
      srcSet={srcSet}
      sizes='(max-width: 190px) 48px, 190px'
      width={576}
      height={768}
      className={styles['card-image']}
      />
      <h2 className={styles['card-title']}>{title}</h2>
    </Link>
  )
}
