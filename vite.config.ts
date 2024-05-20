import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'core/index.ts'),
      name: 'Curd',
      fileName: 'index',
    },
  },
  resolve: {
    alias: {
      '@fcurd/request': new URL('./core/', import.meta.url).pathname,
    },
    extensions: ['.mjs', '.js', '.ts'],
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  test: {
    clearMocks: true,
    reporters: ['default'],
    coverage: {
      reporter: ['text', 'json-summary', 'json'],
    },
  },
})
