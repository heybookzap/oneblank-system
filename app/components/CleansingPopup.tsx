"use client";

import { motion } from "framer-motion";

export default function CleansingPopup({ tier, onDismiss }: { tier: string; onDismiss: () => void }) {
  const getMessage = () => {
    if (tier === "VVIP" || tier === "Elite") return "머릿속 모든 고민들이 깨끗하게 정리되었습니다. 아주 맑고 편안한 마음으로 하루를 시작해 보세요.";
    if (tier === "Core") return "어제 밀렸던 걱정과 계획들이 깨끗하게 지워졌습니다. 이제 오늘 할 일에만 마음 편하게 집중해 보세요.";
    return "어제 쌓였던 스트레스와 마음의 짐이 모두 사라졌습니다. 가벼운 마음으로 시작해 보세요.";
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/98 px-6 backdrop-blur-md">
      <motion.div 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        className="max-w-sm w-full text-center space-y-10 p-10 border border-zinc-900 bg-[#050505] rounded-[32px] shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C2A35D]/50 to-transparent"></div>
        
        <div className="space-y-4">
          <p className="text-[10px] tracking-[0.5em] font-bold text-[#C2A35D] uppercase font-serif italic">System Cleansing</p>
          <p className="text-zinc-300 text-sm leading-relaxed font-light break-keep">
            {getMessage()}
          </p>
        </div>

        <button 
          onClick={onDismiss} 
          className="w-full py-5 bg-[#C2A35D] text-black font-bold text-[11px] tracking-[0.2em] uppercase rounded-xl hover:bg-white transition-all duration-500 shadow-lg"
        >
          가벼운 마음으로 시작하기
        </button>
      </motion.div>
    </div>
  );
}
