'use client'

import styles from './Filters.module.css'
import Icon from '@/components/icon.jsx'
import { useState } from 'react'
import { useFilters } from '@/context'
import { useTranslation } from '@/hooks/useTranslation'

export default function Sort() {
  const [isSortOpen, setIsSortOpen] = useState(false)
  const { sortOrder, setSort } = useFilters()
  const { t } = useTranslation()

  const updateSort = (order) => {
    setSort(order)
    setIsSortOpen(false)
  }

  const toggleMenuSort = () => setIsSortOpen(!isSortOpen)

  return (
    <div className={styles.sort}>
      <div className={styles['sort-btn-wrapper']} onClick={toggleMenuSort}>
        <Icon name="filter" />
        <div className={styles['sort-btn']}>{t('sort.title')}</div>
      </div>
      <div className={`${styles['sort-menu']} ${isSortOpen ? styles.active : ''}`}>
        <ul>
          <li
            className={sortOrder === 'asc' ? styles.selected : ''}
            onClick={() => updateSort('asc')}
          >
            {t('sort.asc')}
          </li>
          <li
            className={sortOrder === 'desc' ? styles.selected : ''}
            onClick={() => updateSort('desc')}
          >
            {t('sort.desc')}
          </li>
        </ul>
      </div>
    </div>
  )
}
