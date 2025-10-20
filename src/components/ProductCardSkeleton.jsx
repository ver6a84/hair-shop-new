import styles from './ProductCardSkeleton.module.css'

export default function ProductCardSkeleton() {
  return (
    <div className={styles['product-card-skeleton']}>
      <div className={styles['skeleton-image']}></div>
      <div className={styles['skeleton-title']}></div>
      <div className={styles['skeleton-description']}></div>
      <div className={styles['skeleton-price']}></div>
    </div>
  )
}
