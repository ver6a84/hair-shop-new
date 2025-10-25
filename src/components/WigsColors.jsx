import Link from 'next/link'
import styles from './WigsColors.module.css'

export default function WigsColors () {
	return (
		<section className={`${styles['wigs-colors']} container`}>
			<div className={styles['wigs-colors-img']}>
				<img
					src="/WigsColors.webp"
					alt="Догляд за перуками"
					width={1536}
					height={1024}
					sizes="(max-width: 400px) 100vw, (max-width: 768px) 80vw, 1536px"
					className={styles['card-image']}
					loading='lazy'		
				/>
				<h3>Поради по підбору кольору перуки</h3>
				<Link className={styles['wigs-colors-link']} href="/colors">Детальніше</Link>
			</div>
		</section>
	)
}