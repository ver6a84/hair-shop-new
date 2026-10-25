import { useEffect, useRef, useState } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import Icon from './icon'
import styles from './WigTryOn.module.css'

// 3:4 portrait, below the 512px limit flux.2 has for reference images
const PHOTO_WIDTH = 381
const PHOTO_HEIGHT = 508
// same framing as the generated image, the face is restored from it
const ORIGINAL_WIDTH = 768
const ORIGINAL_HEIGHT = 1024

const ERROR_KEYS = {
  rate_limited: 'tryOn.errorRateLimited',
  quota_exceeded: 'tryOn.errorQuota'
}

// center-crops the source to 3:4 and resizes it to the given size
const cropPhoto = (source, sourceWidth, sourceHeight, targetWidth, targetHeight) => {
  const scale = Math.max(targetWidth / sourceWidth, targetHeight / sourceHeight)
  const width = sourceWidth * scale
  const height = sourceHeight * scale

  const canvas = document.createElement('canvas')
  canvas.width = targetWidth
  canvas.height = targetHeight
  canvas.getContext('2d').drawImage(
    source,
    (targetWidth - width) / 2,
    (targetHeight - height) / 2,
    width,
    height
  )

  return canvas.toDataURL('image/jpeg', 0.9)
}

// the small copy goes to the model, so the worker only forwards it
const preparePhoto = (source, sourceWidth, sourceHeight) => ({
  small: cropPhoto(source, sourceWidth, sourceHeight, PHOTO_WIDTH, PHOTO_HEIGHT),
  original: cropPhoto(source, sourceWidth, sourceHeight, ORIGINAL_WIDTH, ORIGINAL_HEIGHT)
})

// the model redraws the face too, so the visitor's own face is put back;
// mediapipe is heavy, it is loaded only when a try-on starts
const keepOriginalFace = async (original, generated) => {
  try {
    const { restoreFace } = await import('@/utils/restoreFace')
    return await restoreFace(original, generated)
  } catch (error) {
    console.error('Failed to restore face:', error)
    return generated
  }
}

const hasCamera = async () => {
  if (!navigator.mediaDevices?.getUserMedia || !navigator.mediaDevices.enumerateDevices) return false
  const devices = await navigator.mediaDevices.enumerateDevices()
  return devices.some((device) => device.kind === 'videoinput')
}

export default function WigTryOn({ productId, variantId, onClose }) {
  const { t } = useTranslation()
  const [photo, setPhoto] = useState(null)
  const [cameraAvailable, setCameraAvailable] = useState(false)
  const [cameraOn, setCameraOn] = useState(false)
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)
  const [errorKey, setErrorKey] = useState(null)
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    setCameraOn(false)
  }

  useEffect(() => {
    hasCamera().then(setCameraAvailable).catch(() => setCameraAvailable(false))
    return () => streamRef.current?.getTracks().forEach((track) => track.stop())
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  useEffect(() => {
    if (cameraOn && videoRef.current) {
      videoRef.current.srcObject = streamRef.current
    }
  }, [cameraOn])

  const showError = (key) => {
    setErrorKey(key)
    setStatus('error')
  }

  const applyPhoto = (prepared) => {
    setPhoto(prepared)
    setResult(null)
    setErrorKey(null)
    setStatus('idle')
  }

  const startCamera = async () => {
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 960 } },
        audio: false
      })
      setErrorKey(null)
      setStatus('idle')
      setCameraOn(true)
    } catch (error) {
      console.error('Failed to start camera:', error)
      showError('tryOn.errorCamera')
    }
  }

  const takePicture = () => {
    const video = videoRef.current
    if (!video?.videoWidth) return
    applyPhoto(preparePhoto(video, video.videoWidth, video.videoHeight))
    stopCamera()
  }

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    try {
      const bitmap = await createImageBitmap(file)
      applyPhoto(preparePhoto(bitmap, bitmap.width, bitmap.height))
      bitmap.close()
    } catch (error) {
      console.error('Failed to read photo:', error)
      showError('tryOn.errorPhoto')
    }
  }

  const handleTryOn = async () => {
    setStatus('loading')
    setErrorKey(null)
    import('@/utils/restoreFace')
      .then(({ loadFaceLandmarker }) => loadFaceLandmarker())
      .catch(() => {})
    try {
      const response = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, variantId, photo: photo.small })
      })
      const data = await response.json()
      if (!response.ok) {
        showError(ERROR_KEYS[data.error] ?? 'tryOn.error')
        return
      }
      setResult(await keepOriginalFace(photo.original, data.image))
      setStatus('done')
    } catch (error) {
      console.error('Wig try-on failed:', error)
      showError('tryOn.error')
    }
  }

  const renderFrame = () => {
    if (cameraOn) {
      return <video ref={videoRef} className={`${styles.preview} ${styles.mirrored}`} autoPlay playsInline muted />
    }
    if (photo) {
      return <img className={styles.preview} src={photo.original} alt={t('tryOn.photoAlt')} />
    }
    return <span className={styles.placeholder}>{t('tryOn.photoPlaceholder')}</span>
  }

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="try-on-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.close} type="button" onClick={onClose} aria-label={t('tryOn.close')}>
          <Icon name="close" size={12} />
        </button>
        <h2 id="try-on-title" className={styles.title}>{t('tryOn.title')}</h2>

        {status === 'done' ? (
          <>
            <img className={styles.preview} src={result} alt={t('tryOn.resultAlt')} />
            <p className={styles.note}>{t('tryOn.disclaimer')}</p>
            <div className={styles.actions}>
              <a className={styles.secondary} href={result} download="wig-try-on.jpg">
                {t('tryOn.download')}
              </a>
              <button className={styles.primary} type="button" onClick={() => setStatus('idle')}>
                {t('tryOn.again')}
              </button>
            </div>
          </>
        ) : (
          <>
            <p className={styles.note}>{t('tryOn.hint')}</p>

            <div className={styles.frame}>{renderFrame()}</div>

            {cameraOn ? (
              <div className={styles.actions}>
                <button className={styles.secondary} type="button" onClick={stopCamera}>
                  {t('tryOn.cancel')}
                </button>
                <button className={styles.primary} type="button" onClick={takePicture}>
                  {t('tryOn.capture')}
                </button>
              </div>
            ) : (
              <div className={styles.actions}>
                {cameraAvailable && (
                  <button className={styles.secondary} type="button" onClick={startCamera}>
                    {t('tryOn.takePhoto')}
                  </button>
                )}
                <label className={styles.secondary}>
                  {t('tryOn.choosePhoto')}
                  <input type="file" accept="image/*" onChange={handleFileChange} hidden />
                </label>
              </div>
            )}

            <label className={styles.consent}>
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              {t('tryOn.consent')}
            </label>

            {status === 'error' && <p className={styles.error}>{t(errorKey)}</p>}

            <button
              className={styles.primary}
              type="button"
              onClick={handleTryOn}
              disabled={!photo || cameraOn || !consent || status === 'loading'}
            >
              {status === 'loading' ? t('tryOn.loading') : t('tryOn.submit')}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
