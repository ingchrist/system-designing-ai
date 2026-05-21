'use client';

import React from 'react';
import { PanelLeftOpen, PanelLeftClose } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

/**
 * Props for the EditorNavbar component.
 */
interface EditorNavbarProps {
  /** Whether the project sidebar is currently open. */
  sidebarOpen: boolean;
  /** Callback invoked when the sidebar toggle button is clicked. */
  onSidebarToggle: () => void;
}

/**
 * Top-fixed editor navigation bar.
 *
 * Contains:
 * - Left: sidebar toggle button.
 * - Center: reserved for future breadcrumb / project title.
 * - Right: Clerk `UserButton` for profile settings and sign-out.
 *
 * @param {EditorNavbarProps} props - Navbar props.
 * @returns The rendered navigation bar.
 */
export function EditorNavbar({ sidebarOpen, onSidebarToggle }: EditorNavbarProps): React.ReactElement {
  return (
    <nav className="fixed top-0 left-0 right-0 h-14 bg-bg-surface border-b border-border-default z-50">
      {/* Left Section — Sidebar Toggle */}
      <div className="flex items-center justify-start h-full px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onSidebarToggle}
          className="text-text-secondary hover:text-text-primary"
          aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          aria-pressed={sidebarOpen}
        >
          {sidebarOpen ? (
            <PanelLeftClose className="h-5 w-5" />
          ) : (
            <PanelLeftOpen className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Center Section — Reserved */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Project title / breadcrumb placeholder */}
      </div>

      {/* Right Section — User Menu */}
      <div className="absolute right-0 top-0 h-full flex items-center px-4">
        <UserButton
          appearance={{
            elements: {
              avatarBox: 'h-8 w-8',
            },
          }}
        />
      </div>
    </nav>
  );
}
