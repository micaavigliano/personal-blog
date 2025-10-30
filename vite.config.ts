import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
// import netlify from '@netlify/vite-plugin-tanstack-start'

// const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
  base: './',
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: { '@': new URL('./src', import.meta.url).pathname },
  },
  server: {
    port: 5173,
    strictPort: true,     // do not hop to 5174
    hmr: { clientPort: 8888 }, // netlify dev proxy port
  },
})
