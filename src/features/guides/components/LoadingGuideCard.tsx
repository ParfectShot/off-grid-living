import { Card, CardFooter, CardHeader } from "~/components/ui/card"
import { Skeleton } from "~/components/ui/skeleton"

interface LoadingGuideCardProps {
  variant?: 'default' | 'featured'
}

export function LoadingGuideCard({ variant = 'default' }: LoadingGuideCardProps) {
  return (
    <Card className="h-full">
      {variant === 'featured' && (
        <div className="aspect-video relative">
          <Skeleton className="h-full w-full" />
        </div>
      )}
      <CardHeader className="pb-2">
        <Skeleton className="h-4 w-20 mb-2" />
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-4 w-full" />
      </CardHeader>
      <CardFooter className="mt-auto pt-2">
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  )
} 