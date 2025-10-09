import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This is the important part
    watch: {
      usePolling: true,
    },
    host: true, // Listen on all addresses, good for Docker
    strictPort: true, // Optional: makes sure vite always uses the port you want
  }
})
