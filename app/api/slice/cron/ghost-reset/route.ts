import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      message: '지나간 어제의 일이나 미룬 일들은 모두 깨끗하게 지웠습니다.'
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
