import { MessageSquare } from 'lucide-react';

interface TimelineLogsProps {
  logs: string[];
}

export function TimelineLogs({ logs }: TimelineLogsProps) {
  return (
    <div className="bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-white/10 rounded-2xl p-5 shadow-[0_10px_25px_rgba(0,0,0,0.015)] dark:shadow-lg backdrop-blur-xl select-none font-sans">
      <h3 className="text-xs font-extrabold text-neutral-900 dark:text-white flex items-center gap-2 mb-3 border-b border-neutral-200 dark:border-white/5 pb-2.5 uppercase font-mono tracking-wider">
        <MessageSquare className="w-4 h-4 text-[#3182f6]" />
        Live Timeline Logs
      </h3>

      <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1 text-[9.5px] font-mono text-neutral-500 dark:text-neutral-400">
        {logs.map((log, index) => (
          <div key={index} className="flex gap-2 border-b border-neutral-200 dark:border-white/5 pb-1.5 leading-relaxed">
            <span className="text-[#3182f6] shrink-0">▸</span>
            <span className="font-semibold text-neutral-700 dark:text-neutral-300">{log}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


