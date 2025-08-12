/**
 * storage.ts - 로컬 스토리지 데이터 관리 유틸리티
 * 
 * 주요 기능:
 * • Expense 타입 정의
 * • 로컬 스토리지 키 상수
 * • 데이터 유효성 검사 함수
 * • 지출 데이터 로드/저장 함수
 * • 에러 처리 및 안전한 데이터 파싱
 */

/**
 * 지출/수입 항목 데이터 타입
 * • id: 고유 식별자
 * • title: 항목 제목
 * • amount: 금액 (양수: 지출, 음수: 수입)
 */
export type Expense = {
  id: string;
  title: string;
  amount: number;
};

// • 로컬 스토리지에 사용할 키 이름
export const STORAGE_KEY = 'budget_expenses';

/**
 * 타입 가드 함수 - 값이 Expense 타입인지 검사
 * • 객체 타입 검사
 * • 필수 속성 존재 여부 및 타입 검사
 */
function isExpense(value: unknown): value is Expense {
  const v = value as any;
  return (
    v && typeof v === 'object' && typeof v.id === 'string' && typeof v.title === 'string' && typeof v.amount === 'number'
  );
}

/**
 * 로컬 스토리지에서 지출 데이터 로드
 * • 저장된 데이터가 없으면 빈 배열 반환
 * • JSON 파싱 후 타입 검증
 * • 유효하지 않은 데이터는 필터링
 * • 에러 발생 시 빈 배열 반환
 */
export function loadExpenses(): Expense[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isExpense);
  } catch {
    return [];
  }
}

/**
 * 지출 데이터를 로컬 스토리지에 저장
 * • JSON 문자열로 변환하여 저장
 * • 배열 형태로 저장
 */
export function saveExpenses(expenses: Expense[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}


