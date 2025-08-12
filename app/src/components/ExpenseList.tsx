import ExpenseItem from './ExpenseItem';
import type { Expense } from '../utils/storage';

/**
 * ExpenseList.tsx - 지출/수입 목록 표시 컴포넌트
 * 
 * 주요 기능:
 * • 지출/수입 항목들을 리스트 형태로 표시
 * • 각 항목에 대한 수정/삭제 액션 제공
 * • 전체 목록 삭제 기능
 * • 빈 목록일 때 삭제 버튼 비활성화
 */

type Props = {
  expenses: Expense[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
};

export default function ExpenseList({ expenses, onEdit, onDelete, onClearAll }: Props) {
  return (
    <section className="expense-list">
      {/* • 지출/수입 항목들을 ExpenseItem 컴포넌트로 렌더링 */}
      <ul>
        {expenses.map((e) => (
          <ExpenseItem key={e.id} expense={e} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </ul>
      
      {/* • 전체 목록 삭제 버튼 (목록이 비어있으면 비활성화) */}
      <div className="list-actions">
        <button className="btn danger" onClick={onClearAll} disabled={expenses.length === 0}>
          목록 지우기 🗑
        </button>
      </div>
    </section>
  );
}


