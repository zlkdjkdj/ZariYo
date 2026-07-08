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
    <div className="lg:col-span-3 bg-white dark:bg-[#1c1c1e] border border-neutral-200/60 dark:border-neutral-800/80 rounded-3xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
          <Store className="w-5 h-5 text-[#3182f6]" />
          매장의 상세 프로필을 채워주세요
        </h2>
        <p className="text-xs text-neutral-500 dark:text-[#a1a1a6]">
          손님이 예약을 하거나 현황을 열어볼 때 기초 정보로 활용되는 내용입니다.
        </p>
      </div>

      {/* Store Name */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-neutral-500 dark:text-[#a1a1a6]">매장 이름 *</label>
        <input
          type="text"
          placeholder="예: 스타벅스 강남대로점, 몽탄 삼각지"
          value={info.name}
          onChange={(e) => onInputChange('name', e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm focus:border-[#3182f6] focus:outline-none transition-colors"
        />
      </div>

      {/* Store Address */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-neutral-500 dark:text-[#a1a1a6]">매장 상세 주소 *</label>
        <input
          type="text"
          placeholder="예: 서울특별시 강남구 역삼동 820-1"
          value={info.address}
          onChange={(e) => onInputChange('address', e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-sm focus:border-[#3182f6] focus:outline-none transition-colors"
        />
      </div>

      {/* Opening Hours */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5 border border-neutral-100 dark:border-neutral-900/80 rounded-2xl p-4">
          <label className="text-xs font-bold flex items-center gap-1.5 mb-2 text-emerald-500">
            <Clock className="w-3.5 h-3.5" /> 평일 영업시간
          </label>
          <div className="flex items-center gap-2">
            <input
              type="time"
              value={info.weekdayStart}
              onChange={(e) => onInputChange('weekdayStart', e.target.value)}
              className="flex-1 px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-xs focus:border-[#3182f6] focus:outline-none"
            />
            <span className="text-xs text-neutral-400">~</span>
            <input
              type="time"
              value={info.weekdayEnd}
              onChange={(e) => onInputChange('weekdayEnd', e.target.value)}
              className="flex-1 px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-xs focus:border-[#3182f6] focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1.5 border border-neutral-100 dark:border-neutral-900/80 rounded-2xl p-4">
          <label className="text-xs font-bold flex items-center gap-1.5 mb-2 text-indigo-500">
            <Clock className="w-3.5 h-3.5" /> 주말 영업시간
          </label>
          <div className="flex items-center gap-2">
            <input
              type="time"
              value={info.weekendStart}
              onChange={(e) => onInputChange('weekendStart', e.target.value)}
              className="flex-1 px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-xs focus:border-[#3182f6] focus:outline-none"
            />
            <span className="text-xs text-neutral-400">~</span>
            <input
              type="time"
              value={info.weekendEnd}
              onChange={(e) => onInputChange('weekendEnd', e.target.value)}
              className="flex-1 px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-xs focus:border-[#3182f6] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Break Times & Holiday */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-500 dark:text-[#a1a1a6]">브레이크 타임</label>
          <div className="flex items-center gap-2">
            <input
              type="time"
              value={info.breakStart}
              onChange={(e) => onInputChange('breakStart', e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-xs focus:border-[#3182f6] focus:outline-none"
            />
            <span className="text-xs text-neutral-400">~</span>
            <input
              type="time"
              value={info.breakEnd}
              onChange={(e) => onInputChange('breakEnd', e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-xs focus:border-[#3182f6] focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-neutral-500 dark:text-[#a1a1a6]">정기 휴무일</label>
          <input
            type="text"
            value={info.holiday}
            onChange={(e) => onInputChange('holiday', e.target.value)}
            placeholder="예: 매주 월요일, 연중무휴"
            className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-xs focus:border-[#3182f6] focus:outline-none"
          />
        </div>
      </div>

      {/* Next Step Trigger Button */}
      <button
        type="button"
        onClick={() => isValid && onNextStep()}
        disabled={!isValid}
        className={`w-full py-4 rounded-2xl font-bold text-xs tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${
          isValid
            ? 'bg-[#3182f6] hover:bg-[#1b64da] text-white cursor-pointer shadow-[0_4px_16px_rgba(49,130,246,0.3)] hover:scale-[1.01]'
            : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-400 dark:text-[#3a3a3c] cursor-not-allowed border border-neutral-200/50 dark:border-neutral-800/50'
        }`}
      >
        좌석 배치도 디자인 단계로 이동
        <ArrowRight className="w-4 h-4 animate-pulse" />
      </button>
    </div>
  );
}
