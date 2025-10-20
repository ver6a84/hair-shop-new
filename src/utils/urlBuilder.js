import { CATEGORIES_URLS, ROUTES } from '@/utils/constants'

export const getCategoryUrl = (categoryId) => {
  const slug = CATEGORIES_URLS[categoryId]
  return slug ? `${ROUTES.PRODUCTS}/${slug}` : ROUTES.PRODUCTS
}

