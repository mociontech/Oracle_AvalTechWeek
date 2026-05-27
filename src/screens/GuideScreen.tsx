const imgBgTexture   = '/images/guide-bg-texture.png'
const imgBgDecoRight = '/images/guide-bg-deco.png'
const imgOracleLogo  = '/images/guide-oracle-logo.png'
const imgQrFrame     = '/images/guide-bottom-red.svg'
const imgQrCode      = '/images/guide-arrow.png'
const imgArrow       = '/images/guide-qr.png'

interface Props { onNext: () => void }

const abs = (top: string, right: string, bottom: string, left: string) => ({
  position: 'absolute' as const,
  top, right, bottom, left,
})

export default function GuideScreen({ onNext }: Props) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>

      {/* ── Fondo — carga primero ── */}
      <div style={{ ...abs('-0.31%', '-29.54%', '-8.49%', '-98.52%'), overflow: 'hidden', pointerEvents: 'none', animation: 'fadeIn 0.3s ease-out 0s both' }}>
        <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgBgTexture} />
      </div>
      <div style={{ ...abs('-40.73%', '-143.7%', '13.39%', '63.61%'), overflow: 'hidden', pointerEvents: 'none', animation: 'fadeIn 0.3s ease-out 0s both' }}>
        <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgBgDecoRight} />
      </div>

      {/* Oracle logo — después del fondo */}
      <div style={{ ...abs('9.64%', '62.69%', '88.49%', '11.48%'), overflow: 'hidden', pointerEvents: 'none', animation: 'fadeIn 0.45s ease-out 0.32s both' }}>
        <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgOracleLogo} />
      </div>

      {/* Conoce esta guía… — entra línea por línea desde la izquierda */}
      <p style={{ ...abs('29.26%', '39.97%', '64.44%', '12.53%'), animation: 'fadeInLeft 0.55s ease-out 0.5s both',  fontFamily: "'Oracle Sans', sans-serif", fontWeight: 400, fontSize: '92.4px', lineHeight: 'normal', color: '#444d4d', whiteSpace: 'nowrap' }}>
        Conoce esta
      </p>
      <p style={{ ...abs('35.03%', '44.32%', '58.67%', '12.53%'), animation: 'fadeInLeft 0.55s ease-out 0.6s both',  fontFamily: "'Oracle Sans', sans-serif", fontWeight: 400, fontSize: '92.4px', lineHeight: 'normal', color: '#444d4d', whiteSpace: 'nowrap' }}>
        guía rápida
      </p>
      <p style={{ ...abs('40.81%', '34.79%', '52.89%', '12.53%'), animation: 'fadeInLeft 0.55s ease-out 0.7s both',  fontFamily: "'Oracle Sans', sans-serif", fontWeight: 400, fontSize: '92.4px', lineHeight: 'normal', color: '#444d4d', whiteSpace: 'nowrap' }}>
        para el Oracle
      </p>
      <p style={{ ...abs('46.58%', '71.18%', '47.12%', '12.53%'), animation: 'fadeInLeft 0.55s ease-out 0.8s both',  fontFamily: "'Oracle Sans', sans-serif", fontWeight: 400, fontSize: '92.4px', lineHeight: 'normal', color: '#444d4d', whiteSpace: 'nowrap' }}>
        quiz
      </p>

      {/* Flecha — aparece después del texto */}
      <div style={{ ...abs('56.72%', '78.98%', '39.84%', '12.87%'), overflow: 'hidden', pointerEvents: 'none', animation: 'fadeIn 0.5s ease-out 0.88s both' }}>
        <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgArrow} />
      </div>

      {/* QR frame — escala desde el centro */}
      <div style={{ ...abs('61.2%', '12.44%', '10.39%', '37.05%'), animation: 'scaleIn 0.6s ease-out 0.95s both', transformOrigin: 'center' }}>
        <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none', display: 'block' }} src={imgQrFrame} />
      </div>

      {/* QR code — fade después del frame */}
      <div style={{ ...abs('63.18%', '15.93%', '12.34%', '40.56%'), overflow: 'hidden', animation: 'fadeIn 0.5s ease-out 1.1s both' }}>
        <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgQrCode} />
      </div>

      {/* Tap para continuar */}
      <div onClick={onNext} style={{ position: 'absolute', inset: 0, cursor: 'pointer' }} />

    </div>
  )
}
