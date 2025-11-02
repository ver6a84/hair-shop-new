import Products from '@/components/Products'
import { getProducts } from '@/api/index'
import { PRODUCT_CATEGORIES, CATEGORY_ID_BY_URL } from '@/utils/constants'

export async function getServerSideProps(context) {
  const { slug } = context.params
  const query = context.query;

  const selectedCategory = CATEGORY_ID_BY_URL[slug] || PRODUCT_CATEGORIES.WIGS
  
  const { items, totalPages } = await getProducts({ category: selectedCategory, ...query })

  return {
    props: {
      products: items,
      totalPages,
      selectedCategory
    }
  }
}


export default function ProductsPage(props) {
  return <Products {...props} />
}
