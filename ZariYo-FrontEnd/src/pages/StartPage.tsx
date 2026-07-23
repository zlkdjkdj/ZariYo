import { useNavigate } from 'react-router-dom';
import { 
  Store, PlusCircle, UtensilsCrossed, 
  Receipt, ChefHat, TrendingUp, Users, Clock
} from 'lucide-react';
import { StartLayout } from '../components/start/StartLayout';
import { StartCard } from '../components/start/StartCard';


export function StartPage() {
  const navigate = useNavigate();

  return (
    <StartLayout>
      <div className="w-full max-w-5xl flex flex-col items-center animate-fadeIn px-2 py-4">
        
        {/* Top Console Title Block */}
        <div className="text-center mb-10 select-none">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#000000]/10 border border-[#000000]/25 text-[10px] text-[#000000] mb-4 font-bold font-mono">
            <Store className="w-3.5 h-3.5" />
            <span>ZARIYO INTEGRATED KITCHEN & KIOSK CONSOLE</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white mb-3 leading-tight">
            매장 스마트 관제 콘솔
          </h1>
          <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 font-bold max-w-xl mx-auto">
            2D 좌석 도면 설계부터 실시간 테이블 키오스크 주문 받기, 주방 조리 관제(KDS), 실시간 계산서 확인까지 한눈에 제어하세요.
          </p>
        </div>

        {/* Real-time KPI Analytics Summary Bar */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 select-none">
          <div className="bg-white dark:bg-white/[0.02] border border-neutral-200 dark:border-white/5 rounded-none p-5 shadow-none flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-neutral-400 dark:text-white/40 uppercase tracking-widest font-mono">TODAY SALES</span>
              <p className="text-lg md:text-xl font-black text-neutral-900 dark:text-white mt-1">₩ 1,840,000</p>
            </div>
            <div className="p-3 rounded-none bg-emerald-500/10 text-emerald-500">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white dark:bg-white/[0.02] border border-neutral-200 dark:border-white/5 rounded-none p-5 shadow-none flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-neutral-400 dark:text-white/40 uppercase tracking-widest font-mono">OCCUPIED SEATS</span>
              <p className="text-lg md:text-xl font-black text-neutral-900 dark:text-white mt-1">18 / 24 <span className="text-xs text-[#000000] font-bold">(75%)</span></p>
            </div>
            <div className="p-3 rounded-none bg-[#000000]/10 text-[#000000]">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white dark:bg-white/[0.02] border border-neutral-200 dark:border-white/5 rounded-none p-5 shadow-none flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-neutral-400 dark:text-white/40 uppercase tracking-widest font-mono">KDS PENDING</span>
              <p className="text-lg md:text-xl font-black text-orange-500 mt-1">4 건 대기중</p>
            </div>
            <div className="p-3 rounded-none bg-orange-500/10 text-orange-500">
              <ChefHat className="w-5 h-5 animate-pulse" />
            </div>
          </div>

          <div className="bg-white dark:bg-white/[0.02] border border-neutral-200 dark:border-white/5 rounded-none p-5 shadow-none flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-neutral-400 dark:text-white/40 uppercase tracking-widest font-mono">HOLDS & ROLLBACK</span>
              <p className="text-lg md:text-xl font-black text-purple-500 mt-1">2 건 처리됨</p>
            </div>
            <div className="p-3 rounded-none bg-purple-500/10 text-purple-500">
              <Clock className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* 4 Core Module Systems Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          
          {/* Module 1: Store Builder */}
          <StartCard
            title="1. 사업자 업장 관리 (도면 빌더)"
            description="매장의 테이블 수, 20px 그리드 스냅 캔버스를 통해 실제 매장 좌석과 가구 배치도를 2D 드래그 앤 드롭으로 자유롭게 디자인합니다."
            icon={PlusCircle}
            onClick={() => navigate('/owner/store/new')}
            actionText="매장 도면 디자인 빌더 시작"
          />

          {/* Module 2: Smart Kiosk & Ordering */}
          <StartCard
            title="2. 스마트 키오스크 & 주문 받기"
            description="손님용 테이블 키오스크와 디지털 메뉴판을 개시합니다. 고객이 테이블을 탭하고 메뉴를 담으면 5분 임시 선점이 진행됩니다."
            icon={UtensilsCrossed}
            onClick={() => navigate('/reserve')}
            actionText="테이블 키오스크 모드 열기"
          />

          {/* Module 3: Kitchen Display System (KDS) */}
          <StartCard
            title="3. 주방 조리 시스템 (KDS 관제)"
            description="실시간 조리 대기열을 확인하고 완료된 요리를 체크합니다. 요리가 완료되면 자동으로 관제 대시보드와 수선서에 연동됩니다."
            icon={ChefHat}
            onClick={() => navigate('/owner/dashboard?tab=kds')}
            actionText="주방 KDS 조리 관제실 진입"
          />

          {/* Module 4: Live Map & Receipts */}
          <StartCard
            title="4. 통합 관제 & 계산서 확인 (POS)"
            description="실시간 좌석 점유 맵과 테이블별 계산서(Bill & Receipt) 수선서를 조회하고, 5분 타임아웃 롤백 및 결제 완료를 처리합니다."
            icon={Receipt}
            onClick={() => navigate('/owner/dashboard?tab=live')}
            actionText="실시간 관제 & POS 모듈 진입"
          />
        </div>

      </div>
    </StartLayout>
  );
}
