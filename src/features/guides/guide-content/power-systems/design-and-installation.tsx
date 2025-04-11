import React from 'react';
import { GuideContentComponent } from '~/features/guides/guide-content/guide-registry';

// Content generated from ComprehensiveGuidetoOffGridPowerSystems.html
// Section VI: Designing and Installing Your Off-Grid Power System

export const DesignAndInstallationContent: GuideContentComponent = () => {
  return (
    <div className="space-y-6">
      <p className="text-lg text-muted-foreground">
        Bringing all the individual components together into a safe, efficient, and reliable working system.
      </p>

      <ul className="list-disc space-y-3 pl-6">
        <li>
          <h4 className="text-xl font-semibold mb-1" id="system-architecture-voltage">System Architecture and Voltage</h4>
          <p className="mb-2">
            This refers to how the components are interconnected. A common setup is: Solar Panels -&gt; Combiner Box (with fuses/breakers) -&gt; Charge Controller -&gt; Main DC Disconnect/Breaker -&gt; Battery Bank -&gt; Main Battery Fuse/Breaker -&gt; Inverter -&gt; AC Breaker Panel -&gt; AC Loads. Generators typically connect to the AC input of the inverter/charger or through a dedicated battery charger. The choice of <strong>system voltage</strong> (12V, 24V, or 48V DC) is a key design decision:
          </p>
          <ul className="list-circle space-y-1 pl-6">
            <li><strong>12V:</strong> Simple, common for small systems (RVs, cabins), but requires very thick, expensive cables for higher power due to high current.</li>
            <li><strong>24V:</strong> Good compromise for small to medium systems. Allows smaller wire sizes than 12V.</li>
            <li><strong>48V:</strong> Generally preferred for medium to large residential systems. Allows for smaller, less expensive wiring (due to lower current for the same power), often increases inverter and charge controller efficiency, and offers more component choices for higher power levels.</li>
          </ul>
        </li>

        <li>
          <h4 className="text-xl font-semibold mb-1" id="wiring-connections">Wiring and Connections</h4>
          <p className="mb-2">
            Proper wiring is critical for safety and performance.
          </p>
          <ul className="list-circle space-y-1 pl-6">
            <li>Use appropriately sized <strong>wire gauges</strong> (e.g., AWG or mm&sup2;) based on the maximum current (Amps) the wire will carry and the length of the wire run to minimize <strong>voltage drop</strong> (power loss in the wire). There are online calculators and charts for this.</li>
            <li>Use high-quality connectors (lugs, terminals) properly crimped or secured.</li>
            <li>Ensure all connections are tight and secure – loose connections cause heat, power loss, and fire hazards.</li>
            <li>Follow best practices and local electrical codes for wiring methods (e.g., conduit use, wire types).</li>
          </ul>
        </li>

        <li>
          <h4 className="text-xl font-semibold mb-1" id="safety-devices">Safety Devices</h4>
          <p className="mb-2">
            Non-negotiable for protecting equipment and preventing fires or shock.
          </p>
          <ul className="list-circle space-y-1 pl-6">
            <li><strong>Fuses and Circuit Breakers:</strong> Provide <strong>overcurrent protection</strong> on both DC (panels, batteries, controller-inverter) and AC (inverter output, AC loads) circuits. Must be correctly sized for the wire and components they protect.</li>
            <li><strong>Disconnect Switches:</strong> Allow safe isolation of major components (solar array, battery bank, inverter) for maintenance, troubleshooting, or emergencies.</li>
          </ul>
        </li>

        <li>
          <h4 className="text-xl font-semibold mb-1" id="grounding">Grounding</h4>
          <p>
            Proper <strong>system grounding</strong> (connecting electrical components and equipment frames to the earth) is essential for safety. It protects against electrical shock hazards from ground faults and can help dissipate energy from nearby lightning strikes. Follow national and local electrical codes meticulously. <em>[Note: Specific grounding requirements and methods per Indian electrical standards (e.g., IS 3043) will be detailed in the localized version.]</em>
          </p>
        </li>

        <li>
          <h4 className="text-xl font-semibold mb-1" id="diy-vs-pro">DIY vs. Professional Installation</h4>
           <ul className="list-circle space-y-1 pl-6">
            <li><strong>DIY:</strong> Can potentially save on labor costs but requires significant research, technical skill (especially electrical), understanding of codes, proper tools, and a considerable time investment. Mistakes can be dangerous, damage expensive equipment, or void warranties.</li>
            <li><strong>Professional:</strong> Offers expertise in system design, component selection, code-compliant installation, safety assurance, and often includes warranties on workmanship. Highly recommended if you lack strong electrical knowledge or experience.</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}; 