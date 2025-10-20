'use client'

import Icon from '@/components/icon'
import styles from '@/styles/pages.module.css'

export default function Contact() {
  return (
    <div className={`${styles['contact-page']} container`}>
      <h1>Контакти</h1>

      <div className={styles['contact-info']}>
        <div className={styles['contact-item']}>
          <Icon name="phone" />
          <div>
            <h3>Телефон</h3>
            <p>+380 (93) 205-47-74</p>
          </div>
        </div>

        <div className={styles['contact-item']}>
          <Icon name="viber" />
          <div>
            <h3>Viber</h3>
            <a href="viber://chat?number=%2B380932054774">
              <p>+380 (93) 205-47-74</p>
            </a>
          </div>
        </div>

        <div className={styles['contact-item']}>
          <Icon name="telegram" />
          <div>
            <h3>Telegram</h3>
            <a href="https://t.me/perukytut" target="_blank" rel="noopener noreferrer">
              <p>+380 (93) 205-47-74</p>
              <p>@perukytut</p>
            </a>
          </div>
        </div>

        <div className={styles['contact-item']}>
          <Icon name="mail" />
          <div>
            <h3>Email</h3>
            <a href="mailto:perukitut@gmail.com">
              <p>perukitut@gmail.com</p>
            </a>
          </div>
        </div>

        <div className={styles['contact-item']}>
          <Icon name="location" />
          <div>
            <h3>Адреса</h3>
            <p>
              проспект Коцюбинського, 13<br />
              Вінниця, 21000
            </p>
          </div>
        </div>
      

      <div className={styles['contact-item']}>
        <Icon name="calendar" />
        <div>
          <h3>Графік роботи</h3>
          <p>Вт–Нд: 9:00 – 16:00</p>
        </div>
      </div>
    </div>
    </div>
  )
}
