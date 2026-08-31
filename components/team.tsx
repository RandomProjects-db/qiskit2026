'use client'

import { Mail } from 'lucide-react'
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
}

const TEAM: Organizer[] = [
  {
    name: 'Godwin Micah Smart',
    title: 'Lead Organizer',
    affiliation: 'Computational Data Science & Engineering, NC A&T',
    bio: 'Leading the team and coordinating with IBM, faculty, and campus partners to bring quantum computing to NC A&T.',
    photo: '/team-godwin.jpg',
  },
  {
    name: 'Emmanuel Umukoro',
    title: 'Co-Organizer',
    affiliation: 'Computational Data Science & Engineering, NC A&T',
    bio: 'Driving speaker outreach, program design, and partnership development. Connected the team with Duke Quantum Center.',
    photo: '/team-emmanuel.png',
  },
  {
    name: 'Anika Akther',
    title: 'Co-Organizer',
    affiliation: 'Industrial & Systems Engineering, NC A&T',
    bio: 'Organizer and lead for the technical workshops.',
    photo: '/team-anika.jpg',
  },
  {
    name: 'Timilehin Gloria Adedeji',
    title: 'Co-Organizer',
    affiliation: 'Industrial & Systems Engineering, NC A&T',
    bio: 'Supporting event planning, coordination, and engagement efforts to help bring quantum computing education and opportunities to the NC A&T community.',
    photo: '/team-timilehin.jpg',
  },
  {
    name: 'Temitope Odeyomi Adeniyi',
    title: 'Co-Organizer & Advisor',
    affiliation: 'Cleveland State University',
    bio: 'Qiskit developer with prior Fall Fest organizing experience. Advising on hackathon structure and event logistics.',
  },
  {
    name: 'Fahed Daibes',
    title: 'Co-Organizer · Web & Hackathon',
    affiliation: 'Lebanese American University',
    bio: 'Qiskit developer handling the event website and technical platform decisions.',
    photo: '/team-fahed.png',
  },
  {
    name: 'Ayobami Taiwo',
    title: 'Co-Organizer',
    affiliation: 'Computational Data Science & Engineering, NC A&T',
    bio: 'Supporting event planning and community outreach to engage the NC A&T student body.',
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

export function Team() {
  return (
    <section id="team" className="scroll-mt-20 bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-cyan">
            Organizing Team
          </p>
          <h2 className="mt-3 text-balance font-display text-2xl font-bold text-navy sm:text-4xl">
            The Aggies making it happen
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            A dedicated crew of students and faculty bringing quantum computing to campus.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={(i % 3) * 0.08}>
              <article className="group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#1B365D]/5 to-[#6929C4]/5 p-6 text-center shadow-lg transition-all duration-300 hover:border-[#FF006B]/30 hover:shadow-[0_0_30px_-5px_rgba(255,0,107,0.15)]">
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
                <div className="mt-5 flex items-center gap-3">
                  <a
                    href={`mailto:${m.name.split(' ')[0].toLowerCase()}@aggies.ncat.edu`}
                    aria-label={`Email ${m.name}`}
                    className="inline-flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-[#6929C4]/10 to-[#6929C4]/5 text-[#6929C4] transition-all duration-200 hover:from-[#6929C4] hover:to-[#4C1D95] hover:text-white hover:shadow-lg hover:shadow-[#6929C4]/25"
                  >
                    <Mail className="size-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${m.name} on LinkedIn`}
                    className="inline-flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0084BD]/10 to-[#0084BD]/5 text-[#0084BD] transition-all duration-200 hover:from-[#0084BD] hover:to-[#005F87] hover:text-white hover:shadow-lg hover:shadow-[#0084BD]/25"
                  >
                    <LinkedInIcon className="size-4" />
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${m.name} on GitHub`}
                    className="inline-flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-[#FF006B]/10 to-[#FF006B]/5 text-[#FF006B] transition-all duration-200 hover:from-[#FF006B] hover:to-[#C4004E] hover:text-white hover:shadow-lg hover:shadow-[#FF006B]/25"
                  >
                    <GitHubIcon className="size-4" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
