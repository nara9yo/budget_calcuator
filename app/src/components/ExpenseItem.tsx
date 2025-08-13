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
    <li className="expense-item grid grid-cols-[2fr_1fr_auto] items-center gap-4 p-5 border-b border-gray-200 dark:border-gray-800 last:border-b-0">
      {/* • 지출/수입 항목 제목 */}
      <span className="font-semibold text-gray-800 dark:text-gray-100 text-left">{expense.title}</span>
      
      {/* • 금액 표시 (양수/음수에 따른 스타일 적용) */}
      <span className={`text-right font-semibold text-lg ${
        isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-800'
      } dark:text-gray-100`}>
        {formatWon(expense.amount)}
      </span>
      
      {/* • 액션 버튼 (수정, 삭제) */}
      <div className="flex gap-2 justify-end">
        <button 
          aria-label="수정" 
          className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition-all duration-200 hover:scale-110 text-lg" 
          onClick={() => onEdit(expense.id)}
        >
          ✏️
        </button>
        <button 
          aria-label="삭제" 
          className="w-9 h-9 rounded-full hover:bg-red-100 flex items-center justify-center transition-all duration-200 hover:scale-110 text-lg" 
          onClick={() => onDelete(expense.id)}
        >
          🗑️
        </button>
      </div>
    </li>
  );
}


