// Puts the visitor's original face back onto the generated try-on image,
// so only the hair comes from the model. Runs in the browser only.
import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision'

// keep in sync with the @mediapipe/tasks-vision version in package.json
const WASM_URL = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.1.0/wasm'
const MODEL_URL = 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task'

// eye corners, nose, mouth corners and chin — points that don't move with the hair
const ALIGN_POINTS = [33, 133, 362, 263, 168, 1, 61, 291, 199, 152]

// face outline from temple to temple around the chin, closed along the top of the
// eyebrows, so the forehead (where bangs fall) stays from the generated image
const MASK_POINTS = [
  389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152,
  148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162,
  70, 63, 105, 66, 107, 336, 296, 334, 293, 300
]

// mask is pulled towards the face center so hair lying on the cheeks is kept
const MASK_SHRINK = 0.93
const FEATHER = 0.05

let landmarkerPromise = null

export const loadFaceLandmarker = () => {
  landmarkerPromise ??= FilesetResolver.forVisionTasks(WASM_URL)
    .then((fileset) => FaceLandmarker.createFromOptions(fileset, {
      baseOptions: { modelAssetPath: MODEL_URL, delegate: 'CPU' },
      runningMode: 'IMAGE',
      numFaces: 1
    }))
    .catch((error) => {
      landmarkerPromise = null
      throw error
    })
  return landmarkerPromise
}

const loadImage = (src) => new Promise((resolve, reject) => {
  const image = new Image()
  image.onload = () => resolve(image)
  image.onerror = reject
  image.src = src
})

const detectPoints = (landmarker, image) => {
  const face = landmarker.detect(image).faceLandmarks?.[0]
  return face?.map(({ x, y }) => [x * image.naturalWidth, y * image.naturalHeight])
}

// least-squares rotation + scale + translation mapping `from` points onto `to`
const similarityTransform = (from, to) => {
  const mean = (points) => points
    .reduce(([sx, sy], [x, y]) => [sx + x, sy + y], [0, 0])
    .map((sum) => sum / points.length)
  const [fx, fy] = mean(from)
  const [tx, ty] = mean(to)

  let dot = 0
  let cross = 0
  let norm = 0
  from.forEach(([x, y], i) => {
    const px = x - fx
    const py = y - fy
    const qx = to[i][0] - tx
    const qy = to[i][1] - ty
    dot += px * qx + py * qy
    cross += px * qy - py * qx
    norm += px * px + py * py
  })

  const cos = dot / norm
  const sin = cross / norm
  return [cos, sin, -sin, cos, tx - (cos * fx - sin * fy), ty - (sin * fx + cos * fy)]
}

const createCanvas = (width, height) => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return [canvas, canvas.getContext('2d')]
}

// returns the generated image with the face taken from the original photo;
// the original should have the same framing as the photo sent to the model
export async function restoreFace(originalSrc, generatedSrc) {
  const [landmarker, original, generated] = await Promise.all([
    loadFaceLandmarker(),
    loadImage(originalSrc),
    loadImage(generatedSrc)
  ])

  const originalPoints = detectPoints(landmarker, original)
  const generatedPoints = detectPoints(landmarker, generated)
  if (!originalPoints || !generatedPoints) return generatedSrc

  const { naturalWidth: width, naturalHeight: height } = generated

  const polygon = MASK_POINTS.map((index) => generatedPoints[index])
  const [cx, cy] = generatedPoints[1]
  const faceWidth = Math.hypot(
    generatedPoints[454][0] - generatedPoints[234][0],
    generatedPoints[454][1] - generatedPoints[234][1]
  )

  const [mask, maskCtx] = createCanvas(width, height)
  maskCtx.filter = `blur(${Math.round(faceWidth * FEATHER)}px)`
  maskCtx.beginPath()
  polygon.forEach(([x, y], i) => {
    const px = cx + (x - cx) * MASK_SHRINK
    const py = cy + (y - cy) * MASK_SHRINK
    if (i === 0) maskCtx.moveTo(px, py)
    else maskCtx.lineTo(px, py)
  })
  maskCtx.closePath()
  maskCtx.fill()

  const [face, faceCtx] = createCanvas(width, height)
  faceCtx.setTransform(...similarityTransform(
    ALIGN_POINTS.map((index) => originalPoints[index]),
    ALIGN_POINTS.map((index) => generatedPoints[index])
  ))
  faceCtx.drawImage(original, 0, 0)
  faceCtx.setTransform(1, 0, 0, 1, 0, 0)
  faceCtx.globalCompositeOperation = 'destination-in'
  faceCtx.drawImage(mask, 0, 0)

  const [output, outputCtx] = createCanvas(width, height)
  outputCtx.drawImage(generated, 0, 0)
  outputCtx.drawImage(face, 0, 0)

  return output.toDataURL('image/jpeg', 0.92)
}
