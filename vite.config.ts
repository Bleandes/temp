import svgr from '@svgr/rollup';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
  },
  resolve: {
    alias: {
      '#types': path.resolve(__dirname, './src/@types'),
      '#assets': path.resolve(__dirname, './src/assets'),
      '#components': path.resolve(__dirname, './src/components'),
      '#context': path.resolve(__dirname, './src/context'),
      '#helper': path.resolve(__dirname, './src/helper'),
      '#hooks': path.resolve(__dirname, './src/hooks'),
      '#layout': path.resolve(__dirname, './src/layout'),
      '#listeners': path.resolve(__dirname, './src/listeners'),
      '#locales': path.resolve(__dirname, './src/locales'),
      '#mask': path.resolve(__dirname, './src/mask'),
      '#pages': path.resolve(__dirname, './src/pages'),
      '#reports': path.resolve(__dirname, './src/reports'),
      '#theme': path.resolve(__dirname, './src/theme'),
      '#errors': path.resolve(__dirname, './src/errors'),
    },
  },
});
