import styles from './Liders.module.css'
import ProductCard from './ProductCard'
import { useTranslation } from '@/hooks/useTranslation'

export default function Liders({liderProducts}) {
	const { t } = useTranslation()

	const safeProducts = liderProducts || [];


	return(
		<div className={styles.lidersWrap}>
			<h2>{t('home.liders')}</h2>
		<div className={`${styles.lidersGrid} container`}>
			{safeProducts.map(product => (
			<ProductCard key={product.id} product={product} />
			))}
		</div>
		</div>
	)
}