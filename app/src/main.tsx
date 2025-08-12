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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


