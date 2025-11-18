import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  base: "/5yberbind/", // YOUR REPO NAME
  plugins: [react()],
})