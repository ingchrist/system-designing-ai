import React from 'react';

/**
 * Editor page — the main canvas workspace.
 *
 * Protected by Clerk middleware; unauthenticated users are redirected to /sign-in.
 *
 * @returns The canvas workspace placeholder element.
 */
export default function EditorPage(): React.ReactElement {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-text-muted">canvas workspace</div>
    </div>
  );
}
