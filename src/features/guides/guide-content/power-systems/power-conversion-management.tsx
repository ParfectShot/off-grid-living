import React from 'react';
import { GuideContentComponent } from '~/features/guides/guide-content/guide-registry';

// Content generated from ComprehensiveGuidetoOffGridPowerSystems.html
// Section V: Power Conversion and Management

export const PowerConversionManagementContent: GuideContentComponent = () => {
  return (
    <div className="space-y-6">
      <p className="text-lg text-muted-foreground">
        These components are the brains and muscle of the system, managing the flow and form of electricity.
      </p>

      {/* Subsection A: Inverters */}
      <section id="inverters" className="space-y-4 pt-4">
        <h3 className="text-2xl font-semibold">A. Inverters</h3>
        <p>
          The <strong>inverter</strong> is a critical device that converts the low-voltage DC power stored in your batteries (e.g., 12V, 24V, 48V DC) into standard AC power (e.g., 120V or 230V AC at 50Hz or 60Hz) compatible with your household appliances.
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>DC to AC Conversion:</strong> It electronically changes the Direct Current (constant flow in one direction) into Alternating Current (flow rapidly reverses direction) at the correct voltage and frequency.
          </li>
          <li>
            <strong>Types of Inverters:</strong> The quality of the AC output waveform is key:
            <ul className="list-circle space-y-1 pl-6 mt-2">
              <li><strong>Pure Sine Wave (PSW):</strong> Produces a smooth, clean AC waveform identical to or even better than the power supplied by the utility grid. <strong>Is a Pure Sine Wave inverter necessary?</strong> Yes, for most modern applications. They are essential for sensitive electronics (computers, TVs, audio equipment), appliances with motors (refrigerators, pumps, fans, power tools), medical equipment, and anything with an AC adapter. Using anything else can cause malfunctions, noise, overheating, or permanent damage. PSW inverters are the standard choice for reliable <strong>off-grid power systems</strong>.</li>
              <li><strong>Modified Sine Wave (MSW):</strong> Produces a "blocky," stepped approximation of an AC sine wave. These are cheaper but the lower quality power can cause problems. Some simple resistive loads (like basic incandescent bulbs or simple heating elements) might tolerate it, but motors may run hotter and less efficiently, electronics can buzz or malfunction, and some devices simply won't work or could be damaged. Generally <em>not recommended</em> for powering a whole house or sensitive loads.</li>
            </ul>
          </li>
          <li>
            <strong>Sizing Your Inverter:</strong> The inverter must be sized based on two key ratings:
            <ul className="list-circle space-y-1 pl-6 mt-2">
              <li><strong>Continuous Output (Watts):</strong> Must be higher than your calculated <strong>Peak Load</strong> (from Step II) – the maximum power draw of all appliances running simultaneously.</li>
              <li><strong>Surge Capacity (Watts):</strong> The ability to handle brief, high power demands when certain appliances start up (especially motors like pumps or refrigerators). Ensure the surge rating meets the startup requirements of your largest loads.</li>
            </ul>
          </li>
          <li>
            <strong>Hybrid Inverters / Inverter/Chargers:</strong> Many modern <strong>off-grid inverters</strong> are sophisticated devices that combine multiple functions:
            <ul className="list-decimal space-y-1 pl-6 mt-2">
              <li>DC to AC Inverter</li>
              <li>AC Battery Charger (to charge batteries from a generator or grid connection)</li>
              <li>Automatic Transfer Switch (to switch between battery/inverter power and generator/grid power)</li>
              <li>Some even integrate an MPPT solar charge controller (<strong>All-in-One Inverters</strong>).</li>
            </ul>
          </li>
           <li>
             <strong>Combining Multiple Inverters:</strong> For systems with very high power demands (large homes, workshops), compatible inverters can often be "stacked" or paralleled to increase the total AC output capacity and potentially provide multi-phase power (e.g., 120/240V split-phase in North America).
          </li>
        </ul>
      </section>

      {/* Subsection B: Charge Controllers */}
      <section id="charge-controllers" className="space-y-4 pt-4 border-t mt-6">
        <h3 className="text-2xl font-semibold">B. Charge Controllers</h3>
        <p>
          As detailed under Solar (Section III.A), <strong>charge controllers</strong> are non-negotiable for protecting your batteries and optimizing charging from DC sources like solar, wind, or hydro.
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Recap PWM vs. MPPT:</strong>
            <ul className="list-circle space-y-1 pl-6 mt-2">
              <li><strong>PWM:</strong> Simple, low-cost, best for small systems with matched panel/battery voltages. Less efficient power harvesting.</li>
              <li><strong>MPPT:</strong> More complex, higher cost, significantly more efficient power harvesting (especially with voltage differences or in variable conditions). The standard for optimizing performance in most off-grid systems.</li>
            </ul>
          </li>
          <li>
            <strong>Sizing and Selection:</strong> Crucial factors include matching the system voltage (12V, 24V, 48V), ensuring the controller can handle the maximum current (Amps) from the generation source, and respecting the maximum input voltage (Voc) limit from the source (especially solar panels in cold weather). Always choose MPPT for best performance unless budget constraints for a very small system dictate otherwise.
          </li>
        </ul>
      </section>
    </div>
  );
}; 