// frontend/vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') }
  },
  publicDir: 'public',    // 其余静态文件仍放 public/
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
