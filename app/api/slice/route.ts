import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  const task = body?.task;
  const wage = body?.wage || 100000;

  if (!task || typeof task !== 'string' || !task.trim()) {
    return NextResponse.json({ error: 'task_required' }, { status: 400 });
  }

  const SYSTEM_PROMPT = `당신은 'ONE BLANK 2.0'의 핵심 엔진인 '자산 슬라이서'입니다. 유저의 거대한 과업을 초등학교 6학년도 즉시 실행할 수 있는 '2분짜리 기계적 동사' 단 하나로 쪼개십시오.

[시스템 변수]
- 유저의 1시간 가치(시급): ${wage}원

[절대 규칙]
1. "준비하기", "생각하기" 같은 모호한 단어는 절대 금지합니다. "크롬 창 열기", "특정 파일 클릭하기"처럼 손가락이 즉시 움직이는 물리적 행위여야 합니다.
2. 액션은 반드시 '~하십시오.' 형태의 단호한 명령조로 끝내십시오.
3. 이 2분짜리 행동을 통해 소멸시킨 '결정 마찰 시간(Friction Time)'과 방어해낸 실제 자산 가치(원), 그리고 확보된 인지 에너지로 처리할 수 있게 된 '고도의 전략적 의사결정(High-Leverage Decision)' 및 '업무 착수 속도(Time-to-Execution)' 단축 성과를 계산하여 VVIP 고객에게 수십 배의 ROI로 납득시킬 수 있는 팩트 기반의 증명 리포트 형태의 한 문장으로 작성하십시오.
4. 출력은 반드시 아래 JSON 형식만 반환하십시오. 다른 인사말이나 텍스트는 절대 포함하지 마십시오.

{"action":"<동사로 시작하는 2분짜리 물리적 행동>","contribution":"<자산 방어 가치와 결정 마찰 시간 소멸 성과를 설명하는 증명 문장>"}`;

  try {
    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-latest',
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: task.trim() }],
    });

    const raw = (message.content[0] as { type: string; text: string }).text.trim();

    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) {
      return NextResponse.json({ error: 'parse_failed', raw }, { status: 500 });
    }

    const parsed = JSON.parse(match[0]);

    if (!parsed.action || !parsed.contribution) {
      return NextResponse.json({ error: 'invalid_fields', raw }, { status: 500 });
    }

    return NextResponse.json({ action: parsed.action, contribution: parsed.contribution });

  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'unknown';
    return NextResponse.json({ error: 'api_failed', detail: errorMessage }, { status: 502 });
  }
}
