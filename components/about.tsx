'use client'

import React from 'react'
import { motion } from 'motion/react'
import { CircuitBoard, Users, Trophy, Layers, Atom, BriefcaseBusiness, Zap, FlaskConical, Handshake, Swords } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const FEATURES = [
  {
    icon: CircuitBoard,
    title: 'Hands-on Qiskit',
    desc: 'Write and run real quantum circuits on IBM Quantum hardware.',
  },
  {
    icon: Users,
    title: 'Community',
    desc: 'Meet students, faculty, and researchers exploring quantum.',
  },
  {
    icon: Trophy,
    title: 'Competition',
    desc: 'Team up for a friendly quantum coding challenge with prizes.',
  },
  {
    icon: Layers,
    title: 'All Levels',
    desc: 'Curated tracks for beginners through advanced builders.',
  },
]

const ACCOMPLISH = [
  {
    icon: FlaskConical,
    title: 'Workshops',
    desc: 'Guided labs walk you from your first qubit to multi-gate algorithms using Qiskit.',
  },
  {
    icon: Handshake,
    title: 'Networking',
    desc: 'Connect with the quantum community — peers, mentors, and IBM Quantum advocates.',
  },
  {
    icon: Swords,
    title: 'Competition',
    desc: 'Put your new skills to the test in a timed challenge with recognition and prizes.',
  },
]

const WHY = [
  {
    icon: Atom,
    title: 'The Next Frontier',
    desc: 'Quantum computing is reshaping cryptography, chemistry, and optimization.',
  },
  {
    icon: BriefcaseBusiness,
    title: 'Career Ready',
    desc: 'Early quantum skills set you apart as the industry scales rapidly.',
  },
  {
    icon: Zap,
    title: 'Real Impact',
    desc: 'Tackle problems classical computers simply cannot solve efficiently.',
  },
]

const PARTNERS = [
  { name: 'IBM Quantum', href: 'https://quantum.ibm.com', color: 'from-[#6929C4] to-[#4C1D95]' },
  { name: 'Qiskit', href: 'https://qiskit.org', color: 'from-[#FF006B] to-[#C4004E]' },
  { name: 'NC A&T', href: 'https://www.ncat.edu', color: 'from-[#1B365D] to-[#0F2240]' },
]

export function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-cyan">
            About the Event
          </p>
          <h2 className="mt-3 text-balance font-display text-2xl font-bold text-navy sm:text-4xl">
            A week to fall in love with quantum computing
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Qiskit Fall Fest is a global celebration of quantum computing run by students,
            for students. At NC A&amp;T, we&apos;re bringing the Aggie community together
            for a hybrid experience packed with learning, building, and connecting.
          </p>
        </Reveal>

        {/* Feature cards */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <article className="h-full rounded-2xl border border-border bg-card p-6 shadow-lg transition-shadow hover:shadow-xl">
                <span className="flex size-11 items-center justify-center rounded-xl bg-navy text-cream">
                  <f.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-navy">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Accomplish + Why */}
        <div className="mt-16 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-2 md:gap-12">
          <Reveal>
            <h3 className="font-display text-xl font-bold text-navy sm:text-2xl">
              What Will We Accomplish?
            </h3>
            <div className="mt-6 flex flex-col gap-4">
              {ACCOMPLISH.map((a) => (
                <div
                  key={a.title}
                  className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                    <a.icon className="size-5" />
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-navy">{a.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {a.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="font-display text-xl font-bold text-navy sm:text-2xl">
              Why Quantum?!
            </h3>
            <div className="mt-6 flex flex-col gap-4">
              {WHY.map((w) => (
                <div
                  key={w.title}
                  className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                    <w.icon className="size-5" />
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-navy">{w.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {w.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Partners - Infinite scroll marquee */}
        <Reveal className="mt-16 md:mt-20">
          <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            In Collaboration With
          </p>
          <div className="mx-auto max-w-sm flex relative overflow-hidden mt-6 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-10 before:bg-gradient-to-r before:from-background before:to-transparent before:content-[''] after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-10 after:bg-gradient-to-l after:from-background after:to-transparent after:content-['']">
            <motion.div
              transition={{
                duration: 5,
                ease: 'linear',
                repeat: Infinity,
              }}
              initial={{ translateX: 0 }}
              animate={{ translateX: '-50%' }}
              className="flex flex-none gap-16 pr-16"
            >
              {[...new Array(2)].fill(0).map((_, index) => (
                <React.Fragment key={index}>
                  {PARTNERS.map((p) => (
                    <a
                      key={`${p.name}-${index}`}
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex shrink-0 items-center gap-3 rounded-full border border-border/50 bg-secondary/50 px-6 py-3 font-display font-semibold text-navy transition-all duration-300 hover:border-[#6929C4]/40 hover:bg-white hover:shadow-lg"
                    >
                      <span className="transition-colors group-hover:text-[#6929C4]">{p.name}</span>
                      <span className="text-[#FF006B] opacity-50 transition-opacity group-hover:opacity-100">•</span>
                    </a>
                  ))}
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
