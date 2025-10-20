'use client'

import styles from '@/styles/pages.module.css'
import Icon from '@/components/icon'

export default function Delivery() {
  return (
    <div className={`${styles['delivery-page']} container`}>
      <h1>Доставка</h1>
      <div className={styles['delivery-page-wrapper']}>
        <div className={styles['delivery-step']}>
          <Icon className={styles['gold_cart']} name="gold_cart" size={200} />
          <h2>Оформлення</h2>
          <p>
            Оберіть модель та колір.<br />
            Вкажіть ім'я і телефон.<br />
            Відправте заявку.
          </p>
        </div>

        <div className={styles['delivery-step']}>
          <Icon className={styles['calling_phone']} name="calling_phone" size={200} />
          <h2>Підтвердження</h2>
          <p>Ви отримаєте дзвінок для уточнення деталей.</p>
        </div>

        <div className={styles['delivery-step']}>
          <Icon className={styles['delivery']} name="delivery" size={200} />
          <h2>Відправка</h2>
          <p>Відправляємо ваше замовлення протягом 1–3 днів.</p>
        </div>

        <div className={styles['delivery-step']}>
          <Icon className={styles['post_office']} name="post_office" size={200} />
          <h2>Отримання</h2>
          <p>Отримайте ваше замовлення у поштовому відділенні.</p>
        </div>
      </div>
    </div>
  )
}
