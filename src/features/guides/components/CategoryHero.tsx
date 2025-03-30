import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Skeleton } from '~/components/ui/skeleton'
import { GuideIcon } from './GuideIcon'

interface CategoryHeroProps {
  category?: {
    title: string
    description: string
    icon: string
  }
  firstGuideSlug?: string
  categorySlug?: string
  isLoading?: boolean
}

export function CategoryHero({ category, firstGuideSlug, categorySlug, isLoading = false }: CategoryHeroProps) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 dark:bg-green-950/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          {isLoading ? (
            // Loading state for category header
            <>
              <Skeleton className="h-12 w-12 rounded-full mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-10 w-64 mx-auto" />
                <Skeleton className="h-5 w-full max-w-[700px] mx-auto" />
                <Skeleton className="h-5 w-3/4 max-w-[600px] mx-auto" />
              </div>
              <Skeleton className="h-10 w-40 mt-4" />
            </>
          ) : (
            <>
              {category && (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="rounded-full bg-green-100 dark:bg-green-900 p-3">
                      <GuideIcon name={category.icon || "BookOpen"} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                      {category.title} Guides
                    </h1>
                    <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                      {category.description}
                    </p>
                  </div>
                </>
              )}
              
              {firstGuideSlug && categorySlug && (
                <Link to={`/guides/${categorySlug}/${firstGuideSlug}`}>
                  <Button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-600 hover:bg-green-700 h-10 px-4 py-2 text-white">
                    {`Start with ${firstGuideSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
} 