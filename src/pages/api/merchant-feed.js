import { baseUrl } from '@/api'
import { getImageUrlByKey } from '@/api/images'
import { CATEGORIES_URLS, PRODUCT_CATEGORIES } from '@/utils/constants'

// Google Merchant Center product feed, served at /merchant-feed.csv (see rewrites in next.config.mjs).
// Built from the live API on every request (cached on the CDN for an hour), so prices and
// availability always match the product pages. One row per colour variant, grouped by item_group_id.

const SITE_URL = 'https://perukytut.com.ua'
const MAX_ADDITIONAL_IMAGES = 10

// https://www.google.com/basepages/producttype/taxonomy-with-ids.en-US.txt
const GOOGLE_CATEGORY = {
  [PRODUCT_CATEGORIES.WIGS]: '181', // Apparel & Accessories > Clothing Accessories > Hair Accessories > Wigs
  [PRODUCT_CATEGORIES.TAILS]: '4057', // ... > Hair Accessories > Hair Extensions
  [PRODUCT_CATEGORIES.TOPPERS]: '4057',
}

const PRODUCT_TYPE = {
  [PRODUCT_CATEGORIES.WIGS]: 'Перуки',
  [PRODUCT_CATEGORIES.TAILS]: 'Хвостики',
  [PRODUCT_CATEGORIES.TOPPERS]: 'Топери',
}

const MATERIAL = {
  1: 'Натуральне волосся',
  2: 'Синтетичне волокно',
}

const COLUMNS = [
  'id',
  'item_group_id',
  'title',
  'description',
  'link',
  'image_link',
  'additional_image_link',
  'price',
  'availability',
  'condition',
  'brand',
  'identifier_exists',
  'google_product_category',
  'product_type',
  'color',
  'material',
  'gender',
  'age_group',
]

const csvCell = (value) =>
  `"${String(value ?? '').replace(/\s+/g, ' ').trim().replace(/"/g, '""')}"`

const imageUrl = (image) => getImageUrlByKey(image, { width: 800, height: 1200, quality: 90 })

const toRows = (product) => {
  const categorySlug = CATEGORIES_URLS[product.category] || 'wigs'
  const productUrl = `${SITE_URL}/products/${categorySlug}/${product.id}`
  const hasManyVariants = product.variants.length > 1

  return product.variants
    .filter((variant) => variant.images?.length)
    .map((variant) => {
      const [mainImage, ...restImages] = variant.images
      const color = variant.color_display_name || ''
      const material = MATERIAL[product.type] || ''
      const typeParts = [PRODUCT_TYPE[product.category], material].filter(Boolean)

      return {
        id: variant.id,
        item_group_id: hasManyVariants ? product.id : '',
        // colour in the title keeps the many similarly named models distinguishable
        title: [product.display_name, color].filter(Boolean).join(', ').slice(0, 150),
        description: (product.description || product.display_name).slice(0, 5000),
        link: hasManyVariants ? `${productUrl}?variant=${variant.id}` : productUrl,
        image_link: imageUrl(mainImage),
        additional_image_link: restImages.slice(0, MAX_ADDITIONAL_IMAGES).map(imageUrl).join(','),
        price: `${variant.price} UAH`,
        availability: variant.availability ? 'in stock' : 'out of stock',
        condition: 'new',
        // products are not our own brand and have no GTIN: leave brand empty, say there are no identifiers
        brand: '',
        identifier_exists: 'no',
        google_product_category: GOOGLE_CATEGORY[product.category] || GOOGLE_CATEGORY[PRODUCT_CATEGORIES.WIGS],
        product_type: typeParts.join(' > '),
        color,
        material,
        gender: 'female',
        age_group: 'adult',
      }
    })
}

export default async function handler(req, res) {
  try {
    const response = await fetch(`${baseUrl}/products`, {
      headers: { 'Content-Type': 'application/json' },
    })
    if (!response.ok) throw new Error(`products api responded ${response.status}`)

    const { products = [] } = await response.json()
    const rows = products.flatMap(toRows)

    const csv = [
      COLUMNS.join(','),
      ...rows.map((row) => COLUMNS.map((column) => csvCell(row[column])).join(',')),
    ].join('\n')

    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
    res.status(200).send(csv)
  } catch (error) {
    console.error('Failed to build merchant feed:', error)
    // a 5xx makes Merchant Center keep the previous fetch instead of wiping all products
    res.status(503).send('feed temporarily unavailable')
  }
}
