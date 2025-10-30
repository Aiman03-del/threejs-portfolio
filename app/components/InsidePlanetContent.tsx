'use client'

import { useEffect, useState } from 'react'

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
              <h3 style={{ fontSize: '24px', marginBottom: '15px', color: '#ffaa00' }}>About Me</h3>
              <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '20px' }}>
                Passionate web developer with a love for minimalism, detail, and timeless design.
              </p>

              <h3 style={{ fontSize: '24px', marginBottom: '15px', color: '#ffaa00' }}>My Story</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '20px' }}>
                Hey there — I’m <strong>Ayman Uddin Siam</strong>, a Full Stack Web Developer from Bangladesh, currently working at Growthly IT. My journey didn’t begin with a computer science degree — it began with curiosity and late nights spent learning how the web actually works. I started with HTML and CSS, fell in love with React, and expanded into building full applications with the MERN stack, NestJS, and TypeScript. I value clean design, measurable performance, and user-first thinking — blending traditional craftsmanship with modern tooling. Every project I build reflects discipline, patience, and a dedication to steady growth.
              </p>
            </>
          )
        }
      case 'skills':
        return {
          title: 'Technologies',
          content: (
            <>
              <h3 style={{ fontSize: '24px', marginBottom: '15px', color: '#ffaa00' }}>Technologies I Use</h3>
              <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '20px' }}>
                React • Next.js • NestJS • TypeScript • Node.js • Express.js • MongoDB • MySQL • Tailwind CSS • DaisyUI • Framer Motion • Vite • Git • Docker
              </p>

              <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#ffaa00' }}>Tooling & Workflow</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '20px' }}>
                VSCode • ESLint • Prettier • GitHub • Netlify • Vercel • Postman • Figma
              </p>

              <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#ffaa00' }}>Core Competencies</h3>
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

              <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#ffaa00' }}>Approach</h3>
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
                <div style={{ padding: '15px', border: '1px solid rgba(255,170,0,0.2)', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '20px', marginBottom: '8px', color: '#ffcc00' }}>Brainiacs — Team Collaboration Tool</h4>
                  <p style={{ fontSize: '16px', marginBottom: '6px' }}>Full-featured collaboration app with boards, polls, chat, and task management.</p>
                  <p style={{ fontSize: '14px', color: '#ffaa00', marginBottom: '6px' }}>Tech: React, Node.js, MongoDB, Framer Motion</p>
                  <p style={{ fontSize: '14px' }}>Live: [link] — Repo: [link]</p>
                </div>

                <div style={{ padding: '15px', border: '1px solid rgba(255,170,0,0.2)', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '20px', marginBottom: '8px', color: '#ffcc00' }}>Lotus — EquiSports (E-commerce)</h4>
                  <p style={{ fontSize: '16px', marginBottom: '6px' }}>Sports equipment marketplace with product CRUD, authentication, and responsive design.</p>
                  <p style={{ fontSize: '14px', color: '#ffaa00', marginBottom: '6px' }}>Tech: MERN stack + NestJS for APIs</p>
                  <p style={{ fontSize: '14px' }}>Live: [link] — Repo: [link]</p>
                </div>

                <div style={{ padding: '15px', border: '1px solid rgba(255,170,0,0.2)', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '20px', marginBottom: '8px', color: '#ffcc00' }}>Mahi Bakery — Expense & Profit Tracker</h4>
                  <p style={{ fontSize: '16px', marginBottom: '6px' }}>Daily bakery expense system that calculates ingredient usage and profit per item.</p>
                  <p style={{ fontSize: '14px', color: '#ffaa00', marginBottom: '6px' }}>Tech: React frontend, Node backend, persistent storage</p>
                  <p style={{ fontSize: '14px' }}>Live: [link] — Repo: [link]</p>
                </div>

                <div style={{ padding: '15px', border: '1px solid rgba(255,170,0,0.2)', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '20px', marginBottom: '8px', color: '#ffcc00' }}>Healers — Music Streaming (Audio-first)</h4>
                  <p style={{ fontSize: '16px', marginBottom: '6px' }}>Audio-only streaming app with search, playlists, and admin upload.</p>
                  <p style={{ fontSize: '14px', color: '#ffaa00', marginBottom: '6px' }}>Tech: Lightweight UX and streaming performance</p>
                  <p style={{ fontSize: '14px' }}>Live: [link] — Repo: [link]</p>
                </div>

                <div style={{ padding: '15px', border: '1px solid rgba(255,170,0,0.2)', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '20px', marginBottom: '8px', color: '#ffcc00' }}>ParcelEase — Delivery Management System</h4>
                  <p style={{ fontSize: '16px', marginBottom: '6px' }}>Delivery and order management dashboard with status tracking and role-based access.</p>
                  <p style={{ fontSize: '14px', color: '#ffaa00', marginBottom: '6px' }}>Tech: React and NestJS</p>
                  <p style={{ fontSize: '14px' }}>Live: [link] — Repo: [link]</p>
                </div>

                <div style={{ padding: '15px', border: '1px solid rgba(255,170,0,0.2)', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '20px', marginBottom: '8px', color: '#ffcc00' }}>MasterChef — Recipe Sharing</h4>
                  <p style={{ fontSize: '16px', marginBottom: '6px' }}>Community-driven recipe app with user profiles, comments, and favorites.</p>
                  <p style={{ fontSize: '14px', color: '#ffaa00', marginBottom: '6px' }}>Tech: Emphasis on accessibility and fast browsing</p>
                  <p style={{ fontSize: '14px' }}>Live: [link] — Repo: [link]</p>
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
              <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#ffaa00' }}>Get In Touch</h3>
              <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '30px' }}>
                Let's create something extraordinary together. I'd love to hear about your idea or project.
              </p>
              
              <div style={{ display: 'grid', gap: '20px' }}>
                <div>
                  <h4 style={{ fontSize: '18px', marginBottom: '8px', color: '#ffcc00' }}>Email</h4>
                  <p style={{ fontSize: '16px' }}>ausiaam83@gmail.com</p>
                </div>
                
                <div>
                  <h4 style={{ fontSize: '18px', marginBottom: '8px', color: '#ffcc00' }}>Phone</h4>
                  <p style={{ fontSize: '16px' }}>+8801538288739</p>
                </div>
                
                <div>
                  <h4 style={{ fontSize: '18px', marginBottom: '8px', color: '#ffcc00' }}>Location</h4>
                  <p style={{ fontSize: '16px' }}>Mirsarai, Chattogram</p>
                </div>
                
                <div>
                  <h4 style={{ fontSize: '18px', marginBottom: '8px', color: '#ffcc00' }}>Follow</h4>
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
                <h4 style={{ fontSize: '22px', marginBottom: '8px', color: '#ffcc00' }}>Full Stack Web Developer</h4>
                <p style={{ fontSize: '18px', color: '#ffaa00', marginBottom: '10px' }}>Growthly IT</p>
                <p style={{ fontSize: '16px', color: '#aaa', marginBottom: '15px' }}>Current Position</p>
                <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
                  Currently working on cutting-edge web applications, building scalable solutions with modern technologies.
                  Focus on clean code, efficient architecture, and delivering exceptional user experiences.
                </p>
              </div>
              
              <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,170,0,0.2)' }}>
                <h4 style={{ fontSize: '22px', marginBottom: '8px', color: '#ffcc00' }}>Full Stack Web Developer</h4>
                <p style={{ fontSize: '18px', color: '#ffaa00', marginBottom: '10px' }}>Mahi Bakery</p>
                <p style={{ fontSize: '16px', color: '#aaa', marginBottom: '15px' }}>Previous Position</p>
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
              <h3 style={{ fontSize: '24px', marginBottom: '15px', color: '#ffaa00' }}>Services I Offer</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '20px' }}>straightforward, honest scope and pricing. Price estimates are starting points and can be adjusted after requirements.</p>
              
              <div style={{ display: 'grid', gap: '20px' }}>
                {/* Basic Website */}
                <div style={{ padding: '20px', border: '1px solid rgba(255,170,0,0.3)', borderRadius: '8px', background: 'rgba(255,170,0,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h4 style={{ fontSize: '22px', color: '#ffcc00' }}>Basic Website</h4>
                    <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffaa00' }}>$299</span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#aaa', marginBottom: '15px' }}>1–2 weeks</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '10px' }}>Responsive landing or portfolio, up to 5 pages, contact form, 1 month support.</p>
                </div>
                
                {/* Professional Website */}
                <div style={{ padding: '20px', border: '2px solid rgba(255,170,0,0.5)', borderRadius: '8px', background: 'rgba(255,170,0,0.1)' }}>
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ background: '#ff6600', color: '#fff', padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', display: 'inline-block' }}>
                      MOST POPULAR
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h4 style={{ fontSize: '22px', color: '#ffcc00' }}>Professional Website</h4>
                    <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffaa00' }}>$599</span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#aaa', marginBottom: '15px' }}>2–3 weeks</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '10px' }}>Custom design, up to 10 pages, SEO basics, analytics integration, 3 months support.</p>
                </div>
                
                {/* E-commerce Website */}
                <div style={{ padding: '20px', border: '1px solid rgba(255,170,0,0.3)', borderRadius: '8px', background: 'rgba(255,170,0,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h4 style={{ fontSize: '22px', color: '#ffcc00' }}>E-commerce Website</h4>
                    <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffaa00' }}>$999</span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#aaa', marginBottom: '15px' }}>3–4 weeks</p>
                  <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '10px' }}>Product catalog, checkout integration, admin panel, order management, 6 months support.</p>
                </div>
              </div>

              <h3 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '20px', color: '#ffaa00' }}>Additional Services</h3>
              <div style={{ display: 'grid', gap: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', border: '1px solid rgba(255,170,0,0.2)', borderRadius: '8px' }}>
                  <div>
                    <h4 style={{ fontSize: '18px', marginBottom: '5px', color: '#ffcc00' }}>Website Maintenance</h4>
                    <p style={{ fontSize: '14px' }}>updates, backups, security monitoring</p>
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffaa00' }}>$99/month</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', border: '1px solid rgba(255,170,0,0.2)', borderRadius: '8px' }}>
                  <div>
                    <h4 style={{ fontSize: '18px', marginBottom: '5px', color: '#ffcc00' }}>Performance Audit & Optimization</h4>
                    <p style={{ fontSize: '14px' }}>speed & performance improvements</p>
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffaa00' }}>$199</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', border: '1px solid rgba(255,170,0,0.2)', borderRadius: '8px' }}>
                  <div>
                    <h4 style={{ fontSize: '18px', marginBottom: '5px', color: '#ffcc00' }}>SEO Services</h4>
                    <p style={{ fontSize: '14px' }}>search engine optimization and ranking improvements</p>
                  </div>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffaa00' }}>$299</span>
                </div>
              </div>

              <p style={{ fontSize: '14px', color: '#aaa', marginTop: '12px' }}>(Local pricing or currency conversion can be displayed based on client region.)</p>
            </>
          )
        }
      case 'testimonials':
        return {
          title: 'Testimonials',
          content: (
            <>
              <h3 style={{ fontSize: '24px', marginBottom: '12px', color: '#ffaa00' }}>What clients say</h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                <blockquote style={{ fontSize: '16px', lineHeight: '1.8', borderLeft: '3px solid rgba(255,170,0,0.4)', paddingLeft: 12 }}>
                  “Delivered a clean, fast site on time. Clear communication and dependable results.” — Client A
                </blockquote>
                <blockquote style={{ fontSize: '16px', lineHeight: '1.8', borderLeft: '3px solid rgba(255,170,0,0.4)', paddingLeft: 12 }}>
                  “Thoughtful design, stable deployment, and easy-to-use admin panel.” — Client B
                </blockquote>
                <p style={{ fontSize: '14px', color: '#aaa' }}>(Replace with real client quotes or GitHub/LinkedIn recommendations.)</p>
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
        height: '100%',
        overflowY: 'auto',
        alignItems: isMobile ? 'center' : 'flex-start',
        zIndex: 2
      }}
    >
      {/* Profile image */}
      <img 
        src="/images/profile.png" 
        alt="Profile"
        style={{
          width: isMobile ? '100%' : 'min(400px, 35vw)',
          maxWidth: isMobile ? 350 : 'none',
          height: 'auto',
          borderRadius: 12,
          objectFit: 'contain',
          alignSelf: isMobile ? 'center' : 'flex-start'
        }}
      />

      {/* Content */}
      <div
        style={{
          flex: 1,
          color: '#f5f5f5',
          minWidth: 0
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <strong style={{ fontSize: 18 }}>Inside: {planetId}</strong>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('inside-planet-exit'))}
            style={{
              background: 'transparent',
              color: '#f5f5f5',
              border: '1px solid rgba(255,255,255,0.15)',
              padding: '6px 10px',
              borderRadius: 8,
              cursor: 'pointer'
            }}
          >
            Exit
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

