import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { createRouter } from './router'

// Get the container element
const container = document.getElementById('root')

if (!container) {
  throw new Error('Root element not found. Please add a div with id "root" to your HTML.')
}

// Create the router instance
const router = createRouter()

// Create the root and render the app
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
