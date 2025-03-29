import { Link } from "@tanstack/react-router"
import { Button } from "~/components/ui/button"

export function Newsletter() {
  return (
    <section className="w-full py-12 md:py-24 bg-green-50 dark:bg-green-950/30">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Stay Updated with Our Newsletter
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Get the latest guides, tips, and resources for off-grid living delivered straight to your inbox.
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
  )
} 