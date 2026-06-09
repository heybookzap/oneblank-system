'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

function SuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState('결제가 잘 되었는지 확인하고 있습니다.')

  useEffect(() => {
    const processPaymentAndAuth = async () => {
      const paymentKey = searchParams.get('paymentKey')
      const orderId = searchParams.get('orderId')
      const amount = searchParams.get('amount')

      if (!paymentKey || !orderId || !amount) {
        router.push('/checkout')
        return
      }

      setStatus('대표님을 위한 안전한 공간을 만들고 있습니다.')

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

        setStatus('대표님에게 딱 맞는 맞춤형 시스템을 준비하고 있습니다.')

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

        setStatus('모든 준비가 끝났습니다. 첫 시작 화면으로 이동합니다.')
        
        setTimeout(() => {
          router.push('/start')
        }, 1500)

      } catch (error) {
        setStatus('설정 중에 문제가 생겼습니다. 다시 시도하거나 고객센터로 연락해 주세요.')
      }
    }

    processPaymentAndAuth()
  }, [searchParams, router])

  return (
    <div className="text-center space-y-8 animate-in fade-in duration-1000">
      <div className="w-12 h-12 border-2 border-transparent border-t-[#C2A35D] rounded-full animate-spin mx-auto"></div>
      <h1 className="text-xl md:text-2xl font-light tracking-widest text-[#C2A35D] max-w-xl mx-auto break-keep leading-relaxed">{status}</h1>
      <p className="text-zinc-500 text-xs tracking-wider uppercase">창을 닫지 마세요. 준비하는 데 약 3초 정도 걸립니다.</p>
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
