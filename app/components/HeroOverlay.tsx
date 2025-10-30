'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef, Suspense, useMemo } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Stars, Html } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import MiniSun from './MiniSun'
import InsidePlanetContent from './InsidePlanetContent'

interface HeroOverlayProps {
  onNavigate: (section: string) => void
  activeSection: string | null
}

// Global animation speed factor for the solar system
const SOLAR_SPEED = 0.5 // smaller = slower

// Mini Solar System Components for Hero Section

// Custom Stars with separate fade and rotation control
function CustomStars({ count = 2000, radius = 100, depth = 50 }: { count?: number, radius?: number, depth?: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const starsRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Rotation, slowed by global factor
      groupRef.current.rotation.y += 0.003 * SOLAR_SPEED
      groupRef.current.rotation.x += 0.001 * SOLAR_SPEED
    }
    
    if (starsRef.current && starsRef.current.material) {
      // Slow blinking effect
      const material = starsRef.current.material as THREE.PointsMaterial
      material.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 0.5 * SOLAR_SPEED) * 0.3
    }
  })

  const positions = useMemo(() => {
    const pos = []
    for (let i = 0; i < count; i++) {
      const r = radius + Math.random() * depth
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      
      pos.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      )
    }
    return new Float32Array(pos)
  }, [count, radius, depth])

  return (
    <group ref={groupRef}>
      <points ref={starsRef} raycast={() => {}}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ffffff"
          size={2}
          transparent
          opacity={0.8}
          sizeAttenuation={false}
        />
      </points>
    </group>
  )
}

// MiniSun moved to app/components/MiniSun.tsx


function MiniPlanet({ 
  planet, 
  onPlanetClick,
  isActive = false,
  isZooming = false,
  targetPlanet = null
}: { 
  planet: { id: string, name: string, color: string, size: number, orbitRadius: number, orbitSpeed: number, direction: number }, 
  onPlanetClick: (planetId: string, worldPosition: THREE.Vector3) => void,
  isActive?: boolean,
  isZooming?: boolean,
  targetPlanet?: any
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const cloudGroupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  // Create procedural texture for realistic planets (always use this)
  const createPlanetTexture = (color: string, planetType: string) => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')!
    
    // Create gradient background based on planet type
    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)
    
    if (planetType === 'about') {
      gradient.addColorStop(0, '#8B4513') // Mercury brown center
      gradient.addColorStop(0.5, '#A0522D') // Sienna
      gradient.addColorStop(1, '#654321') // Dark brown
    } else if (planetType === 'skills') {
      gradient.addColorStop(0, '#FFD700') // Venus gold center
      gradient.addColorStop(0.5, '#FFA500') // Orange
      gradient.addColorStop(1, '#FF8C00') // Dark orange
    } else if (planetType === 'projects') {
      gradient.addColorStop(0, '#00CED1') // Earth blue center
      gradient.addColorStop(0.3, '#20B2AA') // Light sea green
      gradient.addColorStop(0.6, '#008B8B') // Dark cyan
      gradient.addColorStop(1, '#2F4F4F') // Dark slate gray
    } else if (planetType === 'contact') {
      gradient.addColorStop(0, '#FF6B35') // Mars red center
      gradient.addColorStop(0.5, '#B22222') // Fire brick
      gradient.addColorStop(1, '#8B0000') // Dark red
    } else if (planetType === 'experience') {
      gradient.addColorStop(0, '#FFD700') // Jupiter gold center
      gradient.addColorStop(0.3, '#FFA500') // Orange
      gradient.addColorStop(0.6, '#FF8C00') // Dark orange
      gradient.addColorStop(1, '#FF6347') // Tomato
    } else if (planetType === 'services') {
      gradient.addColorStop(0, '#FFA500') // Saturn orange center
      gradient.addColorStop(0.5, '#FF8C00') // Dark orange
      gradient.addColorStop(1, '#FF7F50') // Coral
    } else {
      gradient.addColorStop(0, color)
      gradient.addColorStop(1, color)
    }
    
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 512, 512)
    
    // Add surface details and noise
    const imageData = ctx.getImageData(0, 0, 512, 512)
    const data = imageData.data
    
    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 0.4 - 0.2
      data[i] = Math.max(0, Math.min(255, data[i] + noise * 255))     // R
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise * 255)) // G
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise * 255)) // B
    }
    
    // Add some surface features
    ctx.putImageData(imageData, 0, 0)
    
    // Add some circular features for craters/continents
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 512
      const y = Math.random() * 512
      const radius = Math.random() * 30 + 10
      const alpha = Math.random() * 0.3 + 0.1
      
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`
      ctx.fill()
    }
    
    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    return texture
  }
  
  const planetTexture = useMemo(() => createPlanetTexture(planet.color, planet.id), [planet.color, planet.id])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += planet.orbitSpeed * planet.direction * SOLAR_SPEED
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01 * planet.direction * SOLAR_SPEED
    }
    // Animate clouds for different planets
    if ((planet.id === 'about' || planet.id === 'projects') && cloudGroupRef.current) {
      cloudGroupRef.current.rotation.y += 0.005 * planet.direction * SOLAR_SPEED // Slower cloud rotation
      cloudGroupRef.current.rotation.x += 0.002 * planet.direction * SOLAR_SPEED // Slight tilt
    }
  })

  return (
    <group ref={groupRef}>
      {/* Planet Core */}
      <mesh
        ref={meshRef}
        position={[planet.orbitRadius, 0, 0]}
        onClick={(e) => {
          e.stopPropagation()
          if (meshRef.current) {
            const worldPos = new THREE.Vector3()
            meshRef.current.getWorldPosition(worldPos)
            onPlanetClick(planet.id, worldPos)
          }
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.2 : isActive ? 1.3 : 1}
      >
        <sphereGeometry args={[planet.size, 64, 64]} />
        <meshStandardMaterial
          map={planetTexture}
          color={planet.color}
          metalness={0.1}
          roughness={0.8}
          normalScale={[0.3, 0.3]}
          emissive={isActive ? planet.color : planet.color}
          emissiveIntensity={isActive ? 0.3 : hovered ? 0.15 : 0.05}
        />
        {/* Tooltip showing planet name */}
        {hovered && (
          <Html center>
            <div
              onClick={(e) => {
                e.stopPropagation()
                if (meshRef.current) {
                  const worldPos = new THREE.Vector3()
                  meshRef.current.getWorldPosition(worldPos)
                  onPlanetClick(planet.id, worldPos)
                }
              }}
              style={{
                background: 'rgba(0, 0, 0, 0.8)',
                color: planet.color,
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 'bold',
                border: `1px solid ${planet.color}`,
                whiteSpace: 'nowrap',
                marginTop: '10px',
                cursor: 'pointer'
              }}
            >
              {planet.name}
            </div>
          </Html>
        )}
      </mesh>

      {/* Atmosphere Layer */}
      <mesh position={[planet.orbitRadius, 0, 0]} scale={hovered ? 1.2 : isActive ? 1.3 : 1} raycast={() => {}}>
        <sphereGeometry args={[planet.size * 1.1, 32, 32]} />
        <meshBasicMaterial 
          color={planet.id === 'about' ? '#00CED1' : planet.color}
          transparent
          opacity={isActive ? 0.3 : hovered ? 0.2 : 0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Active Planet Glow Effect */}
      {isActive && (
        <mesh position={[planet.orbitRadius, 0, 0]} scale={1.4} raycast={() => {}}>
          <sphereGeometry args={[planet.size * 1.2, 32, 32]} />
          <meshBasicMaterial 
            color={planet.color}
            transparent
            opacity={0.2}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {/* Zoom Animation Glow Effect removed per request */}

      {/* Cloud Layer for About and Projects planets */}
      {(planet.id === 'about' || planet.id === 'projects') && (
        <group ref={cloudGroupRef} position={[planet.orbitRadius, 0, 0]} scale={hovered ? 1.2 : 1}>
          {/* Animated Cloud Layer 1 */}
          <mesh raycast={() => {}}>
            <sphereGeometry args={[planet.size * 1.05, 32, 32]} />
            <meshBasicMaterial 
              color="#ffffff"
              transparent
              opacity={0.15}
              side={THREE.FrontSide}
            />
          </mesh>
          
          {/* Animated Cloud Layer 2 */}
          <mesh raycast={() => {}}>
            <sphereGeometry args={[planet.size * 1.08, 32, 32]} />
            <meshBasicMaterial 
              color="#e0e0e0"
              transparent
              opacity={0.1}
              side={THREE.FrontSide}
            />
          </mesh>
          
          {/* Ocean Reflection */}
          <mesh raycast={() => {}}>
            <sphereGeometry args={[planet.size * 1.02, 32, 32]} />
            <meshBasicMaterial 
              color="#4169E1"
              transparent
              opacity={0.05}
              side={THREE.FrontSide}
            />
          </mesh>
        </group>
      )}
    </group>
  )
}

// Planet Trail Component
function PlanetTrails({ planets, screenSize }: { planets: any[], screenSize: 'mobile' | 'tablet' | 'desktop' }) {
  const getScale = () => {
    return screenSize === 'mobile' ? 0.7 : screenSize === 'tablet' ? 0.85 : 1
  }
  
  const scale = getScale()
  
  return (
    <group>
      {planets.map((planet, index) => {
        // Different colors for different orbit distances
        let trailColor = "#444444"
        let baseOpacity = 0.3
        
        if (planet.orbitRadius <= 4) {
          trailColor = "#666666" // Inner planets - slightly brighter
          baseOpacity = 0.4
        } else if (planet.orbitRadius <= 8) {
          trailColor = "#555555" // Middle planets
          baseOpacity = 0.35
        } else {
          trailColor = "#333333" // Outer planets - dimmer
          baseOpacity = 0.25
        }
        
        // Responsive opacity adjustment
        const opacity = screenSize === 'mobile' ? baseOpacity * 0.8 : 
                       screenSize === 'tablet' ? baseOpacity * 0.9 : 
                       baseOpacity
        
        // Create a small arc behind the planet (about 45 degrees)
        const trailLength = Math.PI / 4 // 45 degrees
        const startAngle = -trailLength / 2
        const endAngle = trailLength / 2
        
        return (
          <PlanetTrail 
            key={`trail-${planet.id}`}
            planet={planet}
            scale={scale}
            trailColor={trailColor}
            opacity={opacity}
            trailLength={trailLength}
            startAngle={startAngle}
            screenSize={screenSize}
          />
        )
      })}
    </group>
  )
}

// Individual Planet Trail Component that rotates with the planet
function PlanetTrail({ 
  planet, 
  scale, 
  trailColor, 
  opacity, 
  trailLength, 
  startAngle,
  screenSize
}: { 
  planet: any, 
  scale: number, 
  trailColor: string, 
  opacity: number, 
  trailLength: number, 
  startAngle: number,
  screenSize: 'mobile' | 'tablet' | 'desktop'
}) {
  const groupRef = useRef<THREE.Group>(null)
  
  // Responsive trail properties
  const getTrailProperties = () => {
    switch (screenSize) {
      case 'mobile':
        return {
          thickness: 0.008,
          segments: 16
        }
      case 'tablet':
        return {
          thickness: 0.009,
          segments: 20
        }
      default: // desktop
        return {
          thickness: 0.01,
          segments: 24
        }
    }
  }
  
  const trailProps = getTrailProperties()
  
  useFrame((state) => {
    if (groupRef.current) {
      // Rotate the trail with the planet's orbit speed
      groupRef.current.rotation.y += planet.orbitSpeed * planet.direction * SOLAR_SPEED
    }
  })
  
  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]} raycast={() => {}}>
        <ringGeometry 
          args={[
            planet.orbitRadius * scale, 
            planet.orbitRadius * scale + trailProps.thickness, 
            trailProps.segments,
            1,
            startAngle,
            trailLength
          ]} 
        />
        <meshBasicMaterial 
          color={trailColor}
          transparent 
          opacity={opacity}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

// Immersive inside-planet view
function InsidePlanetView({ planet, screenSize, onExit }: { planet: any, screenSize: 'mobile' | 'tablet' | 'desktop', onExit: () => void }) {
  const sphereRef = useRef<THREE.Mesh>(null)

  const insideTexture = useMemo(() => {
    // Reuse planet texture generator for interior
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 1024
    const ctx = canvas.getContext('2d')!
    const gradient = ctx.createRadialGradient(512, 512, 0, 512, 512, 520)
    gradient.addColorStop(0, planet.color)
    gradient.addColorStop(1, '#000000')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 1024, 1024)

    const imgData = ctx.getImageData(0, 0, 1024, 1024)
    const data = imgData.data
    for (let i = 0; i < data.length; i += 4) {
      const n = (Math.random() - 0.5) * 20
      data[i] = Math.max(0, Math.min(255, data[i] + n))
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + n))
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + n))
    }
    ctx.putImageData(imgData, 0, 0)

    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.anisotropy = 8
    return texture
  }, [planet.color])

  useEffect(() => {
    const handleExit = () => {
      // Tell UI to clear the overlay first
      window.dispatchEvent(new CustomEvent('inside-planet-change', { detail: null }))
      onExit()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleExit()
    }
    const onExternalExit = () => handleExit()
    window.addEventListener('keydown', onKey)
    window.addEventListener('inside-planet-exit', onExternalExit)
    // Announce inside view is active for UI overlay
    window.dispatchEvent(new CustomEvent('inside-planet-change', { detail: planet.id }))
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('inside-planet-exit', onExternalExit)
      // Ensure UI overlay is cleared on unmount
      window.dispatchEvent(new CustomEvent('inside-planet-change', { detail: null }))
    }
  }, [onExit, planet.id])

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.002
      sphereRef.current.rotation.x += 0.0008
    }
  })

  const scale = screenSize === 'mobile' ? 0.7 : screenSize === 'tablet' ? 0.85 : 1

  return (
    <group>
      {/* Huge sphere around camera, BackSide to see interior */}
      <mesh ref={sphereRef} onClick={() => {
        window.dispatchEvent(new CustomEvent('inside-planet-change', { detail: null }))
        onExit()
      }}>
        <sphereGeometry args={[50 * scale, 96, 96]} />
        <meshStandardMaterial 
          map={insideTexture}
          side={THREE.BackSide}
          roughness={0.9}
          metalness={0}
          emissive={planet.color}
          emissiveIntensity={0.05}
        />
      </mesh>
      {/* Soft center glow to simulate inner atmosphere */}
      <pointLight position={[0, 0, 0]} intensity={0.8} color={planet.color} distance={60} />
    </group>
  )
}

// Bridge component: no UI, only subscribes to exit lifecycle to clear overlay state
function InsideOverlayBridge({ onChange }: { onChange: (planetId: string | null) => void }) {
  useEffect(() => {
    const handler = (e: any) => onChange(e.detail || null)
    window.addEventListener('inside-planet-change', handler)
    return () => window.removeEventListener('inside-planet-change', handler)
  }, [onChange])
  return null
}

function HeroSolarSystem({ onPlanetClick, screenSize, activeSection, cameraRef }: { onPlanetClick: (planetId: string) => void, screenSize: 'mobile' | 'tablet' | 'desktop', activeSection: string | null, cameraRef: any }) {
  const [isZooming, setIsZooming] = useState(false)
  const [targetPlanet, setTargetPlanet] = useState<any>(null)
  const [useAnimation, setUseAnimation] = useState(true) // Toggle for animation
  const [insidePlanet, setInsidePlanet] = useState<any>(null)
  const controlsRef = useRef<any>(null)
  // Responsive planet configurations
  const getPlanetConfig = (baseConfig: any) => {
    const scale = screenSize === 'mobile' ? 0.7 : screenSize === 'tablet' ? 0.85 : 1
    return {
      ...baseConfig,
      size: baseConfig.size * scale,
      orbitRadius: baseConfig.orbitRadius * scale
    }
  }

  const basePlanets = [
    { 
      id: 'about', 
      name: 'About', 
      size: 0.3,
      color: '#8B4513', // Mercury-like brown
      orbitRadius: 3,
      orbitSpeed: 0.012,
      direction: 1
    },
    { 
      id: 'skills', 
      name: 'Skills', 
      size: 0.35,
      color: '#FFD700', // Venus-like gold
      orbitRadius: 4.5,
      orbitSpeed: 0.010,
      direction: -1
    },
    { 
      id: 'projects', 
      name: 'Projects', 
      size: 0.4,
      color: '#00CED1', // Earth-like blue
      orbitRadius: 6,
      orbitSpeed: 0.008,
      direction: 1
    },
    { 
      id: 'contact', 
      name: 'Contact', 
      size: 0.38,
      color: '#FF6B35', // Mars-like red
      orbitRadius: 7.5,
      orbitSpeed: 0.006,
      direction: -1
    },
    { 
      id: 'experience', 
      name: 'Experience', 
      size: 0.6,
      color: '#FFD700', // Jupiter-like gold
      orbitRadius: 9,
      orbitSpeed: 0.004,
      direction: 1
    },
    { 
      id: 'services', 
      name: 'Services', 
      size: 0.5,
      color: '#FFA500', // Saturn-like orange
      orbitRadius: 11,
      orbitSpeed: 0.003,
      direction: -1
    }
  ]

  const planets = basePlanets.map(getPlanetConfig)

  // Keyboard shortcut to toggle animation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'a' || e.key === 'A') {
        setUseAnimation(prev => {
          console.log('🔄 Animation mode toggled:', !prev)
          return !prev
        })
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  // Handle planet click with 3D zoom animation
  const handlePlanetClickWithAnimation = (planetId: string, planetWorldPosition?: THREE.Vector3) => {
    console.log('🚀 Planet click started:', planetId)
    if (isZooming || insidePlanet) {
      console.log('⏳ Zoom already in progress or inside view active; ignoring click')
      return
    }
    const planet = planets.find(p => p.id === planetId)
    if (!planet) {
      console.log('❌ Planet not found:', planetId)
      return
    }

    console.log('✅ Planet found:', planet)
    
    if (!useAnimation) {
      console.log('⚡ Direct click mode - opening section immediately')
      onPlanetClick(planetId)
      return
    }

    console.log('🎬 Starting animation mode')
    setIsZooming(true)
    setTargetPlanet(planet)

    // Start camera animation (single-phase eased approach, controls disabled)
    if (cameraRef.current && controlsRef.current) {
      console.log('🎥 Starting camera animation')
      const camera = cameraRef.current
      const controls = controlsRef.current

      const planetPosition = (planetWorldPosition ? planetWorldPosition.clone() : new THREE.Vector3(planet.orbitRadius, 0, 0))
      const startPosition = camera.position.clone()
      const toPlanetDir = planetPosition.clone().sub(startPosition).normalize()
      const surfaceDistance = Math.max(planet.size * 1.6, 0.8)
      const approachPoint = planetPosition.clone().add(toPlanetDir.clone().multiplyScalar(-surfaceDistance))
      const startFov = (camera as any).fov ?? 65
      const targetFov = Math.min(85, startFov + 12)
      const startTime = performance.now()
      const duration = 1200

      // Disable controls during flight to prevent jitter
      if (typeof controls.enabled === 'boolean') controls.enabled = false
      controls.target.copy(planetPosition)
      controls.update()

      let rafId: number
      const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

      const animate = (now: number) => {
        const elapsed = now - startTime
        const t = Math.min(elapsed / duration, 1)
        const e = easeInOutCubic(t)

        camera.position.lerpVectors(startPosition, approachPoint, e)
        if ('fov' in camera) {
          ;(camera as any).fov = THREE.MathUtils.lerp(startFov, targetFov, e)
          camera.updateProjectionMatrix()
        }
        camera.lookAt(planetPosition)

        if (t < 1) {
          rafId = requestAnimationFrame(animate)
        } else {
          console.log('🎬 Animation complete, entering inside view')
          setInsidePlanet(planet)
          setIsZooming(false)
          // Keep controls disabled while inside; they re-enable on exit
          cancelAnimationFrame(rafId)
        }
      }

      rafId = requestAnimationFrame(animate)
    } else {
      console.log('⚠️ Camera or controls not available, opening section directly')
      // Fallback: open section directly if camera animation fails
      setTimeout(() => {
        setInsidePlanet(planet)
        setIsZooming(false)
        setTargetPlanet(null)
      }, 100)
    }
  }

  // Reset camera to original position (reverse of entry: position + FOV easing)
  const resetCamera = () => {
    console.log('🔄 Resetting camera')
    if (cameraRef.current && controlsRef.current) {
      const camera = cameraRef.current
      const controls = controlsRef.current
      
      const originalPosition = new THREE.Vector3(0, 4, 15)
      const originalTarget = new THREE.Vector3(0, 0, 0)
      const originalFov = screenSize === 'mobile' ? 75 : screenSize === 'tablet' ? 70 : 65
      
      const startPosition = camera.position.clone()
      const startTarget = controls.target.clone()
      const startFov = (camera as any).fov ?? originalFov
      const startTime = Date.now()
      const duration = 1000 // smooth reverse flight
      
      const animateReset = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
        const easedProgress = easeInOutCubic(progress)
        
        camera.position.lerpVectors(startPosition, originalPosition, easedProgress)
        controls.target.lerpVectors(startTarget, originalTarget, easedProgress)
        if ('fov' in camera) {
          ;(camera as any).fov = THREE.MathUtils.lerp(startFov, originalFov, easedProgress)
          camera.updateProjectionMatrix()
        }
        controls.update()
        
        if (progress < 1) {
          requestAnimationFrame(animateReset)
        } else {
          console.log('✅ Camera reset complete')
          setIsZooming(false)
          setTargetPlanet(null)
          // Re-enable controls after reset
          if (typeof controls.enabled === 'boolean') controls.enabled = true
          // Ensure overlay is cleared
          window.dispatchEvent(new CustomEvent('inside-planet-change', { detail: null }))
        }
      }
      
      animateReset()
    } else {
      console.log('⚠️ Camera reset failed, resetting state')
      setIsZooming(false)
      setTargetPlanet(null)
    }
  }

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        enableZoom={!isZooming}
        enablePan={false}
        enableRotate={!isZooming && !insidePlanet}
        zoomSpeed={screenSize === 'mobile' ? 0.5 : 1}
        rotateSpeed={screenSize === 'mobile' ? 0.5 : 0.8}
        minDistance={screenSize === 'mobile' ? 8 : screenSize === 'tablet' ? 9 : 10}
        maxDistance={screenSize === 'mobile' ? 25 : screenSize === 'tablet' ? 28 : 30}
        enableDamping={true}
        dampingFactor={0.05}
        autoRotate={false}
        autoRotateSpeed={0}
        makeDefault={false}
      />

      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={3.0} color="#FF6600" />
      <pointLight position={[0, 0, 0]} intensity={2.0} color="#FFAA00" distance={20} />
      
      {/* Custom Stars with slow fade and fast rotation */}
      {!insidePlanet && <CustomStars count={2000} radius={100} depth={50} />}
      
      {/* Outside view */}
      {!insidePlanet && (
        <>
          {/* Planet Trails for all planets */}
          <PlanetTrails planets={planets} screenSize={screenSize} />
          <MiniSun screenSize={screenSize} />
          {planets.map((planet) => (
            <MiniPlanet
              key={planet.id}
              planet={planet}
              onPlanetClick={(pid, worldPos) => handlePlanetClickWithAnimation(pid, worldPos)}
              isActive={false}
              isZooming={isZooming}
              targetPlanet={targetPlanet}
            />
          ))}
        </>
      )}

      {/* Inside view: immersive interior sphere */}
      {insidePlanet && (
        <InsidePlanetView 
          planet={insidePlanet}
          screenSize={screenSize}
          onExit={() => {
            setInsidePlanet(null)
            // Re-enable controls and reset camera smoothly
            if (controlsRef.current) controlsRef.current.enabled = true
            resetCamera()
          }}
        />
      )}
    </>
  )
}

export default function HeroOverlay({ onNavigate, activeSection }: HeroOverlayProps) {
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const cameraRef = useRef<any>(null)
  const [insidePlanetForUi, setInsidePlanetForUi] = useState<string | null>(null)

  // Detect screen size and handle canvas resize
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setScreenSize('mobile')
      } else if (width < 1024) {
        setScreenSize('tablet')
      } else {
        setScreenSize('desktop')
      }
    }

    const handleResize = () => {
      updateScreenSize()
      // Let react-three-fiber manage canvas size to keep raycaster math correct
    }

    updateScreenSize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Force canvas size on mount
  useEffect(() => {
    const forceCanvasSize = () => {
      // Avoid manual canvas sizing to prevent pointer offset issues
    }

    // Run after a short delay to ensure canvas is rendered
    const timeoutId = setTimeout(forceCanvasSize, 100)
    return () => clearTimeout(timeoutId)
  }, [])

  const handlePlanetClick = (planetId: string) => {
    console.log('🪐 Planet clicked in HeroOverlay:', planetId)
    onNavigate(planetId)
  }

  // Listen for inside view changes from 3D layer
  useEffect(() => {
    const onChange = (e: any) => setInsidePlanetForUi(e.detail || null)
    window.addEventListener('inside-planet-change', onChange)
    return () => window.removeEventListener('inside-planet-change', onChange)
  }, [])

  return (
    <div 
      className="hero-fullscreen"
              style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        zIndex: 10,
        overflow: 'hidden',
        background: '#0a0a0a'
      }}
    >
      {/* Background Layer */}
      <div
                    style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          background: '#0a0a0a',
          zIndex: 0
        }}
      />
      
      {/* Full Screen Interactive Solar System (no scale to avoid raycast offset) */}
            <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
              style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          margin: 0,
          padding: 0,
          zIndex: 1
        }}
      >
        <Canvas
          camera={{ 
            position: [0, 4, 15], 
            fov: screenSize === 'mobile' ? 75 : screenSize === 'tablet' ? 70 : 65 
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            background: '#0a0a0a',
            touchAction: 'none',
            display: 'block',
            margin: 0,
            padding: 0,
            zIndex: 1,
            cursor: 'pointer'
          }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
          onCreated={({ gl, size, camera }) => {
            // Store camera reference
            cameraRef.current = camera
            // Let R3F control size/aspect; only set pixel ratio
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            // Ensure canvas is interactive
            const canvas = gl.domElement
            canvas.style.pointerEvents = 'auto'
            canvas.style.cursor = 'pointer'
          }}
        >
          <Suspense fallback={null}>
            <HeroSolarSystem onPlanetClick={handlePlanetClick} screenSize={screenSize} activeSection={activeSection} cameraRef={cameraRef} />
          </Suspense>
          <EffectComposer>
            <Bloom intensity={2} luminanceThreshold={0.3} />
          </EffectComposer>
        </Canvas>
        {/* Portfolio overlay: use shared InsidePlanetContent component */}
        {insidePlanetForUi && (
          <InsidePlanetContent planetId={insidePlanetForUi} />
        )}
          </motion.div>
    </div>
  )
}
