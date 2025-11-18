import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// IMPORTANT: CHANGE THIS TO YOUR REPO NAME
export default defineConfig({
  base: "/5yberbind/", 
  plugins: [react()],
})