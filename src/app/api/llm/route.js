import OpenAI from "openai";

// Configurar chave da OpenAI com variável de ambiente
const openai = new OpenAI({
  apiKey: process.env.KEY_API_GPT  
});

export async function POST(req) {
  try {
    const params = await req.json();
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Você é amigável e experiente em tecnologia, responda às perguntas com clareza e contexto.",
        },
        {
          role: "user",
          content: params.prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1024,
    });

    return new Response(
      JSON.stringify({
        result: response?.choices[0]?.message?.content || "Nenhuma resposta encontrada.",
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erro ao acessar OpenAI:", error);

    return new Response(
      JSON.stringify({
        result: `Erro ao processar sua solicitação :${error} `,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
}
