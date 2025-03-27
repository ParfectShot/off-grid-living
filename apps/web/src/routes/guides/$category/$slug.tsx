import { useState, useEffect, Suspense } from "react"
import { Link, useParams, createFileRoute } from "@tanstack/react-router"
import {
  ArrowRight,
  BookOpen,
  Download,
  Share2,
  Printer,
  Bookmark,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"

import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { 
  findGuideBySlug, 
  getRelatedGuides, 
  getGuideNavigation,
  getAdjacentGuides
} from "~/data/guides"
import { getGuideContent } from "~/data/guide-registry"
import { seoDataMap } from "~/data/seo/guides/guides"
import { seo } from "~/utils/seo"

export const Route = createFileRoute('/guides/$category/$slug')({
  component: GuideDetailPage,
  head: () => {
    // const { category, slug } = useParams({});

    // const seoInfo = seoDataMap[category as keyof typeof seoDataMap]?.[slug as keyof typeof seoDataMap["getting-started"]] || {
      const seoInfo = {
      title: 'Off Grid Collective: Guide', // Default title
      description: 'Explore our comprehensive guides on off-grid living.', // Default description
    };

    return {
      meta: [
        ...seo({
          title: seoInfo.title,
          description: seoInfo.description,
        }),
      ],
      // links: [
      //   { rel: 'canonical', href: `https://offgridcollective.co/guides/${category}/${slug}` },
      // ],
    };
  },
})

function GuideDetailPage() {
  const { category, slug } = useParams({ strict: false })
  const [progress, setProgress] = useState(0)
  const [activeSection, setActiveSection] = useState("")

  const guide = findGuideBySlug(category, slug)
  const relatedGuides = guide ? getRelatedGuides(guide, 3) : []
  
  // Get guide navigation for the category
  const guideNavigation = getGuideNavigation(category, slug)
  
  // Get adjacent guides for navigation
  const { prevItem, nextItem } = getAdjacentGuides(category, slug)
  
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
    if (guide?.sections?.length) {
      setActiveSection(guide.sections[0].id)
    }
  }, [guide])

  // Handle section visibility tracking
  useEffect(() => {
    if (!guide?.sections?.length) return;

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
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [guide]);

  // Handle print functionality
  const handlePrint = () => {
    window.print()
  }

  if (!guide) {
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
              {guide.category}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{guide.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left sidebar - Guide navigation */}
            <div className="lg:col-span-1 print:hidden">
              <div className="sticky top-24 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold">{guide.category} Guide</h2>
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
                </div>

                {/* On this page - section navigation */}
                {guide.sections && (
                  <div className="space-y-2">
                    <h2 className="text-sm font-semibold text-muted-foreground">ON THIS PAGE</h2>
                    <div className="space-y-1">
                      {guide.sections.map((section) => (
                        <a
                          key={section.id}
                          href={`#${section.id}`}
                          className={`flex items-center p-2 rounded-md text-sm ${
                            activeSection === section.id
                              ? "bg-muted text-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                          onClick={(e) => {
                            e.preventDefault()
                            document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })
                            setActiveSection(section.id)
                          }}
                        >
                          {section.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Guide actions */}
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start gap-2" onClick={handlePrint}>
                    <Printer className="h-4 w-4" />
                    Print Guide
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Bookmark className="h-4 w-4" />
                    Save for Later
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Share2 className="h-4 w-4" />
                    Share Guide
                  </Button>
                </div>

                {/* Related resources */}
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold">Related Resources</h2>
                  <div className="space-y-2">
                    <Link
                      to="/calculators/home-load"
                      className="flex items-center p-2 rounded-md text-sm hover:bg-muted"
                    >
                      <ArrowRight className="h-4 w-4 mr-2 text-green-600" />
                      Home Load Calculator
                    </Link>
                    <Link
                      to="/calculators/solar-system"
                      className="flex items-center p-2 rounded-md text-sm hover:bg-muted"
                    >
                      <ArrowRight className="h-4 w-4 mr-2 text-green-600" />
                      Solar System Calculator
                    </Link>
                    {relatedGuides.map((related, index) => (
                      <Link 
                        key={index}
                        to={`/guides/${related.categorySlug}/${related.slug}`} 
                        className="flex items-center p-2 rounded-md text-sm hover:bg-muted"
                      >
                        <BookOpen className="h-4 w-4 mr-2 text-green-600" />
                        {related.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="lg:col-span-3 max-w-3xl">
              {/* Guide metadata */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <Badge className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                  {guide.category}
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

              {/* Guide content */}
              <Suspense fallback={<div className="p-4 text-center">Loading guide content...</div>}>
                {GuideContent ? (
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
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
