import { useEffect, useRef, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { authApi } from '../../api/authApi';
import { authStorage } from '../../utils/authStorage';

export function KakaoCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const calledRef = useRef(false);

  const code = searchParams.get('code');

  useEffect(() => {
    if (!code) {
      setStatus('error');
      setErrorMsg('카카오 소셜 로그인 인가 코드가 존재하지 않습니다.');
      return;
    }

    if (calledRef.current) return;
    calledRef.current = true;

    authApi
      .kakaoLogin({ code })
      .then((res) => {
        authStorage.setSession(res.accessToken, res.refreshToken, res.user, false);
        setStatus('success');


        setTimeout(() => {
          if (res.user.role === 'ROLE_ADMIN') navigate('/admin/users');
          else if (res.user.role === 'ROLE_OWNER') navigate('/owner/stores');
          else navigate('/');
        }, 1000);
      })
      .catch((err) => {
        calledRef.current = false;
        setStatus('error');
        setErrorMsg(
          err.response?.data?.message ||
            '카카오 소셜 로그인 인증에 실패했습니다. 다시 시도해 주세요.'
        );
      });
  }, [code, navigate]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 select-none">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center shadow-2xl space-y-6">
        {status === 'loading' && (
          <>
            <div className="flex justify-center">
              <Loader2 className="w-12 h-12 text-amber-400 animate-spin" />
            </div>
            <h2 className="text-xl font-bold text-slate-100">카카오 소셜 로그인 처리 중</h2>
            <p className="text-sm text-slate-400">
              카카오 계정 정보를 인증하고 보안 토큰을 발급받고 있습니다...
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="flex justify-center">
              <CheckCircle2 className="w-12 h-12 text-amber-400 animate-bounce" />
            </div>
            <h2 className="text-xl font-bold text-amber-400">카카오 로그인 성공!</h2>
            <p className="text-sm text-slate-300">
              인증이 완료되었습니다. 잠시 후 이동합니다.
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="flex justify-center">
              <AlertCircle className="w-12 h-12 text-rose-500" />
            </div>
            <h2 className="text-xl font-bold text-rose-400">로그인 인증 실패</h2>
            <p className="text-sm text-rose-200/80 bg-rose-950/50 p-3 rounded-lg border border-rose-900/40">
              {errorMsg}
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-all cursor-pointer"
            >
              로그인 화면으로 돌아가기
            </button>
          </>
        )}
      </div>
    </div>
  );
}
