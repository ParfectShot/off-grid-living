import { createFileRoute, redirect } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { ArrowRight, Calculator, Home, Newspaper, Star, Sun } from 'lucide-react'
import { seo } from '~/utils/seo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { HeroSection } from "~/components/shared/HeroSection"
import { SectionHeader } from "~/components/shared/SectionHeader"
import { Newsletter } from "~/components/shared/Newsletter"
import { api } from '~/convex/_generated/api';
import { FeaturedGuideCard, LoadingGuideCard } from '~/features/guides';
import { convexQuery } from '@convex-dev/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/_pathlessLayout/')({
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
  },
  loader: async (opts) => {
    await opts.context.queryClient.ensureQueryData(convexQuery(api.guides.getFeaturedGuides, {}))
  }
})

function LandingPage() {

  const { data: enhancedFeaturedGuides, isLoading } = useSuspenseQuery(convexQuery(api.guides.getFeaturedGuides, {}))

  return (

    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero section */}
        <HeroSection
          title="Embrace the Freedom of Off-Grid Living"
          description="Discover resources, tools, and insights to help you build a sustainable, self-sufficient lifestyle."
          primaryButtonText="Start Your Journey"
          primaryButtonLink="/guides"
        />
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <SectionHeader
              title="Everything You Need to Go Off-Grid"
              description="Our comprehensive resources help you plan, build, and maintain your off-grid lifestyle."
              align="center"
              className="mb-12"
            />
            
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
            <SectionHeader
              title="Comprehensive Off-Grid Guides"
              description="Learn everything you need to know about sustainable living with our detailed guides."
              align="center"
              className="mb-12"
            />

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {isLoading && (
                <LoadingGuideCard />
              )}
              {!isLoading && enhancedFeaturedGuides?.map((guide, index) => (
                <FeaturedGuideCard 
                  key={index}
                  guide={guide}
                />
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
            <SectionHeader
              title="Latest Blog Posts"
              description="Stay updated with the latest trends, tips, and stories from the off-grid community."
              align="center"
              className="mb-8"
            />

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {/* Coming Soon Banner */}
              <div className="col-span-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-green-600 rounded-lg bg-green-50">
                <h3 className="text-2xl font-bold text-green-700 mb-2">Blog Posts Coming Soon!</h3>
                <p className="text-center text-muted-foreground">
                  We're working on some amazing content to help you on your off-grid journey. Check back soon!
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <SectionHeader
              title="Top-Rated Solar Products"
              description="Discover the best solar panels, batteries, and accessories for your off-grid setup."
              align="center"
              className="mb-8"
            />

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {/* Coming Soon Banner */}
              <div className="col-span-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-green-600 rounded-lg bg-green-50">
                <h3 className="text-2xl font-bold text-green-700 mb-2">Product Reviews Coming Soon!</h3>
                <p className="text-center text-muted-foreground">
                  We're testing and reviewing the best off-grid products to help you make informed decisions. Stay tuned!
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter section */}
        <Newsletter />
      </main>
    </div>

  )
}
