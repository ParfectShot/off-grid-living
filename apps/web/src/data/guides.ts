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

// Guide categories with their respective guides
export const guideCategories: GuideCategory[] = [
  {
    title: "Getting Started",
    description: "Essential information for beginners looking to transition to off-grid living",
    slug: "getting-started",
    icon: "Lightbulb", // Using string name instead of JSX component
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
          { id: "challenges", title: "Challenges to Consider" },
          { id: "types", title: "Types of Off-Grid Living" },
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
      // ...existing code...
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
  // ...existing code...
]

// Helper functions
export function findGuideBySlug(categorySlug: string, guideSlug: string): Guide | undefined {
  const category = guideCategories.find(cat => cat.slug === categorySlug);
  if (!category) return undefined;
  
  return category.guides.find(guide => guide.slug === guideSlug);
}

export function getRelatedGuides(currentGuide: Guide, limit: number = 3): Guide[] {
  // First, find guides in the same category
  const sameCategory = guideCategories
    .find(cat => cat.slug === currentGuide.categorySlug)?.guides
    .filter(guide => guide.slug !== currentGuide.slug) || [];
  
  // If we have enough guides in the same category, return them
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  
  // Otherwise, add guides from other categories
  let result = [...sameCategory];
  
  // Add featured guides if needed
  if (result.length < limit) {
    const featuredToAdd = featuredGuides
      .filter(guide => 
        guide.slug !== currentGuide.slug && 
        !result.some(g => g.slug === guide.slug)
      )
      .slice(0, limit - result.length);
    
    result = [...result, ...featuredToAdd];
  }
  
  // Add more guides if still needed
  if (result.length < limit) {
    const otherGuides = guideCategories
      .flatMap(cat => cat.guides)
      .filter(guide => 
        guide.slug !== currentGuide.slug && 
        !result.some(g => g.slug === guide.slug)
      )
      .slice(0, limit - result.length);
    
    result = [...result, ...otherGuides];
  }
  
  return result.slice(0, limit);
}