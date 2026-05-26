import * as http from 'node:http'
import * as fs   from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST      = path.join(__dirname, 'dist')
const CDP_BASE  = 'http://127.0.0.1:9222'
const PORT      = 5173

let rankingDetected = false
let cdpAvailable    = false

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.ico':  'image/x-icon',
  '.json': 'application/json',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
}

async function pollChrome() {
  try {
    const res  = await fetch(`${CDP_BASE}/json`, { signal: AbortSignal.timeout(800) })
    if (!res.ok) return
    const tabs = await res.json()
    cdpAvailable = true
    for (const tab of tabs) {
      if (tab.type === 'page' && tab.url?.includes('ranking')) {
        await fetch(`${CDP_BASE}/json/close/${tab.id}`, { signal: AbortSignal.timeout(800) })
        rankingDetected = true
        console.log('[oracle-cdp] ✓ Ranking detectado → countdown iniciado')
        break
      }
    }
  } catch {
    cdpAvailable = false
  }
}

const server = http.createServer(async (req, res) => {
  const url = req.url ?? '/'

  res.setHeader('Access-Control-Allow-Origin', '*')

  if (url === '/api/oracle-ranking' && req.method === 'GET') {
    const detected = rankingDetected
    if (detected) rankingDetected = false
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ detected }))
    return
  }

  if (url === '/api/cdp-status' && req.method === 'GET') {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ cdpAvailable }))
    return
  }

  if (url === '/api/cdp-tabs' && req.method === 'GET') {
    try {
      const r    = await fetch(`${CDP_BASE}/json`, { signal: AbortSignal.timeout(800) })
      const tabs = await r.json()
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ cdpAvailable: true, tabs }))
    } catch (e) {
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ cdpAvailable: false, error: String(e), hint: 'Run: npm run chrome-restart' }))
    }
    return
  }

  if (url === '/api/trigger-ranking' && req.method === 'POST') {
    rankingDetected = true
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ ok: true }))
    return
  }

  // Static files — SPA fallback to index.html
  let filePath = path.join(DIST, url === '/' ? 'index.html' : url)
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST, 'index.html')
  }

  const ext         = path.extname(filePath)
  const contentType = MIME[ext] ?? 'application/octet-stream'

  try {
    const content = fs.readFileSync(filePath)
    res.setHeader('Content-Type', contentType)
    res.end(content)
  } catch {
    res.writeHead(404)
    res.end('Not found')
  }
})

server.listen(PORT, () => {
  console.log(`[totem] Servidor en http://localhost:${PORT}`)
  console.log('[oracle-cdp] Monitoreando pestañas de Chrome...')
  setInterval(pollChrome, 1000)
})
