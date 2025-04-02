import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Download,
  FileText,
  Battery,
  Droplets,
} from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "~/convex/_generated/api";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
  GuideIcon,
  FeaturedGuideCard,
  GuideCard,
  LoadingGuideCard,
} from "~/features/guides/components";
import { Skeleton } from "~/components/ui/skeleton";
import { seo } from "~/utils/seo";
import { HeroSection } from "~/components/shared/HeroSection";
import { SectionHeader } from "~/components/shared/SectionHeader";
import { Newsletter } from "~/components/shared/Newsletter";
import { Id } from "~/convex/_generated/dataModel";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_pathlessLayout/guides/")({
  component: GuidesPage,
  head: () => ({
    meta: [
      ...seo({
        title:
          "Off-Grid Guides: Cabins, Solar Power & Self-Sufficiency | Off Grid Collective",
        description:
          "Find comprehensive guides on off-grid living at the Off Grid Collective. Explore our featured sections and categories covering DIY solar installations, water system upgrades, cabin building, and solutions for common challenges like proving residence without bills",
      }),
    ],
    links: [{ rel: "canonical", href: `https://offgridcollective.co/guides` }],
  }),
  loader: async (opts) => {
    await opts.context.queryClient.ensureQueryData(convexQuery(api.guides.getGuideCategories, {}))
    await opts.context.queryClient.ensureQueryData(convexQuery(api.guides.getFeaturedGuides, {}))
  }
});

function GuidesPage() {
  // Fetch guide categories and featured guides from Convex
  const { data: categories, isLoading: categoriesLoading } = useSuspenseQuery(convexQuery(api.guides.getGuideCategories, {}))
  const { data: featuredGuides, isLoading: featuredGuidesLoading } = useSuspenseQuery(convexQuery(api.guides.getFeaturedGuides, {}))

  // Loading states
  const isLoading = categoriesLoading || featuredGuidesLoading;

  return (
    <main className="flex-1">
      {/* Hero section */}
      <HeroSection
        title="Off-Grid Living Guides"
        description="Comprehensive resources to help you navigate every aspect of self-sufficient, sustainable living."
        backgroundImage="/images/hero-bg.jpg"
        primaryButtonText="Start with the Basics"
        primaryButtonLink="/guides/getting-started/what-is-off-grid-living"
        secondaryButtonText="Browse All Guides"
        secondaryButtonLink="#guide-categories"
        className="bg-green-50 dark:bg-green-950/30"
      />

      {/* Featured guides section */}
      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-center mb-8">
            <SectionHeader
              title="Featured Guides"
              description="Comprehensive resources for your off-grid journey"
            />
            <Link to="#guide-categories">
              <Button variant="ghost" className="gap-1">
                View all guides
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? // Loading skeleton UI
                Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <LoadingGuideCard key={index} variant="featured" />
                  ))
              : featuredGuides.map((guide) => (
                  <FeaturedGuideCard key={guide._id} guide={guide} />
                ))}
          </div>
        </div>
      </section>

      {/* Guide categories section */}
      <section id="guide-categories" className="w-full py-12 md:py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <SectionHeader
            title="Guide Categories"
            description="Browse our comprehensive collection of guides organized by topic"
            className="mb-8"
          />

          <div className="space-y-12">
            {isLoading
              ? // Loading skeletons for categories
                Array(3)
                  .fill(0)
                  .map((_, index) => <CategoryLoader key={index} />)
              : categories.map((category) => (
                  <div key={category._id}>
                    <div className="flex items-center gap-2 mb-6">
                      <div className="rounded-full bg-green-100 dark:bg-green-900 p-2">
                        <GuideIcon name={category.icon} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{category.title}</h3>
                        <p className="text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {/* For each category, we need to fetch its guides */}
                    <CategoryGuides
                      categoryId={category._id}
                      categorySlug={category.slug}
                    />
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* Downloadable resources section */}
      <section className="w-full py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <SectionHeader
            title="Downloadable Resources"
            description="Printable guides, checklists, and worksheets to help with your off-grid planning"
            className="mb-8"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Off-Grid Living Checklist",
                description:
                  "A comprehensive checklist to help you prepare for the transition to off-grid living",
                icon: (
                  <FileText className="h-6 w-6 text-green-600 dark:text-green-400" />
                ),
                fileType: "PDF",
              },
              {
                title: "Solar System Sizing Worksheet",
                description:
                  "Calculate your energy needs and design an appropriate solar power system",
                icon: (
                  <Battery className="h-6 w-6 text-green-600 dark:text-green-400" />
                ),
                fileType: "PDF",
              },
              {
                title: "Water System Planning Guide",
                description:
                  "Design your rainwater harvesting and water management systems",
                icon: (
                  <Droplets className="h-6 w-6 text-green-600 dark:text-green-400" />
                ),
                fileType: "PDF",
              },
            ].map((resource, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="rounded-full bg-green-100 dark:bg-green-900 p-2">
                      {resource.icon}
                    </div>
                    <Badge>{resource.fileType}</Badge>
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full gap-2" disabled>
                    <Download className="h-4 w-4" />
                    Download (Coming Soon)
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter section */}
      <Newsletter />
    </main>
  );
}

// Helper component for loading state of a category section
function CategoryLoader() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="w-full">
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(3)
          .fill(0)
          .map((_, guideIndex) => (
            <LoadingGuideCard key={guideIndex} />
          ))}
      </div>
    </div>
  );
}

// Helper component to fetch and display guides for a category
function CategoryGuides({
  categoryId,
  categorySlug,
}: {
  categoryId: Id<"guideCategories">;
  categorySlug: string;
}) {
  const guides = useQuery(api.guides.getGuidesByCategory, { categoryId });
  const isLoading = !guides;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <LoadingGuideCard key={index} />
          ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {guides.map((guide) => (
        <GuideCard
          key={guide._id}
          guide={guide}
          categorySlug={categorySlug}
          buttonVariant="outline"
        />
      ))}
    </div>
  );
}
