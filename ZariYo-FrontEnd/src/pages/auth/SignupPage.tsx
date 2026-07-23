import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, User, LayoutGrid } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuthInput } from '../../components/auth/AuthInput';
import { Button } from '../../components/ui/Button';

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
  const [role, setRole] = useState<'owner' | 'customer'>('owner');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(`${role === 'owner' ? '사장님' : '손님'} 회원가입에 성공했습니다! 로그인 페이지로 이동합니다.`);
      navigate('/login');
    }, 1000);
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
            {/* Role Select tabs */}
            <div className="bg-neutral-200/40 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/5 rounded-full p-1.5 flex gap-1 relative select-none mb-4">
              <button
                type="button"
                onClick={() => setRole('owner')}
                className={`flex-1 py-2.5 rounded-full text-xs font-extrabold tracking-wide transition-all duration-300 relative z-10 cursor-pointer ${
                  role === 'owner'
                    ? 'bg-gradient-to-r from-[#000000] to-[#000000] text-white shadow-none'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                사장님 가입
              </button>
              <button
                type="button"
                onClick={() => setRole('customer')}
                className={`flex-1 py-2.5 rounded-full text-xs font-extrabold tracking-wide transition-all duration-300 relative z-10 cursor-pointer ${
                  role === 'customer'
                    ? 'bg-gradient-to-r from-[#000000] to-[#000000] text-white shadow-none'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                손님 가입
              </button>
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
