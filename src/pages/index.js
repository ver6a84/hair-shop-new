import HeroBanner from '@/components/HeroBanner'
import CatalogPage from '@/components/ProductsCategory'
import HairCare from '@/components/HairCare'
import Head from 'next/head'
import Liders from '@/components/Liders'
import { getLiderProducts } from '@/api'

export async function getServerSideProps() {
  const liderProducts = await getLiderProducts();
  return { props: { liderProducts } };
}

export default function Home({ liderProducts }) {

	return (
			<>
			<Head>
  		<title>Головна | Перуки ТУТ</title>
  		<meta name="description" content="Лідери продажу, догляд за волоссям, каталог перук — все в одному місці." />
			</Head>
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
			</>
	)
}
