import Head from 'next/head'
import CanonicalLink from '@/components/CanonicalLink'
import HeroBanner from '@/components/HeroBanner'
import CatalogPage from '@/components/ProductsCategory'
import HairCare from '@/components/HairCare'
import Liders from '@/components/Liders'
import { getLiderProducts } from '@/api'
import WigsColors from '@/components/WigsColors'
import { useTranslation } from '@/hooks/useTranslation'

export async function getServerSideProps() {
  const liderProducts = await getLiderProducts();
  return { props: { liderProducts } };
}

export default function Home({ liderProducts }) {
	const { t } = useTranslation()

	return (
			<>
			<Head>
				<title>{t('meta.homeTitle')}</title>
				<meta name="description" key="description" content={t('meta.homeDescription')} />
			</Head>
			<CanonicalLink path="/" />
			<HeroBanner/>
			<section id="catalog">
  		<CatalogPage showBreadCrumb={false} />
			</section>
			<section id="liders">
  		<Liders liderProducts={liderProducts} />
			</section>
			<section id="care">
  		<HairCare />
			</section>
			<section id="colors">
  		<WigsColors />
			</section>
			</>
	)
}
