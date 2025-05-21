
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  root: 'public',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  plugins: [
    vue()
  ]
})
