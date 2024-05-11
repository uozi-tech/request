import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'core/index.ts'),
      name: 'Bundle',
      fileName: 'index',
    },
  },
  resolve: {
    alias: {
      '@fcurd/request': new URL('./core/', import.meta.url).pathname,
    },
    extensions: ['.mjs', '.js', '.ts'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4523/m2/3871056-3505026-default/171999476',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [dts()],
  test: {
    clearMocks: true,
    environment: 'jsdom',
    reporters: ['default'],
    coverage: {
      reporter: ['text', 'json-summary', 'json'],
    },
  },
})
