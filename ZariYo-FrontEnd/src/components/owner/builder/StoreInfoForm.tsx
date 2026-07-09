import { Store, Clock, ArrowRight } from 'lucide-react';
import type { StoreInfo } from '../../../types/store';

interface StoreInfoFormProps {
  info: StoreInfo;
  onInputChange: (field: keyof StoreInfo, value: string) => void;
  onNextStep: () => void;
  isValid: boolean;
}

export function StoreInfoForm({ info, onInputChange, onNextStep, isValid }: StoreInfoFormProps) {
  return (
    <div className="lg:col-span-3 bg-neutral-900/60 border border-white/10 rounded-2xl p-7 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-6">
      <div>
        <h2 className="text-base font-extrabold mb-1.5 flex items-center gap-2 text-white">
          <Store className="w-5 h-5 text-[#e50914]" />
          매장 프로필 작성
        </h2>
        <p className="text-[11px] text-neutral-400 font-bold">
          고객 예약을 위한 매장의 기본 운영 정보를 기입해 주세요.
        </p>
      </div>

      {/* Store Name */}
      <div className="space-y-2">
        <label className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider pl-0.5">매장 이름 *</label>
        <input
          type="text"
          placeholder="예: ZariYo 프리미엄 라운지 강남점"
          value={info.name}
          onChange={(e) => onInputChange('name', e.target.value)}
          className="w-full px-4 py-3 border border-white/10 bg-black/45 rounded-xl text-xs text-white focus:border-[#e50914] focus:ring-4 focus:ring-[#e50914]/20 focus:outline-none transition-all duration-200"
        />
      </div>

      {/* Store Address */}
      <div className="space-y-2">
        <label className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider pl-0.5">매장 상세 주소 *</label>
        <input
          type="text"
          placeholder="예: 서울특별시 강남구 테헤란로 123"
          value={info.address}
          onChange={(e) => onInputChange('address', e.target.value)}
          className="w-full px-4 py-3 border border-white/10 bg-black/45 rounded-xl text-xs text-white focus:border-[#e50914] focus:ring-4 focus:ring-[#e50914]/20 focus:outline-none transition-all duration-200"
        />
      </div>

      {/* Opening Hours */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2 border border-white/5 bg-black/25 rounded-xl p-4">
          <label className="text-[10px] font-extrabold flex items-center gap-1.5 mb-2 text-[#ff153c] tracking-wider uppercase">
            <Clock className="w-3.5 h-3.5" /> 평일 영업시간
          </label>
          <div className="flex items-center gap-2">
            <input
              type="time"
              value={info.weekdayStart}
              onChange={(e) => onInputChange('weekdayStart', e.target.value)}
              className="flex-1 px-2.5 py-1.5 border border-white/10 bg-black rounded-lg text-xs text-white focus:border-[#e50914] focus:outline-none"
            />
            <span className="text-neutral-500 text-xs">~</span>
            <input
              type="time"
              value={info.weekdayEnd}
              onChange={(e) => onInputChange('weekdayEnd', e.target.value)}
              className="flex-1 px-2.5 py-1.5 border border-white/10 bg-black rounded-lg text-xs text-white focus:border-[#e50914] focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-2 border border-white/5 bg-black/25 rounded-xl p-4">
          <label className="text-[10px] font-extrabold flex items-center gap-1.5 mb-2 text-[#ff153c] tracking-wider uppercase">
            <Clock className="w-3.5 h-3.5" /> 주말 영업시간
          </label>
          <div className="flex items-center gap-2">
            <input
              type="time"
              value={info.weekendStart}
              onChange={(e) => onInputChange('weekendStart', e.target.value)}
              className="flex-1 px-2.5 py-1.5 border border-white/10 bg-black rounded-lg text-xs text-white focus:border-[#e50914] focus:outline-none"
            />
            <span className="text-neutral-500 text-xs">~</span>
            <input
              type="time"
              value={info.weekendEnd}
              onChange={(e) => onInputChange('weekendEnd', e.target.value)}
              className="flex-1 px-2.5 py-1.5 border border-white/10 bg-black rounded-lg text-xs text-white focus:border-[#e50914] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Break Times & Holiday */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider pl-0.5">브레이크 타임</label>
          <div className="flex items-center gap-2">
            <input
              type="time"
              value={info.breakStart}
              onChange={(e) => onInputChange('breakStart', e.target.value)}
              className="flex-1 px-2.5 py-2 border border-white/10 bg-black/45 rounded-xl text-xs text-white focus:border-[#e50914]"
            />
            <span className="text-neutral-500 text-xs">~</span>
            <input
              type="time"
              value={info.breakEnd}
              onChange={(e) => onInputChange('breakEnd', e.target.value)}
              className="flex-1 px-2.5 py-2 border border-white/10 bg-black/45 rounded-xl text-xs text-white focus:border-[#e50914]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-extrabold text-neutral-400 uppercase tracking-wider pl-0.5">정기 휴무일</label>
          <input
            type="text"
            value={info.holiday}
            onChange={(e) => onInputChange('holiday', e.target.value)}
            placeholder="예: 매주 월요일"
            className="w-full px-4 py-2 border border-white/10 bg-black/45 rounded-xl text-xs text-white focus:border-[#e50914] focus:outline-none"
          />
        </div>
      </div>

      {/* Next Step Trigger Button */}
      <button
        type="button"
        onClick={() => isValid && onNextStep()}
        disabled={!isValid}
        className={`w-full py-3.5 rounded-full font-extrabold text-xs tracking-wider flex items-center justify-center gap-1.5 transition-all duration-200 border-0 ${
          isValid
            ? 'bg-gradient-to-r from-[#e50914] to-[#ff153c] text-white hover:opacity-95 shadow-[0_6px_20px_rgba(229,9,20,0.4)] cursor-pointer hover:scale-[1.01] active:scale-[0.99]'
            : 'bg-white/5 text-neutral-500 border border-white/5 cursor-not-allowed'
        }`}
      >
        좌석 배치도 디자인 단계로 이동
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
