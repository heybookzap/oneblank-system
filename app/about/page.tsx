'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function AboutPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center font-pretendard relative selection:bg-[#C2A35D] selection:text-black">
      
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_rgba(194,163,93,0.04)_0%,_transparent_70%)] pointer-events-none z-0"></div>

          <header className="absolute top-0 left-0 w-full px-8 md:px-16 py-10 z-40 flex justify-between items-start">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
          <span className="text-[#C2A35D] font-serif italic text-xl font-bold uppercase">ONE BLANK</span>
          <span className="text-white text-[11px] tracking-[0.4em] font-light uppercase">The Identity</span>
        </div>
        <button onClick={() => router.push('/')} className="text-zinc-500 hover:text-white text-[11px] tracking-[0.4em] font-light uppercase transition-colors">
          [ Back to Home ]
        </button>
      </header>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-[#C2A35D] to-transparent opacity-40"></div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1.2, ease: "easeOut" }} 
        className="z-10 w-full max-w-4xl flex flex-col items-center justify-center flex-1 px-6 py-24"
      >
        <div className="text-center w-full space-y-16">
          <p className="text-[#C2A35D] text-[12px] tracking-[0.5em] font-bold font-serif italic uppercase">
            Who We Are
          </p>
          
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white break-keep leading-snug">
            성공하는 사람들의 복잡한 <span className="font-serif italic font-bold text-[#C2A35D]">머릿속 고민</span>을 해결하는 곳.<br className="hidden md:block"/>
            매주 14시간의 자유를 확실하게 되찾아 드립니다.
          </h1>
          
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-[#C2A35D] to-transparent mx-auto opacity-70"></div>
          
          <div className="space-y-12 max-w-2xl mx-auto">
            <p className="text-zinc-300 text-lg md:text-xl font-light tracking-wide leading-relaxed break-keep">
              매일 아침 '오늘 뭐부터 하지?' 고민하느라 소중한 에너지를 다 쓰고 계신가요?<br className="hidden md:block"/>
              완벽하게 잘하고 싶다는 걱정이 커질수록, 정작 중요한 일은 시작도 못 하고 미루게 됩니다.
            </p>
            <p className="text-zinc-300 text-lg md:text-xl font-light tracking-wide leading-relaxed break-keep">
              이제 복잡한 계획과 고민은 저희 시스템이 모두 대신하겠습니다.<br className="hidden md:block"/>
              더 이상 머리 아파하지 마세요. 매일 아침,<br className="hidden md:block"/>
              저희가 정해드리는 딱 하나의 쉬운 행동만 그냥 시작하시면 됩니다.
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-32">
          <div className="w-1 h-1 rounded-full bg-zinc-800"></div>
          <div className="w-1 h-1 rounded-full bg-zinc-800"></div>
          <div className="w-1 h-1 rounded-full bg-zinc-800"></div>
        </div>
      </motion.div>
    </main>
  )
}
