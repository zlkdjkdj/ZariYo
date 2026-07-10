import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AuthCard } from '../../components/auth/AuthCard';
import { AuthInput } from '../../components/auth/AuthInput';
import { Button } from '../../components/ui/Button';

const loginSchema = z.object({
  email: z.string().min(1, '이메일을 입력해주세요.').email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<'owner' | 'customer'>('owner');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(`로그인 성공! (${data.email})`);
      if (role === 'owner') navigate('/owner');
      else navigate('/reserve');
    }, 1000);
  };

  return (
    <div className="bg-[#f9fafb] dark:bg-[#101012] text-[#191f28] dark:text-[#f9fafb] font-sans selection:bg-[#3182f6]/20 min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden transition-colors duration-300">
      
      {/* Toss Light Blue Glow spill */}
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[70%] h-[50%] rounded-full bg-[#3182f6]/3 dark:bg-[#3182f6]/6 blur-[130px] pointer-events-none -z-10" />

      {/* Top Bar for Back Navigation */}
      <div className="absolute top-6 left-6 md:left-12 select-none z-20">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-xs font-bold text-[#4e5968] hover:text-[#191f28] dark:text-[#a1a1a6] dark:hover:text-white transition-colors duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#3182f6]" />
          랜딩 페이지로 돌아가기
        </button>
      </div>

      <AuthCard
        title="ZariYo 로그인"
        description="공간 실시간 선점 플랫폼, 자리요 콘솔 제어기"
        footer={
          <p className="text-xs text-[#4e5968] dark:text-neutral-400 font-bold">
            아직 회원이 아니신가요?{' '}
            <Link to="/signup" className="text-[#3182f6] hover:underline ml-1 font-extrabold">
              회원가입
            </Link>
          </p>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* 역할 선택 탭 */}
          <div className="bg-neutral-100 dark:bg-black/40 border border-[#f2f4f6] dark:border-neutral-800 rounded-full p-1.5 flex gap-1 relative select-none">
            <button
              type="button"
              onClick={() => setRole('owner')}
              className={`flex-1 py-2.5 rounded-full text-xs font-extrabold tracking-wide transition-all duration-300 relative z-10 cursor-pointer ${
                role === 'owner'
                  ? 'bg-gradient-to-r from-[#3182f6] to-[#4894fe] text-white shadow-[0_4px_12px_rgba(49,130,246,0.2)]'
                  : 'text-[#4e5968] dark:text-neutral-400 hover:text-[#191f28] dark:hover:text-white'
              }`}
            >
              사장님 로그인
            </button>
            <button
              type="button"
              onClick={() => setRole('customer')}
              className={`flex-1 py-2.5 rounded-full text-xs font-extrabold tracking-wide transition-all duration-300 relative z-10 cursor-pointer ${
                role === 'customer'
                  ? 'bg-gradient-to-r from-[#3182f6] to-[#4894fe] text-white shadow-[0_4px_12px_rgba(49,130,246,0.2)]'
                  : 'text-[#4e5968] dark:text-neutral-400 hover:text-[#191f28] dark:hover:text-white'
              }`}
            >
              손님 로그인
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
              <a href="#forgot" className="text-[10px] text-neutral-500 dark:text-neutral-400 hover:text-[#3182f6] dark:hover:text-[#3182f6] transition-colors hover:underline font-bold">
                비밀번호를 잊으셨나요?
              </a>
            }
          />

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
        </form>
      </AuthCard>

      <p className="absolute bottom-6 text-[10px] text-neutral-400 dark:text-neutral-600 font-semibold font-mono tracking-tight">
        © 2026 ZariYo. All rights reserved.
      </p>
    </div>
  );
}

