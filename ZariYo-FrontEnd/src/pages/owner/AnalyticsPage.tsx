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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-200 dark:border-white/5 select-none">
          <div className="text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#000000]/10 text-[#000000] text-[10px] font-bold font-mono mb-2">
              <TrendingUp className="w-3.5 h-3.5" /> SALES & BUSINESS ANALYTICS
            </div>
            <h1 className="text-2xl font-black text-neutral-900 dark:text-white">매출 분석 & 경영 보고서</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-bold mt-1">
              매장의 일별/시간대별 실시간 매출과 좌석 회전율, 시그니처 메뉴 판매 랭킹을 집계합니다.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter buttons */}
            <div className="bg-neutral-200/50 dark:bg-white/5 p-1 rounded-full border border-neutral-300 dark:border-white/10 flex gap-1 font-bold text-xs select-none">
              <button
                onClick={() => setTimeRange('today')}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${timeRange === 'today' ? 'bg-[#000000] text-white' : 'text-neutral-500'}`}
              >
                오늘
              </button>
              <button
                onClick={() => setTimeRange('week')}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${timeRange === 'week' ? 'bg-[#000000] text-white' : 'text-neutral-500'}`}
              >
                이번 주
              </button>
              <button
                onClick={() => setTimeRange('month')}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${timeRange === 'month' ? 'bg-[#000000] text-white' : 'text-neutral-500'}`}
              >
                이번 달
              </button>
            </div>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#000000] hover:bg-[#286fd7] text-white text-xs font-black cursor-pointer shadow-none transition-all"
            >
              <Download className="w-4 h-4" />
              CSV 내보내기
            </button>
          </div>
        </div>

        {/* Top 4 KPI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8 select-none">
          <div className="bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-white/5 rounded-none p-6 shadow-none text-left">
            <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase">TOTAL REVENUE</span>
            <p className="text-2xl font-black text-neutral-900 dark:text-white mt-1">₩ 2,750,000</p>
            <span className="text-[10.5px] text-emerald-500 font-bold flex items-center gap-0.5 mt-2">
              <ArrowUpRight className="w-3.5 h-3.5" /> 지난주 대비 +18.4% 상승
            </span>
          </div>

          <div className="bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-white/5 rounded-none p-6 shadow-none text-left">
            <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase">AVERAGE TICKET (객단가)</span>
            <p className="text-2xl font-black text-neutral-900 dark:text-white mt-1">₩ 44,200</p>
            <span className="text-[10.5px] text-neutral-400 font-bold block mt-2">테이블당 평균 지출액</span>
          </div>

          <div className="bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-white/5 rounded-none p-6 shadow-none text-left">
            <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase">SEAT TURNOVER (회전율)</span>
            <p className="text-2xl font-black text-[#000000] mt-1">3.8 회 / 일</p>
            <span className="text-[10.5px] text-[#000000] font-bold block mt-2">평균 좌석 점유 유지시간 45분</span>
          </div>

          <div className="bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-white/5 rounded-none p-6 shadow-none text-left">
            <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase">PEAK TIME</span>
            <p className="text-2xl font-black text-orange-500 mt-1">18:00 ~ 19:30</p>
            <span className="text-[10.5px] text-orange-500 font-bold block mt-2">최대 피크 매출 기록</span>
          </div>
        </div>

        {/* Charts & Popular Menus Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Hourly Sales Bar Chart (Left 7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-white/5 rounded-none p-6 md:p-8 shadow-none text-left select-none">
            <h3 className="text-base font-black text-neutral-900 dark:text-white mb-6 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#000000]" /> 시간대별 매출 추이
              </span>
              <span className="text-[10px] font-mono text-neutral-400">UNIT: KRW (₩)</span>
            </h3>

            <div className="space-y-4">
              {hourlySales.map((item) => (
                <div key={item.hour} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-neutral-600 dark:text-neutral-300">
                    <span>{item.hour}</span>
                    <span className="font-mono text-[#000000]">₩ {item.sales.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-3 bg-neutral-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#000000] to-[#000000] rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Menu Rankings TOP 5 (Right 5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#09090b] border border-neutral-200 dark:border-white/5 rounded-none p-6 md:p-8 shadow-none text-left select-none">
            <h3 className="text-base font-black text-neutral-900 dark:text-white mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-500" /> 인기 메뉴 판매 랭킹 TOP 4
            </h3>

            <div className="space-y-4">
              {topMenuItems.map((menu) => (
                <div key={menu.rank} className="flex items-center justify-between p-3.5 rounded-none bg-neutral-50 dark:bg-white/[0.01] border border-neutral-200 dark:border-white/5">
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-none flex items-center justify-center font-black text-xs ${
                      menu.rank === 1 ? 'bg-amber-500 text-white' : 'bg-neutral-200 dark:bg-white/10 text-neutral-600 dark:text-neutral-300'
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
