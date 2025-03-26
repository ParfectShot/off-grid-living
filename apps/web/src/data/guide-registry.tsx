import { lazy } from 'react';
import { Guide } from './guides';

// Create a type for the guide content component
export type GuideContentComponent = React.ComponentType;

// Lazy load guide content components to improve performance
const WhatIsOffGridLivingContent = lazy(() => import('../data/guide-content/what-is-off-grid-living').then(module => ({ default: module.WhatIsOffGridLivingContent })));
const KeyConsiderationsContent = lazy(() => import('../data/guide-content/key-considerations').then(module => ({ default: module.KeyConsiderationsContent })));
const StepByStepApproachContent = lazy(() => import('../data/guide-content/step-by-step-approach').then(module => ({ default: module.StepByStepApproachContent })));
const CommonQuestionsContent = lazy(() => import('../data/guide-content/common-questions').then(module => ({ default: module.CommonQuestionsContent })));

// Registry mapping slugs to their content components
export const guideContentRegistry: Record<string, GuideContentComponent> = {
  "what-is-off-grid-living": WhatIsOffGridLivingContent,
  "key-considerations": KeyConsiderationsContent,
  "step-by-step-approach": StepByStepApproachContent,
  "common-questions": CommonQuestionsContent,
  // Add new guides here as they are created
};

// Helper function to get guide content component by slug
export function getGuideContent(slug: string): GuideContentComponent | null {
  return guideContentRegistry[slug] || null;
}

// Function to generate navigation data for a category's guides
export function generateGuideNavigation(guides: Guide[]) {
  return guides.map((guide, index) => {
    const nextGuide = guides[index + 1];
    return {
      title: guide.title,
      slug: guide.slug,
      // Set next property if there's a next guide
      ...(nextGuide ? { next: nextGuide.slug } : {})
    };
  });
}
