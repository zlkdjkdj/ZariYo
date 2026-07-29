# 자리요 (ZariYo) - 차세대 실시간 2D 공간 관제 & 무인 키오스크/테이블 오더 통합 시스템

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.1-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-7.2-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Kakao OAuth](https://img.shields.io/badge/Kakao%20OAuth-2.0-FEE500?style=for-the-badge&logo=kakao&logoColor=black)

**자리요(ZariYo)**는 관리자(매장 오너)가 2D GUI 드래그 앤 드롭 캔버스를 통해 매장 레이아웃과 좌석 배치를 자유롭게 설계하고, 손님은 휴대폰 간편 인증 및 카카오 소셜 로그인을 바탕으로 실시간 2D 공간 예약, 무인 주문 및 결제, 직원 호출 서비스를 통합하여 이용할 수 있는 차세대 풀스택 공간 제어 및 스마트 오더 솔루션입니다.

---

## 1. 프로젝트 상세 소개 및 기획 배경

### 서비스 기획 배경 및 해결하고자 하는 문제 (Pain Points)
전통적인 식음료(F&B) 매장, 공유 오피스, 독서실, 스터디 카페 등 다양한 공간 자원을 운영하는 환경에서는 다음과 같은 고질적인 문제점과 운용상의 비효율성이 존재했습니다.

1. **유연하지 못한 공간 레이아웃 관리 및 높은 변경 비용**:
   - 매장의 인테리어 변경, 팝업 행사, 시즌별 좌석 재배치 발생 시 기존 시스템에서는 엔지니어나 개발자의 도움 없이 도면 데이터를 실시간 수정하기 어려웠습니다.
2. **좌석 선점 중복 및 결제 과정에서의 트랜잭션 충돌**:
   - 동시간대 다수의 사용자가 동일한 좌석을 동시에 선택할 경우, 결제 단계에서 좌석이 겹치거나 데이터 무결성이 깨지는 문제(Race Condition)가 빈번히 발생했습니다.
3. **손님 이용 허들 및 복잡한 회원가입 절차**:
   - 현장 방문 고객에게 아이디와 비밀번호 기반의 회원가입을 요구하는 것은 이용 만족도를 저하시키고 주문 이탈률을 높이는 주요 원인이었습니다.
4. **실시간 관제 및 주문-주방(KDS) 연동의 부재**:
   - 주문 내역과 직원 호출 요청이 매장 관제판에 즉각 반영되지 않아 서빙 지연 및 운영 병목이 발생했습니다.

### 자리요(ZariYo)의 핵심 해결책 (Solutions)
자리요는 이러한 문제점을 극복하기 위해 하이브리드 아키텍처(Redis + MySQL)와 실시간 이원화 웹소켓(WebSocket STOMP) 통신 체계를 도입했습니다.

- **직관적인 2D GUI 공간 건축 마법사**: 마우스 드래그 앤 드롭으로 카운터, 입구, 테이블, 바석 등을 실시간으로 배치 및 수정하고 이를 JSON 좌표 데이터 구조로 변환해 동기화합니다.
- **Redis Redisson 분산 락 기반 5분 임시 선점 시스템**: 동시성 제어 기술을 통해 0.001초 단위의 동시 접근을 제어하고, 선점 성공 시 300초(5분)의 TTL을 부여하여 결제 진행 중 좌석을 안전하게 보호합니다.
- **카카오 OAuth 2.0 소셜 로그인 & 무가입 방문 인증**: 카카오 원클릭 소셜 로그인 및 휴대폰 번호 기반 방문 로그 릴레이 파이프라인을 구축하여 고객 접근성을 극대화했습니다.
- **초강력 JWT 보안 & Silent Refresh 토큰 체계**: Access Token 유효 수명을 30분 단기 토큰으로 단축하여 보안 노출 수명을 최소화하고, Axios Response Interceptor가 7일 수명의 Refresh Token으로 백그라운드 자동 갱신(Silent Refresh)을 수행합니다.

---

## 2. 주요 핵심 기능 상세

### 🔐 카카오 OAuth 2.0 소셜 로그인 & JWT 보안 파이프라인
- **카카오 REST API 연동**: 카카오 인가 코드(Authorization Code) 교환 ➔ 카카오 회원 프로필 수신 ➔ ZariYo DB 회원 자동 가입 및 JWT 발급을 1초 만에 완료합니다.
- **React StrictMode 중복 요청 방지**: React 개발 모드의 컴포넌트 이중 마운트로 인한 1회용 카카오 인가 코드 `401 KOE320` 오류를 `useRef` 가드로 원천 차단합니다.
- **환경변수 100% 격리 보안**: 모든 시크릿 키는 `.env` 및 시스템 환경변수(`${KAKAO_CLIENT_ID}`, `${JWT_SECRET}`)로 분리되어 Git 코드베이스상에 민감 키가 0.1자도 노출되지 않습니다.

### 🗺️ 위치 기반 지오코딩 (Geocoding) 지점 매핑 엔진
- **Google Maps & OpenStreetMap 하이브리드 지오코딩**: 주소 입력 시 0.1초 내에 위도와 경도 좌표(Latitude, Longitude)를 정밀 계산하여 지도 캔버스 카메라를 좌표 중심으로 부드럽게 이동(flyTo)시킵니다.
- **자동 안전 전환(Fallback) 파이프라인**: 환경변수에 Google Maps API 키가 존재할 경우 고해상도 Google Maps 엔진을 가동하며, 키가 미설정되거나 호출 실패 시 CartoDB High Contrast OpenStreetMap 엔진으로 자동 전환되어 예외를 방지합니다.

### 📱 손님 4단계 릴레이 순차 UX (무가입 방문 인증)
- **1단계 (휴대폰 번호 입력)**: 페이지 진입 즉시 0.01초 만에 터치패드 모달이 강제 팝업되어 방문 이력 로그를 남깁니다.
- **2단계 (방문 매장 검색 및 선택)**: 번호 인증 후 방문하고자 하는 매장을 실시간 검색 및 선택합니다. (단, 테이블 QR 코드 스캔 진입 시 매장이 자동 지정되어 3단계로 직행합니다)
- **3단계 (선택 매장 2D 좌석 선점 및 메뉴판)**: 2D 배치도 상에서 좌석을 선택하여 5분 임시 선점 타이머를 가동하고 메뉴 목록을 조회합니다.
- **4단계 (주문 결제 및 직원 호출)**: 주문 데이터를 전송하고, 필요시 얼음물/집기 등의 편의 요소를 실시간 호출합니다.

### 🖼️ 메뉴 이미지 드래그 앤 드롭 (Drag & Drop) 업로더
- **HTML5 Drag & Drop API 및 FileReader 인코딩**: 컴퓨터 탐색기의 사진 파일을 모달 드롭존으로 끌어다 놓으면 자바스크립트 FileReader가 바이너리를 Data URL(Base64)로 인코딩하여 1초 만에 미리보기 렌더링 및 저장을 수행합니다.
- **4원화 입력 방식 지원**: 드래그 앤 드롭 파일 업로드, 클릭 파일 선택, 인터넷 이미지 URL 직접 입력, 추천 이미지 샘플 선택 방식을 모두 제공합니다.

### 🔒 Redis Redisson 분산 락 동시성 제어
- **상호 배제(Mutual Exclusion) 보장**: Redis 분산 락(RLock)을 활용해 동일 좌석에 대한 중복 요청을 원천 차단합니다.
- **자동 데드락 방지**: tryLock(5s, 10s) 타임아웃 설정을 적용해 시스템 장애 시 10초 후 락이 자동 해제되도록 안전장치를 구축했습니다.

### 👑 시스템 어드민 & 사장님 대시보드 관제
- **어드민 회원 관리 대시보드 (`/admin/users`)**: 전체 등록 유저 목록 조회, 사장님/고객 역할 변경, 계정 정지(SUSPENDED) 및 활성화 조치 기능 탑재.
- **사장님 멀티 매장 게이트웨이 (`/owner/stores`)**: 자신이 소유한 여러 매장의 목록 조회, 신규 매장 도면 제작(`/owner/store/new`), 특정 매장 관제 대시보드(`/owner/dashboard`) 진입 게이트웨이 제공.

---

## 3. 기술 스택 및 시스템 아키텍처

### Frontend
- **Core Framework**: React 19, TypeScript, Vite
- **Styling**: Vanilla Tailwind CSS v4, Lucide Icons, Framer Motion
- **Map & Geocoding Engine**: Leaflet OpenStreetMap API, Google Maps JavaScript API
- **Realtime Networking**: @stomp/stompjs, sockjs-client, Axios

### Backend & Infrastructure
- **Core Framework**: Java 17, Spring Boot 3.3.1, Spring Data JPA, Spring Security 6
- **Database Layer**: MySQL 8.0 (Relational Data), Redis 7.2 (Cache & Redisson Distributed Lock)
- **Security & Auth**: OAuth 2.0 (Kakao), JWT (30분 Access Token / 7일 Refresh Token)
- **API Documentation**: OpenAPI 3 (Springdoc Swagger UI)
- **Virtualization**: Docker Compose (MySQL 3306, Redis 6379)

---

## 4. 백엔드 8대 코어 도메인 API 명세

| 도메인 | 주요 엔드포인트 | 상세 설명 |
| :--- | :--- | :--- |
| **Auth (인증/OAuth)** | `POST /api/v1/auth/kakao`, `POST /api/v1/auth/login`, `POST /api/v1/auth/refresh` | 카카오 소셜 로그인, 일반 로그인, 30분 Access Token Silent Refresh |
| **Admin (어드민)** | `GET /api/v1/admin/users`, `PATCH /api/v1/admin/users/{id}/status` | 전역 회원 목록 조회 및 계정 상태/역할 제어 |
| **Store (매장)** | `POST /api/v1/stores`, `GET /api/v1/stores/owner/{id}` | 2D 캔버스 좌표 레이아웃 저장 및 사장님별 매장 정보 조회 |
| **Seat (좌석)** | `GET /api/v1/seats`, `POST /api/v1/seats/reserve` | 실시간 좌석 상태 조회 및 Redis Redisson 5분 임시 선점 |
| **Reservation (예약)**| `POST /api/v1/seats/confirm` | 결제 완료 후 영속 DB(MySQL)에 예약 최종 확정 |
| **Menu (메뉴)** | `GET /api/stores/{id}/categories`, `PUT /api/menus/{id}/sold-out` | 메뉴 카테고리, 항목, 옵션 등록 및 원클릭 실시간 품절 처리 |
| **Order (주문)** | `POST /api/stores/{id}/orders`, `PATCH /api/orders/{id}/status` | 무인 결제 주문 접수 및 KDS 조리/서빙/완료 상태 체인 |
| **StaffCall (직원호출)**| `POST /api/stores/{id}/staff-calls`, `PATCH /api/staff-calls/{id}/resolve`| 편의 서비스 요청 접수 및 관제 조치 완료 처리 |

- **Swagger UI 명세서 접속 주소**: `http://localhost:8080/swagger-ui/index.html`
- **ERD Cloud 상세 DB 설계도**: [ERD Cloud 실시간 상세 설계도 링크](https://www.erdcloud.com/d/U9aEisdM)

---

## 5. 프로젝트 폴더 구조

```
ZariYo/
├── ZariYo-FrontEnd/         # React 19 + Vite + TypeScript 프론트엔드
│   ├── src/
│   │   ├── api/            # REST API 통합 클라이언트 (index.ts 모듈화)
│   │   ├── components/     # 지오코딩 지도, Drag&Drop 업로더, 모달, 2D 캔버스
│   │   ├── hooks/          # useWebSocket, useStoreBuilder, useDashboard
│   │   └── pages/          # 랜딩, 어드민, 사장님 대시보드, 손님 예약/키오스크
├── ZariYo-BackEnd/          # Spring Boot 3.3.1 백엔드
│   ├── src/main/java/com/zariyo/
│   │   ├── domain/         # user, store, seat, reservation, menu, order, staffcall
│   │   └── global/         # Security 6, JWT, Redisson, WebSocket STOMP, Exception
│   └── .env                # 백엔드 시크릿 환경변수 (Git 추적 제외)
├── study-notes/             # 일자별 기술 학습 노트 (2026-07-07 ~ 2026-07-29)
├── docker-compose.yml       # MySQL 8.0 & Redis 7.2 로컬 가상화 컨테이너
├── work.md                  # 전체 마일스톤 및 개발 일지
└── trouble.md               # 문제 해결 및 트러블슈팅 이력 (40개 항목)
```

---

## 6. 빠른 시작 가이드 (Quick Start)

### 1. 백엔드 시크릿 환경변수 (`ZariYo-BackEnd/.env`) 작성
```env
KAKAO_CLIENT_ID=your_kakao_rest_api_key
KAKAO_CLIENT_SECRET=your_kakao_client_secret
KAKAO_REDIRECT_URI=http://localhost:5173/auth/kakao/callback
JWT_SECRET=your_custom_jwt_secret_key_base64
```

### 2. 백엔드 인프라 (MySQL & Redis) 구동
```bash
docker-compose up -d
```

### 3. 백엔드 Spring Boot 서버 구동
```bash
cd ZariYo-BackEnd
./gradlew bootRun
```

### 4. 프론트엔드 개발 서버 구동
```bash
cd ZariYo-FrontEnd
pnpm install
pnpm run dev
```
