import React from 'react';
import { GuideContentComponent } from '~/features/guides/guide-content/guide-registry';
import { Link } from '@tanstack/react-router';
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import {
  Calculator,
  Zap,
  Battery,
  Lightbulb,
  ArrowRight,
  Sun,
  Clock,
  CheckSquare,
} from "lucide-react";

export const AssessingPowerNeedsContent: GuideContentComponent = () => {
  return (
    <div className="space-y-8">
      <p className="text-xl text-muted-foreground">
        Before you even think about specific panels or batteries, you MUST accurately determine how much power you actually need. This is arguably the <em>most critical</em> step in designing your <strong>off-grid solar system</strong> or hybrid system.
      </p>

      {/* Identifying Your Energy Consumption */}
      <section id="identifying-energy-consumption" className="scroll-mt-20 space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Identifying Your Energy Consumption</h2>
        <p>
          This requires careful thought and investigation. Be meticulous!
        </p>

        <div className="bg-muted p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-green-600 flex-shrink-0" />
            Step 1: List Everything
          </h3>
          <p className="mb-4">
            Create a comprehensive inventory of <em>every single</em> appliance, light, tool, and electronic device that will draw power. Think room by room. Include easily forgotten items like phone chargers, laptops, modems/routers, fans, pumps (well, septic), and any intermittent loads.
          </p>
          {/* Optionally, add a more detailed list or link to a checklist */}
        </div>

        <div className="bg-muted p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
             <Zap className="h-5 w-5 text-green-600 flex-shrink-0" />
             Step 2: Estimate Usage
          </h3>
          <p className="mb-4">
            For each item on your list, find or estimate:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Wattage (W):</strong> How much power it consumes when actively running. Usually found on a label or manual. Look up typical wattages if needed.
            </li>
            <li>
              <strong>Daily Runtime (Hours):</strong> Realistically estimate daily usage hours. Be honest! Underestimating is common.
            </li>
          </ul>
           <div className="mt-4 bg-background p-3 rounded-md border">
            <p className="text-sm text-muted-foreground">
              <Lightbulb className="inline-block h-4 w-4 mr-1 text-yellow-500" />
              <strong>Tip:</strong> Use a power meter (like a Kill-A-Watt) to measure actual consumption for accuracy.
            </p>
          </div>
        </div>

        <div className="bg-muted p-6 rounded-lg border">
           <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-600 flex-shrink-0" />
              Step 3: Consider Seasonal Variations
          </h3>
          <p className="mb-4">
            Your energy needs might fluctuate significantly. Consider summer vs. winter usage (fans/AC vs. heaters/pumps). Design based on the period of <strong>highest demand</strong> (often winter).
          </p>
        </div>
      </section>

      {/* Calculating Total Energy Requirements */}
      <section id="calculating-energy-requirements" className="scroll-mt-20 space-y-6 pt-6 border-t">
        <h2 className="text-3xl font-bold tracking-tight">Calculating Total Energy Requirements</h2>
        <p>
          Now, turn your list into numbers.
        </p>

        <div className="space-y-4">
          <Card>
             <CardHeader>
               <CardTitle className="text-lg">1. Daily Energy per Item (Watt-hours - Wh)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">
                Multiply Wattage by daily Runtime:
              </p>
              <div className="bg-muted p-3 rounded-md text-center font-medium text-sm border">
                Watts &times; Hours = Watt-hours
              </div>
              <p className="mt-2 text-sm">
                <strong>Example:</strong> A 15W LED light used for 6 hours/day consumes 15 W &times; 6 h = 90 Wh per day.
              </p>
            </CardContent>
          </Card>

          <Card>
             <CardHeader>
                <CardTitle className="text-lg">2. Total Daily Energy (kWh)</CardTitle>
             </CardHeader>
            <CardContent>
              <p className="mb-2">
                Sum the daily Watt-hours (Wh) for <em>all</em> items. Convert to kilowatt-hours (kWh) if preferred (1 kWh = 1000 Wh).
              </p>
              <p className="font-medium text-sm">
                This daily kWh value is the foundation for sizing your solar array and battery bank.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
               <CardTitle className="text-lg">3. Peak Load (Watts - W)</CardTitle>
             </CardHeader>
            <CardContent>
              <p className="mb-2">
                Determine the maximum power needed at any single moment by summing the wattages of items that could run concurrently (e.g., microwave + pump + toaster).
              </p>
              <p className="font-medium text-sm">
                This peak load figure is crucial for sizing your inverter.
              </p>
            </CardContent>
          </Card>
        </div>

         <p className="text-sm text-muted-foreground pt-4">
          Calculating your load is often iterative. You might adjust appliance choices or habits. Our calculator can help.
        </p>
        <div className="bg-green-50 p-6 rounded-lg border">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-green-600 flex-shrink-0" />
            Try the Home Load Calculator
            </h3>
          <p className="mb-4 text-sm">
            Estimate your daily energy consumption and peak load based on common appliances.
          </p>
          <Link to="/calculators/home-load">
            <Button className="bg-green-600 hover:bg-green-700 text-sm">
              Go to Calculator
              <Calculator className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
         <p className="text-sm text-muted-foreground">
           <em>[Note: While kWh is standard, local conventions in India might use 'Units' where 1 Unit = 1 kWh. This will be clarified.]</em>
         </p>
      </section>

      {/* Future-Proofing Your System */}
      <section id="future-proofing" className="scroll-mt-20 space-y-4 pt-6 border-t">
        <h2 className="text-3xl font-bold tracking-tight">Future-Proofing Your System</h2>
        <p>
          Think beyond today! Slightly oversizing initially is often more cost-effective than complex upgrades later.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Consider Future Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Family growth/more occupants</li>
                <li>New significant loads (workshop, EV charger, AC)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Account for System Realities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Battery capacity degradation</li>
                <li>Long-term system inefficiencies</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted p-4 rounded-lg border">
          <p className="font-medium text-sm">
            <Lightbulb className="inline-block h-4 w-4 mr-1 text-yellow-500" />
            <strong>Recommendation:</strong> Aim for at least <strong>10-25% extra capacity</strong> beyond current needs as a buffer.
          </p>
        </div>
      </section>

      {/* Example Calculation - Simplified for brevity, assuming full table is complex */}
      <section id="example-calculation" className="scroll-mt-20 space-y-4 pt-6 border-t">
        <h2 className="text-3xl font-bold tracking-tight">Example Calculation</h2>
        <p>
          A simplified load assessment for a small cabin helps illustrate the process:
        </p>
         <Card className="my-4">
            <CardHeader>
                <CardTitle className="text-lg">Sample Load Table (Summary)</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm">Total Daily Energy: ~3.2 kWh</p>
                <p className="text-sm">Estimated Peak Load: ~1.1 kW (excluding surges)</p>
                <p className="text-sm text-muted-foreground mt-2">See full table in downloadable worksheet or calculator.</p>
            </CardContent>
         </Card>

         <div className="bg-green-50 p-6 rounded-lg mt-4 border">
          <h3 className="font-semibold mb-2">What's Next?</h3>
          <p className="mb-4 text-sm">
            With these calculations, we now have the foundation for sizing components like solar arrays, battery banks, and inverters, which are covered in upcoming guides.
          </p>
        </div>
      </section>

    </div>
  );
};
