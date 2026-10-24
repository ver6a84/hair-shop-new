
import fs from 'fs';
import path from 'path';

const PRODUCT_CATEGORIES = {
  WIGS: 1,
  TAILS: 2,
  TOPPERS: 3
};

const baseUrl = 'https://api.perukytyt.com/v1'

const CATEGORIES_URLS = {
  [PRODUCT_CATEGORIES.WIGS]: 'wigs',
  [PRODUCT_CATEGORIES.TAILS]: 'tails',
  [PRODUCT_CATEGORIES.TOPPERS]: 'toppers'
};

const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  ABOUT: '/about',
  CONTACT: '/contact',
  CONTACT_US: '/contact_us',
  DELIVERY: '/delivery-ukraine',
  RETURN: '/return',
  CARE: '/care',
  COLORS: '/colors',
  HOW_TO_CHOOSE: '/yak-obraty-peruku'
}

const BASE_URL = 'https://perukytut.com.ua';

// keep in sync with RU_LOCALE_READY in src/utils/constants.js
const RU_LOCALE_READY = true;

const localizedPath = (url, locale) => {
  if (locale === 'uk') return url;
  return url === '/' ? `/${locale}` : `/${locale}${url}`;
};

// one <url> per locale, each listing all language versions as hreflang alternates
const buildUrlXml = (url, withRu) => {
  const locales = withRu ? ['uk', 'ru'] : ['uk'];
  const alternates = withRu
    ? [
        ...locales.map(locale => `
    <xhtml:link rel="alternate" hreflang="${locale}" href="${BASE_URL}${localizedPath(url, locale)}"/>`),
        `
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${url}"/>`
      ].join('')
    : '';

  return locales.map(locale => `
  <url>
    <loc>${BASE_URL}${localizedPath(url, locale)}</loc>${alternates}
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
};

const staticUrls = Object.values(ROUTES);
const categoryUrls = Object.values(CATEGORIES_URLS).map(slug => `/products/${slug}`);

const getAllProducts = async () => {
  const response = await fetch(`${baseUrl}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return data.products || [];
};

(async () => {
  try {
    const products = await getAllProducts();

    const staticXml = staticUrls.flatMap(url => buildUrlXml(url, RU_LOCALE_READY));

    const categoryXml = categoryUrls.flatMap(url => buildUrlXml(url, RU_LOCALE_READY));

    // russian product pages without translation are noindex, so they are left out
    const productXml = products.flatMap(p => {
      const slug = CATEGORIES_URLS[p.category];
      return buildUrlXml(`/products/${slug}/${p.id}`, RU_LOCALE_READY && Boolean(p.display_name_ru));
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...staticXml, ...categoryXml, ...productXml].join('')}
</urlset>`;

    const outputPath = path.resolve('public', 'sitemap.xml');
    fs.writeFile(outputPath, xml, err => {
      if (err) {
        console.error('❌ Помилка запису sitemap.xml:', err);
      } else {
        console.log('✅ sitemap.xml згенеровано успішно →', outputPath);
      }
    });
  } catch (error) {
    console.error('❌ Помилка при отриманні продуктів:', error);
  }
})();

