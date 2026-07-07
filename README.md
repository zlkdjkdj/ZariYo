# 자리요 (ZariYo) - 스마트 오피스/도서관 통합 예약 및 모니터링 시스템

자리요(ZariYo)는 관리자가 직접 GUI 캔버스를 통해 실시간으로 매장이나 공간의 레이아웃 배치를 구성 및 관리하고, 사용자가 실시간으로 좌석을 예약 및 모니터링할 수 있는 차세대 공간 제어 솔루션입니다.

---

## 1. 프로젝트 소개 & 기대 효과

### 💡 서비스 기획 배경
현대의 공유 오피스, 독서실, 스터디 카페, 대학 도서관 등 다양한 공간 자원의 이용률이 극대화됨에 따라 좌석 선점 문제나 중복 예약, 그리고 유연하지 못한 좌석 배치 관리 등의 페인 포인트가 지속해서 발생하고 있습니다. 

자리요는 **실시간 동시성 보장**과 **시각화된 직관적 GUI 관리 시스템**을 제공하여, 자원 관리의 자동화와 혁신적인 공간 경험을 구현하고자 기획되었습니다.

### 🌟 기대 효과
1. **관리자 생산성 향상**
   - 드래그 앤 드롭 형태의 직관적인 GUI 편집 툴을 활용해, 현장의 변경 사항을 개발자나 엔지니어의 도움 없이 실시간으로 즉시 매장 배치에 반영할 수 있습니다.
2. **고객 편의성 극대화**
   - 실시간 좌석 현황을 한눈에 정확히 파악할 수 있으며, **Redis 기반 5분 임시 선점 시스템**을 적용해 결제 처리 중 다른 유저에게 좌석을 뺏기는 불쾌한 경험을 완벽히 방지합니다.
3. **실시간 관제 및 가동률 분석**
   - 웹소켓(WebSocket) 및 SSE를 기반으로 초 단위의 실시간 공간 활용 현황을 관제하고, 누적 통계 데이터를 활용하여 요일/시간별 공간 가동 효율을 파악할 수 있습니다.

---

## 2. 주요 핵심 기능

### ⚙️ 공통 기능
* **실시간 공간 배치도 편집**: 매장 레이아웃 변경 시 관리자 캔버스를 통해 마우스 조작만으로 좌석 이동 및 신규 구획 설정을 실시간 동기화.
* **실시간 모니터링 관제**: 실시간 초단위 좌석 상태(공석, 선점중, 사용중) 관제.

### 📅 좌석 예약 모드 (스마트 오피스/도서관 전용)
* **5분 임시 선점 프로세스**: 좌석 선택 시 트랜잭션 충돌 방지를 위해 5분간 Redis 임시 선점 설정.
* **예약 만료 자동화**: 임시 선점 상태에서 5분 내 결제 혹은 이용 확정이 완료되지 않을 시 대기열 차단 없이 자동 반납 처리.

### 🍽️ 테이블 주문 모드 (식음료/F&B 매장 연동 전용)
* **테이블 QR 스마트 체크인**: 테이블별 고유 QR 코드 매핑을 이용해 모바일 현장 체크인 및 모바일 자동 주문 처리 연동.

---

## 3. 기술 스택 & 시스템 아키텍처

### 🛠️ Frontend
- React 19 / TypeScript / Tailwind CSS v4 / Vite
- 상태 관리 및 실시간 연동: Lucide Icons, React Router DOM 등

### 🛠️ Backend & Infrastructure (협업 아키텍처 설계)
- Java / Spring Boot / JPA (Hibernate)
- MySQL / Redis (Redisson 분산 락 탑재)
- Docker / Nginx / WebSocket

### 🔗 ERD 구조
- 자리요 프로젝트의 데이터베이스 엔티티 설계 내역은 아래 링크를 통해 상시 조회 가능합니다.
- 👉 [ERD Cloud 실시간 상세 설계도 링크](https://www.erdcloud.com/d/U9aEisdM)

---

## 4. 핵심 API 명세서

대규모 동시성 제어가 탑재된 자리요의 4가지 핵심 공간 제어 API 명세입니다.

### 📋 1. 전체 좌석 상태 조회
매장의 실시간 모든 좌석 목록 및 점유 만료 기한을 조회합니다.

- **HTTP Method**: `GET`
- **Endpoint**: `/api/v1/seats`

**Response (`200 OK`)**:
```json
[
  {
    "id": 1,
    "x": 100,
    "y": 150,
    "type": "SINGLE_SEAT",
    "status": "AVAILABLE",
    "expiresAt": null
  },
  {
    "id": 2,
    "x": 200,
    "y": 150,
    "type": "MEETING_ROOM",
    "status": "HELD_TEMPORARY",
    "expiresAt": "2026-07-07T21:12:00"
  }
]
```

### 📋 2. 좌석 예약 신청 (5분 임시 선점)
동시성 보장을 위해 Redis 분산 락 획득 후 해당 좌석을 5분간 선점합니다.

- **HTTP Method**: `POST`
- **Endpoint**: `/api/v1/seats/reserve`

**Request Body**:
```json
{
  "seatId": 12,
  "userId": 45
}
```

**Response (`200 OK`)**:
```json
{
  "success": true,
  "tempReservationId": 789,
  "expiresAt": "2026-07-07T21:12:00"
}
```

### 📋 3. 예약 최종 확정
임시 선점 기한 내에 결제 또는 추가 인증을 받아 영속 데이터베이스(RDB)에 예약을 저장합니다.

- **HTTP Method**: `POST`
- **Endpoint**: `/api/v1/seats/confirm`

**Request Body**:
```json
{
  "tempReservationId": 789,
  "userId": 45,
  "paymentInfo": "card_9823412"
}
```

**Response (`200 OK`)**:
```json
{
  "success": true,
  "reservationId": 999
}
```

### 📋 4. 좌석 이용 반납
이용 중인 좌석을 반납하여 상태를 공석으로 되돌립니다.

- **HTTP Method**: `POST`
- **Endpoint**: `/api/v1/seats/return`

**Request Body**:
```json
{
  "seatId": 12,
  "userId": 45
}
```

**Response (`200 OK`)**:
```json
{
  "success": true
}
```
