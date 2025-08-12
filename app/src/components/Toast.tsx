/**
 * Toast.tsx - 토스트 알림 컴포넌트
 * 
 * 주요 기능:
 * • 성공/에러 메시지 표시
 * • 조건부 렌더링 (open 상태에 따라 표시/숨김)
 * • 접근성을 위한 role="status" 속성
 * • 클릭 시 자동 닫기 기능
 */

type Props = {
  open: boolean;
  message: string;
  type?: 'success' | 'error';
  onClose: () => void;
};

export default function Toast({ open, message, type = 'success', onClose }: Props) {
  // • open이 false인 경우 컴포넌트를 렌더링하지 않음
  if (!open) return null;
  
  return (
    <div className={`toast ${type}`} role="status" onClick={onClose}>
      {/* • 토스트 메시지 내용 */}
      {message}
    </div>
  );
}


