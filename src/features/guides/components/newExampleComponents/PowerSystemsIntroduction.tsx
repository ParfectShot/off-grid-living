"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  BookOpen,
  Download,
  Share2,
  Printer,
  Bookmark,
  Zap,
  Sun,
  Wind,
  Droplets,
  Battery,
  ChevronRight,
  ChevronLeft,
  HelpCircle,
  Calculator,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Guide navigation structure
const guideNavigation = [
  { title: "Introduction to Off-Grid Power", slug: "introduction", current: true },
  { title: "Assessing Your Power Needs", slug: "assessing-power-needs", current: false },
  { title: "Solar Power", slug: "solar-power", current: false },
  { title: "Wind Power", slug: "wind-power", current: false },
  { title: "Micro-Hydro Power", slug: "micro-hydro", current: false },
  { title: "Backup Generators", slug: "backup-generators", current: false },
  { title: "Battery Storage", slug: "battery-storage", current: false },
  { title: "Power Conversion", slug: "power-conversion", current: false },
  { title: "Safety and Maintenance", slug: "safety-maintenance", current: false },
]

export default function IntroductionToOffGridPowerPage() {
  const [progress, setProgress] = useState(0)
  const [activeSection, setActiveSection] = useState("what-are-off-grid-systems")

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.body.offsetHeight
      const winHeight = window.innerHeight
      const scrollPercent = scrollTop / (docHeight - winHeight)
      setProgress(scrollPercent * 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle print functionality
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background print:hidden">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xl font-bold flex items-center">
              <span className="text-green-600">OffGrid</span>Living
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-green-600 transition-colors">
              Home
            </Link>
            <Link href="/blogs" className="text-sm font-medium hover:text-green-600 transition-colors">
              Blogs
            </Link>
            <Link href="/calculators" className="text-sm font-medium hover:text-green-600 transition-colors">
              Calculators
            </Link>
            <Link href="/guides" className="text-sm font-medium text-green-600 transition-colors">
              Guides
            </Link>
            <Link href="/reviews" className="text-sm font-medium hover:text-green-600 transition-colors">
              Reviews
            </Link>
            <Button variant="default" className="bg-green-600 hover:bg-green-700">
              Get Started
            </Button>
          </nav>
          <Button variant="outline" size="icon" className="md:hidden">
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>

      {/* Reading progress bar */}
      <div className="fixed top-16 left-0 w-full h-1 bg-muted z-50 print:hidden">
        <div
          className="h-full bg-green-600 transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <main className="flex-1">
        {/* Guide header */}
        <div className="container px-4 md:px-6 py-8 print:py-4">
          {/* Breadcrumb navigation */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-6 print:hidden">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/guides" className="hover:text-foreground">
              Guides
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/guides/power-systems" className="hover:text-foreground">
              Power Systems
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Introduction</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left sidebar - Guide navigation */}
            <div className="lg:col-span-1 print:hidden">
              <div className="sticky top-24 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold">Power Systems Guides</h2>
                  <div className="space-y-1">
                    {guideNavigation.map((item, index) => (
                      <Link
                        key={index}
                        href={`/guides/power-systems/${item.slug}`}
                        className={`flex items-center p-2 rounded-md text-sm ${
                          item.current ? "bg-green-50 text-green-600 font-medium" : "hover:bg-muted"
                        }`}
                      >
                        {item.current && <ChevronRight className="h-4 w-4 mr-1" />}
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* On this page - section navigation */}
                <div className="space-y-2">
                  <h2 className="text-sm font-semibold text-muted-foreground">ON THIS PAGE</h2>
                  <div className="space-y-1">
                    {[
                      { id: "what-are-off-grid-systems", title: "What are Off-Grid Power Systems?" },
                      { id: "common-power-sources", title: "Common Power Sources" },
                      { id: "energy-storage", title: "Energy Storage" },
                      { id: "power-conversion", title: "Power Conversion & Management" },
                      { id: "why-understanding", title: "Why Understanding is Crucial" },
                      { id: "faq", title: "Frequently Asked Questions" },
                    ].map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className={`flex items-center p-2 rounded-md text-sm ${
                          activeSection === section.id
                            ? "bg-muted text-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        onClick={(e) => {
                          e.preventDefault()
                          document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })
                          setActiveSection(section.id)
                        }}
                      >
                        {section.title}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Guide actions */}
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start gap-2" onClick={handlePrint}>
                    <Printer className="h-4 w-4" />
                    Print Guide
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Bookmark className="h-4 w-4" />
                    Save for Later
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Share2 className="h-4 w-4" />
                    Share Guide
                  </Button>
                </div>

                {/* Related resources */}
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold">Related Resources</h2>
                  <div className="space-y-2">
                    <Link
                      href="/calculators/home-load"
                      className="flex items-center p-2 rounded-md text-sm hover:bg-muted"
                    >
                      <Calculator className="h-4 w-4 mr-2 text-green-600" />
                      Home Load Calculator
                    </Link>
                    <Link
                      href="/calculators/solar-system"
                      className="flex items-center p-2 rounded-md text-sm hover:bg-muted"
                    >
                      <Sun className="h-4 w-4 mr-2 text-green-600" />
                      Solar System Calculator
                    </Link>
                    <Link href="/reviews" className="flex items-center p-2 rounded-md text-sm hover:bg-muted">
                      <Zap className="h-4 w-4 mr-2 text-green-600" />
                      Solar Product Reviews
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="lg:col-span-3 max-w-3xl">
              {/* Guide metadata */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <Badge className="bg-green-600 hover:bg-green-700">Power Systems</Badge>
                <Badge variant="outline">Beginner</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <BookOpen className="h-3 w-3 mr-1" />
                  <span>8 min read</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Last updated: March 15, 2023</span>
                </div>
              </div>

              {/* Guide title */}
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
                Introduction to Off-Grid Power Systems
              </h1>

              {/* Guide introduction */}
              <div className="space-y-4 mb-10">
                <p className="text-xl text-muted-foreground">
                  Welcome to the world of energy independence! This guide will walk you through the essentials of
                  understanding off-grid power systems, their components, and why they're crucial for self-sufficient
                  living.
                </p>
                <div className="relative aspect-video overflow-hidden rounded-lg mb-6">
                  <Image
                    src="/placeholder.svg?height=600&width=1200&text=Off-Grid+Power+Systems"
                    alt="Off-grid power system with solar panels and batteries"
                    width={1200}
                    height={600}
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* What are Off-Grid Power Systems? */}
              <section id="what-are-off-grid-systems" className="scroll-mt-20 space-y-4 mb-10">
                <h2 className="text-2xl font-bold tracking-tight">What are Off-Grid Power Systems?</h2>
                <p>
                  An off-grid power system, also known as a standalone power system, operates entirely independently
                  from the traditional electrical utility grid.
                </p>
                <p>
                  <strong>Definition:</strong> It involves generating your own electricity on-site (primarily through
                  renewable sources) and storing it, typically in a battery bank, for use whenever needed, day or night.
                </p>
                <p>
                  <strong>Goal:</strong> The primary aim is energy independence – freedom from utility bills, power
                  outages, grid infrastructure limitations, and gaining control over your energy source.
                </p>

                <div className="bg-muted p-6 rounded-lg my-6">
                  <h3 className="font-semibold mb-4">Key Benefits of Off-Grid Power Systems:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span>
                        <strong>Energy Independence:</strong> No reliance on utility companies or grid infrastructure
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span>
                        <strong>Reliability:</strong> Protection from grid outages and blackouts
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span>
                        <strong>Environmental Benefits:</strong> Reduced carbon footprint through renewable energy
                        sources
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span>
                        <strong>Remote Location Viability:</strong> Power where grid connection is unavailable or
                        prohibitively expensive
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <span>
                        <strong>Long-term Cost Savings:</strong> Elimination of utility bills after initial investment
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Common Power Sources */}
              <section id="common-power-sources" className="scroll-mt-20 space-y-4 mb-10">
                <h2 className="text-2xl font-bold tracking-tight">Common Power Sources</h2>
                <p>
                  Electricity in off-grid systems is typically generated using renewable energy sources, with occasional
                  backup from fuel-powered generators:
                </p>

                <div className="grid gap-6 md:grid-cols-2 my-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Sun className="h-5 w-5 text-green-600" />
                        <CardTitle className="text-lg">Solar Panels (Photovoltaics)</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        Convert sunlight directly into DC electricity. The cornerstone of most modern off-grid systems
                        due to their reliability, decreasing costs, and minimal maintenance requirements.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Wind className="h-5 w-5 text-green-600" />
                        <CardTitle className="text-lg">Wind Turbines</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        Harness wind energy to generate power, often complementing solar power. Particularly effective
                        in locations with consistent wind patterns and during seasons with less sunlight.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Droplets className="h-5 w-5 text-green-600" />
                        <CardTitle className="text-lg">Micro-Hydro Systems</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        Utilize the energy of flowing water, providing consistent power if the resource is available.
                        One of the most reliable and cost-effective renewable sources when you have suitable water flow.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-green-600" />
                        <CardTitle className="text-lg">Generators</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        Often used as a reliable backup power source, powered by fuels like gasoline, diesel, or
                        propane, especially during long periods without sun or wind. Not typically a primary source due
                        to fuel costs and environmental impact.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <p>
                  Many off-grid systems combine multiple power sources (known as hybrid systems) to increase reliability
                  and take advantage of seasonal variations in resource availability.
                </p>
              </section>

              {/* Energy Storage */}
              <section id="energy-storage" className="scroll-mt-20 space-y-4 mb-10">
                <h2 className="text-2xl font-bold tracking-tight">Energy Storage</h2>
                <p>
                  Since renewable sources like solar and wind are intermittent, battery storage is crucial. Batteries
                  store excess energy generated during peak production times (e.g., sunny days) for later use (e.g.,
                  nighttime, cloudy days).
                </p>

                <div className="my-6">
                  <h3 className="text-lg font-semibold mb-4">Common Battery Types for Off-Grid Systems:</h3>

                  <Tabs defaultValue="lead-acid" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="lead-acid">Lead-Acid Batteries</TabsTrigger>
                      <TabsTrigger value="lithium">Lithium Batteries</TabsTrigger>
                    </TabsList>
                    <TabsContent value="lead-acid" className="space-y-4 pt-4">
                      <div className="aspect-video relative overflow-hidden rounded-lg">
                        <Image
                          src="/placeholder.svg?height=400&width=800&text=Lead-Acid+Batteries"
                          alt="Lead-acid battery bank"
                          width={800}
                          height={400}
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-semibold">Lead-Acid Batteries</h3>
                      <p>
                        The traditional workhorse of off-grid systems, known for lower upfront cost but requiring more
                        maintenance and having a shorter lifespan.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-medium">Types:</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>
                              <strong>Flooded Lead-Acid (FLA):</strong> Lowest initial cost, require regular maintenance
                            </li>
                            <li>
                              <strong>Absorbed Glass Mat (AGM):</strong> Maintenance-free, spill-proof, higher cost
                            </li>
                            <li>
                              <strong>Gel:</strong> Good deep-cycle performance, maintenance-free, most expensive
                              lead-acid option
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium">Considerations:</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Typically limited to 50% depth of discharge for longevity</li>
                            <li>Shorter lifespan (3-7 years depending on type and usage)</li>
                            <li>Heavier and larger for the same capacity</li>
                            <li>Require ventilation (especially flooded types)</li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="lithium" className="space-y-4 pt-4">
                      <div className="aspect-video relative overflow-hidden rounded-lg">
                        <Image
                          src="/placeholder.svg?height=400&width=800&text=Lithium+Batteries"
                          alt="Lithium battery bank"
                          width={800}
                          height={400}
                          className="object-cover"
                        />
                      </div>
                      <h3 className="text-lg font-semibold">Lithium Batteries (LiFePO4)</h3>
                      <p>
                        Rapidly becoming the preferred choice for off-grid battery storage due to numerous advantages,
                        despite a higher initial cost.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-medium">Advantages:</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Much longer cycle life (thousands vs. hundreds for lead-acid)</li>
                            <li>Deeper discharge capability (80-90%+ vs. 50% for lead-acid)</li>
                            <li>Lighter weight and smaller footprint</li>
                            <li>Virtually maintenance-free</li>
                            <li>Better efficiency (less energy loss during charge/discharge)</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium">Considerations:</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Higher upfront cost (though often lower lifetime cost)</li>
                            <li>Requires Battery Management System (BMS) for safety</li>
                            <li>Less tolerant of extreme overcharging</li>
                            <li>Newer technology with evolving standards</li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                <p>
                  Battery capacity is typically measured in kilowatt-hours (kWh) or amp-hours (Ah) at a specific
                  voltage. Proper sizing of your battery bank is crucial to ensure you have enough storage to meet your
                  needs during periods without power generation.
                </p>
              </section>

              {/* Power Conversion & Management */}
              <section id="power-conversion" className="scroll-mt-20 space-y-4 mb-10">
                <h2 className="text-2xl font-bold tracking-tight">Power Conversion & Management</h2>
                <p>Key components manage the electricity flow and make it usable for standard appliances:</p>

                <div className="space-y-6 my-6">
                  <div className="flex items-start gap-4 border p-4 rounded-lg">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Battery className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Inverters</h3>
                      <p className="text-sm text-muted-foreground">
                        Convert the Direct Current (DC) power from batteries and solar panels into Alternating Current
                        (AC) power used by most standard household appliances. Available in different types (pure sine
                        wave vs. modified sine wave) and capacities to match your needs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 border p-4 rounded-lg">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Settings className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Charge Controllers</h3>
                      <p className="text-sm text-muted-foreground">
                        Act as the gatekeeper between power sources (like solar panels) and the battery bank, protecting
                        batteries from overcharging and optimizing the charging process for longevity and efficiency.
                        Available in PWM (simpler, less efficient) and MPPT (more advanced, more efficient) varieties.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 border p-4 rounded-lg">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Zap className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">System Monitoring</h3>
                      <p className="text-sm text-muted-foreground">
                        Devices and software that track system performance, battery state of charge, power generation,
                        and consumption. Essential for understanding your system's health and optimizing your energy
                        usage patterns.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Why Understanding Power Systems is Crucial */}
              <section id="why-understanding" className="scroll-mt-20 space-y-4 mb-10">
                <h2 className="text-2xl font-bold tracking-tight">
                  Why Understanding Power Systems is Crucial for Off-Grid Living
                </h2>
                <p>
                  A well-designed and understood power system is the heart of a functional and comfortable off-grid
                  home. Miscalculations or misunderstandings can lead to frustration and unexpected costs.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Reliability</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        Ensures you have a consistent and dependable energy supply for essential needs like lighting,
                        refrigeration, communication, and water pumping.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Matching Needs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        Allows you to accurately size your system (panels, batteries, inverter) to meet your specific
                        energy consumption. An undersized system won't meet your needs, while an oversized system wastes
                        significant money upfront.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Budgeting</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        Helps you realistically budget for the substantial investment in equipment and plan for ongoing
                        maintenance or eventual component replacement. Understanding the components helps in making
                        cost-effective choices.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Safety</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        Working with electricity, especially high-power DC systems and batteries, carries inherent
                        risks. Understanding your system's components, functions, and safety features is paramount to
                        operate and maintain it safely.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* FAQ Section */}
              <section id="faq" className="scroll-mt-20 space-y-4 mb-10">
                <h2 className="text-2xl font-bold tracking-tight">Frequently Asked Questions</h2>

                <div className="space-y-4 my-6">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <HelpCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <h3 className="font-semibold">How much does a complete off-grid power system cost?</h3>
                    </div>
                    <p className="text-sm text-muted-foreground pl-7">
                      Costs vary wildly depending on your energy needs (system size), component choices (battery type,
                      brand quality), location (installation costs, shipping), and whether you DIY or hire
                      professionals. Small cabin systems might start in the low thousands of dollars/euros (or
                      equivalent lakhs of Rupees), while large residential systems can easily cost tens of thousands.
                      Budgeting accurately based on your load assessment is crucial.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <HelpCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <h3 className="font-semibold">Can I run air conditioning or electric heating off-grid?</h3>
                    </div>
                    <p className="text-sm text-muted-foreground pl-7">
                      Yes, but these are typically very heavy electrical loads. You'll need a significantly larger solar
                      array, battery bank, and inverter to support them, which substantially increases system cost.
                      Careful load calculation and potentially using highly efficient mini-split AC units or alternative
                      heating sources (wood, propane) is often recommended.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <HelpCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <h3 className="font-semibold">How long do off-grid batteries last?</h3>
                    </div>
                    <p className="text-sm text-muted-foreground pl-7">
                      Lifespan depends heavily on the battery type, quality, how deeply they are cycled (DoD), operating
                      temperatures, and how well they are maintained (especially lead-acid). Typical ranges: Flooded
                      Lead-Acid (3-7 years), AGM/Gel Lead-Acid (5-10 years), LiFePO4 Lithium (10-20+ years or thousands
                      of cycles).
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <HelpCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <h3 className="font-semibold">Is solar or wind better for my off-grid system?</h3>
                    </div>
                    <p className="text-sm text-muted-foreground pl-7">
                      It depends entirely on your location's resources. Solar is more predictable and widely applicable.
                      Wind requires specific site conditions (consistent, strong winds). Often, a hybrid solar and wind
                      system provides the best reliability by leveraging different weather patterns. Micro-hydro is best
                      if you have the water resource.
                    </p>
                  </div>
                </div>
              </section>

              {/* Next Steps */}
              <div className="bg-green-50 p-6 rounded-lg mb-10">
                <h3 className="text-xl font-bold mb-4">Next Steps</h3>
                <p className="mb-4">
                  Now that you understand the basics of off-grid power systems, the next step is to assess your specific
                  energy needs to properly size your system.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/guides/power-systems/assessing-power-needs">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Continue to Assessing Your Power Needs
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/calculators/home-load">
                    <Button variant="outline" className="w-full">
                      Try Our Home Load Calculator
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Guide navigation */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10 pt-6 border-t print:hidden">
                <Button variant="outline" className="flex-1 justify-start gap-2" disabled>
                  <ChevronLeft className="h-4 w-4" />
                  <div className="text-left">
                    <div className="text-xs text-muted-foreground">Previous</div>
                    <div className="text-sm font-medium truncate">No previous guide</div>
                  </div>
                </Button>
                <Link href="/guides/power-systems/assessing-power-needs" className="flex-1">
                  <Button variant="outline" className="w-full justify-end gap-2">
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Next</div>
                      <div className="text-sm font-medium truncate">Assessing Your Power Needs</div>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full border-t py-6 md:py-0 print:hidden">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2023 OffGridLiving. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/about" className="text-sm font-medium hover:underline">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:underline">
              Contact
            </Link>
            <Link href="/privacy" className="text-sm font-medium hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm font-medium hover:underline">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Settings(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0


\

