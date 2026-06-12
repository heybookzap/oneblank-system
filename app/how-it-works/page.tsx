'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function HowItWorksPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-6 md:px-12 py-10 font-pretendard relative overflow-y-auto selection:bg-[#C2A35D] selection:text-black">
      
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_rgba(194,163,93,0.04)_0%,_transparent_70%)] pointer-events-none z-0"></div>

      <header className="w-full px-4 md:px-8 z-40 flex justify-between items-center max-w-6xl mx-auto mb-16">
        <div className="flex items-center cursor-pointer" onClick={() => router.push('/')}>
          <span className="text-[#C2A35D] font-serif italic text-xl font-bold uppercase">ONE BLANK</span>
        </div>
        <button onClick={() => router.push('/')} className="text-zinc-500 hover:text-white text-[11px] tracking-[0.4em] font-light uppercase transition-colors">
          [ Back to Home ]
        </button>
      </header>

      <div className="w-full max-w-5xl mx-auto z-10 pb-32">
        <div className="text-center mb-16">
          <p className="text-[#C2A35D] text-[11px] tracking-[0.5em] font-bold font-serif italic uppercase mb-6">How We Work</p>
          <h1 className="text-3xl md:text-5xl font-light tracking-tight text-white break-keep leading-relaxed">
            시스템이 대표님의 머리 아픈 고민을 <br />
            <span className="font-serif italic font-bold text-[#C2A35D]">완벽하게 없애주는</span> 4단계
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16 w-full border-t border-zinc-900 pt-12">
          {[
            {
              num: "01",
              title: <>이루고 싶은 목표만 적어두십시오.<br />계획은 시스템이 다 짭니다.</>,
              desc: (
                <>
                  &apos;새로운 프로젝트 시작하기&apos;처럼 원하는 결과만 적어두세요.<br />
                  그 목표까지 가는 길은, 오늘 아침 당장 할 수 있는 가장 작은 행동부터<br className="hidden md:block" />
                  시스템이 순서대로 정리해 드립니다.
                </>
              )
            },
            {
              num: "02",
              title: <>눈을 뜨는 순간, 오늘 할 일은 딱 &apos;1개&apos;뿐입니다.</>,
              desc: (
                <>
                  몇 시에 일어나든 상관없습니다.<br />
                  시스템에 접속하면, 그날의 컨디션에 맞춰 지금 해야 할 단 한 가지 행동만 화면에 띄워드립니다.<br className="hidden md:block" />
                  무엇을 먼저 할지는, 더 이상 고민하지 않으셔도 됩니다.
                </>
              )
            },
            {
              num: "03",
              title: <>몸과 마음이 지친 날엔, 시스템이 먼저 알아챕니다.</>,
              desc: (
                <>
                  오늘 컨디션이 &apos;피곤&apos;이라면, 시스템은 무리한 미션 대신 푹 쉬는 걸 먼저 권합니다.<br />
                  계획을 다 못 지킨 날도, 나를 탓할 필요 없습니다.<br className="hidden md:block" />
                  오늘은 시스템이 대표님 편이 되어 드립니다.
                </>
              )
            },
            {
              num: "04",
              title: <>주말에는, 일에 대한 모든 고민을 시스템이 대신 맡아둡니다.</>,
              desc: (
                <>
                  월요일 아침, 그 고민들은 다시 정리된 상태로 대표님 앞에 나타납니다.<br />
                  그러니 주말만큼은, 정말 아무 생각 없이 보내셔도 괜찮습니다.
                </>
              )
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 * idx }}
              className="flex flex-col space-y-4"
            >
              <div className="text-[#C2A35D] text-3xl font-serif italic font-bold tracking-widest border-b border-zinc-900 pb-3 w-fit">
                {item.num}
              </div>
              <h3 className="text-xl md:text-2xl font-medium text-white tracking-tight break-keep leading-snug pt-2">
                {item.title}
              </h3>
              <p className="text-zinc-300 text-[15px] font-light leading-relaxed break-keep">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
