import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 5174 },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cspGuide: resolve(__dirname, 'guides/content-security-policy/index.html'),
      },
    },
  },
})
