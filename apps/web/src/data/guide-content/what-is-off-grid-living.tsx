import {
  BookOpen,
  Leaf,
  Home,
  DollarSign,
  Calculator,
  ArrowRight,
} from "lucide-react"
import { Link } from "@tanstack/react-router"

import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Badge } from "~/components/ui/badge"

export const WhatIsOffGridLivingContent = () => {
  return (
    <>
      {/* Guide introduction */}
      <div id="introduction" className="space-y-4 mb-10">
        <p className="text-xl text-muted-foreground">
          An introduction to the concept, benefits, and challenges of living off the grid, and why more people
          are choosing this lifestyle.
        </p>
        <div className="relative aspect-video overflow-hidden rounded-lg mb-6">
          <img
            src="/placeholder.svg?height=600&width=1200&text=Off-Grid+Living"
            alt="Off-grid cabin in nature"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* What Does Off-Grid Mean? */}
      <section id="definition" className="scroll-mt-20 space-y-4 mb-10">
        <h2 className="text-2xl font-bold tracking-tight">What Does Off-Grid Living Mean?</h2>
        <p>
          Off-grid living refers to a lifestyle that is independent of public utilities and infrastructure. At
          its core, living off the grid means creating self-sufficient systems for power, water, food, and waste
          management rather than relying on municipal services.
        </p>
        <p>
          While the term "off-grid" originally referred specifically to not being connected to the electrical
          power grid, it has evolved to encompass a broader philosophy of self-sufficiency and reduced
          dependence on external systems.
        </p>

        <div className="bg-muted p-4 rounded-lg my-6">
          <h3 className="font-semibold mb-2">Key Elements of Off-Grid Living:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Energy Independence:</strong> Generating your own power through solar, wind, micro-hydro,
              or other renewable sources
            </li>
            <li>
              <strong>Water Self-Sufficiency:</strong> Collecting, storing, and treating your own water supply
            </li>
            <li>
              <strong>Food Production:</strong> Growing, raising, foraging, or hunting a significant portion of
              your food
            </li>
            <li>
              <strong>Waste Management:</strong> Handling waste through composting toilets, greywater systems,
              and other sustainable methods
            </li>
            <li>
              <strong>Reduced Consumption:</strong> Living with less and being mindful of resource usage
            </li>
          </ul>
        </div>

        <p>
          It's important to note that off-grid living exists on a spectrum. Some people may be completely
          independent of all external systems, while others might focus on energy independence while still
          maintaining some connections to other services.
        </p>
      </section>

      {/* Benefits of Off-Grid Living */}
      <section id="benefits" className="scroll-mt-20 space-y-4 mb-10">
        <h2 className="text-2xl font-bold tracking-tight">Benefits of Off-Grid Living</h2>
        <p>
          The growing interest in off-grid living stems from the numerous benefits it offers, from environmental
          impact to personal freedom. Here are some of the key advantages:
        </p>

        <div className="grid gap-4 md:grid-cols-2 my-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" />
                <CardTitle className="text-lg">Environmental Benefits</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Reduced carbon footprint through renewable energy</li>
                <li>Lower resource consumption and waste production</li>
                <li>Sustainable water usage practices</li>
                <li>Preservation of natural habitats (in rural settings)</li>
                <li>Opportunity for regenerative land management</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <CardTitle className="text-lg">Financial Benefits</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Elimination of utility bills after initial investment</li>
                <li>Reduced cost of living over time</li>
                <li>Protection from rising energy and water costs</li>
                <li>Potential for lower property taxes in rural areas</li>
                <li>Savings from growing your own food</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Home className="h-5 w-5 text-green-600" />
                <CardTitle className="text-lg">Lifestyle Benefits</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Greater self-sufficiency and resilience</li>
                <li>Freedom from dependence on external systems</li>
                <li>Connection with natural cycles and seasons</li>
                <li>Development of practical skills</li>
                <li>Simpler, less consumption-focused lifestyle</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-600" />
                <CardTitle className="text-lg">Personal Growth</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Increased problem-solving abilities</li>
                <li>Greater awareness of resource consumption</li>
                <li>Deeper connection with natural environment</li>
                <li>Sense of accomplishment and self-reliance</li>
                <li>Community building with like-minded individuals</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <p>
          Many people who transition to off-grid living report a greater sense of purpose, reduced stress, and
          improved quality of life. The direct connection between daily actions and their consequences creates a
          more mindful approach to living.
        </p>
      </section>

      {/* Challenges to Consider */}
      <section id="challenges" className="scroll-mt-20 space-y-4 mb-10">
        <h2 className="text-2xl font-bold tracking-tight">Challenges to Consider</h2>
        <p>
          While off-grid living offers many benefits, it's important to approach this lifestyle with a realistic
          understanding of the challenges involved:
        </p>

        <Table className="my-6">
          <TableHeader>
            <TableRow>
              <TableHead>Challenge</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[150px]">Difficulty</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Initial Investment</TableCell>
              <TableCell>
                Setting up off-grid systems (solar, water collection, etc.) requires significant upfront costs
                before realizing long-term savings.
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-red-50 text-red-600 hover:bg-red-50">
                  High
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Technical Knowledge</TableCell>
              <TableCell>
                Maintaining off-grid systems requires learning new skills and understanding various
                technologies.
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-amber-50 text-amber-600 hover:bg-amber-50">
                  Medium
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Weather Dependence</TableCell>
              <TableCell>
                Renewable energy systems are affected by weather patterns, requiring backup systems and careful
                planning.
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-amber-50 text-amber-600 hover:bg-amber-50">
                  Medium
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Legal Restrictions</TableCell>
              <TableCell>
                Building codes, zoning laws, and regulations can limit off-grid options in many areas.
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-red-50 text-red-600 hover:bg-red-50">
                  High
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Physical Labor</TableCell>
              <TableCell>
                Off-grid living often requires more physical work than conventional living arrangements.
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-amber-50 text-amber-600 hover:bg-amber-50">
                  Medium
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Isolation</TableCell>
              <TableCell>
                Many off-grid properties are in remote locations, which can lead to social isolation.
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-amber-50 text-amber-600 hover:bg-amber-50">
                  Medium
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Limited Resources</TableCell>
              <TableCell>
                You may need to adapt to using less water, electricity, and other resources than in conventional
                living.
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">
                  Low
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <p>
          Understanding these challenges is not meant to discourage you, but rather to help you prepare
          adequately. Many off-grid dwellers find that overcoming these challenges is part of what makes the
          lifestyle rewarding.
        </p>
      </section>

      {/* Types of Off-Grid Living */}
      <section id="types" className="scroll-mt-20 space-y-4 mb-10">
        <h2 className="text-2xl font-bold tracking-tight">Types of Off-Grid Living</h2>
        <p>
          Off-grid living comes in many forms, allowing people to choose an approach that aligns with their
          goals, resources, and circumstances:
        </p>

        <Tabs defaultValue="rural" className="my-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rural">Rural Homestead</TabsTrigger>
            <TabsTrigger value="urban">Urban Off-Grid</TabsTrigger>
            <TabsTrigger value="mobile">Mobile Living</TabsTrigger>
          </TabsList>
          <TabsContent value="rural" className="space-y-4 pt-4">
            <div className="aspect-video relative overflow-hidden rounded-lg">
              <img
                src="/placeholder.svg?height=400&width=800&text=Rural+Homestead"
                alt="Rural off-grid homestead"
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-lg font-semibold">Rural Homestead</h3>
            <p>
              The classic vision of off-grid living involves a rural property with ample land for solar arrays,
              gardens, and other self-sufficiency systems.
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <h4 className="font-medium">Advantages:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>More space for systems and food production</li>
                  <li>Fewer restrictions and regulations</li>
                  <li>Access to natural resources</li>
                  <li>Privacy and independence</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium">Challenges:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Higher initial land costs</li>
                  <li>Isolation from services and community</li>
                  <li>Transportation challenges</li>
                  <li>More systems to maintain</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="urban" className="space-y-4 pt-4">
            <div className="aspect-video relative overflow-hidden rounded-lg">
              <img
                src="/placeholder.svg?height=400&width=800&text=Urban+Off-Grid"
                alt="Urban off-grid home"
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-lg font-semibold">Urban Off-Grid</h3>
            <p>
              Increasingly popular, urban off-grid living involves creating self-sufficient systems within city
              or suburban environments.
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <h4 className="font-medium">Advantages:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Proximity to community and services</li>
                  <li>Lower land costs than rural areas</li>
                  <li>Potential for community resource sharing</li>
                  <li>Easier transition from conventional living</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium">Challenges:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>More regulatory restrictions</li>
                  <li>Limited space for systems</li>
                  <li>Potential conflicts with neighbors</li>
                  <li>Less opportunity for complete self-sufficiency</li>
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="mobile" className="space-y-4 pt-4">
            <div className="aspect-video relative overflow-hidden rounded-lg">
              <img
                src="/placeholder.svg?height=400&width=800&text=Mobile+Off-Grid"
                alt="Mobile off-grid living"
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-lg font-semibold">Mobile Off-Grid Living</h3>
            <p>
              Vans, RVs, boats, and tiny homes on wheels offer a mobile approach to off-grid living, allowing
              for flexibility and changing locations.
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <h4 className="font-medium">Advantages:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Freedom to change locations</li>
                  <li>Lower initial investment than land</li>
                  <li>Simplified systems due to smaller scale</li>
                  <li>Ability to follow favorable weather</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium">Challenges:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Very limited space</li>
                  <li>Restrictions on where you can park/stay</li>
                  <li>Limited capacity for food production</li>
                  <li>Smaller energy and water systems</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <p>
          Many people begin their off-grid journey with a hybrid approach, gradually increasing their
          self-sufficiency as they develop skills and systems. There's no single "right way" to live
          off-grid—the best approach is the one that aligns with your values, resources, and goals.
        </p>
      </section>

      {/* Resources & Next Steps */}
      <section id="resources" className="scroll-mt-20 space-y-4 mb-10">
        <h2 className="text-2xl font-bold tracking-tight">Resources & Next Steps</h2>
        <p>
          If you're interested in exploring off-grid living further, here are some resources and next steps to
          consider:
        </p>

        <div className="space-y-4 my-6">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Continue with Our Getting Started Guide:</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/guides/getting-started/key-considerations"
                  className="flex items-center text-green-600 hover:underline"
                >
                  <ArrowRight className="h-4 w-4 mr-1" />
                  Key Considerations Before Going Off-Grid
                </Link>
              </li>
              <li>
                <Link
                  to="/guides/getting-started/step-by-step-approach"
                  className="flex items-center text-green-600 hover:underline"
                >
                  <ArrowRight className="h-4 w-4 mr-1" />
                  Step-by-Step Approach to Going Off-Grid
                </Link>
              </li>
              <li>
                <Link
                  to="/guides/getting-started/common-questions"
                  className="flex items-center text-green-600 hover:underline"
                >
                  <ArrowRight className="h-4 w-4 mr-1" />
                  Common Questions About Off-Grid Living
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Recommended Tools:</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/calculators/home-load"
                  className="flex items-center text-green-600 hover:underline"
                >
                  <Calculator className="h-4 w-4 mr-1" />
                  Home Load Calculator - Determine your energy needs
                </Link>
              </li>
              <li>
                <Link
                  to="/calculators/solar-system"
                  className="flex items-center text-green-600 hover:underline"
                >
                  <Calculator className="h-4 w-4 mr-1" />
                  Solar System Calculator - Design your power system
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Downloadable Resources:</h3>
            <Button variant="outline" className="gap-2">
              <ArrowRight className="h-4 w-4" />
              Off-Grid Living Checklist
            </Button>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-950/30 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Ready to Take the Next Step?</h3>
          <p className="mb-4">
            Continue exploring our guides or use our calculators to start planning your off-grid systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/guides/getting-started/key-considerations">
              <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                Continue to Key Considerations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/calculators">
              <Button variant="outline" className="w-full">
                Explore Our Calculators
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
