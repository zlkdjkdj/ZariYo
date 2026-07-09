import { Save, Trash2, HelpCircle } from 'lucide-react';
import type { PlacedElement } from '../../../types/store';
import { ELEMENT_TEMPLATES } from './AssetSidebar';

interface PropertyPanelProps {
  selectedElement: PlacedElement | undefined;
  onUpdateElement: (id: string, updates: Partial<PlacedElement>) => void;
  onRemoveElement: (id: string) => void;
  onSave: () => void;
}

export function PropertyPanel({
  selectedElement,
  onUpdateElement,
  onRemoveElement,
  onSave,
}: PropertyPanelProps) {
  return (
    <div className="lg:col-span-3 bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-white/10 rounded-2xl p-5 shadow-none space-y-5 select-none backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.015)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div>
        <h3 className="text-xs font-black text-[#191f28] dark:text-white uppercase font-mono tracking-wider">Property Settings</h3>
        <p className="text-[10px] text-[#4e5968] dark:text-neutral-400 font-semibold">선택된 요소의 수치와 정책을 편집합니다.</p>
      </div>

      {selectedElement ? (
        <div className="space-y-4 text-xs font-semibold">
          {/* Type info label */}
          <div className="p-3.5 bg-[#f9fafb] dark:bg-black/40 rounded-xl border border-neutral-200 dark:border-white/5">
            <span className="text-[9px] text-neutral-500 block mb-0.5 font-bold uppercase tracking-wider">가구 유형</span>
            <span className="font-extrabold text-[#191f28] dark:text-white capitalize">
              {ELEMENT_TEMPLATES.find((t) => t.type === selectedElement.type)?.name}
            </span>
          </div>

          {/* Label / Name */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-extrabold text-[#4e5968] dark:text-neutral-400 uppercase tracking-wider pl-0.5">식별 라벨 이름</label>
            <input
              type="text"
              value={selectedElement.label}
              onChange={(e) => onUpdateElement(selectedElement.id, { label: e.target.value })}
              className="w-full px-3.5 py-2.5 border border-neutral-200 dark:border-white/10 bg-[#f9fafb] dark:bg-black/45 rounded-xl text-xs text-[#191f28] dark:text-white focus:border-[#3182f6] focus:outline-none"
            />
          </div>

          {/* Width & Height info */}
          <div className="grid grid-cols-2 gap-2 text-center bg-neutral-50 dark:bg-black/30 p-3 rounded-xl border border-neutral-200 dark:border-white/5">
            <div>
              <span className="text-[8px] text-neutral-500 block font-bold uppercase tracking-wider">가로 폭</span>
              <span className="font-extrabold text-[#191f28] dark:text-white text-xs mt-0.5 block">{selectedElement.width}px</span>
            </div>
            <div className="border-l border-neutral-200 dark:border-white/5">
              <span className="text-[8px] text-neutral-500 block font-bold uppercase tracking-wider">세로 높이</span>
              <span className="font-extrabold text-[#191f28] dark:text-white text-xs mt-0.5 block">{selectedElement.height}px</span>
            </div>
          </div>

          {/* Policies checkboxes */}
          <div className="space-y-3 pt-3 border-t border-neutral-200 dark:border-white/5">
            {/* Reservable Toggle */}
            {(selectedElement.type.startsWith('table-') || selectedElement.type === 'socket') && (
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedElement.isReservable}
                  onChange={(e) => onUpdateElement(selectedElement.id, { isReservable: e.target.checked })}
                  className="w-4 h-4 rounded border-neutral-300 dark:border-white/10 text-[#3182f6] bg-white dark:bg-black focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-[#4e5968] dark:text-neutral-400 group-hover:text-[#191f28] dark:group-hover:text-white transition-colors font-bold text-[11px]">
                  예약 좌석으로 지정
                </span>
              </label>
            )}

            {/* Temp occupied Toggle */}
            {selectedElement.type.startsWith('table-') && (
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedElement.isTempOccupiedEnabled}
                  onChange={(e) => onUpdateElement(selectedElement.id, { isTempOccupiedEnabled: e.target.checked })}
                  className="w-4 h-4 rounded border-neutral-300 dark:border-white/10 text-[#3182f6] bg-white dark:bg-black focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-[#4e5968] dark:text-neutral-400 group-hover:text-[#191f28] dark:group-hover:text-white transition-colors font-bold text-[11px]">
                  5분 임시 선점 적용 대상
                </span>
              </label>
            )}
          </div>

          {/* Delete Element Button */}
          <button
            type="button"
            onClick={() => onRemoveElement(selectedElement.id)}
            className="w-full flex items-center justify-center gap-1.5 py-3 rounded-full border border-red-500/25 text-red-500 hover:bg-red-500/10 cursor-pointer text-xs font-bold transition-all mt-4"
          >
            <Trash2 className="w-4 h-4" />
            배치된 요소 제거
          </button>
        </div>
      ) : (
        <div className="text-center py-14 text-neutral-500 bg-neutral-50 dark:bg-black/20 rounded-xl border border-neutral-200 dark:border-white/5 border-dashed">
          <HelpCircle className="w-7 h-7 mx-auto mb-2 text-[#3182f6] opacity-80" />
          <p className="text-[10px] font-extrabold text-[#4e5968] dark:text-neutral-400">선택된 요소 없음</p>
          <p className="text-[9px] text-neutral-500 mt-1 font-bold">도면 객체를 클릭하면 상세 속성 옵션이 표출됩니다.</p>
        </div>
      )}

      {/* Complete & Save Button */}
      <div className="pt-4 border-t border-neutral-200 dark:border-white/5">
        <button
          type="button"
          onClick={onSave}
          className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#3182f6] to-[#4894fe] text-white hover:opacity-95 cursor-pointer shadow-[0_6px_20px_rgba(49,130,246,0.2)] text-xs font-extrabold transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
        >
          <Save className="w-4 h-4" />
          레이아웃 설계 완료
        </button>
      </div>
    </div>
  );
}
