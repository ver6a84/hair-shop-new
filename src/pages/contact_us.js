'use client'

import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import styles from '@/styles/pages.module.css'
import { SERVICE_ID, TEMPLATE_ID_CONTACT_US, PUBLIC_KEY } from '@/utils/constants'

export default function ContactUs() {
  const form = useRef()
  const [alert, setAlert] = useState(null)
  const [isSending, setIsSending] = useState(false)

  const sendEmail = async (e) => {
    e.preventDefault()
    if (!form.current || isSending) return

    setIsSending(true)
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID_CONTACT_US, form.current, PUBLIC_KEY)
      setAlert({ type: 'success', message: '✅ Повідомлення надіслано!' })
      form.current.reset()
    } catch {
      setAlert({ type: 'error', message: '❌ Помилка при надсиланні.' })
    } finally {
      setIsSending(false)
      setTimeout(() => setAlert(null), 4000)
    }
  }

  return (
    <div className={`${styles['contact-us']} container`}>
      <h2>Зв’язатися з нами</h2>
      <form
        ref={form}
        autoComplete="on"
        onSubmit={sendEmail}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && isSending) {
            e.preventDefault()
          }
        }}
      >
        <label htmlFor="user_name">
          Ім’я <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          placeholder="Ваше ім’я"
          title="Введіть ваше ім'я"
          autoComplete="name"
          required
        />

        <label htmlFor="user_email">
          Email <span className={styles.required}>*</span>
        </label>
        <input
          type="email"
          id="user_email"
          name="user_email"
          placeholder="example@gmail.com"
          title="Введіть ваш email"
          autoComplete="email"
          required
        />

        <label htmlFor="user_tel">Телефон</label>
        <input
          type="tel"
          id="user_tel"
          name="user_tel"
          placeholder="+38..."
          title="За бажанням введіть ваш телефон"
          autoComplete="tel"
        />

        <label htmlFor="message">
          Повідомлення <span className={styles.required}>*</span>
        </label>
        <textarea
          rows={4}
          id="message"
          name="message"
          placeholder="Ваше повідомлення"
          title="Напишіть ваше питання"
          autoComplete="off"
          required
        />

        <button type="submit" disabled={isSending}>
          {isSending ? 'Надсилання...' : 'Надіслати'}
        </button>
      </form>

      {alert && (
        <div className={`${styles['custom-alert']} ${styles[alert.type]}`}>
          {alert.message}
        </div>
      )}
    </div>
  )
}
