import React from 'react';
import { Link } from "@tanstack/react-router";
import { 
  Target, 
  ClipboardList, 
  BookOpen, 
  Calculator, 
  Map, 
  Home, 
  Zap, 
  Droplet, 
  Trash2, 
  FileText, 
  Users, 
  ArrowRight,
  LightbulbIcon,
  BadgeCheck,
  BadgeAlert,
  ArrowUpRight
} from "lucide-react";

import { Button } from "~/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "~/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Badge } from "~/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

export const StepByStepApproachContent = () => {
  return (
    <section className="space-y-6 mb-10">
      <div id="introduction" className="scroll-mt-20 space-y-4">
        <p className="text-lg text-muted-foreground">
          Embarking on an off-grid lifestyle is a significant undertaking. This guide provides a 
          structured approach to help you transition successfully, based on real experiences and 
          practical considerations. Each step builds on the previous ones, creating a roadmap for 
          your journey to off-grid living.
        </p>
        
        <div className="relative aspect-video overflow-hidden rounded-lg mb-6">
          <img
            src="/assets/guides/getting-started/step-by-step-approach.jpg"
            alt="Planning an off-grid lifestyle"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div id="step-1" className="scroll-mt-20 space-y-4 py-4 border-t">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 w-10 h-10 text-green-600 shrink-0">
            <Target className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Step 1: Define Your "Off-Grid" Vision</h2>
        </div>
        
        <p>
          Before buying land or equipment, take time to clarify what off-grid living means to you. 
          Your vision will guide all subsequent decisions and help you stay focused when challenges arise.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 my-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Clarify Your Motivations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Understanding <em>why</em> you want to live off-grid will help guide your decisions:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Are you seeking greater self-sufficiency?</li>
                <li>Looking to reduce your environmental impact?</li>
                <li>Tired of the "rat race" and high cost of living?</li>
                <li>Desiring more connection with nature?</li>
                <li>Preparing for uncertain future scenarios?</li>
                <li>Simplifying your life and reducing stress?</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Determine Your Level of "Off-Grid"</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Off-grid living exists on a spectrum. Decide how disconnected you want to be:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Completely self-sufficient with no outside connections</li>
                <li>Power independence but still connected to water/sewage</li>
                <li>Grid backup for emergencies or seasonal challenges</li>
                <li>Hybrid approach with some utilities and some self-sufficiency</li>
                <li>Weekend or seasonal off-grid living</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800">
          <LightbulbIcon className="h-4 w-4 text-amber-600" />
          <AlertTitle>Tip</AlertTitle>
          <AlertDescription>
            Write down your off-grid vision and revisit it regularly. Be honest about your comfort needs, 
            skills, and limitations. It's better to start with realistic expectations than to discover 
            halfway through that the lifestyle isn't what you imagined.
          </AlertDescription>
        </Alert>
      </div>
      
      <div id="step-2" className="scroll-mt-20 space-y-4 py-4 border-t">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 w-10 h-10 text-green-600 shrink-0">
            <ClipboardList className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Step 2: Assess Your Current Needs and Lifestyle</h2>
        </div>
        
        <p>
          Understanding your current consumption patterns and lifestyle requirements will help you design 
          appropriate systems and set realistic expectations for your off-grid transition.
        </p>
        
        <div className="space-y-4 my-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="energy">
              <AccordionTrigger className="text-base font-medium">
                Evaluate Your Energy Consumption
              </AccordionTrigger>
              <AccordionContent className="space-y-2">
                <p>Take stock of your current electrical usage to plan your off-grid power system:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Review your electricity bills to understand total consumption</li>
                  <li>Identify essential vs. non-essential appliances and devices</li>
                  <li>Note the wattage of key appliances you plan to keep</li>
                  <li>Consider seasonal variations in energy needs</li>
                  <li>Identify potential energy-efficient alternatives</li>
                </ul>
                <div className="mt-2">
                  <Link to="/calculators/home-load" className="text-green-600 flex items-center hover:underline text-sm">
                    <Calculator className="h-4 w-4 mr-1" />
                    Use our Home Load Calculator to track your energy requirements
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="water">
              <AccordionTrigger className="text-base font-medium">
                Analyze Your Water Usage
              </AccordionTrigger>
              <AccordionContent className="space-y-2">
                <p>Estimate your water needs to properly size your collection and storage systems:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Track how much water you use daily for drinking and cooking</li>
                  <li>Measure shower and bathroom usage</li>
                  <li>Consider laundry and cleaning requirements</li>
                  <li>Account for outdoor needs like gardening</li>
                  <li>Identify water-saving techniques you could implement</li>
                </ul>
                <p className="text-sm mt-2">
                  The average American uses 80-100 gallons of water per day, but off-grid living typically 
                  requires reducing this to 5-20 gallons through conservation practices.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="comfort">
              <AccordionTrigger className="text-base font-medium">
                Consider Your Comfort Requirements
              </AccordionTrigger>
              <AccordionContent className="space-y-2">
                <p>Be honest about your comfort needs and non-negotiables:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Temperature preferences (heating and cooling)</li>
                  <li>Internet and communication needs</li>
                  <li>Entertainment and media consumption</li>
                  <li>Kitchen appliances and cooking methods</li>
                  <li>Bathroom facilities and preferences</li>
                  <li>Special considerations (medical equipment, work requirements)</li>
                </ul>
                <div className="bg-muted p-3 rounded-lg mt-2">
                  <p className="text-sm italic">
                    "The most common reason people abandon off-grid living is unrealistic expectations about comfort. 
                    It's better to acknowledge your needs upfront than to discover them after investing significantly."
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      
      <div id="step-3" className="scroll-mt-20 space-y-4 py-4 border-t">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 w-10 h-10 text-green-600 shrink-0">
            <BookOpen className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Step 3: Research and Educate Yourself</h2>
        </div>
        
        <p>
          Knowledge is essential for off-grid success. Invest time in learning about the systems and skills 
          you'll need before making major financial commitments.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-amber-500" />
              <h3 className="font-medium">Power Generation</h3>
            </div>
            <ul className="text-sm space-y-1">
              <li>• Solar power system components and sizing</li>
              <li>• Wind and micro-hydro alternatives</li>
              <li>• Battery technologies and capacities</li>
              <li>• MPPT vs. PWM charge controllers</li>
              <li>• Inverters and power management</li>
              <li>• Backup generation options</li>
            </ul>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Droplet className="h-4 w-4 text-blue-500" />
              <h3 className="font-medium">Water Systems</h3>
            </div>
            <ul className="text-sm space-y-1">
              <li>• Well drilling and maintenance</li>
              <li>• Rainwater harvesting methods</li>
              <li>• Water storage options and sizing</li>
              <li>• Filtration and purification techniques</li>
              <li>• Pumping systems (manual and powered)</li>
              <li>• Winter protection strategies</li>
            </ul>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Trash2 className="h-4 w-4 text-green-500" />
              <h3 className="font-medium">Waste Management</h3>
            </div>
            <ul className="text-sm space-y-1">
              <li>• Composting toilet systems</li>
              <li>• Greywater treatment and usage</li>
              <li>• Blackwater considerations</li>
              <li>• Legal requirements for waste disposal</li>
              <li>• Septic system alternatives</li>
              <li>• Solid waste reduction strategies</li>
            </ul>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Home className="h-4 w-4 text-orange-500" />
              <h3 className="font-medium">Shelter Options</h3>
            </div>
            <ul className="text-sm space-y-1">
              <li>• Cabin and small home construction</li>
              <li>• Tiny houses and mobile solutions</li>
              <li>• Energy-efficient design principles</li>
              <li>• Insulation and thermal management</li>
              <li>• RV and alternative dwelling options</li>
              <li>• Building safety and maintenance</li>
            </ul>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <h3 className="font-medium">Legal Considerations</h3>
            </div>
            <ul className="text-sm space-y-1">
              <li>• Zoning laws and building codes</li>
              <li>• Permit requirements for off-grid systems</li>
              <li>• Land use restrictions</li>
              <li>• Water rights and regulations</li>
              <li>• Residency establishment without utilities</li>
              <li>• Insurance considerations</li>
            </ul>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-purple-500" />
              <h3 className="font-medium">Community & Resources</h3>
            </div>
            <ul className="text-sm space-y-1">
              <li>• Off-grid communities and networks</li>
              <li>• Skill-sharing and learning opportunities</li>
              <li>• Emergency planning and support</li>
              <li>• Communication tools and options</li>
              <li>• Bartering and alternative economics</li>
              <li>• Balancing independence with community</li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col-reverse md:flex-row gap-4">
          <div className="md:w-2/3">
            <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800">
              <BookOpen className="h-4 w-4 text-blue-600" />
              <AlertTitle>Learning Resources</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Books on specific off-grid systems and techniques</li>
                  <li>Online courses on renewable energy and self-sufficiency</li>
                  <li>YouTube channels dedicated to off-grid living</li>
                  <li>Forums and communities like r/OffGrid and r/OffGridLiving</li>
                  <li>Local workshops on relevant skills</li>
                  <li>Visiting established off-grid properties</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
          
          <div className="md:w-1/3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Practice Before Committing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Try weekend camping, renting an off-grid cabin, or gradually implementing 
                  off-grid systems at your current home before making a full commitment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <div id="step-4" className="scroll-mt-20 space-y-4 py-4 border-t">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 w-10 h-10 text-green-600 shrink-0">
            <Calculator className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Step 4: Financial Planning and Budgeting</h2>
        </div>
        
        <p>
          Off-grid living requires significant upfront investment before yielding long-term savings. 
          Careful financial planning will prevent costly surprises and help you prioritize your resources.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Initial Investment Considerations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-medium">Land Acquisition</h4>
                <p className="text-sm">₹1.6L – ₹41.5L+ depending on location, size, and features</p>
              </div>
              <div>
                <h4 className="font-medium">Shelter/Dwelling</h4>
                <p className="text-sm">₹2.25L (DIY tiny home) – ₹25L+ (larger custom build)</p>
              </div>
              <div>
                <h4 className="font-medium">Power System</h4>
                <p className="text-sm">₹83k (basic) – ₹12.5L+ (comprehensive system)</p>
              </div>
              <div>
                <h4 className="font-medium">Water System</h4>
                <p className="text-sm">₹16k (rainwater basic) – ₹8.3L+ (well drilling & system)</p>
              </div>
              <div>
                <h4 className="font-medium">Waste Management</h4>
                <p className="text-sm">₹4k (DIY composting toilet) – ₹4.1L+ (septic system)</p>
              </div>
              <div>
                <h4 className="font-medium">Tools and Equipment</h4>
                <p className="text-sm">₹41k – ₹4.1L+ depending on your needs</p>
              </div>
              <div>
                <h4 className="font-medium">Contingency Fund</h4>
                <p className="text-sm">At least 20% of your total budget for unexpected costs</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ongoing Expenses & Considerations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-medium">System Maintenance</h4>
                <p className="text-sm">Budget 1-2% of system cost annually for maintenance</p>
              </div>
              <div>
                <h4 className="font-medium">Battery Replacement</h4>
                <p className="text-sm">Every 5-15 years depending on battery type and usage</p>
              </div>
              <div>
                <h4 className="font-medium">Property Taxes</h4>
                <p className="text-sm">Varies by location but typically lower in rural areas</p>
              </div>
              <div>
                <h4 className="font-medium">Insurance</h4>
                <p className="text-sm">Property insurance may be higher for off-grid homes</p>
              </div>
              <div>
                <h4 className="font-medium">Fuel & Consumables</h4>
                <p className="text-sm">Propane, wood, generator fuel, filters, etc.</p>
              </div>
              <div>
                <h4 className="font-medium">Transportation</h4>
                <p className="text-sm">Often higher due to distance from services/supplies</p>
              </div>
              <div>
                <h4 className="font-medium">Income Considerations</h4>
                <p className="text-sm">Plan for remote work, local employment, or self-employment</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Alert className="col-span-1 md:col-span-2 bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800">
            <BadgeCheck className="h-4 w-4 text-green-600" />
            <AlertTitle>Cost-Saving Strategies</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li>Start small and expand systems gradually as budget allows</li>
                <li>Learn DIY skills to reduce labor costs for installation and maintenance</li>
                <li>Source used or surplus equipment when appropriate</li>
                <li>Consider alternative building methods (cob, strawbale, etc.)</li>
                <li>Join collaborative communities to share resources and skills</li>
                <li>Plan for phased implementation of systems over time</li>
              </ul>
            </AlertDescription>
          </Alert>
          
          <Alert className="bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800">
            <BadgeAlert className="h-4 w-4 text-red-600" />
            <AlertTitle>Financial Pitfalls</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li>Underestimating initial costs</li>
                <li>No emergency fund</li>
                <li>Inadequate insurance</li>
                <li>Unreliable income sources</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      </div>
      
      <div id="step-5" className="scroll-mt-20 space-y-4 py-4 border-t">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 w-10 h-10 text-green-600 shrink-0">
            <Map className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Step 5: Location and Land Acquisition</h2>
        </div>
        
        <p>
          Choosing the right location is one of the most critical decisions in your off-grid journey. 
          The land you select will determine your available resources, challenges, and lifestyle options.
        </p>
        
        <div className="bg-muted p-6 rounded-lg my-6">
          <h3 className="font-medium mb-3">Key Location Factors to Consider:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
            <div>
              <h4 className="font-medium text-green-600">Climate & Natural Resources</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Solar exposure for power generation</li>
                <li>Annual rainfall for water collection</li>
                <li>Wind patterns for wind power potential</li>
                <li>Growing season length for food production</li>
                <li>Natural water sources (springs, streams)</li>
                <li>Severity of winters and summers</li>
                <li>Foraging and hunting opportunities</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-green-600">Legal & Regulatory Environment</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Building code requirements and enforcement</li>
                <li>Minimum dwelling size regulations</li>
                <li>Zoning restrictions on off-grid systems</li>
                <li>Required connections to utilities</li>
                <li>Composting toilet and greywater permissions</li>
                <li>Water rights and usage restrictions</li>
                <li>Property tax considerations</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-green-600">Accessibility & Convenience</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Road access and maintenance</li>
                <li>Distance to essential services</li>
                <li>Winter accessibility concerns</li>
                <li>Internet and cell service availability</li>
                <li>Distance to potential employment</li>
                <li>Emergency services response time</li>
                <li>Proximity to like-minded community</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-green-600">Land Characteristics</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Topography and building sites</li>
                <li>Soil quality for gardening</li>
                <li>Existing structures or improvements</li>
                <li>Forest cover and timber resources</li>
                <li>Natural hazards (flooding, fire risk)</li>
                <li>Privacy and buffer from neighbors</li>
                <li>Wildlife considerations</li>
              </ul>
            </div>
          </div>
        </div>
        
        <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800">
          <LightbulbIcon className="h-4 w-4 text-amber-600" />
          <AlertTitle>Land Evaluation Checklist</AlertTitle>
          <AlertDescription>
            <p className="mb-2">When evaluating potential properties, consider:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Verifying water availability with well logs or percolation tests</li>
              <li>Testing soil for contamination and agricultural suitability</li>
              <li>Checking for easements or rights-of-way that affect privacy</li>
              <li>Researching previous land use that might impact your plans</li>
              <li>Visiting during different seasons to observe conditions</li>
              <li>Meeting neighbors to understand the local community</li>
              <li>Confirming legal access to the property</li>
              <li>Investigating potential for natural disasters</li>
            </ul>
          </AlertDescription>
        </Alert>
        
        <div className="pt-2">
          <p className="italic text-muted-foreground">
            "The right location balances your vision, practical needs, and budget constraints. Don't rush this 
            decision—it's far easier to adapt your systems than to change your location once established."
          </p>
        </div>
      </div>
      
      <div id="next-steps" className="mt-8 space-y-4">
        <h2 className="text-xl font-bold tracking-tight">Continue Your Off-Grid Planning Journey</h2>
        <p>
          We've covered the first five foundational steps toward off-grid living. To learn about the next phases—including
          shelter design, power system implementation, water systems, waste management, and ongoing adaptation—continue
          to our detailed guides on each system.
        </p>
        
        <div className="grid gap-4 md:grid-cols-2 my-6">
          <Link to="/guides/energy/solar-power-basics" className="group">
            <Card className="transition-all hover:border-green-200 dark:hover:border-green-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-amber-500" />
                  Power System Implementation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Learn how to design, size, and install your off-grid power system, from solar panels to battery banks.
                </p>
              </CardContent>
              <CardFooter>
                <div className="text-green-600 text-sm flex items-center">
                  Read Guide
                  <ArrowUpRight className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </CardFooter>
            </Card>
          </Link>
          
          <Link to="/guides/water/off-grid-water-systems" className="group">
            <Card className="transition-all hover:border-green-200 dark:hover:border-green-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Droplet className="h-5 w-5 mr-2 text-blue-500" />
                  Water System Planning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Discover options for sourcing, storing, purifying, and distributing water on your off-grid property.
                </p>
              </CardContent>
              <CardFooter>
                <div className="text-green-600 text-sm flex items-center">
                  Read Guide
                  <ArrowUpRight className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </CardFooter>
            </Card>
          </Link>
        </div>
        
        <div className="bg-green-50 dark:bg-green-950/30 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Ready for a Deeper Dive?</h3>
          <p className="mb-4">
            Check out our specialized calculators and planning tools to help you design your specific off-grid systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/calculators/solar-system">
              <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                Solar System Calculator
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/guides/getting-started/common-questions">
              <Button variant="outline" className="w-full">
                Common Off-Grid Questions
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
