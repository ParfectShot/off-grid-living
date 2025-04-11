import React from 'react';
import { GuideContentComponent } from '~/features/guides/guide-content/guide-registry';

// Content generated from ComprehensiveGuidetoOffGridPowerSystems.html
// Section VIII: Frequently Asked Questions (FAQs)

export const FaqsOffGridPowerContent: GuideContentComponent = () => {
  return (
    <div className="space-y-6">
      <p className="text-lg text-muted-foreground">
        Common questions about off-grid power systems, costs, capabilities, and requirements.
      </p>

      {/* Using definition list for Q&A format */}
      <dl className="space-y-4">
        <div id="faq-cost">
          <dt className="text-xl font-semibold">Q1: How much does a complete off-grid power system cost?</dt>
          <dd className="pl-4 text-muted-foreground">
            A: Costs vary <em>wildly</em> depending on your energy needs (system size), component choices (battery type, brand quality), location (installation costs, shipping), and whether you DIY or hire professionals. Small cabin systems might start in the low thousands of dollars/euros (or equivalent lakhs of Rupees), while large residential systems can easily cost tens of thousands. Budgeting accurately based on your load assessment (Step II) is crucial. <em>[Note: Indian market specifics regarding component costs, reliable brands, and potential government incentives will be added later.]</em>
          </dd>
        </div>

        <div id="faq-heavy-loads">
          <dt className="text-xl font-semibold">Q2: Can I run air conditioning or electric heating off-grid?</dt>
          <dd className="pl-4 text-muted-foreground">
            A: Yes, but these are typically very heavy electrical loads. You'll need a significantly larger solar array, battery bank, and inverter to support them, which substantially increases system cost. Careful load calculation and potentially using highly efficient mini-split AC units or alternative heating sources (wood, propane) is often recommended.
          </dd>
        </div>

        <div id="faq-battery-lifespan">
          <dt className="text-xl font-semibold">Q3: How long do off-grid batteries last?</dt>
          <dd className="pl-4 text-muted-foreground">
            A: Lifespan depends heavily on the battery type, quality, how deeply they are cycled (DoD), operating temperatures, and how well they are maintained (especially lead-acid). Typical ranges: Flooded Lead-Acid (3-7 years), AGM/Gel Lead-Acid (5-10 years), LiFePO4 Lithium (10-20+ years or thousands of cycles).
          </dd>
        </div>

        <div id="faq-solar-wind-hydro">
          <dt className="text-xl font-semibold">Q4: Is solar or wind better for my off-grid system?</dt>
          <dd className="pl-4 text-muted-foreground">
            A: It depends entirely on your location's resources. Solar is more predictable and widely applicable. Wind requires specific site conditions (consistent, strong winds). Often, a <strong>hybrid solar and wind system</strong> provides the best reliability by leveraging different weather patterns. Micro-hydro is best if you have the water resource.
          </dd>
        </div>

        <div id="faq-permitting">
          <dt className="text-xl font-semibold">Q5: Do I need a permit to install an off-grid power system?</dt>
          <dd className="pl-4 text-muted-foreground">
            A: Almost certainly yes, for electrical work and potentially structural work (panel mounting, turbine towers). Regulations vary greatly by location (country, state, local municipality). Check with your local building/planning department <em>before</em> starting work. <em>[Note: Specific permitting processes and relevant authorities in India will be detailed later.]</em>
          </dd>
        </div>
      </dl>
    </div>
  );
}; 