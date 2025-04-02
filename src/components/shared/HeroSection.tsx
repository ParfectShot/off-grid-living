import React from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Button } from '~/components/ui/button'

interface HeroSectionProps {
  title: string
  description: string
  backgroundImage?: string
  primaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
  centered?: boolean
  className?: string
}

export function HeroSection({
  title,
  description,
  backgroundImage = '/assets/guides/getting-started/mountain-solar-home.webp',
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  centered = true,
  className = '',
}: HeroSectionProps) {
  return (
    <section 
      className={`w-full py-12 md:py-24 lg:py-32 bg-cover bg-center ${className}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container px-4 md:px-6 flex flex-col items-center justify-center space-y-4 text-center">
        <div className={`space-y-2 ${centered ? 'bg-background/80 backdrop-blur-sm p-6 rounded-lg max-w-3xl' : ''}`}>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            {title}
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            {description}
          </p>
          {(primaryButtonText || secondaryButtonText) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              {primaryButtonText && primaryButtonLink && (
                <Link to={primaryButtonLink}>
                  <Button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-600 hover:bg-green-700 h-10 px-4 py-2 text-white">
                    {primaryButtonText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              )}
              {secondaryButtonText && secondaryButtonLink && (
                <Link to={secondaryButtonLink}>
                  <Button variant="outline">{secondaryButtonText}</Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
} 