import CategoriesCard from '@/components/CategoriesCard'
import BreadCrumb from '@/components/BreadCrumb'
import { PRODUCT_CATEGORIES } from '@/utils/constants'
import styles from '@/styles/pages.module.css'

export default function CatalogPage({ showBreadCrumb = true }) {
  return (
    <div className={`${styles['products-page']} container`}>
      <h1>Наші товари</h1>
      {showBreadCrumb && <BreadCrumb />}
      <div className={styles['cards-grid']}>
        {Object.values(PRODUCT_CATEGORIES).map((item) => (
          <CategoriesCard key={item} categoryId={item} />
        ))}
      </div>
    </div>
  )
}
