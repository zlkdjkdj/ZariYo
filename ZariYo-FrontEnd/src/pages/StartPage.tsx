import { useNavigate } from 'react-router-dom';
import { Store, PlusCircle, LayoutDashboard } from 'lucide-react';
import { StartLayout } from '../components/start/StartLayout';
import { StartCard } from '../components/start/StartCard';

export function StartPage() {
  const navigate = useNavigate();

  return (
    <StartLayout>
      <div className="w-full max-w-3xl flex flex-col items-center animate-fadeIn px-2">
        {/* Title Block */}
        <div className="text-center mb-12 select-none">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#3182f6]/10 border border-[#3182f6]/25 text-[10px] text-[#3182f6] mb-5 font-bold font-mono">
            <Store className="w-3.5 h-3.5" />
            <span>OWNER SYSTEM CONSOLE</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#191f28] dark:text-white mb-4 leading-tight">
            매장 관리 프로세스를 시작하세요
          </h1>
          <p className="text-xs md:text-sm text-[#4e5968] dark:text-neutral-400 font-bold max-w-lg mx-auto">
            새로운 매장의 이름, 지리 정보 기입 및 좌석 배치도를 디자인하거나, 기존 운영 중인 실시간 통계 관제 대시보드 콘솔로 진입합니다.
          </p>
        </div>

        {/* Owner Actions Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Setup New Store Action */}
          <StartCard
            title="새로운 매장 설정"
            description="새로운 매장의 이름, 주소, 영업일지를 기입하고 시각적인 2D 드래그 앤 드롭 좌석 배치 설계도를 제작합니다."
            icon={PlusCircle}
            onClick={() => navigate('/owner/store/new')}
            actionText="매장 디자인 빌더 시작"
          />

          {/* Start Operational Dashboard Action */}
          <StartCard
            title="기존 매장 운영 시작"
            description="현재 활성화된 매장 운영 대시보드를 열어 실시간 5분 선점 타이머, 당일 예약 명단 통계 및 맵 상태를 조율합니다."
            icon={LayoutDashboard}
            onClick={() => navigate('/owner/dashboard')}
            actionText="관제 대시보드 바로가기"
          />
        </div>
      </div>
    </StartLayout>
  );
}
