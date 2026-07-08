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
    <div className="lg:col-span-3 bg-white dark:bg-[#1c1c1e] border border-neutral-200/60 dark:border-neutral-800/80 rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] space-y-5">
      <div>
        <h3 className="text-sm font-bold text-black dark:text-white">선택된 요소 설정</h3>
        <p className="text-[10px] text-neutral-500 dark:text-[#a1a1a6]">수치 및 사용 정책을 정의합니다.</p>
      </div>

      {selectedElement ? (
        <div className="space-y-4 text-xs">
          {/* Type info label */}
          <div className="p-3 bg-neutral-50 dark:bg-neutral-900 rounded-xl border border-neutral-200/50 dark:border-neutral-800/50">
            <span className="text-[10px] text-neutral-400 block mb-0.5">선택된 가구 유형</span>
            <span className="font-bold text-black dark:text-white capitalize">
              {ELEMENT_TEMPLATES.find((t) => t.type === selectedElement.type)?.name}
            </span>
          </div>

          {/* Label / Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-semibold text-neutral-400">식별 이름 (번호)</label>
            <input
              type="text"
              value={selectedElement.label}
              onChange={(e) => onUpdateElement(selectedElement.id, { label: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-xs focus:border-[#3182f6] focus:outline-none"
            />
          </div>

          {/* Width & Height info */}
          <div className="grid grid-cols-2 gap-2 text-center bg-neutral-50/50 dark:bg-neutral-900/30 p-2.5 rounded-xl border border-neutral-100 dark:border-neutral-900">
            <div>
              <span className="text-[9px] text-neutral-400 block">가로 크기</span>
              <span className="font-semibold text-black dark:text-white">{selectedElement.width}px</span>
            </div>
            <div className="border-l border-neutral-200 dark:border-neutral-800">
              <span className="text-[9px] text-neutral-400 block">세로 크기</span>
              <span className="font-semibold text-black dark:text-white">{selectedElement.height}px</span>
            </div>
          </div>

          {/* Policies checkboxes */}
          <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800/60">
            {/* Reservable Toggle */}
            {(selectedElement.type.startsWith('table-') || selectedElement.type === 'socket') && (
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedElement.isReservable}
                  onChange={(e) => onUpdateElement(selectedElement.id, { isReservable: e.target.checked })}
                  className="w-4 h-4 rounded text-[#3182f6] focus:ring-[#3182f6]"
                />
                <span className="text-[11px] text-neutral-600 dark:text-[#a1a1a6]">
                  예약 가능한 좌석으로 설정
                </span>
              </label>
            )}

            {/* Temp occupied Toggle */}
            {selectedElement.type.startsWith('table-') && (
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedElement.isTempOccupiedEnabled}
                  onChange={(e) => onUpdateElement(selectedElement.id, { isTempOccupiedEnabled: e.target.checked })}
                  className="w-4 h-4 rounded text-[#3182f6] focus:ring-[#3182f6]"
                />
                <span className="text-[11px] text-neutral-600 dark:text-[#a1a1a6]">
                  5분 임시 선점 적용 대상
                </span>
              </label>
            )}
          </div>

          {/* Delete Element Button */}
          <button
            type="button"
            onClick={() => onRemoveElement(selectedElement.id)}
            className="w-full flex items-center justify-center gap-1.5 py-3 rounded-2xl border border-red-500/20 text-red-500 hover:bg-red-500/5 cursor-pointer text-xs font-semibold transition-all mt-4"
          >
            <Trash2 className="w-3.5 h-3.5" />
            이 요소 삭제하기
          </button>
        </div>
      ) : (
        <div className="text-center py-12 text-neutral-400">
          <HelpCircle className="w-8 h-8 mx-auto mb-2 text-neutral-300 dark:text-neutral-700" />
          <p className="text-[11px]">선택된 요소가 없습니다.</p>
          <p className="text-[9px] text-neutral-500 mt-0.5">캔버스 위의 아이템을 클릭하면 옵션을 열어볼 수 있습니다.</p>
        </div>
      )}

      {/* Complete & Save Button */}
      <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
        <button
          type="button"
          onClick={onSave}
          className="w-full py-3.5 rounded-2xl bg-[#3182f6] hover:bg-[#1b64da] text-white cursor-pointer shadow-[0_4px_12px_rgba(49,130,246,0.3)] text-xs font-bold transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
        >
          <Save className="w-4 h-4" />
          배치 완료 및 저장하기
        </button>
      </div>
    </div>
  );
}
