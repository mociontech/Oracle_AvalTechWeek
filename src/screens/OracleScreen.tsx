import { useEffect, useRef, useState, useCallback } from 'react'

const CDP_API    = 'http://localhost:3001'
const ORACLE_URL = 'https://g1cde62092a80c9-bankdb.adb.sa-bogota-1.oraclecloudapps.com/ords/r/quiz/quiz/registro'

const imgBgTexture  = '/images/oracle-bg-texture.png'
const imgBgDecoTop  = '/images/oracle-bg-deco-top.png'
const imgLogoBanner = '/images/oracle-logo-banner.png'
const imgCarSwoosh  = '/images/oracle-car-swoosh.png'
const imgCar        = '/images/oracle-car.png'

interface Props { onFinish: () => void }

const abs = (t: string, r: string, b: string, l: string) => ({
  position: 'absolute' as const, top: t, right: r, bottom: b, left: l,
})

export default function OracleScreen({ onFinish }: Props) {
  const oracleWinRef = useRef<Window | null>(null)
  const pollRef      = useRef<ReturnType<typeof setInterval> | null>(null)
  const cdpPollRef   = useRef<ReturnType<typeof setInterval> | null>(null)
  const doneRef      = useRef(false)

  const [finishing, setFinishing] = useState(false)
  const [cdpActive, setCdpActive] = useState(false)

  // Press 'T' to simulate ranking detection (testing)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 't' || e.key === 'T') {
        fetch(`${CDP_API}/api/trigger-ranking`, { method: 'POST' }).catch(() => {})
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const finish = useCallback(() => {
    if (doneRef.current) return
    doneRef.current = true

    clearInterval(pollRef.current!)
    clearInterval(cdpPollRef.current!)
    try { oracleWinRef.current?.close() } catch { /* ignore */ }

    setFinishing(true)
    setTimeout(() => onFinish(), 1600)
  }, [onFinish])

  useEffect(() => {
    const sw = window.screen.availWidth
    const sh = window.screen.availHeight
    oracleWinRef.current = window.open(
      ORACLE_URL, 'oracle-quiz',
      `width=${sw},height=${sh},top=0,left=0`,
    )

    pollRef.current = setInterval(() => {
      const win = oracleWinRef.current
      if (win && win.closed) finish()
    }, 1000)

    cdpPollRef.current = setInterval(async () => {
      try {
        const res  = await fetch(`${CDP_API}/api/oracle-ranking`)
        const data = await res.json() as { detected: boolean }
        if (data.detected) finish()
      } catch { /* servidor no listo */ }
    }, 1000)

    fetch(`${CDP_API}/api/cdp-status`)
      .then(r => r.json())
      .then((d: { cdpAvailable: boolean }) => setCdpActive(d.cdpAvailable))
      .catch(() => {})

    return () => {
      clearInterval(pollRef.current!)
      clearInterval(cdpPollRef.current!)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>

      {/* Oracle Red Bull Racing background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ ...abs('-0.31%', '-29.54%', '-8.49%', '-98.52%'), overflow: 'hidden' }}>
          <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgBgTexture} />
        </div>
        <div style={{ ...abs('-75.68%', '-121.39%', '48.39%', '41.39%'), overflow: 'hidden' }}>
          <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgBgDecoTop} />
        </div>
        <div style={{ ...abs('24.32%', '11.94%', '66.61%', '11.94%'), overflow: 'hidden', animation: 'fadeIn 0.6s ease-out 0.1s both' }}>
          <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgLogoBanner} />
        </div>
        <div style={{ ...abs('48.49%', '-9.07%', '14.27%', '-7.96%'), overflow: 'hidden', animation: 'fadeInRight 0.7s ease-out 0.2s both' }}>
          <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgCarSwoosh} />
        </div>
        <div style={{ ...abs('49.22%', '6.3%', '23.91%', '-3.06%'), overflow: 'hidden', animation: 'fadeInRight 0.8s ease-out 0.35s both' }}>
          <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgCar} />
        </div>
      </div>

      {/* Panel de espera */}
      {!finishing && (
        <div style={{
          position: 'absolute', top: '6%', left: 0, right: 0, zIndex: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '36px',
          animation: 'fadeInUp 0.6s ease-out 0.4s both',
        }}>
          <p style={{
            fontFamily: "'Oracle Sans','Segoe UI',sans-serif",
            fontSize: '70px', fontWeight: 800, color: '#222',
            textAlign: 'center', lineHeight: 1.15, padding: '0 60px',
          }}>
            ¡El reto está en curso!
          </p>

          <div style={{
            display: 'flex', flexDirection: 'column', gap: '20px',
            padding: '36px 56px', background: 'rgba(255,255,255,0.78)',
            borderRadius: '28px', width: '86%',
          }}>
            {[
              ['1', 'Completa el registro en la ventana que se abrió'],
              ['2', 'Responde las preguntas del quiz'],
              ['3', 'Cuando veas tu ranking, vuelve aquí y toca el botón'],
            ].map(([n, text]) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{
                  width: '60px', height: '60px', borderRadius: '50%',
                  background: '#C0392B', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ color: '#fff', fontSize: '34px', fontWeight: 900 }}>{n}</span>
                </div>
                <p style={{ fontFamily: "'Segoe UI',sans-serif", fontSize: '36px', fontWeight: 500, color: '#333', lineHeight: 1.3 }}>
                  {text}
                </p>
              </div>
            ))}
          </div>

          {/* Badge CDP */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '14px',
            background: cdpActive ? 'rgba(39,174,96,0.15)' : 'rgba(192,57,43,0.1)',
            borderRadius: '40px', padding: '14px 32px',
          }}>
            <div style={{
              width: '20px', height: '20px', borderRadius: '50%',
              background: cdpActive ? '#27ae60' : '#e67e22',
            }} />
            <span style={{ fontFamily: "'Segoe UI',sans-serif", fontSize: '28px', color: '#444' }}>
              {cdpActive
                ? 'Detección automática activa — el totem avanzará solo al terminar'
                : 'Modo manual — inicia cdp-server.mjs y recarga Chrome con --remote-debugging-port=9222'}
            </span>
          </div>

          {/* Botón manual — sube + respira */}
          <button
            onClick={finish}
            style={{
              background: '#C0392B', border: 'none', borderRadius: '20px',
              color: '#fff', fontSize: '50px', fontWeight: 800,
              padding: '34px 88px', cursor: 'pointer',
              fontFamily: "'Oracle Sans','Segoe UI',sans-serif",
              boxShadow: '0 8px 32px rgba(192,57,43,0.5)',
              animation: 'breathe 2.6s ease-in-out 1s infinite',
              transformOrigin: 'center',
            }}
          >
            ✓ Terminé el quiz
          </button>
        </div>
      )}

      {/* Flash de felicitaciones — sin countdown */}
      {finishing && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 20,
          background: 'rgba(10,10,30,0.93)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '48px',
          animation: 'fadeIn 0.35s ease-out both',
        }}>
          <p style={{
            fontFamily: "'Oracle Sans','Segoe UI',sans-serif",
            fontSize: '128px', fontWeight: 900, color: '#fff',
            textAlign: 'center', lineHeight: 1.1,
            animation: 'scaleIn 0.5s cubic-bezier(0.22,1,0.36,1) 0.1s both',
          }}>
            ¡Felicitaciones!
          </p>
          <p style={{
            fontFamily: "'Segoe UI',sans-serif", fontSize: '52px',
            fontWeight: 400, color: '#ccc', textAlign: 'center',
            animation: 'fadeInUp 0.5s ease-out 0.3s both',
          }}>
            Volviendo al inicio...
          </p>
        </div>
      )}
    </div>
  )
}
