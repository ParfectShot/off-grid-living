import React from 'react';
import { GuideContentComponent } from '~/features/guides/guide-content/guide-registry';
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card';
import { ChevronRight, Sun, Wind, Droplets, Zap, Battery } from 'lucide-react';

// Content generated from ComprehensiveGuidetoOffGridPowerSystems.html
// Section I: Introduction to Off-Grid Power Systems

export const IntroductionToOffGridPowerSystemsContent: GuideContentComponent = () => {
  return (
    <div className="space-y-8">
      {/* Introduction Paragraph */}
      <p className="text-xl text-muted-foreground">
        Welcome to the world of energy independence! This guide will walk you through the essentials of designing, understanding, and implementing your own <strong>off-grid power system</strong>. Whether you're dreaming of a remote cabin, seeking resilience against grid failures, or aiming for a sustainable lifestyle using <strong>renewable energy solutions</strong>, mastering your power system is key.
      </p>

      {/* H3: What are Off-Grid Power Systems? */}
      <section id="what-are-off-grid-systems" className="space-y-4 scroll-mt-20">
        <h2 className="text-3xl font-bold tracking-tight">What are Off-Grid Power Systems?</h2>
        <p>
          An off-grid power system, also known as a standalone power system, operates entirely independently from the traditional electrical utility grid.
        </p>
        <p>
          <strong>Definition:</strong> It involves generating your own electricity on-site (primarily through renewable sources) and storing it, typically in a <strong>battery bank</strong>, for use whenever needed, day or night.
        </p>
        <p>
          <strong>Goal:</strong> The primary aim is <strong>energy independence</strong> – freedom from utility bills, power outages, grid infrastructure limitations, and gaining control over your energy source.
        </p>

        {/* Key Benefits Box (Adapted from reference) */}
        <div className="bg-muted p-6 rounded-lg my-6 border">
          <h3 className="text-lg font-semibold mb-4">Key Benefits of Off-Grid Power Systems:</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <ChevronRight className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
              <span><strong>Energy Independence:</strong> No reliance on utility companies.</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
              <span><strong>Reliability:</strong> Protection from grid outages.</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
              <span><strong>Environmental Benefits:</strong> Use of renewable energy.</span>
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
              <span><strong>Remote Location Viability:</strong> Power anywhere.</span>
            </li>
             <li className="flex items-start gap-2">
              <ChevronRight className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
              <span><strong>Long-term Cost Savings:</strong> Potential elimination of utility bills.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Common Power Sources Section */}
      <section id="common-power-sources" className="space-y-4 scroll-mt-20 pt-6 border-t">
         <h2 className="text-3xl font-bold tracking-tight">Common Power Sources</h2>
         <p>Electricity is typically generated using sources like:</p>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center gap-2">
                 <Sun className="h-5 w-5 text-green-600" />
                 <CardTitle className="text-lg">Solar Panels (PV)</CardTitle>
              </CardHeader>
              <CardContent><p className="text-sm">Convert sunlight directly into DC electricity. The cornerstone of most modern systems.</p></CardContent>
            </Card>
             <Card>
              <CardHeader className="pb-2 flex flex-row items-center gap-2">
                 <Wind className="h-5 w-5 text-green-600" />
                 <CardTitle className="text-lg">Wind Turbines</CardTitle>
              </CardHeader>
              <CardContent><p className="text-sm">Harness wind energy, often complementing solar.</p></CardContent>
            </Card>
             <Card>
              <CardHeader className="pb-2 flex flex-row items-center gap-2">
                 <Droplets className="h-5 w-5 text-green-600" />
                 <CardTitle className="text-lg">Micro-Hydro</CardTitle>
              </CardHeader>
              <CardContent><p className="text-sm">Utilize flowing water for consistent power if available.</p></CardContent>
            </Card>
             <Card>
              <CardHeader className="pb-2 flex flex-row items-center gap-2">
                 <Zap className="h-5 w-5 text-green-600" />
                 <CardTitle className="text-lg">Generators</CardTitle>
              </CardHeader>
              <CardContent><p className="text-sm">Fuel-powered backup for reliability during low renewable generation.</p></CardContent>
            </Card>
          </div>
      </section>

       {/* Energy Storage Section */}
       <section id="energy-storage" className="space-y-4 scroll-mt-20 pt-6 border-t">
         <h2 className="text-3xl font-bold tracking-tight">Energy Storage</h2>
          <p>
          Since renewable sources like solar and wind are intermittent, <strong>battery storage</strong> is crucial. Batteries store excess energy generated during peak production times (e.g., sunny days) for later use (e.g., nighttime, cloudy days).
          </p>
          {/* Maybe add battery icon here or link to battery guide */}
       </section>

       {/* Power Conversion & Management Section */}
       <section id="power-conversion" className="space-y-4 scroll-mt-20 pt-6 border-t">
         <h2 className="text-3xl font-bold tracking-tight">Power Conversion &amp; Management</h2>
         <p>Key components manage the electricity flow and make it usable:</p>
         <div className="space-y-4 my-4">
            <div className="flex items-start gap-4 border p-4 rounded-lg">
                <Battery className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                    <h4 className="font-semibold">Inverters</h4>
                    <p className="text-sm text-muted-foreground">Convert DC power from batteries/panels to AC power for appliances.</p>
                </div>
            </div>
             <div className="flex items-start gap-4 border p-4 rounded-lg">
                <Zap className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                    <h4 className="font-semibold">Charge Controllers</h4>
                    <p className="text-sm text-muted-foreground">Protect batteries from overcharging and optimize power flow from sources.</p>
                </div>
            </div>
         </div>
       </section>

      {/* H2: Why Understanding Power Systems is Crucial for Off-Grid Living */}
      <section id="why-understanding" className="space-y-4 scroll-mt-20 pt-6 border-t">
        <h2 className="text-3xl font-bold tracking-tight">Why Understanding Power Systems is Crucial</h2>
        <p>
          A well-designed and understood power system is the heart of a functional and comfortable off-grid home. Miscalculations or misunderstandings can lead to frustration and unexpected costs.
        </p>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <Card>
                <CardHeader><CardTitle className="text-lg">Reliability</CardTitle></CardHeader>
                <CardContent><p className="text-sm">Ensures consistent energy for essential needs.</p></CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle className="text-lg">Matching Needs</CardTitle></CardHeader>
                <CardContent><p className="text-sm">Accurate sizing prevents underperformance or wasted investment.</p></CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle className="text-lg">Budgeting</CardTitle></CardHeader>
                <CardContent><p className="text-sm">Realistic planning for equipment, maintenance, and replacement.</p></CardContent>
            </Card>
             <Card>
                <CardHeader><CardTitle className="text-lg">Safety</CardTitle></CardHeader>
                <CardContent><p className="text-sm">Understanding components and protocols is vital for safe operation.</p></CardContent>
            </Card>
         </div>
         <p className="text-sm text-muted-foreground">
           <em>[Note: Specific equipment costs and potential subsidies vary greatly by region. Indian context regarding costs, financing options, and trusted local suppliers will be added later.]</em>
         </p>
      </section>
    </div>
  );
}; 