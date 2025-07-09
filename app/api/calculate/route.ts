import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { findMatchingAgent } from '@/lib/openai';
import { calculateFee } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { agent_input, annual_salary } = body;

    // すべてのエージェントを取得
    const { data: agents, error } = await supabase
      .from('agents')
      .select('*');

    if (error || !agents) {
      throw new Error('エージェントの取得に失敗しました');
    }

    // AIでマッチング
    const matchedAgentId = await findMatchingAgent(agent_input, agents);
    
    if (!matchedAgentId) {
      return NextResponse.json(
        { error: 'マッチするエージェントが見つかりませんでした' },
        { status: 404 }
      );
    }

    const matchedAgent = agents.find(a => a.id === matchedAgentId);
    
    if (!matchedAgent) {
      return NextResponse.json(
        { error: 'エージェントが見つかりませんでした' },
        { status: 404 }
      );
    }

    // Fee計算
    const feeAmount = calculateFee(annual_salary, matchedAgent.fee_rate);

    return NextResponse.json({
      agent_name: matchedAgent.name,
      fee_rate: matchedAgent.fee_rate,
      annual_salary,
      fee_amount: feeAmount,
    });
  } catch (error) {
    console.error('Calculation error:', error);
    return NextResponse.json(
      { error: '計算中にエラーが発生しました' },
      { status: 500 }
    );
  }
}
