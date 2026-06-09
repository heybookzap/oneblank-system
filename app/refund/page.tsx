'use client'

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-pretendard selection:bg-[#C2A35D] selection:text-black">
      <main className="flex-1 max-w-4xl mx-auto py-24 px-6 space-y-12 w-full">
        <h1 className="text-3xl font-serif font-bold tracking-tight text-[#C2A35D]">취소 및 환불 안내</h1>
        
        <div className="bg-[#0A0A0A] border border-[#C2A35D]/40 p-10 rounded-3xl space-y-6 shadow-[0_0_30px_rgba(194,163,93,0.1)]">
          <h2 className="text-[#C2A35D] text-xl font-bold">[ 14일 동안 마음 편히 써보는 100% 안심 보장 ]</h2>
          <p className="text-zinc-200 text-[17px] leading-relaxed break-keep font-medium">
            ONE BLANK는 대표님의 확실한 변화를 약속합니다. 돈을 내고 나서 14일 동안, 매일 아침 시스템이 전해주는 '2분짜리 쉬운 행동'을 하루도 빠짐없이 따라 했는데도 머릿속 걱정과 미루는 습관이 전혀 줄어들지 않았다면 어떻게 해야 할까요?
          </p>
          <p className="text-white font-bold text-lg underline underline-offset-8 decoration-[#C2A35D]">
            저희가 약속을 지키지 못한 것입니다. 확인 후 곧바로 100% 전액 환불해 드립니다.
          </p>
        </div>

        <div className="space-y-12 pt-16 border-t border-zinc-900">
          <section className="space-y-6">
            <h2 className="text-white text-xl font-medium tracking-tight italic">자세한 환불 기준 안내</h2>
            <div className="grid grid-cols-1 gap-8 text-zinc-400">
              <div className="space-y-4 bg-zinc-900/30 p-8 rounded-2xl border border-zinc-800">
                <p className="text-white font-bold text-base">[ 14일 전액 환불 규칙 ]</p>
                <ul className="space-y-2 text-sm leading-relaxed">
                  <li>• 결제한 날부터 14일이 지나지 않았을 때: 오늘 할 일을 해보았는데도 마음에 들지 않으면 100% 환불해 드립니다.</li>
                  <li>• 단, 14일이 지나지 않았더라도 매일 보내드리는 안내를 7번 넘게 열어보셨다면, 서비스를 이미 많이 이용한 것으로 생각하여 전액 환불이 어려울 수 있습니다.</li>
                </ul>
              </div>

              <div className="space-y-4 bg-zinc-900/30 p-8 rounded-2xl border border-zinc-800">
                <p className="text-white font-bold text-base">[ 이용하는 도중에 취소할 때 환불 계산법 ]</p>
                <div className="space-y-6 text-sm">
                  <div>
                    <p className="text-zinc-200 font-medium mb-2">1. 한 달씩 결제하는 경우 (월 구독)</p>
                    <p>결제한 날부터 14일이 지나고 나서 취소하면, 남은 날짜만큼 계산해서 돌려드려요. (단, 취소 수수료 10%를 빼고 드립니다.)</p>
                  </div>
                  <div>
                    <p className="text-zinc-200 font-medium mb-2">2. 1년치를 한 번에 결제하는 경우 (연 구독)</p>
                    <p>돌려받는 돈 = 처음에 낸 금액 - (할인 없는 원래 한 달 가격 × 이용한 달 수) - 취소 수수료(처음에 낸 금액의 10%)</p>
                    <p className="mt-1 text-zinc-500 text-xs">* 가격 할인 혜택은 약속한 1년을 모두 채웠을 때만 적용됩니다. 중간에 취소하시면 이미 이용한 기간에 대해서는 원래 가격(한 달에 39만 원)으로 계산해서 차감됩니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <p className="text-zinc-600 text-[11px] text-center tracking-widest uppercase font-light">Contact: support@oneblank.co.kr</p>
        </div>
      </main>
    </div>
  )
}
