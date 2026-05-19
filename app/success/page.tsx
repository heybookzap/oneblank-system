'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

function SuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState('보안 결제 승인을 확인하고 있습니다.')

  useEffect(() => {
    const processPaymentAndAuth = async () => {
      const paymentKey = searchParams.get('paymentKey')
      const orderId = searchParams.get('orderId')
      const amount = searchParams.get('amount')

      if (!paymentKey || !orderId || !amount) {
        router.push('/checkout')
        return
      }

      setStatus('대표님만을 위한 전용 인지 보호 인프라를 구축하고 있습니다.')

      const email = localStorage.getItem('customerEmail') || `vvip_${Date.now()}@oneblank.com`
      const password = localStorage.getItem('customerPassword') || Math.random().toString(36).slice(-10) + 'Vv1!'
      const name = localStorage.getItem('customerName') || 'VVIP Client'

      try {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name }
          }
        })

        if (authError && !authError.message.includes('already registered')) {
          throw authError
        }

        let activeUserId = authData?.user?.id

        if (!activeUserId) {
          const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
            email,
            password
          })
          if (loginError) throw loginError
          activeUserId = loginData?.user?.id
        }

        if (!activeUserId) throw new Error('Auth alignment failed')

        setStatus('초개인화 알고리즘 엔진의 영점 조준을 시작합니다.')

        await supabase.from('profiles').upsert([
          { 
            id: activeUserId, 
            email: email, 
            full_name: name,
            hourly_wage: 100000,
            weekend_rest: true
          }
        ])

        let planType = 'CORE_MONTHLY'
        if (amount === '3900000') planType = 'CORE_ANNUAL'
        if (amount === '1500000') planType = 'PREMIUM'

        await supabase.from('subscriptions').insert([
          {
            user_id: activeUserId,
            plan_type: planType,
            status: 'ACTIVE',
            current_period_start: new Date().toISOString(),
            current_period_end: planType === 'CORE_ANNUAL' 
              ? new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()
              : new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString()
          }
        ])

        setStatus('보호 시스템이 정렬되었습니다. 온보딩 세션으로 진입합니다.')
        
        setTimeout(() => {
          router.push('/start')
        }, 1500)

      } catch (error) {
        setStatus('시스템 동기화 중 오류가 발생했습니다. 관리자에게 문의해 주십시오.')
      }
    }

    processPaymentAndAuth()
  }, [searchParams, router])

  return (
    <div className="text-center space-y-8 animate-in fade-in duration-1000">
      <div className="w-12 h-12 border-2 border-transparent border-t-[#C2A35D] rounded-full animate-spin mx-auto"></div>
      <h1 className="text-xl md:text-2xl font-light tracking-widest text-[#C2A35D] max-w-xl mx-auto break-keep leading-relaxed">{status}</h1>
      <p className="text-zinc-500 text-xs tracking-wider uppercase">창을 닫지 마십시오. 인프라 조율에 약 3초가 소요됩니다.</p>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <main className="flex-1 flex items-center justify-center min-h-screen bg-[#050505] text-white px-6">
      <Suspense fallback={<div className="text-[#C2A35D] text-xs tracking-widest uppercase">Connecting...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  )
}
