import Head from 'next/head'
import CanonicalLink from '@/components/CanonicalLink'
import { useTranslation } from '@/hooks/useTranslation'
import * as uk from '@/content/colors/uk'
import * as ru from '@/content/colors/ru'

const CONTENT = { uk, ru }

export default function ColorsPage() {
  const { locale } = useTranslation()
  const { meta, default: Content } = CONTENT[locale] || CONTENT.uk

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" key="description" content={meta.description} />
      </Head>
      <CanonicalLink path="/colors" />
      <Content />
    </>
  )
}
