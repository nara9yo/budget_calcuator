import { useEffect, useMemo, useState } from 'react';
import { Expense, loadExpenses, saveExpenses } from './utils/storage';
import { formatWon } from './utils/format';
import ExpenseForm from './components/ExpenseForm';
import React from 'react';
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
 * • 다크/라이트/시스템 테마 모드 지원
 * • 테마 드롭다운 메뉴 (자동 닫힘 기능 포함)
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
  const [themeMode, setThemeMode] = useState<'system' | 'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'system';
    const saved = localStorage.getItem('theme');
    return (saved as 'system' | 'light' | 'dark') || 'system';
  });

  const [isDark, setIsDark] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // 시스템 테마 변경 감지 (prefers-color-scheme 미디어 쿼리 모니터링)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (themeMode === 'system') {
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode]);

  // 테마 모드에 따른 다크 모드 상태 설정 (시스템/수동 모드 구분)
  useEffect(() => {
    let shouldBeDark = false;

    if (themeMode === 'system') {
      shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      shouldBeDark = themeMode === 'dark';
    }

    setIsDark(shouldBeDark);
  }, [themeMode]);

  // HTML에 다크 클래스 적용 및 로컬 스토리지 저장
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // 시스템 모드가 아닐 때만 로컬 스토리지에 저장
    if (themeMode !== 'system') {
      localStorage.setItem('theme', themeMode);
    } else {
      localStorage.setItem('theme', 'system');
    }
  }, [isDark, themeMode]);

  // 테마 모드 변경 핸들러 (드롭다운 자동 닫기 포함)
  const handleThemeChange = (newTheme: 'system' | 'light' | 'dark') => {
    setThemeMode(newTheme);
    setIsDropdownOpen(false); // 드롭다운 자동 닫기
  };

  // 드롭다운 외부 클릭 시 자동 닫기 (클릭 이벤트 위임)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.theme-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-400 dark:from-slate-800 dark:via-slate-700 dark:to-slate-600 bg-fixed py-10 pb-40 px-6 transition-all duration-700 ease-in-out">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white dark:text-gray-100 text-center md:text-left drop-shadow-2xl tracking-tight">
            예산 계산기
          </h1>
          <div className="relative theme-dropdown">
            <button
              aria-label="테마 모드 선택"
              className="h-10 px-4 rounded-lg border border-white/30 bg-white/20 text-white backdrop-blur hover:bg-white/30 transition-all duration-300 shadow md:ml-4 inline-flex items-center gap-2 hover:scale-105"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {themeMode === 'system' && '🖥️'}
              {themeMode === 'light' && '☀️'}
              {themeMode === 'dark' && '🌙'}
              <span className="text-sm font-medium">
                {themeMode === 'system' ? '시스템' : themeMode === 'light' ? '라이트' : '다크'}
              </span>
              <span className={`text-xs transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {/* 테마 모드 드롭다운 */}
            <div className={`absolute right-0 top-full mt-2 w-32 bg-white/95 dark:bg-slate-700/95 backdrop-blur-xl rounded-lg shadow-xl border border-white/20 dark:border-slate-600 transition-all duration-300 transform z-50 ${isDropdownOpen
              ? 'opacity-100 visible translate-y-0'
              : 'opacity-0 invisible translate-y-2'
              }`}>
              <div className="py-2">
                <button
                  onClick={() => handleThemeChange('system')}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors flex items-center gap-2 ${themeMode === 'system' ? 'text-cyan-600 dark:text-cyan-400 font-medium' : 'text-slate-700 dark:text-slate-300'
                    }`}
                >
                  🖥️ 시스템
                </button>
                <button
                  onClick={() => handleThemeChange('light')}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors flex items-center gap-2 ${themeMode === 'light' ? 'text-cyan-600 dark:text-cyan-400 font-medium' : 'text-slate-700 dark:text-slate-300'
                    }`}
                >
                  ☀️ 라이트
                </button>
                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`w-full px-4 py-2 text-left text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors flex items-center gap-2 ${themeMode === 'dark' ? 'text-cyan-600 dark:text-cyan-400 font-medium' : 'text-slate-700 dark:text-slate-300'
                    }`}
                >
                  🌙 다크
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/95 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 mb-6">
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


