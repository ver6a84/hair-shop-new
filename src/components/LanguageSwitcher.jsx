'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Icon from './icon'
import { LOCALES } from '@/utils/constants'
import { useTranslation } from '@/hooks/useTranslation'
import styles from './LanguageSwitcher.module.css'

// language names are always shown in their own language
const LANGUAGES = [
  { locale: LOCALES.UK, label: 'UA', name: 'Українська' },
  { locale: LOCALES.RU, label: 'RU', name: 'Русский' },
]

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const switcherRef = useRef(null)
  const { asPath } = useRouter()
  const { t, locale } = useTranslation()

  const current = LANGUAGES.find((language) => language.locale === locale) || LANGUAGES[0]

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e) => {
      if (!switcherRef.current?.contains(e.target)) setIsOpen(false)
    }
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  return (
    <div className={styles.switcher} ref={switcherRef}>
      <button
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={t('header.language')}
      >
        {current.label}
        <Icon name="arrow_down" size={10} className={styles.arrow} />
      </button>

      {/* options stay in the DOM (hidden with css) so search engines see links to both language versions */}
      <ul className={`${styles.options} ${isOpen ? styles.visible : ''}`}>
        {LANGUAGES.map((language) => (
          <li key={language.locale}>
            <Link
              href={asPath}
              locale={language.locale}
              hrefLang={language.locale}
              className={language.locale === locale ? styles.active : ''}
              aria-current={language.locale === locale ? 'true' : undefined}
              onClick={() => setIsOpen(false)}
            >
              <span className={styles.code}>{language.label}</span>
              {language.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
