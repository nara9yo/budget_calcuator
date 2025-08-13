import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // 개발: '/', 배포(GH Pages): '/budget_calcuator/'
  base: mode === 'production' ? '/budget_calcuator/' : '/',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
}));


