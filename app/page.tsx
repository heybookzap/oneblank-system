'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function LandingPage() {
  const router = useRouter()
  const [showHero, setShowHero] = useState(true)
  const [selectedVal, setSelectedVal] = useState<number | null>(null)
  const [loss, setLoss] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [overlayType, setOverlayType] = useState<'terms' | 'privacy' | 'refund' | null>(null)

  useEffect(() => {
    if (!selectedVal) return
    const targetLoss = selectedVal * 4 * 30 
    let current = 0
    const interval = setInterval(() => {
      current += targetLoss / 50
      if (current >= targetLoss) {
        setLoss(targetLoss)
        clearInterval(interval)
      } else {
        setLoss(Math.floor(current))
      }
    }, 20)
    return () => clearInterval(interval)
  }, [selectedVal])

  const handleSelectWage = (val: number) => {
    setSelectedVal(val)
    localStorage.setItem('pending_hourly_wage', val.toString())
  }

  const handleStartPayment = async () => {
    setIsProcessing(true)
    setTimeout(() => {
      router.push('/checkout')
    }, 2000)
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col font-pretendard relative selection:bg-[#C2A35D] selection:text-black overflow-x-hidden">
      
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_rgba(194,163,93,0.04)_0%,_transparent_70%)] pointer-events-none z-0"></div>

      <section className="min-h-screen flex flex-col items-center justify-center relative z-10 px-6 pt-16 pb-24">
        <header className="absolute top-0 left-0 w-full px-8 md:px-16 py-10 flex justify-between items-start">
          <div className="flex items-center cursor-pointer" onClick={() => router.push('/')}>
            <span className="text-[#C2A35D] font-serif italic text-xl font-bold uppercase">ONE BLANK</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-[11px] tracking-[0.3em] font-light text-zinc-400">
            <button onClick={() => router.push('/about')} className="hover:text-white transition-colors uppercase">About</button>
            <span className="text-zinc-700">|</span>
            <button onClick={() => router.push('/how-it-works')} className="hover:text-white transition-colors uppercase">How it works</button>
            <span className="text-zinc-700">|</span>
            <button onClick={() => router.push('/checkout')} className="hover:text-[#C2A35D] transition-colors uppercase">Join</button>
            <span className="text-zinc-700">|</span>
            <button onClick={() => router.push('/auth/login')} className="hover:text-white transition-colors uppercase">Login</button>
          </nav>
        </header>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-[#C2A35D] to-transparent opacity-40"></div>

        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-8">
              <p className="text-white text-3xl font-light tracking-tight">확인하는 중입니다</p>
              <div className="flex justify-center gap-3">
                {[0, 0.2, 0.4].map((d) => (
                  <motion.div key={d} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: d }} className="w-1.5 h-1.5 rounded-full bg-[#C2A35D]"></motion.div>
                ))}
              </div>
            </motion.div>
          ) : showHero ? (
            <motion.div key="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} className="text-center flex flex-col items-center mt-8">
              <h1 className="text-4xl md:text-[70px] font-light tracking-tight text-white leading-[1.2] mb-10 uppercase">
                아무나 들어올 수<br />없습니다.
              </h1>
              <div className="space-y-6 max-w-3xl mb-12 px-4">
                <h2 className="text-lg md:text-2xl font-light text-white tracking-widest leading-relaxed break-keep">
                  <span className="font-serif italic font-bold text-[#C2A35D]">월 1,000만 원</span>을 벌면서도,<br />
                  매일 아침 눈을 뜨자마자 &apos;오늘 뭐부터 하지&apos;부터 떠올리는<br />
                  분들을 위한 곳입니다.
                </h2>
                <p className="text-zinc-300 text-sm md:text-base font-light tracking-wide leading-relaxed">
                  작은 결정은 이제 저희 몫입니다.<br />
                  오늘 가장 먼저 할 일 하나만 받으시고, 그 시간엔 정말 중요한 결정에만 집중하세요.<br />
                  사업의 다음 한 수는, 언제나 대표님이 두는 겁니다.
                </p>
              </div>
              <button onClick={() => setShowHero(false)} className="px-10 py-5 bg-white text-black text-[13px] font-bold tracking-[0.1em] hover:bg-[#C2A35D] transition-colors uppercase rounded-none shadow-2xl">
                매일 고민하느라 나도 모르게 버려지는 돈이 얼마인지 확인하기
              </button>
            </motion.div>
          ) : !selectedVal ? (
            <motion.div key="selection" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="w-full text-center space-y-16 max-w-[400px] mt-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white leading-snug">
                  지금 이 순간에도, 고민으로 흘러가는 1시간이 있습니다.<br />
                  대표님의 1시간은 대략 얼마쯤일까요?
                </h2>
                <p className="text-zinc-400 text-sm font-light">
                  정확한 숫자가 아니어도 괜찮습니다. 비슷한 걸로 골라주세요.
                </p>
              </div>
              <div className="border-t border-zinc-800 mt-8">
                {[50000, 100000, 200000].map((val) => (
                  <button 
                    key={val} 
                    onClick={() => handleSelectWage(val)}
                    className="w-full py-8 border-b border-zinc-800 flex justify-center items-center group hover:bg-white/[0.05] transition-colors"
                  >
                    <span className="text-zinc-500 group-hover:text-white mr-4 text-base font-light">₩</span>
                    <span className="text-3xl font-serif italic font-bold text-zinc-300 group-hover:text-[#C2A35D] tracking-widest transition-colors">{val.toLocaleString()}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center space-y-12 mt-8">
              <div className="text-center space-y-8">
                <p className="text-zinc-400 text-[11px] tracking-[0.4em] font-medium uppercase">계산해보니, 이만큼이었습니다.</p>
                <h2 className="text-6xl md:text-[90px] font-serif italic font-bold tracking-tighter text-[#C2A35D] leading-none drop-shadow-2xl">
                  - ₩ {loss.toLocaleString()}
                </h2>
                <div className="w-[1px] h-10 bg-[#C2A35D]/30 mx-auto"></div>
                <div className="space-y-6 max-w-xl mx-auto px-4">
                  <p className="text-white text-base md:text-lg font-light leading-relaxed tracking-wide">
                    매일 아침 무엇부터 할지 고민하고 망설이느라 흘려보내는 <span className="font-serif italic font-bold text-[#C2A35D]">4시간.</span><br />
                    그 시간 동안, 대표님의 진짜 돈이 소리 없이 빠져나가고 있었습니다.
                  </p>
                  <p className="text-[#C2A35D] text-lg font-serif italic font-bold tracking-wide">
                    이 돈, 다시 가져올 수 있습니다.
                  </p>
                </div>
              </div>
              <button onClick={handleStartPayment} className="w-full max-w-[400px] py-6 bg-white text-black text-[13px] tracking-[0.2em] font-bold hover:bg-[#C2A35D] transition-colors uppercase rounded-none shadow-2xl">
                월 39만 원으로, 매달 {(loss / 10000).toLocaleString()}만 원 이상 되찾아오기
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <footer className="w-full border-t border-zinc-900 py-16 px-8 md:px-16 bg-[#050505] z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10 text-[11px] text-zinc-500 font-light tracking-wide leading-loose text-left">
          <div className="space-y-2">
            <p className="text-zinc-400 font-medium mb-3 uppercase tracking-[0.2em]">ONE BLANK</p>
            <p>상호명 : 주식회사 원블랭크 <span className="mx-2 text-zinc-700">|</span> 대표자명 : 김대표 <span className="mx-2 text-zinc-700">|</span> 사업자등록번호 : 123-45-67890</p>
            <p>통신판매업신고번호 : 2026-서울강남-0001 <span className="mx-2 text-zinc-700">|</span> 사업장주소 : 서울특별시 강남구 프라이빗로 1번길, 1층</p>
            <p>고객센터 : 010-0000-0000 <span className="mx-2 text-zinc-700">|</span> 이메일 : support@oneblank.co.kr</p>
            <p className="pt-3 text-zinc-600 tracking-wider">© 2026 ONE BLANK. ALL RIGHTS RESERVED.</p>
          </div>
          <div className="flex gap-6 md:justify-end items-end h-full">
            <button onClick={() => setOverlayType('terms')} className="hover:text-white transition-colors">이용약관</button>
            <button onClick={() => setOverlayType('refund')} className="hover:text-white transition-colors">환불규정</button>
            <button onClick={() => setOverlayType('privacy')} className="hover:text-white transition-colors">개인정보처리방침</button>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {overlayType && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-16 backdrop-blur-md">
            <div className="w-full max-w-3xl h-full max-h-[80vh] flex flex-col border border-zinc-800 bg-[#0A0A0A] p-8 md:p-12 relative shadow-2xl">
              <button onClick={() => setOverlayType(null)} className="absolute top-6 right-6 text-zinc-400 hover:text-white text-[11px] tracking-widest uppercase transition-colors">[ 닫기 ]</button>
              
              <div className="flex-1 overflow-y-auto pr-4 space-y-10 text-zinc-300 text-sm font-light leading-loose pt-8 scrollbar-hide text-left">
                {overlayType === 'terms' && (
                  <div className="space-y-10">
                    <h2 className="text-white text-2xl font-light tracking-tight border-b border-zinc-800 pb-4 font-serif italic">이용약관</h2>
                    <section className="space-y-4">
                      <h2 className="text-white text-lg font-bold">제 1조 (목적)</h2>
                      <p className="text-zinc-400 text-sm leading-relaxed break-keep">
                        원 블랭크는 대표님이 매일 아침 가장 먼저 해야 할 한 가지를 정해드리고, 그 외의 모든 결정과 계획을 대신 처리해 드리는 서비스입니다. 이 약관은 회사와 회원이 서로 지켜야 할 내용을 정한 것입니다.
                      </p>
                    </section>
                  </div>
                )}
                {overlayType === 'refund' && (
                  <div className="space-y-10">
                    <h2 className="text-white text-2xl font-light tracking-tight border-b border-zinc-800 pb-4 font-serif italic">취소 및 환불 안내</h2>
                    <div className="bg-[#0A0A0A] border border-[#C2A35D]/30 p-10 rounded-3xl space-y-6">
                      <h2 className="text-[#C2A35D] text-lg font-bold">[ 14일 안에 효과를 못 느끼면, 100% 환불해 드립니다 ]</h2>
                      <p className="text-zinc-200 text-[16px] leading-relaxed break-keep font-medium">
                        결제 후 14일 동안 사용해보시고, &apos;오늘 뭐부터 해야 하지&apos;라는 고민이 단 하루도 줄지 않았다면 저희 책임입니다. 이유를 묻지 않고 전액 환불해 드립니다. 단, 처음 결제하실 때 1회만 적용됩니다.
                      </p>
                    </div>
                    <div className="space-y-10 pt-10 border-t border-zinc-900">
                      <section className="space-y-4">
                        <h2 className="text-white text-lg font-medium tracking-tight italic">자세한 환불 기준 안내</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-zinc-400 leading-relaxed">
                          <div className="space-y-4 bg-zinc-900/30 p-6 rounded-2xl">
                            <p className="text-white font-bold">[ 14일 전액 환불 ]</p>
                            <p>- 결제 후 14일 안에는 이유를 따지지 않고 전액 환불해 드립니다. 처음 결제하실 때 1회만 적용되며, 14일이 지난 후에는 남은 기간만큼 계산해 돌려드립니다.</p>
                          </div>
                          <div className="space-y-4 bg-zinc-900/30 p-6 rounded-2xl">
                            <p className="text-white font-bold">[ 정기 결제 해지 안내 ]</p>
                            <p>- 월 구독은 다음 결제일 3일 전까지 알려주시면 다음 달 결제가 진행되지 않습니다. 연 구독은 도중에 해지하셔도, 사용하지 않은 기간만큼 정확히 계산해 돌려드립니다.</p>
                          </div>
                        </div>
                      </section>
                      <section className="space-y-4 pt-6 border-t border-zinc-900/50">
                        <h2 className="text-white text-lg font-medium tracking-tight italic">해지하셔도, 잃는 건 없습니다</h2>
                        <div className="space-y-2 text-sm text-zinc-400">
                          <p>- 구독을 해지하시면, 그동안 쌓인 모든 기록은 60일 동안 안전하게 무료로 보관됩니다. 따로 내셔야 할 비용은 없습니다.</p>
                          <p>- 60일 안에 다시 시작하시면, 모든 기록은 그대로 이어집니다. 60일이 지나면 기록은 안전하게 삭제됩니다.</p>
                        </div>
                      </section>
                      <p className="text-zinc-600 text-xs text-center">환불 문의: support@oneblank.co.kr</p>
                    </div>
                  </div>
                )}
                {overlayType === 'privacy' && (
                  <div className="space-y-10">
                    <h2 className="text-white text-2xl font-light tracking-tight border-b border-zinc-800 pb-4 font-serif italic">개인정보 처리방침</h2>
                    <div className="text-[16px] text-zinc-300 leading-[1.8] space-y-8 font-light tracking-wide break-keep italic">
                      "대표님이 입력하시는 모든 목표와 고민은 암호화되어 저장되며, 오직 대표님만을 위한 추천을 만드는 데에만 사용됩니다. 어떤 경우에도 외부에 공유되거나 판매되지 않습니다."
                    </div>
                    <div className="text-sm text-zinc-400 space-y-4 border-t border-zinc-800 pt-8">
                      <p>1. 모으는 정보: 이메일 주소, 결제 기록, 서비스 이용 기록, 그리고 대표님이 입력하시는 목표와 고민 내용.</p>
                      <p>2. 모으는 이유: 회원 확인, 그리고 대표님의 상황에 맞는 오늘의 행동을 만들기 위해서입니다.</p>
                      <p>3. 보관 기간: 서비스를 해지하시면 60일 동안 안전하게 보관한 뒤 삭제합니다. 법으로 더 오래 가지고 있어야 하는 정보는, 그 기간만큼만 예외로 둡니다.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
