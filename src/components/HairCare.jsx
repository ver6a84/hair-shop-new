import Link from 'next/link'
import styles from './HairCare.module.css'

export default function HairCare() {
	return (
		<section className={`${styles['hair-care']} container`}>
			<div className={styles['hair-care-img']}>
				<img
					src="/care.webp"
					alt="Догляд за перуками"
					width={768}
					height={512}
					sizes="(max-width: 400px) 100vw, (max-width: 768px) 80vw, 768px"
					className={styles['card-image']}
					loading='lazy'		
				/>
				<h3>Як доглядати за перуками та робити<br/> укладку</h3>
				<Link className={styles['hair-care-link']} href="/care">Детальніше</Link>
			</div>
		</section>
	)
}
