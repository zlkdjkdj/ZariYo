import { ChevronRight, Terminal } from 'lucide-react';

export function Architecture() {
  return (
    <section id="architecture" className="py-24 px-6 max-w-6xl mx-auto border-t border-[#e5e5e7] dark:border-[#1c1c1e] bg-white dark:bg-black transition-colors duration-300">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        
        {/* Text Left */}
        <div className="text-left">
          <span className="text-xs font-semibold tracking-wider text-[#3182f6] uppercase">Architecture</span>
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mt-2.5 mb-6">
            고성능 동시성 제어 아키텍처.
          </h2>
          <p className="text-[#86868b] mb-6 leading-relaxed text-sm md:text-base font-normal">
            자리요는 대규모 오피스 및 교육 기관 등 순간적인 동시 요청이 쏟아지는 분산 트래픽 환경에서 완벽한 성능을 내도록 설계되었습니다. 
            메모리 내 고속 분산 캐시 캐싱 레이어와 영속적 RDB 트랜잭션 설계를 유기적으로 결합했습니다.
          </p>
          
          <div className="space-y-5">
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-md bg-[#3182f6]/10 flex items-center justify-center mt-1"><ChevronRight className="w-3.5 h-3.5 text-[#3182f6]" /></div>
              <div>
                <h4 className="text-black dark:text-white font-semibold text-sm">Redis Pub/Sub 실시간 브로드캐스팅</h4>
                <p className="text-[#86868b] text-xs mt-0.5 leading-relaxed">WAS 클러스터 노드 간의 상태를 즉각 동기화해 다중 디바이스 간 중복 점유를 미연에 방지합니다.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-5 h-5 rounded-md bg-[#3182f6]/10 flex items-center justify-center mt-1"><ChevronRight className="w-3.5 h-3.5 text-[#3182f6]" /></div>
              <div>
                <h4 className="text-black dark:text-white font-semibold text-sm">격리 수준 기반의 정합성 유지</h4>
                <p className="text-[#86868b] text-xs mt-0.5 leading-relaxed">디비 동시 경합 시 정밀한 락 매커니즘을 부여해 단 한 건의 유효한 예약 건만 DB에 영속화합니다.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Diagram Right */}
        <div className="rounded-3xl border border-[#e5e5e7] dark:border-[#2c2c2e]/60 bg-[#f5f5f7]/60 dark:bg-[#1c1c1e] p-8 shadow-sm transition-colors duration-300">
          <h3 className="text-xs font-bold text-black dark:text-white mb-6 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#3182f6]" />
            <span>자원 점유 트랜잭션 라이프사이클</span>
          </h3>
          
          <div className="space-y-4 text-xs">
            
            <div className="p-4.5 rounded-2xl bg-white dark:bg-black border border-[#e5e5e7] dark:border-[#2c2c2e]/50 flex justify-between items-center transition-colors duration-300">
              <div className="flex items-center gap-4">
                <div className="w-7 h-7 rounded-xl bg-[#3182f6]/10 text-[#3182f6] flex items-center justify-center font-bold text-xs">1</div>
                <div>
                  <p className="font-semibold text-black dark:text-white">좌석 선택 요청 수신</p>
                  <p className="text-[#86868b] text-[10px]">Client → REST API Gateway</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-[#1c1c1e] text-[#86868b] font-medium text-[9px]">REST API</span>
            </div>

            <div className="p-4.5 rounded-2xl bg-white dark:bg-black border border-[#e5e5e7] dark:border-[#2c2c2e]/50 flex justify-between items-center transition-colors duration-300">
              <div className="flex items-center gap-4">
                <div className="w-7 h-7 rounded-xl bg-[#3182f6]/10 text-[#3182f6] flex items-center justify-center font-bold text-xs">2</div>
                <div>
                  <p className="font-semibold text-black dark:text-white">Redis 분산 락 획득</p>
                  <p className="text-[#86868b] text-[10px]">Redisson을 통한 고속 원자성 점유 설정 (5분)</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#3182f6]/10 text-[#3182f6] font-medium text-[9px]">0.5 ms</span>
            </div>

            <div className="p-4.5 rounded-2xl bg-white dark:bg-black border border-[#e5e5e7] dark:border-[#2c2c2e]/50 flex justify-between items-center transition-colors duration-300">
              <div className="flex items-center gap-4">
                <div className="w-7 h-7 rounded-xl bg-[#3182f6]/10 text-[#3182f6] flex items-center justify-center font-bold text-xs">3</div>
                <div>
                  <p className="font-semibold text-black dark:text-white">상태 실시간 전파</p>
                  <p className="text-[#86868b] text-[10px]">웹소켓 게이트웨이를 경유해 전체 클라이언트에 통지</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-[#1c1c1e] text-[#86868b] font-medium text-[9px]">WebSocket</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
