import { useState, useEffect } from 'react'

const imgBgTexture  = '/images/welcome-bg-texture.png'
const imgBgDeco     = '/images/welcome-bg-deco.png'
const imgBottomRed  = '/images/welcome-bottom-red.png'
const imgOracleLogo = '/images/welcome-oracle-logo.png'
const imgStartBtn   = '/images/welcome-start-btn.svg'

interface Props { onNext: () => void; onToggleFullscreen: () => void }

const abs = (top: string, right: string, bottom: string, left: string) => ({
  position: 'absolute' as const,
  top, right, bottom, left,
})

const anim = (name: string, duration: string, delay: string, extra = '') =>
  ({ animation: `${name} ${duration} ease-out ${delay} both ${extra}`.trim() })

export default function WelcomeScreen({ onNext, onToggleFullscreen }: Props) {
  const [isFs, setIsFs] = useState(!!document.fullscreenElement)

  useEffect(() => {
    const onChange = () => setIsFs(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleFullscreen()
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

      {/* ¡Juega y gana! — titular principal, cae fuerte */}
      <p style={{
        ...abs('28.97%', '31.06%', '65.25%', '10.88%'),
        ...anim('fadeInDown', '0.65s', '0.5s'),
        fontFamily: "'Oracle Sans', sans-serif", fontWeight: 800, fontSize: '85.35px',
        lineHeight: 'normal', color: '#444d4d', textAlign: 'center',
        whiteSpace: 'nowrap', wordBreak: 'break-word', fontStyle: 'normal',
      }}>
        ¡Juega y gana!
      </p>

      {/* Pon a prueba tu — entra desde la izquierda */}
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

      {/* ¡Premios increíbles — entra desde la izquierda, más tardado */}
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

      {/* Botón Start — sube desde abajo + respira */}
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

      {/* Botón fullscreen — esquina inferior derecha */}
      <button
        onClick={handleToggle}
        title={isFs ? 'Salir de pantalla completa' : 'Pantalla completa'}
        style={{
          position: 'absolute', bottom: '36px', right: '36px',
          width: '80px', height: '80px',
          background: 'rgba(0,0,0,0.28)',
          border: '2px solid rgba(255,255,255,0.35)',
          borderRadius: '16px',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 50,
          animation: 'fadeIn 0.4s ease-out 1.3s both',
          backdropFilter: 'blur(6px)',
          transition: 'background 0.2s, border-color 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(192,57,43,0.55)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.28)')}
      >
        {isFs ? (
          /* ícono comprimir */
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 14 10 14 10 20"/>
            <polyline points="20 10 14 10 14 4"/>
            <line x1="10" y1="14" x2="3" y2="21"/>
            <line x1="21" y1="3" x2="14" y2="10"/>
          </svg>
        ) : (
          /* ícono expandir */
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 3 21 3 21 9"/>
            <polyline points="9 21 3 21 3 15"/>
            <line x1="21" y1="3" x2="14" y2="10"/>
            <line x1="3" y1="21" x2="10" y2="14"/>
          </svg>
        )}
      </button>

    </div>
  )
}
