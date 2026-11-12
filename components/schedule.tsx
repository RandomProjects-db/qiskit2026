'use client'

import { Calendar, MapPin, Clock, User } from 'lucide-react'
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
        speaker: 'Dr. Kristen Rhinehardt and Dr. Marwan Bikdash',
      },
      {
        time: '4:40 – 5:20 PM',
        title: 'Featured Talk',
        desc: 'The importance of quantum computing and its role in science and engineering.',
        speaker: 'Dr. Quinton Rice',
      },
      {
        time: '5:20 – 6:00 PM',
        title: 'Qiskit 101',
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
        title: 'Registration & Hackathon Meetup',
        desc: 'Check in, register for the hackathon, and meet potential teammates.',
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
        desc: 'Quantum AI: where quantum computing meets machine learning.',
        speaker: 'Dr. Olusola T. Odeyomi',
      },
      {
        time: '5:20 – 5:40 PM',
        title: 'Featured Talk',
        desc: 'Quantum machine learning.',
        speaker: 'Temitope Odeyomi Adeniyi',
      },
      {
        time: '5:40 – 6:00 PM',
        title: 'Featured Talk',
        desc: 'The physics behind quantum computing for non-physicists, and photonic quantum entanglement coupled to an optical resonator.',
        speaker: 'Dr. Patrick Flanigan, Department of Maths and Physics',
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
        desc: 'Set up your qBraid account and environment, upload your notebooks, and get the challenges. Team formation too.',
        speaker: 'Organizing Team (Fahed, online)',
      },
    ],
  },
  {
    day: 'Day 3 — Hack, Present & Connect',
    date: 'Saturday, Nov. 14, 2026 · 10:00 AM',
    format: 'In-Person',
    level: 'Intermediate',
    desc: 'Final talks, hackathon presentations, judging, a closing session, and awards.',
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
        time: '10:40 – 11:15 AM',
        title: 'Featured Talk',
        desc: 'A Quantum Advantage Computer as an NSF Funded National Resource.',
        speaker: 'Dr. Rachel Noek',
      },
      {
        time: '11:15 – 11:50 AM',
        title: 'Featured Talk',
        desc: 'Quantum-safe cryptography at the intersection of quantum computing and number theory.',
        speaker: 'Dr. Krystal Maughan (online)',
      },
      {
        time: '11:50 AM – 12:25 PM',
        title: 'Featured Talk',
        desc: 'Qubit control research at NCAT: custom hardware modules for precision timing of laser pulses, using reconfigurable computing.',
        speaker: 'Dr. Christopher Doss',
      },
      {
        time: '12:30 – 1:15 PM',
        title: 'Networking & Lunch',
        desc: 'Boxed lunch and conversation with speakers and mentors.',
        speaker: 'All',
      },
      {
        time: '1:15 – 2:15 PM',
        title: 'Hackathon Presentations',
        desc: 'Teams present their quantum projects to judges and the audience.',
        speaker: 'Hackathon Teams',
      },
      {
        time: '2:15 – 2:50 PM',
        title: 'Closing Session',
        desc: 'Something from Nothing: Amplifying the Quantum Vacuum with Two Trapped Ions.',
        speaker: 'Dr. Lu Qi (Duke Quantum Center)',
      },
      {
        time: '2:50 PM – End',
        title: 'Awards & Photo Session',
        desc: 'Recognition and awards for the winning hackathon teams, followed by a photo session.',
        speaker: 'Organizing Team',
      },
    ],
  },
]

type PrerequisiteIconKind = 'programming' | 'hardware' | 'software' | 'enthusiasm'

const PREREQS: {
  icon: PrerequisiteIconKind
  title: string
  desc: string
  accent: string
}[] = [
  {
    icon: 'programming',
    title: 'Programming',
    desc: 'Basic Python is helpful but not required.',
    accent: '#00E5FF',
  },
  {
    icon: 'hardware',
    title: 'Hardware',
    desc: 'A laptop; we run everything in the cloud.',
    accent: '#FDB927',
  },
  {
    icon: 'software',
    title: 'Software',
    desc: 'Just a browser. No local install needed.',
    accent: '#FF006B',
  },
  {
    icon: 'enthusiasm',
    title: 'Enthusiasm',
    desc: 'Curiosity is the only real prerequisite.',
    accent: '#00E5FF',
  },
]

function PrerequisiteIcon({ kind }: { kind: PrerequisiteIconKind }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 1.6,
  }

  switch (kind) {
    case 'programming':
      return (
        <svg className="size-7" viewBox="0 0 32 32" aria-hidden="true" {...common}>
          <path d="m12 9-6 7 6 7M20 9l6 7-6 7" />
          <path d="M16 6v4m0 12v4M4 16h4m16 0h4" />
          <circle cx="16" cy="16" r="3" />
          <circle cx="16" cy="4" r="1" fill="currentColor" stroke="none" />
          <circle cx="16" cy="28" r="1" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'hardware':
      return (
        <svg className="size-7" viewBox="0 0 32 32" aria-hidden="true" {...common}>
          <rect x="5" y="4" width="22" height="17" rx="2" />
          <path d="M3 25h26l-3-4H6l-3 4Z" />
          <rect x="12" y="9" width="8" height="7" rx="1" />
          <path d="M14 12.5h4M16 10.5v4" />
        </svg>
      )
    case 'software':
      return (
        <svg className="size-7" viewBox="0 0 32 32" aria-hidden="true" {...common}>
          <rect x="4" y="5" width="24" height="22" rx="2" />
          <path d="M4 11h24M8 8h.01M11 8h.01" />
          <path d="m10 17 3 2.5-3 2.5m6 0h6" />
        </svg>
      )
    case 'enthusiasm':
      return (
        <svg className="size-7" viewBox="0 0 32 32" aria-hidden="true" {...common}>
          <ellipse cx="16" cy="16" rx="12" ry="5" transform="rotate(-35 16 16)" />
          <ellipse cx="16" cy="16" rx="12" ry="5" transform="rotate(35 16 16)" />
          <circle cx="16" cy="16" r="2.5" fill="currentColor" stroke="none" />
          <path d="M25 5v5m-2.5-2.5h5" />
        </svg>
      )
    default:
      return null
  }
}

function LevelBadge({ level }: { level: Level }) {
  return (
    <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', LEVEL_STYLES[level])}>
      {level}
    </span>
  )
}

// Maps a schedule speaker label to that speaker's headshot (shown as a small
// circle next to their name). Only named speakers with photos appear here;
// everyone else (Organizing Team, TBD, etc.) falls back to the user icon.
const SPEAKER_PHOTOS: { match: string; photo: string }[] = [
  { match: 'Carolyn Hartley', photo: '/speaker-carolyn.jpg' },
  { match: 'Rachel Noek', photo: '/speaker-rachel.jpg' },
  { match: 'Katanya', photo: '/speaker-katanya.png' },
  { match: 'Olusola', photo: '/speaker-olusola.png' },
  { match: 'Krystal', photo: '/speaker-krystal.png' },
  { match: 'Temitope', photo: '/team-temitope.jpg' },
  { match: 'Quinton Rice', photo: '/speaker-rice.png' },
  { match: 'Flanigan', photo: '/speaker-flanigan.jpg' },
  { match: 'Doss', photo: '/speaker-doss.png' },
  { match: 'Lu Qi', photo: '/speaker-luqi.jpg' },
]

function speakerPhoto(speaker: string): string | null {
  const hit = SPEAKER_PHOTOS.find((s) => speaker.includes(s.match))
  return hit ? hit.photo : null
}

function SubEvent({
  e,
}: {
  e: { time: string; title: string; desc: string; speaker: string }
}) {
  const photo = speakerPhoto(e.speaker)
  return (
    <div className="forge-card p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-cyan">
        <Clock className="size-4" />
        {e.time}
      </div>
      <h5 className="mt-2 font-display font-bold text-white">{e.title}</h5>
      <p className="mt-1 text-sm leading-relaxed text-white/85">{e.desc}</p>
      <div className="mt-3 flex items-center gap-2.5 text-sm text-white">
        {photo ? (
          <img
            src={photo}
            alt={e.speaker}
            loading="lazy"
            className="size-11 shrink-0 rounded-full border border-white/20 object-cover"
          />
        ) : (
          <User className="size-4 text-gold" />
        )}
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
            Tap any day to explore its sessions and speakers.
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
                      <SubEvent key={`${e.time}-${e.title}`} e={e} />
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
            <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#060914]/60 p-6 shadow-xl backdrop-blur-xl sm:p-8">
              <span aria-hidden="true" className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#00E5FF]/70 to-transparent" />
              <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                Prerequisites
              </h3>
              <p className="mt-2 text-base leading-relaxed text-white/80">
                Come as you are. Here&apos;s all you really need.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {PREREQS.map((p) => (
                  <article
                    key={p.title}
                    className="rounded-xl border border-white/10 bg-white/[0.035] p-4 transition-colors hover:border-white/20 sm:p-5"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className="flex size-12 shrink-0 items-center justify-center rounded-xl border"
                        style={{
                          color: p.accent,
                          borderColor: `${p.accent}45`,
                          backgroundColor: `${p.accent}12`,
                        }}
                      >
                        <PrerequisiteIcon kind={p.icon} />
                      </span>
                      <div className="pt-0.5">
                        <h4 className="font-display text-base font-bold text-white sm:text-lg">
                          {p.title}
                        </h4>
                        <p className="mt-1 text-sm leading-relaxed text-white/80 sm:text-base">
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
