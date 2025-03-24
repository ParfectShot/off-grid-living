import { useState, useEffect } from "react"
import { Link } from "@tanstack/react-router"
import { createFileRoute } from "@tanstack/react-router"
import { ArrowLeft, Plus, Trash2, Info, Lightbulb, RefreshCw, Download, Calculator } from "lucide-react"

import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Badge } from "~/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip"
import { Separator } from "~/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"

// Types
interface Appliance {
  id: number
  name: string
  watts: number
  hoursPerDay: number
  category: string
  essential: boolean
}

// Data
// Common appliance wattage data
const commonAppliances = {
  kitchen: [
    { name: "Refrigerator", watts: 150, category: "Kitchen", essential: true },
    { name: "Freezer", watts: 200, category: "Kitchen", essential: true },
    { name: "Microwave", watts: 1000, category: "Kitchen", essential: false },
    { name: "Coffee Maker", watts: 800, category: "Kitchen", essential: false },
    { name: "Toaster", watts: 850, category: "Kitchen", essential: false },
    { name: "Blender", watts: 300, category: "Kitchen", essential: false },
    { name: "Electric Kettle", watts: 1500, category: "Kitchen", essential: false },
    { name: "Slow Cooker", watts: 270, category: "Kitchen", essential: false },
    { name: "Induction Cooktop", watts: 1800, category: "Kitchen", essential: false },
  ],
  lighting: [
    { name: "LED Light Bulb", watts: 10, category: "Lighting", essential: true },
    { name: "CFL Light Bulb", watts: 14, category: "Lighting", essential: true },
    { name: "Incandescent Bulb", watts: 60, category: "Lighting", essential: true },
    { name: "LED Strip Lights", watts: 20, category: "Lighting", essential: false },
  ],
  entertainment: [
    { name: 'TV (LED 32")', watts: 50, category: "Entertainment", essential: false },
    { name: 'TV (LED 50")', watts: 100, category: "Entertainment", essential: false },
    { name: "Laptop", watts: 50, category: "Entertainment", essential: false },
    { name: "Desktop Computer", watts: 200, category: "Entertainment", essential: false },
    { name: "Gaming Console", watts: 150, category: "Entertainment", essential: false },
    { name: "Stereo System", watts: 80, category: "Entertainment", essential: false },
    { name: "Tablet Charging", watts: 10, category: "Entertainment", essential: false },
    { name: "Smartphone Charging", watts: 5, category: "Entertainment", essential: false },
  ],
  climate: [
    { name: "Ceiling Fan", watts: 75, category: "Climate", essential: false },
    { name: "Box Fan", watts: 100, category: "Climate", essential: false },
    { name: "Space Heater", watts: 1500, category: "Climate", essential: false },
    { name: "Dehumidifier", watts: 280, category: "Climate", essential: false },
    { name: "Air Purifier", watts: 50, category: "Climate", essential: false },
  ],
  bathroom: [
    { name: "Hair Dryer", watts: 1500, category: "Bathroom", essential: false },
    { name: "Electric Shaver", watts: 15, category: "Bathroom", essential: false },
    { name: "Electric Toothbrush Charger", watts: 5, category: "Bathroom", essential: false },
  ],
  laundry: [
    { name: "Washing Machine", watts: 500, category: "Laundry", essential: false },
    { name: "Clothes Dryer", watts: 3000, category: "Laundry", essential: false },
    { name: "Iron", watts: 1200, category: "Laundry", essential: false },
  ],
  office: [
    { name: "Printer", watts: 50, category: "Office", essential: false },
    { name: "Router/Modem", watts: 15, category: "Office", essential: true },
    { name: "Monitor", watts: 30, category: "Office", essential: false },
  ],
  other: [
    { name: "Water Pump", watts: 250, category: "Other", essential: true },
    { name: "Well Pump", watts: 750, category: "Other", essential: true },
    { name: "Power Tools", watts: 1000, category: "Other", essential: false },
    { name: "Sump Pump", watts: 800, category: "Other", essential: true },
  ],
}

// Default example appliances
const defaultAppliances = [
  { id: 1, name: "Refrigerator", watts: 150, hoursPerDay: 24, category: "Kitchen", essential: true },
  { id: 2, name: "LED Lights (5 bulbs)", watts: 50, hoursPerDay: 6, category: "Lighting", essential: true },
  { id: 3, name: "Laptop", watts: 50, hoursPerDay: 4, category: "Entertainment", essential: false },
  { id: 4, name: 'TV (LED 32")', watts: 50, hoursPerDay: 3, category: "Entertainment", essential: false },
  { id: 5, name: "Router/Modem", watts: 15, hoursPerDay: 24, category: "Office", essential: true },
  { id: 6, name: "Smartphone Charging", watts: 5, hoursPerDay: 2, category: "Entertainment", essential: true },
]

// Common wattage chips for quick selection
const wattageChips = [5, 10, 15, 50, 100, 150, 200, 500, 1000, 1500]

export const Route = createFileRoute("/calculators/home-load/")({
  component: HomeLoadCalculatorPage,
})

function HomeLoadCalculatorPage() {
  const [appliances, setAppliances] = useState<Appliance[]>(defaultAppliances)
  const [newAppliance, setNewAppliance] = useState<Partial<Appliance>>({
    name: "",
    watts: 0,
    hoursPerDay: 1,
    category: "Other",
    essential: false,
  })
  const [activeCategory, setActiveCategory] = useState("all")
  const [totalWattHours, setTotalWattHours] = useState(0)
  const [essentialWattHours, setEssentialWattHours] = useState(0)
  const [showResults, setShowResults] = useState(false)

  // Calculate totals whenever appliances change
  useEffect(() => {
    const total = appliances.reduce((sum, app) => sum + app.watts * app.hoursPerDay, 0)
    const essential = appliances
      .filter((app) => app.essential)
      .reduce((sum, app) => sum + app.watts * app.hoursPerDay, 0)

    setTotalWattHours(total)
    setEssentialWattHours(essential)
  }, [appliances])

  // Add a new appliance
  const handleAddAppliance = () => {
    if (newAppliance.name && newAppliance.watts && newAppliance.watts > 0 && newAppliance.hoursPerDay && newAppliance.hoursPerDay > 0) {
      const id = appliances.length > 0 ? Math.max(...appliances.map((a) => a.id)) + 1 : 1
      setAppliances([...appliances, { ...newAppliance, id } as Appliance])
      setNewAppliance({
        name: "",
        watts: 0,
        hoursPerDay: 1,
        category: "Other",
        essential: false,
      })
    }
  }

  // Remove an appliance
  const handleRemoveAppliance = (id: number) => {
    setAppliances(appliances.filter((app) => app.id !== id))
  }

  // Update an appliance
  const handleUpdateAppliance = (id: number, field: keyof Appliance, value: any) => {
    setAppliances(appliances.map((app) => (app.id === id ? { ...app, [field]: value } : app)))
  }

  // Reset to default example
  const handleReset = () => {
    setAppliances(defaultAppliances)
    setShowResults(false)
  }

  // Select a common appliance
  const handleSelectCommonAppliance = (appliance: { name: string; watts: number; category: string; essential: boolean }) => {
    setNewAppliance({
      ...newAppliance,
      name: appliance.name,
      watts: appliance.watts,
      category: appliance.category,
      essential: appliance.essential,
    })
  }

  // Filter appliances by category
  const filteredAppliances =
    activeCategory === "all" ? appliances : appliances.filter((app) => app.category.toLowerCase() === activeCategory)

  // Get categories from appliances
  const categories = ["all", ...new Set(appliances.map((app) => app.category.toLowerCase()))]

  return (
      <main className="flex-1">
        {/* Back to calculators link */}
        <div className="container px-4 md:px-6 pt-8">
          <Link
            to="/calculators"
            className="inline-flex items-center text-sm font-medium text-green-600 dark:text-green-400 hover:underline"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Calculators
          </Link>
        </div>

        {/* Calculator header */}
        <section className="container px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Home Load Calculator</h1>
              <p className="text-muted-foreground">
                Calculate your daily energy consumption by adding your appliances and their usage hours.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleReset} className="gap-1">
                <RefreshCw className="h-4 w-4" />
                Reset
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left column - Add appliances */}
            <div className="lg:col-span-2 space-y-8">
              {/* Add new appliance */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Add Appliance</CardTitle>
                  <CardDescription>Enter details for a new appliance or select from common options</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="manual" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                      <TabsTrigger value="common">Common Appliances</TabsTrigger>
                    </TabsList>
                    <TabsContent value="manual" className="space-y-4 pt-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Appliance Name</Label>
                          <Input
                            id="name"
                            placeholder="e.g., Refrigerator"
                            value={newAppliance.name}
                            onChange={(e) => setNewAppliance({ ...newAppliance, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="watts">Power (Watts)</Label>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-5 w-5">
                                    <Info className="h-3 w-3" />
                                    <span className="sr-only">Wattage Info</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs">
                                    The power consumption in watts. Check the label on your appliance or user manual.
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <div className="space-y-2">
                            <Input
                              id="watts"
                              type="number"
                              min="0"
                              placeholder="e.g., 150"
                              value={newAppliance.watts || ""}
                              onChange={(e) =>
                                setNewAppliance({ ...newAppliance, watts: Number.parseInt(e.target.value) || 0 })
                              }
                            />
                            <div className="flex flex-wrap gap-2">
                              {wattageChips.map((watts) => (
                                <Badge
                                  key={watts}
                                  variant="outline"
                                  className="cursor-pointer hover:bg-secondary"
                                  onClick={() => setNewAppliance({ ...newAppliance, watts })}
                                >
                                  {watts}W
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor="hours">Hours Per Day</Label>
                          <Input
                            id="hours"
                            type="number"
                            min="0"
                            max="24"
                            step="0.5"
                            placeholder="e.g., 6"
                            value={newAppliance.hoursPerDay || ""}
                            onChange={(e) =>
                              setNewAppliance({ ...newAppliance, hoursPerDay: Number.parseFloat(e.target.value) || 0 })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select
                            value={newAppliance.category}
                            onValueChange={(value) => setNewAppliance({ ...newAppliance, category: value })}
                          >
                            <SelectTrigger id="category">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.keys(commonAppliances).map((category) => (
                                <SelectItem key={category} value={category.charAt(0).toUpperCase() + category.slice(1)}>
                                  {category.charAt(0).toUpperCase() + category.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center space-x-2 pt-8">
                          <input
                            type="checkbox"
                            id="essential"
                            checked={newAppliance.essential}
                            onChange={(e) => setNewAppliance({ ...newAppliance, essential: e.target.checked })}
                            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                          />
                          <Label
                            htmlFor="essential"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Essential appliance
                          </Label>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="common" className="pt-4">
                      <div className="space-y-4">
                        <Select
                          onValueChange={(value) => {
                            const category = value.toLowerCase()
                            const appliances = commonAppliances[category as keyof typeof commonAppliances] || []
                            if (appliances.length > 0) {
                              handleSelectCommonAppliance(appliances[0])
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.keys(commonAppliances).map((category) => (
                              <SelectItem key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <div className="grid gap-2 max-h-[300px] overflow-y-auto pr-2">
                          {Object.keys(commonAppliances).map((category) => (
                            <div key={category}>
                              {commonAppliances[category as keyof typeof commonAppliances].map((appliance) => (
                                <div
                                  key={appliance.name}
                                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted cursor-pointer"
                                  onClick={() => handleSelectCommonAppliance(appliance)}
                                >
                                  <div className="flex items-center gap-2">
                                    <Lightbulb className="h-4 w-4 text-muted-foreground" />
                                    <span>{appliance.name}</span>
                                  </div>
                                  <Badge variant="outline">{appliance.watts}W</Badge>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="common-hours">Hours Per Day</Label>
                            <Input
                              id="common-hours"
                              type="number"
                              min="0"
                              max="24"
                              step="0.5"
                              placeholder="e.g., 6"
                              value={newAppliance.hoursPerDay || ""}
                              onChange={(e) =>
                                setNewAppliance({
                                  ...newAppliance,
                                  hoursPerDay: Number.parseFloat(e.target.value) || 0,
                                })
                              }
                            />
                          </div>
                          <div className="flex items-center space-x-2 pt-8">
                            <input
                              type="checkbox"
                              id="common-essential"
                              checked={newAppliance.essential}
                              onChange={(e) => setNewAppliance({ ...newAppliance, essential: e.target.checked })}
                              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                            />
                            <Label
                              htmlFor="common-essential"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Essential appliance
                            </Label>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleAddAppliance}
                    disabled={!newAppliance.name || !newAppliance.watts || newAppliance.watts <= 0 || !newAppliance.hoursPerDay || newAppliance.hoursPerDay <= 0}
                    className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Appliance
                  </Button>
                </CardFooter>
              </Card>

              {/* Appliance list */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Your Appliances</CardTitle>
                  <CardDescription>
                    {appliances.length} appliances added, {totalWattHours.toLocaleString()} Wh/day total
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {appliances.length > 0 ? (
                    <>
                      <Tabs defaultValue="all" className="w-full">
                        <TabsList className="flex flex-wrap h-auto mb-4">
                          {categories.map((category) => (
                            <TabsTrigger
                              key={category}
                              value={category}
                              onClick={() => setActiveCategory(category)}
                              className="text-sm"
                            >
                              {category === "all" ? "All" : category.charAt(0).toUpperCase() + category.slice(1)}
                            </TabsTrigger>
                          ))}
                        </TabsList>

                        {/* Desktop Table View - Hidden on Mobile */}
                        <div className="hidden md:block">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Appliance</TableHead>
                                <TableHead className="w-[100px] text-right">Watts</TableHead>
                                <TableHead className="w-[100px] text-right">Hours/Day</TableHead>
                                <TableHead className="w-[120px] text-right">Wh/Day</TableHead>
                                <TableHead className="w-[80px] text-center">Essential</TableHead>
                                <TableHead className="w-[80px]"></TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredAppliances.map((appliance) => (
                                <TableRow key={appliance.id}>
                                  <TableCell className="font-medium">{appliance.name}</TableCell>
                                  <TableCell className="text-right">
                                    <Input
                                      type="number"
                                      min="0"
                                      value={appliance.watts}
                                      onChange={(e) =>
                                        handleUpdateAppliance(appliance.id, "watts", Number.parseInt(e.target.value) || 0)
                                      }
                                      className="w-20 h-8 text-right"
                                    />
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <Input
                                      type="number"
                                      min="0"
                                      max="24"
                                      step="0.5"
                                      value={appliance.hoursPerDay}
                                      onChange={(e) =>
                                        handleUpdateAppliance(
                                          appliance.id,
                                          "hoursPerDay",
                                          Number.parseFloat(e.target.value) || 0,
                                        )
                                      }
                                      className="w-20 h-8 text-right"
                                    />
                                  </TableCell>
                                  <TableCell className="text-right font-medium">
                                    {(appliance.watts * appliance.hoursPerDay).toLocaleString()}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <input
                                      type="checkbox"
                                      checked={appliance.essential}
                                      onChange={(e) => handleUpdateAppliance(appliance.id, "essential", e.target.checked)}
                                      className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                                    />
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleRemoveAppliance(appliance.id)}
                                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                      <span className="sr-only">Remove</span>
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>

                        {/* Mobile Card View - Visible only on Mobile */}
                        <div className="md:hidden space-y-4">
                          {filteredAppliances.map((appliance) => (
                            <div 
                              key={appliance.id} 
                              className="border rounded-lg p-3 bg-card"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium text-base">{appliance.name}</h3>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1">
                                    <input
                                      type="checkbox"
                                      id={`essential-mobile-${appliance.id}`}
                                      checked={appliance.essential}
                                      onChange={(e) => handleUpdateAppliance(appliance.id, "essential", e.target.checked)}
                                      className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                                    />
                                    <Label 
                                      htmlFor={`essential-mobile-${appliance.id}`}
                                      className="text-xs text-muted-foreground"
                                    >
                                      Essential
                                    </Label>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemoveAppliance(appliance.id)}
                                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Remove</span>
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <Label 
                                    htmlFor={`watts-mobile-${appliance.id}`} 
                                    className="text-xs text-muted-foreground"
                                  >
                                    Power (Watts)
                                  </Label>
                                  <Input
                                    id={`watts-mobile-${appliance.id}`}
                                    type="number"
                                    min="0"
                                    value={appliance.watts}
                                    onChange={(e) =>
                                      handleUpdateAppliance(appliance.id, "watts", Number.parseInt(e.target.value) || 0)
                                    }
                                    className="h-8"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <Label 
                                    htmlFor={`hours-mobile-${appliance.id}`} 
                                    className="text-xs text-muted-foreground"
                                  >
                                    Hours Per Day
                                  </Label>
                                  <Input
                                    id={`hours-mobile-${appliance.id}`}
                                    type="number"
                                    min="0"
                                    max="24"
                                    step="0.5"
                                    value={appliance.hoursPerDay}
                                    onChange={(e) =>
                                      handleUpdateAppliance(
                                        appliance.id,
                                        "hoursPerDay",
                                        Number.parseFloat(e.target.value) || 0,
                                      )
                                    }
                                    className="h-8"
                                  />
                                </div>
                              </div>
                              
                              <div className="mt-2 text-right">
                                <span className="text-sm font-medium">Daily consumption: </span>
                                <span className="text-sm font-bold">
                                  {(appliance.watts * appliance.hoursPerDay).toLocaleString()} Wh/day
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Tabs>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <Calculator className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No appliances added yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Add your first appliance using the form above or reset to load the example data.
                      </p>
                      <Button variant="outline" onClick={handleReset}>
                        Load Example Data
                      </Button>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Tip: Mark essential appliances to see your minimum power requirements.
                    </p>
                  </div>
                  <Button
                    onClick={() => setShowResults(true)}
                    disabled={appliances.length === 0}
                    className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 w-full sm:w-auto"
                  >
                    Calculate Results
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Right column - Results */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-xl">Energy Summary</CardTitle>
                  <CardDescription>Your daily energy consumption breakdown</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Total energy consumption */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Daily Consumption</h3>
                    <div className="flex items-end justify-between">
                      <span className="text-4xl font-bold">{totalWattHours.toLocaleString()}</span>
                      <span className="text-2xl">Wh/day</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{(totalWattHours / 1000).toFixed(2)} kWh per day</p>
                  </div>

                  <Separator />

                  {/* Essential vs Non-essential */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-muted-foreground">Consumption Breakdown</h3>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Essential</span>
                        <span>{essentialWattHours.toLocaleString()} Wh/day</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div
                          className="bg-green-600 dark:bg-green-500 h-2.5 rounded-full"
                          style={{ width: `${totalWattHours > 0 ? (essentialWattHours / totalWattHours) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Non-essential</span>
                        <span>{(totalWattHours - essentialWattHours).toLocaleString()} Wh/day</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div
                          className="bg-amber-500 h-2.5 rounded-full"
                          style={{
                            width: `${totalWattHours > 0 ? ((totalWattHours - essentialWattHours) / totalWattHours) * 100 : 0}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Category breakdown */}
                  {showResults && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-muted-foreground">Category Breakdown</h3>

                      {categories
                        .filter((cat) => cat !== "all")
                        .map((category) => {
                          const categoryAppliances = appliances.filter((app) => app.category.toLowerCase() === category)
                          const categoryWattHours = categoryAppliances.reduce(
                            (sum, app) => sum + app.watts * app.hoursPerDay,
                            0,
                          )
                          const percentage = totalWattHours > 0 ? (categoryWattHours / totalWattHours) * 100 : 0

                          return (
                            <div key={category} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                                <span>{categoryWattHours.toLocaleString()} Wh/day</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2.5">
                                <div
                                  className="bg-blue-500 h-2.5 rounded-full"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  )}

                  {showResults && (
                    <>
                      <Separator />

                      {/* Recommendations */}
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium text-muted-foreground">System Recommendations</h3>

                        <div className="space-y-2 text-sm">
                          <p className="font-medium">Minimum Battery Capacity:</p>
                          <p>
                            For 1 day of autonomy:{" "}
                            <span className="font-semibold">
                              {Math.ceil((totalWattHours * 1.2) / 0.8).toLocaleString()} Wh
                            </span>
                          </p>
                          <p>
                            For essential loads only:{" "}
                            <span className="font-semibold">
                              {Math.ceil((essentialWattHours * 1.2) / 0.8).toLocaleString()} Wh
                            </span>
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Includes 20% safety margin and 80% depth of discharge
                          </p>
                        </div>

                        <div className="space-y-2 text-sm">
                          <p className="font-medium">Recommended Solar Array:</p>
                          <p>
                            Minimum size:{" "}
                            <span className="font-semibold">{Math.ceil(totalWattHours / 4).toLocaleString()} W</span>
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Based on 4 average peak sun hours per day
                          </p>
                        </div>

                        <div className="space-y-2 text-sm">
                          <p className="font-medium">Next Steps:</p>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Use our Solar System Calculator to design your complete system</li>
                            <li>Consider energy-efficient alternatives for high-consumption appliances</li>
                            <li>Plan your battery bank based on days of autonomy needed</li>
                          </ul>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
                <CardFooter>
                  <Link to="/calculators/solar-system" className="w-full">
                    <Button className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
                      Continue to Solar System Calculator
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
  )
}
