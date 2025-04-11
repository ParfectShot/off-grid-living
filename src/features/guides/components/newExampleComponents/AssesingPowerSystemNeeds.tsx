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
  ChevronRight,
  ChevronLeft,
  Calculator,
  Lightbulb,
  Zap,
  Sun,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Guide navigation structure
const guideNavigation = [
  { title: "Introduction to Off-Grid Power", slug: "introduction", current: false },
  { title: "Assessing Your Power Needs", slug: "assessing-power-needs", current: true },
  { title: "Solar Power", slug: "solar-power", current: false },
  { title: "Wind Power", slug: "wind-power", current: false },
  { title: "Micro-Hydro Power", slug: "micro-hydro", current: false },
  { title: "Backup Generators", slug: "backup-generators", current: false },
  { title: "Battery Storage", slug: "battery-storage", current: false },
  { title: "Power Conversion", slug: "power-conversion", current: false },
  { title: "Safety and Maintenance", slug: "safety-maintenance", current: false },
]

export default function AssessingPowerNeedsPage() {
  const [progress, setProgress] = useState(0)
  const [activeSection, setActiveSection] = useState("identifying-energy-consumption")

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
            <span className="text-foreground font-medium">Assessing Your Power Needs</span>
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
                      { id: "identifying-energy-consumption", title: "Identifying Energy Consumption" },
                      { id: "calculating-energy-requirements", title: "Calculating Energy Requirements" },
                      { id: "future-proofing", title: "Future-Proofing Your System" },
                      { id: "example-calculation", title: "Example Calculation" },
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
                    <Link
                      href="/guides/power-systems/solar-power"
                      className="flex items-center p-2 rounded-md text-sm hover:bg-muted"
                    >
                      <Zap className="h-4 w-4 mr-2 text-green-600" />
                      Solar Power Guide
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
                  <span>10 min read</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Last updated: March 15, 2023</span>
                </div>
              </div>

              {/* Guide title */}
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
                Assessing Your Off-Grid Power Needs
              </h1>

              {/* Guide introduction */}
              <div className="space-y-4 mb-10">
                <p className="text-xl text-muted-foreground">
                  Before you even think about specific panels or batteries, you MUST accurately determine how much power you actually need. This is arguably the most critical step in designing your off-grid power system.
                </p>
                <div className="relative aspect-video overflow-hidden rounded-lg mb-6">
                  <Image
                    src="/placeholder.svg?height=600&width=1200&text=Energy+Assessment"
                    alt="Person calculating energy needs for off-grid system"
                    width={1200}
                    height={600}
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Identifying Your Energy Consumption */}
              <section id="identifying-energy-consumption" className="scroll-mt-20 space-y-4 mb-10">
                <h2 className="text-2xl font-bold tracking-tight">Identifying Your Energy Consumption</h2>
                <p>
                  This requires careful thought and investigation. Be meticulous!
                </p>

                <div className="bg-muted p-6 rounded-lg my-6">
                  <h3 className="font-semibold mb-4">Step 1: List Everything</h3>
                  <p className="mb-4">
                    Create a comprehensive inventory of every single appliance, light, tool, and electronic device that will draw power. Think room by room. Include easily forgotten items like:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Lights (all types)</li>
                      <li>Refrigerator/freezer</li>
                      <li>Water pump</li>
                      <li>Washing machine</li>
                      <li>Dishwasher</li>
                    </ul>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>TV/entertainment systems</li>
                      <li>Computers/laptops</li>
                      <li>Phone/device chargers</li>
                      <li>Internet modem/router</li>
                      <li>Kitchen appliances</li>
                    </ul>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>HVAC equipment</li>
                      <li>Power tools</li>
                      <li>Security systems</li>
                      <li>Medical equipment</li>
                      <li>Any specialty equipment</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-muted p-6 rounded-lg my-6">
                  <h3 className="font-semibold mb-4">Step 2: Estimate Usage</h3>
                  <p className="mb-4">
                    For each item on your list, find or estimate:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Wattage (W):</strong> How much power it consumes when actively running. This is usually found on a label on the device itself or in its user manual. For items without clear labels (like lighting), you may need to look up typical wattages.
                    </li>
                    <li>
                      <strong>Daily Runtime (Hours):</strong> Realistically estimate how many hours per day you expect to use that specific item. Be honest! Underestimating runtime is a common mistake.
                    </li>
                  </ul>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      <Lightbulb className="inline-block h-4 w-4 mr-1 text-yellow-500" />
                      <strong>Tip:</strong> Use a power meter (like a Kill-A-Watt) to measure the actual power consumption of your appliances for the most accurate assessment.
                    </p>
                  </div>
                </div>

                <div className="bg-muted p-6 rounded-lg my-6">
                  <h3 className="font-semibold mb-4">Step 3: Consider Seasonal Variations</h3>
                  <p className="mb-4">
                    Your energy needs might fluctuate significantly throughout the year:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Summer:</strong> Air conditioning, fans, irrigation pumps, more refrigeration
                    </li>
                    <li>
                      <strong>Winter:</strong> Electric heating, circulation pumps for heating systems, more lighting due to shorter days
                    </li>
                    <li>
                      <strong>Seasonal Activities:</strong> Workshop tools, agricultural equipment, etc.
                    </li>
                  </ul>
                  <p className="mt-4">
                    Design your system based on the period of highest demand (often winter due to less sunlight and potentially higher heating loads).
                  </p>
                </div>
              </section>

              {/* Calculating Total Energy Requirements */}
              <section id="calculating-energy-requirements" className="scroll-mt-20 space-y-4 mb-10">
                <h2 className="text-2xl font-bold tracking-tight">Calculating Total Energy Requirements</h2>
                <p>
                  Now, turn your list into numbers.
                </p>

                <div className="space-y-6 my-6">
                  <div className="border p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Daily Energy per Item (Watt-hours - Wh)</h3>
                    <p className="mb-2">
                      For each item, multiply its Wattage by its estimated daily Runtime:
                    </p>
                    <div className="bg-green-50 p-3 rounded-md text-center font-medium">
                      Watts × Hours = Watt-hours
                    </div>
                    <p className="mt-2">
                      <strong>Example:</strong> A 15W LED light used for 6 hours/day consumes 15 W × 6 h = 90 Wh per day.
                    </p>
                  </div>

                  <div className="border p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Total Daily Energy</h3>
                    <p className="mb-2">
                      Sum the daily Watt-hours (Wh) for all items on your list. This gives your total average daily energy consumption. It's often more convenient to express this in kilowatt-hours (kWh), where 1 kWh = 1000 Wh.
                    </p>
                    <p className="font-medium">
                      This daily kWh value is the foundation for sizing your solar array and battery bank.
                    </p>
                  </div>

                  <div className="border p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Peak Load (Watts - W)</h3>
                    <p className="mb-2">
                      Determine the maximum power your system might need to deliver at any single moment. This occurs when several high-consumption appliances run simultaneously (e.g., microwave, well pump, and toaster starting at the same time).
                    </p>
                    <p className="mb-2">
                      Sum the wattages of the items that could realistically run concurrently.
                    </p>
                    <p className="font-medium">
                      This peak load figure is crucial for sizing your inverter correctly.
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4">Use Our Calculator</h3>
                  <p className="mb-4">
                    To help simplify this process, you can use our Home Load Calculator to estimate your daily energy consumption and peak load based on common appliances.
                  </p>
                  <Link href="/calculators/home-load">
                    <Button className="bg-green-600 hover:bg-green-700">
                      Try Our Home Load Calculator
                      <Calculator className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </section>

              {/* Future-Proofing Your System */}
              <section id="future-proofing" className="scroll-mt-20 space-y-4 mb-10">
                <h2 className="text-2xl font-bold tracking-tight">Future-Proofing Your System</h2>
                <p>
                  Think beyond today! It's often more cost-effective in the long run to slightly oversize your system initially than to face complex and expensive upgrades later.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Consider Future Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li>Potential family growth or more occupants</li>
                        <li>Adding new significant loads in the future (e.g., workshop tools, electric vehicle charger, air conditioning)</li>
                        <li>Expanding living space or outbuildings</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Account for System Realities</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li>Battery capacity degradation over time</li>
                        <li>Solar panel efficiency reduction (typically 0.5-1% per year)</li>
                        <li>System inefficiencies and losses</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-medium">
                    <Lightbulb className="inline-block h-4 w-4 mr-1 text-yellow-500" />
                    <strong>Recommendation:</strong> Aim to plan for at least 10-25% extra capacity beyond your current calculated needs to provide a buffer for future expansion and system inefficiencies.
                  </p>
                </div>
              </section>

              {/* Example Calculation */}
              <section id="example-calculation" className="scroll-mt-20 space-y-4 mb-10">
                <h2 className="text-2xl font-bold tracking-tight">Example Calculation</h2>
                <p>
                  Let's walk through a simple example for a small off-grid cabin:
                </p>

                <Table className="my-6">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Appliance</TableHead>
                      <TableHead className="text-right">Watts (W)</TableHead>
                      <TableHead className="text-right">Hours/Day</TableHead>
                      <TableHead className="text-right">Watt-hours/Day (Wh)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>LED Lights (5 × 10W)</TableCell>
                      <TableCell className="text-right">50</TableCell>
                      <TableCell className="text-right">5</TableCell>
                      <TableCell className="text-right">250</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Refrigerator (Energy Star)</TableCell>
                      <TableCell className="text-right">60</TableCell>
                      <TableCell className="text-right">24</TableCell>
                      <TableCell className="text-right">1,440</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Laptop</TableCell>
                      <TableCell className="text-right">50</TableCell>
                      <TableCell className="text-right">4</TableCell>
                      <TableCell className="text-right">200</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Water Pump</TableCell>
                      <TableCell className="text-right">250</TableCell>
                      <TableCell className="text-right">1</TableCell>
                      <TableCell className="text-right">250</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>TV (32" LED)</TableCell>
                      <TableCell className="text-right">40</TableCell>
                      <TableCell className="text-right">3</TableCell>
                      <TableCell className="text-right">120</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Ceiling Fan</TableCell>
                      <TableCell className="text-right">30</TableCell>
                      <TableCell className="text-right">6</TableCell>
                      <TableCell className="text-right">180</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Microwave</TableCell>
                      <TableCell className="text-right">800</TableCell>
                      <TableCell className="text-right">0.5</TableCell>
                      <TableCell className="text-right">400</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Router/Modem</TableCell>
                      <TableCell className="text-right">15</TableCell>
                      <TableCell className="text-right">24</TableCell>
                      <TableCell className="text-right">360</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Phone Charging</TableCell>
                      <TableCell className="text-right">5</TableCell>
                      <TableCell className="text-right">2</TableCell>
                      <TableCell className="text-right">10</TableCell>
                    </TableRow>
                    <TableRow className="font-bold">
                      <TableCell>TOTAL</TableCell>
                      <TableCell className="text-right"></TableCell>
                      <TableCell className="text-right"></TableCell>
                      <TableCell className="text-right">3,210 Wh</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Total Daily Energy Consumption</h3>
                    <p>
                      3,210 Wh/day = 3.21 kWh/day
                    </p>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Peak Load Calculation</h3>
                    <p className="mb-2">
                      If the refrigerator (60W), water pump (250W), microwave (800W), and a few lights (30W) run simultaneously:
                    </p>
                    <p>
                      Peak Load = 60W + 250W + 800W + 30W = 1,140W
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Note: Some appliances like the water pump may have a higher startup surge that should be accounted for.
                    </p>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Future-Proofing</h3>
                    <p className="mb-2">
                      Adding 20% buffer to our daily energy consumption:
                    </p>
                    <p>
                      3.21 kWh × 1.2 = 3.85 kWh/day
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg mt-6">
                  <h3 className="font-semibold mb-2">What's Next?</h3>
                  <p className="mb-4">
                    With these calculations, we now have the foundation for sizing our:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li><strong>Solar Array:</strong> Based on daily energy needs and local solar conditions</li>
                    <li><strong>Battery Bank:</strong> Based on daily energy needs and desired days of autonomy</li>
                    <li><strong>Inverter:</strong> Based on peak load requirements</li>
                  </ul>
                  <p>
                    These topics will be covered in detail in the upcoming guides.
                  </p>
                </div>
              </section>

              {/* Next Steps */}
              <div className="bg-green-50 p-6 rounded-lg mb-10">
                <h3 className="text-xl font-bold mb-4">Next Steps</h3>
                <p className="mb-4">
                  Now that you understand how to assess your power needs, the next step is to learn about solar power, the most common energy source for off-grid systems.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/guides/power-systems/solar-power">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Continue to Solar Power Guide
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
                <Link href="/guides/power-systems/introduction" className="flex-1">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    <div className="text-left">
                      <div className="text-xs text-muted-foreground">Previous</div>
                      <div className="text-sm font-medium truncate">Introduction to Off-Grid Power</div>
                    </div>
                  </Button>
                </Link>
                <Link href="/guides/power-systems/solar-power" className="flex-1">
                  <Button variant="outline" className="w-full justify-end gap-2">
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Next</div>
                      <div className="text-sm font-medium truncate">Solar Power for Off-Grid Systems</div>
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
            © 2023 OffGridLiving.\

