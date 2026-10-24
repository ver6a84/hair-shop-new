import ClientLayout from '@/components/ClientLayout'
import '@/styles/index.css'
import '@/styles/variables.css'
import '@/styles/reset.css'
import Head from 'next/head'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import PromoModal from '@/components/PromoModal'
import { LOCALES } from '@/utils/constants'
import { useTranslation } from '@/hooks/useTranslation'

export default function MyApp({ Component, pageProps }) {
  const { t, locale } = useTranslation()
  // const [showModal, setShowModal] = useState(false);
  
  // useEffect(() => {
  //   const visited = localStorage.getItem('visited');
  //   if (!visited) {
  //     const timeout = setTimeout(() => {
  //       setShowModal(true);
  //     }, 2000);
  //     localStorage.setItem('visited', 'true');
  //     return () => clearTimeout(timeout);
  //   }
  // }, []);

  return (
    <ClientLayout>
      {/* defaults; pages override them by rendering tags with the same `key` */}
      <Head>
        <title>{t('meta.defaultTitle')}</title>
        <meta name="description" key="description" content={t('meta.defaultDescription')} />
        <meta property="og:title" key="og:title" content={t('meta.defaultTitle')} />
        <meta property="og:description" key="og:description" content={t('meta.defaultOgDescription')} />
        <meta property="og:type" key="og:type" content="website" />
        <meta property="og:locale" content={locale === LOCALES.RU ? 'ru_UA' : 'uk_UA'} />
        <meta property="og:locale:alternate" content={locale === LOCALES.RU ? 'uk_UA' : 'ru_UA'} />
      </Head>
   
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
     {/* {showModal && <PromoModal setShowModal={setShowModal} />} */}
     <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
    </ClientLayout>
  )
}

