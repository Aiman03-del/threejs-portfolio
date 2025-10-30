'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface InsidePlanetViewProps {
  planet: any
  screenSize: 'mobile' | 'tablet' | 'desktop'
  onExit: () => void
}

export default function InsidePlanetView({ planet, screenSize, onExit }: InsidePlanetViewProps) {
  const sphereRef = useRef<THREE.Mesh>(null)

  const insideTexture = useMemo(() => {
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
      window.dispatchEvent(new CustomEvent('inside-planet-change', { detail: null }))
      onExit()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleExit()
    }
    const onExternalExit = () => handleExit()
    window.addEventListener('keydown', onKey)
    window.addEventListener('inside-planet-exit', onExternalExit)
    window.dispatchEvent(new CustomEvent('inside-planet-change', { detail: planet.id }))
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('inside-planet-exit', onExternalExit)
      window.dispatchEvent(new CustomEvent('inside-planet-change', { detail: null }))
    }
  }, [onExit, planet.id])

  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.002
      sphereRef.current.rotation.x += 0.0008
    }
  })

  const scale = screenSize === 'mobile' ? 0.7 : screenSize === 'tablet' ? 0.85 : 1

  return (
    <group>
      <mesh 
        ref={sphereRef} 
        onClick={() => {
          window.dispatchEvent(new CustomEvent('inside-planet-change', { detail: null }))
          onExit()
        }}
      >
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
      <pointLight position={[0, 0, 0]} intensity={0.8} color={planet.color} distance={60} />
    </group>
  )
}

