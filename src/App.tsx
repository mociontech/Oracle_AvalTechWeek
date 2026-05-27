import { useEffect, useRef, useState } from 'react'
import { unlockAudio } from './utils/sounds'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import WelcomeScreen   from './screens/WelcomeScreen'
import GuideScreen     from './screens/GuideScreen'
import ReadyScreen     from './screens/ReadyScreen'
import QuestionScreen  from './screens/QuestionScreen'
import BrandingScreen  from './screens/BrandingScreen'
import OracleScreen    from './screens/OracleScreen'
import ParticleBackground from './components/ParticleBackground'
import Preloader       from './components/Preloader'

function TotemScaler({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function scale() {
      const el = containerRef.current
      if (!el) return
      const s = Math.min(window.innerWidth / 1080, window.innerHeight / 1920)
      const offsetX = (window.innerWidth  - 1080 * s) / 2
      const offsetY = (window.innerHeight - 1920 * s) / 2
      el.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${s})`
    }
    scale()
    window.addEventListener('resize', scale)
    return () => window.removeEventListener('resize', scale)
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: '#111' }}>
      <div
        ref={containerRef}
        style={{
          position: 'absolute', top: 0, left: 0,
          width: '1080px', height: '1920px',
          transformOrigin: '0 0', overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  )
}

function AppRoutes() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <TotemScaler>
      <div key={location.key} className="page-enter" style={{ position: 'absolute', inset: 0 }}>
        <Routes location={location}>
          <Route path="/"         element={<WelcomeScreen  onNext={()    => navigate('/guide')} />} />
          <Route path="/guide"    element={<GuideScreen    onNext={()    => navigate('/ready')}    />} />
          <Route path="/ready"    element={<ReadyScreen    onNext={()    => navigate('/oracle')} onBack={() => navigate('/')} />} />
          <Route path="/oracle"   element={<OracleScreen   onFinish={()  => navigate('/question')} />} />
          <Route path="/question" element={<QuestionScreen onNext={()    => navigate('/branding')} />} />
          <Route path="/branding" element={<BrandingScreen onNext={()    => navigate('/')}         />} />
        </Routes>
      </div>
    </TotemScaler>
  )
}

function useAutoFullscreen() {
  useEffect(() => {
    let audioUnlocked = false
    const request = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen?.().catch(() => {})
      }
      if (!audioUnlocked) { audioUnlocked = true; unlockAudio() }
    }
    window.addEventListener('pointerdown', request)
    return () => window.removeEventListener('pointerdown', request)
  }, [])
}

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false)
  useAutoFullscreen()

  return (
    <>
      {/* Partículas flotantes — siempre visibles, encima de todo */}
      <ParticleBackground />

      {/* App renderizada en segundo plano; el preloader la tapa hasta que esté lista */}
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>

      {/* Preloader — se muestra encima hasta que todas las imágenes estén cacheadas */}
      {!preloaderDone && <Preloader onDone={() => setPreloaderDone(true)} />}
    </>
  )
}
