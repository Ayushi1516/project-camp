import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'member/:userId/**',
    // All routes under 'member/:userId' will be server-side rendered (SSR)
    // instead of being prerendered at build time (SSG).
    renderMode: RenderMode.Server,
  },
   {
    path: 'admin',
    renderMode: RenderMode.Server
  },
   {
    path: '', 
    renderMode: RenderMode.Prerender  // homepage
  },
  {
    path: 'login',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'register',
    renderMode: RenderMode.Prerender
  },
  {
    path: '**',
    renderMode: RenderMode.Client, // fallback for unknown routes
  },
];
