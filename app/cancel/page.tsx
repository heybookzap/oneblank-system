'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function CancelPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 font-pretendard relative selection:bg-[#C2A35D] selection:text-black">
      
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_rgba(194,163,93,0.04)_0%,_transparent_70%)] pointer-events-none z-0"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="z-10 text-center max-w-2xl space-y-12"
      >
        <h1 className="text-4xl md:text-5xl font-serif italic font-light tracking-tight text-white">
          수고하셨습니다.
        </h1>
        
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#C2A35D] to-transparent mx-auto opacity-50"></div>

        <p className="text-zinc-400 text-lg font-light leading-loose break-keep">
          구독은 오늘부로 정리됩니다.<br />
          그동안 쌓인 대표님의 모든 기록은 60일 동안 안전하게, 무료로 보관됩니다.<br />
          60일 안에 다시 오시면, 모든 기록은 그대로 이어집니다.
        </p>

        <div className="pt-16">
          <button 
            onClick={() => router.push('/')} 
            className="text-zinc-600 hover:text-white text-[11px] tracking-[0.3em] font-light uppercase transition-colors"
          >
            [ 홈으로 돌아가기 ]
          </button>
        </div>
      </motion.div>
    </main>
  )
}
