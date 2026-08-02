import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, LayoutGrid, ShieldCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuthInput } from '../../components/auth/AuthInput';
import { Button } from '../../components/ui/Button';
import { authApi } from '../../api/authApi';
import { authStorage } from '../../utils/authStorage';

const loginSchema = z.object({
  email: z.string().min(1, '이메일을 입력해주세요.').email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<'owner' | 'admin'>('owner');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const token = authStorage.getAccessToken();
    const user = authStorage.getUser();
    if (token && user) {
      if (user.role === 'ROLE_ADMIN') {
        navigate('/admin/users');
      } else {
        navigate('/owner/stores');
      }
    }
  }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setApiError(null);
    try {
      const res = await authApi.login({ email: data.email });
      authStorage.setSession(res.accessToken, res.refreshToken, res.user, rememberMe);

      if (role === 'admin') navigate('/admin/users');
      else navigate('/owner/stores');
    } catch (err: any) {
      const msg = err.response?.data?.message || '로그인에 실패했습니다. 이메일을 확인해 주세요.';
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
              매장의 모든 동선을<br />실시간 제어하고 점유합니다.
            </h2>
            <p className="text-white/60 text-xs md:text-sm mt-4 leading-relaxed font-semibold max-w-md">
              초당 수만 건의 예약 경합도 고속 분산 락 캐시를 이용해 안전하게 처리하는 ZariYo 파이프라인 콘솔.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Right Side: 50% Auth Form Panel */}
      <div className="w-full md:w-1/2 h-screen flex flex-col justify-between p-8 md:p-16 overflow-y-auto relative z-10">
        
        {/* Top bar (Back Navigation) */}
        <div className="flex justify-between items-center select-none w-full">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-neutral-900 dark:text-[#a1a1a6] dark:hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#000000]" />
            메인으로
          </button>

          <Link to="/signup" className="text-xs text-[#000000] hover:underline font-extrabold">
            회원가입 하기
          </Link>
        </div>

        {/* Center LoginForm Container */}
        <div className="max-w-md w-full mx-auto my-auto py-10">
          
          {/* Header titles */}
          <div className="text-left mb-10 select-none">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-neutral-950 dark:text-white">
              자리요 로그인
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 text-xs md:text-sm mt-2 leading-relaxed font-bold">
              계정에 로그인하여 매장 관리 및 예약을 제어하세요.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {apiError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-xs font-bold text-center">
                {apiError}
              </div>
            )}
            {/* Role Select tabs */}
            <div className="bg-neutral-200/40 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/5 rounded-full p-1.5 flex gap-1 relative select-none">
              <button
                type="button"
                onClick={() => setRole('owner')}
                className={`flex-1 py-2.5 rounded-full text-xs font-extrabold tracking-wide transition-all duration-300 relative z-10 cursor-pointer ${
                  role === 'owner'
                    ? 'bg-gradient-to-r from-[#000000] to-[#000000] text-white shadow-none'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                사장님 로그인
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`flex-1 py-2.5 rounded-full text-xs font-extrabold tracking-wide transition-all duration-300 relative z-10 cursor-pointer ${
                  role === 'admin'
                    ? 'bg-gradient-to-r from-[#000000] to-[#000000] text-white shadow-none'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                관리자 로그인
              </button>
            </div>

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
              placeholder="비밀번호 입력"
              icon={Lock}
              {...register('password')}
              error={errors.password?.message}
              rightElement={
                <a href="#forgot" className="text-[10px] text-neutral-500 dark:text-neutral-400 hover:text-[#000000] dark:hover:text-[#000000] transition-colors hover:underline font-bold">
                  비밀번호를 잊으셨나요?
                </a>
              }
            />

            {/* Remember Me Security Checkbox */}
            <div className="flex items-center justify-between px-1 select-none">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-700 text-[#0381fe] focus:ring-[#0381fe] cursor-pointer"
                />
                <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                  로그인 상태 유지 (Remember Me)
                </span>
              </label>
              <span className="text-[10.5px] font-mono font-bold text-[#0381fe] bg-[#0381fe]/10 px-2 py-0.5 rounded-[20px] flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                {rememberMe ? 'PERSISTENT' : 'SESSION ONLY (SAFE)'}
              </span>
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
                '로그인'
              )}
            </Button>

            {/* 카카오 소셜 로그인 구분선 및 버튼 */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200 dark:border-neutral-800" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-white dark:bg-neutral-900 px-3 text-neutral-400 font-bold">또는 소셜 로그인</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID || 'zariyo_kakao_client_id';
                const redirectUri = encodeURIComponent('http://localhost:5173/auth/kakao/callback');
                window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
              }}
              className="w-full py-3.5 px-4 bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] font-extrabold text-xs rounded-full flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 3C6.477 3 2 6.477 2 10.772c0 2.766 1.83 5.19 4.607 6.558-.2.744-.725 2.695-.83 3.102-.132.51.187.502.392.366.162-.107 2.573-1.748 3.616-2.457.728.106 1.48.163 2.215.163 5.523 0 10-3.477 10-7.772S17.523 3 12 3z"/>
              </svg>
              카카오로 시작하기
            </button>
          </form>
        </div>

        {/* Footer copyright */}
        <div className="w-full text-center md:text-left select-none">
          <p className="text-[10px] text-neutral-400 dark:text-neutral-600 font-semibold font-mono tracking-tight">
            © 2026 ZariYo. All rights reserved.
          </p>
        </div>

      </div>

    </div>
  );
}
