import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/5yberbind/",  // IMPORTANT
  plugins: [react()],
  server: { port: 5173 }
})