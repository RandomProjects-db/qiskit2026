'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowRight, MapPin } from 'lucide-react'

const STATS = [
  { value: 'Hybrid', label: 'In-Person & Virtual' },
  { value: 'Nov 12–14', label: '2026' },
  { value: 'Open to All', label: 'No Experience Needed' },
]

export function Hero() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  // Subtle scroll parallax: the video drifts and fades slightly as you scroll past.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.5])

  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-16 md:pt-20"
    >
      {/* Quantum hero background video with scroll parallax */}
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y: bgY, scale: bgScale, opacity: bgOpacity }}
      >
        {reduce ? (
          // Reduced-motion users get the static poster frame, no autoplay video.
          <img
            src="/hero/quantum-hero-poster.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/hero/quantum-hero-poster.jpg"
          >
            <source src="/hero/quantum-hero.webm" type="video/webm" />
            <source src="/hero/quantum-hero.mp4" type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-[#060914]" />
      </motion.div>

      <div className="relative mx-auto w-full max-w-5xl px-4 py-16 text-center md:py-20">
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.12 }}
          className="flex flex-col items-center"
        >
          <motion.span
            variants={item}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-[#00E5FF]/30 bg-gradient-to-r from-[#00E5FF]/10 via-white/10 to-[#00BCD4]/10 px-7 py-3 text-sm font-semibold tracking-wide text-cream shadow-lg shadow-[#00E5FF]/10 backdrop-blur-xl sm:px-9 sm:text-base"
          >
            <MapPin className="size-4 text-[#00E5FF]" />
            at NC A&amp;T State University · JSNN
          </motion.span>

          <motion.div
            variants={item}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 flex justify-center"
          >
            <img src="/qiskit-fallfest-2026-black.png" alt="Qiskit Fall Fest 2026" className="size-52 drop-shadow-2xl sm:size-64" />
          </motion.div>

          <motion.h1
            variants={item}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight text-cream sm:text-6xl lg:text-7xl"
          >
            <span className="text-gradient-hero">Qiskit Fall Fest</span>
            <span className="mt-1 block">2026</span>
          </motion.h1>

          <motion.p
            variants={item}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-cream/80 sm:text-lg"
          >
            A campus-wide celebration of quantum computing — hands-on Qiskit workshops,
            speaker sessions, and a coding competition. Come curious, leave a quantum
            programmer.
          </motion.p>

          <motion.div
            variants={item}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
          >
            <a
              href="#register"
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-pink px-8 py-3 font-semibold text-pink-foreground shadow-xl shadow-pink/30 transition-transform hover:scale-[1.03] active:scale-95 sm:w-auto"
            >
              Register Now
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#about"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/30 bg-white/5 px-8 py-3 font-semibold text-cream backdrop-blur-xl transition-colors hover:bg-white/15 active:bg-white/25 sm:w-auto"
            >
              Learn More
            </a>
            <a
              href="https://discord.gg/MVGJmv3AC"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[#5865F2]/50 bg-[#5865F2]/10 px-8 py-3 font-semibold text-cream backdrop-blur-xl transition-colors hover:bg-[#5865F2]/20 active:bg-[#5865F2]/30 sm:w-auto"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 text-[#8b93f8]" aria-hidden="true">
                <path d="M20.317 4.369a19.79 19.79 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.1 13.1 0 01-1.872-.892.077.077 0 01-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.009c.12.099.246.198.373.292a.077.077 0 01-.006.127 12.3 12.3 0 01-1.873.891.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.84 19.84 0 006.002-3.03.077.077 0 00.032-.056c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.331c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Join the Discord
            </a>
          </motion.div>

          <motion.dl
            variants={item}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {STATS.map((stat) => (
              <div
                key={stat.value}
                className="rounded-2xl border border-white/15 bg-white/10 px-4 py-5 backdrop-blur-xl"
              >
                <dt className="font-display text-xl font-bold text-cream sm:text-2xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-sm text-cream/70">{stat.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  )
}
