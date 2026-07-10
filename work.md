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

### 14. 로그인/회원가입 시점의 역할 분기 및 사장님 콘솔 리팩토링
- **작업 내용**:
  - **인증 화면 역할 분기 UI 이식**: [LoginPage.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/pages/auth/LoginPage.tsx)와 [SignupPage.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/pages/auth/SignupPage.tsx) 폼 상단에 애플/토스 풍의 세련된 캡슐 탭 전환 스위치를 도입했습니다.
  - **리다이렉트 경로 이원화**: 손님 로그인 시 좌석 예약 화면 목업인 `/reserve`로 바로 진입하며, 사장님 로그인 시에는 관리자 콘솔인 `/owner` 페이지로 연결되도록 비즈니스 로직을 이원화 설계했습니다.
  - **사장님 시작 페이지 슬림화**: 기존 [StartPage.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/pages/StartPage.tsx)에 있던 손님/사장님 역할 선택 1단계를 전면 제거하여 사장님 전용 행동 게이트웨이로 다듬었습니다.
  - **Start 공통 컴포넌트 폴더 분리**: 사장님 전용 콘솔 행동 카드를 담을 [StartCard.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/components/start/StartCard.tsx)와 공통 프레임 레이아웃인 [StartLayout.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/components/start/StartLayout.tsx)를 신설하고 조립함으로써 코드 재사용성과 폴더 구조 정합성을 최적화했습니다.
  - **워크플로우 검증용 목업 페이지 추가**: `/reserve`, `/owner/store/new`, `/owner/dashboard`로의 자연스러운 페이지 전환을 유도하기 위해, 미려한 미니멀 디자인과 뒤로 가기 링크를 담은 안내용 [MockPages.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/pages/MockPages.tsx)를 완성해 임시 라우터와 병합했습니다.
  - **빌드 및 타입 무결성 검증**: verbatimModuleSyntax 타입 소거 정책에 부합하는 `type-only import` 수정 조치 등을 통해 `pnpm build` 번들 빌드를 완벽히 통과시켰습니다.

### 15. 사장님 매장 빌더(Store Builder) 및 실시간 운영 대시보드(Dashboard) 연동
- **작업 내용**:
  - **매장 빌더 가이드 폼 및 드래그 앤 드롭 캔버스 구축**: [StoreBuilderPage.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/pages/owner/StoreBuilderPage.tsx)을 생성하여 매장 기본 정보 입력 마법사(Wizard)와 마우스 드래그를 이용해 2인석/4인석/바 테이블/카운터/출입구 등 가구를 배치할 수 있는 그리드 캔버스를 구현했습니다.
  - **격자 스냅 및 속성 편집**: 20px 단위 격자 스냅(Grid Snap) 정렬 및 선택 가구 속성(식별 번호, 예약 가능 여부, 5분 선점 대상 지정) 편집 양방향 데이터 연동을 추가하고 `localStorage`에 데이터 영속화를 지원하도록 구축했습니다.
  - **실시간 모니터링 대시보드 개발**: [DashboardPage.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/pages/owner/DashboardPage.tsx)를 통해 저장된 좌석 배치 데이터를 실시간 렌더링하고, 현재 사용 현황을 색상으로 보여주는 라이브 맵을 완성했습니다. 테이블 클릭 시 인라인 제어 팝업으로 수동 상태 갱신이 가능합니다.
  - **임시 선점 타이머 및 예약 목록 관리**: 5분 임시 점유의 1초 단위 실시간 카운트다운 타이머 루프를 설계하여 1분 미만 시 적색 경고 펄스 전환 및 만료 시 자동 좌석 비움 롤백을 제어합니다. 대기 예약자의 입정 완료 및 노쇼 수동 조치 기능도 결합했습니다.
  - **실시간 스트리밍 로그 및 라우팅 병합**: 모든 동작 시각에 대응하는 한 줄 로그 스트리밍을 대시보드 하단에 연동하였고, [App.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/App.tsx)의 라우터 매핑을 목업에서 신규 개발된 페이지 컴포넌트로 정상 전환 후 `pnpm build` 무결성을 검증하였습니다.

### 16. 전체 코드 아키텍처 개선 및 관심사 분리 리팩토링
- **작업 내용**:
  - **도메인 공통 타입 중앙 집중화**: [store.ts](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/types/store.ts) 타입을 신설하여 여러 모듈이 참조하던 코어 데이터 구조(`StoreInfo`, `PlacedElement`, `TempOccupiedItem`, `ReservationItem`)를 일원화 격리하고, [StoreBuilderPage.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/pages/owner/StoreBuilderPage.tsx)와 대시보드에서 이를 일괄 참조하도록 구조를 리팩토링했습니다.
  - **대시보드 상태 및 비즈니스 로직 분리**: [DashboardPage.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/pages/owner/DashboardPage.tsx)에 집약되어 있던 타이머 작동 훅, KPI 실시간 계산기, 수동 상태 제어 흐름, 예약 입정/노쇼 트랜잭션, 스트리밍 타임라인 로그 적재 로직을 신규 작성한 커스텀 훅 [useDashboard.ts](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/hooks/useDashboard.ts)로 완벽히 추출 완료하였습니다.
  - **컴포넌트 복잡도 축소**: 비즈니스 코드가 배제된 대시보드 페이지 컴포넌트는 오직 HSL 테마 렌더링과 격자 레이아웃 구성에만 집중하게 슬림화하여 가독성을 비약적으로 향상시켰습니다.
  - **데드 코드 정리**: 새로 구현된 실제 페이지들로 대체된 구 목업 컴포넌트들을 [MockPages.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/pages/MockPages.tsx) 파일에서 완전히 삭제하여 코드 정합성을 다듬었습니다.
  - **정적 무결성 검증**: 중복 정의된 임시 예약 함수 정리 및 타입 임포트 룰 조정을 거쳐 `pnpm build` 번들 빌드를 에러 없이 성공 완료했습니다.

### 17. 사장님 핵심 페이지 컴포넌트 분할 폴더 구조화 및 조립 리팩토링
- **작업 내용**:
  - **매장 빌더 하위 컴포넌트 5종 분리**: [StoreBuilderPage.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/pages/owner/StoreBuilderPage.tsx) 내부에 산재하던 뷰들을 [components/owner/builder/](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/components/owner/builder/) 하위에 `StoreInfoForm.tsx` (기본 정보 폼), `StoreMapGuide.tsx` (지도 프리뷰), `AssetSidebar.tsx` (가구 템플릿), `BuilderCanvas.tsx` (정렬 캔버스), `PropertyPanel.tsx` (속성 편집창)의 5개 전담 컴포넌트로 분리 생성하였습니다.
  - **실시간 대시보드 하위 컴포넌트 5종 분리**: [DashboardPage.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/pages/owner/DashboardPage.tsx) 내부의 마크업들을 [components/owner/dashboard/](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/components/owner/dashboard/) 하위에 `DashboardKpi.tsx` (KPI 요약 카드), `DashboardCanvas.tsx` (라이브 테이블 맵), `TempOccupiedList.tsx` (카운트다운 타이머 목록), `ReservationList.tsx` (예약 제어 리스트), `TimelineLogs.tsx` (터미널 쉘 로그)의 5개 전담 컴포넌트로 분리 생성하였습니다.
  - **엔트리 페이지 경량화 및 조립**: 기존 페이지 컴포넌트들(`StoreBuilderPage`, `DashboardPage`)은 비즈니스 상태 훅과 드래그 연산 상태만 통제하며, 새로 신설한 10종의 모듈 컴포넌트를 들고 와 조립 렌더링하는 형태로 뼈대를 대폭 간결화했습니다.
  - **컴파일 무결성 검증**: 분할된 서브 컴포넌트 간 Props 데이터 터널링 및 타입 임포트 룰 교정을 완료하고 `pnpm build` 컴파일 무결성을 입증했습니다.

### 18. 랜딩 페이지 전용 컴포넌트 폴더 분리 격리 및 임포트 정리
- **작업 내용**:
  - **랜딩 컴포넌트 전용 폴더 신설**: [components/landing/](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/components/landing/) 폴더를 새로 만들고, 랜딩 뷰에서만 종속적으로 이용되던 `Header.tsx`, `Hero.tsx`, `Features.tsx`, `Architecture.tsx`, `Footer.tsx` 5종을 이관하였습니다.
  - **경로 보정 및 레거시 삭제**: `Header.tsx` 내부의 테마 관리 콘텍스트 상대 참조 수준을 `../../context/ThemeContext`로 정합하였고, [LandingPage.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/pages/LandingPage.tsx) 상단의 임포트 경로를 갱신 완료했습니다. 이후 `components/` 최상위에 남아있던 구 파일 5종을 완전히 제거하여 폴더 청결도를 개선했습니다.
  - **무결성 검사**: `pnpm build`를 구동해 파일 삭제 및 경로 변경 전후의 모듈 참조 안정성을 검증 완료했습니다.

### 21. 전체 디자인 테마 미니멀리즘(Monochrome & Sharp Corners) 대개편
- **작업 내용**:
  - **곡률 통일 및 1px 보더 라인화**: 전체 코드베이스의 둥글둥글한 곡률(`rounded-3xl`/`rounded-2xl`)을 직각형에 가까운 `rounded-lg` (8px 카드) 및 `rounded-md` (6px 버튼/입력창)로 전면 직선화하고, 입체적 음영 그림자(`shadow-xl`/`shadow-2xl`)를 일괄 제거하여 평면 1px 단색 선 테두리(`border-neutral-200` / `dark:border-neutral-900`) 중심의 세련된 UI로 변경했습니다.
  - **시각 피로도 소거**: 배경에 번져 있던 네온 블루 그라데이션 글로우 백그라운드를 차단하여 판독성을 향상시켰습니다.
  - **정적 번들 용량 경량화**: Tailwind 클래스 최적화 및 미사용 데코레이터 소거를 통해 빌드 시 최종 CSS 번들 용량을 약 9kB(59.09kB ➔ 50.14kB) 가량 극적으로 경량화시켰습니다.
  - **무결성 검증**: `pnpm build` 컴파일 무결성을 입증 완료했습니다.


### 19. 랜딩 페이지 히어로 배너 CTA 버튼 라우팅 액션 추가
- **작업 내용**:
  - **라우팅 기능 이식**: [Hero.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/components/landing/Hero.tsx) 상단에 React Router의 `useNavigate` 훅을 결합하였습니다.
  - **버튼 링크 매핑**: "실시간 좌석 배치도 보기" 버튼 클릭 시 손님 예약 목업 뷰인 `/reserve`로 연결되고, "관리자 대시보드 진입" 버튼 클릭 시 사장님 게이트웨이 화면인 `/owner`로 정상 리다이렉트되도록 매핑했습니다.
  - **무결성 검증**: 빌드를 돌려 타입 안정성을 체크하였습니다.

### 20. 이용안내 가이드 페이지 추가 및 헤더 네비게이션 연결
- **작업 내용**:
  - **이용안내 화면 신설**: [AboutPage.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/pages/AboutPage.tsx) 가이드 페이지를 새로 제작하여, 5분 점유/2D 그리드 드래그 스냅 빌더/분산 락 매커니즘 등의 내용을 FAQ 아코디언 컴포넌트와 설명 카드 형태로 상세하게 작성했습니다.
  - **라우터 매핑 등록**: [App.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/App.tsx) 규칙에 `/about` 경로와 `AboutPage` 매핑을 완료하였습니다.
  - **헤더바 링크 수정**: [Header.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/components/landing/Header.tsx)의 `이용 안내` 메뉴 앵커 태그를 리액트 라우터의 `<Link to="/about">` 태그로 수정하여 연결했습니다.
  - **컴파일 검증**: `pnpm build`를 성공하여 에러 없이 빌드가 정상 가동됨을 확인했습니다.

## [2026-07-09]

### 22. 프론트엔드 전체 디자인 개편 및 테마 연동, 손님 예약 페이지 실체화
- **작업 내용**:
  - **테마 시스템(Light/Dark) 전면 연동**: 기존에 다크 모드로 하드코딩 되어 있던 로그인(`LoginPage`), 회원가입(`SignupPage`), 매장 기본 설정(`StartPage`), 그리고 공통 카드/인풋 컴포넌트(`AuthCard`, `AuthInput`, `StartLayout`, `StartCard`)들에 `bg-white dark:bg-black`, `text-neutral-900 dark:text-[#f5f5f7]` 등 반응형 스타일을 이식하여 완벽한 테마 토글 전환을 지원합니다.
  - **시네마틱 프리미엄 크림슨(Premium Crimson) & 글래스모피즘(Glassmorphism) 이식**: 기존의 투박하고 어두운 젯블랙의 직각 코너 디자인을 Toss/Apple 스타일의 부드러운 코너 곡률(`rounded-2xl` / `rounded-3xl`), 고급스러운 크림슨 레드 그라데이션, 백그라운드 블러 효과로 대개편했습니다.
  - **손님 실시간 예약 2D 화면 실제 구현**: `MockPages.tsx`에 방치되어 있던 공사 중 목업 안내판을 제거하고, 사장님이 설계한 좌석 배치 데이터를 불러와 2D 도면으로 렌더링하는 고객 예약 진입점 [ReservePage.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/pages/customer/ReservePage.tsx)를 완벽 구현했습니다.
  - **크로스 탭 실시간 예약 상태 동기화**: 브라우저의 `storage` 및 `storage_sync` 이벤트를 감지하여, 한 화면(고객 예약 탭)에서 좌석을 임시 선점/확정하면 다른 탭(사장님 대시보드)에 즉시 실시간으로 반영되는 데이터 동기화 파이프라인을 이식했습니다.
  - **로그인 역할별 리다이렉트 버그 수정**: `LoginPage.tsx`에서 손님(`customer`) 역할 로그인 시 사장님 대시보드로 가던 오작동 오류를 `/reserve` 예약 신청 화면으로 가도록 정합했습니다.
  - **Vite CSS 빌드 경고 제거**: `index.css`의 `@import` 선언 순서 위반으로 인한 경고를 수정하여 빌드 프로세스를 완벽히 정적 정합시켰습니다.

### 23. 토스 블루(`#3182f6`) 브랜딩 및 가독성 극대화 화이트 모드 디자인 전면 개편
- **작업 내용**:
  - **디자인 컨셉 토스 & 애플 스타일 변경**: 기존 넷플릭스 크림슨 레드의 강한 원색 중심 디자인을 탈피하고, 신뢰감을 주는 **토스 블루(`#3182f6`)**와 극도로 깔끔하고 차분한 파스텔 상태 배지(soft emerald, soft red, soft amber) 디자인을 전체 코드베이스에 전면 이식했습니다.
  - **화이트 모드(Light Mode) 가독성 극대화**: 라이트 모드의 배경을 부드러운 화이트 `#f9fafb`(토스 연그레이) 및 `#ffffff`로 설계하여 텍스트 번짐 현상을 원천 방지하고, 메인 글씨 색상을 `#191f28`(토스 딥블랙)로 조절하여 렌더링 명도를 극대화했습니다.
  - **랜딩 및 인증/게이트웨이 페이지 개편**: 헤더([Header.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/components/landing/Header.tsx)), 히어로([Hero.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/components/landing/Hero.tsx)), 게이트웨이([StartLayout.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/components/start/StartLayout.tsx), [StartCard.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/components/start/StartCard.tsx)), 공통 폼([AuthCard.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/components/auth/AuthCard.tsx), [AuthInput.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/components/auth/AuthInput.tsx)), 로그인/회원가입([LoginPage.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/pages/auth/LoginPage.tsx), [SignupPage.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/pages/auth/SignupPage.tsx))의 모든 로고, 그라데이션 백그라운드 아우라, 보더, 체크박스 및 전송 버튼들을 토스 블루 테마로 수정했습니다.
  - **예약 신청 및 대시보드 관제 개편**: 손님 예약 페이지([ReservePage.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/pages/customer/ReservePage.tsx)), 사장님 관제판([DashboardPage.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/pages/owner/DashboardPage.tsx)) 및 대시보드 하위 컴포넌트 5종(`DashboardCanvas`, `DashboardKpi`, `TempOccupiedList`, `ReservationList`, `TimelineLogs`) 내의 좌석 점유 상태 색상(사용중, 선점대기, 예약됨, 공석)을 파스텔 배지 기반으로 개편하고, 2D 배치도 내 텍스트/테두리의 명도 대조를 대폭 상향했습니다.
  - **매장 빌더 요소 개편**: [BuilderCanvas.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/components/owner/builder/BuilderCanvas.tsx) 요소 배치 그리드 내의 선택 보더 스킴 및 아이콘들을 토스 블루 스타일로 변경했습니다.
  - **빌드 및 린터 검증 완료**: `pnpm run lint` 및 `pnpm run build`를 완벽히 통과하여 타입 안정성과 정적 파일 무결성을 재검증했습니다.

### 24. index.css 구문 오류 수정 (Base 레이어 닫는 중괄호 추가)
- **작업 내용**:
  - `index.css`의 `@layer base` 내부 스타일 변경 작업 도중 파일 맨 마지막에 누락되었던 닫는 중괄호(`}`)를 정상적으로 추가하여 빌드 컴파일 오류를 완전히 해결했습니다.

### 25. 랜딩 페이지 하위 컴포넌트(Features, Architecture, Footer) 전면 테마화 및 토스 블루 개편
- **작업 내용**:
  - **테마 미지원 컴포넌트 발굴 및 전면 개편**: 랜딩 페이지 하위 영역 중 어두운 색상(`bg-black`)으로 고정 코딩되어 있어 화이트 모드 전환이 온전히 적용되지 않던 특징 목록([Features.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/components/landing/Features.tsx)), 아키텍처 다이어그램([Architecture.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/components/landing/Architecture.tsx)), 카피라이트 풋터([Footer.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/components/landing/Footer.tsx))를 반응형 테마 구조(`bg-white dark:bg-[#101012]`)로 전격 개선했습니다.
  - **토스 블루 테마 및 명도 보완**: 각 컴포넌트의 넷플릭스 크림슨 레드 브랜딩 아이콘, 배지, 다이어그램 경계선들을 토스 블루(`#3182f6`) 스타일로 일원화하고, 라이트 모드 텍스트 컬러(`#191f28`, `#4e5968`) 명도를 보완하여 가독성을 극대화시켰습니다.

### 26. 사장님 기본 진입 페이지 및 매장 배치 빌더 화면 컴포넌트 전체 테마 일치 개편
- **작업 내용**:
  - **사장님 게이트웨이 개편**: [StartPage.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/pages/StartPage.tsx) 내의 붉은 뱃지 하이라이트를 토스 블루로 정합하고 제목/설명 등의 텍스트 가독성을 최대로 높였습니다.
  - **매장 빌더 마법사(Wizard) 폼 개편**: [StoreBuilderPage.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/pages/owner/StoreBuilderPage.tsx) 내 단계 헤더 및 뒤로가기 버튼들의 붉은 톤을 토스 블루로 변경하고, [StoreInfoForm.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/components/owner/builder/StoreInfoForm.tsx) 내의 모든 상세 입력창(매장명, 주소, 시간 설정) 스타일을 반응형 테마 분기로 수정해 화이트 모드 가독성을 개선했습니다.
  - **위치 프리뷰 및 속성 제어창 개편**: [StoreMapGuide.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/components/owner/builder/StoreMapGuide.tsx) 지도 핀과 [PropertyPanel.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/components/owner/builder/PropertyPanel.tsx) 요소 설정 영역, 그리고 가구 템플릿 목록 컴포넌트인 [AssetSidebar.tsx](file:///home/jaehyeon/바탕화면/portfolio/ZariYo/ZariYo-FrontEnd/src/components/owner/builder/AssetSidebar.tsx) 버튼과 체크박스들을 모두 토스 블루와 화이트모드 규격으로 개편했습니다.

### 27. 백엔드 로컬 DB 인프라 구축 (Docker Compose) 및 application.yml 세팅
- **작업 내용**:
  - **Docker Compose 세팅**: `docker-compose.yml` 파일을 작성하여 MySQL(포트 3306)과 Redis(포트 6379) 컨테이너를 가상 환경에서 실행 가능하도록 세팅했습니다. 이를 통해 로컬 환경의 복잡한 설치 과정 없이 격리된 DB 환경을 구성했습니다. (비용 효율적 배포를 위한 기초 단계)
  - **Spring Boot 환경설정 연결**: `ZariYo-BackEnd/src/main/resources/application.yml` 파일 내 데이터소스(`datasource`)에 새로 생성한 MySQL 컨테이너 연결 정보(`zariyo_db`, `zariyo`)를 매핑하고, Redis 세션 포트를 연동하여 JPA 및 캐시 엔진 활성화 기반을 다졌습니다.

### 28. 디자인 시스템 공통 UI 컴포넌트(Phase 2) 추출
- **작업 내용**:
  - `Button`, `Input`, `Card` 공통 컴포넌트를 `src/components/ui/` 하위에 추출하여 재사용성과 유지보수성을 극대화했습니다.
  - `Button` 컴포넌트는 `framer-motion`을 사용하여 호버 및 탭 애니메이션을 내장하고 다양한 variant(primary, secondary 등)를 지원하도록 구현했습니다.
  - `Input` 컴포넌트는 Zod 기반 에러 메시지를 애니메이션과 함께 출력할 수 있도록 구성했습니다.
  - `Card` 컴포넌트는 Glassmorphism을 지원하도록 옵션을 추가했습니다.

### 29. UX 및 프레임워크 애니메이션(Phase 3) 이식
- **작업 내용**:
  - **페이지 트랜지션**: `StartLayout.tsx`의 `main` 태그를 `framer-motion`의 `motion.main`으로 교체하여 페이지 진입 시 부드러운 페이드 인(Fade In) 애니메이션을 적용했습니다.
  - **리스트 Stagger 애니메이션**: `Dashboard`의 `ReservationList`와 `TempOccupiedList` 내부 항목들이 순차적으로 나타나는 Stagger 애니메이션을 `framer-motion`의 `variants`를 통해 구현했습니다.

### 30. 핵심 페이지(Auth, Builder) 리팩토링 및 훅 분리(Phase 4)
- **작업 내용**:
  - **Auth 폼 고도화**: `LoginPage.tsx`와 `SignupPage.tsx`에 `react-hook-form`과 `@hookform/resolvers/zod`를 적용하여 선언적이고 강력한 폼 유효성 검사 로직을 구축했습니다.
  - **비즈니스 로직 훅 분리**: `StoreBuilderPage.tsx`의 방대한 상태 관리 및 드래그 앤 드롭 로직을 `useStoreBuilder.ts` 커스텀 훅으로 완전 분리하여, 뷰 컴포넌트와 비즈니스 로직의 결합도를 낮추었습니다.
