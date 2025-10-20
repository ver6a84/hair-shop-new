const bucketUrl = 'https://images.perukytyt.com/cdn-cgi/image'

/**
 * Get image URL by key
 * @param {string} key - Image key
 * @param {Object} options - Image options
 * @param {number} options.width - Image width
 * @param {number} options.height - Image height
 * @param {number} options.blur - Image blur
 * @param {number} options.quality - Image quality
 * @param {string} options.format - Image format
 * @returns {string} Image URL
 */
export const getImageUrlByKey = (
  imageObj,
  {
    width,
    height,
    blur,
    quality = 80,
    format = 'webp'
  } = {}
) => {
  if (!imageObj?.url) return ''

  const filters = [
    width && `width=${width}`,
    height && `height=${height}`,
    blur && `blur=${blur}`,
    quality && `quality=${quality}`,
    format && `format=${format}`
  ].filter(Boolean).join(',')

  return `${bucketUrl}${filters ? `/${filters}` : ''}/${imageObj.url}`
}
