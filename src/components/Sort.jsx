'use client'

import styles from './Filters.module.css'
import Icon from '@/components/icon.jsx'
import { useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export default function Sort() {
  const [isSortOpen, setIsSortOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const currentSort = searchParams.get('sortOrder') || null

  const updateSort = (order) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sortOrder', order)
    params.set('page', '1') // скидаємо пагінацію

    router.push(`${pathname}?${params.toString()}`)
    setIsSortOpen(false)
  }

  const toggleMenuSort = () => setIsSortOpen(!isSortOpen)

  return (
    <div className={styles.sort}>
      <div className={styles['sort-btn-wrapper']} onClick={toggleMenuSort}>
        <Icon name="filter" />
        <div className={styles['sort-btn']}>Сортувати</div>
      </div>
      <div className={`${styles['sort-menu']} ${isSortOpen ? styles.active : ''}`}>
        <ul>
          <li
            className={currentSort === 'asc' ? styles.selected : ''}
            onClick={() => updateSort('asc')}
          >
            За зростанням ціни
          </li>
          <li
            className={currentSort === 'desc' ? styles.selected : ''}
            onClick={() => updateSort('desc')}
          >
            За спаданням ціни
          </li>
        </ul>
      </div>
    </div>
  )
}
