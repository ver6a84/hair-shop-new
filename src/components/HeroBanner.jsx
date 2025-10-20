import Image from 'next/image'
import styles from './HeroBanner.module.css'

export default function HeroBanner() {
  return (
    <section className={styles.hero}>
      <Image
        src="/hero_image.webp"
        alt="Hero"
        width={1920}
        height={1080}
        sizes="(max-width: 640px) 160px, 640px"
        className={styles['hero-image']}
      />
      <div className={styles.greetings}>
        <h1 className={styles['greetings-title']}>
          Перуки<br />т<span>у</span>т
        </h1>
        <div>
          <h2 className={styles['greetings-subtitle']}>
            Якісні перуки та аксесуари для волосся
          </h2>
          <p className={styles['greetings-text']}>
            Відкрийте для себе наш широкий асортимент преміальних перук та сучасних синтетичних альтернатив
          </p>
        </div>
      </div>
    </section>
  )
}
