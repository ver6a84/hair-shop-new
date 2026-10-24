import Link from 'next/link'
import styles from './Footer.module.css'
import Icon from './icon'
import { useTranslation } from '@/hooks/useTranslation'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className={styles.footer}>
      <div className={`${styles['footer-container']} container`}>
        <div className={styles['logo-social']}>
          <div className={styles['footer-logo']}>
            <img src="/logo.webp" alt="logo" />
            <div className={styles['logo-text']}>
              <div className={styles['store-name']}>ПЕРУКИ<br />ТУТ</div>
              <span>{t('header.storeSubtitle')}</span>
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
            <h3>{t('footer.questions')}</h3>
            <p>
              {t('footer.writeUsBefore')} <Link className={styles['feedback-link']} href="/contact_us">{t('footer.writeUsLink')}</Link> {t('footer.writeUsAfter')}
            </p>
            <p>{t('footer.dailyHours')}</p>
          </div>

          <div className={styles['products-help']}>
            <div className={styles.products}>
              <ul>
                <h4>{t('footer.ourProducts')}</h4>
                <li><Link href="/products/wigs">{t('categories.1')}</Link></li>
                <li><Link href="/products/tails">{t('categories.2')}</Link></li>
                <li><Link href="/products/toppers">{t('categories.3')}</Link></li>
              </ul>
            </div>
            <div className={styles.help}>
              <ul>
                <h4>{t('footer.help')}</h4>
                <li><Link href="/delivery-ukraine">{t('footer.delivery')}</Link></li>
                <li><Link href="/return">{t('footer.return')}</Link></li>
                <li><Link href="/yak-obraty-peruku">{t('footer.howToChoose')}</Link></li>
                <li><Link href="/about">{t('footer.about')}</Link></li>
                <li><Link href="/contact">{t('footer.contacts')}</Link></li>
              </ul>
            </div>
            <div className={styles.contacts}>
              <h4>{t('footer.contacts')}</h4>
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
                  {t('footer.address')}
                </a>
              </div>
              <div className={styles['contact-item']}>
                <Icon size={18} className={styles['contact-icon']} name="calendar" />
                <span>{t('footer.schedule')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        <Icon name="copyright" size={18} />
        <p>{t('footer.copyright')}</p>
      </div>
    </footer>
  )
}
