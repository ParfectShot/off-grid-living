import { Link } from '@tanstack/react-router'
import Image from '~/components/ui/image'
import { Badge } from '~/components/ui/badge'
import { ArrowRight, Clock } from 'lucide-react'

export interface BlogPostSummary {
  id: number | string
  title: string
  excerpt: string
  date: string
  category: string
  readTime: string
  tags: string[]
  featured?: boolean
  imageUrl?: string
}

interface BlogCardProps {
  post: BlogPostSummary
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border shadow-sm bg-card hover:shadow-md transition-shadow">
      <div className="aspect-video overflow-hidden bg-muted">
        <Image
          src={post.imageUrl || `/placeholder.svg?height=300&width=500&text=${encodeURIComponent(post.title)}`}
          width={500}
          height={300}
          alt={post.title}
          className="object-cover transition-transform group-hover:scale-105 h-full w-full"
        />
        {featured && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-green-600 hover:bg-green-700">Featured</Badge>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Badge variant="outline">{post.category}</Badge>
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {post.readTime}
          </div>
        </div>
        <h3 className="text-xl font-bold">{post.title}</h3>
        <p className="mt-2 text-muted-foreground line-clamp-2">{post.excerpt}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{post.date}</span>
          <Link
            to="/blogs/$id"
            params={{ id: post.id.toString() }}
            className="text-sm font-medium text-green-600 hover:underline flex items-center"
          >
            Read More
            <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  )
}
