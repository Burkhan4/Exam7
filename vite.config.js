import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  server: {
    proxy: {
      '/api': {                          // ← frontenddan /api/... chaqiramiz
        target: 'https://e-commerce-api-v4.nt.azimumarov.uz',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ''),   // /api ni olib tashlaydi
      },
    },
  },
})