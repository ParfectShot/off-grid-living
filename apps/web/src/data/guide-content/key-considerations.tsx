import React from 'react';
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { 
  Zap, 
  Droplet, 
  Trash2, 
  Home, 
  Map, 
  Leaf, 
  Sun, 
  Users, 
  FileText, 
  DollarSign,
  ArrowRight
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "~/components/ui/button";

export const KeyConsiderationsContent = () => {
  // Array of considerations for easier mapping
  const considerations = [
    {
      id: "power-generation",
      title: "Power Generation & Management",
      icon: <Zap className="h-5 w-5 text-amber-500" />,
      description: "Generating and managing your own electricity is a foundational aspect of off-grid living. Consider various renewable energy sources and backup options.",
      difficulty: "High",
      details: [
        "Solar power systems (panels, batteries, charge controllers)",
        "Wind power as an alternative or supplementary source",
        "Micro-hydro systems for properties with flowing water",
        "Battery storage systems (LiFePO4 vs. lead-acid)",
        "MPPT vs. PWM charge controllers for solar efficiency",
        "Calculating your power needs before designing your system",
        "Backup generators for periods of low renewable production"
      ]
    },
    {
      id: "water-systems",
      title: "Water Systems",
      icon: <Droplet className="h-5 w-5 text-blue-500" />,
      description: "Access to clean water is essential. You'll need systems for collecting, storing, treating, and distributing water throughout your property.",
      difficulty: "High",
      details: [
        "Water sourcing (wells, springs, rainwater harvesting)",
        "Water storage solutions and capacity planning",
        "Filtration and purification methods",
        "Pumping systems (solar, manual, or gravity-fed)",
        "Distribution piping and pressure considerations",
        "Winter protection to prevent freezing",
        "Water conservation practices"
      ]
    },
    {
      id: "waste-management",
      title: "Waste Management",
      icon: <Trash2 className="h-5 w-5 text-green-500" />,
      description: "Handling waste without municipal sewage requires thoughtful systems that comply with local regulations while protecting the environment.",
      difficulty: "Medium",
      details: [
        "Composting toilet systems and maintenance",
        "Greywater systems for shower and laundry water",
        "Kitchen waste water treatment (often classified as black water)",
        "Local regulations and permits for waste systems",
        "Septic systems if allowed and appropriate",
        "Humanure composting techniques and considerations",
        "Solid waste reduction and management"
      ]
    },
    {
      id: "shelter-building",
      title: "Shelter & Building",
      icon: <Home className="h-5 w-5 text-orange-500" />,
      description: "Your off-grid dwelling needs to be durable, energy-efficient, and suited to your local climate, whether you're building new or modifying existing structures.",
      difficulty: "High",
      details: [
        "Housing options (cabins, tiny houses, earthships, RVs)",
        "Building codes and permit requirements",
        "Energy-efficient design principles",
        "Insulation and weatherproofing",
        "Passive solar design considerations",
        "DIY vs. professional construction",
        "Sustainable and locally-sourced building materials"
      ]
    },
    {
      id: "land-location",
      title: "Land & Location",
      icon: <Map className="h-5 w-5 text-red-500" />,
      description: "Your property's location will determine many aspects of your off-grid lifestyle, from climate considerations to legal restrictions.",
      difficulty: "High",
      details: [
        "Climate considerations for energy production",
        "Soil quality for growing food",
        "Water availability and rights",
        "Access to property (roads, maintenance)",
        "Zoning regulations and building restrictions",
        "Property taxes and other ongoing costs",
        "Distance to essential services and supplies"
      ]
    },
    {
      id: "self-sufficiency",
      title: "Self-Sufficiency & Lifestyle",
      icon: <Leaf className="h-5 w-5 text-green-600" />,
      description: "Off-grid living often involves producing your own food, learning new skills, and adapting to a different way of life.",
      difficulty: "Medium",
      details: [
        "Food production and gardening techniques",
        "Food preservation and storage",
        "Alternative cooking methods",
        "Essential tools and equipment",
        "Skill development (carpentry, plumbing, electrical)",
        "Maintaining work-life balance",
        "Mental preparation for lifestyle changes"
      ]
    },
    {
      id: "elements",
      title: "Dealing with the Elements",
      icon: <Sun className="h-5 w-5 text-yellow-500" />,
      description: "Weather conditions will affect your systems and comfort. Planning for seasonal changes and extreme weather is essential.",
      difficulty: "Medium",
      details: [
        "Heating solutions (wood stoves, solar thermal)",
        "Cooling strategies without traditional AC",
        "Snow management in cold climates",
        "Wildfire preparation in dry regions",
        "Refrigeration options (propane, DC, solar)",
        "Weatherproofing your structures and systems",
        "Seasonal adaptations to living patterns"
      ]
    },
    {
      id: "community",
      title: "Community & Isolation",
      icon: <Users className="h-5 w-5 text-purple-500" />,
      description: "While some seek solitude, the challenges of isolation should be considered, along with the benefits of community connections.",
      difficulty: "Medium",
      details: [
        "Building relationships with nearby neighbors",
        "Finding or creating community support networks",
        "Communication options in remote areas",
        "Managing isolation and mental health",
        "Sharing resources and knowledge",
        "Emergency support systems",
        "Balancing privacy with social needs"
      ]
    },
    {
      id: "legal",
      title: "Legal & Logistical Matters",
      icon: <FileText className="h-5 w-5 text-blue-600" />,
      description: "Navigating regulations, proving residency, and handling other logistical aspects of off-grid living require research and planning.",
      difficulty: "High",
      details: [
        "Understanding local building codes and restrictions",
        "Permits for structures, wells, and waste systems",
        "Proving residency without utility bills",
        "Mail service and physical address considerations",
        "Insurance options for off-grid properties",
        "Legal residence requirements for services",
        "Documentation and record-keeping"
      ]
    },
    {
      id: "financial",
      title: "Financial Considerations",
      icon: <DollarSign className="h-5 w-5 text-green-700" />,
      description: "While off-grid living can reduce long-term costs, the initial investment and ongoing expenses need careful planning.",
      difficulty: "High",
      details: [
        "Initial setup costs for power, water, and shelter",
        "Budgeting for maintenance and replacements",
        "Income sources while living off-grid",
        "Potential for reduced living expenses",
        "Emergency fund importance",
        "Cost-benefit analysis of different systems",
        "Financing options for off-grid setups"
      ]
    }
  ];

  // Helper function to get badge styles based on difficulty
  const getDifficultyBadge = (difficulty: string) => {
    switch(difficulty) {
      case "High":
        return "bg-red-50 text-red-600 hover:bg-red-50";
      case "Medium":
        return "bg-amber-50 text-amber-600 hover:bg-amber-50";
      case "Low":
        return "bg-green-50 text-green-600 hover:bg-green-50";
      default:
        return "";
    }
  };

  return (
    <section className="space-y-6 mb-10">
      <div id="introduction" className="scroll-mt-20 space-y-4">
        <p className="text-lg text-muted-foreground">
          While the idea of off-grid living can be romantic, it's crucial to approach this lifestyle
          with careful planning and a realistic understanding of the challenges involved. Here are
          the key aspects you should thoroughly consider before making the leap to off-grid living.
        </p>
        
        <div className="bg-muted p-6 rounded-lg my-6">
          <p className="italic">
            "The most successful off-grid dwellers aren't those with the most money or the fanciest 
            systems—they're the ones who've done their research, developed critical skills, and 
            prepared mentally for the challenges ahead."
          </p>
        </div>
      </div>

      {/* Desktop View - Cards Grid (hidden on mobile) */}
      <div className="hidden md:grid grid-cols-1 gap-6">
        {considerations.map((item) => (
          <Card key={item.id} id={item.id} className="border-muted scroll-mt-20">
            <CardHeader className="p-6 pb-2">
              <div className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  {item.icon}
                  <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
                </div>
                <Badge variant="outline" className={getDifficultyBadge(item.difficulty)}>
                  {item.difficulty} Complexity
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-3 space-y-4">
              <p>{item.description}</p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Key Factors to Consider:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                  {item.details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mobile View - Accordion (hidden on desktop) */}
      <Accordion type="single" collapsible className="md:hidden" defaultValue="power-generation">
        {considerations.map((item) => (
          <AccordionItem key={item.id} value={item.id} className="border-b">
            <AccordionTrigger className="hover:no-underline p-4">
              <div className="flex justify-between items-center w-full text-left">
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="font-medium">{item.title}</span>
                </div>
                <Badge variant="outline" className={`ml-2 ${getDifficultyBadge(item.difficulty)}`}>
                  {item.difficulty}
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-0 space-y-3">
              <p>{item.description}</p>
              <div className="bg-muted/50 p-3 rounded-lg">
                <h4 className="font-medium mb-2">Key Factors:</h4>
                <ul className="space-y-1">
                  {item.details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="bg-green-50 dark:bg-green-950/30 p-6 rounded-lg mt-8">
        <h3 className="text-lg font-semibold mb-2">Ready to Plan Your Off-Grid Journey?</h3>
        <p className="mb-4">
          Thoroughly evaluating these key considerations will help you determine if off-grid living
          is the right choice for you and allow you to plan effectively for a successful transition.
          Remember that everyone's off-grid journey is unique—what matters most is finding the 
          approaches that work for your specific needs, location, and goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link to="/guides/getting-started/step-by-step-approach">
            <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
              Continue to Step-by-Step Approach
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/calculators/home-load">
            <Button variant="outline" className="w-full">
              Calculate Your Energy Needs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};