import { 
  Monitor, ChefHat, 
  CheckCircle2, Lock, Plus, Bell, RefreshCw, 
  CreditCard, DollarSign, AlertCircle, FileSpreadsheet, Image as ImageIcon
} from 'lucide-react';

export const FEATURE_SPECS = {
  kiosk: {
    badge: 'MODULE #1 : GUEST TABLE KIOSK',
    title: '손님 전용 스마트 테이블 키오스크 세부 명세',
    subtitle: 'Menu-First UI & Automated Table Reservation Lock',
    specs: [
      {
        id: 'spec-1',
        name: '5분 타임아웃 원자성 선점 락',
        desc: '테이블 착석 시 Redis Redisson 락 기반으로 5분간 이중 예약을 자동 차단하며, 미결제 시 원복됩니다.',
        icon: Lock
      },
      {
        id: 'spec-2',
        name: '곱빼기 & 토핑 옵션 팝업 모달',
        desc: '메뉴 선택 시 맵기 조절, 곱빼기 추가금(+1,500원), 사이드 토핑을 손쉽게 지정하는 동적 커스텀 옵션 팝업.',
        icon: Plus
      },
      {
        id: 'spec-3',
        name: '원터치 물/직원호출 단추',
        desc: '앞치마, 물, 육수 추가, 직원 호출 등 매장 서비스 요청을 관제 POS로 즉시 전파하는 모듈 단추.',
        icon: Bell
      },
      {
        id: 'spec-4',
        name: '테이블 수동 지정/이동 모달',
        desc: '단체 손님 합석 또는 좌석 변경 시 손님이 키오스크 화면에서 수동으로 타 좌석을 재지정하는 기능.',
        icon: RefreshCw
      }
    ]
  },
  pos: {
    badge: 'MODULE #2 : OWNER CONTROL POS',
    title: '사장님 실시간 2D 관제 & Side-by-Side POS 세부 명세',
    subtitle: 'Realtime Cyber Control Room & Immediate Receipt Overlay',
    specs: [
      {
        id: 'spec-5',
        name: '2D 좌석도 & 수선서 Side-by-Side',
        desc: '매장 2D 좌석 도면 맵과 선택한 테이블의 영수증 수선서 내역을 한 화면에 밀착 배치하여 관제 효율을 극대화.',
        icon: Monitor
      },
      {
        id: 'spec-6',
        name: '현장 POS 메뉴 추가 주문',
        desc: '사장님이 관제판에서 손님 테이블에 카운터 음료, 공기밥 요리를 즉석에서 직접 추가 발송.',
        icon: Plus
      },
      {
        id: 'spec-7',
        name: '결제 수단 분리 승인 (카드/카카오/현금)',
        desc: '신용카드 결제 승인, 카카오페이 간편결제, 현금 영수증 입금을 각각 수선서별로 명확히 처리.',
        icon: CreditCard
      },
      {
        id: 'spec-8',
        name: '5분 락 강제 해제 및 퇴석 스위치',
        desc: '노쇼 손님 발생 시 5분 선점 타임아웃 전이라도 관제판에서 즉시 공석 원복 처리하는 원터치 스위치.',
        icon: DollarSign
      }
    ]
  },
  kds: {
    badge: 'MODULE #3 : KITCHEN DISPLAY SYSTEM',
    title: '주방 실시간 조리 관제 (KDS) 세부 명세',
    subtitle: 'Realtime Order Queue Relay & Cooking Status Sync',
    specs: [
      {
        id: 'spec-9',
        name: '접수 시각 & 수량 카드 릴레이',
        desc: '주문 발송 즉시 접수 시각(오후 6:42)과 메뉴별 요리 수량이 주방 관제 카드로 실시간 릴레이 전송.',
        icon: ChefHat
      },
      {
        id: 'spec-10',
        name: '특별 요청사항 하이라이트',
        desc: '손님의 "덜 매운맛", "드레싱 따로", "미디엄 웰던" 등 조리 주의사항을 주방 카드에 강조 표시.',
        icon: AlertCircle
      },
      {
        id: 'spec-11',
        name: '원터치 조리 완료 (Completed) 릴레이',
        desc: '조리된 요리를 주방 셰프가 원터치 클릭하면 POS 관제판과 서빙 팀에 즉시 조리 완료 신호 전파.',
        icon: CheckCircle2
      },
      {
        id: 'spec-12',
        name: '관제판 동시 동기화',
        desc: '주방 KDS와 홀 POS, 키오스크 화면 간 상태가 WebSocket으로 0.1초 만에 완전 동기화.',
        icon: RefreshCw
      }
    ]
  },
  analytics: {
    badge: 'MODULE #4 : ANALYTICS & STOCK CONTROL',
    title: '매출 분석 & 메뉴/영수증 관리 세부 명세',
    subtitle: 'Business Intelligence & Realtime Stock Management',
    specs: [
      {
        id: 'spec-13',
        name: '시간대별 매출 리포트 & CSV 내보내기',
        desc: '일간/월간 매출 추이와 주문 건수를 한눈에 파악하고 엑셀 CSV 파일로 즉시 다운로드.',
        icon: FileSpreadsheet
      },
      {
        id: 'spec-14',
        name: '실시간 품절 (Sold-Out) 스위치',
        desc: '재료 소진 시 사장님이 토글 버튼 한 번으로 키오스크 및 POS 전체에 품절 상태를 전파.',
        icon: AlertCircle
      },
      {
        id: 'spec-15',
        name: '메뉴 대표 사진 업로드 미리보기',
        desc: '신규 메뉴 추가 시 대표 요리 사진을 업로드하고 화면에 바르게 렌더링되는지 실시간 미리보기.',
        icon: ImageIcon
      },
      {
        id: 'spec-16',
        name: '영수증 결제 취소 / 전액 환불 모달',
        desc: '오주문 또는 환불 발생 시 수선서 이력 탭에서 사유 선택 후 즉시 결제 승인 취소.',
        icon: DollarSign
      }
    ]
  }
};
