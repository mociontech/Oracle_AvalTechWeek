# AVAL Tech Week — Trivia Totem

Totem/kiosco interactivo desarrollado para **Oracle** con motivo del evento **AVAL Tech Week**. Permite a los participantes registrarse y completar un quiz Oracle APEX directamente desde un totem de pantalla táctil (1080 × 1920 px), con detección automática de finalización vía Chrome DevTools Protocol.

> Desarrollado por **RC Farias** para **Oracle Colombia**. El evento se llevará a cabo en el **Ágora Centro de Convenciones**.

El diseño visual fue entregado en Figma y traducido íntegramente a código — layouts, tipografías, animaciones y assets. El archivo de diseño es de acceso restringido al equipo del proyecto.

**Demo:** [oracle-avaltechweek.netlify.app](https://oracle-avaltechweek.netlify.app)

---

## Flujo de pantallas

```
Bienvenida → Guía → ¿Estás listo? → Quiz Oracle (ventana externa)
    → Pantalla F1 (5 s) → Branding → Bienvenida (loop)
```

---

## Stack

| Capa | Tecnología |
|---|---|
| Frontend | React 19 + TypeScript + Vite |
| Routing | React Router v6 |
| Estilos | CSS-in-JS (inline styles) + keyframes globales |
| Deploy | Netlify (estático) |
| Detección ranking | Chrome DevTools Protocol (CDP) — servidor local |

---

## Arquitectura

```
Netlify (cloud)                    Totem Windows (local)
────────────────────               ──────────────────────────────
React app (static)          ←───  Chrome → oracle-avaltechweek.netlify.app
/images/* (24 assets)              Chrome --remote-debugging-port=9222
                                   node cdp-server.mjs  (puerto 3001)
                                        ↕ localhost:9222
                                   Chrome CDP — detecta URL de ranking
```

El frontend consulta `http://localhost:3001/api/oracle-ranking` cada segundo. Cuando el CDP detecta que Chrome navega a la URL de ranking, el totem avanza automáticamente a la pantalla siguiente y cierra la ventana del quiz.

---

## Estructura del proyecto

```
trivia-totem/
├── public/
│   └── images/          # 24 assets descargados de Figma (servidos por Netlify)
├── src/
│   ├── screens/
│   │   ├── WelcomeScreen.tsx
│   │   ├── GuideScreen.tsx
│   │   ├── ReadyScreen.tsx
│   │   ├── OracleScreen.tsx     # Abre el quiz + polling CDP
│   │   ├── QuestionScreen.tsx   # Pantalla F1 — 5 s auto-avance
│   │   └── BrandingScreen.tsx
│   ├── components/
│   │   ├── ParticleBackground.tsx  # Canvas con partículas flotantes
│   │   └── Preloader.tsx           # img.decode() — precarga total antes de arrancar
│   ├── imageManifest.ts            # Lista de assets para el preloader
│   └── App.tsx                     # TotemScaler, router, fullscreen hook
├── cdp-server.mjs       # Servidor CDP local para el totem (sin dependencias npm)
├── start-totem.bat      # Script de arranque para Windows (doble clic)
└── netlify.toml         # Config de build y SPA fallback
```

---

## Deploy en Netlify

1. Sube el repositorio a GitHub
2. En Netlify: **Add new site → Import from GitHub**
3. Netlify detecta `netlify.toml` automáticamente:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy — obtienes tu URL `*.netlify.app`

---

## Configuración del totem (Windows)

### Requisitos
- **Node.js 18+** — [nodejs.org](https://nodejs.org) (instalador .msi, sin configuración adicional)
- **Google Chrome**

### Arranque

1. Copia `cdp-server.mjs` y `start-totem.bat` en una carpeta del totem
2. Edita `start-totem.bat` y confirma que la URL de Netlify es correcta
3. Doble clic en **`start-totem.bat`**

El script lanza automáticamente:
- `node cdp-server.mjs` (minimizado) — detecta el ranking en Chrome
- Chrome en modo kiosco apuntando al deploy de Netlify con `--remote-debugging-port=9222`

### API endpoints del CDP server

| Endpoint | Método | Descripción |
|---|---|---|
| `/api/oracle-ranking` | GET | `{ detected: true }` cuando Chrome llega al ranking |
| `/api/cdp-status` | GET | `{ cdpAvailable: true/false }` |
| `/api/trigger-ranking` | POST | Simula detección (testing — tecla `T` en el totem) |

---

## Desarrollo local

```bash
npm install
npm run dev          # Vite dev server en localhost:5173
node cdp-server.mjs  # CDP server en localhost:3001 (terminal aparte)
```

---

## Características

- **Preloader con `img.decode()`** — fuerza la decodificación completa de píxeles antes de mostrar la app; las imágenes pintan de golpe, sin efecto de carga progresiva
- **Assets locales** — las 24 imágenes viven en `public/images/` y se sirven desde la CDN de Netlify, sin dependencia de Figma en producción
- **Animaciones staggered** — cada elemento entra con delay escalonado; los fondos siempre cargan primero (delay `0s`)
- **TotemScaler** — escala el canvas de 1080 × 1920 px al viewport disponible mediante CSS `transform`, funciona en cualquier resolución
- **Partículas canvas** — 72 partículas flotantes con halos de brillo, siempre visibles incluso durante el preloader
- **Fullscreen automático** — se activa en el primer toque; botón manual en la pantalla de bienvenida
- **Detección automática + fallback manual** — si el CDP no está disponible, el operador puede avanzar manualmente con el botón "Terminé el quiz"
