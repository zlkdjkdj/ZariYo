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
