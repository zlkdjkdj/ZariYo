import { MessageSquare } from 'lucide-react';

interface TimelineLogsProps {
  logs: string[];
}

export function TimelineLogs({ logs }: TimelineLogsProps) {
  return (
    <div className="bg-white dark:bg-[#1c1c1e] border border-neutral-200/50 dark:border-neutral-800/80 rounded-3xl p-6 shadow-sm">
      <h3 className="text-xs font-bold text-black dark:text-white flex items-center gap-1.5 mb-3 border-b border-neutral-100 dark:border-neutral-900 pb-2">
        <MessageSquare className="w-4 h-4 text-emerald-500" />
        실시간 타임라인 로그
      </h3>

      <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1 text-[10px] font-mono text-neutral-500 dark:text-[#a1a1a6]">
        {logs.map((log, index) => (
          <div key={index} className="flex gap-1 border-b border-neutral-50 dark:border-neutral-900/50 pb-1 leading-relaxed">
            <span>{log}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
