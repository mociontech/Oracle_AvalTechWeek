import { useEffect, useState } from 'react'
import { ALL_IMAGES } from '../imageManifest'

interface Props { onDone: () => void }

export default function Preloader({ onDone }: Props) {
  const [progress, setProgress]   = useState(0)
  const [label, setLabel]         = useState('Iniciando...')
  const [leaving, setLeaving]     = useState(false)

  useEffect(() => {
    let loaded = 0
    const total = ALL_IMAGES.length

    const tick = () => {
      loaded++
      const pct = loaded / total
      setProgress(pct)
      if (pct < 0.4)       setLabel('Cargando recursos...')
      else if (pct < 0.75) setLabel('Preparando pantallas...')
      else if (pct < 1)    setLabel('Casi listo...')
      else                 setLabel('¡Listo!')
    }

    // img.decode() espera a que la imagen esté completamente descargada Y decodificada
    // a píxeles en memoria. Así cuando aparece en pantalla pinta de golpe, sin efecto
    // de "carga de arriba hacia abajo".
    const promises = ALL_IMAGES.map(src =>
      new Promise<void>(resolve => {
        const img = new Image()
        img.src = src
        img.decode()
          .then(() => { tick(); resolve() })
          .catch(() => { tick(); resolve() })  // URL rota: igual avanza
      })
    )

    Promise.all(promises).then(() => {
      // Breve pausa en 100% para que se vea el estado final
      setTimeout(() => {
        setLeaving(true)
        // Espera que termine el fade-out antes de mostrar la app
        setTimeout(onDone, 650)
      }, 420)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pct = Math.round(progress * 100)

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9990,
      background: 'radial-gradient(ellipse at 50% 65%, #1c0606 0%, #0a0a0a 65%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '0',
      opacity: leaving ? 0 : 1,
      transition: leaving ? 'opacity 0.65s ease-out' : undefined,
    }}>

      {/* Logo text */}
      <p style={{
        fontFamily: "'Oracle Sans', 'Segoe UI', sans-serif",
        fontSize: 'clamp(28px, 5vw, 72px)',
        fontWeight: 300, color: 'rgba(255,255,255,0.5)',
        letterSpacing: '0.18em', textTransform: 'uppercase',
        marginBottom: '4px',
        animation: 'fadeIn 0.6s ease-out both',
      }}>
        AVAL
      </p>
      <p style={{
        fontFamily: "'Oracle Sans', 'Segoe UI', sans-serif",
        fontSize: 'clamp(32px, 6vw, 88px)',
        fontWeight: 700, color: '#fff',
        letterSpacing: '0.08em', textTransform: 'uppercase',
        marginBottom: 'clamp(40px, 6vh, 80px)',
        animation: 'fadeInDown 0.6s ease-out 0.1s both',
      }}>
        Tech Week
      </p>

      {/* Barra de progreso */}
      <div style={{
        width: 'clamp(220px, 38vw, 480px)',
        height: '4px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '2px',
        overflow: 'hidden',
        marginBottom: 'clamp(14px, 2vh, 22px)',
        animation: 'fadeIn 0.5s ease-out 0.3s both',
      }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: 'linear-gradient(90deg, #8b1a1a, #C0392B, #e84040)',
          borderRadius: '2px',
          transition: 'width 0.28s ease-out',
          boxShadow: '0 0 8px rgba(192,57,43,0.7)',
        }} />
      </div>

      {/* Texto de estado */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 'clamp(10px, 1.5vw, 20px)',
        animation: 'fadeIn 0.5s ease-out 0.4s both',
      }}>
        <span style={{
          fontFamily: "'Segoe UI', sans-serif",
          fontSize: 'clamp(13px, 1.8vw, 22px)',
          color: 'rgba(255,255,255,0.45)',
          letterSpacing: '0.05em',
          minWidth: '13ch',
        }}>
          {label}
        </span>
        <span style={{
          fontFamily: "'Oracle Sans', 'Segoe UI', sans-serif",
          fontSize: 'clamp(13px, 1.8vw, 22px)',
          fontWeight: 700,
          color: '#C0392B',
          minWidth: '4ch',
          textAlign: 'right',
        }}>
          {pct}%
        </span>
      </div>

      {/* Indicador animado de carga (tres puntos) */}
      {pct < 100 && (
        <div style={{
          display: 'flex', gap: '8px',
          marginTop: 'clamp(20px, 3vh, 36px)',
          animation: 'fadeIn 0.5s ease-out 0.5s both',
        }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: 'clamp(6px, 1vw, 10px)',
              height: 'clamp(6px, 1vw, 10px)',
              borderRadius: '50%',
              background: '#C0392B',
              opacity: 0.7,
              animation: `breathe 1.2s ease-in-out ${i * 0.2}s infinite`,
            }} />
          ))}
        </div>
      )}
    </div>
  )
}
