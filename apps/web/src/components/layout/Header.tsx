import { Link } from '@tanstack/react-router';
import { Home, X } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { ModeToggle } from '~/components/mode-toggle';
import { MainNav } from '~/components/layout/MainNav';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export function Header({ isMobileMenuOpen, toggleMobileMenu }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between p-4 md:px-16 mx-auto">
        <div className="flex items-center gap-2">
          <Home className="h-6 w-6 text-green-600" />
          <span className="text-xl font-bold">OffGridLiving</span>
        </div>
        
        <MainNav className="hidden md:flex" />
        
        <Button 
          variant="outline" 
          size="icon" 
          className="md:hidden"
          onClick={toggleMobileMenu}
        >
          <span className="sr-only">Toggle menu</span>
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
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
          )}
        </Button>
      </div>
    </header>
  );
}
