import { useState } from 'react';
import { ConsoleSidebar } from '../../components/owner/ConsoleSidebar';
import { 
  TrendingUp, Download, Award, ArrowUpRight, BarChart3 
} from 'lucide-react';


export function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today');

  const hourlySales = [
    { hour: '11:00', sales: 240000, percentage: 40 },
    { hour: '12:00', sales: 580000, percentage: 95 },
    { hour: '13:00', sales: 420000, percentage: 70 },
    { hour: '17:00', sales: 310000, percentage: 50 },
    { hour: '18:00', sales: 690000, percentage: 100 },
    { hour: '19:00', sales: 510000, percentage: 80 },
  ];

  const topMenuItems = [
    { rank: 1, name: '토마호크 스테이크', count: 42, total: 2016000, share: 45 },
    { rank: 2, name: '트러플 크림 파스타', count: 38, total: 684000, share: 22 },
    { rank: 3, name: '화덕 마르게리타 피자', count: 29, total: 522000, share: 18 },
    { rank: 4, name: '시그니처 수제 에이드', count: 64, total: 448000, share: 15 },
  ];

  const handleExportCSV = () => {
    alert('2026년 7월 23일 자 ZariYo 경영 매출 분석 리포트 CSV 내보내기가 완료되었습니다.');
  };

  return (
    <div className="flex bg-slate-50 dark:bg-[#030303] text-neutral-900 dark:text-[#f5f5f7] font-sans min-h-screen transition-colors duration-300">
      
      {/* 1. Universal Console Sidebar */}
      <ConsoleSidebar />

      {/* 2. Main Analytics Content Panel */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* Header Title with Export Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-200 dark:border-neutral-800 select-none">
          <div className="text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-[20px] bg-[#0381fe]/10 text-[#0381fe] border border-[#0381fe]/30 text-[10px] font-bold font-mono mb-2">
              <TrendingUp className="w-3.5 h-3.5" /> SAMSUNG HEALTH & SALES ANALYTICS
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white font-sans">매출 분석 & 경영 보고서</h1>
            <p className="text-xs text-[#707070] dark:text-neutral-400 font-normal mt-1">
              매장의 일별/시간대별 실시간 매출과 좌석 회전율, 시그니처 메뉴 판매 랭킹을 삼성 통계 모듈로 집계합니다.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter buttons - Samsung 40px Pill Controls */}
            <div className="bg-[#f7f7f7] dark:bg-white/5 p-1 rounded-[20px] border border-neutral-200 dark:border-white/10 flex gap-1 font-bold text-xs select-none">
              <button
                onClick={() => setTimeRange('today')}
                className={`h-[32px] px-4 rounded-[20px] transition-all cursor-pointer ${timeRange === 'today' ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm' : 'text-[#707070]'}`}
              >
                오늘
              </button>
              <button
                onClick={() => setTimeRange('week')}
                className={`h-[32px] px-4 rounded-[20px] transition-all cursor-pointer ${timeRange === 'week' ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm' : 'text-[#707070]'}`}
              >
                이번 주
              </button>
              <button
                onClick={() => setTimeRange('month')}
                className={`h-[32px] px-4 rounded-[20px] transition-all cursor-pointer ${timeRange === 'month' ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm' : 'text-[#707070]'}`}
              >
                이번 달
              </button>
            </div>

            <button
              onClick={handleExportCSV}
              className="h-[40px] px-4 rounded-[20px] bg-black text-white dark:bg-white dark:text-black font-bold text-xs cursor-pointer inline-flex items-center gap-2 hover:opacity-90 transition-all border border-black dark:border-white shadow-sm"
            >
              <Download className="w-4 h-4 text-[#0381fe]" />
              <span>CSV 내보내기</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Stat Cards - Samsung 20px Rounded Module Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 text-left">
          <div className="bg-white dark:bg-[#121214] border border-[#dddddd] dark:border-neutral-800 p-6 rounded-[20px] space-y-2 shadow-sm">
            <span className="text-[11px] font-bold text-[#707070] uppercase tracking-wider font-mono">TOTAL REVENUE</span>
            <div className="flex items-baseline justify-between">
              <h2 className="text-2xl font-bold font-mono text-neutral-900 dark:text-white">2,850,000원</h2>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 inline-flex items-center">
                +14.2% <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
            <p className="text-[11px] text-[#707070]">지난주 대비 +340,000원 증가</p>
          </div>

          <div className="bg-white dark:bg-[#121214] border border-[#dddddd] dark:border-neutral-800 p-6 rounded-[20px] space-y-2 shadow-sm">
            <span className="text-[11px] font-bold text-[#707070] uppercase tracking-wider font-mono">TOTAL ORDERS</span>
            <div className="flex items-baseline justify-between">
              <h2 className="text-2xl font-bold font-mono text-neutral-900 dark:text-white">84건</h2>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 inline-flex items-center">
                +8.5% <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
            <p className="text-[11px] text-[#707070]">평균 객단가 33,900원</p>
          </div>

          <div className="bg-white dark:bg-[#121214] border border-[#dddddd] dark:border-neutral-800 p-6 rounded-[20px] space-y-2 shadow-sm">
            <span className="text-[11px] font-bold text-[#707070] uppercase tracking-wider font-mono">TABLE ROTATION RATE</span>
            <div className="flex items-baseline justify-between">
              <h2 className="text-2xl font-bold font-mono text-neutral-900 dark:text-white">3.4회</h2>
              <span className="text-xs font-bold text-[#0381fe] font-mono">PEAK TIME 18:00</span>
            </div>
            <p className="text-[11px] text-[#707070]">평균 착석 유지시간 48분</p>
          </div>

          <div className="bg-white dark:bg-[#121214] border border-[#dddddd] dark:border-neutral-800 p-6 rounded-[20px] space-y-2 shadow-sm">
            <span className="text-[11px] font-bold text-[#707070] uppercase tracking-wider font-mono">DELIVERY / TAKEOUT</span>
            <div className="flex items-baseline justify-between">
              <h2 className="text-2xl font-bold font-mono text-[#0381fe]">28건 (33.3%)</h2>
              <span className="text-xs font-bold text-[#0381fe] font-mono">DELIVERY RELAY</span>
            </div>
            <p className="text-[11px] text-[#707070]">배민 18건 / 쿠팡 6건 / 방문 4건</p>
          </div>
        </div>

        {/* Charts & Popular Menus Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Hourly Sales Bar Chart (Left 7 cols) - Samsung 20px Rounded Container */}
          <div className="lg:col-span-7 bg-white dark:bg-[#121214] border border-[#dddddd] dark:border-neutral-800 rounded-[20px] p-6 md:p-8 shadow-sm text-left select-none">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-6 flex items-center justify-between font-sans">
              <span className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#0381fe]" /> 시간대별 매출 추이
              </span>
              <span className="text-[10px] font-mono text-[#707070]">UNIT: KRW (₩)</span>
            </h3>

            <div className="space-y-4">
              {hourlySales.map((item) => (
                <div key={item.hour} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    <span>{item.hour}</span>
                    <span className="font-mono text-[#0381fe]">₩ {item.sales.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-3 bg-[#f7f7f7] dark:bg-white/5 rounded-[20px] overflow-hidden">
                    <div 
                      className="h-full bg-[#0381fe] rounded-[20px] transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Menu Rankings TOP 5 (Right 5 cols) - Samsung 20px Rounded Container */}
          <div className="lg:col-span-5 bg-white dark:bg-[#121214] border border-[#dddddd] dark:border-neutral-800 rounded-[20px] p-6 md:p-8 shadow-sm text-left select-none">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-6 flex items-center gap-2 font-sans">
              <Award className="w-5 h-5 text-[#0381fe]" /> 인기 메뉴 판매 랭킹 TOP 4
            </h3>

            <div className="space-y-3.5">
              {topMenuItems.map((menu) => (
                <div key={menu.rank} className="flex items-center justify-between p-4 rounded-[20px] bg-[#f7f7f7] dark:bg-white/5 border border-neutral-200 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-[20px] flex items-center justify-center font-bold text-xs ${
                      menu.rank === 1 ? 'bg-[#0381fe] text-white' : 'bg-neutral-200 dark:bg-white/10 text-neutral-700 dark:text-neutral-300'
                    }`}>
                      {menu.rank}
                    </span>

                    <div>
                      <h4 className="text-xs font-black text-neutral-900 dark:text-white">{menu.name}</h4>
                      <span className="text-[10px] text-neutral-400 font-semibold font-mono">판매수량: {menu.count}개</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-black text-neutral-900 dark:text-white block">₩ {menu.total.toLocaleString()}</span>
                    <span className="text-[10px] text-[#000000] font-bold font-mono">{menu.share}% 점유</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
