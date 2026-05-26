const imgBgTexture  = 'https://www.figma.com/api/mcp/asset/8bbc8284-7054-44e9-9bee-6acbe8c8dd80'
const imgBgDecoTop  = 'https://www.figma.com/api/mcp/asset/0734cd5b-4f59-4677-89d6-a6edb0a0d561'
const imgLogoBanner = 'https://www.figma.com/api/mcp/asset/0d9aebcd-b233-4d74-a62a-59f1e82322ab'

interface Props { onNext: () => void }

const abs = (top: string, right: string, bottom: string, left: string) => ({
  position: 'absolute' as const,
  top, right, bottom, left,
})

export default function BrandingScreen({ onNext }: Props) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>

      {/* Background — sin animación */}
      <div style={{ ...abs('-0.31%', '-29.54%', '-8.49%', '-98.52%'), overflow: 'hidden', pointerEvents: 'none' }}>
        <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgBgTexture} />
      </div>
      <div style={{ ...abs('-75.68%', '-121.39%', '48.39%', '41.39%'), overflow: 'hidden', pointerEvents: 'none' }}>
        <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgBgDecoTop} />
      </div>

      {/* Logo principal — escala desde el centro con respiro sutil */}
      <div style={{
        ...abs('45.57%', '11.94%', '45.36%', '11.94%'),
        overflow: 'hidden', pointerEvents: 'none',
        animation: 'scaleIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.25s both, breathe 3s ease-in-out 1.2s infinite',
        transformOrigin: 'center',
      }}>
        <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none' }} src={imgLogoBanner} />
      </div>

      {/* Tap para reiniciar */}
      <div onClick={onNext} style={{ position: 'absolute', inset: 0, cursor: 'pointer' }} />

    </div>
  )
}
