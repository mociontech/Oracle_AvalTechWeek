import { useEffect, useRef } from 'react'

const COUNT = 72

interface Particle {
  x: number; y: number
  vx: number; vy: number
  size: number
  baseOpacity: number
  phase: number
  phaseSpeed: number
  isRed: boolean
}

function spawn(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.45,
    vy: -(Math.random() * 0.55 + 0.12),
    size: Math.random() * 2.8 + 0.6,
    baseOpacity: Math.random() * 0.42 + 0.08,
    phase: Math.random() * Math.PI * 2,
    phaseSpeed: Math.random() * 0.022 + 0.007,
    isRed: Math.random() > 0.83,
  }
}

export default function ParticleBackground() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = window.innerWidth
    let h = window.innerHeight
    canvas.width = w
    canvas.height = h

    const particles = Array.from({ length: COUNT }, () => spawn(w, h))

    // Capture non-null references for use inside the closure
    const c = canvas
    const x = ctx

    function onResize() {
      w = window.innerWidth
      h = window.innerHeight
      c.width = w
      c.height = h
    }
    window.addEventListener('resize', onResize)

    let raf: number

    function frame() {
      x.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.phase += p.phaseSpeed
        const alpha = p.baseOpacity * (0.55 + 0.45 * Math.sin(p.phase))
        const r = p.isRed ? 192 : 255
        const g = p.isRed ? 57  : 255
        const b = p.isRed ? 43  : 255

        // Core dot
        x.beginPath()
        x.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        x.fillStyle = `rgba(${r},${g},${b},${alpha})`
        x.fill()

        // Soft halo on bigger particles
        if (p.size > 1.6) {
          const grd = x.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.5)
          grd.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.28})`)
          grd.addColorStop(1, `rgba(${r},${g},${b},0)`)
          x.beginPath()
          x.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2)
          x.fillStyle = grd
          x.fill()
        }

        p.x += p.vx
        p.y += p.vy

        // Wrap: respawn from bottom when off top
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; p.vx = (Math.random() - 0.5) * 0.45 }
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
      }

      raf = requestAnimationFrame(frame)
    }

    frame()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9995 }}
    />
  )
}
