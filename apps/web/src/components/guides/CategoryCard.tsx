import { Link } from "@tanstack/react-router"
import { ArrowRight } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { GuideIcon } from "~/components/guides/guide-icon"

interface CategoryCardProps {
  category: {
    _id?: string
    id?: string
    title: string
    description: string
    icon: string
    slug: string
  }
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow h-full">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <div className="rounded-full bg-green-100 dark:bg-green-900 p-2">
            <GuideIcon name={category.icon} />
          </div>
        </div>
        <CardTitle className="text-lg">{category.title}</CardTitle>
        <CardDescription>{category.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Link to={`/guides/${category.slug}`} className="w-full">
          <Button variant="outline" className="w-full">
            Browse {category.title} Guides
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
} 