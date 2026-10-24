'use client'

import { useCart } from '@/context/CartContext'
import { getImageUrlByKey } from '@/api/images'
import Head from 'next/head'
import CanonicalLink from '@/components/CanonicalLink'
import Link from 'next/link'
import { useState } from 'react'
import styles from '@/styles/pages.module.css'
import { CATEGORIES_URLS } from '@/utils/constants'
import { useTranslation } from '@/hooks/useTranslation'
import { getLocalizedField } from '@/utils/i18n'

const API_URL = 'https://api.perukytyt.com/api/checkout'

export default function CheckoutPage() {
  const { cartItems, total, itemCount, clearCart } = useCart()
  const { t, locale } = useTranslation()

  const [isSending, setIsSending] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderData, setOrderData] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSending) return

    const form = e.target
    const payload = {
      name: form.user_name.value.trim(),
      phone: form.user_phone.value.trim(),
      email: form.user_email.value.trim(),
      address: form.user_address.value.trim(),
      product_list: cartItems.map((item) => ({
        name: item.name,
        article: item.article,
        color: item.color,
        quantity: item.quantity,
        price: item.price,
      })),
      notes: form.user_notes.value.trim(),
    }

    setIsSending(true)
    setError(null)

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Помилка при оформленні замовлення')

      setOrderData(payload)
      setOrderComplete(true)
      clearCart()
    } catch {
      setError(t('checkout.error'))
    } finally {
      setIsSending(false)
    }
  }

  if (orderComplete && orderData) {
    return (
      <>
        <Head>
          <title>{t('meta.checkoutSuccessTitle')}</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <CanonicalLink path="/checkout" />

        <div className={`${styles['checkout-page']} container`}>
          <div className={styles['checkout-success']}>
            <h1>{t('checkout.thanks')}</h1>
            <p>{t('checkout.willContact')}</p>

            <div className={styles['order-summary']}>
              <h2>{t('checkout.details')}</h2>
              <ul>
                <li><strong>{t('checkout.name')}:</strong> {orderData.name}</li>
                <li><strong>{t('checkout.phone')}:</strong> {orderData.phone}</li>
                {orderData.email && (
                  <li><strong>Email:</strong> {orderData.email}</li>
                )}
                <li><strong>{t('checkout.address')}:</strong> {orderData.address}</li>
              </ul>

              <h2>{t('checkout.items')}</h2>
              <ul>
                {orderData.product_list.map((item, i) => (
                  <li key={i}>
                    {item.name} — {t('checkout.itemLine', { quantity: item.quantity, price: item.price })}
                  </li>
                ))}
              </ul>
              <p className={styles['order-total']}>
                <strong>{t('checkout.total', { total: orderData.product_list.reduce((s, i) => s + i.price * i.quantity, 0) })}</strong>
              </p>

              {orderData.notes && (
                <>
                  <h2>{t('checkout.comment')}</h2>
                  <p>{orderData.notes}</p>
                </>
              )}
            </div>

            <div className={styles['checkout-contacts']}>
              <h2>{t('checkout.ourContacts')}</h2>
              <p>{t('checkout.questions')}</p>
              <ul>
                <li>
                  {t('checkout.phone')}: <a href="tel:+380932054774">+380 (93) 205-47-74</a>,{' '}
                  <a href="tel:+380634367991">+380 (63) 436-79-91</a>
                </li>
                <li>
                  Email: <a href="mailto:perukitut@gmail.com">perukitut@gmail.com</a>
                </li>
                <li>
                  Telegram:{' '}
                  <a href="https://t.me/perukytut" target="_blank" rel="noopener noreferrer">
                    @perukytut
                  </a>
                </li>
              </ul>
            </div>

            <Link href="/products" className={styles['checkout-continue']}>
              {t('checkout.continueShopping')}
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{t('meta.checkoutTitle')}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <CanonicalLink path="/checkout" />

      <div className={`${styles['checkout-page']} container`}>
        <h1>{t('checkout.title')}</h1>

        {cartItems.length === 0 ? (
          <div className={styles['checkout-empty']}>
            <p>{t('checkout.emptyCart')}</p>
            <Link href="/products" className={styles['checkout-continue']}>
              {t('checkout.toCatalog')}
            </Link>
          </div>
        ) : (
          <div className={styles['checkout-layout']}>
            <div className={styles['checkout-cart-summary']}>
              <h2>{t('checkout.yourOrder')}</h2>
              <div className={styles['checkout-items']}>
                {cartItems.map((item) => (
                  <div key={item.id} className={styles['checkout-item']}>
                    <img
                      src={getImageUrlByKey(item.image, { width: 80, height: 100, quality: 50 })}
                      alt={getLocalizedField(item, 'name', locale)}
                      className={styles['checkout-item-img']}
                    />
                    <div className={styles['checkout-item-info']}>
                      <Link href={`/products/${CATEGORIES_URLS[item.category]}/${item.product_id}`}>
                        {getLocalizedField(item, 'name', locale)}
                      </Link>
                      <span>{t('checkout.color', { color: item.color })}</span>
                      <span>{t('checkout.article', { article: item.article })}</span>
                      <span>{t('checkout.itemLine', { quantity: item.quantity, price: item.price })}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className={styles['order-total']}>
                {t('checkout.summary', { count: itemCount })} <strong>{t('checkout.summaryTotal', { total })}</strong>
              </p>
            </div>

            <form
              className={styles['checkout-form']}
              onSubmit={handleSubmit}
              autoComplete="on"
            >
              <h2>{t('checkout.contactInfo')}</h2>

              <div className={styles['checkout-field']}>
                <label htmlFor="user_name">
                  {t('checkout.name')} <span className={styles['required']}>*</span>
                </label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  placeholder={t('checkout.namePlaceholder')}
                  autoComplete="name"
                  required
                />
              </div>

              <div className={styles['checkout-field']}>
                <label htmlFor="user_phone">
                  {t('checkout.phone')} <span className={styles['required']}>*</span>
                </label>
                <input
                  type="tel"
                  id="user_phone"
                  name="user_phone"
                  placeholder="+380..."
                  autoComplete="tel"
                  required
                />
              </div>

              <div className={styles['checkout-field']}>
                <label htmlFor="user_email">Email</label>
                <input
                  type="email"
                  id="user_email"
                  name="user_email"
                  placeholder="example@gmail.com"
                  autoComplete="email"
                />
              </div>

              <div className={styles['checkout-field']}>
                <label htmlFor="user_address">
                  {t('checkout.address')} <span className={styles['required']}>*</span>
                </label>
                <input
                  type="text"
                  id="user_address"
                  name="user_address"
                  placeholder={t('checkout.addressPlaceholder')}
                  autoComplete="street-address"
                  required
                />
              </div>

              <div className={styles['checkout-field']}>
                <label htmlFor="user_notes">{t('checkout.notes')}</label>
                <textarea
                  id="user_notes"
                  name="user_notes"
                  rows="3"
                  placeholder={t('checkout.notesPlaceholder')}
                />
              </div>

              <p className={styles['checkout-hint']}>
                {t('checkout.hint')}
              </p>

              {error && (
                <div className={styles['checkout-error']}>{error}</div>
              )}

              <button
                type="submit"
                disabled={isSending}
                className={styles['checkout-submit']}
              >
                {isSending ? t('checkout.sending') : t('checkout.submit')}
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  )
}
