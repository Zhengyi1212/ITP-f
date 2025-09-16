import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 设置路径别名，方便引入
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    // 配置开发服务器
    port: 5173,
    // 配置代理，用于解决开发环境下的跨域问题
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 后端服务的地址
        changeOrigin: true, // 需要虚拟主机站点
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
