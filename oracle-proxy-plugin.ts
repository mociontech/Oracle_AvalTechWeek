import type { Plugin } from 'vite'
import * as http from 'node:http'

const CDP_BASE = 'http://127.0.0.1:9222'

// Shared state between CDP polling and HTTP endpoints
let rankingDetected = false
let cdpAvailable    = false

// ── CDP: poll Chrome tab list every second ────────────────────────────────────
async function pollChrome(): Promise<void> {
  try {
    const res = await fetch(`${CDP_BASE}/json`, { signal: AbortSignal.timeout(800) })
    if (!res.ok) return

    const tabs = await res.json() as Array<{ id: string; url: string; type: string; title: string }>
    cdpAvailable = true

    for (const tab of tabs) {
      if (tab.type === 'page' && tab.url?.includes('ranking')) {
        // Close the Oracle ranking tab
        await fetch(`${CDP_BASE}/json/close/${tab.id}`, { signal: AbortSignal.timeout(800) })
        rankingDetected = true
        console.log(`\n[oracle-cdp] ✓ Ranking detectado → pestaña cerrada → countdown iniciado\n`)
        break
      }
    }
  } catch {
    cdpAvailable = false
  }
}

// ── Vite plugin ───────────────────────────────────────────────────────────────
export function oracleProxyPlugin(): Plugin {
  return {
    name: 'vite-oracle-cdp',
    configureServer(server) {

      // ── REST endpoints consumed by React ────────────────────────────────
      server.middlewares.use(async (req: http.IncomingMessage, res: http.ServerResponse, next: () => void) => {

        // GET /api/oracle-ranking
        // React polls this every second. Returns {detected: true} once when
        // CDP has found the ranking page, then resets for the next player.
        if (req.url === '/api/oracle-ranking' && req.method === 'GET') {
          const detected = rankingDetected
          if (detected) rankingDetected = false   // consume the event
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.end(JSON.stringify({ detected }))
          return
        }

        // GET /api/cdp-status  — diagnostic endpoint
        if (req.url === '/api/cdp-status' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.end(JSON.stringify({ cdpAvailable }))
          return
        }

        // GET /api/cdp-tabs  — returns current Chrome tab list (for debugging)
        if (req.url === '/api/cdp-tabs' && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Access-Control-Allow-Origin', '*')
          try {
            const r = await fetch(`${CDP_BASE}/json`, { signal: AbortSignal.timeout(800) })
            const tabs = await r.json()
            res.end(JSON.stringify({ cdpAvailable: true, tabs }))
          } catch (e) {
            res.end(JSON.stringify({ cdpAvailable: false, error: String(e), hint: 'Run: npm run chrome-restart' }))
          }
          return
        }

        // POST /api/trigger-ranking  — manually set the detection flag (for testing)
        if (req.url === '/api/trigger-ranking' && req.method === 'POST') {
          rankingDetected = true
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.end(JSON.stringify({ ok: true }))
          return
        }

        next()
      })

      // ── Start CDP polling once server is listening ───────────────────────
      server.httpServer?.once('listening', () => {
        console.log('[oracle-cdp] Monitoring Chrome tabs for "ranking" URL...')
        console.log('[oracle-cdp] Tip: launch Chrome with npm run chrome-window for auto-detection')
        const poll = setInterval(pollChrome, 1000)
        server.httpServer?.once('close', () => clearInterval(poll))
      })
    },
  }
}
