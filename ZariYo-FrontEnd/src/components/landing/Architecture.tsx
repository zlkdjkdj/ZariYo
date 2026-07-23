import { ChevronRight, Terminal } from 'lucide-react';

export function Architecture() {
  return (
    <section id="architecture" className="py-24 w-full border-t border-neutral-200/50 dark:border-white/5 bg-slate-50 dark:bg-black text-neutral-900 dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Text Left */}
        <div className="text-left select-none">
          <span className="text-[10px] font-extrabold tracking-widest text-[#3182f6] uppercase font-mono bg-[#3182f6]/10 px-3 py-1 rounded-full">Architecture</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-4 mb-6 leading-tight tracking-tight text-neutral-900 dark:text-white">
            동시성 충돌 ZERO,<br />분산 락 아키텍처.
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 mb-8 leading-relaxed text-xs md:text-sm font-semibold">
            서로 다른 사용자가 동시에 같은 좌석을 선점하거나 결제를 유도할 때 발생하는 경쟁 조건(Race Condition)을 격리 수준에 의존하지 않고 
            메모리 내 고속 Redis 분산 락 레이어로 무결 선점 차단합니다.
          </p>
          
          <div className="space-y-5">
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-[#3182f6]/15 border border-[#3182f6]/30 flex items-center justify-center mt-0.5 shrink-0">
                <ChevronRight className="w-3.5 h-3.5 text-[#3182f6]" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs md:text-sm text-neutral-800 dark:text-white">Redis Pub/Sub 실시간 브로드캐스팅</h4>
                <p className="text-neutral-500 dark:text-neutral-400 text-[10.5px] md:text-xs mt-1 leading-relaxed font-semibold">동일 공간 데이터를 바라보는 여러 게이트웨이 노드들 간에 WebSocket 브로드캐스트 상태 동기화로 중복 충돌을 방지합니다.</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-[#3182f6]/15 border border-[#3182f6]/30 flex items-center justify-center mt-0.5 shrink-0">
                <ChevronRight className="w-3.5 h-3.5 text-[#3182f6]" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs md:text-sm text-neutral-800 dark:text-white">DB 트랜잭션 오버헤드 최소화</h4>
                <p className="text-neutral-500 dark:text-neutral-400 text-[10.5px] md:text-xs mt-1 leading-relaxed font-semibold">모든 경쟁 요소를 고속 캐시 메모리 락 단계에서 1차 차단하고 통과된 1건의 트랜잭션만 RDB 영속성 컨텍스트에 락을 부여해 부하를 비약적으로 격감시킵니다.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Diagram Right - Frosted Glass Container */}
        <div className="rounded-[2.5rem] border border-neutral-200 dark:border-white/5 bg-white dark:bg-[#09090b]/80 backdrop-blur-2xl p-8 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <h3 className="text-[10px] font-extrabold text-neutral-500 dark:text-neutral-400 mb-6 flex items-center gap-2 font-mono">
            <Terminal className="w-4 h-4 text-[#3182f6]" />
            <span>선점 제어 트랜잭션 파이프라인</span>
          </h3>
          
          <div className="space-y-4 text-xs font-semibold">
            
            <div className="p-4 rounded-xl bg-neutral-100/40 dark:bg-white/[0.01] border border-neutral-200 dark:border-white/5 flex justify-between items-center transition-all hover:border-neutral-300 hover:dark:border-white/15">
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-lg bg-neutral-200/50 dark:bg-white/5 text-neutral-600 dark:text-neutral-300 flex items-center justify-center font-black text-xs">1</div>
                <div>
                  <p className="font-extrabold text-neutral-800 dark:text-white text-[11px]">좌석 점유 요청 수신</p>
                  <p className="text-neutral-500 dark:text-neutral-400 text-[9px] font-mono mt-0.5">REST API Gateway 수신</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-neutral-200/50 dark:bg-white/5 text-neutral-500 dark:text-neutral-400 text-[8px] font-mono border border-neutral-200/60 dark:border-white/5">API GATEWAY</span>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-white/[0.03] border border-blue-500/30 dark:border-[#3182f6]/35 flex justify-between items-center transition-all hover:border-blue-500/50 hover:dark:border-[#3182f6]/50 shadow-[0_0_12px_rgba(49,130,246,0.08)]">
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#3182f6] to-[#4894fe] text-white flex items-center justify-center font-black text-xs">2</div>
                <div>
                  <p className="font-extrabold text-neutral-800 dark:text-white text-[11px]">Redis 분산 락 획득 성공</p>
                  <p className="text-[#3182f6] text-[9px] font-mono mt-0.5">Redisson Distributed Lock (Hold 5m)</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#3182f6]/10 text-[#3182f6] text-[8px] font-mono border border-[#3182f6]/20">0.5 ms / SECURE</span>
            </div>

            <div className="p-4 rounded-xl bg-neutral-100/40 dark:bg-white/[0.01] border border-neutral-200 dark:border-white/5 flex justify-between items-center transition-all hover:border-neutral-300 hover:dark:border-white/15">
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-lg bg-neutral-200/50 dark:bg-white/5 text-neutral-600 dark:text-neutral-300 flex items-center justify-center font-black text-xs">3</div>
                <div>
                  <p className="font-extrabold text-neutral-800 dark:text-white text-[11px]">실시간 상태 전파 브로드캐스트</p>
                  <p className="text-neutral-500 dark:text-neutral-400 text-[9px] font-mono mt-0.5">WebSocket 클러스터 전체 전달</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-neutral-200/50 dark:bg-white/5 text-neutral-500 dark:text-neutral-400 text-[8px] font-mono border border-neutral-200/60 dark:border-white/5">WEBSOCKET</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}


