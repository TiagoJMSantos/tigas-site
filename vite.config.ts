import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  base: process.env.VITE_BASE_PATH || (process.env.NODE_ENV === 'production' ? '/tigas-site/' : '/'),
  plugins: [react()],
})
