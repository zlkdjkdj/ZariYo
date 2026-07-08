import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Construction, Armchair, Home } from 'lucide-react';

interface MockPageLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

function MockPageLayout({ title, subtitle, description, icon: Icon, accentColor }: MockPageLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-black text-[#1d1d1f] dark:text-[#f5f5f7] font-sans selection:bg-[#3182f6]/20 min-h-screen flex flex-col justify-between relative overflow-hidden transition-colors duration-300">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#3182f6]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#3182f6]/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between z-10">
        <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer group">
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-black to-[#434343] dark:from-white dark:to-[#a1a1a6] bg-clip-text text-transparent">
            ZariYo
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 font-medium">
            Mockup
          </span>
        </div>

        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#86868b] dark:text-[#a1a1a6] hover:text-black dark:hover:text-white transition-all cursor-pointer"
        >
          <Home className="w-3.5 h-3.5" />
          홈으로
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 z-10 max-w-2xl mx-auto text-center">
        <div className="mb-8 relative">
          {/* Accent glow behind icon */}
          <div className={`absolute inset-0 rounded-3xl ${accentColor}/10 blur-xl scale-125`} />
          <div className={`w-16 h-16 rounded-3xl bg-[#f5f5f7] dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-black dark:text-white relative z-10`}>
            <Icon className="w-8 h-8 text-[#3182f6]" />
          </div>
        </div>

        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-semibold mb-4">
          <Construction className="w-3 h-3" />
          현재 개발 진행 중인 화면입니다
        </div>

        <h1 className="text-3xl font-bold tracking-tight mb-2 text-black dark:text-white">
          {title}
        </h1>
        <p className="text-sm font-semibold text-[#86868b] dark:text-[#a1a1a6] mb-6">
          {subtitle}
        </p>
        <p className="text-xs md:text-sm text-[#86868b] dark:text-[#a1a1a6] leading-relaxed max-w-lg mb-8">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/owner')}
            className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-xs font-semibold bg-[#3182f6] text-white hover:bg-[#1b64da] shadow-[0_4px_12px_rgba(49,130,246,0.2)] hover:scale-[1.01] transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            시작 페이지로 돌아가기
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-6 text-[10px] text-[#86868b] dark:text-[#48484a] border-t border-neutral-100 dark:border-neutral-900/50">
        © 2026 ZariYo. All rights reserved.
      </footer>
    </div>
  );
}

// 1. 손님 실시간 예약 목업 페이지
export function ReservePage() {
  return (
    <MockPageLayout
      title="실시간 좌석 예약"
      subtitle="손님 예약 화면"
      description="선택한 매장의 실시간 좌석 도면이 여기에 로드됩니다. 비어있는 좌석을 클릭해 5분간 임시 선점하고 최종 예약을 확정하는 전체 예약 플로우가 제공될 예정입니다."
      icon={Armchair}
      accentColor="bg-blue-500"
    />
  );
}


