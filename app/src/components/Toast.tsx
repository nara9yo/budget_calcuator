/**
 * Toast.tsx - 토스트 알림 컴포넌트
 * 
 * 주요 기능:
 * • 성공/에러 메시지 표시
 * • 조건부 렌더링 (open 상태에 따라 표시/숨김)
 * • 접근성을 위한 role="status" 속성
 * • 클릭 시 자동 닫기 기능
 * • 중앙 정렬 위치 (left-1/2, transform -translate-x-1/2)
 * • Flat UI Colors 팔레트 기반 그라데이션
 * • 애니메이션 효과 (fade-in, transition)
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
    <div
      className={`fixed left-1/2 top-6 transform -translate-x-1/2 bg-black/95 backdrop-blur-xl text-white px-6 py-4 rounded-lg shadow-2xl z-50 min-w-[300px] text-center text-base font-semibold border border-white/10 cursor-pointer transition-all duration-300 animate-fade-in ${type === 'success'
          ? 'bg-gradient-to-r from-emerald-500/95 to-teal-500/95 border-emerald-300/30'
          : 'bg-gradient-to-r from-rose-500/95 to-rose-600/95 border-rose-300/30'
        }`}
      role="status"
      onClick={onClose}
    >
      {/* • 토스트 메시지 내용 */}
      {message}
    </div>
  );
}


