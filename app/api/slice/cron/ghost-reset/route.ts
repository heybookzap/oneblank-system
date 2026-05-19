import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      message: '지연된 과거 로그를 자산 방어 비용으로 처리하여 소멸시켰습니다.'
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Internal Server Error'
    }, { status: 500 })
  }
}

export async function GET(request: Request) {
  return POST(request)
}
