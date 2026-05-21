'use client';

import { useState } from 'react';
import { EditorNavbar } from '@/components/editor/editor-navbar';
import { ProjectSidebar } from '@/components/editor/project-sidebar';

/**
 * Props for EditorLayout.
 */
interface EditorLayoutProps {
  /** Page content rendered in the editor workspace area. */
  children: React.ReactNode;
}

/**
 * Layout for all editor routes.
 *
 * Renders the fixed top navbar and slide-over project sidebar, then places
 * page content below the navbar via a `pt-14` offset.
 *
 * This is a Client Component because it owns the `sidebarOpen` toggle state
 * that must be shared between the navbar toggle button and the sidebar panel.
 *
 * @param {EditorLayoutProps} props - Layout props.
 * @returns {JSX.Element} The editor chrome wrapping the active page.
 */
export default function EditorLayout({ children }: EditorLayoutProps): React.ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <EditorNavbar
        sidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen((prev) => !prev)}
      />
      <ProjectSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="flex-1 pt-14">{children}</main>
    </>
  );
}
