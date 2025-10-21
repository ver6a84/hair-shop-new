'use client'

import { CartProvider, FilterProvider } from '@/context'
import Header from './Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollTop'
import styles from '@/styles/layout.module.css'

export default function ClientLayout({ children }) {
  return (
    <CartProvider>
      <FilterProvider>
        <div className={styles.wrapper}>
          <Header />
          <ScrollToTop />
          <main className={styles.main}>{children}</main>
          <Footer />
        </div>
      </FilterProvider>
    </CartProvider>
  )
}
