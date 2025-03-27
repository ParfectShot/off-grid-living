import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from '@tanstack/react-router'
import { convexQuery } from '@convex-dev/react-query';
import { ArrowRight, Calculator, Home, Newspaper, Star, Sun, BookOpen } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { BlogCard } from '~/components/blog/BlogCard'
import { api } from "~/convex/_generated/api";
import { seo } from '~/utils/seo';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"

// Import blog posts data from the blogs page
import { blogPosts } from '~/data/blogPosts'
// Import featured guides from guides page
import { featuredGuides } from '~/data/guides'

export const Route = createFileRoute('/')({
  component: LandingPage,
  head: () => {
    return {
      meta: [
        ...seo({
          title: 'Off-Grid Living: Cabins, Solar Power & Self-Sufficiency | Off Grid Collective',
          description: 'Explore the off-grid lifestyle with the Off Grid Collective. Find resources on building cabins, implementing renewable energy solutions, managing waste and water, and connecting with others seeking independence and self-sufficiency',
        }),
      ]
    }
  }
})

function LandingPage() {
  const {data} = useSuspenseQuery(convexQuery(api.products.get, {}));
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
                <Link to="/guides" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-600 hover:bg-green-700 h-10 px-4 py-2 text-white">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                {/* <Button variant="outline">Learn More</Button> */}
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
              <Link to="/guides" className="block h-full">
                <Card className="h-full transition-all hover:shadow-md">
                  <CardHeader className="flex flex-col items-center space-y-2 pb-2">
                    <Home className="h-12 w-12 text-green-600" />
                    <CardTitle className="text-xl">Guides</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      Get inspired with off-grid guides and practical living solutions.
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/blogs" className="block h-full">
                <Card className="h-full transition-all hover:shadow-md">
                  <CardHeader className="flex flex-col items-center space-y-2 pb-2">
                    <Newspaper className="h-12 w-12 text-green-600" />
                    <CardTitle className="text-xl">Blogs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      Read stories and advice from experienced off-grid enthusiasts.
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/calculators" className="block h-full">
                <Card className="h-full transition-all hover:shadow-md">
                  <CardHeader className="flex flex-col items-center space-y-2 pb-2">
                    <Calculator className="h-12 w-12 text-green-600" />
                    <CardTitle className="text-xl">Calculators</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      Plan your energy needs with our home load and solar system calculators.
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/reviews" className="block h-full">
                <Card className="h-full transition-all hover:shadow-md">
                  <CardHeader className="flex flex-col items-center space-y-2 pb-2">
                    <Star className="h-12 w-12 text-green-600" />
                    <CardTitle className="text-xl">Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      Find the best solar products with our detailed reviews and comparisons.
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-16">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-12">
              <div className="space-y-4 md:w-1/2">
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
                <div className="flex flex-col gap-2 md:flex-row">
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
              <div className="flex items-center justify-center md:w-1/2">
                <img
                  src="/assets/blog/featured/bill-mead-wmaP3Tl80ww-unsplash.jpg"
                  alt="Solar panel calculator screenshot"
                  className="rounded-lg object-cover shadow-lg w-full max-w-11/12 h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Guides section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Comprehensive Off-Grid Guides
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Learn everything you need to know about sustainable living with our detailed guides.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {featuredGuides.map((guide, index) => (
                <div key={index} className="flex flex-col overflow-hidden rounded-lg border shadow-sm">
                  <div className="aspect-video relative">
                    <img
                      src={guide.image || "/images/placeholder.jpg"}
                      alt={guide.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="rounded-md bg-green-600 px-2 py-1 text-xs font-medium text-white">
                        {guide.level}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="text-xl font-bold">{guide.title}</h3>
                    <div className="mt-1 flex items-center text-sm text-muted-foreground">
                      <BookOpen className="mr-1 h-4 w-4" />
                      <span>{guide.readTime}</span>
                    </div>
                    <p className="mt-2 flex-1 text-muted-foreground">
                      {guide.description}
                    </p>
                    <div className="mt-4 flex items-center justify-end">
                      <Link to={`/guides/${guide.categorySlug}/${guide.slug}`} className="text-sm font-medium text-green-600 hover:underline">
                        Read Guide
                        <ArrowRight className="ml-1 inline h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Link 
                to="/guides" 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                View All Guides
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32">
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
              {/* {latestPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))} */}
              
              {/* Coming Soon Banner */}
              <div className="col-span-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-green-600 rounded-lg bg-green-50">
                <h3 className="text-2xl font-bold text-green-700 mb-2">Blog Posts Coming Soon!</h3>
                <p className="text-center text-muted-foreground">
                  We're working on some amazing content to help you on your off-grid journey. Check back soon!
                </p>
              </div>
            </div>
            {/* <div className="flex justify-center">
              <Link 
                to="/blogs" 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                View All Blog Posts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div> */}
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
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
              {/* {[1, 2, 3].map((i) => (
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
              ))} */}
              
              {/* Coming Soon Banner */}
              <div className="col-span-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-green-600 rounded-lg bg-green-50">
                <h3 className="text-2xl font-bold text-green-700 mb-2">Product Reviews Coming Soon!</h3>
                <p className="text-center text-muted-foreground">
                  We're testing and reviewing the best off-grid products to help you make informed decisions. Stay tuned!
                </p>
              </div>
            </div>
            {/* <div className="flex justify-center">
              <Link 
                to="/reviews" 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                View All Reviews
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div> */}
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32">
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
