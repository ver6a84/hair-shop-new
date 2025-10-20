'use client'

import Link from 'next/link'
import Image from 'next/image'
import styles from './CategoriesCard.module.css'
import { CATEGORIES_TRANSLATIONS, CATEGORIES_URLS } from '@/utils/constants'

export default function CategoriesCard({ categoryId }) {
  const title = CATEGORIES_TRANSLATIONS[categoryId]
  const url = CATEGORIES_URLS[categoryId]

  return (
    <Link href={`/products/${url}`} className={styles['offers-card']}>
      <Image
        src={`/${url}.webp`}
        alt={title}
        className={styles['card-image']}
        width={576}
        height={768}
        loading="lazy"
        sizes="(max-width: 190px) 48px, 190px"
      />
      <h2 className={styles['card-title']}>{title}</h2>
    </Link>
  )
}
