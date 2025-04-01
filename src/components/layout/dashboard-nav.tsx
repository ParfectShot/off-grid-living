import { Link } from '@tanstack/react-router';
import { Image, LayoutDashboard, BarChart, Settings, Users, FileText, NotebookText, Package, PencilRuler } from 'lucide-react';
import { cn } from '~/lib/utils';

interface DashboardNavProps {
  className?: string;
}

export function DashboardNav({ className }: DashboardNavProps) {
  return (
    <nav className={cn("grid items-start gap-2", className)}>
      <Link
        to="/dashboard"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary data-[status=active]:bg-muted data-[status=active]:text-primary"
        activeProps={{ className: 'bg-muted text-primary' }}
        activeOptions={{ exact: true }}
      >
        <LayoutDashboard className="h-4 w-4" />
        <span>Overview</span>
      </Link>
      <Link
        to="/dashboard/manage"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary data-[status=active]:bg-muted data-[status=active]:text-primary"
        activeProps={{ className: 'bg-muted text-primary' }}
        activeOptions={{ exact: true }}
      >
        <PencilRuler className="h-4 w-4" />
        <span>Manage Content</span>
      </Link>
      <Link
        to="/dashboard/manage" search={{ tab: 'guides' }}
        className="flex items-center gap-3 rounded-lg pl-9 pr-3 py-2 text-muted-foreground transition-all hover:text-primary data-[status=active]:bg-muted data-[status=active]:text-primary"
        activeProps={{ className: 'bg-muted text-primary' }}
      >
        <NotebookText className="h-4 w-4" />
        <span>Guides</span>
      </Link>
      <Link
        to="/dashboard/manage" search={{ tab: 'products' }}
        className="flex items-center gap-3 rounded-lg pl-9 pr-3 py-2 text-muted-foreground transition-all hover:text-primary data-[status=active]:bg-muted data-[status=active]:text-primary"
        activeProps={{ className: 'bg-muted text-primary' }}
      >
        <Package className="h-4 w-4" />
        <span>Products</span>
      </Link>
      <Link
        to="/dashboard/manage" search={{ tab: 'blogs' }}
        className="flex items-center gap-3 rounded-lg pl-9 pr-3 py-2 text-muted-foreground transition-all hover:text-primary data-[status=active]:bg-muted data-[status=active]:text-primary"
        activeProps={{ className: 'bg-muted text-primary' }}
      >
        <FileText className="h-4 w-4" />
        <span>Blogs</span>
      </Link>
      <Link
        to="/dashboard/analytics"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary data-[status=active]:bg-muted data-[status=active]:text-primary"
        activeProps={{ className: 'bg-muted text-primary' }}
      >
        <BarChart className="h-4 w-4" />
        <span>Analytics</span>
      </Link>
      <Link
        to="/dashboard/process-images"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary data-[status=active]:bg-muted data-[status=active]:text-primary"
        activeProps={{ className: 'bg-muted text-primary' }}
      >
        <Image className="h-4 w-4" />
        <span>Process Images</span>
      </Link>
      <Link
        to="/dashboard/users"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary data-[status=active]:bg-muted data-[status=active]:text-primary"
        activeProps={{ className: 'bg-muted text-primary' }}
      >
        <Users className="h-4 w-4" />
        <span>Users</span>
      </Link>
      <Link
        to="/dashboard/settings"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary data-[status=active]:bg-muted data-[status=active]:text-primary"
        activeProps={{ className: 'bg-muted text-primary' }}
      >
        <Settings className="h-4 w-4" />
        <span>Settings</span>
      </Link>
    </nav>
  );
} 