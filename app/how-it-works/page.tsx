'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function HowItWorksPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-6 md:px-12 py-10 font-pretendard relative overflow-y-auto selection:bg-[#C2A35D] selection:text-black">
      
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_rgba(194,163,93,0.03)_0%,_transparent_70%)] pointer-events-none z-0"></div>

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
              title: <>이루고 싶은 목표만 던지십시오.<br />계획은 시스템이 다 짭니다.</>,
              desc: (
                <>
                  '새로운 프로젝트 시작하기'처럼 이루고 싶은 결과만 적어두세요.<br />
                  그 목표를 이루기 위해 오늘 아침 무엇부터 해야 할지는,<br className="hidden md:block" />
                  시스템이 가장 작고 쉬운 행동으로 완벽하게 잘게 나눠 드립니다.
                </>
              )
            },
            {
              num: "02",
              title: "눈을 뜨는 순간, 오늘 할 일은 딱 '1개'뿐입니다.",
              desc: (
                <>
                  몇 시에 일어나든 상관없습니다.<br />
                  대표님이 눈을 뜨고 시스템에 접속하면, 그날의 몸과 마음 상태에 맞춰<br className="hidden md:block" />
                  지금 당장 해야 할 '딱 한 가지' 행동만 화면에 바로 보여줍니다.<br />
                  더 이상 무엇을 먼저 할지 고민하며 방황하지 마세요.
                </>
              )
            },
            {
              num: "03",
              title: <>몸이 피곤하고 머리가 지친 날,<br />시스템은 '편하게 쉬기'를 권해드립니다.</>,
              desc: (
                <>
                  오늘 너무 피곤하신가요?<br />
                  시스템은 다음 행동을 위해 오늘은 푹 쉬라고 알려줍니다.<br />
                  오늘 계획을 다 못 지켰다고 절대 자책하지 마세요.<br />
                  때로는 편안하게 잘 쉬는 것도 다음 성공을 위한 가장 중요한 행동입니다.
                </>
              )
            },
            {
              num: "04",
              title: "주말에는 일 생각을 완전히 'OFF' 해드립니다.",
              desc: (
                <>
                  머리를 완전히 비워야 월요일에 다시 기분 좋게 일할 수 있습니다.<br />
                  진짜 휴식을 위해, 주말 동안 시스템은 대표님이 일 생각을 하지 않도록 막아주고<br className="hidden md:block" />
                  남은 모든 고민을 대신 안전하게 보관해 드립니다.
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
