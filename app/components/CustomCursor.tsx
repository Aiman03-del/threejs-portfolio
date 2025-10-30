'use client'

import { useEffect, useState, useRef } from 'react'

interface CustomCursorProps {
  color?: string
  size?: 'sm' | 'md' | 'lg'
  tailLength?: number
  disabled?: boolean
}

export default function CustomCursor({
  color = '#00ffff', // Default cyan for comet effect
  size = 'md',
  tailLength = 8,
  disabled = false
}: CustomCursorProps) {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isMoving, setIsMoving] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [trail, setTrail] = useState<Array<{ x: number; y: number; opacity: number }>>([])
  const animationRef = useRef<number>()

  // Comet trail animation
  useEffect(() => {
    if (disabled || !isMoving) return

    const animateTrail = () => {
      setTrail(prev => {
        const newTrail = [...prev]
        newTrail.unshift({ x: cursorPos.x, y: cursorPos.y, opacity: 1 })
        
        // Fade out trail points
        for (let i = 1; i < newTrail.length; i++) {
          newTrail[i].opacity = Math.max(0, newTrail[i].opacity - 0.1)
        }
        
        // Remove faded points
        return newTrail.filter(point => point.opacity > 0).slice(0, tailLength)
      })
      
      animationRef.current = requestAnimationFrame(animateTrail)
    }

    animationRef.current = requestAnimationFrame(animateTrail)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [cursorPos, isMoving, tailLength, disabled])

  useEffect(() => {
    if (disabled) return

    let moveTimeout: NodeJS.Timeout

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
      setIsMoving(true)
      setIsVisible(true)

      clearTimeout(moveTimeout)
      moveTimeout = setTimeout(() => {
        setIsMoving(false)
      }, 100)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => {
      setIsVisible(false)
      setTrail([])
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.matches('button, a, [role="button"], input, textarea, select')
      setIsHovering(isInteractive)
    }

    // Hide default cursor
    document.body.style.cursor = 'none'
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      document.body.style.cursor = 'auto'
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleMouseOver)
      clearTimeout(moveTimeout)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [disabled])

  if (disabled || !isVisible) return null

  // Size configurations for comet
  const sizeConfig = {
    sm: { head: 8, core: 4 },
    md: { head: 12, core: 6 },
    lg: { head: 16, core: 8 }
  }

  const currentSize = sizeConfig[size]

  return (
    <>
      {/* Comet Trail */}
      {trail.map((point, index) => (
        <div
          key={index}
          className="comet-trail"
          style={{
            left: point.x,
            top: point.y,
            transform: 'translate(-50%, -50%)',
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: 9998 - index,
            width: currentSize.head * (1 - index * 0.1),
            height: currentSize.head * (1 - index * 0.1),
            backgroundColor: color,
            borderRadius: '50%',
            opacity: point.opacity * 0.6,
            boxShadow: `0 0 ${currentSize.head * 2}px ${color}80`,
            transition: 'none',
          }}
        />
      ))}

      {/* Comet Head */}
      <div
        className="comet-head"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          transform: 'translate(-50%, -50%)',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: isMoving ? 'none' : 'transform 0.1s ease-out',
        }}
      >
        {/* Comet Core */}
        <div
          style={{
            width: currentSize.core,
            height: currentSize.core,
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 ${currentSize.core * 2}px #ffffff`,
          }}
        />
        
        {/* Comet Head Glow */}
        <div
          style={{
            width: currentSize.head,
            height: currentSize.head,
            backgroundColor: color,
            borderRadius: '50%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) scale(${isHovering ? 2.0 : isMoving ? 1.2 : 1})`,
            transition: 'transform 0.2s ease',
            opacity: 0.8,
            boxShadow: `
              0 0 ${currentSize.head}px ${color},
              0 0 ${currentSize.head * 2}px ${color}80,
              0 0 ${currentSize.head * 3}px ${color}40
            `,
          }}
        />
      </div>

      <style jsx global>{`
        * {
          cursor: none !important;
        }

        /* Enhanced hover effects for interactive elements */
        button:hover,
        a:hover,
        [role="button"]:hover {
          text-shadow: 0 0 15px ${color}60;
          transform: scale(1.02);
        }

        /* Smooth transitions for all interactive elements */
        button, a, [role="button"] {
          transition: all 0.2s ease;
        }

        /* Comet trail animation */
        .comet-trail {
          animation: cometFade 0.3s ease-out forwards;
        }

        @keyframes cometFade {
          from {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1);
          }
          to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.3);
          }
        }
      `}</style>
    </>
  )
}
