"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { supabase } from '@/lib/supabase';

export default function StartPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const registerUser = async () => {
      const email = localStorage.getItem('customerEmail');
      const password = localStorage.getItem('customerPassword');
      const name = localStorage.getItem('customerName');

      if (email && password) {
        const { error } = await supabase.auth.signUp({
          email: email,
          password: password,
          options: {
            data: { full_name: name }
          }
        });

        if (error && error.message.includes('already registered')) {
          await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          });
        }

        localStorage.removeItem('customerPassword');
      }
    };

    registerUser();
  }, []);

  const nextStep = () => setStep((prev) => prev + 1);

  const handleGoalSubmit = async () => {
    if (!goal.trim() || loading) return;
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth/login');
        return;
      }

      const { error: goalError } = await supabase
        .from('goals')
        .insert([{ user_id: user.id, content: goal, status: 'ACTIVE' }]);
      if (goalError) throw goalError;

      await supabase.from('profiles').update({ 
        hourly_wage: 100000,
        weekend_rest: true 
      }).eq('id', user.id);

      setStep(3);
    } catch (err) {
      alert('저장하는 중에 오류가 생겼습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden font-pretendard selection:bg-[#C2A35D] selection:text-black">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_rgba(194,163,93,0.03)_0%,_transparent_70%)] pointer-events-none z-0"></div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.section
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-screen flex flex-col items-center justify-center relative z-10 px-6 text-center"
          >
            <div className="space-y-12">
              <div className="space-y-4">
                <p className="text-zinc-200 text-lg font-light tracking-tight">회원 확인이 완료되었습니다.</p>
                <p className="text-zinc-200 text-lg font-light tracking-tight">원 블랭크 회원이 되신 것을 진심으로 환영합니다.</p>
              </div>
              <button 
                onClick={nextStep}
                className="px-24 py-5 border border-white text-white text-sm font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all"
              >
                다음
              </button>
              <p className="text-zinc-400 text-sm font-light leading-relaxed pt-4">
                지금 이 순간부터, 매일 하던 머리 아픈 걱정과 고민은 <br />
                <span className="font-serif italic font-bold text-[#C2A35D] text-lg">'머리 아픈 걱정과 고민'</span>은 저희가 모두 대신해 드립니다.
              </p>
            </div>
          </motion.section>
        )}

        {step === 2 && (
          <motion.section
            key="goal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-screen flex flex-col items-center justify-center relative z-10 px-6 text-center"
          >
            <div className="space-y-16 w-full max-w-2xl">
              <div className="space-y-4">
                <p className="text-zinc-200 text-lg font-light">저희에게 맡겨주실 가장 이루고 싶은</p>
                <h2 className="font-serif italic font-bold text-[#C2A35D] text-3xl tracking-tight uppercase">
                  &apos;커다란 목표&apos;
                </h2>
                <p className="text-zinc-200 text-lg font-light">를 적어주세요.</p>
                <p className="text-zinc-600 text-xs font-light pt-2">(예: 6달 안에 목표 금액 달성하기, 나만의 멋진 프로젝트 성공시키기 등)</p>
              </div>
              <textarea 
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="이루고 싶은 결과만 적어주세요. 중간 과정은 저희가 알아서 작게 나눠 드릴게요."
                rows={1}
                className="w-full py-6 text-2xl text-zinc-100 bg-transparent border-b border-zinc-800 focus:border-[#C2A35D] outline-none transition-colors text-center font-light placeholder:text-zinc-800"
              />
              <div className="space-y-8">
                <p className="text-zinc-500 text-xs font-light leading-relaxed max-w-md mx-auto">
                  이 목표를 바탕으로 회원님에게 딱 맞는 매일의 행동을 준비합니다. 목표를 바꾸면 다시 준비하는 데 시간이 걸릴 수 있으니 신중하게 적어주세요.
                </p>
                <button 
                  onClick={handleGoalSubmit}
                  disabled={!goal.trim() || loading}
                  className="w-full py-6 bg-zinc-900 text-zinc-500 text-sm font-bold tracking-[0.2em] uppercase disabled:opacity-50 hover:bg-[#C2A35D] hover:text-black transition-all"
                >
                  {loading ? "준비 중..." : "목표 저장하고 시작하기"}
                </button>
              </div>
            </div>
          </motion.section>
        )}

        {step === 3 && (
          <motion.section
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="min-h-screen flex flex-col items-center justify-center relative z-10 px-6 text-center"
          >
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
              <p className="text-zinc-400 text-base font-light leading-relaxed">
                성공한 사람들의 수많은 데이터를 바탕으로 <br />
                이 목표를 가장 쉬운 행동으로 잘게 나누기 시작합니다.
              </p>
              <p className="text-zinc-200 text-lg font-light">
                <span className="font-serif italic font-bold text-[#C2A35D]">내일 아침 5시</span>, 첫 번째 오늘 할 일과 함께 찾아올게요.
              </p>
              <button 
                onClick={() => router.push('/dashboard')}
                className="text-zinc-600 text-xs tracking-widest uppercase hover:text-white transition-colors"
              >
                [ 대시보드로 이동하기 ]
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
