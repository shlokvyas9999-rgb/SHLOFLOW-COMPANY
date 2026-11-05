import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { createThread, loadThreads } from "@/lib/chat-store";

export const Route = createFileRoute("/chat/")({
  head: () => ({
    meta: [
      { title: "Chat with Shlo — SHLOFLOW AI Assistant" },
      { name: "description", content: "Ask SHLOFLOW AI's assistant about AI websites, chatbots, automations and prices in ₹." },
      { property: "og:title", content: "Chat with Shlo — SHLOFLOW AI Assistant" },
      { property: "og:description", content: "Instant answers about SHLOFLOW AI services and prices." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ChatIndex,
});

function ChatIndex() {
  const navigate = useNavigate();
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    done.current = true;
    const empty = loadThreads().find((t) => t.messages.length === 0);
    const thread = empty ?? createThread();
    navigate({ to: "/chat/$threadId", params: { threadId: thread.id }, replace: true });
  }, [navigate]);
  return <div className="min-h-screen bg-background" />;
}
