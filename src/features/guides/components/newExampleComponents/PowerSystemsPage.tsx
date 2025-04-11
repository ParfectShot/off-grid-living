import Link from "next/link"
import Image from "next/image"
import { Zap, Sun, Wind, Droplets, Battery, Settings, ArrowRight, Download, FileText, BookOpen, Shield, PenToolIcon as Tool, HelpCircle, Lightbulb } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Power Systems guides
const powerSystemGuides = [
  {
    title: "Introduction to Off-Grid Power Systems",
    description: "Learn the fundamentals of off-grid power systems and why they're essential for self-sufficient living",
    slug: "introduction",
    readTime: "8 min read",
    level: "Beginner",
    icon: <Lightbulb className="h-6 w-6 text-green-600" />,
  },
  {
    title: "Assessing Your Power Needs",
    description: "How to calculate your energy requirements and properly size your off-grid system",
    slug: "assessing-power-needs",
    readTime: "10 min read",
    level: "Beginner",
    icon: <Calculator className="h-6 w-6 text-green-600" />,
  },
  {
    title: "Solar Power for Off-Grid Systems",
    description: "Everything you need to know about solar panels, charge controllers, and solar system design",
    slug: "solar-power",
    readTime: "15 min read",
    level: "Intermediate",
    icon: <Sun className="h-6 w-6 text-green-600" />,
  },
  {
    title: "Wind Power for Off-Grid Systems",
    description: "Understanding wind turbines, siting considerations, and integrating wind into your power system",
    slug: "wind-power",
    readTime: "12 min read",
    level: "Intermediate",
    icon: <Wind className="h-6 w-6 text-green-600" />,
  },
  {
    title: "Micro-Hydro Power Systems",
    description: "Harnessing water flow for consistent, reliable off-grid electricity generation",
    slug: "micro-hydro",
    readTime: "10 min read",
    level: "Intermediate",
    icon: <Droplets className="h-6 w-6 text-green-600" />,
  },
  {
    title: "Backup Generators for Off-Grid Living",
    description: "Selecting and integrating fuel-powered generators into your renewable energy system",
    slug: "backup-generators",
    readTime: "8 min read",
    level: "Intermediate",
    icon: <Zap className="h-6 w-6 text-green-600" />,
  },
  {
    title: "Battery Storage Systems",
    description: "Comparing battery technologies, sizing your battery bank, and maintenance best practices",
    slug: "battery-storage",
    readTime: "14 min read",
    level: "Intermediate",
    icon: <Battery className="h-6 w-6 text-green-600" />,
  },
  {
    title: "Power Conversion and Management",
    description: "Understanding inverters, charge controllers, and system integration for optimal performance",
    slug: "power-conversion",
    readTime: "12 min read",
    level: "Advanced",
    icon: <Settings className="h-6 w-6 text-green-600" />,
  },
  {
    title: "Safety and Maintenance",
    description: "Essential safety practices and maintenance routines for your off-grid power system",
    slug: "safety-maintenance",
    readTime: "10 min read",
    level: "All Levels",
    icon: <Shield className="h-6 w-6 text-green-600" />,
  },
];

// Featured guides to highlight
const featuredGuides = [
  {
    title: "Complete Guide to Off-Grid Power Systems",
    description: "A comprehensive overview of all components and considerations for designing your off-grid power solution",
    image: "/placeholder.svg?height=400&width=600&text=Off-Grid+Power+Systems",
    slug: "introduction",
    readTime: "25 min read",
    level: "Beginner",
  },
  {
    title: "Solar Power for Off-Grid Living",
    description: "Everything you need to know about harnessing solar energy for your self-sufficient home",
    image: "/placeholder.svg?height=400&width=600&text=Solar+Power",
    slug: "solar-power",
    readTime: "15 min read",
    level: "Intermediate",
  },
  {
    title: "Battery Storage Essentials",
    description: "Master the heart of your off-grid system with our complete guide to battery technologies and best practices",
    image: "/placeholder.svg?height=400&width=600&text=Battery+Storage",
    slug: "battery-storage",
    readTime: "14 min read",
    level: "Intermediate",
  },
];

export default function PowerSystemsGuidePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
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
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Off-Grid Power Systems</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Comprehensive guides to help you design, build, and maintain reliable power systems for your off-grid lifestyle.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/guides/power-systems/introduction">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Start with the Basics
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/calculators/solar-system">
                  <Button variant="outline">Try Our Solar Calculator</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured guides section */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Featured Guides</h2>
                <p className="text-muted-foreground">Essential resources for your off-grid power journey</p>
              </div>
              <Link href="#all-guides">
                <Button variant="ghost" className="gap-1">
                  View all guides
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGuides.map((guide, index) => (
                <Card key={index} className="overflow-hidden flex flex-col">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={guide.image || "/placeholder.svg"}
                      alt={guide.title}
                      width={600}
                      height={400}
                      className="object-cover transition-transform hover:scale-105"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-green-600 hover:bg-green-700">Featured</Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                      <Badge variant="outline">{guide.level}</Badge>
                      <span className="flex items-center">
                        <BookOpen className="h-3 w-3 mr-1" />
                        {guide.readTime}
                      </span>
                    </div>
                    <CardTitle>{guide.title}</CardTitle>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="mt-auto pt-2">
                    <Link href={`/guides/power-systems/${guide.slug}`} className="w-full">
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Read Guide
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* All guides section */}
        <section id="all-guides" className="w-full py-12 md:py-16 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight mb-2">All Power System Guides</h2>
              <p className="text-muted-foreground">Browse our comprehensive collection of guides on off-grid power systems</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {powerSystemGuides.map((guide, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="rounded-full bg-green-100 p-2">
                        {guide.icon}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline">{guide.level}</Badge>
                        <span className="flex items-center">
                          <BookOpen className="h-3 w-3 mr-1" />
                          {guide.readTime}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{guide.title}</CardTitle>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-2">
                    <Link href={`/guides/power-systems/${guide.slug}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        Read Guide
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Downloadable resources section */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight mb-2">Downloadable Resources</h2>
              <p className="text-muted-foreground">
                Printable guides, checklists, and worksheets to help with your off-grid power planning
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Off-Grid Power System Sizing Worksheet",
                  description: "A comprehensive worksheet to help you calculate your energy needs and size your system components",
                  icon: <Calculator className="h-6 w-6 text-green-600" />,
                  fileType: "PDF",
                },
                {
                  title: "Solar Panel Installation Guide",
                  description: "Step-by-step instructions for mounting and connecting solar panels",
                  icon: <Sun className="h-6 w-6 text-green-600" />,
                  fileType: "PDF",
                },
                {
                  title: "Battery Maintenance Checklist",
                  description: "Regular maintenance tasks to maximize the lifespan of your battery bank",
                  icon: <Tool className="h-6 w-6 text-green-600" />,
                  fileType: "PDF",
                },
              ].map((resource, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="rounded-full bg-green-100 p-2">{resource.icon}</div>
                      <Badge>{resource.fileType}</Badge>
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" className="w-full gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <section className="w-full py-12 md:py-16 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight mb-2">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">
                Common questions about off-grid power systems
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: "How much does a complete off-grid power system cost?",
                  answer: "Costs vary widely depending on your energy needs, component choices, and location. Small cabin systems might start at ₹1-2 lakhs, while large residential systems can cost ₹10 lakhs or more. Our guides help you understand the factors that influence cost and how to budget effectively.",
                },
                {
                  question: "Can I run air conditioning or electric heating off-grid?",
                  answer: "Yes, but these are typically very heavy electrical loads. You'll need a significantly larger solar array, battery bank, and inverter to support them, which substantially increases system cost. Our guides cover energy-efficient alternatives and proper system sizing for high-demand appliances.",
                },
                {
                  question: "How long do off-grid batteries last?",
                  answer: "Lifespan depends on battery type, quality, usage patterns, and maintenance. Typical ranges: Flooded Lead-Acid (3-7 years), AGM/Gel Lead-Acid (5-10 years), LiFePO4 Lithium (10-20+ years). Our battery guide covers maximizing battery life through proper care.",
                },
                {
                  question: "Is solar or wind better for my off-grid system?",
                  answer: "It depends entirely on your location's resources. Solar is more predictable and widely applicable. Wind requires specific site conditions (consistent, strong winds). Often, a hybrid solar and wind system provides the best reliability by leveraging different weather patterns.",
                },
              ].map((faq, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-2">
                      <HelpCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardFooter>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link href="/guides/power-systems/introduction#faq">
                <Button variant="outline">
                  View More FAQs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter section */}
        <section className="w-full py-12 md:py-24 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Stay Updated with Our Newsletter
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get the latest guides, tips, and resources for off-grid power systems delivered straight to your inbox.
                </p>
              </div>
              <div className="flex flex-col space-y-4">
                <form className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <div className="flex-1">
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="email"
                      placeholder="Enter your email"
                      type="email"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700">Subscribe</Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  By subscribing, you agree to our{" "}
                  <Link href="/terms" className="underline underline-offset-2">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="underline underline-offset-2">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
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

function Calculator(props) {
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
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <line x1="16" x2="16" y1="14" y2="18" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
    </svg>
  )
}
