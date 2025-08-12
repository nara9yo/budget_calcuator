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
    <div className="total-spending">
      {/* • 라벨 텍스트 표시 */}
      <span className="label">{label}</span>
      
      {/* • 총액 표시 (양수/음수에 따른 스타일 적용) */}
      <span className={`amount ${isPositive ? 'positive' : isNegative ? 'negative' : ''}`}>
        {formatter(total)}
      </span>
    </div>
  );
}


