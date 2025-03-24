import { Link, useParams, createFileRoute } from "@tanstack/react-router"
import { ArrowRight, BookOpen, ChevronRight } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { GuideIcon } from "~/components/guide-icon"
import { guideCategories } from "~/data/guides"

export const Route = createFileRoute('/guides/$category/')({
  component: GuideCategoryPage,
})

function GuideCategoryPage() {
  const { category } = useParams({ strict: false })
  
  // Find the category data
  const categoryData = guideCategories.find(cat => cat.slug === category)

  if (!categoryData) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Category Not Found</h1>
          <p className="text-muted-foreground mb-6">The guide category you're looking for doesn't seem to exist.</p>
          <Link to="/guides">
            <Button>Back to Guides</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 dark:bg-green-950/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="flex items-center gap-2 mb-4">
              <div className="rounded-full bg-green-100 dark:bg-green-900 p-3">
                <GuideIcon name={categoryData?.icon || "BookOpen"} />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{categoryData.title} Guides</h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                {categoryData.description}
              </p>
            </div>
            {categoryData.guides.length > 0 && (
              <Link to={`/guides/${category}/${categoryData.guides[0].slug}`}>
                <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                  Start with {categoryData.guides[0].title}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Breadcrumb navigation */}
      <div className="container px-4 md:px-6 mt-8">
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/guides" className="hover:text-foreground">
            Guides
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">{categoryData.title}</span>
        </div>
      </div>

      {/* Guides listing */}
      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryData.guides.map((guide, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
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
                  <Link to={`/guides/${category}/${guide.slug}`} className="w-full">
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

      {/* Other categories */}
      <section className="w-full py-12 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Other Guide Categories</h2>
            <p className="text-muted-foreground">Explore our other comprehensive guide collections</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guideCategories
              .filter(cat => cat.slug !== category)
              .map((cat, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="rounded-full bg-green-100 dark:bg-green-900 p-2">
                        <GuideIcon name={cat.icon} />
                      </div>
                    </div>
                    <CardTitle className="text-lg">{cat.title}</CardTitle>
                    <CardDescription>{cat.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Link to={`/guides/${cat.slug}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        Browse {cat.title} Guides
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      </section>
    </main>
  )
}
