// lib/openai.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function findMatchingAgent(input: string, agents: any[]) {
  const agentList = agents.map(a => ({
    id: a.id,
    name: a.name,
    abbreviation: a.abbreviation
  }));

  const prompt = `
    以下のエージェントリストから、ユーザー入力「${input}」に最も合致するエージェントを選んでください。
    略称や部分一致も考慮してください。
    
    エージェントリスト:
    ${JSON.stringify(agentList, null, 2)}
    
    最も合致するエージェントのIDを返してください。IDのみを返し、他の文字は含めないでください。
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",  // ← ここを変更
      messages: [
        {
          role: "system",
          content: "あなたはエージェント名をマッチングするアシスタントです。"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.1,
    });

    return response.choices[0].message.content?.trim() || null;
  } catch (error) {
    console.error('OpenAI API error:', error);
    return null;
  }
}
