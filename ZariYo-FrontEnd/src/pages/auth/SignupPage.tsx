import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, User, LayoutGrid, Shield } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuthInput } from '../../components/auth/AuthInput';
import { Button } from '../../components/ui/Button';
import { authApi } from '../../api/authApi';
import { authStorage } from '../../utils/authStorage';

const signupSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  email: z.string().min(1, '이메일을 입력해주세요.').email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
  confirmPassword: z.string().min(1, '비밀번호를 한 번 더 입력해주세요.'),
  agreeTerms: z.literal(true, {
    message: '약관 및 개인정보 처리에 동의하셔야 합니다.',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignupPage() {
  const navigate = useNavigate();
  const [role] = useState<'owner' | 'customer'>('owner');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    setApiError(null);
    try {
      const rolePayload = role === 'owner' ? 'ROLE_OWNER' : 'ROLE_CUSTOMER';
      const res = await authApi.signup({
        name: data.name,
        email: data.email,
        role: rolePayload,
      });

      authStorage.setSession(res.accessToken, res.refreshToken, res.user, false);

      alert(`${role === 'owner' ? '사장님' : '손님'} 회원가입에 성공했습니다! 매장 선택 게이트웨이로 이동합니다.`);

      if (role === 'owner') navigate('/owner/stores');
      else navigate('/reserve');
    } catch (err: any) {
      const msg = err.response?.data?.message || '회원가입에 실패했습니다. 다시 시도해 주세요.';
      setApiError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-[#030303] text-neutral-900 dark:text-[#f5f5f7] font-sans selection:bg-[#000000]/20 min-h-screen flex transition-colors duration-300 relative overflow-hidden">
      
      {/* 1. Left Side: 50% Graphic Banner Panel */}
      <div className="hidden md:flex w-1/2 h-screen relative overflow-hidden select-none bg-black">
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/30 to-transparent z-10" />
        <img 
          src="/images/auth_cover.png" 
          alt="Luxury Lounge Vibe" 
          className="w-full h-full object-cover scale-[1.02] opacity-85"
        />
        
        {/* Floating overlays on Image */}
        <div className="absolute inset-0 z-20 p-16 flex flex-col justify-between items-start text-left">
          {/* Top Logo */}
          <div 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-none bg-gradient-to-tr from-[#000000] to-[#000000] flex items-center justify-center shadow-none">
              <LayoutGrid className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-white flex items-center">
              ZariYo <span className="text-[#000000] font-mono text-[9px] ml-1.5 font-bold tracking-widest uppercase bg-[#000000]/10 px-2 py-0.5 rounded-full border border-[#000000]/20">Console</span>
            </span>
          </div>

          {/* Bottom typography context */}
          <div>
            <span className="text-[10px] font-black tracking-widest text-[#000000] uppercase font-mono bg-[#000000]/20 px-3 py-1 rounded-full border border-[#000000]/30 backdrop-blur-md">
              Atomic space management
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-4 leading-tight drop-shadow-none">
              단 1ms 오차도 허용하지 않는<br />동시 예약 락 무결성을 가집니다.
            </h2>
            <p className="text-white/60 text-xs md:text-sm mt-4 leading-relaxed font-semibold max-w-md">
              지금 바로 가입하여 20px 격자 스냅 캔버스와 실시간 모니터링 관제 시나리오를 설계해 보세요.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Right Side: 50% Auth Form Panel */}
      <div className="w-full md:w-1/2 h-screen flex flex-col justify-between p-8 md:p-16 overflow-y-auto relative z-10">
        
        {/* Top bar (Back Navigation) */}
        <div className="flex justify-between items-center select-none w-full shrink-0">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-neutral-900 dark:text-[#a1a1a6] dark:hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#000000]" />
            메인으로
          </button>

          <Link to="/login" className="text-xs text-[#000000] hover:underline font-extrabold">
            이미 회원이신가요?
          </Link>
        </div>

        {/* Center SignupForm Container */}
        <div className="max-w-md w-full mx-auto my-auto py-10 shrink-0">
          
          {/* Header titles */}
          <div className="text-left mb-6 select-none">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-neutral-950 dark:text-white">
              자리요 회원가입
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-xs md:text-sm mt-2 leading-relaxed font-bold">
              계정을 생성하여 ZariYo의 정밀 선점 제어판을 설계하세요.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {apiError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-xs font-bold text-center">
                {apiError}
              </div>
            )}
            {/* Owner Account Banner & Customer QR Notice */}
            <div className="p-3.5 bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded-lg text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-black text-emerald-600 dark:text-emerald-400">
                <Shield className="w-4 h-4" />
                <span>사장님 전용 계정 등록</span>
              </div>
              <p className="text-neutral-500 dark:text-neutral-400 text-[11px] font-semibold">
                ※ 손님은 별도의 회원가입 없이 매장 테이블 QR 스티커 스캔 후 휴대폰 번호 간편 인증으로 즉시 주문하실 수 있습니다.
              </p>
            </div>

            <AuthInput
              label="이름"
              type="text"
              placeholder="홍길동"
              icon={User}
              {...register('name')}
              error={errors.name?.message}
            />

            <AuthInput
              label="이메일 주소"
              type="email"
              placeholder="example@zariyo.com"
              icon={Mail}
              {...register('email')}
              error={errors.email?.message}
            />

            <AuthInput
              label="비밀번호"
              type="password"
              placeholder="최소 6자 이상"
              icon={Lock}
              {...register('password')}
              error={errors.password?.message}
            />

            <AuthInput
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호 재입력"
              icon={Lock}
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />

            {/* Terms Agreement */}
            <div className="pt-2 select-none font-sans">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  {...register('agreeTerms')}
                  className="w-4 h-4 rounded border border-neutral-300 dark:border-white/20 text-[#000000] bg-white dark:bg-black focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-bold leading-tight group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">
                  이용약관 및 개인정보 처리방침에 동의합니다.
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="text-[10px] text-red-500 pl-0.5 pt-1.5 animate-fadeIn font-semibold">
                  {errors.agreeTerms.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="w-full py-4 rounded-full font-extrabold text-xs tracking-wider border-0"
            >
              {isLoading ? (
                <span className="inline-block w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                '회원가입'
              )}
            </Button>
          </form>
        </div>

        {/* Footer copyright */}
        <div className="w-full text-center md:text-left select-none shrink-0">
          <p className="text-[10px] text-neutral-400 dark:text-neutral-600 font-semibold font-mono tracking-tight">
            © 2026 ZariYo. All rights reserved.
          </p>
        </div>

      </div>

    </div>
  );
}
