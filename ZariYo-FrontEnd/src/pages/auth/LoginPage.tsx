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
      setTimeout(() => {
        setIsLoading(false);
        alert('로그인에 성공했습니다! (ZariYo Console)');
        if (role === 'owner') {
          navigate('/owner');
        } else {
          navigate('/reserve');
        }
      }, 1000);
    }
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

      {/* Main Login Card */}
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
        <form onSubmit={handleSubmit} className="space-y-6">
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
              <a href="#forgot" className="text-[10px] text-neutral-500 dark:text-neutral-400 hover:text-[#3182f6] dark:hover:text-[#3182f6] transition-colors hover:underline font-bold">
                비밀번호를 잊으셨나요?
              </a>
            }
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-full font-extrabold text-xs tracking-wider bg-gradient-to-r from-[#3182f6] to-[#4894fe] text-white hover:opacity-95 shadow-[0_6px_25px_rgba(49,130,246,0.2)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 cursor-pointer flex items-center justify-center border-0 ${
              isLoading ? 'opacity-80 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <span className="inline-block w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              '로그인'
            )}
          </button>
        </form>
      </AuthCard>

      {/* Bottom Copyright */}
      <p className="absolute bottom-6 text-[10px] text-neutral-400 dark:text-neutral-600 font-semibold font-mono tracking-tight">
        © 2026 ZariYo. All rights reserved.
      </p>
    </div>
  );
}

