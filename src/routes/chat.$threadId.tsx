import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, MessageCircle, Plus, Trash2 } from "lucide-react";

import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputFooter, PromptInputSubmit, PromptInputTextarea } from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { createThread, deleteThread, getThread, loadThreads, upsertThreadMessages, type ChatThread } from "@/lib/chat-store";
import botLogo from "@/assets/shlo-bot.png";

const WHATSAPP = "https://wa.me/919171138891";

export const Route = createFileRoute("/chat/$threadId")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Chat with Shlo — SHLOFLOW AI Assistant" },
      { name: "description", content: "Ask SHLOFLOW AI's assistant about AI websites, chatbots, automations and prices in ₹." },
      { property: "og:title", content: "Chat with Shlo — SHLOFLOW AI Assistant" },
      { property: "og:description", content: "Instant answers about SHLOFLOW AI services and prices." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ChatPage,
});

const SUGGESTIONS = ["How much is a business website?", "What's in the Professional plan?", "Can you build me an AI chatbot?", "Compare your plans"];

function ChatPage() {
  const { threadId } = Route.useParams();
  const navigate = useNavigate();
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [initial, setInitial] = useState<UIMessage[] | null>(null);

  useEffect(() => {
    setThreads(loadThreads());
    setInitial(getThread(threadId)?.messages ?? []);
  }, [threadId]);

  const refresh = useCallback(() => setThreads(loadThreads()), []);

  const newChat = () => {
    const t = createThread();
    navigate({ to: "/chat/$threadId", params: { threadId: t.id } });
  };

  const remove = (id: string) => {
    deleteThread(id);
    refresh();
    if (id === threadId) navigate({ to: "/chat" });
  };

  return (
    <div className="flex h-dvh bg-background text-foreground">
      <aside className="hidden w-72 shrink-0 flex-col border-r bg-surface/40 p-4 md:flex">
        <Link to="/" className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to website
        </Link>
        <button onClick={newChat} className="btn-glow mb-4 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium">
          <Plus className="h-4 w-4" /> New chat
        </button>
        <div className="flex-1 space-y-1 overflow-y-auto">
          {threads.map((t) => (
            <div key={t.id} className={`group flex items-center rounded-lg ${t.id === threadId ? "bg-secondary" : "hover:bg-secondary/60"}`}>
              <Link to="/chat/$threadId" params={{ threadId: t.id }} className="flex-1 truncate px-3 py-2 text-sm">
                {t.title}
              </Link>
              <button onClick={() => remove(t.id)} aria-label="Delete chat" className="p-2 text-muted-foreground opacity-0 transition group-hover:opacity-100 hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <a href={WHATSAPP} target="_blank" rel="noreferrer" className="glass mt-4 flex items-center gap-2 rounded-xl p-3 text-sm">
          <MessageCircle className="h-4 w-4 text-neon" /> Talk to Shlok on WhatsApp
        </a>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b px-4 py-3">
          <Link to="/" aria-label="Back to website" className="md:hidden"><ArrowLeft className="h-5 w-5" /></Link>
          <img src={botLogo} alt="Shlo" width={36} height={36} className="h-9 w-9 rounded-xl bg-secondary p-1" />
          <div className="min-w-0 flex-1">
            <p className="font-display font-semibold leading-tight">Shlo</p>
            <p className="text-xs text-muted-foreground">SHLOFLOW AI assistant · replies instantly</p>
          </div>
          <button onClick={newChat} aria-label="New chat" className="rounded-lg border p-2 md:hidden"><Plus className="h-4 w-4" /></button>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-secondary">
            <MessageCircle className="h-4 w-4 text-neon" /> WhatsApp
          </a>
        </header>
        {initial && <ChatWindow key={threadId} threadId={threadId} initial={initial} onSaved={refresh} />}
      </main>
    </div>
  );
}

function ChatWindow({ threadId, initial, onSaved }: { threadId: string; initial: UIMessage[]; onSaved: () => void }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { messages, sendMessage, status, stop } = useChat({
    id: threadId,
    messages: initial,
    transport: new DefaultChatTransport({ api: "/api/chat", body: { threadId } }),
    onError: (e) => setError(e.message || "Something went wrong. Please try again."),
  });
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (status === "ready" && messages.length > 0) {
      upsertThreadMessages(threadId, messages);
      onSaved();
    }
    if (!busy) textareaRef.current?.focus();
  }, [status, messages, threadId, onSaved, busy]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    setError(null);
    sendMessage({ text: t });
    upsertThreadMessages(threadId, [...messages, { id: "pending", role: "user", parts: [{ type: "text", text: t }] }]);
    onSaved();
    setInput("");
  };

  return (
    <>
      <Conversation className="flex-1">
        <ConversationContent className="mx-auto w-full max-w-3xl">
          {messages.length === 0 && (
            <div className="flex flex-col items-center py-16 text-center">
              <img src={botLogo} alt="" width={80} height={80} className="h-20 w-20 animate-float" />
              <h1 className="mt-6 text-3xl font-semibold">Hi, I'm <span className="text-gradient">Shlo</span></h1>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">Ask me about our websites, AI chatbots, automations and prices. For a custom quote, I'll connect you with Shlok on WhatsApp.</p>
              <div className="mt-8 grid w-full max-w-lg gap-2 sm:grid-cols-2">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)} className="glass card-lift rounded-xl px-4 py-3 text-left text-sm">{s}</button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m) => (
            <Message key={m.id} from={m.role}>
              <MessageContent className={m.role === "user" ? "bg-primary text-primary-foreground" : "bg-transparent"}>
                {m.parts.map((p, i) => (p.type === "text" ? <MessageResponse key={i}>{p.text}</MessageResponse> : null))}
              </MessageContent>
            </Message>
          ))}
          {status === "submitted" && <Shimmer className="text-sm">Shlo is thinking...</Shimmer>}
          {error && (
            <div className="rounded-xl border border-destructive/40 p-3 text-sm">
              {error}{" "}
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="text-neon underline">Message us on WhatsApp</a>
            </div>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <div className="mx-auto w-full max-w-3xl px-4 pb-4">
        <PromptInput onSubmit={(msg) => send(msg.text ?? "")}>
          <PromptInputTextarea ref={textareaRef} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about services, prices, plans..." autoFocus />
          <PromptInputFooter className="justify-end">
            <PromptInputSubmit status={status} onStop={stop} disabled={!busy && !input.trim()} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </>
  );
}
