import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Learn | Qiskit Fall Fest 2026',
  description:
    'Learning paths for Qiskit Fall Fest 2026: from your first circuit to real quantum algorithms. Pick a track, go at your own pace.',
}

const CARD = 'rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md'

const IBM_COURSE = 'https://quantum.cloud.ibm.com/learning/en/courses/use-a-qc-today'
const IBM_MODULES = 'https://quantum.cloud.ibm.com/learning/en/modules'

interface Module {
  title: string
  topic: string
}

interface Track {
  name: string
  blurb: string
  color: string
  note?: string
  modules: Module[]
}

const TRACKS: Track[] = [
  {
    name: 'Physics',
    blurb: 'How quantum systems actually behave.',
    color: '#00E5FF',
    modules: [
      { title: 'Stern-Gerlach Measurements', topic: 'Measuring spin' },
      { title: 'Superposition', topic: 'Superposition, interference, and the Bloch sphere' },
      { title: 'Exploring Uncertainty', topic: 'Uncertainty relations and Pauli operators' },
      { title: "Bell's Inequality", topic: 'Entanglement and the CHSH test' },
    ],
  },
  {
    name: 'Computer science',
    blurb: 'Protocols and algorithms you can run.',
    color: '#FF4D8F',
    modules: [
      { title: 'Quantum Teleportation', topic: 'The teleportation protocol' },
      { title: 'Quantum Key Distribution', topic: 'The BB84 protocol' },
      { title: 'Deutsch-Jozsa', topic: 'The algorithm and phase kickback' },
      { title: "Grover's Algorithm", topic: 'Search and amplitude amplification' },
    ],
  },
  {
    name: 'Algorithms',
    blurb: 'Advanced. Take these after the basics.',
    color: '#FDB927',
    modules: [
      { title: 'QFT and Phase Estimation', topic: 'The quantum Fourier transform and QPE' },
      { title: "Shor's Algorithm", topic: 'Factoring. Needs QFT and QPE first' },
    ],
  },
  {
    name: 'Chemistry',
    blurb: 'A separate direction, and a head start on hackathon Challenge 1.',
    color: '#A78BFA',
    modules: [{ title: 'VQE', topic: 'The variational eigensolver, applied to hydrogen chemistry' }],
  },
]

interface Lab {
  n: string
  title: string
  time: string
  level: string
  body: string
  prereq: string
  /** Optional download link. The button appears once this is set. */
  url?: string
}

const LABS: Lab[] = [
  {
    n: '01',
    title: 'Sample, Then Diagonalize',
    time: '~50 min',
    level: 'Beginner friendly',
    body: 'Find a system\u2019s lowest energy by measuring it, keeping the few bitstrings that matter, and diagonalizing that small piece classically.',
    prereq: 'Qubits, circuits, gates, and measurement in Qiskit. No chemistry needed.',
  },
  {
    n: '02',
    title: 'Molecules as Bitstrings',
    time: '~60 min',
    level: 'Beginner to intermediate',
    body: 'Turn the same idea toward chemistry: represent the configurations of a real molecule as bitstrings and watch the energy come out right.',
    prereq: 'Lab 1.',
  },
  {
    n: '03',
    title: 'The Full SQD Pipeline',
    time: '~75 min',
    level: 'Intermediate',
    body: 'Run the whole workflow behind today\u2019s quantum chemistry experiments on stretched nitrogen: build the circuit, sample, repair noisy results, and diagonalize.',
    prereq: 'Labs 1 and 2.',
  },
]

function TrackCard({ track }: { track: Track }) {
  const { color } = track
  return (
    <article className={`${CARD} relative overflow-hidden p-6 md:p-7`}>
      <span className="absolute inset-x-0 top-0 h-px" style={{ backgroundColor: color, opacity: 0.7 }} />
      <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color }}>
        {track.name}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-white/70">{track.blurb}</p>

      <ol className="relative mt-6 space-y-5">
        {track.modules.length > 1 && (
          <span
            aria-hidden="true"
            className="absolute bottom-3 left-[13px] top-3 w-px"
            style={{ backgroundColor: `${color}55` }}
          />
        )}
        {track.modules.map((m, i) => (
          <li key={m.title} className="relative pl-11">
            <span
              className="absolute left-0 top-0 flex size-7 items-center justify-center rounded-full border font-mono text-xs font-semibold"
              style={{ borderColor: `${color}99`, color, backgroundColor: '#0a0f1e' }}
            >
              {i + 1}
            </span>
            <h3 className="font-display font-bold leading-snug text-white">{m.title}</h3>
            <p className="mt-0.5 text-sm leading-relaxed text-white/65">{m.topic}</p>
          </li>
        ))}
      </ol>
    </article>
  )
}

export default function LearnPage() {
  return (
    <main className="min-h-screen px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
        >
          <span className="font-mono">←</span> Back to Fall Fest
        </Link>

        {/* Header */}
        <header className={`${CARD} mt-10 p-8 md:p-10`}>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#00E5FF]">Learn</p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] text-white sm:text-6xl">
            Start from zero.
            <span className="block text-white/40">Go as far as you like.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-white/75">
            Whether quantum is brand new or you already write Qiskit, these paths take you from a first
            circuit to real algorithms. Do one module before the event, or keep going long after it.
          </p>

          <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-3">
            {[
              ['Modules', '12 guided notebooks'],
              ['Practice', '~130 auto-graded exercises'],
              ['Pace', '1 to 2 hours per module'],
            ].map(([k, v]) => (
              <div key={k} className="bg-[#080c18] px-5 py-4">
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-white/45">{k}</dt>
                <dd className="mt-1 font-display text-sm font-semibold text-white">{v}</dd>
              </div>
            ))}
          </dl>
        </header>

        {/* Start here */}
        <section className="mt-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">Step one</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">Everyone starts here</h2>
          <div className={`${CARD} relative mt-8 overflow-hidden p-6 md:p-8`}>
            <span className="absolute inset-y-0 left-0 w-1 bg-[#FDB927]" />
            <div className="pl-3">
              <span className="rounded-full border border-[#FDB927]/40 bg-[#FDB927]/10 px-3 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#FDB927]">
                Start here
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-white sm:text-2xl">
                Get Started with Qiskit
              </h3>
              <p className="mt-2 max-w-2xl leading-relaxed text-white/75">
                From bits to qubits, then circuits, superposition, entanglement, and the Qiskit patterns
                workflow. It assumes no background, and every other module builds on it.
              </p>
            </div>
          </div>
        </section>

        {/* Tracks */}
        <section className="mt-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">Step two</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">Then pick a path</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65">
            You do not need all twelve. Choose the track that interests you and work through it in order.
            For a short event, one module is plenty.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {TRACKS.map((t) => (
              <TrackCard key={t.name} track={t} />
            ))}
          </div>

          {/* Participants-only note */}
          <aside className={`${CARD} mt-6 p-6 md:p-8`}>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">Getting the notebooks</p>
            <h3 className="mt-3 font-display text-xl font-bold text-white">Why there is no download button</h3>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-white/75">
              <p>
                These graded editions check your answers on IBM&apos;s grading server, which has limited
                capacity. IBM asks that they go to event participants only, so we share them with
                registered attendees directly.
              </p>
              <p>
                You will need a free IBM Quantum account for the auto-grader. Want to start right now?
                IBM publishes the standard versions of these modules openly.
              </p>
            </div>
            <a
              href={IBM_MODULES}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#00E5FF]/40 px-5 py-2.5 text-sm font-semibold text-[#00E5FF] transition-colors hover:bg-[#00E5FF]/10"
            >
              Browse the open modules <span className="font-mono">→</span>
            </a>
          </aside>
        </section>

        {/* SQD labs */}
        <section className="mt-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">Go deeper</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
            Sample-based quantum diagonalization
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65">
            An optional three-lab series built for IBM Quantum&apos;s ten-year anniversary. It goes from a
            toy magnet to a real molecule, one lab at a time. Do them in order.
          </p>
          <ol className="mt-8 space-y-4">
            {LABS.map((lab) => (
              <li key={lab.n} className={`${CARD} grid gap-4 p-6 md:grid-cols-[4.5rem_1fr] md:gap-6 md:p-7`}>
                <span className="font-display text-4xl font-bold leading-none text-white/20">{lab.n}</span>
                <div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs uppercase tracking-[0.2em]">
                    <span className="text-[#00E5FF]">{lab.time}</span>
                    <span className="text-white/45">{lab.level}</span>
                  </div>
                  <h3 className="mt-2 font-display text-xl font-bold text-white">{lab.title}</h3>
                  <p className="mt-2 leading-relaxed text-white/75">{lab.body}</p>
                  <p className="mt-3 text-sm text-white/55">
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/40">Before you start </span>
                    {lab.prereq}
                  </p>
                  {lab.url && (
                    <a
                      href={lab.url}
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#FDB927]/40 px-5 py-2.5 text-sm font-semibold text-[#FDB927] transition-colors hover:bg-[#FDB927]/10"
                    >
                      Download notebook <span className="font-mono text-xs text-[#FDB927]/70">.ipynb</span>
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Next steps */}
        <section className="mt-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">Next</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">Where to go from here</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <a
              href={IBM_COURSE}
              target="_blank"
              rel="noopener noreferrer"
              className={`${CARD} group p-6 transition-colors hover:border-[#00E5FF]/40`}
            >
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#00E5FF]">Free course</p>
              <h3 className="mt-3 font-display text-lg font-bold text-white">Use a quantum computer today</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                IBM&apos;s fastest way in: run a real circuit in minutes and pick up the principles along
                the way.
              </p>
              <span className="mt-4 inline-block font-mono text-sm text-[#00E5FF] transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <Link href="/setup" className={`${CARD} group p-6 transition-colors hover:border-[#00E5FF]/40`}>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#00E5FF]">Environment</p>
              <h3 className="mt-3 font-display text-lg font-bold text-white">Set up qBraid Lab</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                Build your environment once so every notebook runs without installing a thing.
              </p>
              <span className="mt-4 inline-block font-mono text-sm text-[#00E5FF] transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link href="/hackathon" className={`${CARD} group p-6 transition-colors hover:border-[#FDB927]/40`}>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#FDB927]">Hackathon</p>
              <h3 className="mt-3 font-display text-lg font-bold text-white">Put it to work</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                Three challenges, three levels each. Pick one and build something quantum.
              </p>
              <span className="mt-4 inline-block font-mono text-sm text-[#FDB927] transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </section>

        <p className="mt-14 border-t border-white/10 pt-8 text-sm leading-relaxed text-white/50">
          The Qiskit in the Classroom modules come from the IBM Quantum education team and are MIT
          licensed. The sample-based quantum diagonalization labs were created by IBM Quantum for Qiskit
          Fall Fest.
        </p>
      </div>
    </main>
  )
}
