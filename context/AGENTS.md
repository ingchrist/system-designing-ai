<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Application Building Context

Read the following files in order before implementing or making any architectural decision:

1. `context/project-overview.md` — product definition, goals, features, and scope
2. `context/architecture-context.md` — system structure, boundaries, storage model, and invariants
3. `context/ui-context.md` — theme, colors, typography, canvas design, and component conventions
4. `context/code-standards.md` — implementation rules and conventions
5. `context/ai-workflow-rules.md` — development workflow, scoping rules, and delivery approach
6. `context/progress-tracker.md` — current phase, completed work, open questions, and next steps

Update `context/progress-tracker.md` after each meaningful implementation change.

If implementation changes the architecture, scope, or standards documented in the context files, update the relevant file before continuing.

## JSDoc Documentation Standards (CodeRabbit Compliance)

You are a senior Next.js/TypeScript developer. Every time you implement, modify, or create any code in this project, you **must** write JSDoc comments for all documentable symbols. This is non-negotiable — the CI check requires a minimum of **80% docstring coverage** enforced by CodeRabbit.

### What must always have a JSDoc block (`/** ... */`):

- Every React component (including default and named exports)
- Every component's Props interface or type
- Every custom hook (`use*` functions)
- Every utility/helper function in `lib/` or `utils/`
- Every API route handler in `app/api/` or `pages/api/`
- Every Next.js special function: `getServerSideProps`, `getStaticProps`, `getStaticPaths`, `generateMetadata`, `middleware`
- Every TypeScript interface, type alias, and enum
- Every class and its methods

### JSDoc format to follow:

**React Component:**
```typescript
/**
 * Displays the main sidebar navigation with collapsible sections.
 *
 * @returns {JSX.Element} The rendered sidebar component.
 */
export function Sidebar({ isOpen, onClose }: SidebarProps): JSX.Element {}
```

**Component Props Interface:**
```typescript
/**
 * Props for the Sidebar component.
 */
export interface SidebarProps {
  /** Whether the sidebar is currently open. */
  isOpen: boolean;
  /** Callback fired when the sidebar is closed. */
  onClose: () => void;
}
```

**Custom Hook:**
```typescript
/**
 * Manages sidebar open/close state and handles the Escape key to close it.
 *
 * @param {boolean} initialState - The initial open/closed state of the sidebar.
 * @returns {{ isOpen: boolean, open: () => void, close: () => void }} Sidebar state and controls.
 */
export function useSidebar(initialState: boolean) {}
```

**API Route Handler:**
```typescript
/**
 * Handles POST requests to create a new AI chat session.
 *
 * @param {Request} request - The incoming HTTP request containing the session payload.
 * @returns {Promise<NextResponse>} JSON response with the created session or an error message.
 */
export async function POST(request: Request): Promise<NextResponse> {}
```

**Utility Function:**
```typescript
/**
 * Formats a Unix timestamp into a human-readable relative time string (e.g. "2 hours ago").
 *
 * @param {number} timestamp - The Unix timestamp in milliseconds.
 * @returns {string} A formatted relative time string.
 */
export function formatRelativeTime(timestamp: number): string {}
```

**Interface / Type:**
```typescript
/**
 * Represents the configuration options for the Ghost AI agent.
 *
 * @interface AgentConfig
 */
export interface AgentConfig {
  /** The display name of the agent. */
  name: string;
  /** The AI model identifier to use for this agent. */
  model: string;
  /** Maximum number of tokens allowed per response. */
  maxTokens: number;
}
```

### Rules you must never break:

1. **Never write a function, component, hook, or API route without a JSDoc block above it.**
2. **Never use single-line `//` comments as a substitute** — they do not count toward coverage.
3. **Never write vague placeholders** like `/** Component */`, `/** Hook */`, or `/** TODO */`.
4. **Always document props inline** using `/** description */` above each property in interfaces.
5. **When editing an existing function**, check if it has a JSDoc block — if not, add one as part of your change.
6. **After implementing any feature**, do a self-check: scan all files you touched and confirm every exported symbol has a `/** ... */` block.

### What to skip (do not waste time documenting these):

- `node_modules/`
- `.next/`
- `*.test.ts`, `*.test.tsx`, `*.spec.ts`, `*.spec.tsx`
- `next.config.ts`, `tailwind.config.*`, `eslint.config.*`, `postcss.config.*`
- `vitest.config.ts`, `tsconfig.json`

### Self-check before finishing any task:

Before considering any task done, mentally run through this checklist:
- [ ] Every new function I wrote has a `/** ... */` JSDoc block
- [ ] Every new component I wrote has a JSDoc block describing what it renders
- [ ] Every new hook I wrote has a JSDoc block with `@param` and `@returns`
- [ ] Every new interface/type I wrote has a JSDoc block with inline property comments
- [ ] I did not leave any exported symbol undocumented

