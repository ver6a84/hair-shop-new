'use client'

import styles from './Filters.module.css'
import Icon from '@/components/icon.jsx'
import { useState } from 'react'
import { useFilters } from '@/context'

export default function Sort() {
  const [isSortOpen, setIsSortOpen] = useState(false)
  const { sortOrder, setSort } = useFilters()

  const updateSort = (order) => {
    setSort(order)
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
            className={sortOrder === 'asc' ? styles.selected : ''}
            onClick={() => updateSort('asc')}
          >
            За зростанням ціни
          </li>
          <li
            className={sortOrder === 'desc' ? styles.selected : ''}
            onClick={() => updateSort('desc')}
          >
            За спаданням ціни
          </li>
        </ul>
      </div>
    </div>
  )
}
