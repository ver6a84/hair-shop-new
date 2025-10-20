'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Icon from './icon'
import styles from './Header.module.css' 
import HeaderCart from './HeaderCart'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', isMenuOpen)
  }, [isMenuOpen])

  const isActive = (href) => pathname === href

  return (
    <header className={styles.header}>
      <div className={`${styles['header-container']} container`}>
        <div className={styles['header-burger']} onClick={toggleMenu}>
          <Icon
            aria-label={isMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
            size={24}
            name={isMenuOpen ? 'close' : 'burger'}
          />
        </div>

        <div className={styles['header-logo']}>
          <img src="/logo.webp" alt="logo" />
          <div className={styles['logo-text']}>
            <div className={styles['store-name']}>ПЕРУКИ<br />ТУТ</div>
            <span>МАГАЗИН ПЕРУК</span>
          </div>
        </div>

        <div className={`${styles['header-menu']} ${isMenuOpen ? styles['active'] : ''}`}>
          <ul>
            <li>
              <Link
                href="/"
                className={isActive('/') ? styles['active'] : ''}
                onClick={closeMenu}
              >
                Головна
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className={isActive('/products') ? styles['active'] : ''}
                onClick={closeMenu}
              >
                Каталог
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={isActive('/about') ? styles['active'] : ''}
                onClick={closeMenu}
              >
                Про нас
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={isActive('/contact') ? styles['active'] : ''}
                onClick={closeMenu}
              >
                Контакти
              </Link>
            </li>
          </ul>
        </div>

        <HeaderCart />
      </div>
    </header>
  )
}
