# 예산 계산기 (Budget Calculator) 💰

React와 TypeScript로 구현된 간단하고 직관적인 예산(지출/수입) 관리 애플리케이션입니다.

## 🌐 라이브 데모

**📱 [GitHub Pages에서 바로 사용해보기](https://nara9yo.github.io/budget_calcuator)**

![Image](https://github.com/user-attachments/assets/4fc93963-77f2-480e-a543-eddf063de8a5)

> **💡 참고**: 위 링크는 현재 저장소 소유자(nara9yo)의 GitHub Pages입니다.  
> 다른 사용자가 포크하여 사용할 경우, GitHub Actions가 자동으로 올바른 URL로 설정합니다.

## ✨ 주요 기능

- **지출/수입 항목 관리**: 수입과 지출 항목 추가, 수정, 삭제
- **실시간 계산**: 총지출을 실시간으로 계산하여 표시
- **데이터 영속화**: localStorage를 통한 데이터 자동 저장 및 복원
- **사용자 친화적 UI**: 직관적인 폼과 목록 인터페이스
- **토스트 알림**: 작업 완료 시 자동으로 사라지는 알림 메시지
- **전체 삭제**: 확인 후 모든 항목을 한 번에 삭제
- **반응형 디자인**: 모바일과 데스크톱 모두 최적화
- **다크/라이트 테마**: 시스템 테마 자동 감지 및 수동 전환
- **Flat UI 디자인**: 세련된 컬러 팔레트와 부드러운 애니메이션

## 🚀 실행 방법

### 1. 의존성 설치
```bash
cd app
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```
브라우저에서 `http://localhost:5173`으로 접속

### 3. 프로덕션 빌드
```bash
npm run build
npm run preview
```

### 4. GitHub Pages 배포
```bash
npm run deploy
```

## 🏗️ 프로젝트 구조

```
budget_calcuator/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 배포 워크플로우
├── app/
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts          # Vite 설정 (GitHub Pages용 base URL 포함)
│   ├── tailwind.config.js      # Tailwind CSS 설정 (커스텀 컬러/애니메이션)
│   ├── postcss.config.cjs      # PostCSS 설정 (Tailwind + Autoprefixer)
│   └── src/
│       ├── main.tsx            # 애플리케이션 진입점 (테마 초기화)
│       ├── App.tsx             # 메인 컴포넌트 (테마 관리)
│       ├── components/
│       │   ├── ExpenseForm.tsx # 지출/수입 입력 폼 (반응형 그리드)
│       │   ├── ExpenseList.tsx # 지출/수입 목록 (Flat UI 스타일)
│       │   ├── ExpenseItem.tsx # 개별 지출/수입 항목 (액션 버튼)
│       │   ├── TotalSpending.tsx # 총지출/수입 표시 (고정 하단 바)
│       │   └── Toast.tsx       # 알림 컴포넌트 (애니메이션)
│       ├── utils/
│       │   ├── storage.ts      # localStorage 관리
│       │   └── format.ts       # 금액 포맷팅
│       └── styles/
│           └── index.css       # 전역 스타일 (Tailwind + 커스텀 애니메이션)
├── DEPLOYMENT.md               # 배포 가이드 및 GitHub Pages 설정 방법
├── GITHUB_SETUP.md             # GitHub 저장소 설정 및 초기 구성 가이드
├── RFP.md                      # 프로젝트 요구사항 명세서 (RFP)
├── budget-calculator-ref.gif   # 애플리케이션 동작 예시 GIF 이미지
└── README.md
```

## 🛠️ 기술 스택

- **Frontend**: React 18.3.1 + TypeScript 5.5.4
- **Build Tool**: Vite 5.3.3
- **Styling**: Tailwind CSS 3.4.0 + PostCSS + Autoprefixer
- **State Management**: React Hooks (useState, useEffect, useMemo)
- **Data Persistence**: localStorage API
- **Deployment**: GitHub Pages + GitHub Actions
- **Package Manager**: npm
- **Design System**: Flat UI Colors 팔레트 기반

## 📱 주요 컴포넌트

### ExpenseForm
- 지출/수입 항목명과 금액 입력
- 수정 모드 지원 (기존 항목 편집)
- 입력 유효성 검사 (금액은 0이 아닌 정수만 허용)
- 천 단위 구분자(컴마) 자동 포맷팅
- 음수 입력 지원 (수입 표시)
- 반응형 그리드 레이아웃 (모바일/데스크톱)
- Flat UI Colors 기반 스타일링

### ExpenseList
- 지출/수입 항목 목록 표시
- 개별 항목 수정/삭제 기능
- 전체 목록 삭제 기능
- 빈 목록일 때 삭제 버튼 비활성화
- 반응형 디자인 및 Flat UI 스타일

### TotalSpending
- 총 지출/수입 금액 표시
- 양수/음수에 따른 시각적 구분
- 고정 위치에 표시 (스크롤해도 항상 보임)
- Flat UI Colors 기반 컬러 시스템

### Toast
- 상단 중앙에 표시되는 알림 메시지
- 3초 후 자동으로 사라짐
- 성공/에러 타입 지원
- 페이드 인 애니메이션 및 Flat UI 그라데이션

### 테마 시스템
- 시스템 테마 자동 감지 (`prefers-color-scheme`)
- 라이트/다크/시스템 모드 선택
- 드롭다운 메뉴 (자동 닫힘, 외부 클릭 감지)
- 부드러운 테마 전환 애니메이션

## 💾 데이터 구조

```typescript
interface Expense {
  id: string;      // 고유 식별자 (UUID)
  title: string;   // 지출/수입 항목명
  amount: number;  // 금액 (양수: 지출, 음수: 수입)
}
```

## 🔧 구현 세부사항

- **금액 입력**: 숫자, 컴마, 음수 기호 허용, 0이 아닌 정수 검증
- **데이터 저장**: `budget_expenses` 키로 localStorage에 저장
- **ID 생성**: crypto.randomUUID() 또는 fallback으로 타임스탬프 기반 ID 생성
- **반응형 디자인**: Tailwind CSS Grid와 Flexbox를 활용한 모바일 최적화
- **접근성**: 적절한 label, aria-label, role 속성 사용
- **포맷팅**: 한국어 로케일을 사용한 원화 포맷팅
- **시각적 구분**: 수입과 지출을 색상으로 구분하여 표시
- **테마 시스템**: `prefers-color-scheme` 미디어 쿼리 기반 시스템 테마 감지
- **컬러 시스템**: Flat UI Colors 팔레트 기반의 일관된 디자인
- **애니메이션**: CSS transitions와 Tailwind 애니메이션을 활용한 부드러운 UX

## 📋 사용법

1. **항목 추가**: 항목명과 금액을 입력하고 "추가" 버튼 클릭
   - 양수 입력 (예: 50,000) → 지출
   - 음수 입력 (예: -30,000) → 수입
2. **항목 수정**: 목록에서 "✏️" 버튼 클릭 후 내용 변경
3. **항목 삭제**: 목록에서 "🗑️" 버튼 클릭
4. **전체 삭제**: "목록 지우기 🗑" 버튼 클릭 후 확인
5. **테마 변경**: 우상단 테마 드롭다운에서 시스템/라이트/다크 모드 선택
   - 시스템: OS 테마 자동 감지
   - 라이트: 밝은 테마 강제 적용
   - 다크: 어두운 테마 강제 적용

## 🎯 특징

- **간단한 UI**: 복잡하지 않은 직관적인 인터페이스
- **실시간 업데이트**: 모든 변경사항이 즉시 반영
- **데이터 안전성**: localStorage 오류 시 빈 배열로 fallback
- **타입 안전성**: TypeScript로 컴파일 타임 오류 방지
- **성능 최적화**: useMemo를 통한 불필요한 재계산 방지
- **수입/지출 구분**: 양수/음수로 수입과 지출을 명확하게 구분
- **시각적 피드백**: 색상과 메시지로 사용자에게 명확한 정보 제공
- **모던한 디자인**: Tailwind CSS 기반의 세련된 UI/UX
- **테마 시스템**: 시스템 테마 자동 감지 및 수동 전환
- **Flat UI 디자인**: 부드러운 컬러 팔레트와 일관된 디자인 시스템
- **반응형 레이아웃**: 모바일과 데스크톱 모두 최적화된 사용자 경험

## 🚀 배포

### GitHub Pages 자동 배포
- main 브랜치에 push하면 자동으로 GitHub Pages에 배포
- GitHub Actions 워크플로우를 통한 CI/CD 파이프라인
- 수동 배포도 가능 (`workflow_dispatch` 트리거)

### 🔄 동적 Homepage 처리
- `package.json`의 `homepage` 필드에 `[your-username]` 플레이스홀더 사용
- GitHub Actions가 자동으로 `github.repository_owner`를 감지하여 실제 사용자명으로 대체
- 다른 사용자가 포크해도 자동으로 올바른 URL 설정

### 수동 배포
```bash
cd app
npm run deploy
```

## 📱 반응형 디자인

- **데스크톱**: 3열 그리드 레이아웃 (Tailwind CSS Grid)
- **모바일**: 세로 스택 레이아웃 (Flexbox 기반)
- **브레이크포인트**: 768px (`md:` 접두사)
- **터치 친화적**: 모바일에서도 편리한 사용
- **컨테이너**: 최대 너비 4xl (896px)로 제한하여 가독성 향상
- **그라데이션**: 배경 그라데이션으로 시각적 깊이감 제공

## 🔒 보안 및 성능

- **클라이언트 사이드**: 모든 데이터는 로컬에 저장
- **의존성 최소화**: 핵심 라이브러리만 사용
- **번들 최적화**: Vite를 통한 빠른 빌드 및 HMR
- **TypeScript**: 타입 안전성 보장
- **CSS 최적화**: Tailwind CSS의 JIT 컴파일러로 사용된 클래스만 번들링
- **PostCSS**: Autoprefixer를 통한 크로스 브라우저 호환성
- **애니메이션 최적화**: CSS transitions와 transforms 활용으로 GPU 가속

## 📄 라이선스

이 프로젝트는 개인 학습 및 포트폴리오 목적으로 제작되었습니다.

## 🤝 기여하기

1. 이 저장소를 Fork
2. 새로운 기능 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경사항 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 Push (`git push origin feature/AmazingFeature`)
5. Pull Request 생성

## 🚀 다른 사용자를 위한 사용법

### 1. 저장소 포크
- 이 저장소를 자신의 GitHub 계정으로 포크

### 2. 자동 설정
- GitHub Actions가 자동으로 `package.json`의 homepage를 올바른 URL로 설정
- `[your-username]` 부분이 자동으로 실제 사용자명으로 대체됨

### 3. 배포 확인
- 포크한 저장소의 Actions 탭에서 배포 상태 확인
- 성공적으로 배포되면 `https://[your-username].github.io/budget_calcuator`에서 접속 가능

### 4. 테마 시스템 활용
- 시스템 테마 자동 감지 기능으로 사용자 환경에 맞는 UI 제공
- 라이트/다크 모드 수동 전환으로 개인 취향 반영
- Flat UI Colors 팔레트로 세련된 디자인 경험

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 Issue를 생성해 주세요.

---

**⭐ 이 프로젝트가 도움이 되었다면 Star를 눌러주세요!**
