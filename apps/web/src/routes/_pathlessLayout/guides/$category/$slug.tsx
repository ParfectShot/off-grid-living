import { useState, useEffect, Suspense } from "react"
import { Link, useParams, createFileRoute } from "@tanstack/react-router"
import { useQuery } from "convex/react"
import { api } from "~/convex/_generated/api"
import {
  ArrowRight,
  BookOpen,
  Download,
  Share2,
  Printer,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  Copy,
  Check,
} from "lucide-react"

import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Skeleton } from "~/components/ui/skeleton"
import { getGuideContent } from "~/data/guide-registry"
import { seoDataMap } from "~/data/seo/guides/guides"
import { seo } from "~/utils/seo"
import { ImageCredit } from "~/components/guides/ImageCredit"
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "~/components/ui/accordion"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { Input } from "~/components/ui/input"
import { toast } from "sonner"

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

export const Route = createFileRoute('/_pathlessLayout/guides/$category/$slug')({
  component: GuideDetailPage,
  head: (props: any) => {
    const {params} = props;
    const { category, slug } = params;

    // Type-safe way to access nested properties
    let seoInfo = {
      title: 'Off Grid Collective: Guide', // Default title
      description: 'Explore our comprehensive guides on off-grid living.', // Default description
    };

    // Check if category exists in seoDataMap
    if (category && typeof category === 'string' && category in seoDataMap) {
      const categoryData = seoDataMap[category as keyof typeof seoDataMap];
      
      // Check if slug exists in the category data
      if (slug && typeof slug === 'string' && slug in categoryData) {
        seoInfo = categoryData[slug as keyof typeof categoryData];
      }
    }

    return {
      meta: [
        ...seo({
          title: seoInfo.title,
          description: seoInfo.description,
        }),
      ],
      links: [
        { rel: 'canonical', href: `https://offgridcollective.co/guides/${category}/${slug}` },
      ],
    };
  },
})

function GuideDetailPage() {
  const { category, slug } = useParams({ strict: false })
  const [progress, setProgress] = useState(0)
  const [activeSection, setActiveSection] = useState("")
  const [isShareOpen, setIsShareOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  // Get image credit based on slug
  const imageCredit = slug ? imageCredits[slug as keyof typeof imageCredits] : undefined;

  // Fetch guide data from Convex
  const guide = useQuery(api.guides.getGuideBySlug, { slug }) 
  const categoryData = useQuery(api.guides.getGuideCategoryBySlug, { slug: category })
  const guidesInCategory = useQuery(api.guides.getGuideByCategorySlug, { categorySlug: category })
  
  // Loading states
  const isLoading = !guide || !categoryData || !guidesInCategory
  
  // Generate guide navigation data
  const guideNavigation = !isLoading ? guidesInCategory.map((g, index) => {
    const nextGuide = guidesInCategory[index + 1];
    return {
      title: g.title,
      slug: g.slug,
      current: g.slug === slug,
      ...(nextGuide ? { next: nextGuide.slug } : {})
    };
  }) : []
  
  // Get adjacent guides for navigation
  const currentIndex = guideNavigation.findIndex(item => item.slug === slug)
  const prevItem = currentIndex > 0 ? guideNavigation[currentIndex - 1] : null
  const nextItem = currentIndex >= 0 && guideNavigation[currentIndex].next
    ? guideNavigation.find(item => item.slug === guideNavigation[currentIndex].next)
    : null
  
  // Dynamic content loading based on slug
  const GuideContent = slug ? getGuideContent(slug) : null;
  
  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.body.offsetHeight
      const winHeight = window.innerHeight
      const scrollPercent = scrollTop / (docHeight - winHeight)
      setProgress(scrollPercent * 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Set initial active section
  useEffect(() => {
    if (!guide) return;
    if (guide.sections.length) {
      setActiveSection(guide.sections[0].sectionId)
    }
  }, [guide])

  // Handle section visibility tracking
  useEffect(() => {
    if (!guide) return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    };

    const observerOptions = {
      rootMargin: "-100px 0px -70% 0px"
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    guide.sections.forEach(section => {
      const element = document.getElementById(section.sectionId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [guide]);

  // Handle print functionality
  const handlePrint = () => {
    window.print()
  }

  // Handle share functionality
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setIsCopied(true)
      toast.success("Link copied to clipboard!")
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    } catch (err) {
      toast.error("Failed to copy link")
    }
  }
  
  // Auto-copy to clipboard when popover opens
  useEffect(() => {
    if (isShareOpen) {
      copyToClipboard()
    }
  }, [isShareOpen])

  if (!isLoading && !guide) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Guide Not Found</h1>
          <p className="text-muted-foreground mb-6">The guide you're looking for doesn't seem to exist.</p>
          <Link to="/guides">
            <Button>Back to Guides</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Find the primary category
  const primaryCategory = !isLoading && guide && guide.categories 
    ? guide.categories.find(cat => cat.isPrimary)?.title || categoryData.title
    : categoryData?.title;

  return (
    <>
      {/* Reading progress bar */}
      <div className="fixed top-16 left-0 w-full h-1 bg-muted z-50 print:hidden">
        <div
          className="h-full bg-green-600 transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <main className="flex-1">
        {/* Guide header */}
        <div className="container px-4 md:px-6 py-8 print:py-4">
          {/* Breadcrumb navigation */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-6 print:hidden">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/guides" className="hover:text-foreground">
              Guides
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link to={`/guides/${category}`} className="hover:text-foreground">
              {isLoading ? <Skeleton className="h-4 w-20 inline-block" /> : categoryData.title}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">
              {isLoading ? <Skeleton className="h-4 w-32 inline-block" /> : guide.title}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left sidebar - Guide navigation */}
            <div className="lg:col-span-1 print:hidden">
              <div className="sticky top-24 space-y-6">
                <div className="space-y-2">
                  {isLoading ? (
                    <>
                      <Skeleton className="h-6 w-40 mb-4" />
                      {Array(5).fill(0).map((_, i) => (
                        <Skeleton key={i} className="h-8 w-full mb-2" />
                      ))}
                    </>
                  ) : (
                    <>
                      <h2 className="text-lg font-semibold">{primaryCategory} Guide</h2>
                      <div className="space-y-1">
                        {guideNavigation.map((item, index) => (
                          <Link
                            key={index}
                            to={`/guides/${category}/${item.slug}`}
                            className={`flex items-center p-2 rounded-md text-sm ${
                              item.current ? "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-medium" : "hover:bg-muted"
                            }`}
                          >
                            {item.current && <ChevronRight className="h-4 w-4 mr-1" />}
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Guide actions */}
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start gap-2" onClick={handlePrint}>
                    <Printer className="h-4 w-4" />
                    Print Guide
                  </Button>
                  
                  {/* Share Guide button with popover */}
                  <Popover open={isShareOpen} onOpenChange={setIsShareOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <Share2 className="h-4 w-4" />
                        Share Guide
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80" align="start" sideOffset={5}>
                      <div className="space-y-4">
                        <h3 className="font-medium">Share this guide</h3>
                        <div className="flex space-x-2">
                          <Input 
                            value={currentUrl} 
                            readOnly
                            className="flex-1 text-sm"
                            onClick={(e) => (e.target as HTMLInputElement).select()}
                          />
                          <Button 
                            size="icon" 
                            variant="outline"
                            onClick={copyToClipboard}
                            className="shrink-0"
                          >
                            {isCopied ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="lg:col-span-3 max-w-3xl">
              {isLoading ? (
                // Loading skeleton UI for guide
                <>
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                  <Skeleton className="h-12 w-3/4 mb-6" />
                  <div className="space-y-4">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-5/6" />
                    <Skeleton className="h-6 w-4/5" />
                  </div>
                </>
              ) : (
                <>
                  {/* Guide metadata */}
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <Badge className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                      {primaryCategory}
                    </Badge>
                    <Badge variant="outline">{guide.level}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <BookOpen className="h-3 w-3 mr-1" />
                      <span>{guide.readTime}</span>
                    </div>
                    {guide.lastUpdated && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>Last updated: {guide.lastUpdated}</span>
                      </div>
                    )}
                  </div>

                  {/* Guide title */}
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
                    {guide.title}
                  </h1>
                  
                  {/* Guide image with credit */}
                  {guide.image && (
                    <div className="mb-8 relative">
                      <img 
                        src={guide.image} 
                        alt={guide.title}
                        className="w-full h-auto rounded-lg object-cover"
                      />
                      {imageCredit && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2 rounded-b-lg">
                          <ImageCredit credit={imageCredit} className="text-white/90" />
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* Section navigation accordion - NEW */}
              {!isLoading && guide.sections && (
                <div className="mb-8 print:hidden">
                  <Accordion type="single" collapsible className="bg-muted/50 rounded-md p-2">
                    <AccordionItem value="sections">
                      <AccordionTrigger className="text-sm font-medium px-2">
                        Quick Navigation
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-2">
                          {guide.sections.map((section) => (
                            <a
                              key={section.sectionId}
                              href={`#${section.sectionId}`}
                              className="flex items-center p-2 rounded-md text-sm hover:bg-muted"
                              onClick={(e) => {
                                e.preventDefault()
                                document.getElementById(section.sectionId)?.scrollIntoView({ behavior: "smooth" })
                                setActiveSection(section.sectionId)
                              }}
                            >
                              <ChevronRight className="h-3 w-3 mr-1 text-green-600" />
                              {section.title}
                            </a>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}

              {/* Guide content */}
              <Suspense fallback={<div className="p-4 text-center">Loading guide content...</div>}>
                {isLoading ? (
                  <div className="space-y-4 mt-8">
                    {Array(6).fill(0).map((_, i) => (
                      <div key={i} className="mb-8">
                        <Skeleton className="h-8 w-64 mb-4" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-5/6" />
                      </div>
                    ))}
                  </div>
                ) : GuideContent ? (
                  <GuideContent />
                ) : (
                  <div className="space-y-4">
                    <p className="text-xl text-muted-foreground">
                      {guide.description}
                    </p>
                    <div className="my-8 p-4 bg-muted rounded-md">
                      <p className="text-center">This guide is coming soon. Please check back later.</p>
                    </div>
                  </div>
                )}
              </Suspense>

              {/* Guide navigation */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10 pt-6 border-t print:hidden">
                {isLoading ? (
                  <>
                    <Skeleton className="flex-1 h-16" />
                    <Skeleton className="flex-1 h-16" />
                  </>
                ) : (
                  <>
                    {prevItem ? (
                      <Link to={`/guides/${category}/${prevItem.slug}`} className="flex-1">
                        <Button variant="outline" className="w-full justify-start gap-2 py-8">
                          <ChevronLeft className="h-4 w-4" />
                          <div className="text-left">
                            <div className="text-xs text-muted-foreground">Previous</div>
                            <div className="text-sm font-medium truncate">{prevItem.title}</div>
                          </div>
                        </Button>
                      </Link>
                    ) : (
                      <Button variant="outline" className="flex-1 justify-start gap-2" disabled>
                        <ChevronLeft className="h-4 w-4" />
                        <div className="text-left">
                          <div className="text-xs text-muted-foreground">Previous</div>
                          <div className="text-sm font-medium truncate">No previous guide</div>
                        </div>
                      </Button>
                    )}
                    
                    {nextItem ? (
                      <Link to={`/guides/${category}/${nextItem.slug}`} className="flex-1">
                        <Button variant="outline" className="w-full justify-end gap-2 py-8">
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground">Next</div>
                            <div className="text-sm font-medium truncate">{nextItem.title}</div>
                          </div>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    ) : (
                      <Button variant="outline" className="flex-1 justify-end gap-2" disabled>
                        <div className="text-right">
                          <div className="text-xs text-muted-foreground">Next</div>
                          <div className="text-sm font-medium truncate">No next guide</div>
                        </div>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
            
            {/* Right sidebar - NEW - for "ON THIS PAGE" section */}
            <div className="hidden lg:block lg:col-span-1 print:hidden">
              <div className="sticky top-24 space-y-6">
                {isLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24 mb-3" />
                    {Array(4).fill(0).map((_, i) => (
                      <Skeleton key={i} className="h-8 w-full mb-2" />
                    ))}
                  </div>
                ) : guide.sections && (
                  <div className="space-y-2">
                    <h2 className="text-sm font-semibold text-muted-foreground">ON THIS PAGE</h2>
                    <div className="space-y-1">
                      {guide.sections.map((section) => (
                        <a
                          key={section.sectionId}
                          href={`#${section.sectionId}`}
                          className={`flex items-center p-2 rounded-md text-sm ${
                            activeSection === section.sectionId
                              ? "bg-muted text-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                          onClick={(e) => {
                            e.preventDefault()
                            document.getElementById(section.sectionId)?.scrollIntoView({ behavior: "smooth" })
                            setActiveSection(section.sectionId)
                          }}
                        >
                          {section.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
