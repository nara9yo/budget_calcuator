import { useEffect, useMemo, useState } from 'react';
import type { Expense } from '../utils/storage';

/**
 * ExpenseForm.tsx - 지출/수입 입력 폼 컴포넌트
 * 
 * 주요 기능:
 * • 지출/수입 항목 입력 (제목, 금액)
 * • 편집 모드 지원 (기존 항목 수정)
 * • 금액 입력 시 천 단위 구분자(컴마) 자동 포맷팅
 * • 음수 입력 지원 (수입 표시)
 * • 입력 유효성 검사
 */

type Props = {
  onSubmit: (payload: { title: string; amount: number }) => void;
  editingExpense: Expense | null;
  onCancelEdit: () => void;
};

export default function ExpenseForm({ onSubmit, editingExpense, onCancelEdit }: Props) {
  // • 제목 입력 상태
  // • 금액 입력 상태 (문자열로 관리하여 컴마 포함)
  // • 편집 모드 여부 판단
  const [title, setTitle] = useState<string>('');
  const [amountText, setAmountText] = useState<string>('');
  const isEditing = useMemo(() => !!editingExpense, [editingExpense]);

  // • 편집 모드 활성화 시 기존 데이터 폼에 로드
  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmountText(formatWithCommas(editingExpense.amount));
    } else {
      // 편집 모드가 비활성화되면 입력 필드 초기화
      setTitle('');
      setAmountText('');
    }
  }, [editingExpense]);

  /**
   * 천 단위 구분자(컴마) 추가 함수
   * • 절댓값에 대해 한국어 로케일 적용
   * • 음수인 경우 음수 기호 유지
   */
  function formatWithCommas(value: number): string {
    const absValue = Math.abs(value);
    const formatted = absValue.toLocaleString('ko-KR');
    return value < 0 ? `-${formatted}` : formatted;
  }

  /**
   * 컴마가 포함된 문자열에서 숫자만 추출하는 함수
   * • 모든 컴마 제거 후 숫자 변환
   */
  function parseAmount(value: string): number {
    const cleanValue = value.replace(/,/g, '');
    return Number(cleanValue);
  }

  /**
   * 금액 입력 처리 함수
   * • 숫자, 컴마, 음수 기호만 허용
   * • 음수 기호는 맨 앞에만 허용
   * • 중복 음수 기호 자동 제거
   */
  function handleAmountChange(value: string) {
    // 음수 기호와 숫자, 컴마만 허용
    const validChars = value.replace(/[^0-9,-]/g, '');
    
    // 음수 기호는 맨 앞에만 허용
    if (validChars.startsWith('-')) {
      const withoutMinus = validChars.substring(1);
      if (withoutMinus.includes('-')) {
        // 두 번째 음수 기호가 있으면 제거
        const cleanValue = '-' + withoutMinus.replace(/-/g, '');
        setAmountText(cleanValue);
      } else {
        setAmountText(validChars);
      }
    } else {
      setAmountText(validChars);
    }
  }

  /**
   * 폼 제출 처리
   * • 제목 입력 검증
   * • 금액 유효성 검사 (0이 아닌 정수)
   * • 편집/추가 모드에 따른 처리
   * • 성공 시 입력 필드 초기화 (추가 모드만)
   */
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = parseAmount(amountText);
    if (!title.trim()) return alert('지출 항목을 입력하세요.');
    if (!Number.isInteger(parsed) || parsed === 0) return alert('비용은 0이 아닌 정수로 입력하세요.');
    onSubmit({ title: title.trim(), amount: parsed });
    if (!isEditing) {
      setTitle('');
      setAmountText('');
    }
  }

  /**
   * 입력 필드에서 포커스가 벗어날 때 컴마 포맷팅 적용
   * • 유효한 숫자인 경우에만 포맷팅
   */
  function handleAmountBlur() {
    const parsed = parseAmount(amountText);
    if (!isNaN(parsed) && parsed !== 0) {
      setAmountText(formatWithCommas(parsed));
    }
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      {/* • 지출 항목 제목 입력 */}
      <div className="row">
        <label htmlFor="title">지출 항목</label>
        <input
          id="title"
          placeholder="예) 렌트비"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoComplete="off"
        />
      </div>
      
      {/* • 금액 입력 (지출: 양수, 수입: 음수) */}
      <div className="row">
        <label htmlFor="amount">비용 (지출: 양수, 수입: 음수)</label>
        <input
          id="amount"
          inputMode="numeric"
          placeholder="예) 50,000 또는 -30,000"
          value={amountText}
          onChange={(e) => handleAmountChange(e.target.value)}
          onBlur={handleAmountBlur}
        />
      </div>

      {/* • 액션 버튼 (추가/수정, 취소) */}
      <div className="actions">
        <button type="submit" className="btn primary">{isEditing ? '수정' : '추가'} ➤</button>
        {isEditing && (
          <button type="button" className="btn" onClick={onCancelEdit}>
            취소
          </button>
        )}
      </div>
    </form>
  );
}


