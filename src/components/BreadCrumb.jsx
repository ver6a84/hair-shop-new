'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from '@/hooks/useTranslation'
import { getCategoryUrl } from '@/utils/urlBuilder'
import styles from './BreadCrumb.module.css'

export default function Breadcrumb({ categoryId, productName }) {
  const pathname = usePathname()
  const { t } = useTranslation()

  const isActive = (href) => pathname === href

  return (
    <div className={styles.breadcrumb}>
      <Link href="/" className={isActive('/') ? styles.active : ''}>{t('breadcrumb.home')}</Link>
      <span className={styles.separator}>/</span>
      <Link href="/products" className={isActive('/products') ? styles.active : ''}>{t('breadcrumb.catalog')}</Link>

      {categoryId && (
        <>
          <span className={styles.separator}>/</span>
          <Link
            href={getCategoryUrl(categoryId)}
            className={isActive(getCategoryUrl(categoryId)) ? styles.active : ''}
          >
            {t(`categories.${categoryId}`) || t('categories.fallback')}
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
