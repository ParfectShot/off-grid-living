import { Outlet } from "@tanstack/react-router";
import { DashboardNav } from "~/components/layout/dashboard-nav";
import { ModeToggle } from "~/components/layout/mode-toggle";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Home, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      <header className="border-b bg-background z-10">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center gap-2 lg:hidden">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
          
          <div className="flex items-center gap-2 ml-4 lg:ml-0">
            <Link to="/">
              <div className="flex items-center gap-2">
                <Home className="h-5 w-5 text-green-600" />
                <span className="font-bold">Off-Grid Living</span>
              </div>
            </Link>
            <Separator orientation="vertical" className="h-6 mx-2" />
            <Link to="/dashboard">
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </Link>
          </div>
          
          <div className="ml-auto flex items-center gap-4">
            <ModeToggle />
            <div className="hidden md:flex">
              <Link to="/dashboard/settings">
                <Button variant="outline" size="sm">Settings</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for desktop */}
        <aside className={`
          border-r bg-gray-50 dark:bg-gray-900 w-64 shrink-0 
          fixed inset-y-0 pt-16 z-0 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="p-4">
            <DashboardNav className="py-4" />
          </div>
        </aside>
        
        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-0 lg:hidden" 
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto pt-4 px-4 pb-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
} 