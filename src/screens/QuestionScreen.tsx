import { useEffect } from 'react'

const imgBgTexture  = '/images/oracle-bg-texture.png'
const imgBgDecoTop  = '/images/oracle-bg-deco-top.png'
const imgLogoBanner = '/images/oracle-logo-banner.png'
const imgCarSwoosh  = '/images/oracle-car-swoosh.png'
const imgCar        = '/images/oracle-car.png'

interface Props { onNext: () => void }

const abs = (top: string, right: string, bottom: string, left: string) => ({
  position: 'absolute' as const,
  top, right, bottom, left,
})

export default function QuestionScreen({ onNext }: Props) {
  // Auto-avanza a los 5 segundos; tap también avanza
  useEffect(() => {
    const t = setTimeout(onNext, 5000)
    return () => clearTimeout(t)
  }, [onNext])

  return (
    <div
      onClick={onNext}
      style={{ position: 'relative', width: '100%', height: '100%', cursor: 'pointer' }}
    >
      {/* ── Fondo — carga primero ── */}
      <div style={{
        ...abs('-0.31%', '-29.54%', '-8.49%', '-98.52%'),
        overflow: 'hidden', pointerEvents: 'none',
        animation: 'fadeIn 0.3s ease-out 0s both',
      }}>
        <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgBgTexture} />
      </div>

      <div style={{
        ...abs('-75.68%', '-121.39%', '48.39%', '41.39%'),
        overflow: 'hidden', pointerEvents: 'none',
        animation: 'fadeIn 0.3s ease-out 0s both',
      }}>
        <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgBgDecoTop} />
      </div>

      {/* ── Logo banner — aparece cuando el fondo ya está ── */}
      <div style={{
        ...abs('24.32%', '11.94%', '66.61%', '11.94%'),
        overflow: 'hidden', pointerEvents: 'none',
        animation: 'fadeInDown 0.65s ease-out 0.35s both',
      }}>
        <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgLogoBanner} />
      </div>

      {/* ── Swoosh del carro — entra desde la derecha ── */}
      <div style={{
        ...abs('48.49%', '-9.07%', '14.27%', '-7.96%'),
        overflow: 'hidden', pointerEvents: 'none',
        animation: 'swooshEntry 0.9s cubic-bezier(0.22,1,0.36,1) 0.55s both',
      }}>
        <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgCarSwoosh} />
      </div>

      {/* ── Carro F1 — entra desde la derecha con más fuerza ── */}
      <div style={{
        ...abs('49.22%', '6.3%', '23.91%', '-3.06%'),
        overflow: 'hidden', pointerEvents: 'none',
        animation: 'carEntry 1s cubic-bezier(0.22,1,0.36,1) 0.72s both',
      }}>
        <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgCar} />
      </div>
    </div>
  )
}
