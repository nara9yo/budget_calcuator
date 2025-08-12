# 🔧 GitHub Pages 설정 가이드

GitHub Actions를 통한 자동 배포를 위해 GitHub 저장소에서 다음 설정을 확인하세요.

## 📋 1단계: GitHub Pages 설정

### 저장소 설정에서 Pages 활성화
1. **GitHub 저장소로 이동**
2. **Settings 탭 클릭**
3. **왼쪽 메뉴에서 "Pages" 선택**
4. **Source 설정을 "GitHub Actions"로 변경**

## 🔐 2단계: 저장소 권한 설정

### Actions 권한 확인
1. **Settings → Actions → General**
2. **"Actions permissions" 섹션에서:**
   - ✅ "Allow all actions and reusable workflows" 선택
   - ✅ "Allow GitHub Actions to create and approve pull requests" 체크

### Pages 권한 확인
1. **Settings → Pages**
2. **"Build and deployment" 섹션에서:**
   - Source: "GitHub Actions" 선택
   - Branch: 자동으로 설정됨

## 🚀 3단계: 워크플로우 선택

### 옵션 1: 기존 워크플로우 (수정됨)
- 파일: `.github/workflows/deploy.yml`
- Git 권한 설정 추가됨
- 더 안전한 토큰 사용

### 옵션 2: 새로운 공식 워크플로우 (권장)
- 파일: `.github/workflows/deploy-pages.yml`
- GitHub의 공식 Pages 배포 액션 사용
- 더 안정적이고 권장되는 방식

## ⚠️ 4단계: 문제 해결

### Git 권한 오류 발생 시
1. **워크플로우 파일에서 `permissions` 섹션 확인**
2. **Git 설정 단계가 포함되어 있는지 확인**
3. **Actions 탭에서 상세한 오류 로그 확인**

### 빌드 실패 시
1. **Node.js 버전이 18.x인지 확인**
2. **package.json의 스크립트가 올바른지 확인**
3. **의존성 설치가 성공했는지 확인**

## 🔄 5단계: 워크플로우 테스트

### 수동 실행
1. **Actions 탭으로 이동**
2. **"Deploy to GitHub Pages" 워크플로우 선택**
3. **"Run workflow" 버튼 클릭**
4. **브랜치 선택 후 "Run workflow" 클릭**

### 자동 실행 확인
1. **main 브랜치에 코드 푸시**
2. **Actions 탭에서 워크플로우 자동 실행 확인**
3. **각 단계별 성공/실패 상태 확인**

## 📊 6단계: 배포 상태 모니터링

### 성공적인 배포 후
1. **Settings → Pages에서 배포 상태 확인**
2. **제공된 URL로 접속하여 애플리케이션 동작 확인**
3. **모든 기능이 정상 작동하는지 테스트**

### 실패 시 디버깅
1. **Actions 탭에서 실패한 워크플로우 클릭**
2. **실패한 단계의 로그 확인**
3. **오류 메시지 분석 및 수정**

## 🎯 권장 워크플로우

**새로운 공식 워크플로우 사용을 권장합니다:**
- `.github/workflows/deploy-pages.yml`
- 더 안정적이고 GitHub에서 공식 지원
- 권한 문제 발생 가능성 낮음

## 📞 추가 지원

문제가 지속되면:
1. **GitHub Issues에 상세한 오류 로그 첨부**
2. **워크플로우 실행 환경 정보 제공**
3. **브라우저 콘솔 오류 메시지 확인**

---

**💡 팁**: 첫 배포 시에는 수동으로 워크플로우를 실행하여 문제를 미리 파악하는 것이 좋습니다.
