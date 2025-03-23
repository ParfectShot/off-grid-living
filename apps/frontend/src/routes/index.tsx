import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="home-page">
      <h2>Welcome to Off-Grid Living</h2>
      <p>Your journey to sustainable off-grid living starts here.</p>
    </div>
  )
}
