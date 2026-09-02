'use client'

import { useEffect, useRef, useState } from 'react'
import { Mail, X } from 'lucide-react'
import { Reveal } from '@/components/reveal'

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

type Organizer = {
  name: string
  title: string
  affiliation: string
  bio: string
  photo?: string
  linkedin?: string
  github?: string
  email?: string
}

const TEAM: Organizer[] = [
  {
    name: 'Godwin Micah Smart',
    title: 'Lead Organizer',
    affiliation: 'Physicist, Computational Data Science & Engineering, NC A&T',
    bio: 'Leading the planning and coordination of Qiskit Fall Fest 2026, working with IBM Quantum/Qiskit, faculty, speakers, and campus partners to expand quantum computing education and opportunities at NC A&T.',
    photo: '/team-godwin.jpg',
    linkedin: 'https://www.linkedin.com/in/godwinmicahsmart/',
  },
  {
    name: 'Emmanuel E. Umukoro',
    title: 'Co-Organizer',
    affiliation: 'Physics, NCCU · Electrical & Computer Engineering, Duke University',
    bio: 'Driving speaker outreach, program design, and partnership development for Qiskit Fall Fest 2026.',
    photo: '/team-emmanuel.png',
    linkedin: 'https://www.linkedin.com/in/emmanuel-umukoro-415373127',
  },
  {
    name: 'Fahed Daibes',
    title: 'Hackathon Coordinator · Web',
    affiliation: 'Lebanese American University',
    bio: 'Qiskit developer in charge of the hackathon, and handling the event website and technical platform decisions.',
    photo: '/team-fahed.png',
    linkedin: 'https://www.linkedin.com/in/fahed-daibes',
  },
  {
    name: 'Temitope Odeyomi Adeniyi',
    title: 'Co-Organizer & Advisor',
    affiliation: 'Cleveland State University',
    bio: 'Qiskit developer with prior Fall Fest organizing experience. Advising on hackathon structure and event logistics.',
  },
  {
    name: 'Anika Akther',
    title: 'Event Operations & Participant Experience',
    affiliation: 'Industrial & Systems Engineering, NC A&T',
    bio: 'Supports participant registration, attendee guidance, venue navigation, session coordination, guest assistance, and general on-site logistics throughout the three-day event.',
    photo: '/team-anika.jpg',
    linkedin: 'https://www.linkedin.com/in/anika-akther/',
  },
  {
    name: 'Timilehin Gloria Adedeji',
    title: 'Event Operations & Participant Experience',
    affiliation: 'Industrial & Systems Engineering, NC A&T',
    bio: 'Supports volunteer recruiting, participant registration, attendee guidance, venue navigation, session coordination, guest assistance, and general on-site logistics throughout the three-day event.',
    photo: '/team-timilehin.jpg',
    linkedin: 'https://www.linkedin.com/in/timilehin-gloria-adedeji-94a609198/',
  },
  {
    name: 'Biswas Asha Rahman',
    title: 'Event Operations & Participant Experience',
    affiliation: 'Industrial & Systems Engineering, NC A&T',
    bio: 'Supports participant registration, attendee guidance, venue navigation, session coordination, guest assistance, and general on-site logistics throughout the three-day event.',
  },
  {
    name: 'Oluwatobi Aiyewunmi',
    title: 'Co-Organizer',
    affiliation: 'Computational Data Science & Engineering, NC A&T',
    bio: 'Contributing to event coordination, volunteer management, and day-of operations.',
  },
  {
    name: 'Precious Anavberokhai',
    title: 'Co-Organizer',
    affiliation: 'Computational Data Science & Engineering, NC A&T',
    bio: 'Assisting with publicity, registration logistics, and participant engagement.',
  },
]

function avatarUrl(name: string) {
  const encoded = encodeURIComponent(name)
  return `https://ui-avatars.com/api/?name=${encoded}&background=1B365D&color=E3E0D2&size=160&bold=true&format=png`
}

function SocialLinks({ member, size = 'sm' }: { member: Organizer; size?: 'sm' | 'lg' }) {
  const dim = size === 'lg' ? 'size-11' : 'size-10'
  const icon = size === 'lg' ? 'size-5' : 'size-4'
  const hasAny = member.email || member.linkedin || member.github
  if (!hasAny) return null
  return (
    <div className="flex items-center gap-3">
      {member.email && (
        <a
          href={`mailto:${member.email}`}
          aria-label={`Email ${member.name}`}
          onClick={(e) => e.stopPropagation()}
          className={`inline-flex ${dim} items-center justify-center rounded-full bg-gradient-to-br from-[#6929C4]/10 to-[#6929C4]/5 text-[#6929C4] transition-all duration-200 hover:from-[#6929C4] hover:to-[#4C1D95] hover:text-white hover:shadow-lg hover:shadow-[#6929C4]/25`}
        >
          <Mail className={icon} />
        </a>
      )}
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on LinkedIn`}
          onClick={(e) => e.stopPropagation()}
          className={`inline-flex ${dim} items-center justify-center rounded-full bg-gradient-to-br from-[#0084BD]/10 to-[#0084BD]/5 text-[#0084BD] transition-all duration-200 hover:from-[#0084BD] hover:to-[#005F87] hover:text-white hover:shadow-lg hover:shadow-[#0084BD]/25`}
        >
          <LinkedInIcon className={icon} />
        </a>
      )}
      {member.github && (
        <a
          href={member.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${member.name} on GitHub`}
          onClick={(e) => e.stopPropagation()}
          className={`inline-flex ${dim} items-center justify-center rounded-full bg-gradient-to-br from-[#FF006B]/10 to-[#FF006B]/5 text-[#FF006B] transition-all duration-200 hover:from-[#FF006B] hover:to-[#C4004E] hover:text-white hover:shadow-lg hover:shadow-[#FF006B]/25`}
        >
          <GitHubIcon className={icon} />
        </a>
      )}
    </div>
  )
}

function MemberModal({ member, onClose }: { member: Organizer; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    // Lock body scroll while the modal is open
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // Move focus to the close button for keyboard/screen-reader users
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="member-modal-name"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
      style={{ backgroundColor: 'rgba(15, 20, 40, 0.7)' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#1B365D] to-[#4C1D95] p-8 text-center shadow-2xl"
      >
        {/* Close button */}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full bg-white/10 text-cream/80 transition-colors hover:bg-white/20 hover:text-white"
        >
          <X className="size-5" />
        </button>

        {/* Decorative glow */}
        <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-gradient-to-br from-[#6929C4]/30 to-transparent blur-2xl" />
        <div className="pointer-events-none absolute -bottom-8 -left-8 size-32 rounded-full bg-gradient-to-tr from-[#FF006B]/30 to-transparent blur-2xl" />

        {/* Large photo */}
        <div className="relative mx-auto mt-2 w-fit">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#6929C4] via-[#FF006B] to-[#0084BD] opacity-60 blur-sm" />
          <img
            src={member.photo || avatarUrl(member.name)}
            alt={member.name}
            width={160}
            height={160}
            className="relative size-40 rounded-full border-2 border-white/20 object-cover"
          />
        </div>

        <h3 id="member-modal-name" className="mt-5 font-display text-2xl font-bold text-cream">
          {member.name}
        </h3>
        <p className="mt-1 text-sm font-semibold text-[#FF006B]">{member.title}</p>
        <p className="mt-1 text-xs text-cream/60">{member.affiliation}</p>
        <p className="mt-4 text-sm leading-relaxed text-cream/80">{member.bio}</p>

        <div className="mt-6 flex justify-center">
          <SocialLinks member={member} size="lg" />
        </div>
      </div>
    </div>
  )
}

export function Team() {
  const [selected, setSelected] = useState<Organizer | null>(null)

  return (
    <section id="team" className="scroll-mt-20 bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-cyan">
            The Team
          </p>
          <h2 className="mt-3 text-balance font-display text-2xl font-bold text-navy sm:text-4xl">
            The people making it happen
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            A dedicated crew of students, researchers, and mentors across institutions bringing quantum computing to campus.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={(i % 3) * 0.08}>
              <article
                onClick={() => setSelected(m)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelected(m)
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${m.name}`}
                className="group relative flex h-full cursor-pointer flex-col items-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#1B365D]/5 to-[#6929C4]/5 p-6 text-center shadow-lg transition-all duration-300 hover:border-[#FF006B]/30 hover:shadow-[0_0_30px_-5px_rgba(255,0,107,0.15)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF006B]/50"
              >
                {/* Quantum circuit decoration */}
                <div className="absolute -right-4 -top-4 size-24 rounded-full bg-gradient-to-br from-[#6929C4]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute -bottom-2 -left-2 size-16 rounded-full bg-gradient-to-tr from-[#FF006B]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Avatar with quantum ring */}
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#6929C4] via-[#FF006B] to-[#0084BD] opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-60" />
                  <img
                    src={m.photo || avatarUrl(m.name)}
                    alt={`${m.name}`}
                    width={96}
                    height={96}
                    loading="lazy"
                    className="relative size-24 rounded-full border-2 border-white/20 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <h3 className="mt-4 font-display text-lg font-bold text-navy">{m.name}</h3>
                <p className="mt-0.5 text-sm font-semibold text-[#FF006B]">{m.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{m.affiliation}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>

                {/* Social links */}
                <div className="mt-5">
                  <SocialLinks member={m} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {selected && <MemberModal member={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
