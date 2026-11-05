<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Website chatbot: streaming endpoint at /api/chat (server-only prompt + business facts in src/lib/ai/chat.server.ts); threads live in visitor localStorage with one page per thread at /chat/$threadId. Why: visitors chose per-device history, no login.
