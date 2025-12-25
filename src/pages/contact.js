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
            <p>+380 (63) 436-79-91</p>
          </div>
        </div>

        <div className={styles['contact-item']}>
          <Icon name="viber" />
          <div>
            <h3>Viber</h3>
            <a href="viber://chat?number=%2B380932054774">
              <p>+380 (93) 205-47-74</p>
            </a>
            <a href="viber://chat?number=%2B380634367991">
              <p>+380 (63) 436-79-91</p>
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
            <a href="https://t.me/perukytut" target="_blank" rel="noopener noreferrer">
              <p>+380 (63) 436-79-91</p>
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
            <a href='https://www.google.com/maps/place/%D0%9F%D0%B5%D1%80%D1%83%D0%BA%D0%B8+%D0%B2+%D0%92%D1%96%D0%BD%D0%BD%D0%B8%D1%86%D1%96/@49.2387066,28.4998818,17z/data=!3m1!4b1!4m6!3m5!1s0x472d5b2776f32dfb:0x83e6f17cf7b0e329!8m2!3d49.2387066!4d28.4998818!16s%2Fg%2F11kkw9pjdb?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D'>
            <p>
              Центральний ринок, проспект Коцюбинського, Вінниця, Вінницька обл, 21000
            </p>
            </a>
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
