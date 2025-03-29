import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { useEffect } from 'react'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Bookmark,
  ThumbsUp,
  User,
  Tag,
  ArrowRight,
} from 'lucide-react'

import { Button } from '~/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Badge } from '~/components/ui/badge'
import { Separator } from '~/components/ui/separator'
import { Textarea } from '~/components/ui/textarea'
import Image from '~/components/ui/image'
import { BlogCard } from '~/components/blog/BlogCard'
import { blogPosts } from '~/data/blogPosts'

export const Route = createFileRoute('/_pathlessLayout/blogs/$id')({
  component: BlogPostPage,
  head: () => {
    return {
      meta: [
        {
          name: 'robots',
          content: 'noindex',
        },
      ],
    }
  }
})

// Mock data for a single blog post
const getBlogPost = (id: string) => {
  // First try to find the post in our blogPosts array
  const post = blogPosts.find(post => post.id.toString() === id)
  
  if (post) {
    // If found in the basic data, merge with the detailed data
    return {
      ...post,
      content: `
        <h2>Introduction to Solar Power for Off-Grid Living</h2>
        <p>Solar power is one of the most accessible and reliable forms of renewable energy for off-grid homes. Whether you're building a remote cabin, converting a van, or establishing a homestead, understanding solar power systems is essential for energy independence.</p>
        
        // ...rest of the content...
      `,
      author: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        bio: "Off-grid living enthusiast and solar energy specialist with 10+ years of experience in renewable energy systems.",
      },
      comments: 12,
      likes: 48,
      relatedPosts: [2, 7, 3],
    }
  }

  // Fallback to the first post if not found
  return {
    // ...existing fallback data...
    ...blogPosts[0],
    relatedPosts: [2, 7, 3],
    content: `
      <h2>Introduction to Solar Power for Off-Grid Living</h2>
      <p>Solar power is one of the most accessible and reliable forms of renewable energy for off-grid homes. Whether you're building a remote cabin, converting a van, or establishing a homestead, understanding solar power systems is essential for energy independence.</p>
      
      // ...rest of the content...
    `,
    comments: 12,
    likes: 48,
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Off-grid living enthusiast and solar energy specialist with 10+ years of experience in renewable energy systems.",
    },
  }
}

// Get related posts
const getRelatedPosts = (relatedIds: number[]) => {
  const relatedPosts = [
    {
      id: 2,
      title: "10 Essential Tools for Off-Grid Living",
      excerpt: "Discover the must-have tools that will make your off-grid lifestyle more comfortable and sustainable.",
      date: "April 2, 2023",
      category: "Tools & Equipment",
      readTime: "6 min read",
      tags: ["tools", "essentials", "homesteading"],
      featuredImage: "/assets/blog/featured/bill-mead-wmaP3Tl80ww-unsplash.jpg",
    },
    {
      id: 3,
      title: "Rainwater Harvesting Systems for Self-Sufficiency",
      excerpt: "How to design and build an effective rainwater collection system to meet your household water needs.",
      date: "April 18, 2023",
      category: "Water Systems",
      readTime: "10 min read",
      tags: ["water", "sustainability", "DIY"],
      featuredImage: "/assets/blog/featured/chelsea-WvusC5M-TM8-unsplash.jpg",
    },
    {
      id: 7,
      title: "DIY Battery Bank for Solar Energy Storage",
      excerpt: "How to build a cost-effective battery storage system for your solar power setup.",
      date: "June 25, 2023",
      category: "Solar Energy",
      readTime: "11 min read",
      tags: ["solar", "batteries", "DIY"],
      featuredImage: "/assets/blog/featured/american-public-power-association-513dBrMJ_5w-unsplash.jpg",
    },
  ]

  return relatedIds.map((id) => relatedPosts.find((post) => post.id === id)).filter(Boolean)
}

function BlogPostPage() {
  const { id } = Route.useParams()
  const post = getBlogPost(id)
  const relatedPosts = getRelatedPosts(post?.relatedPosts)

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id]) // Re-run when the blog post ID changes

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Back to blogs link */}
        <div className="container px-4 md:px-6 pt-8">
          <Link to="/blogs" className="inline-flex items-center text-sm font-medium text-green-600 hover:underline">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Blogs
          </Link>
        </div>

        {/* Blog post header */}
        <article className="container px-4 md:px-6 py-8">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4">
              <Badge variant="outline" className="mb-2">
                {post.category}
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">{post.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.comments} comments</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{post.likes} likes</span>
                </div>
              </div>
            </div>

            {/* Featured image */}
            <div className="relative aspect-video overflow-hidden rounded-lg mb-8">
              <Image
                src={`${post.featuredImage || "/placeholder.svg?height=600&width=1200&text=Featured+Image"}`}
                alt={post.title}
                width={1200}
                height={600}
                className="object-cover"
              />
            </div>

            {/* Author info */}
            <div className="flex items-center gap-4 mb-8 p-4 bg-muted rounded-lg">
              <Avatar className="h-12 w-12">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>
                  <User className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium">{post.author.name}</div>
                <p className="text-sm text-muted-foreground">{post.author.bio}</p>
              </div>
            </div>

            {/* Social sharing */}
            <div className="flex items-center gap-2 mb-8">
              <span className="text-sm font-medium">Share:</span>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Share on Facebook</span>
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Share on Twitter</span>
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">Share on LinkedIn</span>
              </Button>
              <div className="flex-1"></div>
              <Button variant="outline" size="sm" className="gap-1">
                <Bookmark className="h-4 w-4" />
                <span className="hidden sm:inline">Save for later</span>
              </Button>
            </div>

            {/* Blog content */}
            <div className="prose prose-stone dark:prose-invert max-w-none mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />

            {/* Tags */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Tag className="mr-2 h-4 w-4" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Post actions */}
            <div className="flex items-center justify-between mb-12">
              <Button variant="outline" className="gap-1">
                <ThumbsUp className="h-4 w-4" />
                Like this article
              </Button>
              <Button variant="outline" className="gap-1">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" className="gap-1">
                <Bookmark className="h-4 w-4" />
                Save
              </Button>
            </div>

            <Separator className="my-12" />

            {/* Comments section */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6">Comments ({post.comments})</h3>

              {/* Comment form */}
              <div className="mb-8">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      className="w-full min-h-[100px]"
                      placeholder="Add a comment..."
                    />
                    <div className="flex justify-end mt-2">
                      <Button className="bg-green-600 hover:bg-green-700">Post Comment</Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sample comments */}
              <div className="space-y-6">
                {[1, 12].map((i) => (
                  <div key={i} className="flex items-start gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`/placeholder.svg?height=40&width=40&text=User${i}`} alt={`User ${i}`} />
                      <AvatarFallback>
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">John Doe</div>
                        <span className="text-xs text-muted-foreground">2 days ago</span>
                      </div>
                      <p className="mt-1 text-sm">
                        {i === 1
                          ? "This is exactly what I needed! I'm planning to set up my first solar system this summer and this guide is super helpful. Do you have any specific brand recommendations for beginners?"
                          : "Great article! I've been using solar for my cabin for years, but I learned some new tips about maintenance. Thanks for sharing your knowledge."}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <button className="text-xs text-muted-foreground hover:text-foreground">Reply</button>
                        <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          {i === 1 ? "8" : "3"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <Button variant="outline" className="w-full">
                  Load More Comments
                </Button>
              </div>
            </div>

            <Separator className="my-12" />

            {/* Related posts */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((post) => (
                  <>
                  {post && <BlogCard key={post.id} post={post} />}
                  </>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="rounded-lg bg-muted p-6 mb-12">
              <h3 className="text-xl font-bold mb-2">Enjoy this article?</h3>
              <p className="text-muted-foreground mb-4">
                Subscribe to our newsletter for more off-grid living tips and guides.
              </p>
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button className="bg-green-600 hover:bg-green-700">Subscribe</Button>
              </form>
            </div>

            {/* Post navigation */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <Button variant="outline" className="flex-1 justify-start gap-2">
                <ArrowLeft className="h-4 w-4" />
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">Previous</div>
                  <div className="text-sm font-medium truncate">Rainwater Harvesting Systems</div>
                </div>
              </Button>
              <Button variant="outline" className="flex-1 justify-end gap-2">
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Next</div>
                  <div className="text-sm font-medium truncate">DIY Battery Bank for Solar Energy</div>
                </div>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}
