import Head from 'next/head'
import { useRouter } from 'next/router'
import { LOCALES, RU_LOCALE_READY } from '@/utils/constants'
import { getLocalizedUrl } from '@/utils/i18n'

// canonical + hreflang alternates for a page; `path` is the path without the locale prefix.
// `ruTranslated` lets a page mark its russian version as not ready (e.g. product without translation)
export default function CanonicalLink({ path, ruTranslated = true }) {
  const { locale } = useRouter()
  const ruIndexable = RU_LOCALE_READY && ruTranslated

  const ukUrl = getLocalizedUrl(path, LOCALES.UK)
  const ruUrl = getLocalizedUrl(path, LOCALES.RU)

  return (
    <Head>
      <link rel="canonical" href={locale === LOCALES.RU ? ruUrl : ukUrl} key="canonical" />
      {locale === LOCALES.RU && !ruIndexable && (
        <meta name="robots" content="noindex,follow" key="robots" />
      )}
      {ruIndexable && (
        <>
          <link rel="alternate" hrefLang="uk" href={ukUrl} key="hreflang-uk" />
          <link rel="alternate" hrefLang="ru" href={ruUrl} key="hreflang-ru" />
          <link rel="alternate" hrefLang="x-default" href={ukUrl} key="hreflang-default" />
        </>
      )}
    </Head>
  )
}
