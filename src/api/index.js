import { HAIR_LENGTHS,LIDER_IDS } from '../utils/constants.js'

export const baseUrl = 'https://api.perukytyt.com/v1'
export const itemsPerPage = 10

function getTotalPages(filtered) {
  return Math.ceil(filtered.length / itemsPerPage)
}

function getPage(filtered, pageNumber) {
  if (pageNumber < 1 || pageNumber > getTotalPages(filtered)) return []
  const start = (pageNumber - 1) * itemsPerPage
  return filtered.slice(start, start + itemsPerPage)
}

function getHairLengthCategory(lengthValue) {
  const numericLength = Number(lengthValue)
  for (const key in HAIR_LENGTHS) {
    const [min, max] = HAIR_LENGTHS[key]
    if (numericLength >= min && numericLength <= max) {
      return key.toUpperCase()
    }
  }
  return null
}

export const getProducts = async ({
  category,
  type,
  length,
  minPrice,
  maxPrice,
  page = 1,
  sortOrder = null,
  ids = null
}) => {
  const response = await fetch(`${baseUrl}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = await response.json()
  const products = Array.isArray(data.products) ? data.products : []

  const normalizedType = Array.isArray(type) ? type.map(t => String(t).trim()) : []
  const normalizedLength = Array.isArray(length) ? length.map(l => l.trim().toUpperCase()) : []

  const filtered = products
  
    .filter(product => !category || category === product.category)
    .filter(product => !normalizedType.length || normalizedType.includes(String(product.type)))
    .filter(product => {
      if (!normalizedLength.length) return true
      const category = getHairLengthCategory(product.length)
      return category && normalizedLength.includes(category)
    })
    .filter(product => {
      const prices = product.variants
        .map(v => Number(v.promo_price))
        .filter(p => !isNaN(p))

      if (!prices.length) return false

      const minVariantPrice = Math.min(...prices)

      const hasMin = typeof minPrice === 'number' && !isNaN(minPrice)
      const hasMax = typeof maxPrice === 'number' && !isNaN(maxPrice)

      if (!hasMin && !hasMax) return true

      return (
        (!hasMin || minVariantPrice >= minPrice) &&
        (!hasMax || minVariantPrice <= maxPrice)
      )
    })

  const sorted = sortOrder
    ? filtered.slice().sort((a, b) => {
        const priceA = Math.min(...a.variants.map(v => Number(v.promo_price)).filter(p => !isNaN(p)))
        const priceB = Math.min(...b.variants.map(v => Number(v.promo_price)).filter(p => !isNaN(p)))
        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA
      })
    : filtered

  const paginated = getPage(sorted, page)

  return {
    items: paginated,
    totalPages: getTotalPages(sorted)
  }
}




export const getProduct = async (id) => {
  const response = await fetch(`${baseUrl}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  const products = data.products;
  return products.find(p => p.id === id) || null;
};

export const getLiderProducts = async () => {
  const response = await fetch(`${baseUrl}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  const products = Array.isArray(data.products) ? data.products : [];

  const liderProducts = products.filter(p => LIDER_IDS.includes(p.id));

  return liderProducts;
};
