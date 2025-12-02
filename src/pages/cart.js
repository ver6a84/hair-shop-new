'use client'

import { useCart } from '@/context/CartContext'
import { getImageUrlByKey } from '@/api/images'
import Link from 'next/link'
import { useState, useRef } from 'react'
import Icon from '@/components/icon'
import styles from '@/styles/pages.module.css'
import { SERVICE_ID, TEMPLATE_ID_ORDER, PUBLIC_KEY } from '@/utils/constants'
import emailjs from '@emailjs/browser'

export default function CartPage() {
  const {
    cartItems,
    total,
    itemCount,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart()

  const [showModal, setShowModal] = useState(false)
  const contactForm = useRef()
  const [alert, setAlert] = useState(null)
  const [isSending, setIsSending] = useState(false)
  const [discountedTotal, setDiscountedTotal] = useState(null)
  const [promoMessage, setPromoMessage] = useState(null)
  const [showMessage, setShowMessage] = useState(false);
  const [isError, setIsError] = useState(false);


  const baseUrlV2 =	 'https://api.perukytyt.com/v2'

  async function getPromoPrice(e) {	
		e.preventDefault();
		const response = await fetch(`${baseUrlV2}/promos/redeem`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				code: e.target.promo_code.value,
        cartTotal: total
			})
		});
		const data = await response.json();
    if (!response.ok) {
      setIsError(true);
      setShowMessage(true);
      setPromoMessage("Промокод недійсний");
      setTimeout(() => {
        setShowMessage(false);
      }, 4000)
      return;
    }
    setIsError(false)
    setShowMessage(true);
    setPromoMessage("Промокод застосовано");
      setTimeout(() => {
        setShowMessage(false);
      }, 4000)
    setDiscountedTotal(data.newTotal);
}

  const sendContactRequest = async (e) => {
    e.preventDefault()
    if (!contactForm.current || isSending) return

    setIsSending(true)
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID_ORDER, contactForm.current, PUBLIC_KEY)
      setAlert({ type: 'success', message: '✅ Запит на дзвінок надіслано!' })
      contactForm.current.reset()
      setTimeout(() => {
        clearCart()
        setAlert(null)
        setShowModal(false)
      }, 4000)
    } catch {
      setAlert({ type: 'error', message: '❌ Помилка при надсиланні.' })
      setTimeout(() => setAlert(null), 4000)
    } finally {
      setIsSending(false)
    }
  }


  return (
    <div className={`${styles['cart-page']} container`}>
      <h1>Кошик</h1>

      {cartItems.length === 0 ? (
        <p>Ваш кошик порожній</p>
      ) : (
        <>
          <div className={styles['cart-items']}>
            {cartItems.map(item => (
              <div key={item.id} className={styles['cart-item']}>
                <Link href={`/product/${item.product_id}`}>
                  <img
                    className={styles['cart-img']}
                    src={getImageUrlByKey(item.image, { width: 100, height: 150, quality: 50 })}
                    alt={item.name}
                  />
                </Link>
                <div className={styles['item-info']}>
                  <h4>{item.name}</h4>
                  <h4>Колір: {item.color}</h4>
                  <h4>Артикул: {item.article}</h4>
                  <p className={styles['price']}>{item.price} грн</p>
                </div>

                <div className={styles['quantity-controls']}>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    <Icon name="minus" size={12} />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <Icon name="plus" size={12} />
                  </button>
                </div>

                <button className={styles['remove-btn']} onClick={() => removeFromCart(item.id)}>
                  Видалити
                </button>
              </div>
            ))}
          </div>

          <div className={styles['cart-summary']}>
            <form 
            className={styles.promoForm}
            onSubmit={getPromoPrice}
            >
               <input
                    type="text"
                    id="promo_code"
                    name="promo_code"
                    placeholder="Введіть промокод"
                    title="Введіть промокод"
                    className={styles.promoInput}
                  />
              <button 
              type="submit" 
              className={styles.promoSubmit}
              >
                Застосувати промокод
              </button>    
            </form>
            {showMessage && <p className={`${styles.promoMessage} ${isError ? styles.error : ''}`}>{promoMessage}</p>}
            <p>Товарів у кошику: {itemCount}</p>
            <h2>Загальна сума: {discountedTotal ?? total} грн</h2>
            <button onClick={() => setShowModal(true)} className={styles['checkout-btn']}>
              Оформити замовлення
            </button>
          </div>

          {showModal && (
            <div className={styles['modal-wrapper']}>
              <div className={styles['modal-heading']}>
                <h2>Оформити замовлення</h2>
                <Icon onClick={() => setShowModal(false)} className={styles['close-btn']} name="close" />
              </div>

              <form
                ref={contactForm}
                autoComplete="on"
                className={styles['contact-form']}
                onSubmit={sendContactRequest}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && isSending) e.preventDefault()
                }}
              >
                <div className={styles['client-name']}>
                  <label htmlFor="name">Ім’я</label>
                  <input
                    type="text"
                    id="name"
                    name="user_name"
                    placeholder="Ваше ім’я"
                    title="Введіть ваше ім’я"
                    autoComplete="name"
                  />
                </div>

                <div className={styles['client-phone']}>
                  <label htmlFor="phone">Номер телефону</label>
                  <input
                    type="tel"
                    id="phone"
                    name="user_tel"
                    placeholder="+380..."
                    pattern="\+380\d{9}"
                    title="Введіть номер у форматі +380XXXXXXXXX"
                    autoComplete="tel"
                  />
                </div>

                <div className={styles['contact-options-selector']}>або</div>

                <div className={styles['client-email']}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="user_email"
                    placeholder="example@gmail.com"
                    title="Введіть email у форматі example@gmail.com"
                    autoComplete="email"
                  />
                </div>

                <p>Менеджер зв’яжеться з вами та допоможе оформити замовлення</p>

                <input
                  type="hidden"
                  name="cart_items"
                  value={cartItems.map(item => `${item.name} x ${item.quantity} - ${item.article} - ${item.color}`).join(', ')}
                />
                <input
                  type="hidden"
                  name="cart_total"
                  value={`${discountedTotal ?? total} грн`}
                />

                <button type="submit" disabled={isSending}>
                  Передзвонити мені
                </button>
              </form>

              {alert && (
                <div className={`${styles['client-alert']} ${styles[alert.type]}`}>
                  {alert.message}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
