import { createFileRoute } from "@tanstack/react-router"
import { Link } from "@tanstack/react-router"
import { ArrowLeft } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"

export const Route = createFileRoute("/calculators/solar-system/")({
  component: SolarSystemCalculatorPage,
})

function SolarSystemCalculatorPage() {
  return (
      <main className="flex-1">
        {/* Back to calculators link */}
        <div className="container px-4 md:px-6 pt-8">
          <Link
            to="/calculators"
            className="inline-flex items-center text-sm font-medium text-green-600 dark:text-green-400 hover:underline"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Calculators
          </Link>
        </div>

        {/* Calculator header */}
        <section className="container px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Solar System Calculator</h1>
              <p className="text-muted-foreground">
                Design your solar power system based on your energy needs and location.
              </p>
            </div>
          </div>

          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Solar System Calculator</CardTitle>
                <CardDescription>
                  This calculator is currently under development. Please check back soon!
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-center mb-6">
                  The Solar System Calculator will help you design a complete solar power system based on your energy
                  requirements, location, and specific needs.
                </p>
                <Link to="/calculators/home-load">
                  <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                    Try the Home Load Calculator First
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
  )
}
