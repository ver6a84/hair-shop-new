import fs from 'fs'
import path from 'path'
import { getImageUrlByKey } from '../src/api/images.js'

const PRODUCT_CATEGORIES = {
  WIGS: 1,
  TAILS: 2,
  TOPPERS: 3
}

const CATEGORIES_URLS = {
  [PRODUCT_CATEGORIES.WIGS]: 'wigs',
  [PRODUCT_CATEGORIES.TAILS]: 'tails',
  [PRODUCT_CATEGORIES.TOPPERS]: 'toppers'
}

const BASE_URL = 'https://perukytut.com.ua'
const API_URL = 'https://api.perukytyt.com/v1/products'

const escape = (text) =>
  `"${String(text).replace(/"/g, '""').replace(/\n/g, ' ')}"`

const getAllProducts = async () => {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  const data = await response.json()
  return data.products || []
}

const generateFeed = async () => {
  try {
    const products = await getAllProducts()

    const headers = [
      'id',
      'title',
      'description',
      'link',
      'image_link',
      'price',
      'availability',
      'condition',
      'brand',
      'gtin'
    ]

    const rows = products.map((product) => {
      const variant = product.variants?.[0]
      if (!variant) return null

      const imageRaw = variant.images?.[0]
      const imageObj = typeof imageRaw === 'string' ? { url: imageRaw } : imageRaw
      const imageUrl = getImageUrlByKey(imageObj, { width: 600, height: 900 })

      const categorySlug = CATEGORIES_URLS[product.category] || 'wigs'
      const availability = variant.availability ? 'in stock' : 'out of stock'
      const price = `${variant.price} UAH`

      return [
        escape(product.id),
        escape(product.display_name),
        escape(product.description),
        escape(`${BASE_URL}/products/${categorySlug}/${product.id}`),
        escape(imageUrl),
        escape(price),
        escape(availability),
        escape('new'),
        escape('ПЕРУКИ ТУТ'),
        escape('') // або escape(variant.gtin || '')
      ].join(',')
    }).filter(Boolean)

    const csvContent = [headers.join(','), ...rows].join('\n')
    const filePath = path.resolve('public', 'merchant-feed.csv')
    fs.writeFileSync(filePath, csvContent)

    console.log(`✅ merchant-feed.csv успішно створено → ${filePath}`)
  } catch (error) {
    console.error('❌ Помилка при генерації фіда:', error)
  }
}

generateFeed()
