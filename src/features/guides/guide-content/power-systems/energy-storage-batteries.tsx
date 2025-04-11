import React from 'react';
import { GuideContentComponent } from '~/features/guides/guide-content/guide-registry';

// Content generated from ComprehensiveGuidetoOffGridPowerSystems.html
// Section IV: Off-Grid Energy Storage (Batteries)

export const EnergyStorageBatteriesContent: GuideContentComponent = () => {
  return (
    <div className="space-y-6">
      <p className="text-lg text-muted-foreground">
        <strong>Battery storage</strong> is the linchpin of a functional off-grid system, bridging the gap between intermittent energy generation and continuous energy demand. They store excess energy for use later.
      </p>

      <ul className="list-disc space-y-3 pl-6">
        <li>
          <h4 className="text-xl font-semibold mb-1">Role of Batteries</h4>
          <p>
            To provide a stable energy reservoir, allowing you to power your home at night, during cloudy days, or whenever your energy generation sources aren't producing enough to meet your immediate needs. They smooth out the fluctuations of renewable energy.
          </p>
        </li>

        <li>
          <h4 className="text-xl font-semibold mb-1">Types of Batteries for Off-Grid Use</h4>
          <p className="mb-2">
            The choice of battery chemistry significantly impacts system performance, lifespan, maintenance, and cost.
          </p>
          <ul className="list-circle space-y-2 pl-6">
            <li>
              <strong>Lead-Acid:</strong> The traditional workhorse, known for lower upfront cost but with drawbacks.
              <ul className="list-square space-y-1 pl-6 mt-1">
                <li><strong>Flooded Lead-Acid (FLA):</strong> Typically the lowest cost per amp-hour initially. Require regular maintenance (checking electrolyte levels and adding distilled water), good ventilation (release hydrogen gas during charging), and periodic "equalization" charges. Sensitive to deep discharges.</li>
                <li><strong>Absorbed Glass Mat (AGM):</strong> Sealed Lead-Acid (SLA) type. Maintenance-free (no watering), spill-proof, and can handle higher charge/discharge rates than FLA. More expensive than FLA. Still sensitive to deep discharge.</li>
                <li><strong>Gel:</strong> Another SLA type. Electrolyte is in a gel form. Very good deep-cycle performance and wide temperature tolerance, maintenance-free. Often the most expensive lead-acid option.</li>
              </ul>
            </li>
            <li>
              <strong>Lithium-ion (specifically LiFePO4):</strong> Rapidly becoming the preferred choice for <strong>off-grid battery storage</strong> due to numerous advantages, despite a higher initial cost.
              <ul className="list-square space-y-1 pl-6 mt-1">
                <li><strong>LiFePO4 (Lithium Iron Phosphate):</strong> This specific lithium chemistry is favored for stationary storage because it's inherently safer, more stable, offers a very long cycle life (thousands of cycles vs. hundreds for lead-acid), allows for much deeper discharges (80-90%+ vs. 50% for lead-acid), is lighter weight, and requires virtually no maintenance. The higher upfront cost is often offset by the longer lifespan and better performance, leading to a lower total cost of ownership.</li>
              </ul>
            </li>
          </ul>
        </li>

        <li>
          <h4 className="text-xl font-semibold mb-1">Battery Capacity and Sizing</h4>
          <ul className="list-circle space-y-1 pl-6">
            <li><strong>Capacity:</strong> Measured in Amp-hours (Ah) at a specific voltage, or more usefully, in kilowatt-hours (kWh) which represents total energy storage.</li>
            <li>
              <strong>Sizing:</strong> This is crucial. The battery bank needs enough usable capacity to:
              <ol className="list-decimal space-y-1 pl-6 mt-1">
                <li>Cover your total daily energy needs (kWh from Step II).</li>
                <li>Provide power for a predetermined number of "days of autonomy" – the number of days the system can run with <em>zero</em> energy input (e.g., consecutive very cloudy/calm days). Typically 1-3 days autonomy is recommended, depending on climate and system criticality.</li>
                <li>Account for the battery type's recommended <strong>Depth of Discharge (DoD)</strong>. You cannot use 100% of a battery's rated capacity without damaging it. Lead-acid batteries should generally only be discharged to 50% DoD for good lifespan. LiFePO4 batteries can typically handle 80-90% DoD or even more, meaning you need less <em>total</em> capacity for the same <em>usable</em> capacity compared to lead-acid.</li>
              </ol>
            </li>
          </ul>
        </li>

        <li>
          <h4 className="text-xl font-semibold mb-1">Maintenance and Lifespan</h4>
          <ul className="list-circle space-y-1 pl-6">
            <li><strong>Lead-Acid:</strong> Requires diligent maintenance (watering for FLA, terminal cleaning, ensuring proper charge cycles, equalization for FLA) to maximize lifespan, which is typically 3-7 years depending on type and usage.</li>
            <li><strong>Lithium (LiFePO4):</strong> Requires minimal physical maintenance (keep terminals clean). Lifespan is primarily determined by cycle count and operating conditions (temperature). High-quality LiFePO4 batteries can last 10-20 years or 3000-7000+ cycles. A crucial component is the integrated <strong>Battery Management System (BMS)</strong>, which protects the cells from overcharge, over-discharge, extreme temperatures, and performs cell balancing to ensure longevity.</li>
          </ul>
        </li>
        
        <li>
          <h4 className="text-xl font-semibold mb-1" id="handling-full-batteries">What Happens When Batteries Are Fully Charged?</h4>
           <p>
            As mentioned, the charge controller (from solar, wind, hydro) or battery charger (from generator) detects the full <strong>State of Charge (SoC)</strong> and tapers off, then stops the charging current to prevent damage. The BMS in lithium batteries provides an additional layer of protection.
           </p>
        </li>
      </ul>
    </div>
  );
}; 