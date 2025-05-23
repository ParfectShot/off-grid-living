import { Link } from "@tanstack/react-router"
import { ArrowRight, BookOpen } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle, CardContent } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { ImageCredit } from "./ImageCredit"
import clsx from "clsx"
import { useQuery } from "convex/react"
import { api } from "~/convex/_generated/api"

// Image credits mapping based on guide slugs
const imageCredits = {
  'what-is-off-grid-living': {
    authorName: "Eugene Chystiakov",
    authorUrl: "https://unsplash.com/@eugenechystiakov?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    sourceName: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/a-house-with-a-solar-panel-on-the-roof-XVwYGihplmY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
  },
  'key-considerations-for-off-grid-living': {
    authorName: "VD Photography",
    authorUrl: "https://unsplash.com/@vdphotography?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    sourceName: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/an-aerial-view-of-a-house-with-a-solar-panel-on-the-roof-tC4tHCeoO44?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
  },
  'step-by-step-approach-to-off-grid-living': {
    authorName: "Sumit Mangela",
    authorUrl: "https://unsplash.com/@sumitmangela?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    sourceName: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/a-very-large-building-that-has-a-bunch-of-stairs-in-it-ASM0H3ul2yo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
  },
  'common-questions-about-off-grid-living': {
    authorName: "Rakshit Yadav",
    authorUrl: "https://unsplash.com/@rakshityadav190?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    sourceName: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/a-monkey-sitting-on-top-of-a-solar-panel-mIa5hPkh42w?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
  }
};

interface GuideCardProps {
  guide: {
    _id: string // Make _id required since we're using it for image lookup
    title: string
    description: string
    level: string
    readTime: string
    slug: string
    categorySlug?: string
    imageCredit?: {
      authorName: string
      authorUrl: string
      sourceName: string
      sourceUrl: string
    }
  }
  categorySlug: string
  variant?: "default" | "featured"
  buttonVariant?: "default" | "outline"
}

export function GuideCard({ 
  guide, 
  categorySlug, 
  variant = "default",
  buttonVariant = "default" 
}: GuideCardProps) {
  // Use the passed categorySlug or the guide's categorySlug if available
  // Adding fallback to prevent undefined in URL
  const category = categorySlug || guide.categorySlug;

  // Fetch primary image for the guide
  const primaryImage = useQuery(api.images.getPrimaryImageForEntity, {
    entityType: "guides",
    entityId: guide._id,
  });

  // Use image credit from either the guide or the primary image
  const imageCredit = guide.imageCredit || primaryImage?.credit;
  const hasImage = !!primaryImage?.originalUrl;

  return (
    <Card className={
      clsx(
        "hover:shadow-md transition-shadow flex flex-col h-full",
        hasImage && "pt-0 overflow-hidden" 
      )}>
      {hasImage && (
        <div className="relative">
          <div className="aspect-video overflow-hidden">
            <img 
              src={primaryImage.originalUrl}
              alt={guide.title}
              className="w-full h-full object-cover transition-transform hover:scale-105"
              {...(primaryImage.srcset && {
                srcSet: primaryImage.srcset.map(s => `${s.url} ${s.width}w`).join(', '),
                sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              })}
            />
            <div className="absolute top-2 right-2">
              <Badge variant="outline" className="bg-white/80 text-black">{guide.level}</Badge>
            </div>
          </div>
          {imageCredit && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1">
              <ImageCredit credit={imageCredit} className="text-white/90" />
            </div>
          )}
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
          {!hasImage && <Badge variant="outline">{guide.level}</Badge>}
          <span className="flex items-center">
            <BookOpen className="h-3 w-3 mr-1" />
            {guide.readTime}
          </span>
          {variant === "featured" && (
            <Badge className="bg-green-600 hover:bg-green-700 text-white">Featured</Badge>
          )}
        </div>
        <CardTitle className="text-lg">{guide.title}</CardTitle>
        <CardDescription>{guide.description}</CardDescription>
      </CardHeader>
      <CardFooter className="pt-2 mt-auto">
        <Link to={`/guides/${category}/${guide.slug}`} className="w-full">
          <Button 
            className={`w-full ${buttonVariant === "default" ? "bg-green-600 hover:bg-green-700" : ""}`}
            variant={buttonVariant}
          >
            Read Guide
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
} 