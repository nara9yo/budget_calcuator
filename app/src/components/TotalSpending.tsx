import { formatWon } from '../utils/format';

/**
 * TotalSpending.tsx - 총 지출/수입 금액 표시 컴포넌트
 * 
 * 주요 기능:
 * • 총 지출/수입 금액 표시
 * • 금액에 따른 시각적 구분 (양수: 지출, 음수: 수입)
 * • 커스터마이징 가능한 라벨과 포맷터
 * • 기본값으로 한국어 원화 포맷 사용
 */

type Props = {
  total: number;
  labelPrefix?: string;
  formatter?: (value: number) => string;
};

export default function TotalSpending({ total, labelPrefix = '총지출:', formatter = formatWon }: Props) {
  // • 총액이 양수인지 음수인지 판단하여 스타일 클래스 결정
  const isPositive = total > 0;
  const isNegative = total < 0;
  
  // • 라벨 텍스트 설정 (기본값: '총지출:')
  let label = labelPrefix;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 py-5 px-6 shadow-2xl z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-4 text-gray-900 dark:text-gray-100">
        {/* • 라벨 텍스트 표시 */}
        <span className="text-xl font-semibold uppercase tracking-wide">
          {label}
        </span>
        
        {/* • 총액 표시 (양수/음수에 따른 스타일 적용) */}
        <span className={`text-4xl md:text-5xl font-bold ${
          isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-800'
        }`}>
          {formatter(total)}
        </span>
      </div>
    </div>
  );
}


