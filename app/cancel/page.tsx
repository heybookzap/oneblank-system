'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function PaymentCancelPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 font-pretendard relative selection:bg-[#C2A35D] selection:text-black">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_rgba(194,163,93,0.03)_0%,_transparent_70%)] pointer-events-none z-0"></div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-center space-y-12 z-10 max-w-xl"
      >
        <div className="space-y-6">
          <p className="text-[#C2A35D] text-[11px] tracking-[0.5em] font-medium uppercase italic">Canceled</p>
          <h1 className="text-3xl md:text-4xl font-light tracking-tight leading-tight">
            결제가 중간에 멈췄습니다.
          </h1>
          <p className="text-zinc-500 text-lg font-light leading-relaxed break-keep">
            아직 시작하기가 망설여지시나요?<br />
            원하실 때 언제든 가벼운 마음으로 다시 찾아와 주세요.
          </p>
        </div>

        <div className="flex flex-col gap-4 pt-8">
          <button 
            onClick={() => router.push('/checkout')} 
            className="w-full py-5 bg-white text-black text-xs font-bold tracking-widest uppercase hover:bg-[#C2A35D] transition-all rounded-xl shadow-2xl"
          >
            다시 시도하기
          </button>
          <button 
            onClick={() => router.push('/')} 
            className="text-zinc-600 hover:text-white text-[11px] tracking-widest uppercase transition-colors"
          >
            첫 화면으로 가기
          </button>
        </div>
      </motion.div>

      <footer className="absolute bottom-10 w-full text-center">
        <p className="text-zinc-800 text-[9px] tracking-[0.4em] uppercase font-light italic">ONE BLANK · 마음 편한 행동 시스템</p>
      </footer>
    </main>
  )
}
