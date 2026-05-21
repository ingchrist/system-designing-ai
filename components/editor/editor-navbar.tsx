'use client';

import { PanelLeftOpen, PanelLeftClose } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EditorNavbarProps {
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
}

export function EditorNavbar({ sidebarOpen, onSidebarToggle }: EditorNavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 h-14 bg-slate-950 border-b border-slate-800 z-40">
      {/* Left Section - Sidebar Toggle */}
      <div className="flex items-center justify-start h-full px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onSidebarToggle}
          className="text-slate-400 hover:text-slate-100"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? (
            <PanelLeftOpen className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Center Section - Reserved */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {/* Center content placeholder */}
      </div>

      {/* Right Section - Reserved */}
      <div className="absolute right-0 top-0 h-full flex items-center px-4">
        {/* Right content placeholder */}
      </div>
    </nav>
  );
}
