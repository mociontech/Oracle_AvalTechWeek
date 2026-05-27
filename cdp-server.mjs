/**
 * CDP Server — corre en el totem (Windows), NO en Netlify.
 * Solo detecta cuando Chrome llega al ranking y expone el resultado
 * vía HTTP al frontend de Netlify (CORS abierto a localhost).
 *
 * Requiere: Node.js 18+ (sin dependencias npm)
 * Uso:      node cdp-server.mjs
 */

import http from 'node:http'
import { exec } from 'node:child_process'

const PORT          = 3001
const CDP_BASE      = 'http://127.0.0.1:9222'
const RANKING_RE    = /\/quiz\/ranking/i

let rankingDetected = false
let cdpAvailable    = false
let lastTabs        = []

// ── Polling CDP ──────────────────────────────────────────────────────────────
async function pollChrome() {
  try {
    const res  = await fetch(`${CDP_BASE}/json`)
    const tabs = await res.json()
    lastTabs     = tabs
    cdpAvailable = true
    if (tabs.some(t => RANKING_RE.test(t.url ?? ''))) {
      rankingDetected = true
    }
  } catch {
    cdpAvailable = false
  }
}

setInterval(pollChrome, 1000)
pollChrome()

// ── Servidor HTTP ─────────────────────────────────────────────────────────────
const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type':                 'application/json',
}

function send(res, status, body) {
  Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v))
  res.writeHead(status)
  res.end(JSON.stringify(body))
}

http.createServer((req, res) => {
  // Preflight
  if (req.method === 'OPTIONS') {
    Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v))
    res.writeHead(204); res.end(); return
  }

  if (req.method === 'GET' && req.url === '/api/oracle-ranking') {
    const detected  = rankingDetected
    rankingDetected = false          // consumir — solo dispara una vez
    send(res, 200, { detected }); return
  }

  if (req.method === 'GET' && req.url === '/api/cdp-status') {
    send(res, 200, { cdpAvailable }); return
  }

  if (req.method === 'GET' && req.url === '/api/cdp-tabs') {
    send(res, 200, { tabs: lastTabs }); return
  }

  if (req.method === 'POST' && req.url === '/api/trigger-ranking') {
    rankingDetected = true
    send(res, 200, { ok: true }); return
  }

  if (req.method === 'POST' && req.url === '/api/close-kiosk') {
    send(res, 200, { ok: true })
    exec('taskkill /F /IM chrome.exe', () => {})
    return
  }

  send(res, 404, { error: 'Not found' })

}).listen(PORT, '127.0.0.1', () => {
  console.log(`\n  ✓  CDP server  →  http://127.0.0.1:${PORT}`)
  console.log(`     Polling Chrome en  ${CDP_BASE}/json`)
  console.log(`     Patron ranking:    ${RANKING_RE}\n`)
})
