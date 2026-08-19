'use client'

import { motion, useReducedMotion } from 'motion/react'

function AtomGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} aria-hidden="true">
      <circle cx="100" cy="100" r="10" fill="currentColor" />
      <ellipse cx="100" cy="100" rx="90" ry="34" stroke="currentColor" strokeWidth="2" />
      <ellipse
        cx="100"
        cy="100"
        rx="90"
        ry="34"
        stroke="currentColor"
        strokeWidth="2"
        transform="rotate(60 100 100)"
      />
      <ellipse
        cx="100"
        cy="100"
        rx="90"
        ry="34"
        stroke="currentColor"
        strokeWidth="2"
        transform="rotate(120 100 100)"
      />
    </svg>
  )
}

function CircuitGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 160" fill="none" className={className} aria-hidden="true">
      <line x1="0" y1="40" x2="240" y2="40" stroke="currentColor" strokeWidth="2" />
      <line x1="0" y1="90" x2="240" y2="90" stroke="currentColor" strokeWidth="2" />
      <line x1="0" y1="140" x2="240" y2="140" stroke="currentColor" strokeWidth="2" />
      <rect x="46" y="24" width="32" height="32" rx="6" stroke="currentColor" strokeWidth="2" />
      <rect x="150" y="74" width="32" height="32" rx="6" stroke="currentColor" strokeWidth="2" />
      <circle cx="118" cy="40" r="7" fill="currentColor" />
      <line x1="118" y1="40" x2="118" y2="140" stroke="currentColor" strokeWidth="2" />
      <circle cx="118" cy="140" r="10" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

export function QuantumBg() {
  const reduce = useReducedMotion()

  const float = (dur: number, y: number) =>
    reduce
      ? {}
      : {
          animate: { y: [0, y, 0], opacity: [0.5, 0.8, 0.5] },
          transition: { duration: dur, repeat: Infinity, ease: 'easeInOut' as const },
        }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute -left-10 top-[12%] text-cyan/25 sm:left-[4%]"
        {...float(9, -18)}
      >
        <AtomGlyph className="size-40 sm:size-56" />
      </motion.div>
      <motion.div
        className="absolute -right-8 top-[8%] text-gold/20 sm:right-[6%]"
        {...float(11, 20)}
      >
        <CircuitGlyph className="w-48 sm:w-72" />
      </motion.div>
      <motion.div
        className="absolute bottom-[10%] right-[8%] text-pink/20 sm:bottom-[14%]"
        {...float(13, -22)}
      >
        <AtomGlyph className="size-28 sm:size-40" />
      </motion.div>
    </div>
  )
}
