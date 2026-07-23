import React from 'react';
import { Store } from 'lucide-react';
import type { PlacedElement } from '../../../types/store';
import { ELEMENT_TEMPLATES } from './AssetSidebar';

interface BuilderCanvasProps {
  placedElements: PlacedElement[];
  selectedId: string | null;
  canvasRef: React.RefObject<HTMLDivElement | null>;
  onMouseDown: (e: React.MouseEvent, id: string) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
  onSelectId: (id: string | null) => void;
}

export function BuilderCanvas({
  placedElements,
  selectedId,
  canvasRef,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onSelectId,
}: BuilderCanvasProps) {
  return (
    <div className="lg:col-span-6 flex flex-col gap-3">
      <div className="flex justify-between items-center px-1 text-xs select-none">
        <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-bold">
          격자 배치판 (마우스 드래그로 요소를 이동하세요)
        </span>
        <span className="text-[9px] text-[#000000] font-bold font-mono bg-[#000000]/10 border border-[#000000]/20 px-2 py-0.5 rounded-full">
          Grid Snap: 20px
        </span>
      </div>

      <div
        ref={canvasRef}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onClick={() => onSelectId(null)}
        className="w-full h-[520px] bg-white dark:bg-neutral-900/30 border border-neutral-200 dark:border-white/10 rounded-none relative overflow-hidden select-none shadow-none dark:shadow-none"
      >
        {/* 20px Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:20px_20px]" />

        {placedElements.map((el) => {
          const isSelected = el.id === selectedId;
          const template = ELEMENT_TEMPLATES.find((t) => t.type === el.type);
          
          // Apply responsive borders for templates based on theme
          let templateColor = template?.color || 'border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900';
          if (el.type === 'counter') templateColor = 'bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-300';
          if (el.type === 'door') templateColor = 'bg-amber-100/50 dark:bg-amber-500/10 border-amber-300/40 dark:border-amber-500/20 text-amber-600 dark:text-amber-400';
          if (el.type === 'toilet') templateColor = 'bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-850 text-neutral-400 dark:text-neutral-500';

          return (
            <div
              key={el.id}
              onMouseDown={(e) => onMouseDown(e, el.id)}
              onClick={(e) => {
                e.stopPropagation();
                onSelectId(el.id);
              }}
              style={{
                position: 'absolute',
                left: el.x,
                top: el.y,
                width: el.width,
                height: el.height,
              }}
              className={`rounded-none border flex flex-col items-center justify-center p-2 text-center transition-all cursor-move shadow-none ${templateColor} ${
                isSelected 
                  ? 'border-[#000000] ring-2 ring-[#000000]/40 dark:ring-[#000000]/40 z-20 shadow-none dark:shadow-none' 
                  : 'z-10'
              }`}
            >
              <span className="text-[10px] font-black tracking-tight truncate max-w-full text-neutral-900 dark:text-white">
                {el.label}
              </span>
              {el.isReservable && (
                <span className="text-[8px] mt-1 bg-[#000000]/10 border border-[#000000]/20 text-[#000000] px-1.5 py-0.5 rounded-full font-bold">
                  예약석
                </span>
              )}
            </div>
          );
        })}

        {placedElements.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <Store className="w-9 h-9 text-[#000000] mb-3 animate-pulse" />
            <p className="text-xs text-neutral-900 dark:text-white font-extrabold">배치된 가구가 없습니다.</p>
            <p className="text-[10px] text-neutral-400 dark:text-neutral-600 mt-1 font-bold">좌측 템플릿 항목을 눌러 캔버스에 추가해보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
}

