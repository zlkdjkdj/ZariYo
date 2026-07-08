import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock } from 'lucide-react';
import { AuthCard } from '../../components/auth/AuthCard';
import { AuthInput } from '../../components/auth/AuthInput';

export function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<'owner' | 'customer'>('owner');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError('이메일을 입력해주세요.');
      return false;
    }
    if (!emailRegex.test(value)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError('비밀번호를 입력해주세요.');
      return false;
    }
    if (value.length < 6) {
      setPasswordError('비밀번호는 최소 6자 이상이어야 합니다.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      setIsLoading(true);
      // 목업 로그인 지연 효과
      setTimeout(() => {
        setIsLoading(false);
        alert('로그인에 성공했습니다! (데모 모드)');
        if (role === 'owner') {
          navigate('/owner');
        } else {
          navigate('/reserve');
        }
      }, 1000);
    }
  };

  return (
    <div className="bg-white dark:bg-black text-[#1d1d1f] dark:text-[#f5f5f7] font-sans selection:bg-[#3182f6]/20 min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden transition-colors duration-300">
      {/* Background radial gradient decoration for high premium look */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#3182f6]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#3182f6]/5 blur-[120px] pointer-events-none" />

      {/* Top Bar for Back Navigation */}
      <div className="absolute top-6 left-6 md:left-12">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-xs text-[#86868b] hover:text-black dark:text-[#a1a1a6] dark:hover:text-[#f5f5f7] transition-colors duration-200 group cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          랜딩 페이지로 돌아가기
        </button>
      </div>

      {/* Main Login Card (Refactored with AuthCard) */}
      <AuthCard
        title="자리요에 로그인"
        description="실시간 좌석 선점 플랫폼, 자리요를 시작해 보세요."
        footer={
          <p className="text-xs text-[#86868b]">
            아직 회원이 아니신가요?{' '}
            <Link to="/signup" className="text-[#3182f6] hover:underline font-medium ml-1">
              회원가입
            </Link>
          </p>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 역할 선택 탭 (사장님 / 손님) */}
          <div className="bg-black/5 dark:bg-[#2c2c2e]/50 border border-neutral-200 dark:border-neutral-800/80 rounded-xl p-1 flex gap-1 relative select-none">
            <button
              type="button"
              onClick={() => setRole('owner')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-300 relative z-10 cursor-pointer ${role === 'owner'
                  ? 'bg-white dark:bg-neutral-800 text-black dark:text-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
                  : 'text-neutral-500 hover:text-neutral-700 dark:text-[#a1a1a6] dark:hover:text-[#f5f5f7]'
                }`}
            >
              사장님으로 로그인
            </button>
            <button
              type="button"
              onClick={() => setRole('customer')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-300 relative z-10 cursor-pointer ${role === 'customer'
                  ? 'bg-white dark:bg-neutral-800 text-black dark:text-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
                  : 'text-neutral-500 hover:text-neutral-700 dark:text-[#a1a1a6] dark:hover:text-[#f5f5f7]'
                }`}
            >
              손님으로 로그인
            </button>
          </div>

          {/* Email input field */}
          <AuthInput
            label="이메일 주소"
            type="email"
            placeholder="example@zariyo.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) validateEmail(e.target.value);
            }}
            onBlur={() => validateEmail(email)}
            error={emailError}
            icon={Mail}
          />

          {/* Password input field */}
          <AuthInput
            label="비밀번호"
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) validatePassword(e.target.value);
            }}
            onBlur={() => validatePassword(password)}
            error={passwordError}
            icon={Lock}
            rightElement={
              <a href="#forgot" className="text-[11px] text-[#3182f6] hover:underline">
                비밀번호를 잊으셨나요?
              </a>
            }
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3.5 rounded-xl font-semibold text-xs tracking-wide bg-[#3182f6] hover:bg-[#1b64da] text-white cursor-pointer shadow-[0_4px_12px_rgba(49,130,246,0.3)] transition-all duration-200 active:scale-[0.98] flex items-center justify-center ${isLoading ? 'opacity-80 cursor-not-allowed' : ''
              }`}
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              '로그인'
            )}
          </button>
        </form>
      </AuthCard>

      {/* Bottom Copyright */}
      <p className="absolute bottom-6 text-[10px] text-[#48484a] dark:text-[#86868b] tracking-tight">
        © 2026 ZariYo. All rights reserved.
      </p>
    </div>
  );
}
