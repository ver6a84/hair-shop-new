import Link from 'next/link'
import Image from 'next/image'
import styles from './HairCare.module.css'

export default function HairCare() {
	return (
		<section className={`${styles['hair-care']} container`}>
			<div className={styles['hair-care-img']}>
				<Image
					src="/care.webp"
					alt="Догляд за перуками"
					width={1200}
					height={600}
					sizes="(max-width: 400px) 100px, 400px"
					className={styles['card-image']}
				/>
				<h3>Як доглядати за перуками та робити укладку</h3>
				<Link className={styles['hair-care-link']} href="/care">Детальніше</Link>
			</div>
		</section>
	)
}
