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
 * • 반응형 디자인 (모바일/데스크톱)
 * • Flat UI Colors 팔레트 기반 스타일링
 */

type Props = {
  expenses: Expense[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
};

export default function ExpenseList({ expenses, onEdit, onDelete, onClearAll }: Props) {
  return (
    <section>
      {/* • 지출/수입 항목들을 ExpenseItem 컴포넌트로 렌더링 */}
      <ul className="bg-white/80 dark:bg-slate-800/70 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 mb-6">
        {expenses.map((e) => (
          <ExpenseItem key={e.id} expense={e} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </ul>

      {/* • 전체 목록 삭제 버튼 (목록이 비어있으면 비활성화) */}
      <div className="flex justify-end">
        <button className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" onClick={onClearAll} disabled={expenses.length === 0}>
          목록 지우기 🗑
        </button>
      </div>
    </section>
  );
}


