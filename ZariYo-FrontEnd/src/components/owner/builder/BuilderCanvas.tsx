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
      <div className="flex justify-between items-center px-2 text-xs">
        <span className="text-neutral-500 dark:text-[#a1a1a6]">
          격자 배치판 (마우스 드래그로 요소를 이동하세요)
        </span>
        <span className="text-[10px] text-[#3182f6] font-semibold bg-[#3182f6]/10 px-2 py-0.5 rounded">
          Grid Snap: 20px
        </span>
      </div>

      <div
        ref={canvasRef}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onClick={() => onSelectId(null)}
        className="w-full h-[520px] bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-3xl relative overflow-hidden select-none"
      >
        {/* 20px Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800d_1px,transparent_1px),linear-gradient(to_bottom,#8080800d_1px,transparent_1px)] bg-[size:20px_20px]" />

        {placedElements.map((el) => {
          const isSelected = el.id === selectedId;
          const templateColor = ELEMENT_TEMPLATES.find((t) => t.type === el.type)?.color || 'border-neutral-400 bg-neutral-100';

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
              className={`rounded-xl border flex flex-col items-center justify-center p-2 text-center transition-shadow shadow-sm cursor-move ${templateColor} ${
                isSelected 
                  ? 'ring-2 ring-[#3182f6] ring-offset-2 dark:ring-offset-black border-[#3182f6] shadow-md z-20' 
                  : 'z-10'
              }`}
            >
              <span className="text-[10px] font-bold tracking-tight truncate max-w-full">
                {el.label}
              </span>
              {el.isReservable && (
                <span className="text-[8px] opacity-70 mt-0.5 bg-neutral-200/50 dark:bg-black/40 px-1 rounded">
                  예약
                </span>
              )}
            </div>
          );
        })}

        {placedElements.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <Store className="w-10 h-10 text-neutral-300 dark:text-neutral-700 mb-3" />
            <p className="text-xs text-neutral-400">배치된 물품이 없습니다.</p>
            <p className="text-[10px] text-neutral-500 mt-1">좌측 가구 박스에서 요소를 선택해 배치해 보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
}
