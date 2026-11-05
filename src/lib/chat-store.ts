import type { UIMessage } from "ai";

export type ChatThread = { id: string; title: string; updatedAt: number; messages: UIMessage[] };

const KEY = "shloflow-chat-threads";

export function loadThreads(): ChatThread[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as ChatThread[]) : [];
    return Array.isArray(parsed) ? parsed.sort((a, b) => b.updatedAt - a.updatedAt) : [];
  } catch {
    return [];
  }
}

export function saveThreads(threads: ChatThread[]) {
  window.localStorage.setItem(KEY, JSON.stringify(threads));
}

export function createThread(): ChatThread {
  const thread: ChatThread = { id: crypto.randomUUID().slice(0, 12), title: "New chat", updatedAt: Date.now(), messages: [] };
  saveThreads([thread, ...loadThreads()]);
  return thread;
}

export function getThread(id: string): ChatThread | undefined {
  return loadThreads().find((t) => t.id === id);
}

export function upsertThreadMessages(id: string, messages: UIMessage[]) {
  const threads = loadThreads();
  const firstUser = messages.find((m) => m.role === "user");
  const firstText = firstUser?.parts.find((p) => p.type === "text");
  const title = firstText && "text" in firstText ? firstText.text.slice(0, 40) : "New chat";
  const existing = threads.find((t) => t.id === id);
  if (existing) {
    existing.messages = messages;
    existing.title = title;
    existing.updatedAt = Date.now();
  } else {
    threads.unshift({ id, title, updatedAt: Date.now(), messages });
  }
  saveThreads(threads);
}

export function deleteThread(id: string) {
  saveThreads(loadThreads().filter((t) => t.id !== id));
}
