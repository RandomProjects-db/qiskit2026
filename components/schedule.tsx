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
    day: 'Day 1 — Discover Quantum',
    date: 'Thursday, Nov. 12, 2026 · 4:00 PM',
    format: 'Hybrid',
    level: 'All Levels',
    desc: 'Opening day — welcome, featured talks from IBM and research leaders, and networking.',
    events: [
      {
        time: '4:00 – 4:30 PM',
        title: 'Registration',
        desc: 'Check in, meet fellow attendees, and get settled before we begin.',
        speaker: 'Organizing Team',
      },
      {
        time: '4:30 – 4:40 PM',
        title: 'Event Opening Speech',
        desc: 'Welcome and overview of the three-day program.',
        speaker: 'Organizing Team',
      },
      {
        time: '4:40 – 5:20 PM',
        title: 'Featured Talk',
        desc: 'Quantum research and education.',
        speaker: 'Dr. Raymond Samuel',
      },
      {
        time: '5:20 – 6:00 PM',
        title: 'Featured Talk — IBM Quantum',
        desc: 'Introduction to quantum computing, the IBM Quantum Platform, and opportunities for students.',
        speaker: 'Dr. Carolyn Hartley (IBM)',
      },
      {
        time: '6:00 – 6:20 PM',
        title: 'Networking & Photo Session',
        desc: 'Connect with speakers and fellow attendees.',
        speaker: 'All',
      },
      {
        time: '6:20 – 7:00 PM',
        title: 'Featured Talk (Online)',
        desc: 'Quantum optics, quantum key distribution, and careers in the quantum industry.',
        speaker: 'Dr. Katanya B. Kuntz (online)',
      },
    ],
  },
  {
    day: 'Day 2 — Build with Qiskit',
    date: 'Friday, Nov. 13, 2026 · 4:00 PM',
    format: 'Hybrid',
    level: 'Beginner',
    desc: 'Talks and the hackathon orientation — get ready to build.',
    events: [
      {
        time: '4:00 – 4:30 PM',
        title: 'Registration',
        desc: 'Check in and get settled.',
        speaker: 'Organizing Team',
      },
      {
        time: '4:30 – 4:40 PM',
        title: 'Event Opening Speech',
        desc: 'Welcome and overview of the day.',
        speaker: 'Organizing Team',
      },
      {
        time: '4:40 – 5:20 PM',
        title: 'Featured Talk',
        desc: 'To be announced.',
        speaker: 'TBD',
      },
      {
        time: '5:20 – 6:00 PM',
        title: 'Featured Talk',
        desc: 'Quantum AI: where quantum computing meets machine learning.',
        speaker: 'Dr. Olusola T. Odeyomi',
      },
      {
        time: '6:00 – 6:20 PM',
        title: 'Networking & Photo Session',
        desc: 'Connect with speakers and fellow attendees.',
        speaker: 'All',
      },
      {
        time: '6:20 – 7:00 PM',
        title: 'Hackathon Orientation',
        desc: 'Hackathon rules, challenges, platform walkthrough, and team formation.',
        speaker: 'Organizing Team',
      },
    ],
  },
  {
    day: 'Day 3 — Hack, Present & Connect',
    date: 'Saturday, Nov. 14, 2026 · 10:00 AM',
    format: 'In-Person',
    level: 'Intermediate',
    desc: 'Final talks, hackathon presentations, judging, a panel session, and awards.',
    events: [
      {
        time: '10:00 – 10:30 AM',
        title: 'Registration',
        desc: 'Check in for the final day.',
        speaker: 'Organizing Team',
      },
      {
        time: '10:30 – 10:40 AM',
        title: 'Event Opening Speech',
        desc: 'Welcome and overview of the day.',
        speaker: 'Organizing Team',
      },
      {
        time: '10:40 – 11:20 AM',
        title: 'Featured Talk',
        desc: 'A Quantum Advantage Computer as an NSF Funded National Resource.',
        speaker: 'Dr. Rachel Noek',
      },
      {
        time: '11:20 AM – 12:00 PM',
        title: 'Featured Talk',
        desc: 'Quantum-safe cryptography at the intersection of quantum computing and number theory.',
        speaker: 'Dr. Krystal Maughan',
      },
      {
        time: '12:00 – 12:30 PM',
        title: 'Networking & Lunch',
        desc: 'Boxed lunch and conversation with speakers and mentors.',
        speaker: 'All',
      },
      {
        time: '12:30 – 1:30 PM',
        title: 'Featured Sessions',
        desc: 'To be announced.',
        speaker: 'TBD',
      },
      {
        time: '1:30 – 2:30 PM',
        title: 'Hackathon Presentations',
        desc: 'Teams present their quantum projects to judges and the audience.',
        speaker: 'Hackathon Teams',
      },
      {
        time: '2:30 – 3:10 PM',
        title: 'Panel Session with Speakers',
        desc: 'Q&A and discussion with our speakers while the judges deliberate.',
        speaker: 'Speaker Panel',
      },
      {
        time: '3:30 PM – End',
        title: 'Awards Ceremony',
        desc: 'Recognition and awards for the winning hackathon teams.',
        speaker: 'Organizing Team',
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
    <div className="forge-card p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-cyan">
        <Clock className="size-4" />
        {e.time}
      </div>
      <h5 className="mt-2 font-display font-bold text-white">{e.title}</h5>
      <p className="mt-1 text-sm leading-relaxed text-white/85">{e.desc}</p>
      <div className="mt-3 flex items-center gap-2 text-sm text-white">
        <User className="size-4 text-gold" />
        <span className="font-medium">{e.speaker}</span>
      </div>
    </div>
  )
}

export function Schedule() {
  return (
    <section id="schedule" className="scroll-mt-20 bg-[#060914]/25 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-cyan">
            Schedule
          </p>
          <h2 className="mt-3 text-balance font-display text-2xl font-bold text-white sm:text-4xl">
            Three days, one quantum leap
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-white/85">
            Tap any day to explore its sessions and speakers. Final dates will be
            confirmed closer to the event.
          </p>
        </Reveal>

        {/* Mobile-first: accordion of days; expanded two-column feel on desktop via wide content */}
        <Reveal className="mt-10">
          <Accordion
            className="flex flex-col gap-4"
          >
            {DAYS.map((d) => (
              <AccordionItem
                key={d.day}
                value={d.day}
                className="forge-card overflow-hidden"
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
                      <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                        {d.day}
                      </h3>
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-white/85">
                        <Calendar className="size-4" />
                        {d.date}
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed text-white/85">{d.desc}</p>
                  </div>
                  {/* Expand / Collapse hint next to the chevron */}
                  <span className="ml-auto mr-1 self-center text-xs font-semibold uppercase tracking-wide text-[#FF4D8F]">
                    <span className="group-aria-expanded/accordion-trigger:hidden">Expand</span>
                    <span className="hidden group-aria-expanded/accordion-trigger:inline">Collapse</span>
                  </span>
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
            <div className="forge-card flex h-full flex-col p-6">
              <span className="flex size-11 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
                <MapPin className="size-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-white">Venue</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/85">
                Joint School of Nanoscience and Nanoengineering (JSNN)
                <br />
                2907 East Gate City Blvd, Greensboro, NC 27401
              </p>

              {/* Embedded map — OpenStreetMap, no API key / dependency needed.
                  JSNN exact building coordinates: 36.056860, -79.744424. */}
              <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
                <iframe
                  title="JSNN location map"
                  className="h-44 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-79.7544%2C36.0519%2C-79.7344%2C36.0619&layer=mapnik&marker=36.056860%2C-79.744424"
                />
              </div>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=36.056860264209135,-79.74442397439853"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF4D8F] transition-colors hover:text-[#FF006B]"
              >
                <MapPin className="size-4" />
                Get directions
              </a>

              <p className="mt-3 text-sm leading-relaxed text-white/85">
                Can&apos;t make it in person? Every session streams live for virtual
                attendees.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="h-full rounded-2xl bg-gradient-to-br from-[#4c1d95]/40 via-[#6d28d9]/40 to-[#1b365d]/40 p-6 shadow-xl sm:p-8">
              <h3 className="font-display text-lg font-bold text-cream sm:text-xl">
                Prerequisites
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/85">
                Come as you are — here&apos;s all you really need.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                {PREREQS.map((p) => (
                  <div
                    key={p.title}
                    className="rounded-xl border border-white/15 bg-white/5 p-4"
                  >
                    <span className="flex size-9 items-center justify-center rounded-lg bg-white/15 text-cream">
                      <p.icon className="size-5" />
                    </span>
                    <h4 className="mt-3 font-display text-sm font-bold text-cream">
                      {p.title}
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-cream/85">{p.desc}</p>
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
