import { RouterProvider } from '@tanstack/react-router'
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import { createRouter } from './router'

// Create the router instance
const router = createRouter()

export function App() {
  return <>
    <RouterProvider router={router} />
    <SpeedInsights />
    <Analytics mode="production" />
  </>
}
