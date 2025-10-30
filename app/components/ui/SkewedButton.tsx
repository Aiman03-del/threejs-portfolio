'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface SkewedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const SkewedButton = React.forwardRef<HTMLButtonElement, SkewedButtonProps>(
  ({ children, variant = 'primary', size = 'md', className, ...props }, ref) => {
    
    const variants = {
      primary: 'bg-white text-gray-900',
      secondary: 'bg-blue-500 text-white',
      outline: 'bg-transparent border-2 border-white text-white'
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm min-w-[100px]',
      md: 'px-6 py-3 text-base min-w-[120px]',  
      lg: 'px-8 py-4 text-lg min-w-[140px]'
    }

    // Custom styles for outline variant
    const outlineStyles = variant === 'outline' ? {
      '--before-bg': 'white'
    } as React.CSSProperties : {}

    return (
      <button
        ref={ref}
        className={cn(
          'skewed-button',
          'inline-block cursor-pointer border-none font-semibold uppercase transition-all duration-500',
          variants[variant],
          sizes[size],
          className
        )}
        style={outlineStyles}
        {...props}
      >
        <span className="skewed-button-content font-semibold">
          {children}
        </span>
      </button>
    )
  }
)

SkewedButton.displayName = 'SkewedButton'

export { SkewedButton }
export type { SkewedButtonProps }
