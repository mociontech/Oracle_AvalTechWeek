import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { oracleProxyPlugin } from './oracle-proxy-plugin'

export default defineConfig({
  plugins: [
    react(),
    oracleProxyPlugin(), // intercepts /ords/* → Oracle, strips X-Frame-Options, injects ranking detector
  ],
})
