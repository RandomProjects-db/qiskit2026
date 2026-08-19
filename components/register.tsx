'use client'

import { MapPin, Wifi, Check, Award, BrainCircuit, Handshake } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const OPTIONS = [
  {
    icon: MapPin,
    title: 'In-Person',
    tagline: 'Greensboro, NC',
    benefits: [
      'Hands-on lab access with mentors',
      'Face-to-face networking & swag',
      'Compete on-site with your team',
    ],
    cta: 'Register In-Person',
  },
  {
    icon: Wifi,
    title: 'Virtual',
    tagline: 'Join from anywhere',
    benefits: [
      'Live-streamed workshops & talks',
      'Cloud access to IBM Quantum',
      'Remote competition track',
    ],
    cta: 'Register Virtually',
  },
]

const PERKS = [
  { icon: Award, title: 'Certificate', desc: 'A shareable certificate of completion.' },
  {
    icon: BrainCircuit,
    title: 'Knowledge & Skills',
    desc: 'Real, applied quantum programming experience.',
  },
  { icon: Handshake, title: 'Networking', desc: 'Connections across the quantum community.' },
]

export function Register() {
  return (
    <section
      id="register"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-br from-[#4c1d95] via-[#6d28d9] to-navy py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Register
          </p>
          <h2 className="mt-3 text-balance font-display text-2xl font-bold text-cream sm:text-4xl">
            Claim your spot at Fall Fest 2026
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-cream/80">
            Free to attend. Pick the format that works for you — both come with the full
            Qiskit experience.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Attendance cards */}
          <div className="grid grid-cols-1 gap-6 md:col-span-2">
            {OPTIONS.map((o, i) => (
              <Reveal key={o.title} delay={i * 0.1}>
                <div className="flex h-full flex-col rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-gold text-gold-foreground">
                      <o.icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-cream">{o.title}</h3>
                      <p className="text-sm text-cream/70">{o.tagline}</p>
                    </div>
                  </div>
                  <ul className="mt-6 flex flex-1 flex-col gap-3">
                    {o.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm text-cream/90">
                        <Check className="mt-0.5 size-5 shrink-0 text-gold" />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#top"
                    className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-pink py-3 font-semibold text-pink-foreground shadow-lg shadow-pink/25 transition-transform hover:scale-[1.02] active:scale-95"
                  >
                    {o.cta}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          {/* What you'll get */}
          <Reveal delay={0.15} className="md:col-span-1">
            <div className="flex h-full flex-col rounded-2xl border border-white/20 bg-navy-deep/40 p-6 backdrop-blur-xl sm:p-8">
              <h3 className="font-display text-lg font-bold text-cream">What You&apos;ll Get</h3>
              <div className="mt-6 flex flex-col gap-5">
                {PERKS.map((p) => (
                  <div key={p.title} className="flex gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gold">
                      <p.icon className="size-5" />
                    </span>
                    <div>
                      <h4 className="font-display font-bold text-cream">{p.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-cream/75">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
