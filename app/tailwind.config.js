/**
 * Tailwind CSS 설정 파일
 * 
 * 주요 설정:
 * • 다크 모드: class 기반 토글
 * • 컨텐츠 경로: HTML 및 React 컴포넌트 파일들
 * • 커스텀 컬러: primary, success, danger 팔레트
 * • 커스텀 애니메이션: fade-in, slide-up 효과
 * • Flat UI Colors 팔레트 기반 컬러 시스템
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  // 다크 모드 설정 (HTML 클래스 기반)
  darkMode: 'class',
  
  // Tailwind가 스캔할 파일 경로
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  // 테마 확장 설정
  theme: {
    extend: {
      // 커스텀 컬러 팔레트 (Flat UI Colors 참고)
      colors: {
        primary: {
          50: '#eff6ff',   // 매우 밝은 블루
          100: '#dbeafe',  // 밝은 블루
          500: '#3b82f6',  // 주요 블루
          600: '#2563eb',  // 진한 블루
          700: '#1d4ed8',  // 매우 진한 블루
        },
        success: {
          50: '#f0fdf4',   // 매우 밝은 그린
          100: '#dcfce7',  // 밝은 그린
          500: '#22c55e',  // 주요 그린
          600: '#16a34a',  // 진한 그린
        },
        danger: {
          50: '#fef2f2',   // 매우 밝은 레드
          100: '#fee2e2',  // 밝은 레드
          500: '#ef4444',  // 주요 레드
          600: '#dc2626',  // 진한 레드
        }
      },
      
      // 커스텀 애니메이션 효과
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',    // 페이드 인 효과
        'slide-up': 'slideUp 0.3s ease-out',     // 슬라이드 업 효과
      },
      
      // 애니메이션 키프레임 정의
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },                // 시작: 투명
          '100%': { opacity: '1' },              // 끝: 불투명
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },  // 시작: 아래 + 투명
          '100%': { transform: 'translateY(0)', opacity: '1' },   // 끝: 원위치 + 불투명
        },
      }
    },
  },
  
  // 플러그인 설정 (현재 사용하지 않음)
  plugins: [],
}
