'use client'

import { Reveal } from '@/components/reveal'

const FEATURES = [
  {
    title: 'Hands-on Qiskit',
    desc: 'Hands-on, browser-based Qiskit labs: write and run real quantum circuits.',
    accent: '#00E5FF',
  },
  {
    title: 'Community',
    desc: 'Meet students, faculty, and researchers exploring quantum.',
    accent: '#FDB927',
  },
  {
    title: 'Competition',
    desc: 'Team up for a friendly quantum coding challenge, with hackathon recognition and awards.',
    accent: '#FF006B',
  },
  {
    title: 'All Levels',
    desc: 'Curated tracks for beginners through advanced builders.',
    accent: '#00E5FF',
  },
]

const ACCOMPLISH = [
  {
    title: 'Workshops',
    desc: 'Guided labs walk you from your first qubit to multi-gate algorithms using Qiskit.',
    accent: '#00E5FF',
  },
  {
    title: 'Networking',
    desc: 'Connect with the quantum community: peers, mentors, and IBM Quantum advocates.',
    accent: '#FDB927',
  },
  {
    title: 'Competition',
    desc: 'Put your new skills to the test in a timed challenge, with hackathon recognition and awards.',
    accent: '#FF006B',
  },
]

const WHY = [
  {
    title: 'The Next Frontier',
    desc: 'Quantum computing is reshaping cryptography, chemistry, and optimization.',
    accent: '#00E5FF',
  },
  {
    title: 'Career Ready',
    desc: 'Early quantum skills set you apart as the industry scales rapidly.',
    accent: '#FDB927',
  },
  {
    title: 'Real Impact',
    desc: 'Tackle problems classical computers simply cannot solve efficiently.',
    accent: '#FF006B',
  },
]

const PARTNERS = [
  { name: 'IBM Quantum', href: 'https://quantum.ibm.com', accent: '#00E5FF' },
  { name: 'Qiskit', href: 'https://qiskit.org', accent: '#FF006B' },
  { name: 'NC A&T', href: 'https://www.ncat.edu', accent: '#FDB927' },
  { name: 'JSNN', href: 'https://jsnn.ncat.uncg.edu/', accent: '#00E5FF' },
  { name: 'College of Engineering', href: 'https://www.ncat.edu/coe/index.php', accent: '#FF006B' },
  { name: 'Computational Data Science & Engineering', href: 'https://www.ncat.edu/coe/departments/cdse/index.php', accent: '#FDB927' },
]

export function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-[#060914]/30 py-20 md:py-28">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-[#060914]/25 px-4 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl md:px-8 md:py-12">
        <Reveal className="max-w-3xl text-center md:text-left">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-cyan">
            About the Event
          </p>
          <h2 className="mt-3 text-balance font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Three days to take your quantum leap
          </h2>
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-white/85">
            Qiskit Fall Fest is a global celebration of quantum computing run by students,
            for students. At NC A&amp;T, we&apos;re bringing the Aggie community together
            for a hybrid experience packed with learning, building, and connecting.
          </p>
        </Reveal>

        {/* Four quick highlights */}
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <article
                className="h-full rounded-xl border border-white/10 bg-white/[0.035] p-4 sm:p-5"
                style={{ borderTopColor: `${f.accent}80` }}
              >
                <h3 className="font-display text-lg font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-white/80">{f.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 space-y-14 md:mt-20 md:space-y-16">
          <Reveal>
            <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
              What Will We Accomplish?
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
              {ACCOMPLISH.map((a) => (
                <article key={a.title} className="border-t border-white/15 pt-4">
                  <span className="mb-3 block h-1 w-10 rounded-full" style={{ backgroundColor: a.accent }} />
                  <h4 className="font-display text-xl font-bold text-white">{a.title}</h4>
                  <p className="mt-2 text-base leading-relaxed text-white/80">{a.desc}</p>
                </article>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="grid gap-6 border-t border-white/10 pt-8 md:grid-cols-[0.7fr_1.3fr] md:gap-10">
              <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Why Quantum?!
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
                {WHY.map((w) => (
                  <article key={w.title}>
                    <h4 className="font-display text-lg font-bold" style={{ color: w.accent }}>{w.title}</h4>
                    <p className="mt-2 text-base leading-relaxed text-white/80">{w.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Partner links stay still for easier reading and reduced motion. */}
        <Reveal className="mt-14 border-t border-white/10 pt-8 md:mt-16">
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-transparent to-[#FF006B]" />
            <p className="font-mono text-xs font-medium uppercase tracking-[0.24em] text-[#00E5FF]">
              Supported By
            </p>
            <span aria-hidden="true" className="h-px w-8 bg-gradient-to-l from-transparent to-[#FDB927]" />
          </div>
          <div className="mx-auto mt-5 flex max-w-5xl flex-wrap items-center justify-center gap-3">
            {PARTNERS.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-full border px-4 py-2 font-display text-base font-semibold transition-all hover:-translate-y-0.5 hover:brightness-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                style={{
                  color: p.accent,
                  borderColor: `${p.accent}55`,
                  backgroundColor: `${p.accent}0D`,
                }}
              >
                {p.name}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
