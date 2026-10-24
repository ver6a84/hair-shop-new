import CategoriesCard from '@/components/CategoriesCard'
import BreadCrumb from '@/components/BreadCrumb'
import { PRODUCT_CATEGORIES } from '@/utils/constants'
import styles from '@/styles/pages.module.css'
import Head from 'next/head'
import { useTranslation } from '@/hooks/useTranslation'

export default function CatalogPage({ showBreadCrumb = true }) {
  const { t } = useTranslation()

  return (
    <>
    {showBreadCrumb && (
      <Head>
        <title>{t('meta.catalogTitle')}</title>
      </Head>
    )}
    <div className={`${styles['products-page']} container`}>
      {showBreadCrumb ? <h1>{t('home.ourProducts')}</h1> : <h2>{t('home.ourProducts')}</h2>}
      {showBreadCrumb && <BreadCrumb />}
      <div className={styles['cards-grid']}>
        {Object.values(PRODUCT_CATEGORIES).map((item) => (
          <CategoriesCard key={item} categoryId={item} />
        ))}
      </div>
    </div>
    </>
  )
}
