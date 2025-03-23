import { Link, Outlet } from '@tanstack/react-router'
import { useState } from 'react'
import { Header } from '~/components/layout/Header'
import { MobileMenu } from '~/components/layout/MobileMenu'

export function RootLayout({ children }: { children?: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <>
      <Header isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <MobileMenu setIsMobileMenuOpen={setIsMobileMenuOpen} />
      )}
      
      {/* Add overlay blur effect when mobile menu is open */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      
      {/* Prevent scrolling when mobile menu is open */}
      <div className={isMobileMenuOpen ? "h-screen overflow-hidden md:overflow-auto" : ""}>
        {children || <Outlet />}
      </div>
      
      <footer className="w-full border-t py-6 md:py-0 px-4 md:px-16">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex gap-4">
            <Link to="/about" className="text-sm font-medium hover:underline">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:underline">
              Contact
            </Link>
            <Link to="/privacy" className="text-sm font-medium hover:underline">
              Privacy
            </Link>
            <Link to="/terms" className="text-sm font-medium hover:underline">
              Terms
            </Link>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} OffGridLiving. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
