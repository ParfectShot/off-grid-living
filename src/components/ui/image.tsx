import { ImgHTMLAttributes } from 'react'

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  width: number
  height: number
}

export default function Image({ src, alt, width, height, className, ...props }: ImageProps) {
  return (
    <img 
      src={src} 
      alt={alt || ''} 
      width={width} 
      height={height} 
      className={className}
      loading="lazy"
      {...props}
    />
  )
}
