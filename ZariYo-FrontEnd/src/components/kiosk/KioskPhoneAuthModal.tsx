import { useState } from 'react';
import { Phone, CheckCircle2, QrCode, X, Sparkles } from 'lucide-react';

interface KioskPhoneAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (phone: string) => void;
  tableLabel: string;
}

export function KioskPhoneAuthModal({ isOpen, onClose, onSuccess, tableLabel }: KioskPhoneAuthModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  // 숫자 패드 터치 입력 헬퍼
  const handleKeypadPress = (numStr: string) => {
    setErrorMsg('');
    if (numStr === 'DEL') {
      setPhoneNumber((prev) => prev.slice(0, -1));
      return;
    }
    if (numStr === 'CLEAR') {
      setPhoneNumber('');
      return;
    }
    if (phoneNumber.length >= 11) return;
    setPhoneNumber((prev) => prev + numStr);
  };

  // 휴대폰 번호 서식 변환 (010-XXXX-XXXX)
  const formatPhoneNumber = (val: string) => {
    if (!val) return '';
    const clean = val.replace(/\D/g, '');
    if (clean.length <= 3) return clean;
    if (clean.length <= 7) return `${clean.slice(0, 3)}-${clean.slice(3)}`;
    return `${clean.slice(0, 3)}-${clean.slice(3, 7)}-${clean.slice(7, 11)}`;
  };

  const handleConfirm = () => {
    const clean = phoneNumber.replace(/\D/g, '');
    if (clean.length < 10) {
      setErrorMsg('올바른 휴대폰 번호를 입력해 주세요. (예: 010-1234-5678)');
      return;
    }
    const formatted = formatPhoneNumber(clean);
    localStorage.setItem('zariyo_guest_phone', formatted);
    onSuccess(formatted);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fadeIn">
      <div className="bg-[#09090b] border border-neutral-800 rounded-none w-full max-w-md p-6 text-white space-y-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500 text-black font-black">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-black text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  {tableLabel || 'T-1'} 테이블 QR 주문
                </span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              </div>
              <h3 className="text-lg font-black mt-0.5">손님 휴대폰 간편 방문 인증</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Display Screen */}
        <div className="space-y-2">
          <p className="text-xs text-neutral-400 font-semibold text-left">
            별도의 회원가입 없이 휴대폰 번호 입력으로 즉시 방문 인증 및 주문이 진행됩니다.
          </p>

          <div className="p-4 bg-[#111115] border-2 border-emerald-500/50 rounded-none text-center space-y-1">
            <div className="flex items-center justify-center gap-2">
              <Phone className="w-5 h-5 text-emerald-400" />
              <span className="text-2xl font-mono font-black tracking-widest text-emerald-400 min-h-[36px] flex items-center">
                {formatPhoneNumber(phoneNumber) || '010-XXXX-XXXX'}
              </span>
            </div>
          </div>

          {errorMsg && (
            <p className="text-xs text-red-400 font-bold text-center">{errorMsg}</p>
          )}
        </div>

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'CLEAR', '0', 'DEL'].map((key) => (
            <button
              key={key}
              onClick={() => handleKeypadPress(key)}
              className={`py-3.5 rounded-none font-mono font-black text-lg transition-all cursor-pointer ${
                key === 'CLEAR' || key === 'DEL'
                  ? 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 text-xs'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/5 active:scale-95'
              }`}
            >
              {key === 'CLEAR' ? '전체지움' : key === 'DEL' ? '지우기 ⌫' : key}
            </button>
          ))}
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-black font-black text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xl rounded-none active:scale-[0.99]"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>간편 인증 완료 & 2D 좌석 주문하기</span>
        </button>

      </div>
    </div>
  );
}
