const BASE = '/EfectosDeSonido'

const clickAudio  = new Audio(`${BASE}/Click.mp3`);      clickAudio.volume  = 0.25; clickAudio.load()
const whooshAudio = new Audio(`${BASE}/Whoosh.mp3`);     whooshAudio.volume = 0.25; whooshAudio.load()
const f1Audio     = new Audio(`${BASE}/F1Pasando.mp3`);  f1Audio.volume     = 0.25; f1Audio.load()

export function unlockAudio() {
  [clickAudio, whooshAudio, f1Audio].forEach(a => {
    a.volume = 0
    a.play().then(() => { a.pause(); a.volume = 0.25 }).catch(() => {})
  })
}

export function playClick()  { clickAudio.currentTime  = 0.25; clickAudio.play().catch(() => {}) }
export function playWhoosh() { whooshAudio.currentTime = 0.22; whooshAudio.play().catch(() => {}) }

export function playF1() {
  f1Audio.currentTime = 0
  f1Audio.volume = 0.25
  f1Audio.play().catch(() => {})
}
