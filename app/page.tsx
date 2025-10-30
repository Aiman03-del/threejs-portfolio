'use client'

import { useState } from 'react'
import HeroOverlay from './components/HeroOverlay'

export default function Home() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const handlePlanetClick = (planetId: string) => {
    console.log('Planet clicked:', planetId)
    setActiveSection(planetId)
  }

  const handleCloseSection = () => {
    setActiveSection(null)
  }

  return (
    <div 
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
        overflow: 'hidden',
        background: '#0a0a0a'
      }}
    >
      {/* Full Screen Hero Overlay */}
      <HeroOverlay onNavigate={handlePlanetClick} activeSection={activeSection} />
      
     </div>
  );
}