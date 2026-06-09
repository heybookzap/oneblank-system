import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ONE BLANK',
  description: '머릿속 걱정을 비우고 바로 행동하게 돕는 공간',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="bg-[#050505] text-white">{children}</body>
    </html>
  )
}
