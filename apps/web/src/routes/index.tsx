import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight, Calculator, Home, Newspaper, Star, Sun } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Link } from '@tanstack/react-router'
import { BlogCard } from '~/components/blog/BlogCard'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

// Import blog posts data from the blogs page
import { blogPosts } from '~/data/blogPosts'

function LandingPage() {
  // Get the 3 most recent blog posts
  const latestPosts = [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center">
          <div className="container px-4 md:px-6 flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 bg-background/80 backdrop-blur-sm p-6 rounded-lg max-w-3xl">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Embrace the Freedom of Off-Grid Living
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Discover resources, tools, and insights to help you build a sustainable, self-sufficient lifestyle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button className="bg-green-600 hover:bg-green-700">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Everything You Need to Go Off-Grid
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Our comprehensive resources help you plan, build, and maintain your off-grid lifestyle.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Home className="h-12 w-12 text-green-600" />
                <h3 className="text-xl font-bold">Home</h3>
                <p className="text-center text-muted-foreground">
                  Get inspired with off-grid home designs and practical living solutions.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Newspaper className="h-12 w-12 text-green-600" />
                <h3 className="text-xl font-bold">Blogs</h3>
                <p className="text-center text-muted-foreground">
                  Read stories and advice from experienced off-grid enthusiasts.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Calculator className="h-12 w-12 text-green-600" />
                <h3 className="text-xl font-bold">Calculators</h3>
                <p className="text-center text-muted-foreground">
                  Plan your energy needs with our home load and solar system calculators.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Star className="h-12 w-12 text-green-600" />
                <h3 className="text-xl font-bold">Reviews</h3>
                <p className="text-center text-muted-foreground">
                  Find the best solar products with our detailed reviews and comparisons.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-16">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-600">
                  Featured Tools
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Powerful Calculators for Your Off-Grid Planning
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our specialized calculators help you determine your energy needs and design the perfect solar system
                  for your off-grid home.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link 
                    to="/calculators/home-load" 
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-600 text-white hover:bg-green-700 h-10 px-4 py-2"
                  >
                    Home Load Calculator
                    <Calculator className="ml-2 h-4 w-4" />
                  </Link>
                  <Link 
                    to="/calculators/solar-system" 
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                  >
                    Solar System Calculator
                    <Sun className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="/assets/blog/featured/bill-mead-wmaP3Tl80ww-unsplash.jpg"
                  alt="Solar panel calculator screenshot"
                  className="rounded-lg object-cover shadow-lg w-full max-w-[600px] h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Latest Blog Posts</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Stay updated with the latest trends, tips, and stories from the off-grid community.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            <div className="flex justify-center">
              <Link 
                to="/blogs" 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                View All Blog Posts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Top-Rated Solar Products
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Discover the best solar panels, batteries, and accessories for your off-grid setup.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col overflow-hidden rounded-lg border shadow-sm">
                  <div className="aspect-video relative">
                    <img
                      src={`/assets/blog/featured/yue-chan-j8bxJBbLjIo-unsplash.jpg`}
                      alt={`Product ${i} thumbnail`}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 right-2 flex items-center gap-0.5 rounded-md bg-background/80 px-2 py-1 text-sm font-medium backdrop-blur-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>4.{i + 5}/5</span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="text-xl font-bold">Premium Solar Panel Kit {i}</h3>
                    <p className="mt-2 flex-1 text-muted-foreground">
                      High-efficiency monocrystalline solar panels with advanced inverter technology.
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xl font-bold">${199 + i * 100}</span>
                      <Link to={`/reviews/${i}`} className="text-sm font-medium text-green-600 hover:underline">
                        Read Review
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Link 
                to="/reviews" 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                View All Reviews
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-16">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Join Our Off-Grid Community</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Subscribe to our newsletter and get the latest off-grid living tips, product reviews, and exclusive
                  offers.
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
                  <Button className="bg-green-600 hover:bg-green-700">Subscribe</Button>
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
    </div>
  )
}
