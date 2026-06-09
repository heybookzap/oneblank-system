"use client";

import { motion } from "framer-motion";

export default function CancelFlow({
  onAccept,
  onCancel,
}: {
  onAccept?: () => void;
  onCancel?: () => void;
}) {
  return (
    <section className="relative z-10 w-full max-w-lg flex flex-col items-center gap-12 px-6 py-16 text-center mx-auto font-pretendard">
      <p className="text-[10px] tracking-[0.5em] font-bold uppercase text-red-600 opacity-90 italic font-serif">
        Warning
      </p>

      <div className="space-y-6">
        <h2 className="text-3xl sm:text-4xl font-light leading-tight tracking-tighter text-white break-keep">
          구독을 <span className="font-bold text-red-500">정말 취소</span>하시겠습니까?
        </h2>

        <p className="text-sm leading-relaxed text-zinc-500 max-w-sm mx-auto break-keep">
          취소하시면 지금까지 열심히 모아둔 <br />
          <span className="text-red-900 font-bold underline underline-offset-4">모든 소중한 기록이 바로 사라지며</span> 다시는 되찾을 수 없습니다.
        </p>
      </div>

      <div className="w-full flex flex-col gap-5 mt-4">
        <motion.button
          onClick={onAccept}
          whileHover={{ scale: 1.02, backgroundColor: "#C2A35D" }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-6 text-[11px] font-bold tracking-[0.3em] uppercase transition-all duration-500 rounded-xl shadow-2xl"
          style={{
            background: "#C2A35D",
            color: "#000000",
          }}
        >
          취소하지 않고 돌아가기
        </motion.button>

        <button
          onClick={onCancel}
          className="w-full py-3 text-[10px] tracking-widest text-zinc-800 underline underline-offset-8 hover:text-zinc-500 transition-colors uppercase decoration-zinc-900"
        >
          기록이 모두 사라져도 취소하겠습니다
        </button>
      </div>
    </section>
  );
}
