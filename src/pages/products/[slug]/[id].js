import Head from 'next/head'
import CanonicalLink from '@/components/CanonicalLink'
import { getProduct } from '@/api'
import { useState, useRef } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { getImageUrlByKey } from '@/api/images'
import { useCart } from '@/context/CartContext'
import Icon from '@/components/icon'
import Breadcrumb from '@/components/BreadCrumb'
import Slider from 'react-slick'
import Reviews from '@/components/Reviews'
import Rating from '@/components/Rating'
import WigTryOn from '@/components/WigTryOn'
import {
  HAIR_LENGTHS,
  CATEGORIES_URLS,
  PRODUCT_CATEGORIES
} from '@/utils/constants'
import { getLocalizedField, getLocalizedUrl, hasRuTranslation } from '@/utils/i18n'
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
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [addToCartStatus, setAddToCartStatus] = useState(null)
  const [showTryOn, setShowTryOn] = useState(false)
  const variantsRef = useRef(null)
  const sliderRef = useRef(null)
  const { addToCart } = useCart()
  const { t, locale } = useTranslation()
  const productName = getLocalizedField(product, 'display_name', locale)
  const productDescription = getLocalizedField(product, 'description', locale)

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
    ? t('product.lengthCm', { length: product.length })
    : hairLengthKey
    ? t(`hairLengths.${hairLengthKey}`)
    : t('hairLengths.unknown');

  const handleAddToCart = () => {
    try {
      setAddToCartStatus(null)
      const productData = {
        product_id: product.id,
        variantId: currentVariant.id,
        name: product.display_name,
        name_ru: product.display_name_ru,
        price: currentVariant.price,
        image: currentVariant.images[0],
        article: product.article,
        quantity,
        color: currentVariant.color,
        category: product.category
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

  const categorySlug = CATEGORIES_URLS[product.category] || 'wigs'

  const productPath = `/products/${categorySlug}/${product.id}`
  const pageTitle = t('meta.productTitle', { name: productName })
  const metaDescription = (() => {
    const clean = productDescription?.replace(/\s+/g, ' ').trim()
    const suffix = t('meta.productDescriptionSuffix', { price: currentVariant.price })
    if (!clean) return t('meta.productDescriptionFallback', { name: productName, suffix })
    const maxLength = 155 - suffix.length - 1
    const truncated = clean.length > maxLength
      ? `${clean.slice(0, maxLength).trim()}…`
      : clean
    return `${truncated} ${suffix}`
  })()

  const schemaProduct = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": productName,
    "image": getImageUrlByKey(currentVariant.images?.[0], { width: 600, height: 900 }),
    "brand": {
      "@type": "Brand",
      "name": "ПЕРУКИ ТУТ"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "UAH",
      "price": String(currentVariant.price),
      "availability": currentVariant.availability
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      "url": getLocalizedUrl(productPath, locale)
    }
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" key="description" content={metaDescription} />
        <meta property="og:title" key="og:title" content={pageTitle} />
        <meta property="og:description" key="og:description" content={metaDescription} />
        <meta property="og:type" key="og:type" content="product" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaProduct) }}
        />
      </Head>
      <CanonicalLink path={productPath} ruTranslated={hasRuTranslation(product)} />

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
                      alt={productName}
                      style={{ width: "100%", height: "auto",aspectRatio: "3/4", maxWidth: "500px", borderRadius: "16px" }}
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
                        alt={`${productName} - ${variant.color}`}
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
              <Breadcrumb categoryId={product.category} productName={productName} />
              <h1>{productName}</h1>
              <p className={styles['article']}>{t('product.article', { article: product.article })}</p>
              <a href="#reviews"><Rating product_id={product.id} /></a>

              {/* <div className={styles['promo']}>
                <p className={styles['old-price']}>{currentVariant.price} грн</p>
                <p className={styles['discount']}>
                  {Math.round(((currentVariant.promo_price - currentVariant.price) / currentVariant.price) * 100)}%
                </p>
              </div> */}
              <p className={styles['price']}>{currentVariant.price} {t('currency')}</p>

              <div className={styles['product-specs']}>
                <p><strong>{t('product.hairType')}</strong> {t(`hairTypes.${product.type}`)}</p>
                <p><strong>{t('product.length')}</strong> {hairLengthLabel}</p>
                <p><strong>{t('product.color')}</strong> {currentVariant.color}</p>
                <p><strong>{t('product.availability')}</strong> {currentVariant.availability ? t('product.inStock') : t('product.outOfStock')}</p>
              </div>
              <p className={styles['description']}>{productDescription}</p>
            </div>

            <div className={styles['cart-options']}>
              <div className={styles['quantity-selector']}>
                <label>{t('product.quantity')}</label>
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
        <div className={styles['product-actions']}>
        <button
          className={styles['add-to-cart-btn']}
          onClick={handleAddToCart}
          disabled={!currentVariant.availability}
        >
          {currentVariant.availability ? t('product.addToCart') : t('product.outOfStock')}
        </button>
        {product.category === PRODUCT_CATEGORIES.WIGS && (
          <button
            className={styles['try-on-btn']}
            onClick={() => setShowTryOn(true)}
          >
            {t('tryOn.open')}
          </button>
        )}
        </div>
      </div>

      {addToCartStatus === 'success' && (
        <div className={styles['add-to-cart-success']}>
          {t('product.added')}
        </div>
      )}
      {addToCartStatus === 'error' && (
        <div className={styles['add-to-cart-error']}>
          {t('product.addError')}<br /> {t('product.tryAgain')}
        </div>
      )}
    </div>
  </div>

  <Reviews product_id={product.id} />
</div>

      {showTryOn && (
        <WigTryOn
          productId={product.id}
          variantId={currentVariant.id}
          onClose={() => setShowTryOn(false)}
        />
      )}

    </>
  )
}
