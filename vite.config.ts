import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/IT-dashboard/',
  plugins: [react()],
})