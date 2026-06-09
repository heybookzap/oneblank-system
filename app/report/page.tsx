'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function ReportPage() {
  const router = useRouter()

  const metrics = [
    { label: "망설이다 버릴 뻔한 시간 아끼기 (Friction Time Defended)", value: "4,500 min", desc: "할 일을 미루고 고민하느라 낭비될 뻔한 시간을 완벽하게 아꼈습니다." },
    { label: "일을 시작하는 속도 (Time-to-Execution)", value: "12x Faster", desc: "망설이지 않고 오늘 해야 할 일에 바로 뛰어든 속도입니다." },
    { label: "좋은 컨디션으로 내린 결정 비율 (Decision Quality Index)", value: "98%", desc: "몸과 마음이 가장 맑고 쌩쌩할 때 결정한 아주 좋은 선택들입니다." },
    { label: "돈으로 환산한 내 노력의 가치 (Total ROI)", value: "₩ 22,500,000", desc: "아까운 시간과 에너지를 돈으로 계산했을 때 벌어들인 금액입니다." }
  ]

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center font-pretendard relative selection:bg-[#C2A35D] selection:text-black overflow-y-auto">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_rgba(194,163,93,0.03)_0%,_transparent_70%)] pointer-events-none z-0"></div>

      <header className="w-full px-8 md:px-16 py-10 z-40 flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/dashboard')}>
          <span className="text-[#C2A35D] font-serif italic text-xl font-bold uppercase">ONE BLANK</span>
          <span className="text-white text-[10px] tracking-[0.4em] font-light uppercase">Performance Report</span>
        </div>
        <button onClick={() => router.push('/dashboard')} className="text-zinc-500 hover:text-white text-[11px] tracking-widest uppercase transition-colors">
          [ Back to Dashboard ]
        </button>
      </header>

      <div className="w-full max-w-5xl mx-auto z-10 pb-32 px-6">
        <div className="text-center mb-16 space-y-4">
          <p className="text-[#C2A35D] text-[11px] tracking-[0.5em] font-bold font-serif italic uppercase">Cognitive Analytics</p>
          <h1 className="text-3xl md:text-5xl font-light tracking-tight text-white break-keep leading-tight">
            대표님이 시스템을 통해 <br />
            <span className="font-serif italic font-bold text-[#C2A35D]">아껴낸 진짜 소중한 가치</span>입니다.
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {metrics.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-[#0A0A0A] border border-zinc-900 rounded-[24px] p-8 text-left relative overflow-hidden group hover:border-zinc-800 transition-all"
            >
              <div className="absolute top-0 left-0 w-[1px] h-[full bg-gradient-to-b from-[#C2A35D] to-transparent opacity-40" />
              <p className="text-zinc-500 text-xs tracking-wider font-light mb-2">{item.label}</p>
              <p className="text-3xl font-bold text-white tracking-tight mb-3 group-hover:text-[#C2A35D] transition-colors">{item.value}</p>
              <p className="text-zinc-400 text-sm font-light break-keep">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-[#0A0A0A] border border-zinc-900 rounded-[32px] p-8 md:p-12 text-left space-y-12">
          <div className="border-b border-zinc-900 pb-6">
            <h2 className="text-xl font-medium text-white tracking-wide">내 시간과 에너지가 얼마나 절약되었는지 보여주는 성과 리포트</h2>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400 font-light">시스템을 쓰기 전 일을 시작할 때까지 망설인 시간</span>
                <span className="text-zinc-500 font-mono">180분</span>
              </div>
              <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full bg-zinc-800 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#C2A35D] font-medium">시스템을 쓰고 나서 일을 시작하는 데 걸린 시간</span>
                <span className="text-[#C2A35D] font-mono font-bold">2분</span>
              </div>
              <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full bg-[#C2A35D] rounded-full" style={{ width: '5%' }}></div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-zinc-900 text-center">
            <p className="text-zinc-500 text-[14px] font-light leading-relaxed break-keep">
              이 정확한 기록은 대표님이 버릴 뻔한 아까운 시간과 돈을 확실하게 아꼈다는 증거입니다. <br />
              머리 아픈 계획과 복잡한 잡생각은 시스템에 편하게 맡겨두고, 가장 중요한 행동에만 가볍게 집중해 보세요.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
