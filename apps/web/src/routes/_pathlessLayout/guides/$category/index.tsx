import { createFileRoute } from "@tanstack/react-router"
import { useParams } from "@tanstack/react-router"
import { useQuery } from "convex/react"
import { api } from "~/convex/_generated/api"

import { BreadcrumbNav } from "~/components/shared/BreadcrumbNav"
import { SectionHeader } from "~/components/shared/SectionHeader"
import { CategoryHero } from "~/components/guides/CategoryHero"
import { GuideCard } from "~/components/guides/GuideCard"
import { CategoryCard } from "~/components/guides/CategoryCard"
import { LoadingGuideCard } from "~/components/guides/LoadingGuideCard"
import { seoDataMap as seoDataMapGuideCategories } from "~/data/seo/guides/categories"
import { seo } from "~/utils/seo"

export const Route = createFileRoute('/_pathlessLayout/guides/$category/')({
  component: GuideCategoryPage,
  head: (props: any) => {
    const { params } = props;
    const { category } = params;
    const seoInfo = seoDataMapGuideCategories[category as keyof typeof seoDataMapGuideCategories] || {
      title: 'Off-Grid Guides: Cabins, Renewable Energy & Self-Sufficiency | Off Grid Collective',
      description: 'Find comprehensive guides on off-grid living at the Off Grid Collective...',
    };

    return {
      meta: [
        ...seo({
          title: seoInfo.title,
          description: seoInfo.description,
        }),
      ],
      links: [
        { rel: 'canonical', href: `https://offgridcollective.co/guides/${category}` },
      ],
    };
  },
})

function GuideCategoryPage() {
  const { category } = useParams({ strict: false })
  
  // Fetch category data from Convex
  const categoryData = useQuery(api.guides.getGuideCategoryBySlug, { slug: category })
  const guides = useQuery(api.guides.getGuideByCategorySlug, { categorySlug: category })
  const otherCategories = useQuery(api.guides.getGuideCategories) || []

  // Loading states
  const isLoading = !categoryData || !guides || !otherCategories
  
  // Filter out the current category from other categories
  const filteredOtherCategories = isLoading ? [] : otherCategories.filter(cat => cat.slug !== category)
  // Get first guide slug for the "Start with" button
  const firstGuideSlug = !isLoading && guides.length > 0 ? guides[0].slug : undefined

  // Prepare category data for the CategoryHero component
  const categoryHeroData = categoryData ? {
    title: categoryData.title,
    description: categoryData.description,
    icon: categoryData.icon
  } : undefined

  if (!isLoading && !categoryData) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Category Not Found</h1>
          <p className="text-muted-foreground mb-6">The guide category you're looking for doesn't seem to exist.</p>
          <a href="/guides" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            Back to Guides
          </a>
        </div>
      </div>
    )
  }

  return (
    <main className="flex-1">
      {/* Hero section */}
      <CategoryHero 
        category={categoryHeroData} 
        firstGuideSlug={firstGuideSlug}
        categorySlug={category}
        isLoading={isLoading}
      />

      {/* Breadcrumb navigation */}
      <div className="container px-4 md:px-6 mt-8">
        <BreadcrumbNav 
          items={[
            { label: "Home", href: "/" },
            { label: "Guides", href: "/guides" },
            { 
              label: isLoading ? undefined : categoryData.title, 
              isLoading: isLoading
            }
          ]}
          className="mb-6"
        />
      </div>

      {/* Guides listing */}
      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              // Loading skeletons for guides
              Array(6).fill(0).map((_, index) => (
                <LoadingGuideCard key={index} />
              ))
            ) : (
              guides.map((guide) => (
                <GuideCard 
                  key={guide._id} 
                  guide={guide} 
                  categorySlug={category} 
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Other categories */}
      <section className="w-full py-12 bg-muted">
        <div className="container px-4 md:px-6">
          <SectionHeader 
            title="Other Guide Categories"
            description="Explore our other comprehensive guide collections"
            className="mb-8"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              // Loading skeletons for other categories
              Array(3).fill(0).map((_, index) => (
                <LoadingGuideCard key={index} />
              ))
            ) : (
              filteredOtherCategories.map((cat) => (
                <CategoryCard key={cat._id} category={cat} />
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
