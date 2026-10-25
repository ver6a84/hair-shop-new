import { getCloudflareContext } from '@opennextjs/cloudflare'
import { getProduct } from '@/api'
import { getImageUrlByKey } from '@/api/images'

const MODEL = '@cf/black-forest-labs/flux-2-klein-4b'

// flux.2 rejects reference images with an edge of 512px or more
const WIG_WIDTH = 340
const WIG_HEIGHT = 510
const OUTPUT_WIDTH = 768
const OUTPUT_HEIGHT = 1024
const MAX_PHOTO_BYTES = 200 * 1024
// flux.2 klein takes up to 4 reference images: the visitor photo + 3 wig photos
// (catalog photos of a color are front, side and back on a mannequin)
const MAX_WIG_IMAGES = 3

const buildPrompt = (wigImagesCount) => [
  wigImagesCount > 1
    ? `Replace the hairstyle of the person in image 1 with the wig shown on the mannequin in images 2 to ${wigImagesCount + 1}. They are photos of the same wig: image 2 is the front view, the others show it from the side and back.`
    : 'Replace the hairstyle of the person in image 1 with the wig shown on the mannequin in image 2.',
  // without this the model keeps long original hair and only adds the wig bangs
  'Remove all of the person\'s original hair: none of it may be visible, including on the shoulders and neck.',
  'The new hair is exactly this wig — the same length, cut, volume, bangs, color and texture.',
  'Keep the person\'s face, identity, expression, head position, clothing and background unchanged, the head stays facing the camera as in image 1.',
  'Photorealistic portrait photo.'
].join(' ')

const fetchWigImage = async (imageObj) => {
  const response = await fetch(getImageUrlByKey(imageObj, {
    width: WIG_WIDTH,
    height: WIG_HEIGHT,
    format: 'jpeg'
  }))
  return response.ok ? response.arrayBuffer() : null
}

// the photo is resized in the browser, so the body stays small
export const config = {
  api: {
    bodyParser: { sizeLimit: '400kb' }
  }
}

const getMimeType = (base64) => (base64.startsWith('iVBOR') ? 'image/png' : 'image/jpeg')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'method_not_allowed' })
  }

  const { productId, variantId, photo } = req.body ?? {}
  const photoMatch = /^data:image\/jpeg;base64,([A-Za-z0-9+/=]+)$/.exec(photo ?? '')
  if (!productId || !photoMatch) {
    return res.status(400).json({ error: 'bad_request' })
  }

  const photoBytes = Buffer.from(photoMatch[1], 'base64')
  if (photoBytes.length > MAX_PHOTO_BYTES) {
    return res.status(413).json({ error: 'photo_too_large' })
  }

  const { env } = getCloudflareContext()

  if (env.TRY_ON_LIMITER) {
    const { success } = await env.TRY_ON_LIMITER.limit({
      key: req.headers['cf-connecting-ip'] ?? 'unknown'
    })
    if (!success) {
      return res.status(429).json({ error: 'rate_limited' })
    }
  }

  // wig images are taken from our own catalog, never from the client
  const product = await getProduct(productId)
  const variant = product?.variants?.find((item) => String(item.id) === String(variantId))
    ?? product?.variants?.[0]
  if (!variant?.images?.length) {
    return res.status(404).json({ error: 'product_not_found' })
  }

  const wigImageObjs = [...variant.images]
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .slice(0, MAX_WIG_IMAGES)
  const wigImages = (await Promise.all(wigImageObjs.map(fetchWigImage))).filter(Boolean)
  if (!wigImages.length) {
    return res.status(502).json({ error: 'wig_image_unavailable' })
  }

  const form = new FormData()
  form.append('prompt', buildPrompt(wigImages.length))
  form.append('input_image_0', new Blob([photoBytes], { type: 'image/jpeg' }), 'photo.jpg')
  wigImages.forEach((image, index) => {
    form.append(`input_image_${index + 1}`, new Blob([image], { type: 'image/jpeg' }), `wig-${index + 1}.jpg`)
  })
  form.append('width', String(OUTPUT_WIDTH))
  form.append('height', String(OUTPUT_HEIGHT))
  const formResponse = new Response(form)

  try {
    const result = await env.AI.run(MODEL, {
      multipart: {
        body: formResponse.body,
        contentType: formResponse.headers.get('content-type')
      }
    })

    if (!result?.image) {
      return res.status(502).json({ error: 'generation_failed' })
    }

    return res.status(200).json({
      image: `data:${getMimeType(result.image)};base64,${result.image}`
    })
  } catch (error) {
    console.error('Wig try-on failed:', error)
    // 4006 — the daily free workers ai allocation is used up
    const quotaExceeded = String(error?.message).includes('4006')
    return res.status(quotaExceeded ? 503 : 502).json({
      error: quotaExceeded ? 'quota_exceeded' : 'generation_failed'
    })
  }
}
