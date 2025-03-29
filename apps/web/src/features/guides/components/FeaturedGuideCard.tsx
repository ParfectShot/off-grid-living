import { Link } from "@tanstack/react-router"
import { ArrowRight, BookOpen } from "lucide-react"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { useQuery } from "convex/react"
import { api } from "~/convex/_generated/api"
import { LoadingGuideCard } from "./LoadingGuideCard"
import { ImageCredit } from "./ImageCredit"

interface FeaturedGuideCardProps {
  guide: {
    _id?: string // For Convex IDs
    id?: string // For static data
    title: string
    description: string
    level: string
    readTime: string
    slug: string
    categorySlug?: string
    image?: string
    imageCredit?: {
      authorName: string;
      authorUrl: string;
      sourceName: string;
      sourceUrl: string;
    }
  }
  categorySlug?: string
}

export function FeaturedGuideCard({ guide }: FeaturedGuideCardProps) {
  // Use the passed categorySlug or the guide's categorySlug if available
  const guideWithCategory = useQuery(api.guides.getGuideBySlug, {
    slug: guide.slug
  })
  const isLoading = !guideWithCategory
  const categorySlug = guideWithCategory?.categories[0]?.slug

  if (isLoading) {
    return <LoadingGuideCard />
  }

  const imageCredit = guideWithCategory.imageCredit || guide.imageCredit;

  return (
    <Card className="overflow-hidden flex flex-col pt-0 h-full">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={guide.image || "/images/placeholder.jpg"}
          alt={guide.title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <Badge className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white">
            Featured
          </Badge>
        </div>
        {imageCredit && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1">
            <ImageCredit credit={imageCredit} className="text-white/90" />
          </div>
        )}
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
        <Link to={`/guides/${categorySlug}/${guide.slug}`} className="w-full">
          <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
            Read Guide
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
} 