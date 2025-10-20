'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CATEGORIES_TRANSLATIONS } from '@/utils/constants'
import { getCategoryUrl } from '@/utils/urlBuilder'
import styles from './BreadCrumb.module.css'

export default function Breadcrumb({ categoryId, productName }) {
  const pathname = usePathname()

  const isActive = (href) => pathname === href

  return (
    <div className={styles.breadcrumb}>
      <Link href="/" className={isActive('/') ? styles.active : ''}>Головна</Link>
      <span className={styles.separator}>/</span>
      <Link href="/products" className={isActive('/products') ? styles.active : ''}>Каталог</Link>

      {categoryId && (
        <>
          <span className={styles.separator}>/</span>
          <Link
            href={getCategoryUrl(categoryId)}
            className={isActive(getCategoryUrl(categoryId)) ? styles.active : ''}
          >
            {CATEGORIES_TRANSLATIONS[categoryId] || 'Категорія'}
          </Link>
        </>
      )}

      {productName && (
        <>
          <span className={styles.separator}>/</span>
          <span className={styles.current}>{productName}</span>
        </>
      )}
    </div>
  )
}
