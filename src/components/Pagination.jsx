'use client'

import styles from './Pagination.module.css'
import Icon from './icon'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export default function Pagination({ currentPage, totalPages }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(page))
    router.push(`${pathname}?${params.toString()}`)
    scrollToTop()
  }

  return (
    <nav className={styles['pagination-wrapper']} aria-label="Пагінація">
      <button
        className={`${styles['pagination-btn']} ${currentPage === 1 ? styles.disabled : ''}`}
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Попередня сторінка"
      >
        <Icon name="arrow_left" />
      </button>

      <div className={styles['page-numbers']}>
        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1
          return (
            <button
              key={page}
              className={`${styles['page-number']} ${page === currentPage ? styles.active : ''}`}
              onClick={() => goToPage(page)}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          )
        })}
      </div>

      <button
        className={`${styles['pagination-btn']} ${currentPage === totalPages ? styles.disabled : ''}`}
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Наступна сторінка"
      >
        <Icon name="arrow_right" />
      </button>
    </nav>
  )
}
