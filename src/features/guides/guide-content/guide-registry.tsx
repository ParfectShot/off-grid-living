import { lazy } from 'react';
import { Guide } from '~/features/guides/types';

// Create a type for the guide content component
export type GuideContentComponent = React.ComponentType;

// --- Getting Started Guides ---
const WhatIsOffGridLivingContent = lazy(() => import('./getting-started/what-is-off-grid-living').then(module => ({ default: module.WhatIsOffGridLivingContent })));
const KeyConsiderationsContent = lazy(() => import('./getting-started/key-considerations').then(module => ({ default: module.KeyConsiderationsContent })));
const StepByStepApproachContent = lazy(() => import('./getting-started/step-by-step-approach').then(module => ({ default: module.StepByStepApproachContent })));
const CommonQuestionsContent = lazy(() => import('./getting-started/common-questions').then(module => ({ default: module.CommonQuestionsContent })));

// --- Power Systems Guides ---
const IntroductionToOffGridPowerSystemsContent = lazy(() => import('./power-systems/introduction-to-off-grid-power-systems').then(module => ({ default: module.IntroductionToOffGridPowerSystemsContent })));
const AssessingPowerNeedsContent = lazy(() => import('./power-systems/assessing-power-needs').then(module => ({ default: module.AssessingPowerNeedsContent })));
const PowerGenerationSourcesContent = lazy(() => import('./power-systems/power-generation-sources').then(module => ({ default: module.PowerGenerationSourcesContent })));
const EnergyStorageBatteriesContent = lazy(() => import('./power-systems/energy-storage-batteries').then(module => ({ default: module.EnergyStorageBatteriesContent })));
const PowerConversionManagementContent = lazy(() => import('./power-systems/power-conversion-management').then(module => ({ default: module.PowerConversionManagementContent })));
const DesignAndInstallationContent = lazy(() => import('./power-systems/design-and-installation').then(module => ({ default: module.DesignAndInstallationContent })));
const SafetyMaintenanceContent = lazy(() => import('./power-systems/safety-maintenance').then(module => ({ default: module.SafetyMaintenanceContent })));
const FaqsOffGridPowerContent = lazy(() => import('./power-systems/faqs-off-grid-power').then(module => ({ default: module.FaqsOffGridPowerContent })));
const GlossaryOffGridPowerContent = lazy(() => import('./power-systems/glossary-off-grid-power').then(module => ({ default: module.GlossaryOffGridPowerContent })));

// Registry mapping slugs to their content components
export const guideContentRegistry: Record<string, GuideContentComponent> = {
  // Getting Started
  "what-is-off-grid-living": WhatIsOffGridLivingContent,
  "key-considerations": KeyConsiderationsContent,
  "step-by-step-approach": StepByStepApproachContent,
  "common-questions": CommonQuestionsContent,
  
  // Power Systems
  "introduction-to-off-grid-power-systems": IntroductionToOffGridPowerSystemsContent,
  "assessing-your-power-needs": AssessingPowerNeedsContent,
  "power-generation-sources": PowerGenerationSourcesContent,
  "energy-storage-batteries": EnergyStorageBatteriesContent,
  "power-conversion-management": PowerConversionManagementContent,
  "design-and-installation": DesignAndInstallationContent,
  "safety-maintenance": SafetyMaintenanceContent,
  "faqs-off-grid-power": FaqsOffGridPowerContent,
  "glossary-off-grid-power": GlossaryOffGridPowerContent,
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
