'use client'

import { useCart } from '@/context/CartContext'
import { getImageUrlByKey } from '@/api/images'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import styles from '@/styles/pages.module.css'
import { CATEGORIES_URLS } from '@/utils/constants'

const API_URL = 'https://api.perukytyt.com/api/checkout'

export default function CheckoutPage() {
  const { cartItems, total, itemCount, clearCart } = useCart()

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
      setError('Не вдалося оформити замовлення. Спробуйте ще раз або зверніться до нас за телефоном.')
    } finally {
      setIsSending(false)
    }
  }

  if (orderComplete && orderData) {
    return (
      <>
        <Head>
          <title>Замовлення оформлено | Перуки Тут</title>
          <meta name="robots" content="noindex" />
        </Head>

        <div className={`${styles['checkout-page']} container`}>
          <div className={styles['checkout-success']}>
            <h1>Дякуємо за замовлення!</h1>
            <p>
              Ми зв&#39;яжемося з вами найближчим часом для підтвердження.
            </p>

            <div className={styles['order-summary']}>
              <h2>Деталі замовлення</h2>
              <ul>
                <li><strong>Ім&#39;я:</strong> {orderData.name}</li>
                <li><strong>Телефон:</strong> {orderData.phone}</li>
                {orderData.email && (
                  <li><strong>Email:</strong> {orderData.email}</li>
                )}
                <li><strong>Адреса доставки:</strong> {orderData.address}</li>
              </ul>

              <h2>Товари</h2>
              <ul>
                {orderData.product_list.map((item, i) => (
                  <li key={i}>
                    {item.name} — {item.quantity} шт. × {item.price} грн
                  </li>
                ))}
              </ul>
              <p className={styles['order-total']}>
                <strong>Загальна сума: {orderData.product_list.reduce((s, i) => s + i.price * i.quantity, 0)} грн</strong>
              </p>

              {orderData.notes && (
                <>
                  <h2>Коментар</h2>
                  <p>{orderData.notes}</p>
                </>
              )}
            </div>

            <div className={styles['checkout-contacts']}>
              <h2>Наші контакти</h2>
              <p>Якщо у вас виникли питання, зв&#39;яжіться з нами:</p>
              <ul>
                <li>
                  Телефон: <a href="tel:+380932054774">+380 (93) 205-47-74</a>,{' '}
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
              Продовжити покупки
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Оформлення замовлення | Перуки Тут</title>
        <meta
          name="description"
          content="Оформлення замовлення в інтернет-магазині перук Перуки Тут. Купити перуку онлайн з доставкою по Україні. Швидко, зручно, безпечно."
        />
      </Head>

      <div className={`${styles['checkout-page']} container`}>
        <h1>Оформлення замовлення</h1>

        {cartItems.length === 0 ? (
          <div className={styles['checkout-empty']}>
            <p>Ваш кошик порожній. Додайте товари, щоб оформити замовлення.</p>
            <Link href="/products" className={styles['checkout-continue']}>
              Перейти до каталогу
            </Link>
          </div>
        ) : (
          <div className={styles['checkout-layout']}>
            <div className={styles['checkout-cart-summary']}>
              <h2>Ваше замовлення</h2>
              <div className={styles['checkout-items']}>
                {cartItems.map((item) => (
                  <div key={item.id} className={styles['checkout-item']}>
                    <img
                      src={getImageUrlByKey(item.image, { width: 80, height: 100, quality: 50 })}
                      alt={item.name}
                      className={styles['checkout-item-img']}
                    />
                    <div className={styles['checkout-item-info']}>
                      <Link href={`/products/${CATEGORIES_URLS[item.category]}/${item.product_id}`}>
                        {item.name}
                      </Link>
                      <span>Колір: {item.color}</span>
                      <span>Арт.: {item.article}</span>
                      <span>{item.quantity} шт. × {item.price} грн</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className={styles['order-total']}>
                Товарів: {itemCount} | <strong>Разом: {total} грн</strong>
              </p>
            </div>

            <form
              className={styles['checkout-form']}
              onSubmit={handleSubmit}
              autoComplete="on"
            >
              <h2>Контактна інформація</h2>

              <div className={styles['checkout-field']}>
                <label htmlFor="user_name">
                  Ім&#39;я <span className={styles['required']}>*</span>
                </label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  placeholder="Ваше ім'я та прізвище"
                  autoComplete="name"
                  required
                />
              </div>

              <div className={styles['checkout-field']}>
                <label htmlFor="user_phone">
                  Телефон <span className={styles['required']}>*</span>
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
                  Адреса доставки <span className={styles['required']}>*</span>
                </label>
                <input
                  type="text"
                  id="user_address"
                  name="user_address"
                  placeholder="Місто, відділення Нової пошти або адреса"
                  autoComplete="street-address"
                  required
                />
              </div>

              <div className={styles['checkout-field']}>
                <label htmlFor="user_notes">Коментар до замовлення</label>
                <textarea
                  id="user_notes"
                  name="user_notes"
                  rows="3"
                  placeholder="Побажання, уточнення або додаткова інформація"
                />
              </div>

              <p className={styles['checkout-hint']}>
                Після оформлення наш менеджер зв&#39;яжеться з вами для підтвердження замовлення та уточнення деталей доставки.
              </p>

              {error && (
                <div className={styles['checkout-error']}>{error}</div>
              )}

              <button
                type="submit"
                disabled={isSending}
                className={styles['checkout-submit']}
              >
                {isSending ? 'Відправка...' : 'Підтвердити замовлення'}
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  )
}
