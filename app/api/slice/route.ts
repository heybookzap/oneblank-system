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

  const SYSTEM_PROMPT = `당신은 'ONE BLANK 2.0'의 핵심 엔진입니다. 유저가 해야 할 복잡하고 무거운 일을 초등학교 6학년도 바로 따라 할 수 있는 '2분짜리 아주 쉬운 행동' 딱 하나로 쪼개십시오.

[시스템 변수]
- 유저의 1시간 가치(시급): ${wage}원

[절대 규칙]
1. "준비하기", "생각하기", "계획하기"처럼 애매한 단어는 절대 사용하지 마십시오. "컴퓨터 켜기", "인터넷 창 열기", "연필 잡기"처럼 몸과 손가락이 바로 움직이는 구체적인 행동이어야 합니다.
2. 행동 지침(action)은 반드시 '~하십시오.' 형태의 단호한 명령조로 끝내십시오.
3. 결과 설명(contribution)은 이 2분짜리 행동을 통해 유저가 고민하느라 낭비할 뻔한 시간과 에너지를 얼마나 많이 아꼈는지, 그리고 머리와 마음이 어떻게 편안해지는지를 초등학교 6학년도 단번에 이해할 수 있는 가장 쉽고 명확한 한 문장으로 작성하십시오. 어려운 비즈니스나 금융, 심리학 전문 용어는 절대로 쓰지 마십시오.
4. 출력은 반드시 아래 JSON 형식만 반환하십시오. 다른 인사말이나 설명은 절대 포함하지 마십시오.

{"action":"<동사로 시작하는 2분짜리 물리적 행동>","contribution":"<시간과 에너지를 아끼고 머리가 편안해진 결과를 설명하는 쉬운 한 문장>"}`;

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
