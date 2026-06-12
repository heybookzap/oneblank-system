'use client'

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { supabase } from '@/lib/supabase'

export default function StartPage() {
  const router = useRouter()
  // step 1~3은 기존 목표 설정, step 4가 메인 대시보드 화면입니다.
  const [step, setStep] = useState(1)
  const [goal, setGoal] = useState("")
  const [loading, setLoading] = useState(false)
  
  // 대시보드용 상태값
  const [showMetaphor, setShowMetaphor] = useState(false)
  const [showPanicModal, setShowPanicModal] = useState(false)
  const [panicText, setPanicText] = useState('')
  const [isRerouting, setIsRerouting] = useState(false)

  useEffect(() => {
    const registerUser = async () => {
      const email = localStorage.getItem('customerEmail')
      const password = localStorage.getItem('customerPassword')
      const name = localStorage.getItem('customerName')

      if (email && password) {
        const { error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: { data: { full_name: name } }
        })

        if (error && error.message.includes('already registered')) {
          await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          })
        }
        localStorage.removeItem('customerPassword')
      }
    }
    registerUser()
  }, [])

  // Step 4(대시보드)에 도달하면 애니메이션 타이머를 시작합니다.
  useEffect(() => {
    if (step === 4) {
      const timer = setTimeout(() => {
        setShowMetaphor(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [step])

  const nextStep = () => setStep((prev) => prev + 1)

  const handleGoalSubmit = async () => {
    if (!goal.trim() || loading) return
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
        return
      }

      const { error: goalError } = await supabase
        .from('goals')
        .insert([{ user_id: user.id, content: goal, status: 'ACTIVE' }])
      if (goalError) throw goalError

      await supabase.from('profiles').update({ 
        hourly_wage: 100000,
        weekend_rest: true 
      }).eq('id', user.id)

      setStep(3)
    } catch (err) {
      alert('저장하는 중에 오류가 생겼습니다. 잠시 후 다시 시도해 주세요.')
    } finally {
      setLoading(false)
    }
  }

  const handlePanicSubmit = () => {
    if (!panicText) return
    setIsRerouting(true)
    setTimeout(() => {
      setIsRerouting(false)
      setShowPanicModal(false)
      setPanicText('')
    }, 3000)
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden font-pretendard selection:bg-[#C2A35D] selection:text-black">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_rgba(194,163,93,0.03)_0%,_transparent_70%)] pointer-events-none z-0"></div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.section key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} className="min-h-screen flex flex-col items-center justify-center relative z-10 px-6 text-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <p className="text-zinc-200 text-lg font-light tracking-tight">회원 확인이 완료되었습니다.</p>
                <p className="text-zinc-200 text-lg font-light tracking-tight">원 블랭크 회원이 되신 것을 진심으로 환영합니다.</p>
              </div>
              <button onClick={nextStep} className="px-24 py-5 border border-white text-white text-sm font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all">다음</button>
              <p className="text-zinc-400 text-sm font-light leading-relaxed pt-4">지금 이 순간부터, 매일 하던 머리 아픈 걱정과 고민은 <br /><span className="font-serif italic font-bold text-[#C2A35D] text-lg">'저희 시스템'</span>이 모두 대신해 드립니다.</p>
            </div>
          </motion.section>
        )}

        {step === 2 && (
          <motion.section key="goal" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="min-h-screen flex flex-col items-center justify-center relative z-10 px-6 text-center">
            <div className="space-y-16 w-full max-w-2xl">
              <div className="space-y-4">
                <p className="text-zinc-200 text-lg font-light">저희에게 맡겨주실 가장 이루고 싶은</p>
                <h2 className="font-serif italic font-bold text-[#C2A35D] text-3xl tracking-tight uppercase">&apos;커다란 목표&apos;</h2>
                <p className="text-zinc-200 text-lg font-light">를 적어주세요.</p>
                <p className="text-zinc-600 text-xs font-light pt-2">(예: 6달 안에 목표 금액 달성하기, 나만의 멋진 프로젝트 성공시키기 등)</p>
              </div>
              <textarea 
                value={goal} onChange={(e) => setGoal(e.target.value)} rows={1}
                placeholder="이루고 싶은 결과만 적어주세요. 중간 과정은 저희가 알아서 작게 나눠 드릴게요."
                className="w-full py-6 text-2xl text-zinc-100 bg-transparent border-b border-zinc-800 focus:border-[#C2A35D] outline-none transition-colors text-center font-light placeholder:text-zinc-800"
              />
              <div className="space-y-8">
                <p className="text-zinc-500 text-xs font-light leading-relaxed max-w-md mx-auto">이 목표를 바탕으로 회원님에게 딱 맞는 매일의 행동을 준비합니다. 목표를 바꾸면 다시 준비하는 데 시간이 걸릴 수 있으니 신중하게 적어주세요.</p>
                <button onClick={handleGoalSubmit} disabled={!goal.trim() || loading} className="w-full py-6 bg-zinc-900 text-zinc-500 text-sm font-bold tracking-[0.2em] uppercase disabled:opacity-50 hover:bg-[#C2A35D] hover:text-black transition-all">
                  {loading ? "준비 중..." : "목표 저장하고 시작하기"}
                </button>
              </div>
            </div>
          </motion.section>
        )}

        {step === 3 && (
          <motion.section key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -20 }} className="min-h-screen flex flex-col items-center justify-center relative z-10 px-6 text-center">
            <div className="space-y-16">
              <div className="w-20 h-20 border border-[#C2A35D] rounded-full flex items-center justify-center bg-white/5 mx-auto">
                <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
                  <path d="M12 2L3 6V14C3 19.5 6.8 24.7 12 26C17.2 24.7 21 19.5 21 14V6L12 2Z" stroke="#C2A35D" strokeWidth="2" />
                </svg>
              </div>
              <div className="space-y-6">
                <p className="text-zinc-200 text-lg font-light">목표가 안전하게 <span className="font-serif italic font-bold text-[#C2A35D]">저장</span>되었습니다.</p>
                <p className="text-zinc-200 text-lg font-light">이제 회원님이 할 일은 끝났습니다. 이제 <span className="font-serif italic font-bold text-[#C2A35D]">마음 편히 쉬세요.</span></p>
              </div>
              <p className="text-zinc-400 text-base font-light leading-relaxed">성공한 사람들의 수많은 데이터를 바탕으로 <br />이 목표를 가장 쉬운 행동으로 잘게 나누기 시작합니다.</p>
              <p className="text-zinc-200 text-lg font-light"><span className="font-serif italic font-bold text-[#C2A35D]">내일 아침 5시</span>, 첫 번째 오늘 할 일과 함께 찾아올게요.</p>
              <button onClick={() => setStep(4)} className="text-zinc-600 text-xs tracking-widest uppercase hover:text-white transition-colors">[ 메인 대시보드로 이동하기 ]</button>
            </div>
          </motion.section>
        )}

        {step === 4 && (
          <motion.section key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen flex flex-col items-center justify-center relative z-10">
            <div className="z-10 text-center space-y-8 flex flex-col items-center">
              <p className="text-[#C2A35D] text-[10px] tracking-[0.4em] uppercase font-bold">Today</p>
              <h1 className="text-3xl md:text-5xl font-light tracking-tight text-white leading-relaxed break-keep max-w-xl">
                다이어리 첫 페이지에 <br/>가볍게 한 줄 긋기
              </h1>
              
              <div className="h-24 flex items-center justify-center pt-8">
                <AnimatePresence>
                  {showMetaphor && (
                    <motion.svg width="120" height="40" viewBox="0 0 120 40" fill="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <motion.path
                        d="M10 20 C 30 50, 40 -10, 60 20 C 80 50, 90 -10, 110 20" stroke="#333333" strokeWidth="2" strokeLinecap="round"
                        initial={{ pathLength: 1, opacity: 1 }} animate={{ pathLength: 0, opacity: 0 }} transition={{ duration: 2, ease: "easeInOut" }}
                      />
                      <motion.path
                        d="M10 20 L 110 20" stroke="#C2A35D" strokeWidth="2" strokeLinecap="round"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
                      />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <button onClick={() => setShowPanicModal(true)} className="absolute bottom-10 right-10 text-zinc-600 hover:text-red-900/80 text-[10px] tracking-[0.2em] font-light transition-colors flex items-center gap-2 z-20">
              <span className="text-xs">🚨</span> 뇌 과부하 비상 정지
            </button>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPanicModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6 backdrop-blur-md">
            {isRerouting ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-6">
                <div className="w-10 h-10 border-2 border-[#C2A35D] border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-[#C2A35D] text-sm tracking-widest font-light">SYSTEM RE-ROUTING...</p>
                <p className="text-zinc-400 text-xs">엉킨 상황을 반영하여 새로운 탈출구를 찾고 있습니다.</p>
              </motion.div>
            ) : (
              <div className="w-full max-w-lg bg-[#0A0A0A] border border-red-900/30 p-8 rounded-2xl shadow-2xl relative">
                <button onClick={() => setShowPanicModal(false)} className="absolute top-6 right-6 text-zinc-500 hover:text-white text-xs">✕</button>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-red-900/80 text-xl font-serif italic tracking-tight font-bold">Brain Dump</h2>
                    <p className="text-zinc-400 text-xs leading-relaxed">모든 계획이 틀어지고 머리가 터질 것 같을 때만 누르셨군요.<br/>지금 당장 엉켜있는 고민과 짜증을 이곳에 마구잡이로 쏟아내십시오.</p>
                  </div>
                  <textarea
                    value={panicText} onChange={(e) => setPanicText(e.target.value)}
                    placeholder="예: 나 내일 직원 면담도 해야 하고, 원래 하던 프로젝트는 망가졌고..."
                    className="w-full h-40 bg-black border border-zinc-800 p-4 text-white text-sm outline-none focus:border-red-900/50 resize-none leading-relaxed"
                  />
                  <button onClick={handlePanicSubmit} className="w-full py-4 bg-red-900/20 text-red-500 hover:bg-red-900/40 border border-red-900/50 transition-colors text-xs font-bold tracking-[0.2em] uppercase">비상 경로 재탐색 요청</button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
