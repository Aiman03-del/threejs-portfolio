'use client'

import { Suspense, useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

// Inside sun view - immersive spinning interior
function InsideSunView() {
  const sphereRef = useRef<THREE.Mesh>(null)

  const insideTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 1024
    const ctx = canvas.getContext('2d')!
    const gradient = ctx.createRadialGradient(512, 512, 0, 512, 512, 520)
    gradient.addColorStop(0, '#ff6600')
    gradient.addColorStop(0.5, '#ff2200')
    gradient.addColorStop(1, '#000000')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 1024, 1024)

    const imgData = ctx.getImageData(0, 0, 1024, 1024)
    const data = imgData.data
    for (let i = 0; i < data.length; i += 4) {
      const n = (Math.random() - 0.5) * 25
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
  }, [])

  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += 0.002
      sphereRef.current.rotation.x += 0.0008
    }
  })

  return (
    <group>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[50, 96, 96]} />
        <meshStandardMaterial 
          map={insideTexture}
          side={THREE.BackSide}
          roughness={0.9}
          metalness={0}
          emissive="#ff6600"
          emissiveIntensity={0.1}
        />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={1.0} color="#ff6600" distance={60} />
    </group>
  )
}

export default function NotFound() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      height: '100vh',
      background: '#0a0a0a',
      overflow: 'hidden'
    }}>
      {/* 3D Inside Sun Environment */}
      <Canvas
        camera={{ position: [0, 0, 0], fov: 75 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          background: '#000000'
        }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <InsideSunView />
        </Suspense>
        <EffectComposer>
          <Bloom intensity={2.5} luminanceThreshold={0.3} />
        </EffectComposer>
      </Canvas>

      {/* Error Content - centered inside the sun */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        textAlign: 'center',
        color: '#fff',
        padding: '20px',
        maxWidth: '700px',
        width: '90%'
      }}>
        <h1 style={{
          fontSize: '100px',
          fontWeight: 'bold',
          margin: 0,
          color: '#ffaa00',
          textShadow: '0 0 40px #ff6600, 0 0 80px #ff6600',
          animation: 'pulse 2s ease-in-out infinite'
        }}>
          404
        </h1>
        <h2 style={{
          fontSize: '32px',
          margin: '20px 0',
          color: '#ffcc00',
          fontWeight: 600,
          textShadow: '0 0 20px #ff9900'
        }}>
          Page Not Found
        </h2>
        <p style={{
          fontSize: '18px',
          margin: '30px auto',
          color: '#ffddaa',
          lineHeight: '1.8',
          textShadow: '0 0 10px #ff6600'
        }}>
          You've fallen into the sun's burning core! 🔥<br />
          The page you're looking for has been vaporized.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          style={{
            marginTop: '40px',
            padding: '16px 40px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#fff',
            background: 'rgba(255, 102, 0, 0.3)',
            border: '2px solid #ff6600',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 0 30px rgba(255, 102, 0, 0.4)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255, 102, 0, 0.5)'
            e.currentTarget.style.transform = 'scale(1.08)'
            e.currentTarget.style.boxShadow = '0 0 50px rgba(255, 102, 0, 0.6)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 102, 0, 0.3)'
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 102, 0, 0.4)'
          }}
        >
          Escape to Home Base
        </button>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  )
}

