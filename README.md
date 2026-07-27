# 🏪 자리요 (ZariYo) - 차세대 실시간 2D 공간 관제 & 무인 키오스크/테이블 오더 통합 시스템

**자리요(ZariYo)**는 관리자(사장님)가 2D GUI 드래그 앤 드롭 캔버스를 통해 매장 레이아웃과 좌석 배치를 자유롭게 빌딩하고, 손님은 휴대폰 간편 인증을 통해 실시간 2D 공간 예약, 무인 주문 및 결제, 직원 호출 서비스를 원스톱으로 이용할 수 있는 **풀스택 공간 제어 & 스마트 오더 솔루션**입니다.

---

## 🌟 프로젝트 핵심 차별화 & 주요 기능

### 🗺️ 1. 위치 기반 지오코딩(Geocoding) 지점 매핑 엔진
- **Google Maps & OpenStreetMap 자동 스위처 지오코딩**: 주소 입력 시 0.1초 반응하여 위경도 좌표(`lat, lng`)를 계산하고 캔버스 카메라를 부드럽게 이동(`flyTo`).
- **안전한 자동 Fallback 파이프라인**: `.env` 환경변수에 Google API 키가 설정되어 있으면 고해상도 Google Maps 엔진으로 가동되고, 미설정 시 CartoDB High Contrast OpenStreetMap 엔진으로 안전하게 자동 전환.

### 📱 2. 손님 4단계 릴레이 순차 UX (가입 절차 전면 제거)
- **복잡한 아이디/비밀번호 가입 삭제**: 손님의 허들을 줄이기 위해 가입 절차를 전면 제거하고 휴대폰 번호 간편 방문 인증 도입.
- **[1단계: 휴대폰 번호 입력] ➔ [2단계: 방문 매장 검색 & 선택] ➔ [3단계: 선택 매장 2D 좌석 & 5분 분산 락] ➔ [4단계: 주문 결제 & 직원 호출]** 릴레이 연결. (QR 스틱 스캔 시 매장이 자동 지정되어 3단계로 직행)

### 🖼️ 3. 메뉴 이미지 드래그 앤 드롭 (Drag & Drop) 파일 업로더
- **HTML5 Drag & Drop API & FileReader 인코딩**: 내 PC 탐색기에서 메뉴 이미지 파일(JPG, PNG, WEBP 등)을 드래그해서 모달로 던지면 `FileReader`가 1초 만에 Base64 Data URL로 즉시 변환하여 미리보기 렌더링 및 저장.
- **다양한 업로드 방식 병행**: 드래그 앤 드롭 파일 업로드 / 클릭 파일 선택 / 인터넷 이미지 URL 주소 직접 입력 / 추천 샘플 선택 4가지 방식 지원.

### 🔒 4. Redis Redisson 분산 락(Distributed Lock) 동시성 제어
- **5분 임시 선점 시스템 (`300초 TTL`)**: 동일 좌석에 0.001초 차로 다수의 사용자가 접근할 때 Redis Redisson `RLock`으로 트랜잭션 충돌을 원천 차단하고 결제 진행 중 좌석을 5분간 안전하게 보호.
- **자동 데드락 방지**: `tryLock(5s, 10s)` 옵션으로 시스템 장애 시 10초 후 락이 자동 해제되도록 안전장치 구축.

### ⚡ 5. WebSocket STOMP 실시간 양방향 알림
- **사장님 대시보드 ➔ 주방 KDS ➔ 손님 화면 초단위 연동**: 주문 접수, 조리 시작, 서빙 완료, 직원 호출 내역이 웹소켓 STOMP 채널(`/sub/orders`, `/sub/calls`)을 타고 실시간 알림 팝업 및 상태 변화 반영.

---

## 🛠️ 기술 스택 & 시스템 아키텍처

### 🖥️ FrontEnd
- **Framework**: React 19, TypeScript, Vite
- **Styling & UI**: Vanilla Tailwind CSS v4, Lucide Icons, Framer Motion
- **Map & Geocoding**: Leaflet OpenStreetMap API, Google Maps JavaScript API
- **Realtime**: `@stomp/stompjs`, `sockjs-client`

### ⚙️ BackEnd & Infrastructure
- **Framework**: Java 17, Spring Boot 3.x, Spring Data JPA, Spring Security
- **Database**: MySQL 8.0 (Relational Data), Redis (Cache & Redisson Distributed Lock)
- **Auth**: JWT (JSON Web Token) Access/Refresh Token
- **API Spec**: OpenAPI 3 (Springdoc Swagger UI)
- **Container**: Docker Compose (MySQL 3306, Redis 6379)

---

## 📐 백엔드 7대 코어 도메인 API 명세

| 도메인 | 주요 역할 & 엔드포인트 | 상세 설명 |
| :--- | :--- | :--- |
| **User (회원)** | `POST /api/v1/auth/signup`, `POST /api/v1/auth/login` | 사장님/손님 회원가입, JWT 토큰 발급 및 보안 인증 |
| **Store (매장)** | `POST /api/v1/stores`, `GET /api/v1/stores/owner/{id}` | 2D 캔버스 좌표 레이아웃 저장 및 사장님별 매장 정보 조회 |
| **Seat (좌석)** | `GET /api/v1/seats`, `POST /api/v1/seats/reserve` | 실시간 좌석 상태 조회 및 Redis Redisson 5분 임시 선점 |
| **Reservation (예약)**| `POST /api/v1/seats/confirm` | 결제 완료 후 영속 DB(MySQL)에 예약 최종 확정 |
| **Menu (메뉴)** | `GET /api/stores/{id}/categories`, `PUT /api/menus/{id}/sold-out` | 메뉴 카테고리, 항목, 옵션 등록 및 원클릭 실시간 품절 처리 |
| **Order (주문)** | `POST /api/stores/{id}/orders`, `PATCH /api/orders/{id}/status` | 무인 결제 주문 접수 및 KDS 조리/서빙/완료 상태 체인 |
| **StaffCall (직원호출)**| `POST /api/stores/{id}/staff-calls`, `PATCH /api/staff-calls/{id}/resolve`| 물/앞치마/집기 등 손님 편의 요청 접수 및 관제 조치 완료 |

- 🔗 **Swagger UI 실시간 명세서**: `http://localhost:8080/swagger-ui/index.html`
- 🔗 **ERD Cloud 상세 DB 설계도**: [ERD Cloud 실시간 상세 설계도 링크](https://www.erdcloud.com/d/U9aEisdM)

---

## 📁 프로젝트 폴더 구조

```
ZariYo/
├── ZariYo-FrontEnd/         # React + Vite + TypeScript 프론트엔드
│   ├── src/
│   │   ├── api/            # REST API 통신 클라이언트 (Axios)
│   │   ├── components/     # 지오코딩 지도, Drag&Drop 업로더, 모달, 2D 캔버스
│   │   ├── hooks/          # useWebSocket, useStoreBuilder, useDashboard
│   │   └── pages/          # 랜딩, 사장님 대시보드, 손님 예약/키오스크
├── ZariYo-BackEnd/          # Spring Boot 3.x 백엔드
│   ├── src/main/java/com/zariyo/
│   │   ├── domain/         # user, store, seat, reservation, menu, order, staffcall
│   │   └── global/         # Security, JWT, Redisson, WebSocket STOMP, Exception
├── study-notes/             # 일자별 기술 학습 노트 (2026-07-10, 07-13, 07-27)
├── docker-compose.yml       # MySQL 8.0 & Redis 6.2 로컬 가상화 컨테이너
├── work.md                  # 전체 마일스톤 및 개발 일지 (104개 항목)
└── trouble.md               # 문제 해결 및 트러블슈팅 이력
```

---

## 🚀 빠른 시작 가이드 (Quick Start)

### 1. 백엔드 인프라 (MySQL & Redis) 구동
```bash
# Docker Compose 백그라운드 구동
docker-compose up -d
```

### 2. 백엔드 Spring Boot 서버 구동
```bash
cd ZariYo-BackEnd
./gradlew bootRun
```

### 3. 프론트엔드 개발 서버 구동
```bash
cd ZariYo-FrontEnd
pnpm install
pnpm run dev
```
- 브라우저 접속: `http://localhost:5173` (손님용: `/reserve`, 사장님용: `/owner/dashboard`)
