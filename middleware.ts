import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/payments(.*)',
  '/checkout(.*)',
  '/bookmarks(.*)',
  '/profile(.*)',
  '/campaigns(.*)',
  '/supportive-comments(.*)',
  '/fundraises(.*)'
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};