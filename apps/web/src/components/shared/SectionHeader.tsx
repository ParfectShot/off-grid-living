import React from 'react'

interface SectionHeaderProps {
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
  titleClassName?: string
  descriptionClassName?: string
}

export function SectionHeader({
  title,
  description,
  align = 'left',
  className = '',
  titleClassName = '',
  descriptionClassName = '',
}: SectionHeaderProps) {
  return (
    <div 
      className={`${className} ${
        align === 'center' ? 'flex flex-col items-center justify-center text-center' : ''
      }`}
    >
      <div className="space-y-2">
        <h2 
          className={`text-2xl font-bold tracking-tight sm:text-3xl ${titleClassName}`}
        >
          {title}
        </h2>
        {description && (
          <p 
            className={`text-muted-foreground ${
              align === 'center' ? 'mx-auto max-w-[700px]' : ''
            } ${descriptionClassName}`}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  )
} 