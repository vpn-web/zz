// frontend/vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // 指定入口 HTML 所在目录
  root: 'public',
  // 生产环境构建配置
  build: {
    // 将构建输出到 frontend/dist
    outDir: '../dist',
    // 每次构建前清空输出目录
    emptyOutDir: true
  },
  plugins: [
    vue()
  ]
})
