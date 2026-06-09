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
              이 약관은 주식회사 원블랭크(이하 "회사")가 제공하는 원블랭크 서비스(이하 "서비스")를 이용할 때, 회사와 회원 사이에 서로 지켜야 할 규칙과 권리, 책임, 그리고 환불에 대한 내용을 쉽게 정해두는 것을 목적으로 합니다.
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
                <p className="text-[#C2A35D] font-bold text-base">[ 14일 동안 마음 편히 써보는 100% 안심 보장 ]</p>
                <p className="text-zinc-200 leading-relaxed">
                  원블랭크는 대표님의 확실한 변화를 약속합니다. 결제 후 14일 동안, 매일 아침 시스템이 전해주는 '2분짜리 쉬운 행동'을 하루도 빠짐없이 완료(체크인)하셨음에도 불구하고 머릿속 걱정과 미루는 습관이 전혀 줄어들지 않았다면 확인 후 곧바로 100% 전액 환불해 드립니다.
                </p>
              </div>
              <ul className="list-disc pl-5 space-y-4 text-zinc-400">
                <li>
                  <span className="text-white font-medium">[14일이 지난 후 환불]:</span> 결제하고 14일이 지난 후에 취소하고 싶다면, 이미 이용한 날짜만큼의 금액과 취소 수수료(전체 금액의 10%)를 제외한 나머지 금액을 돌려드립니다.
                </li>
                <li>
                  <span className="text-white font-medium">[1년 결제 중간 취소]:</span> 1년치를 한 번에 결제한 후 도중에 취소하면, 이미 이용한 기간에 대해 한 달 정상 가격(39만 원)으로 계산해서 빼고, 취소 수수료를 제외한 남은 금액을 돌려드립니다.
                </li>
                <li>
                  환불 신청은 고객센터 이메일(support@oneblank.co.kr)로 받으며, 확인 후 주말을 제외한 평일 기준으로 3~5일 안에 처리해 드립니다.
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
