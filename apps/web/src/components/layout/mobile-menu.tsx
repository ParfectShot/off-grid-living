import { X } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { ModeToggle } from '~/components/mode-toggle';
import { MainNav } from './main-nav';

interface MobileMenuProps {
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export function MobileMenu({ setIsMobileMenuOpen }: MobileMenuProps) {
  return (
    <div className="fixed inset-0 z-50 bg-background md:hidden">
      <div className="container mx-auto px-4 py-6">
        {/* Close button and theme toggle header */}
        <div className="flex items-center justify-between mb-6">
          <ModeToggle />
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-foreground"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>
        
        <MainNav 
          vertical 
          onClick={() => setIsMobileMenuOpen(false)}
          hideThemeToggle={true}
        />
      </div>
    </div>
  );
}
