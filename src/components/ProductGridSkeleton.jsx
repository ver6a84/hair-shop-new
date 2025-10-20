import ProductCardSkeleton from '@/components/ProductCardSkeleton.jsx';

export default function ProductGridSkeleton({ count = 4 }) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </>
  );
}
