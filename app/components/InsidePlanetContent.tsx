'use client'

import { useEffect, useState } from 'react'
import { FaExternalLinkAlt, FaGithub, FaTimes } from 'react-icons/fa'

interface InsidePlanetContentProps {
  planetId: string
}

export default function InsidePlanetContent({ planetId }: InsidePlanetContentProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  const content = (() => {
    switch (planetId) {
      case 'about':
        return {
          title: 'About',
          content: (
            <>
              <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>About Me</h3>
              <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '20px' }}>
                Passionate web developer with a love for minimalism, detail, and timeless design.
              </p>

              <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>My Story</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '20px' }}>
                Hey there — I'm <strong>Aiman Uddin Siam</strong>, a Full Stack Web Developer from Bangladesh, currently working at Growthly IT. My journey didn't begin with a computer science degree — it began with curiosity and late nights spent learning how the web actually works. I started with HTML and CSS, fell in love with React, and expanded into building full applications with the MERN stack, NestJS, and TypeScript. I value clean design, measurable performance, and user-first thinking — blending traditional craftsmanship with modern tooling. Every project I build reflects discipline, patience, and a dedication to steady growth.
              </p>
            </>
          )
        }
      case 'skills':
        return {
          title: 'Technologies',
          content: (
            <>
              <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>Technologies I Use</h3>
              <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '20px' }}>
                React • Next.js • NestJS • TypeScript • Node.js • Express.js • MongoDB • MySQL • Tailwind CSS • DaisyUI • Framer Motion • Vite • Git • Docker
              </p>

              <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Tooling & Workflow</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '20px' }}>
                VSCode • ESLint • Prettier • GitHub • Netlify • Vercel • Postman • Figma
              </p>

              <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Core Competencies</h3>
              <ul style={{ display: 'grid', gap: 8, paddingLeft: 18, marginBottom: 20 }}>
                <li>Frontend architecture with React / Next.js</li>
                <li>UI styling with Tailwind CSS and DaisyUI</li>
                <li>Motion & micro-interactions using Framer Motion</li>
                <li>Backend APIs with Node.js, Express, NestJS</li>
                <li>Type-safe code with TypeScript</li>
                <li>Database design: MongoDB & MySQL</li>
                <li>Authentication & Authorization (JWT)</li>
                <li>Performance optimization & accessibility</li>
                <li>CI/CD, deployment and hosting best practices</li>
              </ul>

              <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Approach</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                I start from clarity: clear requirements, lean designs, and small iterations. I prefer solutions that last — predictable, testable, and maintainable.
              </p>
            </>
          )
        }
      case 'projects':
        return {
          title: 'Featured Projects',
          content: (
            <>
              <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '20px' }}>
                Each project follows: “Short description · Tech · Links (Live / Repo)”
              </p>

              <div style={{ display: 'grid', gap: '20px' }}>
                <div style={{ padding: '15px' }}>
                  <h4 style={{ fontSize: '20px', marginBottom: '8px' }}>Healers - Music Streaming Platform</h4>
                  <p style={{ fontSize: '16px', marginBottom: '6px' }}>A mental health awareness and therapy booking platform where users can connect with certified therapists, explore resources, and schedule online sessions securely.</p>
                  <p style={{ fontSize: '14px', marginBottom: '6px' }}>Tech: React, Tailwind CSS, Firebase, Node.js</p>
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <a href="https://healers1.netlify.app/" target="_blank" rel="noopener noreferrer" title="Live Site"><FaExternalLinkAlt /></a>
                    <a href="https://github.com/Aiman03-del/Healers" target="_blank" rel="noopener noreferrer" title="GitHub Repo"><FaGithub /></a>
                  </div>
                </div>

                <div style={{ padding: '15px' }}>
                  <h4 style={{ fontSize: '20px', marginBottom: '8px' }}>MasterChef - Recipe Sharing App</h4>
                  <p style={{ fontSize: '16px', marginBottom: '6px' }}>A recipe sharing web app where users can browse delicious dishes, see chefs' special recipes, and explore cooking inspirations with dynamic data loading.</p>
                  <p style={{ fontSize: '14px', marginBottom: '6px' }}>Tech: React, Firebase Auth, Express, MongoDB</p>
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <a href="https://masterchef-1.netlify.app/" target="_blank" rel="noopener noreferrer" title="Live Site"><FaExternalLinkAlt /></a>
                    <a href="http://github.com/Aiman03-del/Master-chef" target="_blank" rel="noopener noreferrer" title="GitHub Repo"><FaGithub /></a>
                  </div>
                </div>

                <div style={{ padding: '15px' }}>
                  <h4 style={{ fontSize: '20px', marginBottom: '8px' }}>ParcelEase - Delivery Management System</h4>
                  <p style={{ fontSize: '16px', marginBottom: '6px' }}>A parcel delivery management platform built for efficient booking, tracking, and assigning delivery agents — featuring role-based dashboards for admins and users.</p>
                  <p style={{ fontSize: '14px', marginBottom: '6px' }}>Tech: React, Node.js, Express, MongoDB, JWT</p>
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <a href="https://parcel-ease.netlify.app/" target="_blank" rel="noopener noreferrer" title="Live Site"><FaExternalLinkAlt /></a>
                    <a href="https://github.com/Aiman03-del/parcel-ease" target="_blank" rel="noopener noreferrer" title="GitHub Repo"><FaGithub /></a>
                  </div>
                </div>

                <div style={{ padding: '15px' }}>
                  <h4 style={{ fontSize: '20px', marginBottom: '8px' }}>Mahi Bakery - Daily Expense & Profit Tracker</h4>
                  <p style={{ fontSize: '16px', marginBottom: '6px' }}>A bakery management tool that tracks ingredient usage, daily expenses, and profits automatically with persistent due calculations across days.</p>
                  <p style={{ fontSize: '14px', marginBottom: '6px' }}>Tech: React, Node.js, Express, MongoDB</p>
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <a href="https://mahibakery.netlify.app/" target="_blank" rel="noopener noreferrer" title="Live Site"><FaExternalLinkAlt /></a>
                    <a href="https://github.com/Aiman03-del/mahi-backery-clean" target="_blank" rel="noopener noreferrer" title="GitHub Repo"><FaGithub /></a>
                  </div>
                </div>

                <div style={{ padding: '15px' }}>
                  <h4 style={{ fontSize: '20px', marginBottom: '8px' }}>Brainiacs - Team Collaboration Tool</h4>
                  <p style={{ fontSize: '16px', marginBottom: '6px' }}>A real-time collaboration tool featuring chat, polls, and board creation for teams — including task management and board visibility options.</p>
                  <p style={{ fontSize: '14px', marginBottom: '6px' }}>Tech: React, Tailwind CSS, Node.js, Express, MongoDB, JWT</p>
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <a href="https://brainiacs1.netlify.app/" target="_blank" rel="noopener noreferrer" title="Live Site"><FaExternalLinkAlt /></a>
                    <a href="https://github.com/AsadEducation/Brainiacs-Team-Collaboration" target="_blank" rel="noopener noreferrer" title="GitHub Repo"><FaGithub /></a>
                  </div>
                </div>

                <div style={{ padding: '15px' }}>
                  <h4 style={{ fontSize: '20px', marginBottom: '8px' }}>Career Counseling - Guidance Platform</h4>
                  <p style={{ fontSize: '16px', marginBottom: '6px' }}>An online career counseling web app that helps students and professionals connect with mentors and get personalized guidance for their career paths.</p>
                  <p style={{ fontSize: '14px', marginBottom: '6px' }}>Tech: React, Tailwind CSS, Node.js, Express, MongoDB</p>
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <a href="https://gregarious-churros-c2a505.netlify.app/" target="_blank" rel="noopener noreferrer" title="Live Site"><FaExternalLinkAlt /></a>
                    <a href="https://github.com/AsadEducation/Career-Counseling" target="_blank" rel="noopener noreferrer" title="GitHub Repo"><FaGithub /></a>
                  </div>
                </div>
              </div>
            </>
          )
        }
      case 'contact':
        return {
          title: 'Contact',
          content: (
            <>
              <h3 style={{ fontSize: '24px', marginBottom: '20px' }}>Get In Touch</h3>
              <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '30px' }}>
                Let's create something extraordinary together. I'd love to hear about your idea or project.
              </p>
              
              <div style={{ display: 'grid', gap: '20px' }}>
                <div>
                  <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>Email</h4>
                  <p style={{ fontSize: '16px' }}>ausiaam83@gmail.com</p>
                </div>
                
                <div>
                  <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>Phone</h4>
                  <p style={{ fontSize: '16px' }}>+8801538288739</p>
                </div>
                
                <div>
                  <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>Location</h4>
                  <p style={{ fontSize: '16px' }}>Mirsarai, Chattogram</p>
                </div>
                
                <div>
                  <h4 style={{ fontSize: '18px', marginBottom: '8px' }}>Follow</h4>
                  <p style={{ fontSize: '16px' }}>Twitter / LinkedIn / GitHub (links on site)</p>
                </div>
              </div>
            </>
          )
        }
      case 'experience':
        return {
          title: 'Experience',
          content: (
            <>
              <div style={{ marginBottom: '30px' }}>
                <h4 style={{ fontSize: '22px', marginBottom: '8px' }}>Full Stack Web Developer</h4>
                <p style={{ fontSize: '18px', marginBottom: '10px' }}>Growthly IT</p>
                <p style={{ fontSize: '16px', marginBottom: '15px' }}>Current Position</p>
                <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                  Currently working on cutting-edge web applications, building scalable solutions with modern technologies.
                  Focus on clean code, efficient architecture, and delivering exceptional user experiences.
                </p>
              </div>
              
              <div style={{ paddingTop: '20px' }}>
                <h4 style={{ fontSize: '22px', marginBottom: '8px' }}>Full Stack Web Developer</h4>
                <p style={{ fontSize: '18px', marginBottom: '10px' }}>Mahi Bakery</p>
                <p style={{ fontSize: '16px', marginBottom: '15px' }}>Previous Position</p>
                <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                  Developed and maintained POS (Point of Sale) system for bakery operations.
                  Implemented full-stack solutions covering inventory management, sales tracking, and daily expense tracking.
                  Worked on both frontend and backend development, ensuring seamless user experience and data accuracy.
                </p>
              </div>
            </>
          )
        }
      case 'services':
        return {
          title: 'Services & Pricing',
          content: (
            <>
              <h3 style={{ fontSize: '24px', marginBottom: '15px' }}>Services I Offer</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '20px' }}>straightforward, honest scope and pricing. Price estimates are starting points and can be adjusted after requirements.</p>
              
              <div style={{ display: 'grid', gap: '20px' }}>
                {/* Basic Website */}
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h4 style={{ fontSize: '22px' }}>Basic Website</h4>
                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>$299</span>
                  </div>
                  <p style={{ fontSize: '14px', marginBottom: '15px' }}>1–2 weeks</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '10px' }}>Responsive landing or portfolio, up to 5 pages, contact form, 1 month support.</p>
                </div>
                
                {/* Professional Website */}
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h4 style={{ fontSize: '22px' }}>Professional Website</h4>
                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>$599</span>
                  </div>
                  <p style={{ fontSize: '14px', marginBottom: '15px' }}>2–3 weeks</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '10px' }}>Custom design, up to 10 pages, SEO basics, analytics integration, 3 months support.</p>
                </div>
                
                {/* E-commerce Website */}
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h4 style={{ fontSize: '22px' }}>E-commerce Website</h4>
                    <span style={{ fontSize: '20px', fontWeight: 'bold' }}>$999</span>
                  </div>
                  <p style={{ fontSize: '14px', marginBottom: '15px' }}>3–4 weeks</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '10px' }}>Product catalog, checkout integration, admin panel, order management, 6 months support.</p>
                </div>
              </div>

              <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '20px' }}>Additional Services</h3>
              <div style={{ display: 'grid', gap: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px' }}>
                  <div>
                    <h4 style={{ fontSize: '18px', marginBottom: '5px' }}>Website Maintenance</h4>
                    <p style={{ fontSize: '14px' }}>updates, backups, security monitoring</p>
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>$99/month</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px' }}>
                  <div>
                    <h4 style={{ fontSize: '18px', marginBottom: '5px' }}>Performance Audit & Optimization</h4>
                    <p style={{ fontSize: '14px' }}>speed & performance improvements</p>
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>$199</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px' }}>
                  <div>
                    <h4 style={{ fontSize: '18px', marginBottom: '5px' }}>SEO Services</h4>
                    <p style={{ fontSize: '14px' }}>search engine optimization and ranking improvements</p>
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>$299</span>
                </div>
              </div>

              <p style={{ fontSize: '14px', marginTop: '12px' }}>(Local pricing or currency conversion can be displayed based on client region.)</p>
            </>
          )
        }
      case 'testimonials':
        return {
          title: 'Testimonials',
          content: (
            <>
              <h3 style={{ fontSize: '24px', marginBottom: '12px' }}>What clients say</h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                <blockquote style={{ fontSize: '16px', lineHeight: '1.8', paddingLeft: 12 }}>
                  "Delivered a clean, fast site on time. Clear communication and dependable results." — Client A
                </blockquote>
                <blockquote style={{ fontSize: '16px', lineHeight: '1.8', paddingLeft: 12 }}>
                  "Thoughtful design, stable deployment, and easy-to-use admin panel." — Client B
                </blockquote>
                <p style={{ fontSize: '14px' }}>(Replace with real client quotes or GitHub/LinkedIn recommendations.)</p>
              </div>
            </>
          )
        }
      default:
        return {
          title: 'Planet',
          content: <p>Explore this world's details.</p>
        }
    }
  })()

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: 20,
        padding: 20,
        zIndex: 2,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Profile image */}
      <div
        style={{
          position: isMobile ? 'relative' : 'sticky',
          top: isMobile ? 0 : 20,
          alignSelf: 'center',
          flexShrink: 0
        }}
      >
        <img 
          src="/images/profile.png" 
          alt="Profile"
          style={{
            width: isMobile ? '100%' : 'min(400px, 35vw)',
            maxWidth: isMobile ? 350 : 'none',
            height: 'auto',
            borderRadius: 12,
            objectFit: 'contain'
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          overflowY: 'auto',
          maxHeight: '100vh',
          paddingRight: isMobile ? 0 : 10,
          paddingTop: 20,
          paddingBottom: 20
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <strong style={{ fontSize: 18 }}>Inside: {planetId}</strong>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('inside-planet-exit'))}
            style={{
              background: 'transparent',
              padding: '6px 10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FaTimes size={18} /> 
          </button>
        </div>
        <div style={{ display: 'grid', gap: 12 }}>
          <h2>{content.title}</h2>
          {content.content}
        </div>
      </div>
    </div>
  )
}

