import { createFileRoute, redirect } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { BarChart3, Image, Users, FileText, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardPage,
  beforeLoad: async ({location}) => {
    if (process.env.NODE_ENV !== "development") {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  }
});

function DashboardPage() {
  const stats = [
    {
      title: "Total Images",
      value: "128",
      description: "Images stored in S3",
      change: "+14% from last month",
      icon: <Image className="w-4 h-4" />,
      link: "/dashboard/images"
    },
    {
      title: "Total Users",
      value: "2,854",
      description: "Active users",
      change: "+7.4% from last month",
      icon: <Users className="w-4 h-4" />,
      link: "/dashboard/users"
    },
    {
      title: "Content Pieces",
      value: "67",
      description: "Guides and articles",
      change: "+12% from last month",
      icon: <FileText className="w-4 h-4" />,
      link: "/dashboard/content"
    },
    {
      title: "Page Views",
      value: "24,921",
      description: "Last 30 days",
      change: "+10.2% from last month",
      icon: <BarChart3 className="w-4 h-4" />,
      link: "/dashboard/analytics"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your off-grid living platform
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className="h-4 w-4 text-muted-foreground">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
            <CardFooter className="p-2">
              <div className="flex items-center justify-between w-full">
                <span className="text-xs text-green-600 dark:text-green-400">
                  {stat.change}
                </span>
                <Link to={stat.link}>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <ArrowUpRight className="h-4 w-4" />
                    <span className="sr-only">View details</span>
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Recent activity across your platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center border rounded-md bg-gray-50 dark:bg-gray-900">
              <p className="text-muted-foreground">Activity chart will appear here</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and operations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link to="/dashboard/images">
              <Button variant="outline" className="w-full justify-start">
                <Image className="mr-2 h-4 w-4" />
                Upload New Images
              </Button>
            </Link>
            <Link to="/dashboard/content/new">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Create New Guide
              </Button>
            </Link>
            <Link to="/dashboard/settings">
              <Button variant="outline" className="w-full justify-start">
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Site Settings
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 