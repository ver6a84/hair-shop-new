import ClientLayout from '@/components/ClientLayout'
import '@/styles/index.css'
import '@/styles/variables.css'
import '@/styles/reset.css'
import Script from 'next/script'

export default function MyApp({ Component, pageProps }) {
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
    </ClientLayout>
  )
}

