'use client'

import { Calendar, MapPin, Clock, User, Code2, Cpu, Wrench, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/reveal'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

type Level = 'Beginner' | 'Intermediate' | 'All Levels'

const LEVEL_STYLES: Record<Level, string> = {
  Beginner: 'bg-emerald-500/15 text-emerald-700',
  Intermediate: 'bg-amber-500/15 text-amber-700',
  'All Levels': 'bg-cyan/15 text-cyan',
}

const DAYS: {
  day: string
  date: string
  format: string
  level: Level
  desc: string
  events: { time: string; title: string; desc: string; speaker: string }[]
}[] = [
  {
    day: 'Day 1 — Quantum Foundations & Community Launch',
    date: 'Fall 2026 · Date TBD',
    format: 'Hybrid',
    level: 'All Levels',
    desc: 'Discover Quantum — opening keynote, guest speakers, career panel, and hackathon team formation.',
    events: [
      {
        time: '4:00 – 5:00 PM',
        title: 'Registration, Networking & Refreshments',
        desc: 'Check in, meet fellow attendees, and grab a bite before we begin.',
        speaker: 'Organizing Team',
      },
      {
        time: '5:00 – 5:20 PM',
        title: 'Welcome from NC A&T Organizers',
        desc: 'Opening remarks and overview of the three-day program.',
        speaker: 'Godwin Micah Smart',
      },
      {
        time: '5:20 – 6:00 PM',
        title: 'Opening Keynote: Why Quantum Computing Matters Now',
        desc: 'A big-picture look at where quantum computing is headed and why it matters.',
        speaker: 'TBD',
      },
      {
        time: '6:00 – 6:40 PM',
        title: 'IBM Quantum / Qiskit Guest Speaker',
        desc: 'Insights from the Qiskit ecosystem and IBM Quantum platform.',
        speaker: 'TBD (IBM Quantum)',
      },
      {
        time: '6:40 – 7:20 PM',
        title: 'Panel: Quantum Careers & Pathways',
        desc: 'Quantum careers, graduate school, and pathways into the field.',
        speaker: 'Panel (Duke Quantum Center + others)',
      },
      {
        time: '7:20 – 7:45 PM',
        title: 'Hackathon Challenge Reveal & Team Formation',
        desc: 'Hackathon rules, tracks, and mentor introductions. Form your teams!',
        speaker: 'Organizing Team',
      },
    ],
  },
  {
    day: 'Day 2 — Learn by Building',
    date: 'Fall 2026 · Date TBD',
    format: 'Hybrid',
    level: 'Beginner',
    desc: 'Build with Qiskit — hands-on workshops, guest talks, and the first hackathon build session.',
    events: [
      {
        time: '9:30 – 10:15 AM',
        title: 'Workshop 1: Quantum Computing Foundations & Qubits',
        desc: 'Superposition, entanglement, and the building blocks of quantum information.',
        speaker: 'TBD',
      },
      {
        time: '10:15 – 11:15 AM',
        title: 'Workshop 2: Your First Quantum Circuits with Qiskit',
        desc: 'Build, visualize, and run circuits on simulators and real hardware.',
        speaker: 'TBD',
      },
      {
        time: '11:15 AM – 12:00 PM',
        title: 'Guest Talk: Quantum Hardware & Architecture',
        desc: 'Deep dive into trapped-ion computing, superconducting qubits, or quantum networking.',
        speaker: 'Duke Quantum Center (TBD)',
      },
      {
        time: '1:00 – 1:45 PM',
        title: 'Workshop 3: Quantum Algorithms (Grover, QAOA, Simulation)',
        desc: 'Implement real quantum algorithms step by step.',
        speaker: 'TBD',
      },
      {
        time: '1:45 – 2:15 PM',
        title: 'Hackathon Technical Briefing & Rules',
        desc: 'Submission format, judging rubric, and mentor availability.',
        speaker: 'Organizing Team',
      },
      {
        time: '2:15 – 5:30 PM',
        title: 'Hackathon Build Session I',
        desc: 'Teams start building their projects with mentors available for support.',
        speaker: 'All Mentors',
      },
    ],
  },
  {
    day: 'Day 3 — Hack, Present & Connect',
    date: 'Fall 2026 · Date TBD',
    format: 'In-Person',
    level: 'Intermediate',
    desc: 'Showcase the Future — final hackathon build, project presentations, judging, and awards.',
    events: [
      {
        time: '10:00 AM – 12:00 PM',
        title: 'Hackathon Build Session II',
        desc: 'Final push to complete your quantum project.',
        speaker: 'All Mentors',
      },
      {
        time: '1:00 – 2:00 PM',
        title: 'Career & Research Lightning Talks',
        desc: 'Quick talks from students, postdocs, and invited guests on quantum research.',
        speaker: 'Various Speakers',
      },
      {
        time: '2:00 – 3:00 PM',
        title: 'Final Project Preparation & Submission',
        desc: 'Polish your presentation and submit your project.',
        speaker: 'Organizing Team',
      },
      {
        time: '3:00 – 4:15 PM',
        title: 'Team Project Presentations & Judging',
        desc: 'Teams present their work to judges and the audience.',
        speaker: 'Judges Panel',
      },
      {
        time: '4:15 – 4:40 PM',
        title: 'Awards Ceremony',
        desc: 'Best Technical, Best Beginner, Most Creative Use of Qiskit, and People\'s Choice.',
        speaker: 'Organizing Team',
      },
      {
        time: '4:40 – 5:00 PM',
        title: 'Closing Keynote & Group Photo',
        desc: 'Acknowledgments, next steps, and celebrating our quantum community.',
        speaker: 'Godwin Micah Smart & Emmanuel Umukoro',
      },
    ],
  },
]

const PREREQS = [
  { icon: Code2, title: 'Programming', desc: 'Basic Python is helpful but not required.' },
  { icon: Cpu, title: 'Hardware', desc: 'A laptop; we run everything in the cloud.' },
  { icon: Wrench, title: 'Software', desc: 'Just a browser — no local install needed.' },
  { icon: Heart, title: 'Enthusiasm', desc: 'Curiosity is the only real prerequisite.' },
]

function LevelBadge({ level }: { level: Level }) {
  return (
    <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', LEVEL_STYLES[level])}>
      {level}
    </span>
  )
}

function SubEvent({
  e,
}: {
  e: { time: string; title: string; desc: string; speaker: string }
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-cyan">
        <Clock className="size-4" />
        {e.time}
      </div>
      <h5 className="mt-2 font-display font-bold text-navy">{e.title}</h5>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{e.desc}</p>
      <div className="mt-3 flex items-center gap-2 text-sm text-navy">
        <User className="size-4 text-gold" />
        <span className="font-medium">{e.speaker}</span>
      </div>
    </div>
  )
}

export function Schedule() {
  return (
    <section id="schedule" className="scroll-mt-20 bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-cyan">
            Schedule
          </p>
          <h2 className="mt-3 text-balance font-display text-2xl font-bold text-navy sm:text-4xl">
            Three days, one quantum leap
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Tap any day to explore its sessions and speakers. Final dates will be
            confirmed closer to the event.
          </p>
        </Reveal>

        <div id="speakers" className="scroll-mt-20" />

        {/* Mobile-first: accordion of days; expanded two-column feel on desktop via wide content */}
        <Reveal className="mt-10">
          <Accordion
            defaultValue={['Day 1 — Quantum Foundations & Community Launch']}
            className="flex flex-col gap-4"
          >
            {DAYS.map((d) => (
              <AccordionItem
                key={d.day}
                value={d.day}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg"
              >
                <AccordionTrigger className="px-5 py-5 text-left hover:no-underline sm:px-6">
                  <div className="flex flex-1 flex-col gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-navy px-3 py-1 text-xs font-semibold text-cream">
                        {d.format}
                      </span>
                      <LevelBadge level={d.level} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-navy sm:text-xl">
                        {d.day}
                      </h3>
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Calendar className="size-4" />
                        {d.date}
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{d.desc}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-5 pb-5 sm:px-6">
                  <div className="grid grid-cols-1 gap-3 border-t border-border pt-4 lg:grid-cols-2">
                    {d.events.map((e) => (
                      <SubEvent key={e.title} e={e} />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        {/* Venue + Prerequisites */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Reveal className="lg:col-span-1">
            <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-lg">
              <span className="flex size-11 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                <MapPin className="size-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-navy">Venue</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                North Carolina A&amp;T State University
                <br />
                Greensboro, NC — exact building TBD.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Can&apos;t make it in person? Every session streams live for virtual
                attendees.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="h-full rounded-2xl bg-gradient-to-br from-[#4c1d95] via-[#6d28d9] to-[#1b365d] p-6 shadow-xl sm:p-8">
              <h3 className="font-display text-lg font-bold text-cream sm:text-xl">
                Prerequisites
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/80">
                Come as you are — here&apos;s all you really need.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                {PREREQS.map((p) => (
                  <div
                    key={p.title}
                    className="rounded-xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl"
                  >
                    <span className="flex size-9 items-center justify-center rounded-lg bg-white/15 text-cream">
                      <p.icon className="size-5" />
                    </span>
                    <h4 className="mt-3 font-display text-sm font-bold text-cream">
                      {p.title}
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-cream/70">{p.desc}</p>
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
