import Link from 'next/link'
import Icon from './icon'
import HeaderCartCount from './HeaderCartCount'
import styles from './Header.module.css'

export default function HeaderCart() {
  return (
    <Link href="/cart" className={styles['header-cart']}>
      <Icon name="cart" size={24} />
      <HeaderCartCount />
    </Link>
  )
}
