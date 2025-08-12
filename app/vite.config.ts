import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // • GitHub Pages 배포를 위한 base URL 설정
  // • 저장소 이름이 'budget_calcuator'인 경우
  base: '/budget_calcuator/',
  build: {
    // • 빌드 출력 디렉토리 설정
    outDir: 'dist',
    // • 소스맵 생성 (배포 시에는 false로 설정 가능)
    sourcemap: true,
  },
});


