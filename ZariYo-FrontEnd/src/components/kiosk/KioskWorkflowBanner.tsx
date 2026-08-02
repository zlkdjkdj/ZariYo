interface KioskWorkflowBannerProps {
  guestPhone: string;
  storeName: string;
  onOpenStoreSearch: () => void;
  onOpenPhoneModal: () => void;
}

export function KioskWorkflowBanner({
  guestPhone,
  storeName,
  onOpenStoreSearch,
  onOpenPhoneModal,
}: KioskWorkflowBannerProps) {
  return (
    <div className="bg-[#000000] border-b border-[#333333] px-6 py-3 flex flex-wrap items-center justify-between text-xs select-none gap-2">
      <div className="flex items-center gap-3">
        {/* Step Badges */}
        <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase">
          <span
            className={`px-3 py-1 rounded-[20px] border ${
              guestPhone
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-[#0381fe]/15 text-[#0381fe] border border-[#0381fe]/40 animate-pulse'
            }`}
          >
            1. 휴대폰 인증
          </span>
          <span className="text-neutral-500 font-normal">➔</span>
          <span
            className={`px-3 py-1 rounded-[20px] border ${
              storeName
                ? 'bg-[#0381fe]/15 text-[#0381fe] border-[#0381fe]/30'
                : 'bg-neutral-800 text-neutral-400 border-white/10'
            }`}
          >
            2. 가게 선택
          </span>
          <span className="text-neutral-500 font-normal">➔</span>
          <span className="px-3 py-1 rounded-[20px] bg-purple-500/10 text-purple-400 border border-purple-500/30">
            3. 메뉴 주문
          </span>
        </div>

        <div className="h-3 w-px bg-white/10 hidden sm:block" />

        {/* Current Visitor Phone Info */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#0381fe] animate-pulse" />
          <span className="font-mono text-neutral-400 font-bold hidden md:inline">방문 손님:</span>
          <span className="font-mono font-bold text-[#0381fe] bg-[#0381fe]/10 px-3 py-0.5 rounded-[20px] border border-[#0381fe]/30">
            {guestPhone || '미인증 (번호 입력 필요)'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onOpenStoreSearch}
          className="text-[11px] font-bold text-[#0381fe] hover:text-blue-400 bg-[#0381fe]/10 px-3 py-1 rounded-[20px] border border-[#0381fe]/30 transition-colors flex items-center gap-1 cursor-pointer font-sans"
        >
          <span>가게 변경 ({storeName || '선택안됨'})</span>
        </button>

        <button
          onClick={onOpenPhoneModal}
          className="text-[11px] font-bold text-neutral-400 hover:text-white underline cursor-pointer transition-colors"
        >
          {guestPhone ? '휴대폰 수정' : '번호 인증하기'}
        </button>
      </div>
    </div>
  );
}
