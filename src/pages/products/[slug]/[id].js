import Head from 'next/head'
import { getProduct } from '@/api'
import { useState, useRef, useEffect } from 'react'
import { getImageUrlByKey } from '@/api/images'
import { useCart } from '@/context/CartContext'
import Icon from '@/components/icon'
import Breadcrumb from '@/components/BreadCrumb'
import Slider from 'react-slick'
import Reviews from '@/components/Reviews'
import Rating from '@/components/Rating'
import {
  HAIR_TYPES_TRANSLATIONS,
  HAIR_LENGTHS,
  HAIR_LENGTHS_TRANSLATIONS
} from '@/utils/constants'
import styles from '@/styles/pages.module.css'
import '@/components/ProductCardSkeleton.module.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export async function getServerSideProps(context) {
  const { id } = context.params
  const product = await getProduct(id)
 

  if (!product) {
    return { notFound: true }
  }

  return {
    props: { product }
  }
}

export default function ProductPage({ product }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [addToCartStatus, setAddToCartStatus] = useState(null)
  const variantsRef = useRef(null)
  const { addToCart } = useCart()
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    setActiveImageIndex(0)
  }, [selectedVariant])

  const scrollLeft = () => {
    variantsRef.current?.scrollBy({ left: -89, behavior: 'smooth' })
  }

  const scrollRight = () => {
    variantsRef.current?.scrollBy({ left: 89, behavior: 'smooth' })
  }

  const getHairLengthKey = (length) => {
    if (length >= HAIR_LENGTHS.SHORT[0] && length <= HAIR_LENGTHS.SHORT[1]) return 'SHORT'
    if (length >= HAIR_LENGTHS.MEDIUM[0] && length <= HAIR_LENGTHS.MEDIUM[1]) return 'MEDIUM'
    if (length >= HAIR_LENGTHS.LONG[0] && length <= HAIR_LENGTHS.LONG[1]) return 'LONG'
    return null
  }

  const currentVariant = product.variants[selectedVariant]
  const hairLengthKey = getHairLengthKey(product.length)
  const hairLengthLabel =
  product.length >= 21
    ? `${product.length} см`
    : hairLengthKey
    ? HAIR_LENGTHS_TRANSLATIONS[hairLengthKey]
    : 'Невідомо';

  const handleAddToCart = () => {
    try {
      setAddToCartStatus(null)
      const productData = {
        product_id: product.id,
        variantId: currentVariant.id,
        name: product.display_name,
        price: currentVariant.promo_price,
        image: currentVariant.images[0],
        article: product.article,
        quantity,
        color: currentVariant.color
      }
      addToCart(productData)
      setAddToCartStatus('success')
      setTimeout(() => setAddToCartStatus(null), 3000)
    } catch (error) {
      setAddToCartStatus('error')
      console.error('Failed to add to cart:', error)
      setTimeout(() => setAddToCartStatus(null), 5000)
    }
  }

  const schemaProduct = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.display_name,
    "image": getImageUrlByKey(currentVariant.images?.[0], { width: 600, height: 900 }),
    "brand": {
      "@type": "Brand",
      "name": "ПЕРУКИ ТУТ"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "UAH",
      "price": currentVariant.promo_price,
      "availability": currentVariant.availability
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      "url": `https://perukytut.com.ua/product/${product.id}`
    }
  }

  return (
    <>
      <Head>
        <title>{product.display_name} купити Україна | Доставка по всій Україні |  Перуки Тут - натуральні та синтетичні перуки,аксесуари</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaProduct) }}
        />
      </Head>

      <div className={`${styles['product-detail']} container`}>
        <div className={styles['product-content']}>
          <div className={styles['product-images']}>
            <div className={styles['main-image']}>
              <Slider
                key={selectedVariant}
                dots
                infinite
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                arrows
                afterChange={(index) => setActiveImageIndex(index)}
                fade
              >
                {currentVariant.images.map((imgKey, index) => (
                  <div key={`slide-${index}`}>
                    <img
          src={getImageUrlByKey(imgKey, { width: 600, height: 900, quality: 100 })}
          srcSet={`
            ${getImageUrlByKey(imgKey, { width: 320, height: 480, quality: 100 })} 320w,
            ${getImageUrlByKey(imgKey, { width: 600, height: 900, quality: 100 })} 600w
          `}
          sizes="(max-width: 600px) 160px, 300px"
          width={600}
          height={900}
          alt={product.display_name}
          style={{ width: "100%", height: "auto", maxWidth: "500px", borderRadius: "16px" }}
          loading="lazy"
          decoding="async"
        />
                  </div>
                ))}
              </Slider>
            </div>

            {product.variants.length > 1 && (
              <div className={styles['variant-selector-wrapper']}>
                <div
                  className={`${styles['variant-thumbnails-product']} ${product.variants.length < 5 ? styles['centered'] : ''}`}
                  ref={variantsRef}
                >
                  {product.variants.map((variant, index) => (
                    <button
                      key={`thumb-${variant.id}`}
                      className={`${styles['variant-thumbnail-product']} ${selectedVariant === index ? styles['active'] : ''} ${!variant.availability ? styles['unavailable'] : ''}`}
                      onClick={() => setSelectedVariant(index)}
                      disabled={!variant.availability}
                      title={variant.color}
                    >
                      <img
                    src={getImageUrlByKey(variant.images[0], { width: 80, height: 80, quality: 100 })}
                    alt={`${product.display_name} - ${variant.color}`}
                    loading="lazy"
                  />
                    </button>
                  ))}
                </div>

                {product.variants.length > 5 && (
                  <div className={styles['variants-select-btn']}>
                    <div onClick={scrollLeft} className={styles['btn-prev']}>
                      <Icon name="arrow_left" />
                    </div>
                    <div onClick={scrollRight} className={styles['btn-prev']}>
                      <Icon name="arrow_right" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className={styles['product-info']}>
            <div className={styles['characteristic']}>
              <Breadcrumb categoryId={product.category} productName={product.display_name} />
              <h2>{product.display_name}</h2>
              <p className={styles['article']}>Артикул: {product.article}</p>
              <a href="#reviews"><Rating product_id={product.id} /></a>

              <div className={styles['promo']}>
                <p className={styles['old-price']}>{currentVariant.price} грн</p>
                <p className={styles['discount']}>
                  {Math.round(((currentVariant.promo_price - currentVariant.price) / currentVariant.price) * 100)}%
                </p>
              </div>
              <p className={styles['price']}>{currentVariant.promo_price} грн</p>

              <div className={styles['product-specs']}>
                <p><strong>Тип волосся:</strong> {HAIR_TYPES_TRANSLATIONS[product.type]}</p>
                <p><strong>Довжина:</strong> {hairLengthLabel}</p>
                <p><strong>Колір:</strong> {currentVariant.color}</p>
                <p><strong>Наявність:</strong> {currentVariant.availability ? 'Є в наявності' : 'Немає в наявності'}</p>
              </div>
              <p className={styles['description']}>{product.description}</p>
            </div>

            <div className={styles['cart-options']}>
              <div className={styles['quantity-selector']}>
                <label>Кількість:</label>
                <div className={styles['quantity-controls']}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Icon name="minus" size={12} />
                  </button>
                  <span>{quantity}</span>
                  <button
              onClick={() => setQuantity(quantity + 1)}>
              <Icon name="plus" size={12} />
            </button>
          </div>
        </div>
        <button
          className={styles['add-to-cart-btn']}
          onClick={handleAddToCart}
          disabled={!currentVariant.availability}
        >
          {currentVariant.availability ? 'Додати в кошик' : 'Немає в наявності'}
        </button>
      </div>

      {addToCartStatus === 'success' && (
        <div className={styles['add-to-cart-success']}>
          ✅ Товар додано до кошика!
        </div>
      )}
      {addToCartStatus === 'error' && (
        <div className={styles['add-to-cart-error']}>
          ❌ Помилка при додаванні до кошика.<br /> Спробуйте ще раз.
        </div>
      )}
    </div>
  </div>

  <Reviews product_id={product.id} />
</div>

    </>
  )
}
