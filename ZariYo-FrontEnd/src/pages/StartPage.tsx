import { useNavigate } from 'react-router-dom';
import { Store, PlusCircle, LayoutDashboard } from 'lucide-react';
import { StartLayout } from '../components/start/StartLayout';
import { StartCard } from '../components/start/StartCard';

export function StartPage() {
  const navigate = useNavigate();

  return (
    <StartLayout>
      <div className="w-full max-w-3xl flex flex-col items-center animate-fadeIn">
        {/* Title Block */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3182f6]/10 text-[#3182f6] text-[11px] font-semibold mb-4">
            <Store className="w-3.5 h-3.5" />
            사장님 전용 콘솔
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white mb-3">
            매장 관리 작업을 선택해 주세요
          </h1>
          <p className="text-sm md:text-base text-[#86868b] dark:text-[#a1a1a6]">
            새로운 매장을 오픈하기 위한 등록 또는 기존 매장 실시간 좌석 현황 운영을 시작합니다.
          </p>
        </div>

        {/* Owner Actions Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Setup New Store Action */}
          <StartCard
            title="새로운 매장 설정"
            description="새로운 매장의 이름, 주소, 운영 시간을 설정하고 시각적인 매장 좌석 배치도를 제작해 실시간 선점 기능을 활성화할 준비를 합니다."
            icon={PlusCircle}
            onClick={() => navigate('/owner/store/new')}
            actionText="매장 빌더 열기"
          />

          {/* Start Operational Dashboard Action */}
          <StartCard
            title="기존 매장 운영 시작"
            description="현재 등록되어 활성화된 매장 운영 대시보드를 열어, 손님들의 좌석 예약 현황 및 5분 임시 점유 목록을 실시간 제어/대응합니다."
            icon={LayoutDashboard}
            onClick={() => navigate('/owner/dashboard')}
            actionText="대시보드 시작하기"
          />
        </div>
      </div>
    </StartLayout>
  );
}
