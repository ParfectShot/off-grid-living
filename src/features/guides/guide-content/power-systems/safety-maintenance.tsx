import React from 'react';
import { GuideContentComponent } from '~/features/guides/guide-content/guide-registry';
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card';
import { Lightbulb, AlertTriangle, Zap, Wrench } from 'lucide-react';

// Content generated from ComprehensiveGuidetoOffGridPowerSystems.html
// Section VII: Safety and Maintenance of Off-Grid Power Systems

export const SafetyMaintenanceContent: GuideContentComponent = () => {
  return (
    <div className="space-y-8">
      <p className="text-xl text-muted-foreground">
        An off-grid system requires ongoing attention to ensure safe operation and longevity.
      </p>

      {/* Essential Safety Precautions */}
      <section id="essential-safety-precautions" className="scroll-mt-20 space-y-6">
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <AlertTriangle className="h-7 w-7 text-destructive" />
          Essential Safety Precautions
        </h2>
        <ul className="list-disc space-y-3 pl-6">
          <li>
            <strong>Electricity Kills:</strong> Always treat circuits as live unless proven otherwise with a multimeter. Use insulated tools. Understand disconnect switches before working. Avoid working alone on high-voltage components.
          </li>
          <li>
            <strong>Battery Safety:</strong>
            <ul className="list-circle space-y-1 pl-6 mt-2">
              <li>Wear safety glasses and appropriate gloves, especially near lead-acid batteries (acid risk).</li>
              <li>Ensure excellent ventilation for flooded lead-acid batteries (explosive hydrogen gas). Keep sparks/flames away.</li>
              <li>Follow manufacturer guidelines for lithium batteries. Never puncture or short-circuit them.</li>
            </ul>
          </li>
          <li>
            <strong>Generator Safety:</strong> Operate generators outdoors only, far from windows/vents (deadly CO). Handle fuel safely. Allow cooldown before refueling.
          </li>
        </ul>
         <Card className="border-destructive bg-destructive/10">
          <CardHeader>
            <CardTitle className="text-lg text-destructive flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Critical Warning!
              </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-destructive">
              If you are unsure about any aspect of electrical work or safety procedures, <strong>STOP</strong> and consult a qualified electrician or experienced off-grid system installer. Mistakes can be fatal or cause serious fires.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Routine Maintenance Tasks */}
      <section id="routine-maintenance" className="scroll-mt-20 space-y-6 pt-6 border-t">
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Wrench className="h-7 w-7 text-green-600" />
            Routine Maintenance Tasks
        </h2>
        <p>
          Regular checks prevent small issues from becoming big problems.
        </p>
        <ul className="list-disc space-y-3 pl-6">
          <li>
            <strong>Connections:</strong> Periodically (e.g., every 6-12 months) inspect all electrical connections (esp. high-current DC) for tightness and signs of corrosion/overheating.
          </li>
          <li>
            <strong>Equipment Cleaning:</strong> Keep solar panels reasonably clean (rain helps, manual cleaning may be needed). Ensure vents on inverters, controllers, and generators are clear.
          </li>
          <li>
            <strong>Battery Maintenance:</strong>
            <ul className="list-circle space-y-1 pl-6 mt-2">
              <li><strong>Flooded Lead-Acid:</strong> Regularly check electrolyte levels (top up ONLY with distilled water after charging). Clean terminals. Perform periodic equalization charges. Monitor specific gravity.</li>
              <li><strong>Sealed (AGM, Gel, Lithium):</strong> Keep terminals clean. Monitor system performance (voltage/SoC). Lithium requires minimal physical maintenance (thanks to BMS).
              </li>
            </ul>
          </li>
          <li>
            <strong>Generator:</strong> Follow manufacturer's schedule for oil changes, filters, plugs, etc. Run under load periodically (e.g., monthly).
          </li>
        </ul>
         <div className="bg-muted p-4 rounded-lg border">
             <p className="text-sm font-medium">
                <Lightbulb className="inline-block h-4 w-4 mr-1 text-yellow-500" />
                <strong>Tip:</strong> Create a maintenance log to track checks, readings, and services performed.
             </p>
         </div>
      </section>

      {/* Troubleshooting Common Problems */}
      <section id="troubleshooting" className="scroll-mt-20 space-y-4 pt-6 border-t">
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
             <Zap className="h-7 w-7 text-blue-600" />
             Troubleshooting Common Problems
        </h2>
        <p>
          Understanding basic troubleshooting can save you a service call.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <Card>
                <CardHeader><CardTitle className="text-base">No Power / Low Voltage</CardTitle></CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Check Battery State of Charge (SoC).</li>
                        <li>Check main breakers/fuses (battery, inverter).</li>
                        <li>Check inverter status/error codes.</li>
                        <li>Check panel condition (shading, dirt).</li>
                        <li>Check charge controller status/errors.</li>
                        <li>Check connections for looseness/corrosion.</li>
                    </ul>
                </CardContent>
            </Card>
             <Card>
                <CardHeader><CardTitle className="text-base">Batteries Not Charging</CardTitle></CardHeader>
                <CardContent>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Check solar input (sunlight?).</li>
                        <li>Check panel disconnects/breakers.</li>
                        <li>Check charge controller status, settings, errors.</li>
                        <li>Check wiring (panels &rarr; controller &rarr; batteries).</li>
                    </ul>
                </CardContent>
            </Card>
             <Card>
                <CardHeader><CardTitle className="text-base">Inverter Faults/Shutdown</CardTitle></CardHeader>
                <CardContent>
                     <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Check battery voltage (too low/high?).</li>
                        <li>Check for AC overload (too many appliances?).</li>
                        <li>Check inverter error codes (refer to manual).</li>
                        <li>Check for overheating (blocked vents?).</li>
                        <li>Check AC output breakers.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
        <p className="text-sm text-muted-foreground">
            Always consult your component manuals for specific error codes and troubleshooting steps.
        </p>
      </section>
    </div>
  );
};
