import { useEffect, useMemo, useState } from 'react';
import { Expense, loadExpenses, saveExpenses } from './utils/storage';
import { formatWon } from './utils/format';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import TotalSpending from './components/TotalSpending';
import Toast from './components/Toast';

/**
 * App.tsx - 메인 애플리케이션 컴포넌트
 * 
 * 주요 기능:
 * • 지출/수입 항목 관리 (추가, 수정, 삭제)
 * • 로컬 스토리지를 통한 데이터 영속성
 * • 실시간 총액 계산 및 표시
 * • 토스트 알림 시스템
 * • 편집 모드 상태 관리
 */

type ToastState = { message: string; type: 'success' | 'error' } | null;

/**
 * 고유 ID 생성 함수
 * • crypto.randomUUID() 우선 사용 (최신 브라우저)
 * • 폴백: 타임스탬프 + 랜덤값 조합
 */
function generateId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return (crypto as any).randomUUID();
  }
  return `id_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export default function App() {
  // • 로컬 스토리지에서 지출 데이터 로드
  // • 편집 중인 항목 ID 상태 관리
  // • 토스트 알림 상태 관리
  const [expenses, setExpenses] = useState<Expense[]>(() => loadExpenses());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>(null);

  // • 지출 데이터 변경 시 자동 저장
  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  // • 토스트 알림 3초 후 자동 제거
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  // • 총 지출/수입 금액 계산 (수입은 음수로 처리)
  const total = useMemo(() => {
    return expenses.reduce((sum, e) => sum + e.amount, 0);
  }, [expenses]);

  // • 편집 중인 항목 데이터 조회
  const editingExpense = useMemo(() => {
    return expenses.find(e => e.id === editingId) ?? null;
  }, [editingId, expenses]);

  /**
   * 지출/수입 항목 제출 처리
   * • 편집 모드: 기존 항목 수정
   * • 추가 모드: 새 항목 생성
   * • 성공 메시지 토스트 표시
   */
  function handleSubmit(payload: { title: string; amount: number }) {
    if (editingId) {
      setExpenses(prev => prev.map(e => (e.id === editingId ? { ...e, ...payload } : e)));
      setEditingId(null);
      setToast({ message: '항목이 수정되었습니다.', type: 'success' });
    } else {
      const newExpense: Expense = { id: generateId(), title: payload.title, amount: payload.amount };
      setExpenses(prev => [...prev, newExpense]);
      setToast({ message: '항목이 추가되었습니다.', type: 'success' });
    }
  }

  // • 편집 모드 활성화
  function handleEdit(id: string) {
    setEditingId(id);
  }

  // • 항목 삭제 및 성공 메시지 표시
  function handleDelete(id: string) {
    setExpenses(prev => prev.filter(e => e.id !== id));
    setToast({ message: '항목이 삭제되었습니다.', type: 'success' });
  }

  // • 전체 목록 삭제 (확인 대화상자 표시)
  function handleClearAll() {
    if (!confirm('목록을 모두 삭제하시겠습니까?')) return;
    setExpenses([]);
    setEditingId(null);
    setToast({ message: '모든 항목이 삭제되었습니다.', type: 'success' });
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="title">예산 계산기</h1>

        <div className="card">
          {/* • 지출/수입 입력 폼 (추가/수정 모드) */}
          <ExpenseForm onSubmit={handleSubmit} editingExpense={editingExpense} onCancelEdit={() => setEditingId(null)} />

          {/* • 지출/수입 목록 표시 및 관리 */}
          <ExpenseList expenses={expenses} onEdit={handleEdit} onDelete={handleDelete} onClearAll={handleClearAll} />
        </div>

        {/* • 총 지출/수입 금액 표시 */}
        <TotalSpending total={total} />
      </div>

      {/* • 토스트 알림 컴포넌트 */}
      <Toast open={!!toast} message={toast?.message ?? ''} type={toast?.type ?? 'success'} onClose={() => setToast(null)} />
    </div>
  );
}


