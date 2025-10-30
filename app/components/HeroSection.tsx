'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'
import { SkewedButton } from './ui/SkewedButton'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20 text-white">
      {/* 🔮 Ambient Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/40 to-black/90 z-0"></div>
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-700/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-700/30 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* ✨ Intro Text */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-lg md:text-xl text-blue-300 mb-4 tracking-wide"
        >
          👋 Hello, I’m
        </motion.p>

        {/* 🌟 Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.9, ease: 'easeOut' }}
          className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-4 
                     bg-gradient-to-r from-indigo-300 via-blue-200 to-purple-300 
                     bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(99,102,241,0.3)]"
        >
          Aiman Uddin
        </motion.h1>

        {/* 💻 Title */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9, ease: 'easeOut' }}
          className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-300 mb-8"
        >
          Full Stack Developer
        </motion.h2>

        {/* 🧠 Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
        >
          I love crafting immersive digital experiences using modern technologies like 
          <span className="text-blue-400 font-medium"> React</span>, 
          <span className="text-purple-400 font-medium"> Next.js</span>, and 
          <span className="text-pink-400 font-medium"> Three.js</span>. 
          My goal is to blend design, motion, and functionality into seamless user experiences.
        </motion.p>

        {/* 🚀 Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16"
        >
          <SkewedButton 
            variant="primary" 
            size="lg"
            onClick={() => console.log('Portfolio clicked')}
          >
            View My Work
          </SkewedButton>

          <SkewedButton 
            variant="outline" 
            size="lg"
            onClick={() => console.log('Contact clicked')}
          >
            Contact Me
          </SkewedButton>
        </motion.div>

        {/* 🌐 Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex justify-center gap-6"
        >
          {[
            { icon: FaGithub, href: "#", label: "GitHub" },
            { icon: FaLinkedin, href: "#", label: "LinkedIn" },
            { icon: FaTwitter, href: "#", label: "Twitter" },
            { icon: FaEnvelope, href: "#", label: "Email" }
          ].map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + index * 0.1, duration: 0.6 }}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm 
                         hover:scale-110 transition-all duration-300 border border-white/10"
              aria-label={social.label}
            >
              <social.icon size={24} />
            </motion.a>
          ))}
        </motion.div>

        {/* ⬇️ Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-7 h-12 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-3 bg-white/60 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
