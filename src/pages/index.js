import HeroBanner from '@/components/HeroBanner'
import CatalogPage from '@/components/ProductsCategory'
import HairCare from '@/components/HairCare'

export default function Home() {
	return (
			<>
			<HeroBanner />
			<CatalogPage showBreadCrumb={false} />
			<HairCare/>
			</>
	)
}
