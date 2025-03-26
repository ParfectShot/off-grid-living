import { ReactNode } from "react"

export interface GuideSection {
  id: string
  title: string
}

export interface Guide {
  title: string
  description: string
  slug: string
  readTime: string
  level: string
  category: string
  categorySlug: string
  lastUpdated?: string
  sections?: GuideSection[]
  content?: ReactNode
  image?: string
  featured?: boolean
}

export interface GuideCategory {
  title: string
  description: string
  slug: string
  icon: string // Now a string instead of ReactNode
  guides: Guide[]
}

// Add navigation metadata to categories
export interface GuideCategoryWithMeta extends GuideCategory {
  // Auto-generated navigation from guides array
  navigation?: {
    title: string;
    slug: string;
    next?: string;
    current?: boolean;
  }[];
}

// Updated guide categories with guides from multiple categories
export const guideCategories: GuideCategory[] = [
  {
    title: "Getting Started",
    description: "Essential information for beginners looking to transition to off-grid living",
    slug: "getting-started",
    icon: "Lightbulb",
    guides: [
      {
        title: "What is Off-Grid Living?",
        description: "An introduction to the concept, benefits, and challenges of living off the grid",
        slug: "what-is-off-grid-living",
        categorySlug: "getting-started",
        category: "Getting Started",
        readTime: "10 min read",
        level: "Beginner",
        lastUpdated: "March 15, 2023",
        image: "/assets/guides/getting-started/off-grid-cabin.jpeg",
        sections: [
          { id: "introduction", title: "Introduction" },
          { id: "definition", title: "What Does Off-Grid Mean?" },
          { id: "benefits", title: "Benefits of Off-Grid Living" },
          { id: "types", title: "Types of Off-Grid Living" },
          { id: "challenges", title: "Challenges to Consider" },
          { id: "resources", title: "Resources & Next Steps" },
        ],
      },
      {
        title: "Key Considerations Before Going Off-Grid",
        description: "Essential factors to evaluate before making the transition to an off-grid lifestyle",
        slug: "key-considerations",
        categorySlug: "getting-started",
        category: "Getting Started",
        readTime: "8 min read",
        level: "Beginner",
        image: "/assets/guides/getting-started/off-grid-essentials.jpeg",
      },
      {
        title: "Step-by-Step Approach",
        description: "A detailed guide to planning and executing your off-grid living journey",
        slug: "step-by-step-approach",
        categorySlug: "getting-started",
        category: "Getting Started",
        readTime: "12 min read",
        level: "Intermediate",
        image: "/assets/guides/getting-started/step-by-step-approach.jpeg",
      },
      {
        title: "Common Questions About Off-Grid Living",
        description: "Answers to frequently asked questions about the practical realities of off-grid living",
        slug: "common-questions",
        categorySlug: "getting-started",
        category: "Getting Started",
        readTime: "15 min read",
        level: "Beginner",
        lastUpdated: "April 10, 2023",
        image: "/assets/guides/getting-started/common-questions.jpeg",
        sections: [
          { id: "introduction", title: "Introduction" },
          { id: "finding-land", title: "Finding Suitable Land" },
          { id: "power-sources", title: "Power Sources" },
          { id: "water-needs", title: "Water Systems" },
          { id: "waste-management", title: "Waste Management" },
          { id: "shelter-types", title: "Shelter Options" },
          { id: "heating", title: "Heating Solutions" },
          { id: "connectivity", title: "Staying Connected" },
          { id: "motivations", title: "Motivations" },
          { id: "initial-challenges", title: "Initial Challenges" },
        ],
      }
      // ...existing guides for Getting Started if any...
    ],
  },
  {
    title: "Power Systems",
    description: "Comprehensive guides on designing, installing, and maintaining off-grid power systems",
    slug: "power-systems",
    icon: "Zap",
    guides: [
      {
        title: "Solar Power Basics",
        description: "Understanding solar panels, charge controllers, inverters, and batteries",
        slug: "solar-basics",
        categorySlug: "power-systems",
        category: "Power Systems",
        readTime: "12 min read",
        level: "Beginner",
      },
      // ...existing code...
    ],
  },
  {
    title: "Water Systems",
    description: "Solutions for water collection, storage, filtration, and management",
    slug: "water-systems",
    icon: "Droplets",
    guides: [
      // ...existing code...
    ],
  },
  {
    title: "Shelter & Construction",
    description: "Building and maintaining sustainable, energy-efficient off-grid homes",
    slug: "shelter",
    icon: "Home",
    guides: [
      // ...existing code...
    ],
  },
  {
    title: "Food Production",
    description: "Growing, preserving, and managing your own food supply",
    slug: "food",
    icon: "Leaf",
    guides: [
      // ...existing code...
    ],
  },
  {
    title: "Tools & Equipment",
    description: "Essential tools and equipment for off-grid living and maintenance",
    slug: "tools",
    icon: "Hammer",
    guides: [
      // ...existing code...
    ],
  },
  {
    title: "Climate Considerations",
    description: "Adapting off-grid strategies for different climate zones",
    slug: "climate",
    icon: "Thermometer",
    guides: [
      // ...existing code...
    ],
  },
  {
    title: "Safety & Resilience",
    description: "Preparing for emergencies and ensuring long-term sustainability",
    slug: "safety",
    icon: "ShieldCheck",
    guides: [
      // ...existing code...
    ],
  },
]

// Process guide categories to add navigation metadata
export const processCategoryNavigation = (categorySlug: string, currentSlug?: string): GuideCategoryWithMeta | undefined => {
  const category = guideCategories.find(cat => cat.slug === categorySlug);
  if (!category) return undefined;
  
  // Create a copy with navigation metadata
  const processedCategory: GuideCategoryWithMeta = {
    ...category,
    navigation: category.guides.map((guide, index) => {
      const nextGuide = category.guides[index + 1];
      return {
        title: guide.title,
        slug: guide.slug,
        current: guide.slug === currentSlug,
        ...(nextGuide ? { next: nextGuide.slug } : {})
      };
    })
  };
  
  return processedCategory;
};

// Featured guides to highlight
export const featuredGuides: Guide[] = [
  {
    title: "What is Off-Grid Living?",
    description: "An introduction to the concept, benefits, and challenges of living off the grid",
    slug: "what-is-off-grid-living",
    categorySlug: "getting-started",
    category: "Getting Started",
    readTime: "10 min read",
    level: "Beginner",
    lastUpdated: "March 15, 2023",
    image: "/assets/guides/getting-started/off-grid-cabin.jpeg",
    sections: [
      { id: "introduction", title: "Introduction" },
      { id: "definition", title: "What Does Off-Grid Mean?" },
      { id: "benefits", title: "Benefits of Off-Grid Living" },
      { id: "challenges", title: "Challenges to Consider" },
      { id: "types", title: "Types of Off-Grid Living" },
      { id: "resources", title: "Resources & Next Steps" },
    ],
    featured: true,
  },
  {
    title: "Key Considerations Before Going Off-Grid",
    description: "Essential factors to evaluate before making the transition to an off-grid lifestyle",
    slug: "key-considerations",
    categorySlug: "getting-started",
    category: "Getting Started",
    readTime: "8 min read",
    level: "Beginner",
    image: "/assets/guides/getting-started/off-grid-essentials.jpeg",
    featured: true,
  },
  // ...existing featured guides...
]

// Updated helper functions to be generic across all categories
export function findGuideBySlug(categorySlug: string, guideSlug: string): Guide | undefined {
  // Search the guide categories matching the given categorySlug and guideSlug.
  for (const cat of guideCategories) {
    // If a categorySlug was provided, filter by it; otherwise check all categories.
    if (categorySlug && cat.slug !== categorySlug) continue;
    const guide = cat.guides.find(g => g.slug === guideSlug);
    if (guide) return guide;
  }
  return undefined;
}

export function getRelatedGuides(currentGuide: Guide, limit: number = 3): Guide[] {
  // First, try to get guides from the same category.
  const sameCategory = guideCategories
    .find(cat => cat.slug === currentGuide.categorySlug)?.guides
    .filter(guide => guide.slug !== currentGuide.slug) || []
  
  let result = sameCategory.slice(0, limit);

  // If not enough, add featured guides first (excluding currentGuide)
  if (result.length < limit) {
    const featuredToAdd = featuredGuides
      .filter(guide => guide.slug !== currentGuide.slug && !result.some(g => g.slug === guide.slug))
      .slice(0, limit - result.length);
    result = [...result, ...featuredToAdd];
  }
  
  // If still not enough, collect guides globally.
  if (result.length < limit) {
    const otherGuides = guideCategories
      .flatMap(cat => cat.guides)
      .filter(guide => guide.slug !== currentGuide.slug && !result.some(g => g.slug === guide.slug))
      .slice(0, limit - result.length);
    result = [...result, ...otherGuides];
  }
  
  return result.slice(0, limit);
}

// Helper function to get guide navigation data
export function getGuideNavigation(categorySlug: string, currentSlug: string) {
  const category = processCategoryNavigation(categorySlug, currentSlug);
  return category?.navigation || [];
}

// Helper to find the next and previous guides
export function getAdjacentGuides(categorySlug: string, currentSlug: string) {
  const navigation = getGuideNavigation(categorySlug, currentSlug);
  const currentIndex = navigation.findIndex(item => item.slug === currentSlug);
  
  return {
    prevItem: currentIndex > 0 ? navigation[currentIndex - 1] : null,
    nextItem: currentIndex >= 0 && navigation[currentIndex].next
      ? navigation.find(item => item.slug === navigation[currentIndex].next)
      : null
  };
}