'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function MiniSun({ screenSize }: { screenSize: 'mobile' | 'tablet' | 'desktop' }) {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const lavaTextureRef = useRef<THREE.CanvasTexture | null>(null)
  
  const getSunScale = () => {
    return screenSize === 'mobile' ? 0.7 : screenSize === 'tablet' ? 0.85 : 1
  }

  const scale = getSunScale()

  // Generate animated lava texture using simplex noise
  const generateLavaTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')!
    
    // Simple noise function for lava effect
    const noise = (x: number, y: number, time: number) => {
      const value = Math.sin(x * 10 + time) * Math.cos(y * 10 + time * 0.7) * 0.5 + 0.5
      return value
    }

    const drawLava = (time: number) => {
      const imageData = ctx.createImageData(512, 512)
      const data = imageData.data

      for (let y = 0; y < 512; y++) {
        for (let x = 0; x < 512; x++) {
          const i = (y * 512 + x) * 4
          
          // Multiple octaves for rich texture
          const n1 = noise(x / 50, y / 50, time)
          const n2 = noise(x / 30, y / 30, time * 1.3)
          const n3 = noise(x / 100, y / 100, time * 0.5)
          
          const combined = (n1 * 0.4 + n2 * 0.4 + n3 * 0.2)
          
          // Lava color gradient
          let r, g, b
          if (combined < 0.3) {
            // Dark red/orange
            r = 120 + combined * 60
            g = 30 + combined * 30
            b = 10 + combined * 15
          } else if (combined < 0.6) {
            // Bright orange
            r = 220 + combined * 35
            g = 80 + combined * 80
            b = 25 + combined * 20
          } else if (combined < 0.8) {
            // Very bright orange/yellow
            r = 255
            g = 120 + combined * 80
            b = 50 + combined * 50
          } else {
            // White hot center
            r = 255
            g = 200 + combined * 55
            b = 150 + combined * 105
          }

          data[i] = r
          data[i + 1] = g
          data[i + 2] = b
          data[i + 3] = 255
        }
      }

      ctx.putImageData(imageData, 0, 0)
    }

    // Initial draw
    drawLava(0)
    
    return { canvas, drawLava, texture: new THREE.CanvasTexture(canvas) }
  }, [])

  const lavaParticles = useMemo(() => {
    const count = 300
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const velocities = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = Math.random() * 1.0 + 0.2
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)

      const colorVariation = Math.random()
      if (colorVariation < 0.2) {
        colors[i3] = 1.0
        colors[i3 + 1] = 0.1
        colors[i3 + 2] = 0.0
      } else if (colorVariation < 0.4) {
        colors[i3] = 1.0
        colors[i3 + 1] = 0.3
        colors[i3 + 2] = 0.0
      } else if (colorVariation < 0.7) {
        colors[i3] = 1.0
        colors[i3 + 1] = 0.5
        colors[i3 + 2] = 0.0
      } else if (colorVariation < 0.9) {
        colors[i3] = 1.0
        colors[i3 + 1] = 0.7
        colors[i3 + 2] = 0.1
      } else {
        colors[i3] = 1.0
        colors[i3 + 1] = 0.9
        colors[i3 + 2] = 0.2
      }

      sizes[i] = Math.random() * 0.08 + 0.03

      velocities[i3] = (Math.random() - 0.5) * 0.015
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.015
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.015
    }

    return { positions, colors, sizes, velocities }
  }, [])

  useEffect(() => {
    lavaTextureRef.current = generateLavaTexture.texture
    if (lavaTextureRef.current) {
      lavaTextureRef.current.wrapS = THREE.RepeatWrapping
      lavaTextureRef.current.wrapT = THREE.RepeatWrapping
      lavaTextureRef.current.needsUpdate = true
    }
  }, [generateLavaTexture.texture])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002
    }

    // Animate the lava texture
    const time = state.clock.elapsedTime
    generateLavaTexture.drawLava(time)
    if (lavaTextureRef.current) {
      lavaTextureRef.current.needsUpdate = true
    }

    // Breathing glow effect for inner core
    if (coreRef.current) {
      const material = coreRef.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = 2.5 + Math.sin(time * 3) * 1.5
      coreRef.current.scale.setScalar(0.8 + Math.sin(time * 2) * 0.02)
    }

    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      const colors = particlesRef.current.geometry.attributes.color.array as Float32Array
      const velocities = lavaParticles.velocities

      for (let i = 0; i < positions.length; i += 3) {
        const particleIndex = i / 3
        const turbulence = Math.sin(time * 2 + particleIndex * 0.1) * 0.01
        const upwardForce = Math.sin(time * 3 + particleIndex * 0.05) * 0.005

        positions[i] += velocities[i] + turbulence
        positions[i + 1] += velocities[i + 1] + upwardForce
        positions[i + 2] += velocities[i + 2] + turbulence

        const angle = time * 0.5 + particleIndex * 0.1
        const radius = Math.sqrt(positions[i] ** 2 + positions[i + 2] ** 2)
        if (radius > 0.1) {
          positions[i] = radius * Math.cos(angle)
          positions[i + 2] = radius * Math.sin(angle)
        }

        const distance = Math.sqrt(positions[i] ** 2 + positions[i + 1] ** 2 + positions[i + 2] ** 2)
        if (distance > 1.4) {
          const radius = Math.random() * 0.3 + 0.1
          const theta = Math.random() * Math.PI * 2
          const phi = Math.random() * Math.PI

          positions[i] = radius * Math.sin(phi) * Math.cos(theta)
          positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
          positions[i + 2] = radius * Math.cos(phi)
        }

        const colorVariation = Math.sin(time * 4 + particleIndex * 0.2) * 0.3 + 0.7
        colors[i] = Math.min(1.0, colors[i] * colorVariation)
        colors[i + 1] = Math.min(1.0, colors[i + 1] * colorVariation)
        colors[i + 2] = Math.min(1.0, colors[i + 2] * colorVariation)
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
      particlesRef.current.geometry.attributes.color.needsUpdate = true
    }
  })

  const glowTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext('2d')!
    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256)
    gradient.addColorStop(0, 'rgba(255, 200, 50, 0.7)')
    gradient.addColorStop(0.2, 'rgba(255, 150, 0, 0.5)')
    gradient.addColorStop(0.4, 'rgba(255, 100, 0, 0.3)')
    gradient.addColorStop(0.6, 'rgba(255, 80, 0, 0.2)')
    gradient.addColorStop(0.8, 'rgba(255, 60, 0, 0.05)')
    gradient.addColorStop(1, 'rgba(255, 40, 0, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 512, 512)
    return new THREE.CanvasTexture(canvas)
  }, [])

  return (
    <group ref={groupRef}>
      <mesh scale={[scale, scale, scale]}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          map={lavaTextureRef.current || generateLavaTexture.texture}
          emissive="#ff4500"
          emissiveIntensity={2.5}
          roughness={0.1}
          metalness={0}
          color="#ffaa00"
          toneMapped={false}
        />
      </mesh>

      {/* Inner burning core */}
      <mesh ref={coreRef} scale={[scale * 0.8, scale * 0.8, scale * 0.8]}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshStandardMaterial
          color="#ff6600"
          emissive="#ff2200"
          emissiveIntensity={3.5}
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      <points ref={particlesRef} scale={[scale, scale, scale]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={300} array={lavaParticles.positions} itemSize={3} args={[lavaParticles.positions, 3]} />
          <bufferAttribute attach="attributes-color" count={300} array={lavaParticles.colors} itemSize={3} args={[lavaParticles.colors, 3]} />
          <bufferAttribute attach="attributes-size" count={300} array={lavaParticles.sizes} itemSize={1} args={[lavaParticles.sizes, 1]} />
        </bufferGeometry>
        <pointsMaterial size={0.15} vertexColors transparent opacity={0.9} sizeAttenuation={false} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>

      <sprite scale={[5.5 * scale, 5.5 * scale, 1]}>
        <spriteMaterial map={glowTexture} transparent opacity={0.8} depthWrite={false} />
      </sprite>
    </group>
  )
}


