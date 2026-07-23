import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { StartLayout } from '../../components/start/StartLayout';
import { StoreInfoForm } from '../../components/owner/builder/StoreInfoForm';
import { StoreMapGuide } from '../../components/owner/builder/StoreMapGuide';
import { AssetSidebar } from '../../components/owner/builder/AssetSidebar';
import { BuilderCanvas } from '../../components/owner/builder/BuilderCanvas';
import { PropertyPanel } from '../../components/owner/builder/PropertyPanel';
import { useStoreBuilder } from '../../hooks/useStoreBuilder';

export function StoreBuilderPage() {
  const navigate = useNavigate();
  const {
    step,
    setStep,
    info,
    isInfoValid,
    handleInputChange,
    placedElements,
    selectedId,
    setSelectedId,
    selectedElement,
    canvasRef,
    handleAddElement,
    handleRemoveElement,
    handleUpdateElement,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  } = useStoreBuilder();

  const handleSaveLayout = () => {
    localStorage.setItem('zariyo_store_info', JSON.stringify(info));
    localStorage.setItem('zariyo_store_layout', JSON.stringify(placedElements));
    alert('매장 설정과 테이블 배치도가 안전하게 저장되었습니다!');
    navigate('/owner/dashboard');
  };

  return (
    <StartLayout>
      <div className="w-full max-w-6xl flex flex-col items-center animate-fadeIn px-2">
        {/* Top Header navbar */}
        <div className="w-full flex items-center justify-between mb-8 pb-4 border-b border-neutral-200 dark:border-white/5">
          <div className="flex items-center gap-2 select-none">
            <button
              onClick={() => {
                if (step === 2) setStep(1);
                else navigate('/owner');
              }}
              className="p-2 rounded-none bg-white border border-neutral-200 dark:bg-white/5 dark:border-white/5 hover:bg-[#000000]/10 text-neutral-500 hover:text-[#191f28] dark:hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#000000]" />
            </button>
            <span className="text-[10px] font-extrabold text-[#000000] font-mono uppercase bg-[#000000]/10 px-2 py-0.5 rounded border border-[#000000]/20 tracking-wider">
              {step === 1 ? 'Step 1. Basic Profile' : 'Step 2. 2D Layout Design'}
            </span>
          </div>

          <div className="flex items-center gap-3 select-none text-[11px] font-extrabold font-mono">
            <span className={`px-3 py-1 rounded-full border transition-all ${step === 1 ? 'border-[#000000] text-[#000000] dark:text-white bg-[#000000]/10 shadow-none' : 'text-neutral-450 border-transparent bg-transparent'}`}>
              1. 기본 정보
            </span>
            <span className="text-neutral-300 dark:text-neutral-700">/</span>
            <span className={`px-3 py-1 rounded-full border transition-all ${step === 2 ? 'border-[#000000] text-[#000000] dark:text-white bg-[#000000]/10 shadow-none' : 'text-neutral-450 border-transparent bg-transparent'}`}>
              2. 좌석 배치도
            </span>
          </div>
        </div>

        {/* STEP 1: 마법사 기본 양식 */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 w-full">
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
