/**
 * format.ts - 금액 포맷팅 유틸리티
 * 
 * 주요 기능:
 * • 한국어 로케일을 사용한 원화 포맷팅
 * • 천 단위 구분자(컴마) 자동 추가
 * • 음수/양수에 따른 기호 처리
 * • 절댓값 기반 포맷팅 후 원래 부호 적용
 */

/**
 * 원화 포맷팅 함수
 * • 절댓값에 대해 한국어 로케일 적용
 * • 천 단위 구분자 자동 추가
 * • 음수인 경우 ₩- 형태로 표시
 * • 양수인 경우 ₩ 형태로 표시
 */
export function formatWon(value: number): string {
  const absValue = Math.abs(value);
  const formatted = new Intl.NumberFormat('ko-KR').format(absValue);
  return value < 0 ? `₩-${formatted}` : `₩${formatted}`;
}


