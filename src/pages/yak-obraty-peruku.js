import Head from 'next/head'
import CanonicalLink from '@/components/CanonicalLink'
import { SITE_URL } from '@/utils/constants'
import { getLocalizedUrl } from '@/utils/i18n'
import { useTranslation } from '@/hooks/useTranslation'
import * as uk from '@/content/yak-obraty-peruku/uk'
import * as ru from '@/content/yak-obraty-peruku/ru'

const PAGE_PATH = '/yak-obraty-peruku'
const CONTENT = { uk, ru }

const buildSchemas = ({ meta, faq }, locale) => {
  const pageUrl = getLocalizedUrl(PAGE_PATH, locale)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: meta.headline,
    description: meta.description,
    inLanguage: locale,
    author: { '@type': 'Organization', name: 'Перуки Тут', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Перуки Тут',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.webp` },
    },
    datePublished: '2025-06-21',
    dateModified: '2025-06-21',
    mainEntityOfPage: pageUrl,
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: meta.breadcrumbHome, item: getLocalizedUrl('/', locale) },
      { '@type': 'ListItem', position: 2, name: meta.breadcrumbPage, item: pageUrl },
    ],
  }

  return [articleSchema, faqSchema, breadcrumbSchema]
}

export default function HowToChooseWig() {
  const { locale } = useTranslation()
  const content = CONTENT[locale] || CONTENT.uk
  const { meta, default: Content } = content

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" key="description" content={meta.description} />
        {buildSchemas(content, locale).map((schema) => (
          <script
            key={schema['@type']}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </Head>
      <CanonicalLink path={PAGE_PATH} />
      <Content />
    </>
  )
}
