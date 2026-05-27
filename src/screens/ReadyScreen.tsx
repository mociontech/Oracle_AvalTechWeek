const imgBgTexture  = '/images/ready-bg-texture.png'
const imgBgDeco     = '/images/ready-bg-deco.png'
const imgOracleLogo = '/images/ready-oracle-logo.png'
const imgBottomRed  = '/images/ready-bottom-red.png'
const imgStartBtn   = '/images/ready-start-btn.svg'

interface Props { onNext: () => void; onBack: () => void }

const abs = (top: string, right: string, bottom: string, left: string) => ({
  position: 'absolute' as const,
  top, right, bottom, left,
})

export default function ReadyScreen({ onNext, onBack }: Props) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>

      {/* ── Fondo — carga primero ── */}
      <div style={{ ...abs('-0.31%', '-29.54%', '-8.49%', '-98.52%'), overflow: 'hidden', pointerEvents: 'none', animation: 'fadeIn 0.3s ease-out 0s both' }}>
        <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgBgTexture} />
      </div>
      <div style={{ ...abs('-21.88%', '61.02%', '-5.47%', '-141.11%'), overflow: 'hidden', pointerEvents: 'none', animation: 'fadeIn 0.3s ease-out 0s both' }}>
        <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgBgDeco} />
      </div>
      <div style={{ ...abs('81.51%', '-25.83%', '-28.85%', '-2.13%'), overflow: 'hidden', pointerEvents: 'none', animation: 'fadeIn 0.3s ease-out 0s both' }}>
        <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgBottomRed} />
      </div>

      {/* Oracle logo — después del fondo */}
      <div style={{ ...abs('9.64%', '62.69%', '88.49%', '11.48%'), overflow: 'hidden', pointerEvents: 'none', animation: 'fadeIn 0.45s ease-out 0.32s both' }}>
        <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgOracleLogo} />
      </div>

      {/* AVAL Tech Week — cae desde arriba */}
      <p style={{
        ...abs('12.44%', '24.54%', '81.15%', '11.3%'),
        animation: 'fadeInDown 0.55s ease-out 0.38s both',
        lineHeight: 0, textAlign: 'center', whiteSpace: 'nowrap', fontStyle: 'normal',
      }}>
        <span style={{ fontFamily: "'Oracle Sans', sans-serif", fontWeight: 300, lineHeight: 'normal', fontSize: '91.2px', color: '#444d4d' }}>AVAL</span>
        <span style={{ fontFamily: "'Oracle Sans', sans-serif", fontWeight: 400, lineHeight: 'normal', fontSize: '94px',   color: '#444d4d' }}>{' Tech Week'}</span>
      </p>

      {/* ¿Estás — titular enorme, cae en dos tiempos */}
      <p style={{
        ...abs('27.1%', '45.78%', '62.74%', '11.91%'),
        animation: 'fadeInDown 0.65s ease-out 0.52s both',
        fontFamily: "'Oracle Sans', sans-serif", fontWeight: 800, fontSize: '149.244px',
        lineHeight: 'normal', color: '#444d4d', whiteSpace: 'nowrap', fontStyle: 'normal',
      }}>
        ¿Estás
      </p>
      <p style={{
        ...abs('35.82%', '55.22%', '53.24%', '11.72%'),
        animation: 'fadeInDown 0.65s ease-out 0.68s both',
        fontFamily: "'Oracle Sans', sans-serif", fontWeight: 300, fontSize: '161.09px',
        lineHeight: 'normal', color: '#444d4d', whiteSpace: 'nowrap', fontStyle: 'normal',
      }}>
        listo?
      </p>

      {/* El reto comienza ahora — entra desde la izquierda */}
      <p style={{
        ...abs('48.97%', '32.97%', '45.61%', '12.03%'),
        animation: 'fadeInLeft 0.55s ease-out 0.82s both',
        fontFamily: "'Oracle Sans', sans-serif", fontWeight: 400, fontSize: '79.394px',
        lineHeight: 'normal', color: '#444d4d', whiteSpace: 'nowrap',
      }}>
        El reto comienza
      </p>
      <p style={{
        ...abs('53.88%', '66.95%', '40.7%', '12.13%'),
        animation: 'fadeInLeft 0.55s ease-out 0.92s both',
        fontFamily: "'Oracle Sans', sans-serif", fontWeight: 400, fontSize: '79.394px',
        lineHeight: 'normal', color: '#444d4d', whiteSpace: 'nowrap',
      }}>
        ahora.
      </p>

      {/* Botón Iniciar reto — sube desde abajo + respira */}
      <div
        onClick={onNext}
        style={{
          ...abs('67.76%', '44.07%', '25.94%', '12.13%'),
          cursor: 'pointer',
          animation: 'fadeInUp 0.65s ease-out 1.02s both, breathe 2.6s ease-in-out 1.8s infinite',
          transformOrigin: 'center',
        }}
      >
        <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none', display: 'block' }} src={imgStartBtn} />
        <span style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Oracle Sans', sans-serif", fontWeight: 800, fontSize: '75px',
          color: '#fff', letterSpacing: '1px',
        }}>
          Iniciar reto
        </span>
      </div>

      {/* Botón volver — esquina inferior izquierda */}
      <button
        onClick={onBack}
        style={{
          position: 'absolute', bottom: '48px', left: '52px',
          background: 'transparent',
          border: '2px solid rgba(68,77,77,0.35)',
          borderRadius: '16px',
          color: '#444d4d',
          fontFamily: "'Oracle Sans', sans-serif",
          fontWeight: 500,
          fontSize: '38px',
          padding: '20px 48px',
          cursor: 'pointer',
          animation: 'fadeIn 0.4s ease-out 1.2s both',
          transition: 'background 0.2s, border-color 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(68,77,77,0.1)'
          e.currentTarget.style.borderColor = 'rgba(68,77,77,0.6)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.borderColor = 'rgba(68,77,77,0.35)'
        }}
      >
        ← Volver
      </button>

    </div>
  )
}
