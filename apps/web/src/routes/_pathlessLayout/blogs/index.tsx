import { createFileRoute } from '@tanstack/react-router'
import { Search, Filter, Tag } from 'lucide-react'
import { Input } from '~/components/ui/input'
import { BlogCard } from '~/components/blog/BlogCard'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { blogPosts } from '~/data/blogPosts'

export const Route = createFileRoute('/_pathlessLayout/blogs/')({
  component: BlogsPage,
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

function BlogsPage() {
  const featuredPosts = blogPosts.filter(post => post.featured)
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)))

  return (
    <div className="flex min-h-screen flex-col p-4">
      {/* Coming Soon Banner */}
      <div className="col-span-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-green-600 rounded-lg bg-green-50">
        <h3 className="text-2xl font-bold text-green-700 mb-2">
          Blog Posts Coming Soon!
        </h3>
        <p className="text-center text-muted-foreground">
          We're working on some amazing content to help you on your off-grid
          journey. Check back soon!
        </p>
      </div>
    </div>
  );
  
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Off-Grid Living Blog</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Practical guides, tips, and stories to help you on your journey to self-sufficient living.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts Section */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} featured={true} />
                ))}
              </div>
            </div>

            {/* Search and filter (will be fully implemented in Phase 2) */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search articles..." className="w-full pl-8" />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="text-sm font-medium">Filter by:</span>
                  <select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                    <option value="">All Categories</option>
                    {Array.from(new Set(blogPosts.map(post => post.category))).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* All blog posts grid */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">All Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </div>

            {/* Pagination - static for now */}
            <div className="flex items-center justify-center space-x-2 mt-12">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="bg-green-600 text-white hover:bg-green-700">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>

            {/* Tags section */}
            <div className="mt-12 mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Tag className="mr-2 h-4 w-4" />
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Newsletter section */}
            <section className="mt-20 rounded-lg bg-muted p-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    Stay Updated with Our Newsletter
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Get the latest off-grid living articles, tips, and resources delivered straight to your inbox.
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
                    <Button className="bg-green-600 hover:bg-green-700">Subscribe</Button>
                  </form>
                  <p className="text-xs text-muted-foreground">
                    By subscribing, you agree to our{" "}
                    <a href="/terms" className="underline underline-offset-2">
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="underline underline-offset-2">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  )
}
