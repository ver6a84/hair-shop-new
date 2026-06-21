import Head from 'next/head'
import { SITE_URL } from '@/utils/constants'

export default function CanonicalLink({ path }) {
  const href = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

  return (
    <Head>
      <link rel="canonical" href={href} />
    </Head>
  )
}
