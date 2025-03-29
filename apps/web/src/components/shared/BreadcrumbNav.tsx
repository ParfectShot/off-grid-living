import { Link } from "@tanstack/react-router"
import { ChevronRight } from "lucide-react"
import { Skeleton } from "~/components/ui/skeleton"

type BreadcrumbItem = {
  label: string | React.ReactNode
  href?: string
  isLoading?: boolean
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[]
  className?: string
}

export function BreadcrumbNav({ items, className = "" }: BreadcrumbNavProps) {
  return (
    <div className={`flex items-center gap-1 text-sm text-muted-foreground ${className}`}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        if (item.isLoading) {
          return (
            <div key={index} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4" />}
              <Skeleton className="h-4 w-20 inline-block" />
            </div>
          )
        }

        return (
          <div key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4" />}
            {!isLast && item.href ? (
              <Link to={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-foreground font-medium" : ""}>
                {item.label}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
} 