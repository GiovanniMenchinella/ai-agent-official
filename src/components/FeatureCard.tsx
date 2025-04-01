
import React from 'react'
import { cn } from "@/lib/utils"
import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  className?: string
  tags?: string[]
  variant?: 'default' | 'light'
  children?: React.ReactNode
}

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  className,
  tags,
  variant = 'default',
  children
}: FeatureCardProps) => {
  return (
    <div 
      className={cn(
        "rounded-2xl p-8 transition-all duration-300 hover:translate-y-[-4px]",
        variant === 'default' ? 'glass' : 'bg-ai-white text-ai-dark',
        className
      )}
    >
      <div className="mb-6 w-12 h-12 rounded-full flex items-center justify-center bg-ai-purple/10 mx-auto">
        <Icon className="w-6 h-6 text-ai-purple" />
      </div>
      
      <h3 className="text-xl font-bold mb-3 text-center">
        {title}
      </h3>
      
      <p className={cn(
        "mb-5 text-center",
        variant === 'default' ? 'text-ai-gray' : 'text-ai-dark/70'
      )}>
        {description}
      </p>
      
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-auto justify-center">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className={cn(
                "px-3 py-1 text-xs rounded-full",
                variant === 'default' 
                  ? 'bg-ai-blue/10 text-ai-lightpurple' 
                  : 'bg-ai-lightpurple/10 text-ai-purple'
              )}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {children}
    </div>
  )
}

export default FeatureCard
