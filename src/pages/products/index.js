import CatalogPage from '@/components/ProductsCategory'
import CanonicalLink from '@/components/CanonicalLink'
export default function Catalog() {
  return (
    <>
      <CanonicalLink path="/products" />
      <CatalogPage />
    </>
  )
}