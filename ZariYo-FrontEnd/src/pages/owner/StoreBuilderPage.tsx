import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { StartLayout } from '../../components/start/StartLayout';
import { StoreInfoForm } from '../../components/owner/builder/StoreInfoForm';
import { StoreMapGuide } from '../../components/owner/builder/StoreMapGuide';
import { AssetSidebar } from '../../components/owner/builder/AssetSidebar';
import { BuilderCanvas } from '../../components/owner/builder/BuilderCanvas';
import { PropertyPanel } from '../../components/owner/builder/PropertyPanel';
import type { StoreInfo, PlacedElement } from '../../types/store';

export function StoreBuilderPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);

  // Step 1 State: 기본 정보
  const [info, setInfo] = useState<StoreInfo>({
    name: '',
    address: '',
    weekdayStart: '09:00',
    weekdayEnd: '22:00',
    weekendStart: '10:00',
    weekendEnd: '21:00',
    breakStart: '15:00',
    breakEnd: '17:00',
    holiday: '연중무휴',
  });

  // Step 2 State: 배치 요소 리스트
  const [placedElements, setPlacedElements] = useState<PlacedElement[]>(() => {
    const saved = localStorage.getItem('zariyo_store_layout');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [
      { id: '1', type: 'counter', label: '카운터', x: 280, y: 40, width: 160, height: 50, isReservable: false, isTempOccupiedEnabled: false },
      { id: '2', type: 'door', label: '입구', x: 40, y: 380, width: 80, height: 30, isReservable: false, isTempOccupiedEnabled: false },
      { id: '3', type: 'table-4', label: 'T-1', x: 120, y: 160, width: 100, height: 60, isReservable: true, isTempOccupiedEnabled: true },
      { id: '4', type: 'table-2', label: 'T-2', x: 320, y: 160, width: 60, height: 60, isReservable: true, isTempOccupiedEnabled: true },
      { id: '5', type: 'table-2', label: 'T-3', x: 440, y: 160, width: 60, height: 60, isReservable: true, isTempOccupiedEnabled: true },
      { id: '6', type: 'table-bar', label: '바석-A', x: 160, y: 280, width: 140, height: 40, isReservable: true, isTempOccupiedEnabled: false },
    ];
  });

  const [selectedId, setSelectedId] = useState<string | null>(null);

  // 드래그 제어 상태 레퍼런스
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragInfo = useRef<{
    elementId: string;
    startOffsetX: number;
    startOffsetY: number;
  } | null>(null);

  // 기본 정보 입력 완료 검증
  const isInfoValid = info.name.trim().length > 0 && info.address.trim().length > 0;

  const handleInputChange = (field: keyof StoreInfo, value: string) => {
    setInfo((prev) => ({ ...prev, [field]: value }));
  };

  // 요소 추가
  const handleAddElement = (type: PlacedElement['type']) => {
    // 템플릿 크기 매핑 (AssetSidebar 정의와 매핑)
    const sizes: Record<PlacedElement['type'], { w: number; h: number }> = {
      'table-2': { w: 60, h: 60 },
      'table-4': { w: 100, h: 60 },
      'table-bar': { w: 140, h: 40 },
      socket: { w: 50, h: 50 },
      counter: { w: 160, h: 50 },
      door: { w: 80, h: 30 },
      toilet: { w: 60, h: 50 },
    };

    const size = sizes[type];
    let label: string = type;
    if (type.startsWith('table-')) {
      const tableCount = placedElements.filter((e) => e.type.startsWith('table-')).length + 1;
      label = `T-${tableCount}`;
    } else if (type === 'socket') {
      const socketCount = placedElements.filter((e) => e.type === 'socket').length + 1;
      label = `C-${socketCount}`;
    } else if (type === 'counter') {
      label = '카운터';
    } else if (type === 'door') {
      label = '입구';
    } else if (type === 'toilet') {
      label = '화장실';
    }

    const newElement: PlacedElement = {
      id: Date.now().toString(),
      type,
      label,
      x: 100,
      y: 100,
      width: size.w,
      height: size.h,
      isReservable: type.startsWith('table-') || type === 'socket',
      isTempOccupiedEnabled: type.startsWith('table-'),
    };

    setPlacedElements((prev) => [...prev, newElement]);
    setSelectedId(newElement.id);
  };

  // 요소 제거
  const handleRemoveElement = (id: string) => {
    setPlacedElements((prev) => prev.filter((e) => e.id !== id));
    if (selectedId === id) {
      setSelectedId(null);
    }
  };

  // 요소 속성 변경
  const handleUpdateElement = (id: string, updates: Partial<PlacedElement>) => {
    setPlacedElements((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );
  };

  // 드래그 다운
  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    if (step !== 2) return;
    e.stopPropagation();
    setSelectedId(id);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const element = placedElements.find((el) => el.id === id);
    if (!element) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    dragInfo.current = {
      elementId: id,
      startOffsetX: clientX - element.x,
      startOffsetY: clientY - element.y,
    };
  };

  // 드래그 무브 (스냅 기능 적용)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragInfo.current || !canvasRef.current) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const element = placedElements.find((el) => el.id === dragInfo.current?.elementId);
    if (!element) return;

    let rawX = clientX - dragInfo.current.startOffsetX;
    let rawY = clientY - dragInfo.current.startOffsetY;

    // 20px 격자 스냅
    const snappedX = Math.round(rawX / 20) * 20;
    const snappedY = Math.round(rawY / 20) * 20;

    const maxX = rect.width - element.width;
    const maxY = rect.height - element.height;
    const finalX = Math.max(0, Math.min(snappedX, maxX));
    const finalY = Math.max(0, Math.min(snappedY, maxY));

    handleUpdateElement(dragInfo.current.elementId, { x: finalX, y: finalY });
  };

  // 드래그 업
  const handleMouseUp = () => {
    dragInfo.current = null;
  };

  // 저장하기
  const handleSaveLayout = () => {
    localStorage.setItem('zariyo_store_info', JSON.stringify(info));
    localStorage.setItem('zariyo_store_layout', JSON.stringify(placedElements));
    alert('매장 설정과 테이블 배치도가 안전하게 저장되었습니다!');
    navigate('/owner/dashboard');
  };

  const selectedElement = placedElements.find((el) => el.id === selectedId);

  return (
    <StartLayout>
      <div className="w-full max-w-6xl flex flex-col items-center animate-fadeIn px-2">
        {/* Top Header navbar */}
        <div className="w-full flex items-center justify-between mb-8 pb-4 border-b border-neutral-100 dark:border-neutral-900/50">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (step === 2) setStep(1);
                else navigate('/owner');
              }}
              className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-500 hover:text-black dark:hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-neutral-500 dark:text-[#a1a1a6]">
              {step === 1 ? '기본 매장 프로필 작성' : '시각적 좌석 배치도 빌더'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${step === 1 ? 'bg-[#3182f6]/10 text-[#3182f6]' : 'text-neutral-400 bg-neutral-100 dark:bg-neutral-900'}`}>
              1. 기본 정보
            </span>
            <span className="text-neutral-300 dark:text-neutral-800 text-xs">/</span>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${step === 2 ? 'bg-[#3182f6]/10 text-[#3182f6]' : 'text-neutral-400 bg-neutral-100 dark:bg-neutral-900'}`}>
              2. 좌석 배치도 디자인
            </span>
          </div>
        </div>

        {/* STEP 1: 마법사 기본 양식 */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 w-full">
            <StoreInfoForm
              info={info}
              onInputChange={handleInputChange}
              onNextStep={() => setStep(2)}
              isValid={isInfoValid}
            />
            <StoreMapGuide storeName={info.name} />
          </div>
        )}

        {/* STEP 2: 드래그 앤 드롭 빌더 */}
        {step === 2 && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <AssetSidebar onSelectAsset={handleAddElement} />
            <BuilderCanvas
              placedElements={placedElements}
              selectedId={selectedId}
              canvasRef={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onSelectId={setSelectedId}
            />
            <PropertyPanel
              selectedElement={selectedElement}
              onUpdateElement={handleUpdateElement}
              onRemoveElement={handleRemoveElement}
              onSave={handleSaveLayout}
            />
          </div>
        )}
      </div>
    </StartLayout>
  );
}
