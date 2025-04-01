
import React from 'react'
import { cn } from "@/lib/utils"

interface UserAvatarProps {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
  index?: number
}

const UserAvatar = ({ 
  src, 
  alt,
  size = 'md',
  index = 0
}: UserAvatarProps) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  }

  // Apply a staggered animation delay based on index
  const animationDelay = `${index * 0.1}s`

  return (
    <div 
      className={cn(
        "rounded-full overflow-hidden border-2 border-ai-white",
        "animate-fadeIn opacity-0",
        sizes[size]
      )}
      style={{ 
        animationDelay,
        animationFillMode: 'forwards'
      }}
    >
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover" 
      />
    </div>
  )
}

export default UserAvatar
