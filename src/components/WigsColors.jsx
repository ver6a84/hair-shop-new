import Link from 'next/link'
import styles from './WigsColors.module.css'
import { useTranslation } from '@/hooks/useTranslation'

export default function WigsColors () {
	const { t } = useTranslation()

	return (
		<section className={`${styles['wigs-colors']} container`}>
			<div className={styles['wigs-colors-img']}>
				<img
					src="/WigsColors.webp"
					alt={t('home.colorsAlt')}
					width={1536}
					height={1024}
					sizes="(max-width: 400px) 100vw, (max-width: 768px) 80vw, 1536px"
					className={styles['card-image']}
					loading='lazy'		
				/>
				<h3>{t('home.colorsTitle')}</h3>
				<Link className={styles['wigs-colors-link']} href="/colors">{t('home.more')}</Link>
			</div>
		</section>
	)
}