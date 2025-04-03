import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { Button } from "~/components/ui/button"
import { useMutation } from "convex/react"
import { api } from "~/convex/_generated/api"
import { Alert, AlertTitle, AlertDescription } from "~/components/ui/alert"
import { CheckCircle2 } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const subscribe = useMutation(api.newsletter.subscribe)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simple validation
    if (!email || !email.includes('@')) {
      setError("Please enter a valid email address")
      return
    }
    
    setIsSubmitting(true)
    setError(null)
    
    try {
      const result = await subscribe({ email, source: "website-newsletter" })
      setEmail("")
      setShowSuccess(true)

      if (typeof window !== 'undefined') {
        // Safely access window object
        (window as any).dataLayer = (window as any).dataLayer || [];
        (window as any).dataLayer.push({ 'event': 'email_signup_success' });
      }
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
    } catch (err) {
      setError("Failed to subscribe. Please try again later.")
      console.error("Newsletter subscription error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }
  
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
            {showSuccess && (
              <Alert className="bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-800">
                <CheckCircle2 className="text-green-600 dark:text-green-400" />
                <AlertTitle className="text-green-800 dark:text-green-300">Thank you for subscribing!</AlertTitle>
                <AlertDescription className="text-green-700 dark:text-green-400">
                  You'll now receive our latest updates and resources directly to your inbox.
                </AlertDescription>
              </Alert>
            )}
            
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <div className="flex-1">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground">
              By subscribing, you agree to our Terms & Conditions and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}