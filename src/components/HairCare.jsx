import Link from 'next/link'
import styles from './HairCare.module.css'
import { useTranslation } from '@/hooks/useTranslation'

export default function HairCare() {
	const { t } = useTranslation()

	return (
		<section className={`${styles['hair-care']} container`}>
			<div className={styles['hair-care-img']}>
				<img
					src="/care.webp"
					alt={t('home.careAlt')}
					width={768}
					height={512}
					sizes="(max-width: 400px) 100vw, (max-width: 768px) 80vw, 768px"
					className={styles['card-image']}
					loading='lazy'		
				/>
				<h3>{t('home.careTitleStart')}<br/> {t('home.careTitleEnd')}</h3>
				<Link className={styles['hair-care-link']} href="/care">{t('home.more')}</Link>
			</div>
		</section>
	)
}
