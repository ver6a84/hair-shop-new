'use client'

import burger from '@/assets/icons/burger.svg'
import cart from '@/assets/icons/cart.svg'
import close from '@/assets/icons/cross.svg'
import search from '@/assets/icons/search.svg'
import phone from '@/assets/icons/phone.svg'
import mail from '@/assets/icons/mail.svg'
import telegram from '@/assets/icons/telegram.svg'
import viber from '@/assets/icons/viber.svg'
import facebook from '@/assets/icons/Facebook.svg'
import copyright from '@/assets/icons/copyright.svg'
import location from '@/assets/icons/location.svg'
import calendar from '@/assets/icons/calendar.svg'
import goldCart from '@/assets/icons/gold-cart.svg'
import callingPhone from '@/assets/icons/calling-phone.svg'
import delivery from '@/assets/icons/delivery.svg'
import postOffice from '@/assets/icons/post-office.svg'
import filter from '@/assets/icons/filter.svg'
import arrowDown from '@/assets/icons/arrow-down.svg'
import arrowLeft from '@/assets/icons/left.svg'
import arrowRight from '@/assets/icons/right.svg'
import plus from '@/assets/icons/plus.svg'
import minus from '@/assets/icons/minus.svg'
import plus_white from '@/assets/icons/plus_white.svg'
import instagram from '@/assets/icons/Instagram.svg'

const icons = {
  burger,
  cart,
  close,
  search,
  phone,
  mail,
  telegram,
  viber,
  facebook,
  copyright,
  location,
  calendar,
  gold_cart: goldCart,
  calling_phone: callingPhone,
  delivery,
  post_office: postOffice,
  filter,
  arrow_down: arrowDown,
  arrow_left: arrowLeft,
  arrow_right: arrowRight,
  plus,
  minus,
  plus_white,
  instagram,
}

export default function Icon({ name, size = 24, ...props }) {
  const icon = icons[name]

  if (!icon) {
    console.warn(`Icon "${name}" not found`)
    return null
  }

  return (
    <img
      src={icon.src}
      width={size}
      height={size}
      alt={name}
      loading="lazy"
      {...props}
    />
  )
}
