import Link from 'next/link'
import { Reveal } from '@/components/reveal'

const MONO = 'font-[family-name:var(--font-mono-label)]'

const CHALLENGES = [
  { n: '01', accent: '#00E5FF', tag: 'Chemistry · VQE' },
  { n: '02', accent: '#FF006B', tag: 'Optimization · QAOA' },
  { n: '03', accent: '#FDB927', tag: 'Simulation · Trotterization' },
]

const LEVELS = ['Beginner', 'Intermediate', 'Advanced']

/** Landing page summary of the hackathon, linking to the full /hackathon page. */
export function HackathonTeaser() {
  return (
    <section id="hackathon" className="scroll-mt-20 bg-[#060914]/20 py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-cyan">
            Hackathon
          </p>
          <h2 className="mt-3 text-balance font-display text-2xl font-bold text-white sm:text-4xl">
            Three challenges. Three levels each.
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-white/85">
            Pick a challenge, choose your level, and build something quantum.
          </p>
        </Reveal>

        <Reveal className="mt-12" delay={0.1}>
          {/* Animated gradient border */}
          <div className="relative overflow-hidden rounded-3xl p-px">
            <div
              aria-hidden="true"
              className="absolute -inset-[100%] animate-[spin_10s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,#00E5FF_70deg,transparent_140deg,#FF006B_220deg,transparent_300deg)] opacity-70 motion-reduce:animate-none"
            />

            <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#060914]/90 px-5 py-10 backdrop-blur-xl sm:px-10 md:py-14">
              {/* Soft glows */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-[#00E5FF]/15 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -right-24 size-72 rounded-full bg-[#FF006B]/15 blur-3xl"
              />

              <div className="relative flex flex-col items-center text-center">
                <span
                  className={`inline-flex items-center gap-2.5 rounded-full border border-[#FDB927]/40 bg-[#FDB927]/10 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-[#FDC94A] ${MONO}`}
                >
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#FDB927] opacity-70 motion-reduce:animate-none" />
                    <span className="relative inline-flex size-2 rounded-full bg-[#FDB927]" />
                  </span>
                  Now open
                </span>

                <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/90 sm:text-xl">
                  Browse the three challenges, download the starter notebooks, and see how you are judged.
                </p>
              </div>

              {/* Locked challenge tiles */}
              <ul className="relative mt-10 grid gap-4 sm:grid-cols-3">
                {CHALLENGES.map((c) => (
                  <li
                    key={c.n}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left"
                  >
                    <p
                      className={`text-xs uppercase tracking-[0.25em] ${MONO}`}
                      style={{ color: c.accent }}
                    >
                      Challenge
                    </p>
                    <p
                      className="mt-1 font-display text-6xl font-bold leading-none text-transparent"
                      style={{ WebkitTextStroke: `1.5px ${c.accent}` }}
                      aria-label={`Challenge ${c.n}`}
                    >
                      {c.n}
                    </p>

                    <p className="mt-5 text-sm font-semibold text-white/85">{c.tag}</p>

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {LEVELS.map((l) => (
                        <span
                          key={l}
                          className={`rounded-full border border-white/20 px-2.5 py-0.5 text-[11px] uppercase tracking-[0.1em] text-white/70 ${MONO}`}
                        >
                          {l}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="relative mt-10 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
                <Link
                  href="/hackathon"
                  className="inline-flex min-h-11 items-center rounded-full bg-[#FDB927] px-6 py-2.5 text-sm font-semibold text-[#0b1024] transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Open the hackathon page
                </Link>
                <a
                  href="https://discord.gg/MVGJmv3AC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center rounded-full border border-white/25 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#00E5FF] hover:text-[#00E5FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Join us on Discord
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
