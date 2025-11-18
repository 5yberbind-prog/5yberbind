import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Agar GitHub Pages pe deploy kar rahe ho, to `base` ko repo name pe set karo, e.g. "/5yberbind/"
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 }
})