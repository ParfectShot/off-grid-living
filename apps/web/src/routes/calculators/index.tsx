import { Link } from "@tanstack/react-router"
import { Lightbulb, Battery, ArrowRight } from "lucide-react"
import { createFileRoute } from "@tanstack/react-router"

import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"

export const Route = createFileRoute("/calculators/")({
  component: CalculatorsPage,
})

function CalculatorsPage() {
  return (
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 dark:bg-green-950/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Off-Grid Energy Calculators
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Plan your off-grid energy system with our specialized calculators designed to help you determine your
                  needs and find the right solutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
              {/* Home Load Calculator Card */}
              <Card className="overflow-hidden">
                <CardHeader className="pb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="rounded-full bg-green-100 dark:bg-green-900 p-2">
                      <Lightbulb className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle>Home Load Calculator</CardTitle>
                  </div>
                  <CardDescription>
                    Calculate your daily energy consumption by adding your appliances and their usage hours.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="aspect-video relative overflow-hidden rounded-lg mb-4 bg-muted">
                    <img
                      src="/assets/calculators/home-load-preview.jpeg"
                      alt="Home Load Calculator Preview"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">What you'll learn:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Your total daily energy consumption in watt-hours (Wh)</li>
                      <li>Energy usage breakdown by appliance</li>
                      <li>Essential vs. non-essential power needs</li>
                      <li>Recommendations for reducing energy consumption</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/calculators/home-load" className="w-full">
                    <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                      Use Home Load Calculator
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Solar System Calculator Card */}
              <Card className="overflow-hidden">
                <CardHeader className="pb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="rounded-full bg-green-100 dark:bg-green-900 p-2">
                      <Battery className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle>Solar System Calculator</CardTitle>
                  </div>
                  <CardDescription>
                    Design your solar power system based on your energy needs and location.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="aspect-video relative overflow-hidden rounded-lg mb-4 bg-muted">
                    <img
                      src="/assets/calculators/solar-system-preview.jpeg"
                      alt="Solar System Calculator Preview"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">What you'll learn:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Required solar panel capacity based on your energy needs</li>
                      <li>Battery bank size recommendations</li>
                      <li>Inverter sizing guidelines</li>
                      <li>Estimated system cost and payback period</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/calculators/solar-system" className="w-full">
                    <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                      Use Solar System Calculator
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>

            {/* Additional information */}
            <div className="mt-16 p-6 bg-muted rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Why Use Our Calculators?</h2>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <h3 className="font-medium">Accurate Planning</h3>
                  <p className="text-sm text-muted-foreground">
                    Our calculators use real-world data and industry standards to provide accurate estimates for your
                    off-grid energy system.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Cost Savings</h3>
                  <p className="text-sm text-muted-foreground">
                    Properly sizing your system helps avoid overspending on unnecessary capacity or underspending and
                    facing energy shortages.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Customized Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Get personalized recommendations based on your specific appliances, usage patterns, and location.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter section */}
        <section className="w-full py-12 md:py-24 bg-green-50 dark:bg-green-950/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Stay Updated with Our Newsletter
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get the latest off-grid living articles, calculator updates, and resources delivered straight to your
                  inbox.
                </p>
              </div>
              <div className="flex flex-col space-y-4">
                <form className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <div className="flex-1">
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="email"
                      placeholder="Enter your email"
                      type="email"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">Subscribe</Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  By subscribing, you agree to our{" "}
                  <Link to="/terms" className="underline underline-offset-2">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="underline underline-offset-2">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
  )
}
