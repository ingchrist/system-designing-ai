import { SignIn } from '@clerk/nextjs';

/**
 * Sign-in page using Clerk's hosted `<SignIn />` component.
 *
 * Layout:
 * - Large screens: two-panel — brand panel on the left, Clerk form centered on the right.
 * - Small screens: Clerk form only, centered vertically and horizontally.
 *
 * All colors reference CSS custom properties — no hardcoded values.
 *
 * @returns {JSX.Element} The sign-in page.
 */
export default function SignInPage(): React.ReactElement {
  return (
    <div className="min-h-screen flex bg-bg-base">
      {/* Left brand panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[540px] flex-col justify-center px-16 border-r border-border-default shrink-0">
        <BrandPanel />
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <SignIn />
      </div>
    </div>
  );
}

/**
 * Left-panel brand content shown on large screens.
 *
 * Renders the product logo, a short tagline, and a brief feature list.
 * Intentionally minimal — no hero images, gradients, or cards.
 *
 * @returns {JSX.Element} The brand panel content.
 */
function BrandPanel(): React.ReactElement {
  return (
    <div className="max-w-sm">
      {/* Logo */}
      <div className="mb-8">
        <span className="text-2xl font-semibold tracking-tight text-text-primary">
          ghost<span className="text-accent-primary">AI</span>
        </span>
      </div>

      {/* Tagline */}
      <p className="text-lg font-medium text-text-primary mb-2">
        Design systems, faster.
      </p>
      <p className="text-sm text-text-muted mb-10 leading-relaxed">
        An AI-powered workspace for collaborative system architecture.
      </p>

      {/* Feature list */}
      <ul className="space-y-3 text-sm text-text-secondary">
        <li>AI-assisted diagram generation</li>
        <li>Real-time multiplayer canvas</li>
        <li>Automated technical spec export</li>
        <li>Starter templates for common patterns</li>
      </ul>
    </div>
  );
}
