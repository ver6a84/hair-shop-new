import Products from '@/components/Products'
import { getProducts } from '@/api/index'
import { CATEGORIES_URLS, PRODUCT_CATEGORIES } from '@/utils/constants'

export async function getServerSideProps(context) {
  const { slug } = context.params
  const query = context.query

  const urlToCategoryMap = Object.entries(CATEGORIES_URLS).reduce((acc, [id, slugValue]) => {
    acc[slugValue] = Number(id)
    return acc
  }, {})

  const selectedCategory = urlToCategoryMap[slug] || PRODUCT_CATEGORIES.WIGS

  const parseArray = (value) =>
    typeof value === 'string' ? value.split(',').map(v => v.trim()) : []

  const parseLengthArray = (value) =>
    typeof value === 'string' ? value.split(',').map(v => v.trim().toUpperCase()) : []

  const parseNumber = (value) => {
    const num = Number(value)
    return isNaN(num) ? null : num
  }

  const filters = {
    category: selectedCategory,
    type: parseArray(query.type),
    length: parseLengthArray(query.length),
    minPrice: parseNumber(query.minPrice),
    maxPrice: parseNumber(query.maxPrice),
    page: parseNumber(query.page) || 1,
    sortOrder: typeof query.sortOrder === 'string' ? query.sortOrder : null
  }

  const { items, totalPages } = await getProducts(filters)

  return {
    props: {
      products: items,
      totalPages,
      filters,
      selectedCategory
    }
  }
}

// ✅ Це React-компонент, і він обов'язково має бути default export
export default function ProductsPage(props) {
  return <Products {...props} />
}
