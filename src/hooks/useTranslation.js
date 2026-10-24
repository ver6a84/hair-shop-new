import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { DEFAULT_LOCALE } from '@/utils/constants'
import uk from '@/locales/uk'
import ru from '@/locales/ru'

const DICTIONARIES = { uk, ru }

const resolve = (dictionary, key) =>
  key.split('.').reduce((acc, part) => acc?.[part], dictionary)

// t('cart.itemsCount', { count: 2 }) — strings support {var} placeholders,
// functions are used where the text depends on a value (plurals)
export function useTranslation() {
  const { locale = DEFAULT_LOCALE } = useRouter()

  const t = useCallback((key, vars = {}) => {
    const value = resolve(DICTIONARIES[locale], key) ?? resolve(DICTIONARIES[DEFAULT_LOCALE], key)
    if (typeof value === 'function') return value(vars)
    if (typeof value !== 'string') return key
    return value.replace(/\{(\w+)\}/g, (match, name) => vars[name] ?? match)
  }, [locale])

  return { t, locale }
}
