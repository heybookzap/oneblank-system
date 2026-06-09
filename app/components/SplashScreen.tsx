"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NANO_COPY = [
  "당신의 고민을 대신 해결하기 위해 열심히 준비하고 있습니다...",
  "어제 했던 머리 아픈 생각들을 모두 지웠어요. 이제 걱정 마세요.",
  "미루지 않고 바로 움직일 수 있는 강력한 힘을 모으고 있습니다...",
  "복잡하고 머리 아픈 일은 저희가 맡을게요. 편하게 기다려 주세요.",
  "오늘 가장 맑은 정신으로 시작할 수 있게 주변을 정리하는 중입니다..."
];

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [copy, setCopy] = useState("");

  useEffect(() => {
    setCopy(NANO_COPY[Math.floor(Math.random() * NANO_COPY.length)]);
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[1000] bg-[#050505] flex flex-col items-center justify-center px-6 overflow-hidden font-pretendard"
    >
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_rgba(194,163,93,0.03)_0%,_transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center gap-20 text-center"
      >
        <div className="space-y-4">
          <p className="text-[10px] tracking-[0.8em] font-bold text-[#C2A35D] uppercase opacity-80 font-serif italic">
            ONE BLANK
          </p>
          <h2 className="text-xl sm:text-2xl font-light tracking-[0.2em] text-white font-serif italic">
            ELITE SYSTEM
          </h2>
        </div>
        
        <div className="h-12 flex items-center justify-center max-w-xs">
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-[11px] text-zinc-500 tracking-wider font-light leading-relaxed break-keep"
          >
            {copy}
          </motion.p>
        </div>
      </motion.div>

      <div className="absolute bottom-16 flex flex-col items-center gap-4 opacity-30">
        <div className="w-[1px] h-10 bg-gradient-to-b from-[#C2A35D] to-transparent" />
        <p className="text-[8px] tracking-[0.5em] text-[#C2A35D] uppercase font-bold">
          Empire Clarity Framework
        </p>
      </div>
    </motion.div>
  );
}
