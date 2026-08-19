'use client'

import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { QuantumBg } from '@/components/quantum-bg'

const STATS = [
  { value: 'Hybrid', label: 'In-Person & Virtual' },
  { value: 'Fall 2026', label: 'Dates TBD' },
  { value: 'Open to All', label: 'No Experience Needed' },
]

export function Hero() {
  const reduce = useReducedMotion()

  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-16 md:pt-20"
    >
      {/* Official Qiskit Fall Fest hero background */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.png"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy/80" />
      </div>

      <QuantumBg />

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
            className="inline-flex items-center gap-2 rounded-full border border-[#FF006B]/30 bg-gradient-to-r from-[#FF006B]/10 via-white/10 to-[#6929C4]/10 px-5 py-2.5 text-xs font-semibold text-cream shadow-lg shadow-[#FF006B]/10 backdrop-blur-xl sm:text-sm"
          >
            <Sparkles className="size-4 text-[#FF006B]" />
            Hosted by NC A&amp;T State University
            <span className="size-2 animate-pulse rounded-full bg-[#FF006B]" />
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
