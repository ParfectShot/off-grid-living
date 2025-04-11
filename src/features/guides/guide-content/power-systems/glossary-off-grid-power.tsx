import React from 'react';
import { GuideContentComponent } from '~/features/guides/guide-content/guide-registry';

// Content generated from ComprehensiveGuidetoOffGridPowerSystems.html
// Section IX: Glossary of Terms

export const GlossaryOffGridPowerContent: GuideContentComponent = () => {
  return (
    <div className="space-y-6">
      <p className="text-lg text-muted-foreground">
        Common terms and acronyms used when discussing off-grid power systems.
      </p>

      {/* Using definition list for terms */}
      <dl className="space-y-3">
        <div>
          <dt className="font-semibold">AC (Alternating Current)</dt>
          <dd className="pl-4 text-muted-foreground">Electricity where the current flow rapidly reverses direction. The standard form of power used by most household appliances.</dd>
        </div>
        <div>
          <dt className="font-semibold">Ah (Amp-hour)</dt>
          <dd className="pl-4 text-muted-foreground">A unit of battery capacity, representing the current (in Amps) a battery can deliver over time (in hours).</dd>
        </div>
        <div>
          <dt className="font-semibold">ATS (Automatic Transfer Switch)</dt>
          <dd className="pl-4 text-muted-foreground">A device that automatically switches electrical loads between two sources, typically between inverter power and backup generator power.</dd>
        </div>
        <div>
          <dt className="font-semibold">Battery Bank</dt>
          <dd className="pl-4 text-muted-foreground">One or more batteries connected together to provide the desired voltage and capacity for energy storage.</dd>
        </div>
        <div>
          <dt className="font-semibold">BMS (Battery Management System)</dt>
          <dd className="pl-4 text-muted-foreground">An electronic system, crucial for lithium batteries, that protects cells from overcharge, over-discharge, over-current, extreme temperatures, and performs cell balancing for optimal life and safety.</dd>
        </div>
        <div>
          <dt className="font-semibold">Charge Controller</dt>
          <dd className="pl-4 text-muted-foreground">A device regulating power flow from a DC source (like solar panels) to a battery bank.</dd>
        </div>
        <div>
          <dt className="font-semibold">DC (Direct Current)</dt>
          <dd className="pl-4 text-muted-foreground">Electricity where the current flows continuously in one direction. The type of power produced by solar panels and stored in batteries.</dd>
        </div>
        <div>
          <dt className="font-semibold">DoD (Depth of Discharge)</dt>
          <dd className="pl-4 text-muted-foreground">The percentage of a battery's total capacity that has been discharged. Limiting DoD (especially for lead-acid) extends battery life.</dd>
        </div>
        <div>
          <dt className="font-semibold">Head</dt>
          <dd className="pl-4 text-muted-foreground">In micro-hydro, the vertical distance water falls from the intake to the turbine. A key factor in power potential.</dd>
        </div>
        <div>
          <dt className="font-semibold">Inverter</dt>
          <dd className="pl-4 text-muted-foreground">A device that converts DC electricity to AC electricity.</dd>
        </div>
        <div>
          <dt className="font-semibold">kWh (Kilowatt-hour)</dt>
          <dd className="pl-4 text-muted-foreground">A standard unit of energy consumption (1 kWh = 1000 Watt-hours). Often referred to as a "Unit" in some regions like India.</dd>
        </div>
        <div>
          <dt className="font-semibold">LiFePO4 (Lithium Iron Phosphate)</dt>
          <dd className="pl-4 text-muted-foreground">A specific type of lithium-ion battery chemistry known for its safety, stability, and long cycle life, making it ideal for stationary energy storage.</dd>
        </div>
        <div>
          <dt className="font-semibold">Load</dt>
          <dd className="pl-4 text-muted-foreground">Any device that consumes electricity (lights, appliances, etc.).</dd>
        </div>
        <div>
          <dt className="font-semibold">MPPT (Maximum Power Point Tracking)</dt>
          <dd className="pl-4 text-muted-foreground">An advanced charge controller technology that optimizes power harvest from solar panels.</dd>
        </div>
        <div>
          <dt className="font-semibold">Peak Load</dt>
          <dd className="pl-4 text-muted-foreground">The maximum instantaneous power (in Watts) required by your appliances running simultaneously.</dd>
        </div>
        <div>
          <dt className="font-semibold">Peak Sun Hours</dt>
          <dd className="pl-4 text-muted-foreground">An equivalent measure of the average daily solar energy received, expressed as the number of hours that sunlight intensity would be 1000 W/m&sup2;. Used for sizing solar arrays.</dd>
        </div>
        <div>
          <dt className="font-semibold">Photovoltaic (PV) Effect</dt>
          <dd className="pl-4 text-muted-foreground">The physical process of converting light (photons) directly into electricity (voltage) in certain semiconductor materials.</dd>
        </div>
        <div>
          <dt className="font-semibold">PSW (Pure Sine Wave)</dt>
          <dd className="pl-4 text-muted-foreground">A high-quality AC waveform produced by good inverters, suitable for all appliances.</dd>
        </div>
        <div>
          <dt className="font-semibold">MSW (Modified Sine Wave)</dt>
          <dd className="pl-4 text-muted-foreground">A lower-quality, stepped AC waveform produced by cheaper inverters, potentially problematic for many devices.</dd>
        </div>
        <div>
          <dt className="font-semibold">PWM (Pulse Width Modulation)</dt>
          <dd className="pl-4 text-muted-foreground">A simpler, less efficient type of charge controller technology.</dd>
        </div>
        <div>
          <dt className="font-semibold">SoC (State of Charge)</dt>
          <dd className="pl-4 text-muted-foreground">The current charge level of a battery, expressed as a percentage of its total capacity.</dd>
        </div>
        <div>
          <dt className="font-semibold">W (Watt)</dt>
          <dd className="pl-4 text-muted-foreground">A unit of power, representing the rate at which energy is consumed or produced (Joules per second).</dd>
        </div>
      </dl>

       <p className="pt-6 border-t">
        This comprehensive guide provides a solid foundation for understanding <strong>off-grid power systems</strong>. Remember that careful planning, accurate assessment of your needs, choosing quality components, adhering to safety protocols, and proper installation are paramount for creating a reliable and long-lasting <strong>renewable energy solution</strong>. Good luck on your journey to energy independence!
      </p>
    </div>
  );
}; 