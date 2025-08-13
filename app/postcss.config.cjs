/**
 * PostCSS 설정 파일
 * 
 * 주요 플러그인:
 * • tailwindcss: Tailwind CSS 처리
 * • autoprefixer: CSS 벤더 프리픽스 자동 추가
 * 
 * 파일 확장자: .cjs (CommonJS 모듈 시스템)
 * - ES Modules와의 호환성을 위해 .cjs 사용
 */

module.exports = {
	plugins: {
		tailwindcss: {},      // Tailwind CSS 변환
		autoprefixer: {},     // 자동 벤더 프리픽스
	},
};


