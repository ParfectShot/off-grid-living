import * as LucideIcons from "lucide-react"

interface GuideIconProps {
  name: string
  className?: string
}

export function GuideIcon({ name, className = "h-6 w-6 text-green-600 dark:text-green-400" }: GuideIconProps) {
  // Safely get the icon component by name, or fallback to Book if not found
  const IconComponent = (LucideIcons[name as keyof typeof LucideIcons] as React.ElementType) || LucideIcons.BookOpen

  return <IconComponent className={className} aria-hidden="true" />
}
