
import styles from './HeroBanner.module.css'

export default function HeroBanner() {
  return (
    <section className={styles.hero}>
       <img
        src={'./hero_image_mob.webp'}
        srcSet={'./hero_image.webp 1920w, ./hero_image_mob.webp 640w'}
        sizes='(max-width: 640px) 160px, 640px'
        alt="Hero"
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
            Якісні перуки та аксесуари для волосся
          </h2>
          <h3 className={styles['greetings-subtitle']}>
            Доставляємо перуки по всій Україні
          </h3>
          <p className={styles['greetings-text']}>
            Відкрийте для себе наш широкий асортимент преміальних перук та сучасних синтетичних альтернатив
          </p>
        </div>
      </div>
    </section>
  )
}
