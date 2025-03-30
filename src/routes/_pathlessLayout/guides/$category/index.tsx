import { createFileRoute } from "@tanstack/react-router";
import { useParams } from "@tanstack/react-router";
import { api } from "~/convex/_generated/api";

import { BreadcrumbNav } from "~/components/shared/BreadcrumbNav";
import { SectionHeader } from "~/components/shared/SectionHeader";
import {
  CategoryHero,
  GuideCard,
  CategoryCard,
  LoadingGuideCard,
} from "~/features/guides/components";
import { seoDataMapCategory } from "~/features/guides/seo";
import { seo } from "~/utils/seo";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_pathlessLayout/guides/$category/")({
  component: GuideCategoryPage,
  head: (props: any) => {
    const { params } = props;
    const { category } = params;
    const seoInfo = seoDataMapCategory[
      category as keyof typeof seoDataMapCategory
    ] || {
      title:
        "Off-Grid Guides: Cabins, Renewable Energy & Self-Sufficiency | Off Grid Collective",
      description:
        "Find comprehensive guides on off-grid living at the Off Grid Collective...",
    };

    return {
      meta: [
        ...seo({
          title: seoInfo.title,
          description: seoInfo.description,
        }),
      ],
      links: [
        {
          rel: "canonical",
          href: `https://offgridcollective.co/guides/${category}`,
        },
      ],
    };
  },
  loader: async (opts) => {
    await opts.context.queryClient.ensureQueryData(convexQuery(api.guides.getGuideCategoryBySlug, { slug: opts.params.category }))
    await opts.context.queryClient.ensureQueryData(convexQuery(api.guides.getGuideByCategorySlug, { categorySlug: opts.params.category }))
    await opts.context.queryClient.ensureQueryData(convexQuery(api.guides.getGuideCategories, {}))
  }
});

function GuideCategoryPage() {
  const { category } = useParams({ strict: false });

  // Fetch category data from Convex
  const { data: categoryData, isLoading: categoryDataLoading } = useSuspenseQuery(convexQuery(api.guides.getGuideCategoryBySlug, { slug: category }))
  const { data: guides, isLoading: guidesLoading } = useSuspenseQuery(convexQuery(api.guides.getGuideByCategorySlug, { categorySlug: category }))
  const { data: otherCategories, isLoading: otherCategoriesLoading } = useSuspenseQuery(convexQuery(api.guides.getGuideCategories, {}))

  // Loading states
  const isLoading = categoryDataLoading || guidesLoading || otherCategoriesLoading;

  // Filter out the current category from other categories
  const filteredOtherCategories = isLoading
    ? []
    : otherCategories.filter((cat) => cat.slug !== category);
  // Get first guide slug for the "Start with" button
  const firstGuideSlug =
    !isLoading && guides.length > 0 ? guides[0].slug : undefined;

  // Prepare category data for the CategoryHero component
  const categoryHeroData = categoryData
    ? {
        title: categoryData.title,
        description: categoryData.description,
        icon: categoryData.icon,
      }
    : undefined;

  if (!categoryData) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Category Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The guide category you're looking for doesn't seem to exist.
          </p>
          <a
            href="/guides"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            Back to Guides
          </a>
        </div>
      </div>
    );
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
              label: categoryData.title,
              isLoading: categoryDataLoading,
            },
          ]}
          className="mb-6"
        />
      </div>

      {/* Guides listing */}
      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guidesLoading
              ? Array(6)
                  .fill(0)
                  .map((_, index) => <LoadingGuideCard key={index} />)
              : guides.map((guide) => (
                  <GuideCard
                    key={guide._id}
                    guide={guide}
                    categorySlug={category}
                  />
                ))}
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
            {otherCategoriesLoading
              ? Array(3)
                  .fill(0)
                  .map((_, index) => <LoadingGuideCard key={index} />)
              : filteredOtherCategories.map((cat) => (
                  <CategoryCard key={cat._id} category={cat} />
                ))}
          </div>
        </div>
      </section>
    </main>
  );
}
