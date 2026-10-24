'use client'

import Head from 'next/head'
import CanonicalLink from '@/components/CanonicalLink'
import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import styles from '@/styles/pages.module.css'
import { SERVICE_ID, TEMPLATE_ID_CONTACT_US, PUBLIC_KEY } from '@/utils/constants'
import { useTranslation } from '@/hooks/useTranslation'

export default function ContactUs() {
  const form = useRef()
  const [alert, setAlert] = useState(null)
  const [isSending, setIsSending] = useState(false)
  const { t } = useTranslation()

  const sendEmail = async (e) => {
    e.preventDefault()
    if (!form.current || isSending) return

    setIsSending(true)
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID_CONTACT_US, form.current, PUBLIC_KEY)
      setAlert({ type: 'success', message: t('contactUs.sent') })
      form.current.reset()
    } catch {
      setAlert({ type: 'error', message: t('contactUs.error') })
    } finally {
      setIsSending(false)
      setTimeout(() => setAlert(null), 4000)
    }
  }

  return (
    <>
    <Head>
      <title>{t('meta.contactUsTitle')}</title>
    </Head>
    <CanonicalLink path="/contact_us" />
    <div className={`${styles['contact-us']} container`}>
      <h2>{t('contactUs.title')}</h2>
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
          {t('contactUs.name')} <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          placeholder={t('contactUs.namePlaceholder')}
          title={t('contactUs.nameHint')}
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
          title={t('contactUs.emailHint')}
          autoComplete="email"
          required
        />

        <label htmlFor="user_tel">{t('contactUs.phone')}</label>
        <input
          type="tel"
          id="user_tel"
          name="user_tel"
          placeholder="+38..."
          title={t('contactUs.phoneHint')}
          autoComplete="tel"
        />

        <label htmlFor="message">
          {t('contactUs.message')} <span className={styles.required}>*</span>
        </label>
        <textarea
          rows={4}
          id="message"
          name="message"
          placeholder={t('contactUs.messagePlaceholder')}
          title={t('contactUs.messageHint')}
          autoComplete="off"
          required
        />

        <button type="submit" disabled={isSending}>
          {isSending ? t('contactUs.sending') : t('contactUs.send')}
        </button>
      </form>

      {alert && (
        <div className={`${styles['custom-alert']} ${styles[alert.type]}`}>
          {alert.message}
        </div>
      )}
    </div>
    </>
  )
}
