# 🚀 GitHub Pages 배포 가이드

이 문서는 예산 계산기 프로젝트를 GitHub Pages에 배포하는 방법을 설명합니다.

## 📋 사전 준비사항

1. **GitHub 저장소 생성**
   - GitHub에 `budget_calculator` 이름으로 새 저장소 생성
   - 저장소를 로컬에 클론

2. **GitHub Pages 설정**
   - 저장소 Settings → Pages
   - Source를 "GitHub Actions"로 설정

## 🔧 로컬 설정

### 1. 의존성 설치
```bash
cd app
npm install
npm install gh-pages --save-dev
```

### 2. package.json 확인
```json
{
  "homepage": "https://[your-username].github.io/budget_calculator",
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist",
    "predeploy": "npm run build"
  }
}
```

**⚠️ 중요**: `[your-username]`은 자동으로 GitHub Actions에서 처리됩니다.

**🔄 자동 처리 과정:**
1. GitHub Actions가 `github.repository_owner`를 통해 사용자명 자동 감지
2. `sed` 명령어로 `[your-username]`을 실제 사용자명으로 대체
3. 빌드 시 올바른 homepage URL 사용

### 3. vite.config.ts 확인
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/budget_calculator/',
  // ... 기타 설정
});
```

## 🚀 배포 방법

### 방법 1: GitHub Actions 자동 배포 (권장)

1. **main 브랜치에 코드 푸시**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **GitHub Actions 확인**
   - 저장소의 Actions 탭에서 워크플로우 실행 상태 확인
   - 성공적으로 완료되면 자동으로 GitHub Pages에 배포

3. **배포 확인**
   - `https://[your-username].github.io/budget_calculator`에서 확인

### 방법 2: 수동 배포

```bash
cd app
npm run deploy
```

## 📱 배포 후 확인사항

### 1. 기본 기능 테스트
- [ ] 지출/수입 항목 추가
- [ ] 항목 수정
- [ ] 항목 삭제
- [ ] 전체 삭제
- [ ] 토스트 알림
- [ ] 반응형 디자인

### 2. 모바일 테스트
- [ ] 모바일 브라우저에서 접속
- [ ] 터치 인터페이스 동작 확인
- [ ] 레이아웃 깨짐 여부 확인

### 3. 성능 테스트
- [ ] 페이지 로딩 속도
- [ ] 애니메이션 부드러움
- [ ] localStorage 동작

## 🔧 문제 해결

### 1. 404 에러 발생
- **원인**: base URL 설정 오류
- **해결**: `vite.config.ts`의 `base` 값 확인
- **확인**: 저장소 이름과 정확히 일치하는지 확인

### 2. 스타일이 적용되지 않음
- **원인**: CSS 파일 경로 오류
- **해결**: `index.html`의 CSS 링크 확인
- **확인**: 상대 경로가 올바른지 확인

### 3. 이미지나 아이콘이 표시되지 않음
- **원인**: 정적 파일 경로 오류
- **해결**: `public` 폴더의 파일들이 올바르게 복사되는지 확인

### 4. GitHub Actions 실패
- **원인**: 워크플로우 설정 오류
- **해결**: `.github/workflows/deploy.yml` 파일 확인
- **확인**: Node.js 버전, 의존성 설치 명령어 확인

## 📊 배포 상태 모니터링

### 1. GitHub Actions
- Actions 탭에서 워크플로우 실행 상태 실시간 확인
- 실패 시 로그 확인하여 문제 파악

### 2. GitHub Pages
- Settings → Pages에서 배포 상태 확인
- 최근 배포 시간 및 상태 확인

### 3. 외부 도구
- [PageSpeed Insights](https://pagespeed.web.dev/) - 성능 테스트
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly) - 모바일 최적화 테스트

## 🔄 업데이트 배포

### 1. 코드 변경 후
```bash
git add .
git commit -m "Update feature description"
git push origin main
```

### 2. 자동 배포 확인
- GitHub Actions가 자동으로 실행
- 배포 완료까지 약 2-3분 소요

### 3. 수동 배포 (필요시)
```bash
cd app
npm run deploy
```

## 📚 추가 리소스

- [GitHub Pages 공식 문서](https://pages.github.com/)
- [GitHub Actions 공식 문서](https://docs.github.com/en/actions)
- [Vite 배포 가이드](https://vitejs.dev/guide/static-deploy.html)

---

**💡 팁**: 첫 배포 후에는 브라우저 캐시를 지우고 새로고침하여 최신 버전이 표시되는지 확인하세요.
