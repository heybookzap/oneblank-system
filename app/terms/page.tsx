'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function TermsPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-6 md:px-12 py-10 font-pretendard relative overflow-y-auto selection:bg-[#C2A35D] selection:text-black">
      
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_rgba(194,163,93,0.03)_0%,_transparent_70%)] pointer-events-none z-0"></div>

      <header className="w-full px-4 md:px-8 z-40 flex justify-between items-center max-w-4xl mx-auto mb-20">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
          <span className="text-[#C2A35D] font-serif italic text-xl font-bold uppercase">ONE BLANK</span>
          <span className="text-white text-[10px] tracking-[0.4em] font-light uppercase">The Authority</span>
        </div>
        
        <button onClick={() => router.push('/')} className="text-zinc-500 hover:text-white text-[9px] tracking-[0.4em] font-light uppercase transition-colors">
          [ Back to Home ]
        </button>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl mx-auto z-10 pb-32"
      >
        <div className="mb-16 border-b border-zinc-900 pb-8">
          <p className="text-[#C2A35D] text-[10px] tracking-[0.4em] font-medium uppercase mb-4">Legal Notice</p>
          <h1 className="text-3xl font-serif font-bold tracking-tight text-white break-keep">
            이용약관 및 환불 규칙
          </h1>
        </div>

        <div className="space-y-16 text-zinc-400 font-light text-[14px] leading-loose tracking-wide break-keep">
          
          <section className="space-y-6">
            <h2 className="text-lg text-white font-medium tracking-tight italic">제 1조 (목적)</h2>
            <p>
              원 블랭크는 대표님이 매일 아침 가장 먼저 해야 할 한 가지를 정해드리고, 그 외의 모든 결정과 계획을 대신 처리해 드리는 서비스입니다. 이 약관은 회사와 회원이 서로 지켜야 할 내용을 정한 것입니다.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-lg text-white font-medium tracking-tight italic">제 2조 (서비스 제공과 변경)</h2>
            <p>
              회사는 회원에게 매일 약속된 아침 시간(05:00 AM)에 오늘 해야 할 딱 한 가지 행동을 알려주며, 주말에는 일 생각을 완전히 잊고 편히 쉴 수 있도록 접속을 막아주는 등 머릿속 걱정을 비우고 행동할 수 있는 환경을 제공합니다. 회사는 원활한 서비스를 위해 필요한 경우 내용을 바꿀 수 있으며, 이럴 때는 미리 알려드립니다.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-lg text-white font-medium tracking-tight flex items-center gap-3 italic">
              제 3조 (취소 및 환불 규칙)
              <span className="bg-[#C2A35D] text-black text-[9px] px-2 py-1 font-bold tracking-widest uppercase not-italic">Essential</span>
            </h2>
            <div className="space-y-6">
              <div className="bg-[#0A0A0A] border border-[#C2A35D]/30 p-8 rounded-2xl space-y-4">
                <p className="text-[#C2A35D] font-bold text-base">[ 14일 안에 효과를 못 느끼면, 100% 환불해 드립니다 ]</p>
                <p className="text-zinc-200 leading-relaxed">
                  결제 후 14일 동안 사용해보시고, &apos;오늘 뭐부터 해야 하지&apos;라는 고민이 단 하루도 줄지 않았다면 저희 책임입니다. 이유를 묻지 않고 전액 환불해 드립니다. 단, 처음 결제하실 때 1회만 적용됩니다.
                </p>
              </div>
              <ul className="list-disc pl-5 space-y-4 text-zinc-400">
                <li>
                  <span className="text-white font-medium">[ 14일 전액 환불 ]:</span> 결제 후 14일 안에는 이유를 따지지 않고 전액 환불해 드립니다. 처음 결제하실 때 1회만 적용되며, 14일이 지난 후에는 남은 기간만큼 계산해 돌려드립니다.
                </li>
                <li>
                  <span className="text-white font-medium">[ 정기 결제 해지 안내 ]:</span> 월 구독은 다음 결제일 3일 전까지 알려주시면 다음 달 결제가 진행되지 않습니다. 연 구독은 도중에 해지하셔도, 사용하지 않은 기간만큼 정확히 계산해 돌려드립니다.
                </li>
                <li>
                  <span className="text-white font-medium">[ 해지하셔도, 잃는 건 없습니다 ]:</span> 구독을 해지하시면, 그동안 쌓인 모든 기록은 60일 동안 안전하게 무료로 보관됩니다. 따로 내셔야 할 비용은 없습니다. 60일 안에 다시 시작하시면, 모든 기록은 그대로 이어집니다. 60일이 지나면 기록은 안전하게 삭제됩니다.
                </li>
                <li>
                  환불 문의: support@oneblank.co.kr
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-lg text-white font-medium tracking-tight italic">제 4조 (회원의 의무)</h2>
            <p>
              회원은 아이디와 비밀번호 같은 내 정보를 안전하게 지킬 책임이 있으며, 다른 사람에게 넘겨주거나 빌려줄 수 없습니다. 만약 일부러 시스템을 망가뜨리려고 하거나 나쁜 목적으로 서비스를 이용하면, 즉시 서비스를 쓸 수 없게 막고 아이디를 영원히 없앨 수 있습니다.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-lg text-white font-medium tracking-tight italic">제 5조 (책임을 지지 않는 경우)</h2>
            <p>
              회사는 지진이나 홍수 같은 갑작스러운 자연재해나 도저히 막을 수 없는 특별한 일이 생겨서 서비스를 보여주지 못할 때는 책임을 지지 않습니다. 또한, 회원이 서비스를 쓰면서 얻은 정보로 인해 발생한 일에 대해서는, 회사가 아주 큰 실수를 하거나 잘못하지 않는 한 책임을 지지 않습니다.
            </p>
          </section>

        </div>
      </motion.div>
    </main>
  )
}
