import { useState } from 'react'

const imgBgTexture  = '/images/welcome-bg-texture.png'
const imgBgDeco     = '/images/welcome-bg-deco.png'
const imgBottomRed  = '/images/welcome-bottom-red.png'
const imgOracleLogo = '/images/welcome-oracle-logo.png'
const imgStartBtn   = '/images/welcome-start-btn.svg'

interface Props { onNext: () => void }

const abs = (top: string, right: string, bottom: string, left: string) => ({
  position: 'absolute' as const,
  top, right, bottom, left,
})

const anim = (name: string, duration: string, delay: string, extra = '') =>
  ({ animation: `${name} ${duration} ease-out ${delay} both ${extra}`.trim() })

export default function WelcomeScreen({ onNext }: Props) {
  const [closeState, setCloseState] = useState<'idle' | 'closing' | 'failed'>('idle')

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (closeState !== 'idle') return
    setCloseState('closing')

    // Intento 1: window.close() (funciona si Chrome no está en kiosk)
    window.close()

    // Intento 2: CDP server (funciona en totem con cdp-server.mjs corriendo)
    fetch('http://localhost:3001/api/close-kiosk', { method: 'POST' })
      .catch(() => {})

    // Si después de 1.5 s todavía estamos aquí, mostrar ayuda
    setTimeout(() => {
      setCloseState('failed')
      setTimeout(() => setCloseState('idle'), 3000)
    }, 1500)
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>

      {/* ── Fondo — carga primero ── */}
      <div style={{ ...abs('-0.31%', '-29.54%', '-8.49%', '-98.52%'), overflow: 'hidden', pointerEvents: 'none', animation: 'fadeIn 0.3s ease-out 0s both' }}>
        <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgBgTexture} />
      </div>
      <div style={{ ...abs('-21.88%', '61.02%', '-5.47%', '-141.11%'), overflow: 'hidden', pointerEvents: 'none', animation: 'fadeIn 0.3s ease-out 0s both' }}>
        <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgBgDeco} />
      </div>
      <div style={{ ...abs('81.61%', '-25.56%', '-28.96%', '-2.41%'), overflow: 'hidden', pointerEvents: 'none', animation: 'fadeIn 0.3s ease-out 0s both' }}>
        <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgBottomRed} />
      </div>

      {/* Oracle logo — después del fondo */}
      <div style={{ ...abs('9.64%', '62.69%', '88.49%', '11.48%'), overflow: 'hidden', pointerEvents: 'none', ...anim('fadeIn', '0.45s', '0.32s') }}>
        <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgOracleLogo} />
      </div>

      {/* AVAL Tech Week — cae desde arriba */}
      <p style={{
        ...abs('12.44%', '24.54%', '81.15%', '11.3%'),
        ...anim('fadeInDown', '0.55s', '0.38s'),
        lineHeight: 0, textAlign: 'center', whiteSpace: 'nowrap', wordBreak: 'break-word', fontStyle: 'normal',
      }}>
        <span style={{ fontFamily: "'Oracle Sans', sans-serif", fontWeight: 300, lineHeight: 'normal', fontSize: '91.2px', color: '#444d4d' }}>AVAL</span>
        <span style={{ fontFamily: "'Oracle Sans', sans-serif", fontWeight: 400, lineHeight: 'normal', fontSize: '94px',   color: '#444d4d' }}>{' Tech Week'}</span>
      </p>

      {/* ¡Juega y gana! */}
      <p style={{
        ...abs('28.97%', '31.06%', '65.25%', '10.88%'),
        ...anim('fadeInDown', '0.65s', '0.5s'),
        fontFamily: "'Oracle Sans', sans-serif", fontWeight: 800, fontSize: '85.35px',
        lineHeight: 'normal', color: '#444d4d', textAlign: 'center',
        whiteSpace: 'nowrap', wordBreak: 'break-word', fontStyle: 'normal',
      }}>
        ¡Juega y gana!
      </p>

      {/* Pon a prueba tu */}
      <p style={{
        ...abs('35.84%', '48.3%', '60.1%', '11.97%'),
        ...anim('fadeInLeft', '0.55s', '0.65s'),
        fontFamily: "'Oracle Sans', sans-serif", fontWeight: 400, fontSize: '59.85px',
        lineHeight: 'normal', color: '#444d4d', whiteSpace: 'nowrap', wordBreak: 'break-word',
      }}>
        Pon a prueba tu
      </p>
      <p style={{
        ...abs('39.58%', '53.86%', '56.36%', '11.97%'),
        ...anim('fadeInLeft', '0.55s', '0.75s'),
        fontFamily: "'Oracle Sans', sans-serif", fontWeight: 400, fontSize: '59.85px',
        lineHeight: 'normal', color: '#444d4d', whiteSpace: 'nowrap', wordBreak: 'break-word',
      }}>
        conocimiento
      </p>

      {/* ¡Premios increíbles */}
      <p style={{
        ...abs('48.81%', '25.34%', '45.77%', '12.25%'),
        ...anim('fadeInLeft', '0.55s', '0.85s'),
        fontFamily: "'Oracle Sans', sans-serif", fontWeight: 400, fontSize: '79.35px',
        lineHeight: 'normal', color: '#444d4d', whiteSpace: 'nowrap', wordBreak: 'break-word',
      }}>
        ¡Premios increíbles
      </p>
      <p style={{
        ...abs('53.77%', '50.9%', '40.81%', '12.25%'),
        ...anim('fadeInLeft', '0.55s', '0.95s'),
        fontFamily: "'Oracle Sans', sans-serif", fontWeight: 400, fontSize: '79.35px',
        lineHeight: 'normal', color: '#444d4d', whiteSpace: 'nowrap', wordBreak: 'break-word',
      }}>
        te esperan!
      </p>

      {/* Botón Start */}
      <div
        onClick={onNext}
        style={{
          ...abs('67.67%', '48.34%', '25.99%', '12.13%'),
          cursor: 'pointer',
          animation: 'fadeInUp 0.65s ease-out 1.05s both, breathe 2.6s ease-in-out 1.8s infinite',
          transformOrigin: 'center',
        }}
      >
        <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none', display: 'block' }} src={imgStartBtn} />
        <span style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: '73px',
          color: '#fff', letterSpacing: '1px',
        }}>
          Start
        </span>
      </div>

      {/* Botón cerrar — operador, esquina inferior derecha */}
      <button
        onClick={handleClose}
        title="Cerrar aplicación"
        style={{
          position: 'absolute', bottom: '36px', right: '36px',
          width: closeState === 'failed' ? '340px' : '80px',
          height: '80px',
          background: closeState === 'failed' ? 'rgba(192,57,43,0.85)' : 'rgba(0,0,0,0.28)',
          border: '2px solid rgba(255,255,255,0.35)',
          borderRadius: '16px',
          cursor: closeState === 'idle' ? 'pointer' : 'default',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
          zIndex: 50,
          animation: 'fadeIn 0.4s ease-out 1.3s both',
          backdropFilter: 'blur(6px)',
          transition: 'background 0.2s, width 0.3s',
          overflow: 'hidden', whiteSpace: 'nowrap',
          padding: '0 20px',
        }}
      >
        {closeState === 'failed' ? (
          <span style={{ color: '#fff', fontSize: '28px', fontFamily: "'Segoe UI',sans-serif", fontWeight: 600 }}>
            Usa Alt+F4 para cerrar
          </span>
        ) : (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round"
            style={{ opacity: closeState === 'closing' ? 0.4 : 1, transition: 'opacity 0.2s' }}>
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        )}
      </button>

    </div>
  )
}
