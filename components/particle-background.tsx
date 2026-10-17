'use client'

/**
 * Root-level mount for the persistent particle background.
 *
 * Mounts a single fixed, full-screen WebGL canvas behind all page content
 * (z-0), driven by full-page scroll. Content in the app sits at z-10+ with
 * transparent section backgrounds, so the particles show through the entire
 * page. A small fixed caption reflects the current shape.
 */

import { useState } from 'react'
import dynamic from 'next/dynamic'
import type { Stage } from '@/components/ParticleMorph'

const ParticleMorph = dynamic(() => import('@/components/ParticleMorph'), { ssr: false })

// Seven shapes mapped across the page, one roughly per section.
const STAGES: Stage[] = [
  { title: 'Dilution fridge', description: 'Cooled near absolute zero so qubits can hold their state.' },
  { title: 'Surface code', description: 'A grid of qubits that catches its own errors.' },
  { title: 'Quantum circuit', description: 'Gates acting on qubits — the thing you write and run.' },
  { title: 'Bloch sphere', description: 'One qubit’s state, drawn as a point on a sphere.' },
  { title: 'Entangled pair', description: 'Two qubits whose results stay correlated at any distance.' },
  { title: 'Interference', description: 'Amplitudes add like waves so wrong answers cancel out.' },
  { title: 'Spring', description: 'A rotating phase winds into a helix. Same particles, new shape.' },
]

const COLORS = {
  dark: ['#5eead4', '#38bdf8', '#a78bfa', '#60a5fa', '#f472b6', '#34d399', '#fbbf24'],
  light: ['#0f766e', '#0369a1', '#6d28d9', '#1d4ed8', '#be185d', '#047857', '#b45309'],
}

export function ParticleBackground() {
  const [stage, setStage] = useState(0)

  return (
    <>
      {/* Fixed canvas behind everything. Progress starts at the hero's bottom
          (#top is the hero section id) and reaches 1 at the page bottom. */}
      <ParticleMorph
        stages={STAGES}
        colors={COLORS}
        theme="dark"
        startAfterSelector="#top"
        onStageChange={setStage}
      />

      {/* Small fixed caption, bottom-left, reflecting the active shape. */}
      <div className="pointer-events-none fixed bottom-6 left-6 z-10 max-w-xs">
        <h2 key={stage} className="animate-fade-up font-display text-sm font-semibold uppercase tracking-widest text-white/80">
          {STAGES[stage].title}
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-white/50">{STAGES[stage].description}</p>
      </div>
    </>
  )
}
