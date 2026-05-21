import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';

/**
 * Root layout metadata — sets the document title and description.
 */
export const metadata = {
  title: 'System Designing AI',
  description: 'AI-powered system design workspace',
};

/**
 * Props for the RootLayout component.
 */
interface RootLayoutProps {
  /** Page content rendered inside the layout shell. */
  children: React.ReactNode;
}

/**
 * Root layout for the entire application.
 *
 * Wraps every page with `ClerkProvider` using Clerk's dark base theme and
 * CSS-variable overrides that map to the project's design tokens — no
 * hardcoded color values.
 *
 * Auth pages (`/sign-in`, `/sign-up`) render without editor chrome.
 * The editor chrome lives in the `(editor)` route group layout.
 *
 * @param {RootLayoutProps} props - Layout props containing child page content.
 * @returns The root HTML document with Clerk auth context.
 */
export default function RootLayout({ children }: RootLayoutProps): React.ReactElement {
  return (
    <ClerkProvider
      appearance={{
        theme: dark,
        variables: {
          colorBackground: 'var(--bg-surface)',
          colorPrimary: 'var(--accent-primary)',
          colorDanger: 'var(--state-error)',
          colorNeutral: 'var(--text-muted)',
          borderRadius: '0.75rem',
          fontFamily: 'var(--font-geist-sans)',
        },
      }}
    >
      <html
        lang="en"
        className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full bg-bg-base text-text-primary antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
