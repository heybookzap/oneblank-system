"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Zap, ArrowRight, Loader2 } from "lucide-react";

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [prescription, setPrescription] = useState<{action: string, contribution: string} | null>(null);
  const [annualLoss, setAnnualLoss] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const wage = localStorage.getItem("user_wage");
      const loss = localStorage.getItem("last_calculated_loss");
      
      if (!wage || !loss) {
        router.push("/lead");
        return;
      }
      setAnnualLoss(parseInt(loss).toLocaleString());

      try {
        const res = await fetch("/api/slice", {
          method: "POST",
          body: JSON.stringify({ 
            task: "지금 내 일에서 가장 답답하고 막히는 부분부터 해결하고 싶다", 
            wage: parseInt(wage) 
          }),
        });
        const data = await res.json();
        setPrescription(data);
      } catch (err) {
        console.error(err);
      } finaly {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center space-y-6">
        <Loader2 className="text-[#C2A35D] animate-spin" size={40} />
        <p className="text-[#C2A35D] text-[10px] tracking-[0.5em] uppercase animate-pulse">오늘의 행동 습관을 분석하는 중...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center py-20 px-6 font-pretendard relative">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_rgba(194,163,93,0.03)_0%,_transparent_70%)] pointer-events-none"></div>

      <header className="absolute top-0 left-0 w-full p-10 flex justify-center">
        <span className="text-[#C2A35D] font-serif italic text-xl font-bold uppercase tracking-widest">ONE BLANK</span>
      </header>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="z-10 w-full max-w-2xl space-y-16 mt-10">
        <div className="text-center space-y-4">
          <p className="text-zinc-500 text-xs tracking-[0.3em] uppercase">나의 상태 진단서</p>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-tight">
            매년 <span className="text-red-500 font-bold">{annualLoss}원</span>의 가치가<br />
            머릿속 걱정과 미룸 때문에 낭비되고 있습니다.
          </h1>
        </div>

        <div className="bg-[#080808] border border-[#C2A35D]/20 rounded-[32px] p-10 md:p-14 space-y-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C2A35D]/50 to-transparent"></div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-[#C2A35D]">
              <Zap size={18} />
              <p className="text-[11px] tracking-[0.3em] font-bold uppercase">지금 바로 시작할 수 있는 2분 행동</p>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-white leading-tight break-keep">
              &quot;{prescription?.action}&quot;
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed font-light border-l border-zinc-800 pl-6">
              {prescription?.contribution}
            </p>
          </div>

          <div className="pt-10 border-t border-zinc-900 flex flex-col gap-6">
            <p className="text-zinc-500 text-xs leading-relaxed text-center">
              이 짧은 2분짜리 행동조차 시작하기 망설여진다면, <br />
              이미 내 머릿속이 너무 많은 고민과 걱정으로 지쳐있다는 뜻입니다.
            </p>
            <button 
              onClick={() => router.push('/checkout')}
              className="w-full py-6 bg-white text-black text-[12px] font-bold tracking-[0.2em] uppercase rounded-xl hover:bg-[#C2A35D] transition-all duration-500"
            >
              나를 위한 1대1 맞춤 관리 시작하기
            </button>
          </div>
        </div>

        <button onClick={() => router.push('/')} className="mx-auto flex items-center gap-2 text-zinc-600 hover:text-white transition-colors text-[10px] tracking-widest uppercase">
          첫 화면으로 돌아가기 <ArrowRight size={12} />
        </button>
      </motion.div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense>
      <ResultContent />
    </Suspense>
  );
}
