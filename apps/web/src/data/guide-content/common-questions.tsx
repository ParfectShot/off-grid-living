import React from 'react';
import { Link } from "@tanstack/react-router";
import { 
  MapPin, 
  Zap, 
  Droplet, 
  Trash2, 
  Home, 
  Flame, 
  FileText, 
  Wifi, 
  Users, 
  Heart, 
  AlertTriangle,
  ArrowRight 
} from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { Badge } from "~/components/ui/badge";

export const CommonQuestionsContent = () => {
  const questions = [
    {
      id: "finding-land",
      icon: <MapPin className="h-5 w-5 text-red-500" />,
      question: "How do people find land suitable for off-grid living?",
      answer: "Individuals often seek property where they can be as off-grid as possible with little to no building restrictions and the ability to grow a good garden. When evaluating land, consider factors like climate suitability, water availability (existing sources or well potential), building code restrictions, and accessibility. Many successful off-grid homesteaders recommend visiting the property during different seasons to understand year-round conditions before purchasing."
    },
    {
      id: "power-sources",
      icon: <Zap className="h-5 w-5 text-amber-500" />,
      question: "What are some common off-grid power sources?",
      answer: "Common off-grid power setups include solar panels with battery storage, small-scale wind turbines, and micro-hydro systems for properties with flowing water. Solar is the most accessible option for beginners, typically using either MPPT (Maximum Power Point Tracking) or PWM (Pulse Width Modulation) charge controllers—MPPT being more efficient but costlier. Backup generators (propane, gasoline, or diesel) are often integrated into systems for periods of low renewable production. Many off-grid homes use a hybrid approach combining multiple sources based on local conditions."
    },
    {
      id: "power-challenges",
      icon: <AlertTriangle className="h-5 w-5 text-amber-600" />,
      question: "What are some challenges with off-grid power systems?",
      answer: "Common challenges include: properly sizing systems to match actual usage needs; the learning curve for system maintenance and troubleshooting; initial cost of quality components; battery replacement costs over time; seasonal variations affecting production; dealing with unexpected equipment failures in remote locations; and finding qualified technicians for assistance. For micro-hydro systems specifically, choosing appropriate generators/alternators can be difficult, particularly finding suitable low-rpm permanent magnet alternators (PMAs) for low-power waterwheels."
    },
    {
      id: "water-needs",
      icon: <Droplet className="h-5 w-5 text-blue-500" />,
      question: "How do people handle water needs off-grid?",
      answer: "Off-grid water solutions vary based on location and available resources. Options include drilling wells (where groundwater is accessible), harvesting rainwater, utilizing springs or surface water with appropriate filtration, or hauling water for very minimal usage. For storage, many use combinations of large cisterns, gravity-fed systems, and pressure tanks. Potable water is often stored in food-grade containers like glass carboys with hand pumps for dispensing. Water conservation becomes essential in off-grid settings, with many implementing greywater recycling systems and low-flow fixtures."
    },
    {
      id: "waste-management",
      icon: <Trash2 className="h-5 w-5 text-green-600" />,
      question: "What are some considerations for off-grid waste management?",
      answer: "Managing waste is a significant aspect of off-grid living. For human waste, composting toilets are common and can range from commercial units to DIY systems. Greywater (from showers/laundry) is often treated and reused for irrigation. Be aware that some jurisdictions classify kitchen sink and dishwasher water as blackwater, requiring different handling methods. Local regulations vary widely—some areas have strict permitting requirements while others are more flexible with alternative waste systems. Regardless of regulations, properly treating waste is essential for environmental protection and health safety."
    },
    {
      id: "shelter-types",
      icon: <Home className="h-5 w-5 text-orange-500" />,
      question: "What kind of shelter is typical for off-grid living?",
      answer: "Off-grid dwellings span a wide spectrum, including traditional cabins, tiny houses, earthships, yurts, converted shipping containers, and RVs/vans for those embracing nomadic off-grid living. Many opt to build their own structures, either from scratch using conventional methods or with alternative building techniques like straw bale, cob, or cordwood construction. The choice of shelter often depends on climate considerations, building skills, budget constraints, and local building code requirements. Energy efficiency through proper insulation and passive solar design principles is particularly important for off-grid homes."
    },
    {
      id: "heating",
      icon: <Flame className="h-5 w-5 text-orange-600" />,
      question: "How do you heat an off-grid home?",
      answer: "Wood stoves remain the most common primary heating solution for off-grid homes due to their reliability, fuel availability, and independence from electricity. The efficiency of wood heating depends on stove quality, proper installation, wood species, and moisture content of the fuel. Many off-grid homeowners complement wood heating with passive solar design, thermal mass for heat storage, and super-insulation to reduce heating requirements. Alternative options include propane heaters, masonry heaters, rocket mass heaters, and innovative approaches like biochar systems. Having multiple heating methods provides important redundancy during extreme weather events."
    },
    {
      id: "residency-proof",
      icon: <FileText className="h-5 w-5 text-blue-600" />,
      question: "How do you prove residency when living off-grid without traditional bills?",
      answer: "Proving residency without conventional utility bills can be challenging. Alternative documentation may include: property tax statements, land deeds, notarized affidavits from neighbors, voter registration cards, driver's license with property address, bank statements, homeschool registration documents, or mail received at the property. Some off-gridders establish relationships with local officials to help navigate these challenges. In some jurisdictions, even property deeds may not suffice as proof of residence, requiring creative documentation approaches. This can affect everything from receiving mail to accessing government services."
    },
    {
      id: "connectivity",
      icon: <Wifi className="h-5 w-5 text-purple-500" />,
      question: "How do off-gridders stay connected (or disconnected)?",
      answer: "Connectivity varies widely among off-grid residents based on personal preference and location. Those requiring internet access for work often use cellular data with signal boosters, satellite internet services, or point-to-point wireless connections where available. For phone service, options include cell phones with boosters, satellite phones for remote areas, or VoIP services over internet connections. Some off-grid locations eventually gain improved connectivity as infrastructure expands. Others intentionally minimize technology use, embracing the disconnection as part of their lifestyle. Many find a middle ground with limited connectivity for essential needs while reducing overall digital consumption."
    },
    {
      id: "communities",
      icon: <Users className="h-5 w-5 text-green-500" />,
      question: "Are there off-grid communities?",
      answer: "Yes, various types of off-grid communities exist, from loosely connected neighbors on adjacent properties to formally organized intentional communities. These range from small clusters of a few families to larger settlements with dozens of households. Some focus on specific philosophies (permaculture, sustainability, spiritual practices) while others simply value mutual support among like-minded individuals. Benefits include knowledge sharing, resource pooling, shared infrastructure costs, social connection, and security through community vigilance. Most successful communities balance independence with cooperation, respecting individual autonomy while collaborating on shared interests."
    },
    {
      id: "motivations",
      icon: <Heart className="h-5 w-5 text-red-500" />,
      question: "What are some reasons people choose to live off-grid?",
      answer: "Motivations vary widely but commonly include: seeking greater self-reliance and independence; reducing environmental impact; escaping the financial burden of conventional housing and utility costs; pursuing a simpler, less consumption-driven lifestyle; preparing for uncertain future scenarios; reconnecting with nature and natural cycles; avoiding aspects of modern society perceived as negative; finding peace and reduced stress away from urban environments; aligning living arrangements with personal values; pursuing creative freedom in building and energy systems; and the satisfaction of mastering practical skills. Many cite being tired of the 'rat race' and wanting to live more like their ancestors did, with a direct connection to their basic needs."
    },
    {
      id: "initial-challenges",
      icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
      question: "What are some challenges faced when starting out off-grid?",
      answer: "Initial challenges often include: underestimating the learning curve for new systems and skills; the physical demands of manual tasks like collecting firewood or hauling water; unexpected costs and maintenance requirements; dealing with isolation, particularly during harsh weather periods; adjusting to the greater time required for basic tasks; navigating zoning and building code issues; managing limited resources like water and electricity; adapting to seasonal changes in resource availability; maintaining income streams while living remotely; and the psychological adjustment to a different rhythm of life. Most successful off-gridders emphasize the importance of starting small, building incrementally, and being willing to adapt plans based on experience."
    }
  ];

  return (
    <section className="space-y-6 mb-10">
      <div id="introduction" className="space-y-4 mb-8">
        <p className="text-lg text-muted-foreground">
          Drawing from discussions in the off-grid living community, this section addresses frequently asked 
          questions for those considering or beginning their off-grid journey. These authentic insights 
          can help you understand the practical realities of this lifestyle.
        </p>
        
        <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertTitle>Real-world perspective</AlertTitle>
          <AlertDescription>
            The information below reflects real experiences from off-grid dwellers, highlighting both the rewarding 
            aspects and genuine challenges of this lifestyle. Every off-grid journey is unique—these answers provide 
            general guidance rather than universal solutions.
          </AlertDescription>
        </Alert>
      </div>

      <div className="grid grid-cols-1 gap-3 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight">Common Questions</h2>
          <Badge variant="outline" className="text-xs">12 Questions</Badge>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {questions.map((q) => (
            <AccordionItem key={q.id} value={q.id} className="border-b">
              <AccordionTrigger className="hover:no-underline py-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 mt-0.5">{q.icon}</div>
                  <span className="font-medium text-base">{q.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-10 pr-4 pb-4 text-muted-foreground">
                {q.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="bg-green-50 dark:bg-green-950/30 p-6 rounded-lg mt-12">
        <h3 className="text-lg font-semibold mb-2">Ready to Take Your Next Step?</h3>
        <p className="mb-4">
          Armed with answers to these common questions, you can now explore specific aspects of off-grid living in greater detail.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/guides/power-systems/solar-basics">
            <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
              Explore Solar Power Basics
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/calculators/solar-system">
            <Button variant="outline" className="w-full">
              Try Our Solar System Calculator
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
