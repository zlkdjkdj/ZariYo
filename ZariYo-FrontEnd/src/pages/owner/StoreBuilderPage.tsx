import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Sun, Moon } from 'lucide-react';
import { StartLayout } from '../../components/start/StartLayout';
import { StoreInfoForm } from '../../components/owner/builder/StoreInfoForm';
import { StoreMapGuide } from '../../components/owner/builder/StoreMapGuide';
import { AssetSidebar } from '../../components/owner/builder/AssetSidebar';
import { BuilderCanvas } from '../../components/owner/builder/BuilderCanvas';
import { PropertyPanel } from '../../components/owner/builder/PropertyPanel';
import { useStoreBuilder } from '../../hooks/useStoreBuilder';
import { useTheme } from '../../context/ThemeContext';

export function StoreBuilderPage() {
  const navigate = useNavigate();

  // Global Unified Theme Hook
  const { isDarkMode, toggleTheme } = useTheme();



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
    handleSaveStore,
  } = useStoreBuilder();

  const handleSaveLayout = async () => {
    localStorage.setItem('zariyo_store_info', JSON.stringify(info));
    localStorage.setItem('zariyo_store_layout', JSON.stringify(placedElements));
    window.dispatchEvent(new Event('storage_sync'));

    const result = await handleSaveStore(1);
    if (result.success) {
      alert(`[가게 정보 및 도면 수정 완료]\n"${info.name || '내 매장'}" 가게 정보와 2D 좌석 배치도가 성공적으로 갱신 저장되었습니다!\n등록하신 커스텀 매장의 관제 대시보드로 이동합니다.`);
      navigate('/owner/dashboard');
    }
  };

  return (
    <StartLayout>
      <div className={`w-full max-w-6xl flex flex-col items-center animate-fadeIn px-2 transition-colors duration-300 font-sans select-none ${
        isDarkMode ? 'text-white' : 'text-[#000000]'
      }`}>
        {/* Top Header navbar - Samsung One UI Style */}
        <div className={`w-full flex items-center justify-between mb-8 pb-4 border-b ${
          isDarkMode ? 'border-white/10' : 'border-[#dddddd]'
        }`}>
          <div className="flex items-center gap-3 select-none">
            <button
              onClick={() => {
                if (step === 2) setStep(1);
                else navigate('/owner/stores');
              }}
              className={`p-2.5 rounded-[20px] border transition-all cursor-pointer ${
                isDarkMode
                  ? 'bg-white/10 border-white/10 text-white hover:bg-white/20'
                  : 'bg-[#ffffff] border-[#dddddd] text-neutral-800 hover:bg-[#f7f7f7]'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-black text-[#0381fe] uppercase bg-[#0381fe]/10 px-3 py-1 rounded-[20px] border border-[#0381fe]/30 tracking-wider">
                STORE DESIGN CONSOLE
              </span>
              <h1 className="text-xl font-black tracking-tight font-sans">
                {step === 1 ? '매장 기본 정보 설정' : '실시간 2D 좌석 도면 에디터'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-[20px] border transition-all cursor-pointer ${
                isDarkMode
                  ? 'bg-white/10 text-amber-400 border-white/20'
                  : 'bg-[#f7f7f7] text-neutral-800 border-[#dddddd]'
              }`}
              title={isDarkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {step === 2 && (
              <button
                onClick={handleSaveLayout}
                className="flex items-center gap-2 px-6 py-2.5 rounded-[20px] bg-[#000000] dark:bg-[#0381fe] hover:opacity-90 text-white font-black text-xs tracking-wider shadow-md transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>도면 저장 및 저장완료</span>
              </button>
            )}
          </div>
        </div>

        {/* Step 1: 매장 기본 정보 작성 */}
        {step === 1 && (
          <div className="w-full max-w-2xl space-y-6">
            <StoreInfoForm 
              info={info}
              onInputChange={handleInputChange}
              onNextStep={() => setStep(2)}
              isValid={isInfoValid}
            />
          </div>
        )}


        {/* Step 2: 2D 배치 도면 캔버스 & 자산 에셋 팔레트 */}
        {step === 2 && (
          <div className="w-full space-y-6">
            <StoreMapGuide storeName={info.name || '내 매장'} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left">
              {/* Left Asset Palette (3 Cols) */}
              <div className="lg:col-span-3">
                <AssetSidebar 
                  onSelectAsset={handleAddElement}
                />
              </div>

              {/* Center 2D Canvas (6 Cols) */}
              <div className="lg:col-span-6">
                <BuilderCanvas 
                  canvasRef={canvasRef}
                  placedElements={placedElements}
                  selectedId={selectedId}
                  onSelectId={setSelectedId}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                />
              </div>

              {/* Right Property Inspector (3 Cols) */}
              <div className="lg:col-span-3">
                <PropertyPanel 
                  selectedElement={selectedElement}
                  onUpdateElement={handleUpdateElement}
                  onRemoveElement={handleRemoveElement}
                  onSave={handleSaveLayout}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </StartLayout>
  );
}

