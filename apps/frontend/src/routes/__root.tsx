import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import * as React from 'react'
import { createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <div>Not Found</div>,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <HeadContent />
        <link rel="stylesheet" href="/styles/index.css" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="bg-primary-600 text-white">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">Off-Grid Living</Link>
                <div className="space-x-6">
                  <Link
                    to="/"
                    activeProps={{
                      className: 'font-bold border-b-2 border-white',
                    }}
                    activeOptions={{ exact: true }}
                    className="hover:text-gray-200 transition-colors"
                  >
                    Home
                  </Link>
                </div>
              </nav>
            </div>
          </header>
          
          <main className="flex-grow">
            {children}
          </main>
          
          <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Off-Grid Living</h3>
                  <p className="text-gray-300">
                    Your resource for sustainable off-grid living solutions and information.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
                  <ul className="space-y-2">
                    <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3">Contact</h4>
                  <p className="text-gray-300 mb-3">
                    Have questions? Get in touch with us.
                  </p>
                  <a href="mailto:info@offgridliving.example.com" className="text-primary-400 hover:text-primary-300">
                    info@offgridliving.example.com
                  </a>
                </div>
              </div>
              <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
                <p>© {new Date().getFullYear()} Off-Grid Living. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>

        {/* DEV Tools - Only visible in development */}
        {process.env.NODE_ENV === 'development' && (
          <>
            <TanStackRouterDevtools position="bottom-right" />
            <ReactQueryDevtools buttonPosition="bottom-left" />
          </>
        )}
        <Scripts />
      </body>
    </html>
  )
}
