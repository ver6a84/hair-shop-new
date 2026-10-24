
import styles from './HeroBanner.module.css'
import { useTranslation } from '@/hooks/useTranslation'

export default function HeroBanner() {
  const { t } = useTranslation()

  return (
    <section className={styles.hero}>
       <img
        src={'./hero_image_mob.webp'}
        srcSet={'./hero_image.webp 1920w, ./hero_image_mob.webp 640w'}
        sizes='(max-width: 640px) 160px, 640px'
        alt={t('home.heroAlt')}
        width={1920}
        height={1080}
        loading='lazy'
      />
      <div className={styles.greetings}>
        <h1 className={styles['greetings-title']}>
          Перуки<br />т<span>у</span>т
        </h1>
        <div>
          <h2 className={styles['greetings-subtitle']}>
            {t('home.heroSubtitle')}
          </h2>
          <h3 className={styles['greetings-subtitle']}>
            {t('home.heroDelivery')}
          </h3>
          <p className={styles['greetings-text']}>
            {t('home.heroText')}
          </p>
        </div>
      </div>
    </section>
  )
}
