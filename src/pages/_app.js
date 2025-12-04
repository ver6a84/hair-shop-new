import ClientLayout from '@/components/ClientLayout'
import '@/styles/index.css'
import '@/styles/variables.css'
import '@/styles/reset.css'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import PromoModal from '@/components/PromoModal'

export default function MyApp({ Component, pageProps }) {
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    const visited = localStorage.getItem('visited');
    if (!visited) {
      const timeout = setTimeout(() => {
        setShowModal(true);
      }, 2000);
      localStorage.setItem('visited', 'true');
      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <ClientLayout>
   
      <Script strategy="afterInteractive" async src="https://www.googletagmanager.com/gtag/js?id=AW-10842937732"></Script>
      <Script strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());

          gtag('config', 'AW-10842937732');
        `}
      </Script>
 
      <Script strategy="afterInteractive">
        {`
          gtag('event', 'ads_conversion___1', {
            // <event_parameters>
          });
        `}
      </Script>
      <Component {...pageProps} />
     {showModal && <PromoModal setShowModal={setShowModal} />}
    </ClientLayout>
  )
}

