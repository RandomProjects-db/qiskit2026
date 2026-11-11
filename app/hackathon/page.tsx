import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hackathon | Qiskit Fall Fest 2026',
  description:
    'Three beginner-friendly quantum challenges, one overnight build, live presentations on Saturday. Everything you need to know about the Qiskit Fall Fest 2026 hackathon.',
}

/**
 * Where teams submit their notebook. Leave empty until the form is live;
 * the page shows a "opens during the event" state while this is blank.
 */
const SUBMISSION_URL = ''

const CARD = 'rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md'

/* ------------------------------------------------------------------ */
/* Diagrams: each one draws what its challenge is about.               */
/* ------------------------------------------------------------------ */

function MoleculeDiagram() {
  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="atomA" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#8af3ff" />
          <stop offset="100%" stopColor="#0084bd" />
        </radialGradient>
        <radialGradient id="atomB" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#ffe29a" />
          <stop offset="100%" stopColor="#d48806" />
        </radialGradient>
      </defs>
      {/* electron cloud */}
      <ellipse cx="120" cy="75" rx="92" ry="44" fill="none" stroke="#00E5FF" strokeOpacity="0.35" strokeDasharray="3 5" />
      <ellipse cx="120" cy="75" rx="68" ry="30" fill="none" stroke="#00E5FF" strokeOpacity="0.2" strokeDasharray="2 6" />
      {/* bond */}
      <line x1="92" y1="75" x2="148" y2="75" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="5" strokeLinecap="round" />
      {/* atoms */}
      <circle cx="82" cy="75" r="24" fill="url(#atomA)" />
      <circle cx="158" cy="75" r="24" fill="url(#atomB)" />
      {/* electrons orbiting the cloud */}
      <circle cx="212" cy="75" r="3.5" fill="#00E5FF" />
      <circle cx="28" cy="75" r="3.5" fill="#00E5FF" />
      <circle cx="120" cy="31" r="3" fill="#00E5FF" fillOpacity="0.7" />
      <circle cx="120" cy="119" r="3" fill="#00E5FF" fillOpacity="0.7" />
    </svg>
  )
}

function MaxCutDiagram() {
  // Pentagon layout. Nodes 0 and 2 form one group; 1, 3 and 4 form the other.
  const nodes = [
    { x: 120, y: 24, g: 0 },
    { x: 167, y: 58, g: 1 },
    { x: 149, y: 114, g: 0 },
    { x: 91, y: 114, g: 1 },
    { x: 73, y: 58, g: 1 },
  ]
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 0],
    [0, 2],
    [1, 3],
  ]
  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true">
      {edges.map(([a, b]) => {
        const cut = nodes[a].g !== nodes[b].g
        return (
          <line
            key={`${a}-${b}`}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke={cut ? '#FDB927' : '#ffffff'}
            strokeOpacity={cut ? 0.95 : 0.22}
            strokeWidth={cut ? 2.5 : 1.5}
            strokeDasharray={cut ? undefined : '3 4'}
          />
        )
      })}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="12" fill={n.g === 0 ? '#00E5FF' : '#FF4D8F'} fillOpacity="0.18" />
          <circle cx={n.x} cy={n.y} r="7.5" fill={n.g === 0 ? '#00E5FF' : '#FF4D8F'} />
        </g>
      ))}
    </svg>
  )
}

function SpinChainDiagram() {
  const spins = [
    { x: 48, up: true },
    { x: 96, up: true },
    { x: 144, up: false },
    { x: 192, up: true },
  ]
  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" aria-hidden="true">
      {/* chain */}
      <line x1="30" y1="46" x2="210" y2="46" stroke="#ffffff" strokeOpacity="0.2" />
      {spins.map((s) => {
        const tip = s.up ? 24 : 68
        const tail = s.up ? 68 : 24
        const head = s.up ? 24 : 68
        const dir = s.up ? 1 : -1
        return (
          <g key={s.x}>
            <circle cx={s.x} cy="46" r="4" fill="#ffffff" fillOpacity="0.55" />
            <line x1={s.x} y1={tail} x2={s.x} y2={tip} stroke={s.up ? '#00E5FF' : '#FDB927'} strokeWidth="3" strokeLinecap="round" />
            <path
              d={`M ${s.x - 6} ${head + 8 * dir} L ${s.x} ${head} L ${s.x + 6} ${head + 8 * dir}`}
              fill="none"
              stroke={s.up ? '#00E5FF' : '#FDB927'}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        )
      })}
      {/* signal evolving over time */}
      <line x1="24" y1="122" x2="216" y2="122" stroke="#ffffff" strokeOpacity="0.2" />
      <path
        d="M 24 122 C 44 84, 64 84, 84 122 S 124 160, 144 122 S 176 104, 192 122 S 208 130, 216 122"
        fill="none"
        stroke="#00E5FF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 24 122 C 44 90, 64 90, 84 122 S 124 154, 144 122 S 176 110, 192 122 S 208 128, 216 122"
        fill="none"
        stroke="#FDB927"
        strokeOpacity="0.8"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        strokeLinecap="round"
      />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

interface Challenge {
  n: string
  tag: string
  title: string
  blurb: string
  meta: string
  firstPick?: boolean
  /** Google Drive file id of the challenge notebook (shared: anyone with the link). */
  driveId: string
  levels: [string, string][]
  diagram: React.ReactNode
}

const driveDownload = (id: string) => `https://drive.google.com/uc?export=download&id=${id}`

const CHALLENGES: Challenge[] = [
  {
    n: '01',
    tag: 'Chemistry · VQE',
    title: 'Ground-State Energy',
    blurb:
      'Find the lowest energy of a hydrogen molecule with a variational quantum eigensolver, then check your answer against the exact result.',
    meta: '4 qubits · H2 molecule',
    driveId: '1GT_7NLnR4KWo4JTjuB-kKXoBpmZGEzm1',
    levels: [
      ['Beginner', 'Map the potential energy surface of HeH+'],
      ['Intermediate', 'Tackle larger molecules using fewer qubits'],
      ['Advanced', 'Try SQD-style sampling'],
    ],
    diagram: <MoleculeDiagram />,
  },
  {
    n: '02',
    tag: 'Optimization · QAOA',
    title: 'Max-Cut',
    blurb:
      'Split a small graph into two groups so that as many edges as possible cross between them, using the Quantum Approximate Optimization Algorithm.',
    meta: '5 qubits · 5-node graph',
    firstPick: true,
    driveId: '194R4uTM-S6Y46Bi17O66vSqD0S4IClEU',
    levels: [
      ['Beginner', 'Portfolio selection under a budget constraint'],
      ['Intermediate', 'QAOA versus quantum machine learning'],
      ['Advanced', 'Utility-scale challenges and barren plateaus'],
    ],
    diagram: <MaxCutDiagram />,
  },
  {
    n: '03',
    tag: 'Simulation · Trotterization',
    title: 'Spin-Chain Dynamics',
    blurb:
      'Watch a chain of quantum spins evolve over time using Trotterized time evolution, and compare the result to the exact answer.',
    meta: '4 qubits · transverse-field Ising chain',
    driveId: '1Tl-4MtqRDCYXo2fU1AzpEYfWeO6QQrRN',
    levels: [
      ['Beginner', 'Correlations, Trotter step size, and higher-order formulas'],
      ['Intermediate', 'Add noise and error mitigation'],
      ['Advanced', 'Kicked (Floquet) Ising models'],
    ],
    diagram: <SpinChainDiagram />,
  },
]

const FLOW: { when: string; title: string; body: string }[] = [
  {
    when: 'Fri · 6:20 PM',
    title: 'Hackathon orientation',
    body: 'Rules, challenges, platform walkthrough, and team formation.',
  },
  {
    when: 'Fri night → Sat',
    title: 'Build',
    body: 'Pick a challenge and a level, then work through it with your team.',
  },
  {
    when: 'Sat · 12 noon',
    title: 'Submit',
    body: 'Export your notebook and send it in before the deadline.',
  },
  {
    when: 'Sat · 1:15 PM',
    title: 'Present',
    body: 'Show your notebook to the judges and the room, then take questions.',
  },
  {
    when: 'Sat · 2:15 PM',
    title: 'Closing session while judges deliberate',
    body: 'A closing talk while the judges finish scoring.',
  },
  {
    when: 'Sat · 2:50 PM',
    title: 'Awards',
    body: 'Recognition for the winning teams.',
  },
]

export default function HackathonPage() {
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
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#FDB927]">Hackathon</p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] text-white sm:text-6xl">
            Build something quantum.
            <span className="block text-white/65">Then explain it.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty leading-relaxed text-white/75">
            Three guided challenges, each with a beginner, intermediate, and advanced level. Pick the
            one that interests you, build overnight, and present your notebook on Saturday. No prior
            quantum experience required, and everything runs on a simulator in your browser.
          </p>

          <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-3">
            {[
              ['Platform', 'qBraid Lab, simulator only'],
              ['Build window', 'Friday night to Saturday'],
              ['Presentations', 'Saturday, 1:30 PM'],
            ].map(([k, v]) => (
              <div key={k} className="bg-[#080c18] px-5 py-4">
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-white/65">{k}</dt>
                <dd className="mt-1 font-display text-sm font-semibold text-white">{v}</dd>
              </div>
            ))}
          </dl>
        </header>

        {/* Challenges */}
        <section className="mt-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">The challenges</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
            Choose your challenge
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65">
            Download the notebook for the challenge you want, then drag it into your qBraid Lab file
            browser. Each notebook walks you through the basics, and its levels are the challenge.
          </p>
          <div className="mt-8 space-y-6">
            {CHALLENGES.map((c, i) => (
              <article key={c.n} className={`${CARD} overflow-hidden`}>
                <div className="grid md:grid-cols-[5fr_7fr]">
                  {/* Diagram */}
                  <div
                    className={`relative flex min-h-[200px] items-center justify-center border-b border-white/10 bg-gradient-to-br from-[#0b1733] to-[#161022] p-6 md:border-b-0 ${
                      i % 2 === 0 ? 'md:border-r' : 'md:order-2 md:border-l'
                    }`}
                  >
                    <span className="absolute left-5 top-4 font-mono text-xs tracking-[0.25em] text-white/35">
                      {c.n}
                    </span>
                    <div className="h-44 w-full max-w-[280px]">{c.diagram}</div>
                  </div>

                  {/* Copy */}
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#00E5FF]">{c.tag}</p>
                      {c.firstPick && (
                        <span className="rounded-full border border-[#FDB927]/40 bg-[#FDB927]/10 px-3 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[#FDB927]">
                          Good first pick
                        </span>
                      )}
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-bold text-white">{c.title}</h3>
                    <p className="mt-2 leading-relaxed text-white/75">{c.blurb}</p>
                    <p className="mt-3 font-mono text-xs text-white/65">{c.meta}</p>

                    <ul className="mt-6 divide-y divide-white/10 border-t border-white/10">
                      {c.levels.map(([level, text]) => (
                        <li key={level} className="grid grid-cols-[7.5rem_1fr] gap-3 py-3 text-sm">
                          <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/50">
                            {level}
                          </span>
                          <span className="text-white/85">{text}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={driveDownload(c.driveId)}
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#FDB927]/40 px-5 py-2.5 text-sm font-semibold text-[#FDB927] transition-colors hover:bg-[#FDB927]/10"
                    >
                      Download notebook <span className="font-mono text-xs text-[#FDB927]/70">.ipynb</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Flow */}
        <section className="mt-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">How it runs</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
            From orientation to awards
          </h2>
          <ol className={`${CARD} mt-8 divide-y divide-white/10`}>
            {FLOW.map((f) => (
              <li key={f.title} className="grid gap-1 px-6 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#FDB927]">{f.when}</span>
                <div>
                  <h3 className="font-display font-bold text-white">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/70">{f.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Ground rules */}
        <section className="mt-16 grid gap-6 md:grid-cols-2">
          <div className={`${CARD} p-6 md:p-8`}>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">Using AI</p>
            <h2 className="mt-3 font-display text-xl font-bold text-white">A tutor, not an answer machine</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              Use AI to explain a concept, break down a solution, or debug an error. Do not paste in the
              prompt and submit whatever comes back. Every team presents, and judges will ask you to walk
              through your code. If you can explain it, you are using AI the right way.
            </p>
          </div>
          <div className={`${CARD} p-6 md:p-8`}>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">What judges reward</p>
            <h2 className="mt-3 font-display text-xl font-bold text-white">Completion and understanding</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              Speed does not win. A team that fully understands a partial solution will score better than
              a team that submits a complete one it cannot explain.
            </p>
          </div>
        </section>

        {/* How you're judged */}
        <section className="mt-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">How you're judged</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">100 points, four parts</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65">
            Every team submits a notebook, a short report, and slides, then presents live on Saturday.
            Here is how the points break down.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                pts: '40',
                title: 'Presentation',
                body: 'Your 7-minute talk: understanding of the problem and approach, results and evidence it works, clarity and delivery, and honesty about what you learned and what did not work.',
              },
              {
                pts: '20',
                title: 'Notebook',
                body: 'Runs top to bottom and reproduces, correctness checked against a reference, and clear, readable code.',
              },
              {
                pts: '20',
                title: 'Written report',
                body: 'A 3–4 page PDF: problem and background, formulation and method, results with figures, what did not work, and an AI-usage statement.',
              },
              {
                pts: '10',
                title: 'Level & originality',
                body: 'Credit for the level you complete (beginner, intermediate, advanced) and for extending beyond the tutorial with your own idea.',
              },
              {
                pts: '10',
                title: 'Live Q&A',
                body: 'Any teammate can explain the work, walk through the code, and discuss limitations and next steps. "The model wrote it" is not an answer.',
              },
            ].map((c) => (
              <div key={c.title} className={`${CARD} flex gap-5 p-6`}>
                <div className="shrink-0">
                  <span className="font-display text-3xl font-bold text-[#FDB927]">{c.pts}</span>
                  <span className="ml-1 text-sm text-white/65">pts</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-white">{c.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/70">{c.body}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-white/55">
            Judges score independently, and the presentation and Q&A are averaged across the panel, so
            no single judge decides the result. People's Choice is awarded separately.
          </p>
        </section>

        {/* Get ready + submit */}
        <section className="mt-6 grid gap-6 md:grid-cols-2">
          <div className={`${CARD} p-6 md:p-8`}>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">Before you start</p>
            <h2 className="mt-3 font-display text-xl font-bold text-white">Set up qBraid Lab</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              Build your environment once and reuse it for every notebook. It takes a few minutes, so do
              it before the event.
            </p>
            <Link
              href="/setup"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#00E5FF]/40 px-5 py-2.5 text-sm font-semibold text-[#00E5FF] transition-colors hover:bg-[#00E5FF]/10"
            >
              Open the setup guide <span className="font-mono">→</span>
            </Link>
          </div>

          <div className={`${CARD} p-6 md:p-8`}>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">Submission</p>
            <h2 className="mt-3 font-display text-xl font-bold text-white">Send in your notebook</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              Export your finished notebook as an <span className="font-mono text-white">.ipynb</span>{' '}
              file and submit it with your team name and a short note on what you built.
            </p>
            {SUBMISSION_URL ? (
              <a
                href={SUBMISSION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#FDB927] px-5 py-2.5 text-sm font-semibold text-[#0b1024] transition-transform hover:scale-[1.03]"
              >
                Submit your project <span className="font-mono">→</span>
              </a>
            ) : (
              <p className="mt-5 inline-flex items-center rounded-full border border-white/15 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-white/50">
                Opens during the event
              </p>
            )}
          </div>
        </section>

        {/* Credit */}
        <p className="mt-14 border-t border-white/10 pt-8 text-sm leading-relaxed text-white/50">
          The three challenge tutorials were created by Benjamin Tirado of BasQ and are shared under
          CC BY 4.0 (text) and Apache 2.0 (code).
        </p>
      </div>
    </main>
  )
}
