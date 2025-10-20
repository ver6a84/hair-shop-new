import styles from './Liders.module.css'
import ProductCard from './ProductCard'

export default function Liders({liderProducts}) {

	const safeProducts = liderProducts || [];


	return(
		<div className={styles.lidersWrap}>
			<h1>Лідери продажу</h1>
		<div className={`${styles.lidersGrid} container`}>
			{safeProducts.map(product => (
			<ProductCard key={product.id} product={product} />
			))}
		</div>
		</div>
	)
}