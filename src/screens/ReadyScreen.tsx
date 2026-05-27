import { useState } from 'react'
import { playClick, playWhoosh } from '../utils/sounds'

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
  const [backActive, setBackActive] = useState(false)

  const handleStart = () => { playWhoosh(); onNext() }

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
      <div style={{ ...abs('15.89%', '50.50%', '81.49%', '13.33%'), overflow: 'hidden', pointerEvents: 'none', animation: 'fadeIn 0.45s ease-out 0.32s both' }}>
        <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none', filter: 'brightness(0) saturate(100%) invert(22%) sepia(90%) saturate(3500%) hue-rotate(346deg) brightness(80%)' }} src={imgOracleLogo} />
      </div>

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
        onClick={handleStart}
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
          fontFamily: "'Oracle Sans', sans-serif", fontWeight: 800, fontSize: '63.79px',
          fontStyle: 'normal', lineHeight: 'normal', textAlign: 'center', color: '#fff',
        }}>
          Iniciar reto
        </span>
      </div>

      {/* Botón Volver — pill animado estilo Uiverse en rojo */}
      <div style={{
        position: 'absolute', bottom: '60px', left: '52px',
        width: '380px', height: '108px',
        animation: 'fadeIn 0.4s ease-out 1.2s both',
      }}>
        <div
          onPointerDown={() => setBackActive(true)}
          onPointerUp={() => { setBackActive(false); playClick(); onBack() }}
          onPointerCancel={() => setBackActive(false)}
          onPointerLeave={() => setBackActive(false)}
          style={{
            position: 'relative', width: '100%', height: '100%',
            background: '#fff', borderRadius: '22px',
            cursor: 'pointer', overflow: 'hidden',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.13)',
          }}
        >
          {/* Pill roja animada */}
          <div style={{
            position: 'absolute',
            left: '6px', top: '6px', bottom: '6px',
            width: backActive ? 'calc(100% - 12px)' : '96px',
            background: '#C0392B',
            borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'width 0.4s ease',
            zIndex: 10,
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="44px" width="44px">
              <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" fill="#ffffff" />
              <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" fill="#ffffff" />
            </svg>
          </div>
          {/* Texto */}
          <span style={{
            position: 'relative', zIndex: 5,
            fontFamily: "'Oracle Sans','Segoe UI',sans-serif",
            fontWeight: 700, fontSize: '48px', color: '#333',
            paddingLeft: '56px', userSelect: 'none',
          }}>
            Volver
          </span>
        </div>
      </div>

    </div>
  )
}
