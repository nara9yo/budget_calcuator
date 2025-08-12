import type { Expense } from '../utils/storage';
import { formatWon } from '../utils/format';

/**
 * ExpenseItem.tsx - 개별 지출/수입 항목 컴포넌트
 * 
 * 주요 기능:
 * • 지출/수입 항목 정보 표시 (제목, 금액)
 * • 금액에 따른 시각적 구분 (양수: 지출, 음수: 수입)
 * • 수정/삭제 액션 버튼 제공
 * • 접근성을 위한 aria-label 속성 적용
 */

type Props = {
  expense: Expense;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function ExpenseItem({ expense, onEdit, onDelete }: Props) {
  // • 금액이 양수인지 음수인지 판단하여 스타일 클래스 결정
  const isPositive = expense.amount > 0;
  const isNegative = expense.amount < 0;
  
  return (
    <li className="expense-item">
      {/* • 지출/수입 항목 제목 */}
      <span className="title">{expense.title}</span>
      
      {/* • 금액 표시 (양수/음수에 따른 스타일 적용) */}
      <span className={`amount ${isPositive ? 'positive' : isNegative ? 'negative' : ''}`}>
        {formatWon(expense.amount)}
      </span>
      
      {/* • 액션 버튼 (수정, 삭제) */}
      <div className="item-actions">
        <button aria-label="수정" className="icon-btn" onClick={() => onEdit(expense.id)}>✏️</button>
        <button aria-label="삭제" className="icon-btn" onClick={() => onDelete(expense.id)}>🗑️</button>
      </div>
    </li>
  );
}


