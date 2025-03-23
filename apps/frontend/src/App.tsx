import { RouterProvider } from '@tanstack/react-router'
import { createRouter } from './router'

// Create the router instance
const router = createRouter()

export function App() {
  return <RouterProvider router={router} />
}
