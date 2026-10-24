'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { RU_LOCALE_READY } from '@/utils/constants'
import Icon from './icon'
import styles from './Header.module.css' 
import HeaderCart from './HeaderCart'
import LanguageSwitcher from './LanguageSwitcher'
import { useTranslation } from '@/hooks/useTranslation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useTranslation()

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
            aria-label={isMenuOpen ? t('header.closeMenu') : t('header.openMenu')}
            size={24}
            name={isMenuOpen ? 'close' : 'burger'}
          />
        </div>

        <div className={styles['header-logo']}>
          <img src="/logo.webp" alt="logo" />
          <div className={styles['logo-text']}>
            <div className={styles['store-name']}>ПЕРУКИ<br />ТУТ</div>
            <span>{t('header.storeSubtitle')}</span>
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
                {t('header.home')}
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className={isActive('/products') ? styles['active'] : ''}
                onClick={closeMenu}
              >
                {t('header.catalog')}
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={isActive('/about') ? styles['active'] : ''}
                onClick={closeMenu}
              >
                {t('header.about')}
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={isActive('/contact') ? styles['active'] : ''}
                onClick={closeMenu}
              >
                {t('header.contacts')}
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles['header-actions']}>
          {RU_LOCALE_READY && <LanguageSwitcher />}
          <HeaderCart />
        </div>
      </div>
    </header>
  )
}
