import { useState } from 'react';
import { Music } from 'lucide-react';

interface DashboardBgmPlayerProps {
  youtubeVideoId: string;
  setYoutubeVideoId: (id: string) => void;
}

export function DashboardBgmPlayer({
  youtubeVideoId,
  setYoutubeVideoId,
}: DashboardBgmPlayerProps) {
  const [customYoutubeInput, setCustomYoutubeInput] = useState<string>('');

  const handleApplyCustomYoutube = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customYoutubeInput) return;
    let extractedId = customYoutubeInput;
    if (customYoutubeInput.includes('v=')) {
      extractedId = customYoutubeInput.split('v=')[1]?.split('&')[0] || customYoutubeInput;
    } else if (customYoutubeInput.includes('youtu.be/')) {
      extractedId = customYoutubeInput.split('youtu.be/')[1]?.split('?')[0] || customYoutubeInput;
    }
    setYoutubeVideoId(extractedId);
    setCustomYoutubeInput('');
  };

  return (
    <div className="bg-white dark:bg-[#09090b] border border-neutral-300 dark:border-neutral-800 rounded-[3px] p-5 space-y-3.5 text-left">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Music className="w-4 h-4 text-black dark:text-white" />
          <h3 className="text-xs font-black text-black dark:text-white">매장 BGM 플레이어</h3>
        </div>
        <span className="text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-[3px]">
          LIVE AUDIO
        </span>
      </div>

      <div className="space-y-3">
        <div className="aspect-video rounded-[3px] overflow-hidden border border-neutral-300 dark:border-white/10 bg-black">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=0&controls=1&loop=1`}
            title="ZariYo Store BGM Player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        
        <form onSubmit={handleApplyCustomYoutube} className="space-y-2">
          <input 
            type="text"
            placeholder="유튜브 링크 입력..."
            value={customYoutubeInput}
            onChange={(e) => setCustomYoutubeInput(e.target.value)}
            className="w-full px-3 py-2 rounded-[3px] bg-neutral-100 dark:bg-white/5 border border-neutral-300 dark:border-white/10 text-xs font-semibold focus:outline-none focus:border-black dark:focus:border-white text-black dark:text-white"
          />
          <button 
            type="submit"
            className="w-full py-2 rounded-[3px] bg-black dark:bg-white text-white dark:text-black font-extrabold text-xs cursor-pointer hover:opacity-90"
          >
            BGM 영상 변경
          </button>
        </form>
      </div>
    </div>
  );
}
