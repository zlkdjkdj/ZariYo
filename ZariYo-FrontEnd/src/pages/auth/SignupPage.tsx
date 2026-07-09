import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, User } from 'lucide-react';
import { AuthCard } from '../../components/auth/AuthCard';
import { AuthInput } from '../../components/auth/AuthInput';

export function SignupPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<'owner' | 'customer'>('owner');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [termsError, setTermsError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateName = (value: string) => {
    if (!value.trim()) {
      setNameError('이름을 입력해주세요.');
      return false;
    }
    setNameError('');
    return true;
  };

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

  const validateConfirmPassword = (value: string, pass: string) => {
    if (!value) {
      setConfirmPasswordError('비밀번호를 한 번 더 입력해주세요.');
      return false;
    }
    if (value !== pass) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmValid = validateConfirmPassword(confirmPassword, password);

    let isTermsValid = true;
    if (!agreeTerms) {
      setTermsError('약관 및 개인정보 대조 동의를 진행하셔야 합니다.');
      isTermsValid = false;
    } else {
      setTermsError('');
    }

    if (isNameValid && isEmailValid && isPasswordValid && isConfirmValid && isTermsValid) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        alert(`${role === 'owner' ? '사장님' : '손님'} 회원가입에 성공했습니다! 로그인 페이지로 이동합니다.`);
        navigate('/login');
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

      {/* Main Signup Card */}
      <AuthCard
        title="ZariYo 회원가입"
        description="실시간 좌석 선점 플랫폼 ZariYo 가입"
        footer={
          <p className="text-xs text-[#4e5968] dark:text-neutral-400 font-bold">
            이미 계정이 있으신가요?{' '}
            <Link to="/login" className="text-[#3182f6] hover:underline ml-1 font-extrabold">
              로그인
            </Link>
          </p>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 역할 선택 탭 */}
          <div className="bg-neutral-100 dark:bg-black/40 border border-[#f2f4f6] dark:border-neutral-800 rounded-full p-1.5 flex gap-1 relative select-none mb-2">
            <button
              type="button"
              onClick={() => setRole('owner')}
              className={`flex-1 py-2.5 rounded-full text-xs font-extrabold tracking-wide transition-all duration-300 relative z-10 cursor-pointer ${
                role === 'owner'
                  ? 'bg-gradient-to-r from-[#3182f6] to-[#4894fe] text-white shadow-[0_4px_12px_rgba(49,130,246,0.2)]'
                  : 'text-[#4e5968] dark:text-neutral-400 hover:text-[#191f28] dark:hover:text-white'
              }`}
            >
              사장님 가입
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
              손님 가입
            </button>
          </div>

          {/* Name input field */}
          <AuthInput
            label="이름"
            type="text"
            placeholder="홍길동"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (nameError) validateName(e.target.value);
            }}
            onBlur={() => validateName(name)}
            error={nameError}
            icon={User}
          />

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
            placeholder="최소 6자 이상"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) validatePassword(e.target.value);
            }}
            onBlur={() => validatePassword(password)}
            error={passwordError}
            icon={Lock}
          />

          {/* Confirm Password input field */}
          <AuthInput
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호 재입력"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (confirmPasswordError) validateConfirmPassword(e.target.value, password);
            }}
            onBlur={() => validateConfirmPassword(confirmPassword, password)}
            error={confirmPasswordError}
            icon={Lock}
          />

          {/* Terms Agreement */}
          <div className="pt-2 select-none font-sans">
            <label className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => {
                  setAgreeTerms(e.target.checked);
                  if (e.target.checked) setTermsError('');
                }}
                className="w-4 h-4 rounded border border-neutral-300 dark:border-white/20 text-[#3182f6] bg-white dark:bg-black focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              <span className="text-[11px] text-[#4e5968] dark:text-neutral-400 font-bold leading-tight group-hover:text-[#191f28] dark:group-hover:text-white transition-colors">
                이용약관 및 개인정보 처리방침에 동의합니다.
              </span>
            </label>
            {termsError && (
              <p className="text-[10px] text-red-500 pl-0.5 pt-1.5 animate-fadeIn font-semibold">
                {termsError}
              </p>
            )}
          </div>

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
              '회원가입'
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
