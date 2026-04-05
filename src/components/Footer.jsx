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
            <a href="https://www.instagram.com/perukytut">
              <Icon size={36} className={styles['social-icon']} name="instagram" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61582294457333">
              <Icon size={36} className={styles['social-icon']} name="facebook" />
            </a>
          </div>
        </div>

        <div className={styles['products-feedback']}>
          <div className={styles.feedback}>
            <h3>Виникли запитання?</h3>
            <p>
              Ви можете <Link className={styles['feedback-link']} href="/contact_us">написати нам</Link> для зворотнього зв'язку
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
                <li><Link href="/delivery-ukraine">Доставка та оплата</Link></li>
                <li><Link href="/return">Обмін та повернення</Link></li>
                <li><Link href="/about">Про нас</Link></li>
                <li><Link href="/contact">Контакти</Link></li>
              </ul>
            </div>
            <div className={styles.contacts}>
              <h4>Контакти</h4>
              <div className={styles['contact-item']}>
                <Icon size={18} className={styles['contact-icon']} name="phone" />
                <div>
                  <a href="tel:+380932054774">+380 (93) 205-47-74</a>
                  <a href="tel:+380634367991">+380 (63) 436-79-91</a>
                </div>
              </div>
              <div className={styles['contact-item']}>
                <Icon size={18} className={styles['contact-icon']} name="location" />
                <a
                  href="https://www.google.com/maps/place/%D0%9F%D0%B5%D1%80%D1%83%D0%BA%D0%B8+%D0%B2+%D0%92%D1%96%D0%BD%D0%BD%D0%B8%D1%86%D1%96/@49.2387066,28.4998818,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Проспект Коцюбинського, 13, Вінниця
                </a>
              </div>
              <div className={styles['contact-item']}>
                <Icon size={18} className={styles['contact-icon']} name="calendar" />
                <span>Вт–Нд: 9:00 – 15:30</span>
              </div>
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
