import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';

/**
 * main.tsx - 애플리케이션 진입점
 * 
 * 주요 기능:
 * • React 애플리케이션 초기화
 * • DOM에 루트 컴포넌트 마운트
 * • StrictMode 활성화 (개발 시 추가 검증)
 * • 전역 스타일시트 로드
 */

// 다크 모드 초기화
const initializeDarkMode = () => {
  const saved = localStorage.getItem('theme') as 'system' | 'light' | 'dark';

  if (saved === 'system' || !saved) {
    // 시스템 테마 사용
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } else if (saved === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// 초기화 실행
initializeDarkMode();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


