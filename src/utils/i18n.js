import { SITE_URL, LOCALES, DEFAULT_LOCALE } from '@/utils/constants'

export const getLocalizedPath = (path, locale = DEFAULT_LOCALE) => {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (locale === DEFAULT_LOCALE) return normalized
  return normalized === '/' ? `/${locale}` : `/${locale}${normalized}`
}

export const getLocalizedUrl = (path, locale = DEFAULT_LOCALE) =>
  `${SITE_URL}${getLocalizedPath(path, locale)}`

// API returns `field` (ukrainian) and `field_ru`; fall back to ukrainian when there is no translation
export const getLocalizedField = (entity, field, locale = DEFAULT_LOCALE) => {
  if (!entity) return undefined
  if (locale === LOCALES.RU) return entity[`${field}_ru`] || entity[field]
  return entity[field]
}

export const hasRuTranslation = (product) => Boolean(product?.display_name_ru)
