# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Implementation

## Current Goal

- None

## Completed

- 01-design-system.md (shadcn/ui setup & components, strict dark theme)
- Editor Navbar Component (`components/editor/editor-navbar.tsx`)
- Project Sidebar Component (`components/editor/project-sidebar.tsx`)
- Editor Chrome Integration (navbar + sidebar in root layout) — 02-editor-chrome.md is fully completed
- 03-auth.md — Clerk integration: ClerkProvider (dark theme, CSS-var overrides), sign-in/sign-up pages (two-panel layout), middleware route protection, UserButton in navbar, auth-aware root redirect

## In Progress

- None.

## Next Up

- Add the next planned feature unit here.

## Open Questions

- Add unresolved product or implementation questions here.

## Architecture Decisions

- Add decisions that affect the system design or data model.

## Session Notes

- Clerk appearance uses `theme: dark` (from `@clerk/ui/themes`), not `baseTheme` — the type lives in `@clerk/ui/dist/internal/appearance.d.ts`.
- `lib/utils.ts` was missing and was created (required by shadcn components).
- Fonts switched from `next/font/google` (blocked in sandbox) to the `geist` npm package — use `GeistSans`/`GeistMono` from `geist/font/sans` and `geist/font/mono`.
- Editor chrome (navbar + sidebar) moved from root layout into `app/(editor)/layout.tsx` route group so auth pages render without it.
- `.env.local` contains placeholder Clerk keys — replace with real keys from dashboard.clerk.com before running dev.
