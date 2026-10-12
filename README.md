# Сendas Test Task

## Video

https://drive.google.com/file/d/1YZL9GSsdG7fnQcFuGwlAO3fNhg3AQZok/view?usp=sharing

## Tech stack

| Category           | Technologies                                     |
| ------------------ | ------------------------------------------------ |
| UI                 | React 19, TypeScript 6, React Router 7           |
| Build              | Vite 8                                           |
| Styling            | Tailwind CSS 4                                   |
| Local DB           | RxDB 17 (`localstorage` storage, Ajv validation) |
| State              | Zustand 5                                        |
| Forms & Validation | React Hook Form, Zod 4                           |
| Icons              | lucide-react                                     |
| Tests / lint       | Vitest 5, ESLint 10 (typescript-eslint)          |

## Requirements

- **Node.js 20.19+ or 22.12+** (required by Vite 8; Node 22 LTS or newer recommended)
- **npm** (the repo uses `package-lock.json`)

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (HMR)
npm run dev
```

Then open the printed URL (by default http://localhost:5173/).

## Available scripts

| Script            | What it does                                                       |
| ----------------- | ------------------------------------------------------------------ |
| `npm run dev`     | Start the Vite dev server with HMR                                 |
| `npm run build`   | Type-check (`tsc -b`) and build the production bundle into `dist/` |
| `npm run preview` | Serve the built `dist/` locally to verify the production build     |
| `npm run lint`    | Run ESLint over the repository                                     |
| `npm run test`    | Run the Vitest suite once (Node environment)                       |

## Project structure

```
src/
├── components/  # Shared UI and layouts
├── db/          # Database, schemas, repositories
├── features/    # Application features
├── errors/      # Application errors
├── utils/       # Utilities
├── App.tsx
└── main.tsx
```

The layering convention is: **component → service → repository → RxDB**. Components never touch the
database directly; services parse input with Zod and repositories own the queries.

## PWA

The application is built as a Progressive Web App (PWA) using `vite-plugin-pwa`.
It supports installation and uses a service worker to cache assets for offline access.

To verify offline mode:

1. `npm run build && npm run preview`
2. Open the preview URL online once — the service worker installs and caches the assets.
3. Go **Offline** in DevTools (Network tab), then do a normal reload.

The service worker is not registered under `npm run dev`, so offline mode can only be checked on the
preview build.

## Features

- **Name-only sign-in** — no password; a name is normalized (trimmed, lowercased) and reused if it
  already exists.
- **Floor plan viewer** — pan, zoom (0.5×–8×), and click anywhere on the plan to place a new task
  marker.
- **Tasks with checklists** — create tasks with a title, marker position, and 1–100 steps.
- **Step statuses** — `not started`, `in progress`, `blocked`, `awaiting final check`, `done`; the
  task status is derived from its steps.
- **Task sidebar** — collapsible list of your tasks, each linked to its marker.
- **Offline-ready PWA** — installable, with an auto-updating service worker.
- **Local persistence** — RxDB stored in `localStorage`; your session is kept in a persisted Zustand
  store.

## How to use

1. **Sign in** — enter a name on the login screen and press **Continue**. Signing in again with the same name resumes the same account.
2. **Place a task** — on the plan, click the location you want to mark. A draft marker appears and the creation panel opens.
3. **Fill in the task** — enter a title. The checklist is pre-filled with three default steps (`Initial assessment`, `Installation`, `Final inspection`); edit them, add or remove steps, then submit to save.
4. **Manage tasks** — clicking a marker on the plan opens the sidebar and expands that task; clicking a task in the sidebar expands or collapses its checklist.
5. **Update progress** — edit a task's title, add/remove steps, and change step statuses from the checklist.

## Data storage

Everything lives in the browser; there is no server or external database.

- RxDB database name: persisted in `localStorage`.
- Session: Zustand store persisted under the `auth-storage` key.
- Every task is scoped to its owner's name, so two names on the same browser keep separate tasks.
- Ajv schema validation runs in **development only**: the dev build wraps the storage in `wrappedValidateAjvStorage`

To wipe all local data, clear site data for the dev origin (`http://localhost:5173`) in your
browser's DevTools → Application → Storage. Note that `localStorage` is per-origin, so data created
on one port/host is not visible on another.

## Time spent (approximate)

| Feature                                                          | Approx. time |
| ---------------------------------------------------------------- | ------------ |
| Project setup (Vite + React + TS, Tailwind, ESLint)              | ~1 h         |
| RxDB integration and repository layer                            | ~3 h         |
| Name-only sign-in (login form, auth store, guards, session)      | ~2.5 h       |
| App shell (layouts, header, loading/error screens, theme tokens) | ~1 h         |
| Tests (Vitest setup + auth service tests)                        | ~1.5 h       |
| Offline-ready PWA (manifest + service worker)                    | ~0.5 h       |
| Floor plan viewer (pan/zoom, ZoomControls)                       | ~1 h         |
| Task data layer (schema, types, CRUD for tasks and steps)        | ~5.5 h       |
| Task sidebar (collapsible, live task list)                       | ~2 h         |
| Task creation panel and marker placement                         | ~3 h         |
| Step management (add, edit, delete steps, statuses)              | ~4 h         |
| UI polish and bug fixes                                          | ~1 h         |
| **Total**                                                        | **~26 h**    |

## What I would improve with more time

If I had more time, I would focus on the following refactoring and improvements.

### Features and UX

- **Task management** — add the ability to move and delete existing markers.
- **Task filtering** — introduce search, status filters, and grouping in the sidebar.
- **Task progress** — improve status calculation and display checklist progress on markers and in the sidebar.
- **Task and checklist editing** — improve the editing UI for a better user experience and refactor the update API to make partial updates more flexible and easier to extend.
- **Name normalization** — sign-in only trims and lowercases the name, so visually identical names with different Unicode composition end up as separate accounts; add `normalize("NFC")` in the sign-in schema.

### Accessibility

- **Keyboard-only task creation** — placing a marker requires a mouse click on the plan; add a keyboard path to choose a position and open the creation panel.
- **Tab order of collapsed tasks** — collapsing a task hides its checklist visually only (`grid-rows-[0fr]` + `overflow-hidden`); the buttons stay in the DOM, so Tab moves focus onto controls the user cannot see.

### Tests

- **Service and unit tests** — expand test coverage for task operations, validation, and status calculation.
