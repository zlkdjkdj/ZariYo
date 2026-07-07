# 자리요 (ZariYo) 개발 일지 (Development Logs)

이 문서는 자리요 프로젝트의 전체 마일스톤 단계별 개발 이력 및 구현 내역을 보존하는 작업 일지입니다.

---

## [2026-07-07]

### 1. 신규 Vite 프로젝트 생성 및 기초 의존성 설치
- **작업 내용**:
  - 바탕화면의 `portfolio/ZariYo` 빈 폴더에 Vite 기반 React + TypeScript 프로젝트를 성공적으로 스캐폴딩하였습니다.
  - 명령어: `npx -y create-vite@latest ./ --template react-ts --no-interactive`
  - 프로젝트 기초 패키지 로드(`npm install`)를 완료하였습니다.

### 2. 스타일링 및 추가 라이브러리 연동
- **작업 내용**:
  - 최신 **Tailwind CSS v4** 구조를 프로젝트에 설치했습니다. (`tailwindcss`, `@tailwindcss/vite`)
  - [vite.config.ts](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/vite.config.ts) 파일의 Vite 빌드 플러그인 목록에 `@tailwindcss/vite`를 추가하여 스타일 빌드를 통합했습니다.
  - 고품질의 미니멀 아이콘 활용을 위해 `lucide-react` 패키지를 추가 셋업하였습니다.
  - 전역 폰트 환경 구축을 위해 Pretendard Variable 웹폰트 스타일을 [index.css](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/src/index.css)에 연동했습니다.

### 3. 컴포넌트 단위 리팩토링 및 모듈화
- **작업 내용**:
  - 단일 코드 위주로 집중되어 있던 정적 페이지 코드를 결합도와 재사용성을 고려해 다음과 같이 모듈 단위로 완전 리팩토링 및 분할하였습니다:
    - **[Header.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/src/components/Header.tsx)**: 로고 및 상단 네비바
    - **[Hero.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/src/components/Hero.tsx)**: 핵심 헤드라인, 메인 CTA 및 실시간 좌석 현황 시뮬레이션 매트릭스
    - **[Features.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/src/components/Features.tsx)**: 5분 임시 선점 등 4대 기술 특징 카드
    - **[Architecture.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/src/components/Architecture.tsx)**: WAS 클러스터 및 트랜잭션 수명 주기 시퀀스 설명부
    - **[Footer.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/src/components/Footer.tsx)**: 카피라이트 및 법적 약관 링크
    - **[LandingPage.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/src/pages/LandingPage.tsx)**: 상기 개별 컴포넌트의 유기적 조합 레이아웃
  - `src/App.tsx`가 오직 `LandingPage`만 불러와 간결히 렌더링되게 리팩토링을 마무리했습니다.

### 4. 토스 & 애플 스타일 미니멀리즘 디자인 시스템 개편
- **작업 내용**:
  - 기존에 임베딩되어 있던 화려한 네온 그라데이션 글로우(Glowing Blobs) 백그라운드를 일제히 정리하고, 극도의 미니멀리즘을 선사하는 젯 블랙(`bg-black`) 단색조 스킴으로 개편했습니다.
  - 토스의 직관적인 블루 톤(`#3182f6`)을 주요 액션 컴포넌트(CTA 및 배지 등)에 이식하였습니다.
  - 카드 모서리를 크게 깎아 부드러움을 강조하는 토스형 카드 양식(`rounded-3xl`, `p-10`)과 애플 풍의 얇고 절제된 흐름도 인포그래픽 템플릿을 완성했습니다.
  - 프로젝트 템플릿 생성 시 자동 포함된 미사용 스타일시트인 `App.css` 내용을 지워 기본 디자인 잔재를 일소했습니다.

### 5. 빌드 검증 결과
- **산출물**:
  - `npm run build`를 성공적으로 통과하여 컴파일러 정합성을 유지했습니다.
  - 번들 CSS와 JS 크기가 최적화되어 빠른 화면 렌더링을 보장합니다.

### 6. 기획서 반영 README.md 고도화 작성
- **작업 내용**:
  - 노션 기획 페이지를 외부 렌더링 수집(Browser Subagent)하여 프로젝트 소개, 기대 효과, 주요 기능 정보를 추출했습니다.
  - 추출한 정보와 데이터베이스 ERD Cloud 링크 및 동시성 제어 핵심 4대 API(조회, 임시 선점 신청, 최종 확정, 반납) 명세서를 [README.md](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/README.md)에 상세히 가독성 높은 표와 JSON 스키마 코드로 기술 완료했습니다.
  - 문서 갱신 후 빌드 컴파일 이상 유무 검증을 마쳤습니다.

### 7. 백엔드/DB 연동, 리팩토링 수준 및 보안성 분석 보고서 작성
- **작업 내용**:
  - 현재 정적 목업 상태와 기획 설계상 정의된 하이브리드 스토리지(Redis + MySQL) 및 실시간 동기화 아키텍처를 분석했습니다.
  - 모듈 구조 분할 및 스타일 번들 최소화(Tailwind v4) 관점에서의 리팩토링 품질을 정성 평가했습니다.
  - 향후 API 연동 시 마주할 수 있는 XSS, CORS, 분산 락 레이스 컨디션 및 API 우회 등의 보안 취약 영역과 그에 대한 선제적 아키텍처 대비책을 도출했습니다.
  - 수립된 종합 분석 내역을 [ZariYo_Code_Analysis.md](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo_Code_Analysis.md)에 문서화하여 수록했습니다.

### 8. 프론트엔드 및 백엔드 디렉토리 구조 이원화 구축
- **작업 내용**:
  - 프로젝트 루트의 React 소스코드 전체를 새로이 생성한 [ZariYo-FrontEnd](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd) 디렉토리로 이전 완료했습니다. (src, dist, node_modules, package.json, tsconfig.json, vite.config.ts 등)
  - 향후 Spring Boot 백엔드 소스를 전담할 [ZariYo-BackEnd](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-BackEnd) 폴더를 신규 생성하여 표준 디렉토리 트리(src/main/java, src/main/resources)를 수립했습니다.
  - 백엔드 폴더 내에 Spring Boot 3.3.1 버전 및 JPA, MySQL, Redis, Redisson(분산 락), WebSocket 의존성이 정의된 `build.gradle` 및 `settings.gradle` 빌드 파일을 세팅하고 애플리케이션 진입점 `ZariYoApplication.java`와 환경 설정 `application.yml`을 배포용 기본 템플릿으로 구축했습니다.
  - 이전이 완료된 `ZariYo-FrontEnd` 내부에서 `npm run build`를 재동작시켜 빌드 정합성을 유지 검증했습니다.
  - 프로젝트 루트 문서(`README.md`, `work.md`, `trouble.md`, `ZariYo_Code_Analysis.md` 및 `.agents`)들은 최상위 루트에 그대로 보존하여 종합 통제를 지원합니다.

### 9. 폴더 재배치 후 IDE 캐시 동기화 트러블슈팅
- **작업 내용**:
  - 이전 대상 파일을 `ZariYo-FrontEnd`로 이동한 후, IDE 린터 및 TypeScript 언어 서버가 삭제된 구 경로의 파일들을 물고 늘어져 가짜 컴파일 에러를 다수 표기하는 증상을 확인했습니다.
  - 이 문제에 대해 구 경로의 열려있던 편집 탭 정리 및 TS Server 재기동 가이드 조치를 정리하여 [trouble.md](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/trouble.md)에 상세 원인과 해결 방법을 선제 기록했습니다.

### 10. pnpm 패키지 매니저 마이그레이션 및 pnpm workspace 구축
- **작업 내용**:
  - 기존 npm 락파일(`package-lock.json`) 및 이전 시 잔존했던 `node_modules` 디렉토리를 완전히 일소하여 레거시 구성을 삭제했습니다.
  - 프로젝트 루트 경로에 [pnpm-workspace.yaml](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/pnpm-workspace.yaml) 파일을 생성하고 `ZariYo-FrontEnd` 패키지를 워크스페이스 대상으로 선언했습니다.
  - 루트 경로에 [package.json](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/package.json) 파일을 신규 주입하여 `pnpm dev`, `pnpm build` 입력 시 `--filter` 기능을 통해 하위 `ZariYo-FrontEnd`가 루트 디렉토리에서도 단축 명령어로 즉각 구동될 수 있는 통합 제어 환경을 수립했습니다.
  - 루트에서 `pnpm install`을 실행하여 워크스페이스 전역 패키지 동기화 및 `pnpm-lock.yaml` 생성을 완료하였으며, 최종 `pnpm build` 번들 검증을 무사히 통과하였습니다.

### 11. 로그인 및 회원가입 페이지 생성과 멀티 페이지 라우팅 적용
- **작업 내용**:
  - `ZariYo-FrontEnd` 패키지에 멀티 페이지 라우팅을 지원하기 위해 `react-router-dom` 패키지를 설치했습니다.
  - [App.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/App.tsx)에 `BrowserRouter`를 연동하고 `/`, `/login`, `/signup` 경로에 따른 컴포넌트 매핑을 완료했습니다.
  - [Header.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/components/Header.tsx) 컴포넌트를 리팩토링하여 로고 클릭 시 홈('/') 이동을 지원하고, 우측 네비게이션 영역에 로그인 및 회원가입 페이지로 즉각 이동할 수 있는 슬릭한 텍스트 링크 메뉴를 추가했습니다.
  - [LoginPage.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/pages/LoginPage.tsx) 및 [SignupPage.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/pages/SignupPage.tsx)를 신규 작성하여, Apple/Toss의 절제된 다크 모드 디자인 톤에 맞춘 로그인/회원가입 폼 화면을 구축하고 프론트엔드 유효성 검사 로직을 수립했습니다.
  - 전체 소스코드 변경 이후 `pnpm build` 검증을 거쳐 에러 없이 빌드가 성공적으로 완료됨을 확인했습니다.

### 12. 다크 모드 / 라이트 모드 테마 전역 전환 시스템 구축
- **작업 내용**:
  - `ZariYo-FrontEnd` 전체 웹 애플리케이션의 테마(다크/라이트) 상태를 전역 통제하기 위해 [ThemeContext.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/context/ThemeContext.tsx)를 신규 도입했습니다.
  - 사용자의 이전 테마 선택 상태를 브라우저에 저장하고 영속적으로 복원하기 위해 `localStorage` 캐싱 연동을 추가하고, 기본 시스템 OS 테마(`prefers-color-scheme`)도 조화롭게 매핑했습니다.
  - [App.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/App.tsx)를 `ThemeProvider`로 래핑하여 전 영역으로 범위를 확장하고, 랜딩 페이지의 헤더 및 핵심 섹션(`Hero`, `Features`, `Architecture`, `Footer`)들에 선언되어 있던 `bg-black`, `text-white` 계열의 다크 모드 고정 클래스들을 `bg-white dark:bg-black`, `text-black dark:text-white` 형태의 Tailwind `dark:` 반응형 스타일로 전면 개편했습니다.

### 13. 인증 영역 공통 컴포넌트 분리 리팩토링 (auth/)
- **작업 내용**:
  - 로그인 및 회원가입 페이지에서 중복적으로 구현되어 쓰이던 입력 폼 구조와 인클루시브 카드 레이아웃을 전담할 [AuthCard.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/components/auth/AuthCard.tsx) 및 [AuthInput.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/components/auth/AuthInput.tsx) 공통 인증 컴포넌트군을 신규 생성했습니다.
  - [LoginPage.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/pages/LoginPage.tsx)와 [SignupPage.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/pages/SignupPage.tsx)에 산만하게 흩어져 있던 DOM 뼈대를 이 공통 컴포넌트들을 사용하여 재구축 및 조립함으로써 코드 가독성, 중복성, 재사용 품질을 획기적으로 개선했습니다.
  - 모든 리팩토링 및 폼 이식 이후 `pnpm build`를 정상 가동하여 정적 컴파일 무결성을 확보했습니다.


