'use client'
import styles from './Header.module.css'
import { useCart } from '@/context/CartContext'
import { useEffect, useState } from 'react'

export default function HeaderCartCount() {
  const { itemCount } = useCart()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted || itemCount <= 0) return null

  return <span className={styles['header-cart-count']}>{itemCount}</span>
}
