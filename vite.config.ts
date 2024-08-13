import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools()
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  test: {  // Konfiguracja Vitest
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setupTests.ts']  // Opcjonalnie, jeśli masz pliki setup
  }
});