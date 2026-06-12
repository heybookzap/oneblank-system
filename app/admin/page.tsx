'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminDashboardPage() {
  const router = useRouter()
  
  // 탭 상태에 'KEY_DESK'를 추가하여 계정 발급 화면을 연결했습니다.
  const [adminTab, setAdminTab] = useState<'ANALYTICS' | 'PREVIEW' | 'KEY_DESK'>('PREVIEW')
  const [previewView, setPreviewView] = useState<'SLICING' | 'WELCOME_BACK' | 'CONDITION' | 'REPORT' | 'VALUE' | 'DONE'>('SLICING')
  const [condition, setCondition] = useState('보통')
  const [isCheckingIn, setIsCheckingIn] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  const hourlyWage = 100000
  const vvipCount = 28

  const [editingUser, setEditingUser] = useState<any>(null)
  const [selectedConditionTab, setSelectedConditionTab] = useState<'아주 좋음' | '보통' | '피곤함'>('보통')
  const [reportDrafts, setReportDrafts] = useState<any>({
    '아주 좋음': { action: '', benefit: '', loss: '', mindset: '' },
    '보통': { action: '', benefit: '', loss: '', mindset: '' },
    '피곤함': { action: '', benefit: '', loss: '', mindset: '' }
  })

  // VVIP 계정 발급을 위한 새로운 상태값들입니다.
  const [issueEmail, setIssueEmail] = useState("")
  const [issuePassword, setIssuePassword] = useState("")
  const [issueName, setIssueName] = useState("")
  const [isIssuing, setIsIssuing] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }))
    }
    updateTime()
    const timer = setInterval(updateTime, 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (previewView === 'VALUE') {
      const timer = setTimeout(() => {
        setPreviewView('DONE')
      }, 6000)
      return () => clearTimeout(timer)
    }
  }, [previewView])

  const handleTestCheckIn = async () => {
    setIsCheckingIn(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsCheckingIn(false)
    setPreviewView('VALUE')
  }

  // 계정 발급 처리 함수입니다.
  const handleCreateAccount = async () => {
    setIsIssuing(true)
    try {
      const res = await fetch("/api/admin/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: issueEmail, password: issuePassword, name: issueName }),
      })

      if (!res.ok) throw new Error("계정 발급에 실패했습니다.")

      alert(`[${issueName}] 고객의 VVIP 계정이 성공적으로 발급되었습니다.`)
      setIssueEmail("")
      setIssuePassword("")
      setIssueName("")
    } catch (error) {
      alert("오류가 발생했습니다. 시스템 연결 상태를 확인해 주세요.")
    } finally {
      setIsIssuing(false)
    }
  }

  const mockMetrics = {
    totalVVIP: 28,
    activeToday: 24,
    absentToday: 4,
    mrr: 10920000,
  }

  const mockUsers = [
    { 
      id: 1, name: "김대표", email: "ceo@company.com", plan: "연 구독 (VVIP)", status: "PENDING", condition: "-", streak: 12, lastLogin: "05:12 AM",
      preDrafts: {
        '아주 좋음': { action: "지금 머리가 가장 쌩쌩하고 움직이기 좋은 상태입니다. 오늘 꼭 해야 하는 중요한 일 3가지만 바로 시작할 수 있게 아주 작게 나누어 보세요.", benefit: "원하는 목표를 2배 더 빠르게 이룰 수 있습니다.", loss: "집중하기 가장 좋은 황금 같은 시간을 그냥 날려버리게 됩니다.", mindset: "당신의 시간은 정말 소중합니다. 지금 쓸데없는 고민을 하느라 에너지를 낭비하고 있진 않나요?" },
        '보통': { action: "마음이 차분하고 안정된 상태입니다. 어제 정해둔 가장 중요한 일을 지금 바로 딱 25분만 집중해서 시작해 보세요.", benefit: "매일 좋은 습관을 이어가고 더 큰 결실을 맺게 됩니다.", loss: "아무것도 하지 않고 흘려보내는 아쉬운 하루가 될 수 있습니다.", mindset: "몸과 마음이 평범할 때 미루지 않고 묵묵히 행동하는 것이 진짜 실력입니다." },
        '피곤함': { action: "오늘은 몸과 마음이 많이 지친 상태입니다. 무리하지 말고 컴퓨터 바탕화면에 폴더 하나만 새로 만들고 바로 쉬세요. 딱 1분이면 충분합니다.", benefit: "지친 머리가 바로 편안해지고 스트레스가 줄어듭니다.", loss: "잘해야 한다는 걱정 때문에 오히려 며칠 동안 아무것도 못 하고 미루게 됩니다.", mindset: "지금 억지로 붙잡고 있는 그 일이, 혹시 마음속 불안감 때문에 내려놓지 못하는 것은 아닌지 돌아보세요." }
      }
    },
    { 
      id: 2, name: "최임원", email: "choi@corp.com", plan: "월 구독", status: "PENDING", condition: "-", streak: 45, lastLogin: "어제",
      preDrafts: {
        '아주 좋음': { action: "가장 미루고 싶고 미뤄왔던 그 일부터 지금 당장 시작해 보세요.", benefit: "머리를 무겁게 짓누르던 커다란 고민이 바로 사라집니다.", loss: "해야 한다는 마음의 짐 때문에 일주일 전체를 망치게 될 수 있습니다.", mindset: "가장 어렵고 귀찮은 일은 힘이 가장 가득 차 있는 지금 바로 끝내야 합니다." },
        '보통': { action: "하고 있는 일의 핵심 내용만 간단하게 딱 3문장으로 요약해서 사람들과 공유해 보세요.", benefit: "앞으로 해야 할 방향이 눈앞에 명확하게 보입니다.", loss: "이야기가 엉뚱하게 흘러가 소중한 시간과 노력이 낭비될 수 있습니다.", mindset: "정확하게 정해두고 움직여야 속도가 빨라집니다." },
        '피곤함': { action: "모든 컴퓨터와 핸드폰 알림을 끄고 15분간 눈을 감고 쉬세요. 그 후에 가벼운 메일 정리만 10분 동안 진행합니다.", benefit: "피로가 풀리고 최소한으로 해야 할 중요한 일을 안전하게 지켜냅니다.", loss: "무안하게 버티다가 더 큰 번아웃이 와서 주말 전체를 날릴 수 있습니다.", mindset: "제대로 쉴 줄 아는 것도 다음 행동을 위한 가장 강력한 준비입니다." }
      }
    }
  ]

  const openReportModal = (user: any) => {
    setEditingUser(user)
    setSelectedConditionTab('보통')
    setReportDrafts({
      '아주 좋음': { ...user.preDrafts['아주 좋음'] },
      '보통': { ...user.preDrafts['보통'] },
      '피곤함': { ...user.preDrafts['피곤함'] }
    })
  }

  const handleDraftChange = (field: string, value: string) => {
    setReportDrafts((prev: any) => ({
      ...prev,
      [selectedConditionTab]: {
        ...prev[selectedConditionTab],
        [field]: value
      }
    }))
  }

  const saveReport = () => {
    setEditingUser(null)
  }

  const conditionPreviewMapping: Record<string, { action: string; benefit: string; loss: string; mindset: string }> = {
    '아주 좋음': {
      action: '"지금 머리가 가장 쌩쌩하고 움직이기 좋은 상태입니다. 오늘 꼭 해야 하는 중요한 일 3가지만 바로 시작할 수 있게 아주 작게 나누어 보세요."',
      benefit: '원하는 목표를 2배 더 빠르게 이룰 수 있습니다.',
      loss: '집중하기 가장 좋은 황금 같은 시간을 그냥 날려버리게 됩니다.',
      mindset: '"당신의 시간은 정말 소중합니다. 지금 쓸데없는 고민을 하느라 에너지를 낭비하고 있진 않나요?"'
    },
    '보통': {
      action: '"마음이 차분하고 안정된 상태입니다. 어제 정해둔 가장 중요한 일을 지금 바로 딱 25분만 집중해서 시작해 보세요."',
      benefit: '매일 좋은 습관을 이어가고 더 큰 결실을 맺게 됩니다.',
      loss: '아무것도 하지 않고 흘려보내는 아쉬운 하루가 될 수 있습니다.',
      mindset: '"몸과 마음이 평범할 때 미루지 않고 묵묵히 행동하는 것이 진짜 실력입니다."'
    },
    '피곤함': {
      action: '"오늘은 몸과 마음이 많이 지친 상태입니다. 무리하지 말고 컴퓨터 바탕화면에 폴더 하나만 새로 만들고 바로 쉬세요. 딱 1분이면 충분합니다."',
      benefit: '지친 머리가 바로 편안해지고 스트레스가 줄어듭니다.',
      loss: '잘해야 한다는 걱정 때문에 오히려 며칠 동안 아무것도 못 하고 미루게 됩니다.',
      mindset: '"지금 억지로 붙잡고 있는 그 일이, 혹시 마음속 불안감 때문에 내려놓지 못하는 것은 아닌지 돌아보세요."'
    }
  }

  const activePreview = conditionPreviewMapping[condition] || conditionPreviewMapping['보통']

  return (
    <main className="min-h-screen bg-[#050505] text-white flex flex-col font-pretendard relative selection:bg-[#C2A35D] selection:text-black overflow-y-auto">
      <div className="fixed top-0 left-0 w-full bg-black/95 border-b border-zinc-800 z-[100] backdrop-blur-2xl px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="text-[#C2A35D] font-serif italic text-xl font-bold tracking-tight">ONE BLANK</span>
          <span className="text-zinc-600 text-[10px] tracking-widest uppercase">/ Admin Console</span>
        </div>
        <div className="flex bg-zinc-900/50 p-1 rounded-md border border-zinc-800">
          <button onClick={() => setAdminTab('ANALYTICS')} className={`px-6 py-2 text-[11px] font-bold tracking-widest uppercase rounded-sm transition-all ${adminTab === 'ANALYTICS' ? 'bg-[#C2A35D] text-black' : 'text-zinc-500 hover:text-white'}`}>Data Analytics</button>
          <button onClick={() => setAdminTab('PREVIEW')} className={`px-6 py-2 text-[11px] font-bold tracking-widest uppercase rounded-sm transition-all ${adminTab === 'PREVIEW' ? 'bg-[#C2A35D] text-black' : 'text-zinc-500 hover:text-white'}`}>UI Preview</button>
          {/* 새로 추가된 발급 데스크 탭입니다 */}
          <button onClick={() => setAdminTab('KEY_DESK')} className={`px-6 py-2 text-[11px] font-bold tracking-widest uppercase rounded-sm transition-all ${adminTab === 'KEY_DESK' ? 'bg-[#C2A35D] text-black' : 'text-zinc-500 hover:text-white'}`}>Key Desk</button>
        </div>
        <button onClick={() => router.push('/')} className="text-zinc-500 hover:text-white text-[10px] tracking-widest uppercase transition-colors">[ Exit ]</button>
      </div>

      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(194,163,93,0.025)_0%,_transparent_60%)] pointer-events-none z-0"></div>

      <div className="pt-24 flex-1 flex flex-col z-10">
        
        {adminTab === 'ANALYTICS' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 max-w-7xl mx-auto w-full space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-[#0A0A0A] border border-zinc-800 p-8 rounded-2xl flex flex-col gap-3 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#C2A35D]/50"></div>
                <span className="text-zinc-500 text-[11px] font-bold tracking-widest uppercase">Total Active VVIPs</span>
                <span className="text-4xl font-light text-white tracking-tight">{mockMetrics.totalVVIP}명</span>
              </div>
              <div className="bg-[#0A0A0A] border border-zinc-800 p-8 rounded-2xl flex flex-col gap-3 shadow-xl">
                <span className="text-zinc-500 text-[11px] font-bold tracking-widest uppercase">Checked-In Today</span>
                <span className="text-4xl font-light text-[#C2A35D] tracking-tight">{mockMetrics.activeToday}명</span>
              </div>
              <div className="bg-[#0A0A0A] border border-red-900/30 p-8 rounded-2xl flex flex-col gap-3 shadow-xl">
                <span className="text-red-500/70 text-[11px] font-bold tracking-widest uppercase">Absent Warning</span>
                <span className="text-4xl font-light text-red-400 tracking-tight">{mockMetrics.absentToday}명</span>
              </div>
              <div className="bg-[#0A0A0A] border border-zinc-800 p-8 rounded-2xl flex flex-col gap-3 shadow-xl">
                <span className="text-zinc-500 text-[11px] font-bold tracking-widest uppercase">Est. Monthly Revenue</span>
                <span className="text-4xl font-light text-white tracking-tight">₩ {(mockMetrics.mrr / 10000).toLocaleString()}만</span>
              </div>
            </div>

            <div className="bg-[#0A0A0A] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
              <div className="px-10 py-8 border-b border-zinc-800 flex justify-between items-center bg-[#111111]/50">
                <h3 className="text-xl font-medium text-white tracking-wide">VVIP 행동 로깅 모니터</h3>
                <button className="text-[#C2A35D] text-[12px] font-bold uppercase tracking-[0.2em] border border-[#C2A35D]/30 px-5 py-2 rounded-full hover:bg-[#C2A35D]/10 transition-colors">Export CSV</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-black/50 text-zinc-500 text-[11px] tracking-widest uppercase font-bold">
                      <th className="px-10 py-5 font-medium">Name</th>
                      <th className="px-10 py-5 font-medium">Plan</th>
                      <th className="px-10 py-5 font-medium">Today Status</th>
                      <th className="px-10 py-5 font-medium">Condition</th>
                      <th className="px-10 py-5 font-medium">Streak</th>
                      <th className="px-10 py-5 font-medium">Last Login</th>
                      <th className="px-10 py-5 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-[14px] divide-y divide-zinc-900/50">
                    {mockUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-zinc-900/30 transition-colors">
                        <td className="px-10 py-6">
                          <div className="flex flex-col gap-1.5">
                            <span className="text-white font-medium tracking-wide text-[15px]">{user.name}</span>
                            <span className="text-zinc-600 text-[12px] tracking-wide">{user.email}</span>
                          </div>
                        </td>
                        <td className="px-10 py-6 text-zinc-400 tracking-wide">{user.plan}</td>
                        <td className="px-10 py-6">
                          {user.status === 'PENDING' && <span className="text-zinc-400 text-[12px] border border-zinc-700 px-3 py-1.5 rounded-md tracking-wider font-medium">대기중</span>}
                        </td>
                        <td className="px-10 py-6 text-zinc-400 tracking-wide">{user.condition}</td>
                        <td className="px-10 py-6 text-white font-medium tracking-wide">{user.streak} Days</td>
                        <td className="px-10 py-6 text-zinc-500 tracking-wide">{user.lastLogin}</td>
                        <td className="px-10 py-6 text-right">
                          <button onClick={() => openReportModal(user)} className="text-[#C2A35D] font-bold hover:text-white text-[12px] border border-[#C2A35D]/40 px-4 py-2 rounded transition-colors tracking-widest uppercase hover:bg-[#C2A35D]/10">
                            사전 데스킹
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {adminTab === 'PREVIEW' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col relative">
            <div className="w-full bg-black border-b border-zinc-800 py-3 flex justify-center gap-2 overflow-x-auto px-4 z-50">
              <span className="text-zinc-600 text-[11px] font-bold tracking-[0.25em] uppercase mr-5 flex items-center">Flow Test</span>
              {['SLICING', 'WELCOME_BACK', 'CONDITION', 'REPORT', 'VALUE', 'DONE'].map((state) => (
                <button 
                  key={state}
                  onClick={() => setPreviewView(state as any)}
                  className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded border transition-all ${
                    previewView === state ? 'border-[#C2A35D] text-[#C2A35D] bg-[#C2A35D]/5' : 'border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600'
                  }`}
                >
                  {state.replace('_', ' ')}
                </button>
              ))}
            </div>

            <div className="flex-1 flex items-center justify-center relative overflow-hidden text-center">
              <AnimatePresence mode="wait">
                
                {previewView === 'SLICING' && (
                  <motion.div key="p-slicing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center z-10 w-full h-full relative overflow-hidden">
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02]">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px] [transform:perspective(1000px)_rotateX(60deg)] [transform-origin:top]"></div>
                      <motion.div animate={{ rotate: 360, x: [0, 20, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute top-1/4 -left-16 w-[400px] h-[400px] border-[0.5px] border-white/10 rounded-full" style={{ transform: "perspective(1000px) rotateY(70deg)" }} />
                      <motion.div animate={{ y: [0, -30, 0], x: [0, -10, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className="absolute top-10 right-1/4 w-[320px] h-[320px] bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(1000px)_rotateX(50deg)_rotateZ(20deg)]" />
                      <motion.div animate={{ rotateY: 360, y: [0, 15, 0] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute bottom-1/3 left-1/3 w-[280px] h-[280px] border-[0.5px] border-white/10 rounded-full" style={{ transform: "perspective(1000px) rotateX(10deg)" }} />
                    </div>
                    <div className="space-y-12 flex flex-col items-center z-10">
                      <div className="relative w-[76px] h-[76px] flex items-center justify-center mb-6">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border-t border-r border-[#C2A35D] opacity-70" />
                        <motion.div animate={{ rotate: -360 }} transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }} className="absolute inset-2 rounded-full border-b border-l border-zinc-600 opacity-50" />
                      </div>
                      <h1 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-[0.2em] uppercase">SYSTEM SLICING</h1>
                      <div className="space-y-8 max-w-xl text-center">
                        <p className="text-zinc-400 text-[15px] font-light leading-[1.9] tracking-wide break-keep px-6">성공한 사람들의 수많은 행동 데이터를 바탕으로, 오늘 당신이 바로 움직일 수 있는 가장 완벽하고 쉬운 방법을 찾는 중입니다.</p>
                        <p className="text-zinc-400 text-[15px] font-light pt-2">아침 <span className="font-bold text-white tracking-[0.15em] mx-2">05:00 AM</span>에 준비해 두겠습니다.</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {previewView === 'WELCOME_BACK' && (
                  <motion.div key="p-wb" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="z-10 w-full max-w-2xl px-6 flex flex-col items-center justify-center flex-1">
                    <div className="w-16 h-16 border border-[#C2A35D] rounded-full flex items-center justify-center mb-8 bg-[#C2A35D]/5 shadow-[0_0_30px_rgba(194,163,93,0.1)]"><span className="text-[#C2A35D] text-2xl font-light">✓</span></div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-8 tracking-tight break-keep">환영합니다.</h2>
                    <div className="w-full bg-[#0A0A0A] border border-zinc-800 rounded-3xl p-10 md:p-12 flex flex-col items-center text-center space-y-8 shadow-2xl mb-10">
                      <p className="text-zinc-400 text-[15px] md:text-[16px] font-light leading-[1.9] tracking-wide break-keep px-4">지나간 어제의 일이나 미룬 일들은 모두 깨끗하게 지웠습니다.</p>
                      <div className="space-y-3">
                        <p className="text-white text-[16px] md:text-[17px] font-medium tracking-wide break-keep">어제 못 한 일 때문에 속상해할 필요는 전혀 없습니다.</p>
                        <p className="text-white text-[16px] md:text-[17px] font-medium tracking-wide break-keep">오늘 알려드리는 딱 한 가지만 마음 편하게 행동해 보세요.</p>
                      </div>
                    </div>
                    <button onClick={() => setPreviewView('CONDITION')} className="px-14 py-5 border border-[#C2A35D] text-[#C2A35D] text-[14px] font-bold tracking-[0.25em] uppercase hover:bg-[#C2A35D] hover:text-black transition-all duration-500 rounded-xl">오늘의 설계 시작하기</button>
                  </motion.div>
                )}

                {previewView === 'CONDITION' && (
                  <motion.div key="p-c" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="z-10 w-full flex flex-col items-center justify-center max-w-4xl flex-1 px-6">
                    <div className="border border-[#C2A35D]/40 text-[#C2A35D] px-10 py-3 rounded-full text-[12px] font-bold tracking-[0.25em] mb-12 uppercase bg-[#C2A35D]/5">{currentTime || '05:00 AM'}</div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-10 leading-tight tracking-tight break-keep">대표님, 오늘의 컨디션은 어떠십니까?</h2>
                    <div className="flex flex-col md:flex-row gap-4 mb-20 w-full max-w-2xl">
                      {['피곤함', '보통', '아주 좋음'].map((status) => (
                        <button key={status} onClick={() => { setCondition(status); setPreviewView('REPORT'); }} className="flex-1 py-10 border border-zinc-800 bg-[#0A0A0A] hover:border-[#C2A35D]/60 hover:bg-white/[0.03] transition-all duration-500 rounded-2xl text-zinc-300 hover:text-white text-[16px] font-medium tracking-wide shadow-xl hover:shadow-[0_0_20px_rgba(194,163,93,0.1)]">{status}</button>
                      ))}
                    </div>
                    {vvipCount > 0 && (
                      <div className="flex items-center gap-3 opacity-70">
                        <span className="text-[#C2A35D] text-[9px]">●</span>
                        <p className="text-zinc-500 text-[11px] font-light tracking-wide break-keep">현재 <span className="text-zinc-300 font-medium mx-1">{vvipCount}명</span>의 대표님들이 머릿속 걱정을 비우고 마음 편히 행동을 시작하고 있습니다.</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {previewView === 'REPORT' && (
                  <motion.div key="p-r" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="z-10 w-full max-w-3xl px-6 pb-24 pt-8">
                    <div className="bg-[#080808] border border-zinc-800 rounded-3xl p-10 md:p-14 space-y-8 shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C2A35D]/40 to-transparent"></div>
                      <div className="flex justify-between items-center border-b border-zinc-800/60 pb-6">
                        <h2 className="text-xl font-medium text-white tracking-wide">오늘의 행동 안내서</h2>
                        <div className="border border-[#C2A35D]/30 text-[#C2A35D] px-6 py-2.5 rounded-md text-[13px] font-bold tracking-widest bg-[#C2A35D]/5">C: {condition}</div>
                      </div>
                      <div className="space-y-8 text-left">
                        <div className="space-y-4">
                          <h3 className="text-[#C2A35D] text-[13px] font-bold tracking-[0.15em] uppercase">▮ 1. 지금 바로 해야 할 한 가지</h3>
                          <div className="bg-[#111111] border border-zinc-800 rounded-2xl p-8 md:p-10">
                            <p className="text-[14px] md:text-[15px] font-light leading-[1.8] text-zinc-100 tracking-wide break-keep">
                              {activePreview.action}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-[#C2A35D] text-[13px] font-bold tracking-[0.15em] uppercase">▮ 2. 이 행동을 했을 때와 안 했을 때</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="bg-[#111111] border border-zinc-800 rounded-2xl p-8 space-y-4">
                              <p className="text-zinc-400 text-[13px] flex items-center gap-3 tracking-wide">
                                <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-[12px] font-extrabold shadow-[0_0_10px_rgba(255,255,255,0.4)]">O</span> 행동하면 얻는 좋은 결과
                              </p>
                              <p className="text-white text-[15px] font-medium tracking-wide break-keep leading-relaxed">{activePreview.benefit}</p>
                            </div>
                            <div className="bg-[#111111] border border-[#5A1515]/30 rounded-2xl p-8 space-y-4 shadow-[0_0_15px_rgba(90,21,21,0.1)]">
                              <p className="text-zinc-400 text-[13px] flex items-center gap-3 tracking-wide">
                                <span className="bg-[#6B1C1C] text-white border border-[#8B2222] rounded-full w-6 h-6 flex items-center justify-center text-[12px] font-extrabold shadow-[0_0_12px_rgba(180,30,30,0.4)]">X</span> 미루면 겪게 될 아쉬운 결과
                              </p>
                              <p className="text-zinc-300 text-[15px] font-medium tracking-wide break-keep leading-relaxed">{activePreview.loss}</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-[#C2A35D] text-[13px] font-bold tracking-[0.15em] uppercase">▮ 3. 머릿속 걱정 바꾸기</h3>
                          <p className="text-zinc-400 text-[14px] font-light leading-[1.8] italic tracking-wide break-keep pr-4">
                            {activePreview.mindset}
                          </p>
                        </div>
                      </div>
                      
                      <motion.button 
                        onClick={handleTestCheckIn} 
                        disabled={isCheckingIn} 
                        whileTap={{ scale: 0.96, backgroundColor: '#050505', color: '#C2A35D', borderColor: '#C2A35D' }} 
                        className="w-full py-6 mt-6 bg-white text-black text-[15px] font-bold tracking-wide border border-transparent hover:bg-[#C2A35D] transition-colors duration-200 rounded-xl shadow-xl flex justify-center items-center gap-3 relative overflow-hidden cursor-pointer"
                      >
                        {isCheckingIn ? <><div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div><span className="tracking-[0.2em] font-pretendard">SYSTEM SYNCING...</span></> : <span>10초 퀵 체크인</span>}
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {previewView === 'VALUE' && (
                  <motion.div key="p-v" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -20 }} className="z-10 w-full max-w-2xl px-6 flex flex-col items-center">
                    <div className="w-16 h-16 border border-[#C2A35D] rounded-full flex items-center justify-center mb-8 bg-[#C2A35D]/5 shadow-[0_0_30px_rgba(194,163,93,0.1)]"><span className="text-[#C2A35D] text-2xl font-light">✓</span></div>
                    <div className="text-center space-y-4 mb-8">
                      <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight break-keep">소중한 시간과 에너지를 벌었습니다.</h2>
                      <p className="text-zinc-400 text-[15px] font-light tracking-wide break-keep">망설이지 않고 2분 동안 바로 행동해서 아껴낸 소중한 가치입니다.</p>
                    </div>
                    <div className="w-full bg-[#080808] border border-zinc-800 rounded-3xl p-12 flex flex-col items-center justify-center space-y-8 relative overflow-hidden shadow-2xl mb-8">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C2A35D]/50 to-transparent"></div>
                      <p className="text-[#C2A35D] text-[13px] tracking-[0.4em] uppercase font-bold drop-shadow-[0_0_8px_rgba(194,163,93,0.4)]">1-Year ROI</p>
                      <div className="flex items-baseline gap-3">
                        <span className="text-zinc-500 text-3xl font-light">₩</span>
                        <span className="text-5xl md:text-6xl font-bold tracking-[-0.05em] text-white">{(hourlyWage * 150).toLocaleString()}</span>
                      </div>
                      <p className="text-[#C2A35D] text-[15px] font-medium tracking-[0.1em]">↑ {(hourlyWage * 1.5).toLocaleString()} (Today)</p>
                    </div>
                    <div className="w-full bg-[#0A0A0A] border border-zinc-900 rounded-2xl p-8 text-center"><p className="text-zinc-400 text-[14px] font-light tracking-wide break-keep leading-relaxed">가장 시작하기 어려웠던 2분이 드디어 끝났습니다. 이제 고민을 멈추고 다음 일들도 가볍게 이어나가 보세요.</p></div>
                  </motion.div>
                )}

                {previewView === 'DONE' && (
                  <motion.div key="p-d" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="z-10 text-center flex flex-col items-center justify-center w-full max-w-3xl px-6">
                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="w-24 h-24 border border-[#C2A35D] rounded-full flex items-center justify-center mb-12 bg-[#C2A35D]/5 shadow-[0_0_40px_rgba(194,163,93,0.15)]">
                      <svg className="w-10 h-10 text-[#C2A35D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="5" y="11" width="14" height="10" rx="2" strokeWidth="1.2"/>
                        <path d="M8 11V7a4 4 0 1 1 8 0v4" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }} className="space-y-8 w-full">
                      <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight break-keep">오늘 하루의 성공적인 마무리를 축하합니다.</h2>
                      <div className="text-zinc-400 text-[15px] md:text-[16px] font-light leading-[1.7] tracking-wide break-keep space-y-1">
                        <p>당신은 방금 오늘 가장 중요하고 의미 있는 일을 멋지게 끝내셨습니다.</p>
                        <p>지금부터 머릿속에 떠오르는 '일을 더 해야 하지 않을까?'라는 걱정은,</p>
                        <p>잘하고 싶은 마음이 만든 가짜 불안입니다. 오히려 내일의 에너지를 빼앗아 갈 뿐입니다.</p>
                        <div className="pt-14 mt-14 border-t border-zinc-800/80">
                          <p className="text-white text-[17px] md:text-[18px] font-medium tracking-wide">이제 생각을 끄고 편안하게 푹 쉬세요.</p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* 새로 추가된 KEY_DESK 화면입니다 */}
        {adminTab === 'KEY_DESK' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex items-center justify-center p-6">
            <div className="bg-[#0A0A0A] border border-zinc-800 p-10 w-full max-w-lg shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C2A35D] to-transparent opacity-50"></div>
              
              <div className="text-center mb-10">
                <h2 className="text-white text-2xl font-serif italic tracking-tight mb-2">VVIP 마스터 키 발급</h2>
                <p className="text-zinc-500 text-xs font-light">입금이 확인된 고객에게 임시 접속 권한을 강제로 생성하여 부여합니다.</p>
              </div>

              <div className="space-y-6 text-left">
                <div className="space-y-2">
                  <label className="text-zinc-400 text-xs tracking-widest uppercase">Customer Name</label>
                  <input
                    type="text"
                    value={issueName}
                    onChange={(e) => setIssueName(e.target.value)}
                    placeholder="고객 이름"
                    className="w-full bg-black border border-zinc-800 text-white p-4 outline-none focus:border-[#C2A35D] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-zinc-400 text-xs tracking-widest uppercase">Email Address</label>
                  <input
                    type="email"
                    value={issueEmail}
                    onChange={(e) => setIssueEmail(e.target.value)}
                    placeholder="접속에 사용할 이메일"
                    className="w-full bg-black border border-zinc-800 text-white p-4 outline-none focus:border-[#C2A35D] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-zinc-400 text-xs tracking-widest uppercase">Temporary Password</label>
                  <input
                    type="text"
                    value={issuePassword}
                    onChange={(e) => setIssuePassword(e.target.value)}
                    placeholder="임시 비밀번호 (예: 1234)"
                    className="w-full bg-black border border-zinc-800 text-white p-4 outline-none focus:border-[#C2A35D] transition-colors"
                  />
                </div>

                <button
                  onClick={handleCreateAccount}
                  disabled={isIssuing || !issueEmail || !issuePassword}
                  className="w-full bg-white text-black font-bold py-5 mt-4 disabled:opacity-50 hover:bg-[#C2A35D] transition-colors uppercase tracking-[0.2em] text-[11px]"
                >
                  {isIssuing ? '발급 중...' : '계정 발급 및 승인'}
                </button>
              </div>
            </div>
          </motion.div>
        )}

      </div>

      <AnimatePresence>
        {editingUser && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center px-6">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-[#0A0A0A] border border-zinc-800 rounded-3xl p-12 w-full max-w-4xl shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-10 border-b border-zinc-800 pb-8">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-white tracking-wide">행동 지침 준비하기 (Pre-Desking)</h3>
                  <p className="text-zinc-400 text-[14px] mt-3 tracking-wide font-light">[{editingUser.name}] 고객이 오기 전에 몸 상태에 맞는 3가지 맞춤형 행동 지침을 미리 확인하고 고칩니다.</p>
                </div>
                <button onClick={() => setEditingUser(null)} className="text-zinc-500 hover:text-white text-3xl font-light">×</button>
              </div>

              <div className="flex border-b border-zinc-800 mb-10">
                {['아주 좋음', '보통', '피곤함'].map(tab => (
                  <button key={tab} onClick={() => setSelectedConditionTab(tab as any)} className={`flex-1 py-5 text-[14px] font-bold tracking-[0.2em] uppercase transition-all ${selectedConditionTab === tab ? 'text-[#C2A35D] border-b-2 border-[#C2A35D]' : 'text-zinc-600 hover:text-zinc-400'}`}>
                    {tab}
                  </button>
                ))}
              </div>

              <div className="space-y-10 text-left">
                <div>
                  <label className="block text-[#C2A35D] text-[12px] font-bold tracking-[0.2em] mb-4 uppercase">1. 지금 바로 해야 할 한 가지</label>
                  <textarea value={reportDrafts[selectedConditionTab].action} onChange={(e) => handleDraftChange('action', e.target.value)} className="w-full bg-[#111111] border border-zinc-800 rounded-2xl p-6 text-zinc-300 text-[16px] leading-[1.8] tracking-wide focus:border-[#C2A35D] focus:outline-none min-h-[120px]" />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[#C2A35D] text-[12px] font-bold tracking-[0.2em] mb-4 uppercase">2-1. 행동하면 얻는 좋은 결과</label>
                    <textarea value={reportDrafts[selectedConditionTab].benefit} onChange={(e) => handleDraftChange('benefit', e.target.value)} className="w-full bg-[#111111] border border-zinc-800 rounded-2xl p-6 text-zinc-300 text-[16px] leading-[1.8] tracking-wide focus:border-[#C2A35D] focus:outline-none min-h-[100px]" />
                  </div>
                  <div>
                    <label className="block text-[#C2A35D] text-[12px] font-bold tracking-[0.2em] mb-4 uppercase">2-2. 미루면 겪게 될 아쉬운 결과</label>
                    <textarea value={reportDrafts[selectedConditionTab].loss} onChange={(e) => handleDraftChange('loss', e.target.value)} className="w-full bg-[#111111] border border-zinc-800 rounded-2xl p-6 text-zinc-300 text-[16px] leading-[1.8] tracking-wide focus:border-[#C2A35D] focus:outline-none min-h-[100px]" />
                  </div>
                </div>
                <div>
                  <label className="block text-[#C2A35D] text-[12px] font-bold tracking-[0.2em] mb-4 uppercase">3. 머릿속 걱 바꾸기</label>
                  <textarea value={reportDrafts[selectedConditionTab].mindset} onChange={(e) => handleDraftChange('mindset', e.target.value)} className="w-full bg-[#111111] border border-zinc-800 rounded-2xl p-6 text-zinc-300 text-[16px] leading-[1.8] tracking-wide focus:border-[#C2A35D] focus:outline-none min-h-[100px]" />
                </div>
              </div>

              <div className="flex gap-6 mt-14">
                <button onClick={() => setEditingUser(null)} className="flex-1 py-6 border border-zinc-800 text-zinc-400 rounded-xl hover:bg-zinc-900 transition-colors text-[14px] font-bold tracking-[0.2em] uppercase">취소</button>
                <button onClick={saveReport} className="flex-1 py-6 bg-[#C2A35D] text-black font-bold rounded-xl hover:bg-[#d4b97a] transition-colors text-[14px] tracking-[0.2em] uppercase shadow-xl">이 컨디션 초안 저장</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
