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
        linkChecker: resolve(__dirname, 'check-link/index.html'),
        cspBuilder: resolve(__dirname, 'tools/csp-builder/index.html'),
        cspGuide: resolve(__dirname, 'guides/content-security-policy/index.html'),
      },
    },
  },
})
