import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { resolve } from 'node:path'
import netlify from '@netlify/vite-plugin-tanstack-start'

export default defineConfig({
  base: './',
  plugins: [
    netlify(),
    TanStackRouterVite({ autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    hmr: { clientPort: 8888 },
  },
})