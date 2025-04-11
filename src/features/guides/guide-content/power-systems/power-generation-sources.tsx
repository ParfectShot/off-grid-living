import React from 'react';
import { GuideContentComponent } from '~/features/guides/guide-content/guide-registry';
import { Link } from '@tanstack/react-router'; // Import Link for potential internal links

// Content generated from ComprehensiveGuidetoOffGridPowerSystems.html
// Section III: Off-Grid Power Generation Sources

export const PowerGenerationSourcesContent: GuideContentComponent = () => {
  return (
    <div className="space-y-6">
      <p className="text-lg text-muted-foreground">
        Now let's explore the primary ways you'll generate your own electricity off-grid. Most systems rely heavily on renewables, often combining sources for enhanced reliability.
      </p>

      {/* Subsection A: Solar Power */}
      <section id="solar-power" className="space-y-4 pt-4">
        <h3 className="text-2xl font-semibold">A. Solar Power</h3>
        <p>
          <strong>Solar photovoltaic (PV) panels</strong> are the backbone of most modern off-grid power systems due to their increasing efficiency, falling costs, reliability, and scalability.
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>How Solar Panels Work:</strong> Solar panels are made of photovoltaic cells (typically silicon-based) that absorb photons from sunlight. This solar energy excites electrons within the cells, creating a direct flow of electricity (Direct Current or DC). This phenomenon is known as the <strong>photovoltaic effect</strong>.
          </li>
          <li>
            <strong>Types of Solar Panels:</strong>
            <ul className="list-circle space-y-1 pl-6 mt-2">
              <li><strong>Monocrystalline:</strong> Made from single-crystal silicon, offering the highest <strong>solar panel efficiency</strong> and best performance in low-light conditions. They usually have a uniform black appearance and are often slightly more expensive.</li>
              <li><strong>Polycrystalline:</strong> Made from multiple silicon crystals melted together. Slightly less efficient than mono panels but generally offer a better price point. Often recognizable by their blue, speckled appearance.</li>
              <li><strong>Thin-Film:</strong> Made by depositing thin layers of photovoltaic material onto a substrate. They are flexible and lightweight, performing relatively well in high temperatures and indirect light, but have lower overall efficiency and require more space for the same power output. Less common for primary residential power.</li>
            </ul>
          </li>
          <li>
            <strong>Sizing Your Solar Array:</strong> This involves calculating the total wattage of solar panels needed to meet your average daily energy needs (from Step II) <em>and</em> fully recharge your battery bank, accounting for system losses and available sunlight. Key factors include:
            <ul className="list-circle space-y-1 pl-6 mt-2">
              <li>Your daily energy consumption (kWh).</li>
              <li><strong>Peak Sun Hours:</strong> The average number of hours per day when sunlight intensity reaches 1000 W/square meter at your specific location (this varies significantly by geography and season, it's not just total daylight hours).</li>
              <li>Panel efficiency, shading factors, and system inefficiencies (wiring, controller, inverter losses).<br />
                 Online calculators and professional installers use this data for precise solar system sizing. {/* Placeholder for link: Our Solar System Calculator can help you estimate the array size needed based on your energy consumption and location. (Please update this link with the correct path) */}
              </li>
            </ul>
          </li>
          <li>
            <strong>Installation Considerations:</strong> Proper installation maximizes energy harvest:
            <ul className="list-circle space-y-1 pl-6 mt-2">
              <li><strong>Orientation:</strong> Panels should ideally face the equator (due South in the Northern Hemisphere, due North in the Southern Hemisphere).</li>
              <li><strong>Tilt Angle:</strong> Optimize the angle based on your latitude to capture the most direct sunlight year-round (or adjust seasonally for even better performance).</li>
              <li><strong>Shading:</strong> Critically important! Even partial shading on a small part of one panel can disproportionately reduce the output of the entire panel or string of panels. Conduct a thorough shade analysis of your site.</li>
            </ul>
          </li>
          <li>
            <strong>DIY Solar Projects:</strong> While feasible with careful research and the right skills, <strong>DIY solar installation</strong> involves working with electricity (both DC and AC) and potentially working at heights. Understand local regulations, safety protocols (especially grounding), and your own limitations before attempting. <em>[Note: Local regulations in India regarding DIY electrical work, certifications, and potential grid interconnection standards (if ever desired) will be added.]</em>
          </li>
          <li>
            <strong>Portable Solar Solutions:</strong> Smaller, <strong>portable solar panels</strong> and integrated kits are excellent for RVs, boats, camping, or providing temporary power for specific tasks.
          </li>
          <li>
            <strong>Community Discussions:</strong> Online forums (like Reddit's r/solar and r/SolarDIY) are valuable resources for practical advice, troubleshooting, and learning from the experiences of a large community involved in <strong>solar energy projects</strong>.
          </li>
          <li>
            <strong>Charge Controllers (Essential for Solar):</strong> This vital device manages the power flow from your solar panels to your batteries.
            <ul className="list-decimal space-y-1 pl-6 mt-2">
              <li>
                <strong>Function:</strong> Its primary jobs are to prevent battery overcharging (which damages batteries) and often, to prevent reverse current flow at night. Advanced controllers also optimize power harvest.
              </li>
              <li>
                <strong>Types:</strong>
                <ul className="list-alpha space-y-1 pl-6 mt-1">
                  <li><strong>PWM (Pulse Width Modulation):</strong> An older, simpler, and less expensive technology. It acts like a switch, rapidly turning on and off to regulate voltage. It's less efficient when the panel's voltage (Vmp) is significantly higher than the battery voltage, and performs less optimally in cooler temperatures. Think of it like a simple fixed gear – functional, but not always optimal. Best suited for small, simple systems where panel and battery voltages are closely matched.</li>
                  <li><strong>MPPT (Maximum Power Point Tracking):</strong> A more sophisticated and efficient technology. It actively adjusts its internal conversion to keep the solar panels operating at their maximum power point (the ideal voltage and current combination) under varying sunlight conditions. It then efficiently converts this power to the correct voltage for battery charging. Think of it like a continuously variable transmission (CVT) – always finding the sweet spot. MPPT controllers can harvest significantly more power (10-30% or more) compared to PWM, especially in cold weather, low light, or when using higher voltage panels with lower voltage battery banks. Generally the preferred choice for maximizing energy harvest in most <strong>off-grid solar systems</strong>.</li>
                </ul>
              </li>
              <li>
                <strong>Sizing:</strong> The charge controller must be rated to handle the maximum possible short-circuit current (Isc) from your solar array and the maximum open-circuit voltage (Voc) from the panels (especially considering cold temperatures, which increase voltage), as well as match your chosen system voltage (e.g., 12V, 24V, 48V).
              </li>
            </ul>
          </li>
           <li>
             <strong>When Batteries are Full:</strong> A properly sized and configured charge controller intelligently manages the situation. It will taper off the charging current as the battery reaches full <strong>State of Charge (SoC)</strong> and then stop or reduce the current to a small "float" charge (for lead-acid) to keep it topped off, preventing overcharging. The potential excess power from the panels during this time is simply not drawn by the controller.
          </li>
        </ul>
      </section>

      {/* Subsection B: Wind Power */}
      <section id="wind-power" className="space-y-4 pt-4 border-t mt-6">
        <h3 className="text-2xl font-semibold">B. Wind Power</h3>
        <p>
          If your location is blessed with consistent and adequate wind speeds, a <strong>wind turbine</strong> can be an excellent addition or primary source for your off-grid system, especially complementing solar power.
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>How Wind Turbines Work:</strong> The kinetic energy of the wind spins the turbine's blades. This rotation turns a shaft connected to a generator (or alternator), which produces DC electricity.
          </li>
          <li>
            <strong>Types of Wind Turbines:</strong>
            <ul className="list-circle space-y-1 pl-6 mt-2">
              <li><strong>Horizontal Axis (HAWT):</strong> The classic windmill design with blades rotating around a horizontal axis. Generally more efficient in smooth (laminar) wind but require placement on tall towers to access less turbulent wind and usually need to pivot to face the wind.</li>
              <li><strong>Vertical Axis (VAWT):</strong> Blades rotate around a vertical axis. They can accept wind from any direction (omnidirectional), are often quieter, and can be mounted closer to the ground, but are typically less efficient than HAWTs.</li>
            </ul>
          </li>
          <li>
            <strong>Siting Considerations:</strong> This is paramount for wind power viability. You need:
            <ul className="list-circle space-y-1 pl-6 mt-2">
              <li><strong>Adequate Wind Resource:</strong> Research average wind speeds for your specific location (local meteorological data, wind maps). Small turbines need consistent moderate winds to be effective.</li>
              <li><strong>Minimize Turbulence:</strong> Install turbines on towers high above nearby obstructions (trees, buildings) that cause turbulence, which drastically reduces efficiency and increases wear.</li>
              <li><strong>Regulations:</strong> Check local zoning ordinances regarding tower height, noise levels, and setback requirements. <em>[Note: Specific regulations regarding turbine height, noise, and placement in India will be added.]</em></li>
            </ul>
          </li>
          <li>
            <strong>Small-Scale Wind Systems:</strong> Turbines designed for residential or small <strong>off-grid wind power</strong> applications typically range from a few hundred watts to several kilowatts (kW).
          </li>
          <li>
            <strong>Integration:</strong> Wind often blows when the sun isn't shining (e.g., during storms, at night). Combining wind and solar (a hybrid system) can lead to a more consistent year-round energy supply compared to relying on a single source.
          </li>
        </ul>
      </section>

      {/* Subsection C: Micro Hydro Power */}
      <section id="micro-hydro-power" className="space-y-4 pt-4 border-t mt-6">
        <h3 className="text-2xl font-semibold">C. Micro Hydro Power</h3>
        <p>
          For those fortunate enough to have a year-round stream, river, or spring with a sufficient vertical drop (<strong>head</strong>) and water <strong>flow</strong>, <strong>micro-hydro power</strong> can be one of the most reliable and cost-effective forms of off-grid renewable energy.
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Utilizing Water Flow:</strong> Water is typically diverted from the source through an intake (screened to prevent debris) and channeled down through a pipe called a <strong>penstock</strong>. The pressure and flow of the water at the bottom spins a turbine, which is connected to a generator, producing electricity (usually DC for off-grid battery charging).
          </li>
          <li>
            <strong>Types of Systems:</strong> The turbine design depends heavily on the site's specific head and flow characteristics:
            <ul className="list-circle space-y-1 pl-6 mt-2">
              <li><strong>High Head / Low Flow:</strong> Pelton or Turgo turbines are often used.</li>
              <li><strong>Medium Head / Medium Flow:</strong> Crossflow turbines or Turgo turbines might be suitable.</li>
              <li><strong>Low Head / High Flow:</strong> Propeller turbines (like a mini Kaplan) or water wheels might be employed.</li>
            </ul>
          </li>
          <li>
            <strong>Assessing Potential:</strong> Requires accurately measuring your site's:
            <ul className="list-circle space-y-1 pl-6 mt-2">
              <li><strong>Head:</strong> The vertical distance the water falls from the intake point to the turbine location.</li>
              <li><strong>Flow Rate:</strong> The volume of water flowing per unit of time (e.g., liters per minute, gallons per minute). Both head and flow must be sufficient <em>and</em> consistent throughout the year (especially during dry seasons) for the system to be viable.</li>
            </ul>
          </li>
          <li>
            <strong>Components:</strong> A typical system includes the water intake structure, penstock pipe, turbine, generator/alternator, wiring, and often a dedicated charge controller suitable for hydro systems.
          </li>
           <li>
            <strong>Generator Selection:</strong> Micro-hydro systems operate at much lower rotational speeds (RPM) than engine-driven generators. They often use specialized low-RPM generators or Permanent Magnet Alternators (PMAs) for efficient power production.
          </li>
          <li>
            <strong>Integration:</strong> A well-designed micro-hydro system can potentially provide consistent power 24/7, making it an excellent baseline power source that significantly reduces reliance on battery storage compared to intermittent sources like solar or wind.
          </li>
        </ul>
      </section>

      {/* Subsection D: Generators (Backup Power) */}
      <section id="generators-backup" className="space-y-4 pt-4 border-t mt-6">
        <h3 className="text-2xl font-semibold">D. Generators (Backup Power)</h3>
        <p>
          While the goal is often 100% renewable energy, most practical off-grid systems include a fuel-powered <strong>backup generator</strong> for reliability and peace of mind.
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Types:</strong> Common fuel types include:
            <ul className="list-circle space-y-1 pl-6 mt-2">
              <li><strong>Gasoline:</strong> Widely available, generators are often cheaper initially, but fuel degrades relatively quickly in storage and engines can require more maintenance.</li>
              <li><strong>Propane (LPG):</strong> Stores very well long-term without degradation, burns cleaner, but generators might be slightly less fuel-efficient than diesel. Requires propane tank storage.</li>
              <li><strong>Diesel:</strong> Very fuel-efficient, engines are typically robust and long-lasting, but generators are often more expensive upfront, fuel can gel in very cold weather, and engines require regular maintenance.</li>
            </ul>
          </li>
          <li>
            <strong>Sizing:</strong> The generator should be powerful enough (rated in Watts or kW) to run your essential loads <em>and</em> have enough spare capacity to efficiently charge your battery bank during extended periods of cloudy weather, low wind, or system maintenance. Undersizing a generator for battery charging is inefficient.
          </li>
          <li>
            <strong>Automatic Transfer Switch (ATS):</strong> For seamless backup, an ATS can sense when battery voltage drops below a critical threshold (or if grid power fails, in grid-tied backup scenarios). It automatically starts the generator and transfers the electrical loads to it, then switches back and shuts down the generator once batteries are sufficiently recharged (or grid power returns).
          </li>
          <li>
            <strong>Integration:</strong> Generators are most efficiently used to charge the main battery bank via a powerful battery charger (often built into modern hybrid inverters). Running AC loads directly off the generator for long periods is usually less fuel-efficient than charging batteries and letting the inverter power the loads.
          </li>
        </ul>
      </section>
    </div>
  );
};
