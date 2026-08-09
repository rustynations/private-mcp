import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import pkg from './package.json';

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  resolve: {
    alias: {
      '@shared-types': path.resolve(__dirname, '../types'),
    },
  },
  server: {
    // Native FS watching (FSEvents) is broken on this dev machine — recursive
    // fs.watch delivers no events, so HMR silently dies. Polling re-stats files
    // on an interval instead (mtimes update fine); this is the reliable local
    // workaround. Not needed in CI/prod.
    watch: { usePolling: true, interval: 300 },
  },
});
