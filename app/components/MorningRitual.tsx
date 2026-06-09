"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CONDITIONS = ["피곤함", "보통", "아주 좋음"] as const;
type Condition = (typeof CONDITIONS)[number];

const DIRECTIVES: Record<Condition, string> = {
  "피곤함": "무리하지 말고 오늘 배정된 '1분짜리 아주 쉬운 일'만 가볍게 끝내보세요. 다른 복잡한 생각은 하지 않아도 괜찮습니다.",
  "보통": "오늘 배정된 '2분짜리 중요한 일'을 지금 바로 시작해 보세요. 지금 마음 상태가 평소처럼 차분하고 좋습니다.",
  "아주 좋음": "오늘 가장 중요하고 큰일을 끝내기 가장 좋은 기회입니다. 저희가 준비해 둔 '3분 집중 행동'을 바로 시작해 보세요.",
};

function SyncIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#C2A35D" strokeWidth={1.2}>
      <circle cx="8" cy="8" r="6" strokeDasharray="2 2" />
      <path d="M8 4v4l2 2" strokeLinecap="round" />
    </svg>
  );
}

export default function MorningRitual() {
  const [selected, setSelected] = useState<Condition | null>(null);

  return (
    <section className="w-full flex flex-col gap-8 px-8 py-10 bg-[#080808] border border-zinc-900 rounded-[32px] font-pretendard">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SyncIcon />
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C2A35D] font-bold font-serif italic">
            Cognitive Sync
          </p>
        </div>
        {selected && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[9px] text-zinc-600 tracking-widest uppercase">
            동기화 완료
          </motion.span>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-light text-white tracking-tight">오늘 내 몸과 마음 상태를 선택해 주세요.</h3>
        <p className="text-zinc-600 text-xs font-light">내 상태에 딱 맞춰서 오늘 가장 하기 좋은 알맞은 일이 전해집니다.</p>
      </div>

      <div className="flex gap-3">
        {CONDITIONS.map((c) => {
          const active = selected === c;
          return (
            <button
              key={c}
              onClick={() => setSelected(c)}
              className="flex-1 py-4 text-[11px] font-bold tracking-widest transition-all duration-500 rounded-xl border uppercase"
              style={{
                background: active ? "#C2A35D" : "transparent",
                color: active ? "#000" : "#555",
                borderColor: active ? "#C2A35D" : "#1A1A1A",
              }}
            >
              {c}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-6 border-t border-zinc-900 space-y-4"
          >
            <p className="text-[#C2A35D] text-[10px] tracking-widest font-bold uppercase">Today&apos;s Directive</p>
            <p className="text-md text-zinc-200 leading-relaxed font-light break-keep">
              {DIRECTIVES[selected]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2 pt-2">
        <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>
        <p className="text-[9px] tracking-widest text-zinc-800 uppercase font-medium">
          Authorized Sessions Active
        </p>
      </div>
    </section>
  );
}
