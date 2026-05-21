import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

/**
 * Root page — acts as an auth-aware redirect gate.
 *
 * Authenticated users are sent to `/editor`.
 * Unauthenticated users are redirected to `/sign-in` (handled automatically
 * by `clerkMiddleware` before this page is reached, but the explicit redirect
 * here provides a clear fallback and documents intent).
 *
 * @returns {Promise<never>} Always redirects; never renders UI.
 */
export default async function RootPage(): Promise<never> {
  const { userId } = await auth();

  if (userId) {
    redirect('/editor');
  } else {
    redirect('/sign-in');
  }
}
