import { ChevronRight, Terminal } from 'lucide-react';

export function Architecture() {
  return (
    <section id="architecture" className="py-20 relative z-10 px-6 max-w-7xl mx-auto border-t border-slate-900/60">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        
        {/* Text Left */}
        <div className="text-left">
          <span className="text-xs font-semibold tracking-wider text-indigo-400 uppercase">Architecture</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3 mb-6">
            다중 사용자를 위한 강력한 아키텍처 구성
          </h2>
          <p className="text-slate-400 mb-6 leading-relaxed">
            자리요는 대규모 오피스 및 대학 도서관 등 고밀도 트래픽 환경에서도 안정적으로 동작하도록 설계되었습니다.
            메모리 내 고속 캐시인 Redis와 관계형 데이터베이스 MySQL을 결합한 하이브리드 데이터 아키텍처를 도입했습니다.
          </p>
          
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded bg-indigo-500/10 flex items-center justify-center mt-1"><ChevronRight className="w-3.5 h-3.5 text-indigo-400" /></div>
              <div>
                <h4 className="text-white font-semibold text-sm">Redis Pub/Sub & WebSockets</h4>
                <p className="text-slate-400 text-xs mt-0.5">여러 WAS 서버 간 좌석 점유 현황 동기화를 즉각 처리합니다.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded bg-indigo-500/10 flex items-center justify-center mt-1"><ChevronRight className="w-3.5 h-3.5 text-indigo-400" /></div>
              <div>
                <h4 className="text-white font-semibold text-sm">Spring Boot 트랜잭션 격리</h4>
                <p className="text-slate-400 text-xs mt-0.5">데이터 원자성 보장으로 좌석 중복 결제 및 예약을 방지합니다.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Diagram Right */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-6 backdrop-blur-md">
          <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-400" />
            자원 점유 트랜잭션 흐름도 (Sequence Flow)
          </h3>
          
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">1</div>
                <div>
                  <p className="font-semibold text-slate-200">좌석 선택 요청</p>
                  <p className="text-slate-500 text-[10px]">Client → API Gateway</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-semibold text-[10px]">HTTPS</span>
            </div>

            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">2</div>
                <div>
                  <p className="font-semibold text-slate-200">Redis 분산 락 획득 시도</p>
                  <p className="text-slate-500 text-[10px]">비선점 검증 & 5분 임시 락 설정</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-semibold text-[10px]">0.5ms 이하</span>
            </div>

            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">3</div>
                <div>
                  <p className="font-semibold text-slate-200">좌석 현황 브로드캐스트</p>
                  <p className="text-slate-500 text-[10px]">WebSocket을 통해 타 클라이언트에 점유 표시</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 font-semibold text-[10px]">Websocket</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
