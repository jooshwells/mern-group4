import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "http://backend:8080",
        changeOrigin: true,
        secure: false,
      },
    },
    // This is the important part
    watch: {
      usePolling: true,
    },
    host: true, // Listen on all addresses, good for Docker
    strictPort: true, // Optional: makes sure vite always uses the port you want
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
