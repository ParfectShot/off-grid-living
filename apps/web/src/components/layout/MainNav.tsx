import { Link } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';
import { ModeToggle } from '~/components/mode-toggle';

interface MainNavProps {
  className?: string;
  onClick?: () => void;
  vertical?: boolean;
  hideThemeToggle?: boolean;
}

export function MainNav({ 
  className = "", 
  onClick, 
  vertical = false,
  hideThemeToggle = false
}: MainNavProps) {
  const navItemClass = vertical 
    ? "text-lg font-medium hover:text-green-600 transition-colors"
    : "text-sm font-medium hover:text-green-600 transition-colors";
    
  const containerClass = vertical
    ? "flex flex-col space-y-6"
    : "items-center gap-6 " + className;

  return (
    <nav className={containerClass}>
      {!vertical && !hideThemeToggle && <ModeToggle />}
      <Link
        to="/"
        activeProps={{
          className: 'text-green-600 font-bold',
        }}
        activeOptions={{ exact: true }}
        className={navItemClass}
        onClick={onClick}
      >
        Home
      </Link>
      <Link
        to="/blogs"
        activeProps={{
          className: 'text-green-600 font-bold',
        }}
        className={navItemClass}
        onClick={onClick}
      >
        Blogs
      </Link>
      <Link
        to="/calculators"
        activeProps={{
          className: 'text-green-600 font-bold',
        }}
        className={navItemClass}
        onClick={onClick}
      >
        Calculators
      </Link>
      <Link
        to="/reviews"
        activeProps={{
          className: 'text-green-600 font-bold',
        }}
        className={navItemClass}
        onClick={onClick}
      >
        Reviews
      </Link>
      <Button 
        variant="default" 
        className={`bg-green-600 hover:bg-green-700 ${vertical ? 'w-full' : ''}`}
        onClick={onClick}
      >
        Get Started
      </Button>
      {/* Removed theme toggle from bottom of vertical nav */}
    </nav>
  );
}
