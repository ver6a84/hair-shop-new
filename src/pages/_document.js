import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="uk" data-scroll-behavior="smooth">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Інтернет-магазин перук — натуральні та штучні моделі зі швидкою доставкою по Україні. Вінниця." />
        <meta name="keywords" content="перуки, інтернет-магазин, купити перуку, перуки Вінниця, перуки Україна, натуральні перуки, штучні перуки, вибрати перуку, доставка перук" />
        <meta name="author" content="Перуки Тут" />
        <meta name="robots" content="index,follow" />
        <meta name="theme-color" content="#d4c4b4" />
        <meta name="apple-mobile-web-app-title" content="Перуки Тут" />


        <meta property="og:site_name" content="Перуки Тут" />
        <meta property="og:title" content="Купити перуку | Натуральні та синтетичні перуки – Перуки Тут" />
        <meta property="og:description" content="Якісні перуки та аксесуари для волосся. Відкрийте для себе наш широкий асортимент преміальних перук та сучасних синтетичних альтернатив. Інтернет-магазин. Доставка по Україні. Вінниця." />
        <meta property="og:image" content="/hero_image.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://perukytut.com.ua" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="uk_UA" />

        <link rel="canonical" href="https://perukytut.com.ua" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />


        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />

        
        <title>Купити перуку | Натуральні та синтетичні перуки – Перуки Тут</title>


        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "ПЕРУКИ ТУТ",
              "url": "https://perukytut.com.ua",
              "telephone": "+380932054774",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "проспект Коцюбинського, 13",
                "addressLocality": "Вінниця",
                "addressCountry": "UA"
              },
              "openingHours": "Tu-Su 09:00-16:00"
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "ПЕРУКИ ТУТ",
              "url": "https://perukytut.com.ua"
            })
          }}
        />


        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Головна",
                  "item": "https://perukytut.com.ua"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Перуки",
                  "item": "https://perukytut.com.ua/products"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Перука блонд 27",
                  "item": "https://perukytut.com.ua/products/wigs"
                }
              ]
            })
          }}
        />


        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ПЕРУКИ ТУТ",
              "url": "https://perukytut.com.ua",
              "logo": "https://perukytut.com.ua/logo.webp"
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
