'use client';

import { X, Plus } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  // Handle Escape key to close sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);
  return (
    <>
      {/* Overlay backdrop - only visible when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="sidebar-projects-title"
        className={`fixed left-0 top-0 bottom-0 w-80 bg-bg-surface border-r border-border-default z-40 transform transition-transform duration-300 ease-in-out pt-14 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!isOpen}
        tabIndex={-1}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-border-default">
            <h2 id="sidebar-projects-title" className="text-lg font-semibold text-text-primary">
              Projects
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Tabs Section */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <Tabs defaultValue="my-projects" className="flex flex-col h-full px-4 pt-4">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="my-projects">My Projects</TabsTrigger>
                <TabsTrigger value="shared">Shared</TabsTrigger>
              </TabsList>

              {/* My Projects Tab */}
              <TabsContent value="my-projects" className="flex-1 flex flex-col">
                <div className="flex-1 flex items-center justify-center text-center">
                  <div>
                    <p className="text-text-muted text-sm">No projects yet</p>
                  </div>
                </div>
              </TabsContent>

              {/* Shared Tab */}
              <TabsContent value="shared" className="flex-1 flex flex-col">
                <div className="flex-1 flex items-center justify-center text-center">
                  <div>
                    <p className="text-text-muted text-sm">No shared projects</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Footer - New Project Button */}
          <div className="px-4 py-4 border-t border-border-default">
            <Button
              className="w-full gap-2 bg-accent-primary hover:bg-accent-primary/90 text-black font-medium"
              onClick={() => {
                // TODO: Open new project dialog
                // This will be connected to the project creation flow in a future iteration
                console.log('New Project clicked - awaiting dialog implementation');
              }}
              aria-label="Create a new project"
            >
              <Plus className="h-5 w-5" />
              New Project
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
