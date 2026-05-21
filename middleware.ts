import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

/**
 * Matches all public auth routes — sign-in and sign-up — including sub-paths
 * used by Clerk's hosted UI (e.g. `/sign-in/factor-one`).
 */
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

/**
 * Clerk middleware that protects all application routes by default.
 *
 * Public routes (sign-in, sign-up) are exempted from the auth check.
 * Every other route calls `auth.protect()`, which redirects unauthenticated
 * visitors to the sign-in page automatically.
 */
export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
