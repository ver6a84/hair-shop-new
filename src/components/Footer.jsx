import Link from 'next/link'
import styles from './Footer.module.css'
import Icon from './icon'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles['footer-container']} container`}>
        <div className={styles['logo-social']}>
          <div className={styles['footer-logo']}>
            <img src="/logo.webp" alt="logo" />
            <div className={styles['logo-text']}>
              <div className={styles['store-name']}>ПЕРУКИ<br />ТУТ</div>
              <span>MAГАЗИН ПЕРУК</span>
            </div>
          </div>

          <div className={styles.social}>
            <a href="https://t.me/perukytut" target="_blank" rel="noopener noreferrer">
              <Icon size={36} className={styles['social-icon']} name="telegram" />
            </a>
            <a href="viber://chat?number=%2B380932054774">
              <Icon size={36} className={styles['social-icon']} name="viber" />
            </a>
            <a href="mailto:perukitut@gmail.com">
              <Icon size={36} className={styles['social-icon']} name="mail" />
            </a>
          </div>
        </div>

        <div className={styles['products-feedback']}>
          <div className={styles.feedback}>
            <h3>Виникли запитання?</h3>
            <p>
              Ви можете <Link className={styles['feedback-link']} href="/contact_us">написати нам</Link> для зворотного зв'язку
            </p>
            <p>Щоденно з 9.00 до 21.00</p>
          </div>

          <div className={styles['products-help']}>
            <div className={styles.products}>
              <ul>
                <h4>Наші товари</h4>
                <li><Link href="/products/wigs">Перуки</Link></li>
                <li><Link href="/products/tails">Хвостики</Link></li>
                <li><Link href="/products/toppers">Топери</Link></li>
              </ul>
            </div>
            <div className={styles.help}>
              <ul>
                <h4>Допомога</h4>
                <li><Link href="/delivery">Доставка та оплата</Link></li>
                <li><Link href="/return">Обмін та повернення</Link></li>
                <li><Link href="/about">Про нас</Link></li>
                <li><Link href="/contact">Контакти</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        <Icon name="copyright" size={18} />
        <p>Перуки тут 2025</p>
      </div>
    </footer>
  )
}
