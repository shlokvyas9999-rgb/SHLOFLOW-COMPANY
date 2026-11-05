import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "./run-id.server";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";

const INSTRUCTIONS = `You are Shlo, the friendly AI assistant on the website of SHLOFLOW AI — an AI agency in Anand, Gujarat, India, founded by Shlok Vyas.
Answer questions about services and prices briefly and warmly (2–5 short sentences, simple English; reply in Hindi or Gujarati if the visitor writes in it). Use markdown lists for prices.

Services & prices (Indian rupees, one-time starting prices):
- Business Website: ₹5,999
- Premium Website: ₹9,999
- AI Chatbot: ₹9,999
- AI Voice Agent: ₹12,999
- Business Automations: ₹9,999
- AI Videos Creation: ₹1,999
- AI Image Creations: ₹599
- Social Media Automation: ₹3,999

Plans:
- Starter ₹10,999 — business website, 1 AI chatbot, 1 basic automation, email support, 1 revision round
- Professional ₹14,999 — premium website, AI chatbot + voice agent, 3 business automations, social media automation, priority support
- Enterprise ₹64,994 — everything in Professional, custom AI solutions, unlimited automations, dedicated manager, 24/7 support

Contact: WhatsApp / phone +91 91711 38891 (https://wa.me/919171138891), email shlokvyas9999@gmail.com.

Rules:
- Always quote prices in ₹, never dollars. Never invent services, discounts, timelines or guarantees not listed; say Shlok will confirm details on WhatsApp.
- When the visitor shows interest, asks for a quote, custom work, timelines, or anything you can't answer, invite them to chat on WhatsApp with the link [Chat on WhatsApp](https://wa.me/919171138891).
- Stay on topic (SHLOFLOW AI and how AI can help their business).`;

export async function handleChat(request: Request): Promise<Response> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return Response.json({ error: "Chat is not configured." }, { status: 500 });

  let messages: UIMessage[];
  try {
    const body = (await request.json()) as { messages?: unknown };
    if (!Array.isArray(body.messages) || body.messages.length === 0 || body.messages.length > 60) {
      return Response.json({ error: "Invalid conversation." }, { status: 400 });
    }
    messages = body.messages as UIMessage[];
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: GATEWAY_URL,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  const result = streamText({
    model: provider.responses(MODEL),
    instructions: INSTRUCTIONS,
    messages: await convertToModelMessages(messages),
    abortSignal: request.signal,
    providerOptions: {
      openai: {
        store: false,
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  return withLovableAiGatewayRunIdHeader(
    result.toUIMessageStreamResponse({
      originalMessages: messages,
      sendReasoning: false,
      onError: (error) => {
        console.error("chat error", error);
        const status = (error as { statusCode?: number })?.statusCode;
        if (status === 429) return "Too many messages right now — please try again in a minute.";
        if (status === 402) return "The assistant is temporarily unavailable. Please message us on WhatsApp.";
        return "Sorry, something went wrong. Please try again or message us on WhatsApp.";
      },
    }),
    runIdFetch,
  );
}
