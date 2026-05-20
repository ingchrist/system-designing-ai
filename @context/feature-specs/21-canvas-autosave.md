Add autosave and loading for the collaborative canvas so project state is persisted before adding AI generation Canvas JSON should be stored in Vercel Blob, and the saved blob URL should be stored on the Prisma project record.

## What to Install

- `@vercel/blob`

## Implementation

1. Check the existing project schema.
   - review `prisma/model/project.prisma`
   - add or reuse a field for the canvas blob URL
   - keep Prisma responsible for metadata only

2. Add canvas save/load API routes.
   Create: `PUT /api/projects/[projectId]/canvas`
   This route should:
   - receive the latest canvas JSON
   - upload the JSON to Vercel Blob
   - store the returned blob URL on the matching Prisma project record

   Create: `GET /api/projects/[projectId]/canvas`
   This route should:
   - read the project’s saved blob URL from Prisma
   - fetch the saved canvas JSON from Vercel Blob (includes nodes, edges, and lastModified)
   - return the full canvas state including the lastModified timestamp to the editor

3. Add an autosave hook in the `/hook` folder.
   - watch the canvas nodes and edges
   - debounce saves to avoid excessive writes
   - save through the canvas API route
   - when saving, include current timestamp as `lastModified` in the canvas JSON
   - track save status: saving, saved, error

4. Load saved canvas state in the editor (race condition protected).
   - **Load only on first participant**: Move the load check into the Liveblocks room lifecycle (e.g., `onRoomJoin` or in the storage initialization callback like `initializeRoomStorage`)
   - **Check presence count**: Only call `loadSavedCanvasState` if `presenceCount === 1`, ensuring this user is the first to join the room
   - **Add lastModified tracking**: When saving the canvas state to Vercel Blob, include a `lastModified` timestamp alongside the canvas JSON
   - **Timestamp conflict detection**: Before applying the loaded state in `applyCanvasState`, fetch the room's current `lastModified` (if any nodes exist) and compare:
     - If room state is newer (room's lastModified > saved blob's lastModified), abort the load to preserve active collaboration
     - If saved state is newer or room is empty, apply the loaded state
   - **Never load if room is active**: If the room already has nodes/edges when you check, skip the load entirely

5. Add a small save status indicator in the editor Save button.
   - show saving, saved, or error states

## Storage Pattern

- Prisma stores project metadata and the canvas blob URL.
- Vercel Blob stores the actual canvas JSON with metadata:
  ```json
  {
    "nodes": [...],
    "edges": [...],
    "lastModified": "2024-01-15T10:30:00Z"
  }
  ```
- Liveblocks room state tracks its own `lastModified` to detect conflicts.

## Check When Done

- `@vercel/blob` is installed.
- Project schema supports storing the canvas blob URL.
- Save/load routes use Prisma for metadata and Vercel Blob for canvas JSON.
- Saved canvas blob includes a `lastModified` timestamp.
- Autosave hook debounces canvas saves and updates `lastModified` on every save.
- Editor shows save status.
- Canvas load only triggers on first participant (presenceCount === 1) via Liveblocks lifecycle callback.
- Before applying loaded state, code compares `lastModified` timestamps:
  - Aborts load if room state is newer than saved state
  - Applies load only if saved state is newer or room is empty
- Saved canvas does not load if the room already has active nodes or edges.
- **Race condition protected**: Two users joining simultaneously cannot result in one user's changes being overwritten during initialization.
- `npm run build` passes.
