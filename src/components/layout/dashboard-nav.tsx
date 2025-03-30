import { Link } from '@tanstack/react-router';
import { Image, LayoutDashboard, BarChart, Settings, Users, FileText } from 'lucide-react';

interface DashboardNavProps {
  className?: string;
}

export function DashboardNav({ className = "" }: DashboardNavProps) {
  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5 mr-3" />
    },
    {
      title: "Images",
      href: "/dashboard/images",
      icon: <Image className="w-5 h-5 mr-3" />
    },
    {
      title: "Content",
      href: "/dashboard/content",
      icon: <FileText className="w-5 h-5 mr-3" />
    },
    {
      title: "Products",
      href: "/dashboard/products",
      icon: <FileText className="w-5 h-5 mr-3" />
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: <BarChart className="w-5 h-5 mr-3" />
    },
    {
      title: "Users",
      href: "/dashboard/users",
      icon: <Users className="w-5 h-5 mr-3" />
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="w-5 h-5 mr-3" />
    }
  ];

  return (
    <nav className={`space-y-1 ${className}`}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          activeProps={{
            className: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400',
          }}
          activeOptions={{ exact: item.href === "/dashboard" }}
          className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-100 transition-colors"
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  );
} 