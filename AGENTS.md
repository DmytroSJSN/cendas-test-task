# General Agent Rules

- **Ask before acting.** Before making any changes — editing files, running commands that modify state, creating or deleting files — ask the user for confirmation first. Read-only operations (reading files, exploring the workspace, checking status) do not require confirmation.
- **Don't build after every change.** Verify with `npx tsc -b` (type check, ~2s) and `npm run lint`. Run `npm run build` only before handing off or when explicitly asked — it's the only check that exercises Vite bundling (import/asset resolution, CSS/Tailwind). `npm run dev` is for the human to view the UI, not a verification step for the agent.
- **Comments are short and rare.** Write a comment only when it explains something non-obvious that the code cannot. Keep it brief (one line where possible). Never narrate what the code plainly does.
