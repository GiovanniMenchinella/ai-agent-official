import React from 'react'
import { cn } from "@/lib/utils"
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ButtonGlowProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  icon?: boolean
  onClick?: () => void
}

const ButtonGlow: React.FC<ButtonGlowProps> = ({ 
  children,
  className,
  icon = false,
  onClick,
  ...props
}) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-ai-purple to-ai-blue px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_0_2rem_-0.5rem_#818fff] focus:outline-none focus:ring-2 focus:ring-ai-purple focus:ring-offset-2 focus:ring-offset-ai-black",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center">
        {children}
        {icon && (
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        )}
      </span>
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-0 rounded-full bg-gradient-blue opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
      </span>
    </Button>
  )
}

export default ButtonGlow
