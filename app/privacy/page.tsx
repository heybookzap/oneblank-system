'use client'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-pretendard selection:bg-[#C2A35D] selection:text-black">
      <main className="flex-1 max-w-3xl mx-auto py-24 px-6 space-y-12 w-full text-left">
        <h1 className="text-3xl font-serif font-bold tracking-tight text-[#C2A35D]">개인정보 처리방침</h1>
        <div className="text-[17px] text-zinc-300 leading-[1.8] space-y-8 font-light tracking-wide break-keep italic mb-12">
          "회원님의 모든 목표와 하루 기록은 아주 안전한 암호로 바뀌어 소중하게 보호됩니다. 우리는 회원님이 마음 편하게 행동할 수 있도록 도울 뿐, 그 어떤 정보도 다른 사람에게 절대로 말하지 않습니다."
        </div>
        <div className="space-y-10 border-t border-zinc-900 pt-12">
          <section className="space-y-4">
            <h2 className="text-white text-lg font-medium">1. 모으는 개인 정보와 모으는 방법</h2>
            <p className="text-zinc-400 text-[15px] leading-relaxed font-light">
              - 꼭 필요한 정보: 이메일 주소, 결제 정보(카드 번호 일부와 결제 확인 번호), 내가 정한 목표, 매일 내 몸 상태와 체크인 기록.<br />
              - 모으는 방법: 회원가입을 할 때, 처음 질문에 답할 때, 매일 하루 기록을 확인할 때 자동으로 저장됩니다.
            </p>
          </section>
          <section className="space-y-4">
            <h2 className="text-white text-lg font-medium">2. 개인 정보를 사용하는 이유</h2>
            <p className="text-zinc-400 text-[15px] leading-relaxed font-light">
              모은 정보는 오직 회원님 한 분만을 위한 1:1 맞춤형 오늘 할 일을 만들고, 내가 시간을 얼마나 잘 아꼈는지 계산해서 보여주는 데에만 사용됩니다.
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
