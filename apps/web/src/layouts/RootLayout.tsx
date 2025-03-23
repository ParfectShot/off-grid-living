import { Outlet } from '@tanstack/react-router'

export function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1>Off-Grid Living</h1>
          {/* Navigation links will be added here */}
        </nav>
      </header>
      
      <main>
        <Outlet />
      </main>
      
      <footer>
        <p>© {new Date().getFullYear()} Off-Grid Living</p>
      </footer>
    </div>
  )
}
