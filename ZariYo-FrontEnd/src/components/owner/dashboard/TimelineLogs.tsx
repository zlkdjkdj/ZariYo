import { MessageSquare, Activity } from 'lucide-react';

interface TimelineLogsProps {
  logs: string[];
  isDarkMode?: boolean;
}

export function TimelineLogs({ logs, isDarkMode = false }: TimelineLogsProps) {
  return (
    <div className={`border rounded-[24px] p-5 transition-colors duration-300 select-none font-sans ${
      isDarkMode
        ? 'bg-[#141417] border-white/10 text-white shadow-lg shadow-black/40'
        : 'bg-[#ffffff] border-[#dddddd] text-[#000000] shadow-sm'
    }`}>
      <h3 className="text-xs font-black flex items-center justify-between mb-3 border-b border-neutral-200 dark:border-white/10 pb-3 uppercase font-mono tracking-wider">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#0381fe] animate-pulse" />
          <span>매장 라이브 이벤트 로그</span>
        </div>
        <span className="text-[10px] font-bold font-mono text-[#0381fe] bg-[#0381fe]/10 px-2 py-0.5 rounded-[12px]">
          REALTIME STREAM
        </span>
      </h3>

      <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1 text-[10.5px] font-mono">
        {logs.map((log, index) => (
          <div key={index} className="flex items-start gap-2 border-b border-neutral-200/50 dark:border-white/5 pb-2 leading-relaxed">
            <span className="text-[#0381fe] font-black shrink-0 font-mono">▸</span>
            <span className={`font-semibold ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
              {log}
            </span>
          </div>
        ))}

        {logs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-6 text-neutral-400 gap-1">
            <MessageSquare className="w-5 h-5 opacity-40" />
            <p className="text-[11px] font-bold">감지된 매장 이벤트가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
