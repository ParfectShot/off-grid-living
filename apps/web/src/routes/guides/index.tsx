import { Link } from "@tanstack/react-router"
import { createFileRoute } from "@tanstack/react-router"
import { ArrowRight, BookOpen, Download, FileText, Battery, Droplets } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { GuideIcon } from "~/components/guide-icon"
import { guideCategories, featuredGuides } from "~/data/guides"
import { seo } from '~/utils/seo'

export const Route = createFileRoute("/guides/")({
  component: GuidesPage,
  head: () => ({
    meta: [
      ...seo({
        title: 'Off-Grid Guides: Cabins, Renewable Energy & Self-Sufficiency | Off Grid Collective',
        description: 'Find comprehensive guides on off-grid living at the Off Grid Collective. Explore our featured sections and categories covering DIY solar installations, water system upgrades, cabin building, and solutions for common challenges like proving residence without bills',
      }),
    ],
    links: [
      {rel: 'canonical', href: `https://offgridcollective.co/guides`}
    ]
  })
})

function GuidesPage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 dark:bg-green-950/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Off-Grid Living Guides</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Comprehensive resources to help you navigate every aspect of self-sufficient, sustainable living.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/guides/getting-started/what-is-off-grid-living">
                <Button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-600 hover:bg-green-700 h-10 px-4 py-2 text-white">
                  Start with the Basics
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="#guide-categories">
                <Button variant="outline">Browse All Guides</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured guides section */}
      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Featured Guides</h2>
              <p className="text-muted-foreground">Comprehensive resources for your off-grid journey</p>
            </div>
            <Link to="#guide-categories">
              <Button variant="ghost" className="gap-1">
                View all guides
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGuides.map((guide, index) => (
              <Card key={index} className="overflow-hidden flex flex-col">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={guide.image || "/images/placeholder.jpg"}
                    alt={guide.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">Featured</Badge>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Badge variant="outline">{guide.level}</Badge>
                    <span className="flex items-center">
                      <BookOpen className="h-3 w-3 mr-1" />
                      {guide.readTime}
                    </span>
                  </div>
                  <CardTitle>{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-2">
                  <Link to={`/guides/${guide.categorySlug}/${guide.slug}`} className="w-full">
                    <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                      Read Guide
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guide categories section */}
      <section id="guide-categories" className="w-full py-12 md:py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Guide Categories</h2>
            <p className="text-muted-foreground">Browse our comprehensive collection of guides organized by topic</p>
          </div>

          <div className="space-y-12">
            {guideCategories.map((category, index) => (
              <div key={index}>
                <div className="flex items-center gap-2 mb-6">
                  <div className="rounded-full bg-green-100 dark:bg-green-900 p-2">
                    <GuideIcon name={category.icon} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{category.title}</h3>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.guides.map((guide, guideIndex) => (
                    <Card key={guideIndex} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <Badge variant="outline">{guide.level}</Badge>
                          <span className="flex items-center">
                            <BookOpen className="h-3 w-3 mr-1" />
                            {guide.readTime}
                          </span>
                        </div>
                        <CardTitle className="text-lg">{guide.title}</CardTitle>
                        <CardDescription>{guide.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="pt-2">
                        <Link to={`/guides/${category.slug}/${guide.slug}`} className="w-full">
                          <Button variant="outline" className="w-full">
                            Read Guide
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloadable resources section */}
      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Downloadable Resources</h2>
            <p className="text-muted-foreground">
              Printable guides, checklists, and worksheets to help with your off-grid planning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Off-Grid Living Checklist",
                description: "A comprehensive checklist to help you prepare for the transition to off-grid living",
                icon: <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />,
                fileType: "PDF",
              },
              {
                title: "Solar System Sizing Worksheet",
                description: "Calculate your energy needs and design an appropriate solar power system",
                icon: <Battery className="h-6 w-6 text-green-600 dark:text-green-400" />,
                fileType: "PDF",
              },
              {
                title: "Water System Planning Guide",
                description: "Design your rainwater harvesting and water management systems",
                icon: <Droplets className="h-6 w-6 text-green-600 dark:text-green-400" />,
                fileType: "PDF",
              },
            ].map((resource, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="rounded-full bg-green-100 dark:bg-green-900 p-2">{resource.icon}</div>
                    <Badge>{resource.fileType}</Badge>
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
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
    </main>
  )
}
