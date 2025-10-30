'use client'

import { SkewedButton } from './SkewedButton'

/**
 * ButtonDemo - এই component দেখায় কিভাবে SkewedButton বিভিন্ন variant এবং size এ ব্যবহার করা যায়
 * 
 * Usage Examples:
 * - Primary: Default white background with dark hover
 * - Secondary: Blue background with dark hover
 * - Outline: Transparent with border, white background on hover
 * 
 * Sizes: sm, md, lg
 */
export default function ButtonDemo() {
  return (
    <div className="p-8 space-y-8 bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold text-white mb-6">SkewedButton Component Demo</h2>
      
      {/* Primary Buttons */}
      <div className="space-y-4">
        <h3 className="text-lg text-white">Primary Variant</h3>
        <div className="flex flex-wrap gap-4">
          <SkewedButton variant="primary" size="sm">Small</SkewedButton>
          <SkewedButton variant="primary" size="md">Medium</SkewedButton>
          <SkewedButton variant="primary" size="lg">Large</SkewedButton>
        </div>
      </div>

      {/* Secondary Buttons */}
      <div className="space-y-4">
        <h3 className="text-lg text-white">Secondary Variant</h3>
        <div className="flex flex-wrap gap-4">
          <SkewedButton variant="secondary" size="sm">Small</SkewedButton>
          <SkewedButton variant="secondary" size="md">Medium</SkewedButton>
          <SkewedButton variant="secondary" size="lg">Large</SkewedButton>
        </div>
      </div>

      {/* Outline Buttons */}
      <div className="space-y-4">
        <h3 className="text-lg text-white">Outline Variant</h3>
        <div className="flex flex-wrap gap-4">
          <SkewedButton variant="outline" size="sm">Small</SkewedButton>
          <SkewedButton variant="outline" size="md">Medium</SkewedButton>
          <SkewedButton variant="outline" size="lg">Large</SkewedButton>
        </div>
      </div>

      {/* With English Text */}
      <div className="space-y-4">
        <h3 className="text-lg text-white">English Text Examples</h3>
        <div className="flex flex-wrap gap-4">
          <SkewedButton variant="primary" size="lg">View My Work</SkewedButton>
          <SkewedButton variant="outline" size="lg">Contact Me</SkewedButton>
          <SkewedButton variant="secondary" size="md">Download</SkewedButton>
        </div>
      </div>

      {/* With onClick handlers */}
      <div className="space-y-4">
        <h3 className="text-lg text-white">Interactive Examples</h3>
        <div className="flex flex-wrap gap-4">
          <SkewedButton 
            variant="primary" 
            size="md"
            onClick={() => alert('Button clicked!')}
          >
            Click Me
          </SkewedButton>
          <SkewedButton 
            variant="outline" 
            size="md"
            onClick={() => console.log('Logged to console')}
          >
            Log Click
          </SkewedButton>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="mt-8 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-lg text-white mb-2">Usage Instructions:</h3>
        <pre className="text-sm text-gray-300 overflow-x-auto">
{`import { SkewedButton } from './components/ui/SkewedButton'

// Basic usage
<SkewedButton>Default Button</SkewedButton>

// With props
<SkewedButton 
  variant="outline" 
  size="lg"
  onClick={() => console.log('clicked')}
>
  Custom Button
</SkewedButton>

// Available props:
// variant: 'primary' | 'secondary' | 'outline'
// size: 'sm' | 'md' | 'lg'
// className: string (for additional styling)
// All standard button props (onClick, disabled, etc.)`}
        </pre>
      </div>
    </div>
  )
}
