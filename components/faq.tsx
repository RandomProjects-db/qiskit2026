import { Reveal } from '@/components/reveal'

/**
 * FAQ built on native <details>/<summary>: keyboard accessible, no JS state,
 * and works without hydration. Answers come from the participant handbook and
 * the event schedule; keep them in sync when those change.
 */
type QA = { q: string; a: React.ReactNode }

const FAQS: QA[] = [
  {
    q: 'Where and when is the event?',
    a: (
      <>
        Qiskit Fall Fest 2026 runs November 12 to 14 at the Joint School of Nanoscience and
        Nanoengineering (JSNN), 2907 East Gate City Blvd, Greensboro, NC 27401. Registration opens at
        4:00 PM on Thursday and Friday and at 10:00 AM on Saturday. The full schedule is above.
      </>
    ),
  },
  {
    q: 'Do I need quantum computing experience?',
    a: 'No. The event is open to all skill levels. Basic Python helps but is not required. Bring a laptop; everything runs in the cloud, so you only need a browser.',
  },
  {
    q: 'Can I attend online?',
    a: 'Thursday and Friday are hybrid. Saturday, including the hackathon presentations, is in person.',
  },
  {
    q: 'How does the hackathon work?',
    a: 'Pick one of three challenges (VQE, QAOA, or Dynamics) and one level (Beginner, Intermediate, or Advanced). Any team can pick any challenge at any level, and the level is independent of the challenge. Teams have 1 to 3 members.',
  },
  {
    q: 'What do teams submit, and when?',
    a: 'A notebook link (GitHub or qBraid) that runs top to bottom, a short PDF report, slides for a 7-minute talk, and your team information. Submit through the form on the hackathon page by 12 noon on Saturday, November 14. Each team then presents for 7 minutes, followed by 3 minutes of questions from the judges.',
  },
  {
    q: 'How are teams scored?',
    a: 'Out of 100 points: presentation 40, notebook 20, written report 20, level attempted and originality 10, and live Q&A 10. The hackathon page has the full breakdown.',
  },
  {
    q: 'Can we use AI tools?',
    a: 'Yes, freely. You own every line you submit and every claim you make, any teammate may be asked to explain any part of the work, and your report should say where you used AI and how you checked its output.',
  },
  {
    q: 'Do I need real quantum hardware?',
    a: 'No. qBraid is the main platform, and simulator-only submissions are fully fine. Real hardware is optional and is not assumed to be available.',
  },
  {
    q: 'Where do I get help or find teammates?',
    a: (
      <>
        Join our{' '}
        <a
          href="https://discord.gg/MVGJmv3AC"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#FDB927] underline underline-offset-2 hover:text-[#FDC94A]"
        >
          Discord
        </a>{' '}
        for announcements, team matching, and questions. The setup guide on the website walks you
        through qBraid step by step.
      </>
    ),
  },
]

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 bg-[#060914]/20 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <Reveal className="text-center">
          <p className="font-[family-name:var(--font-mono-label)] text-xs font-medium uppercase tracking-[0.25em] text-cyan">
            FAQ
          </p>
          <h2 className="mt-3 text-balance font-display text-2xl font-bold text-white sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-white/85">
            Quick answers about the event and the hackathon.
          </p>
        </Reveal>

        <div className="mt-10 space-y-3">
          {FAQS.map((item, i) => (
            <Reveal key={item.q} delay={(i % 4) * 0.05}>
              <details className="forge-card group p-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left font-display text-base font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FDB927]/60 [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <span
                    aria-hidden="true"
                    className="font-[family-name:var(--font-mono-label)] text-lg text-[#FDB927] group-open:hidden"
                  >
                    [+]
                  </span>
                  <span
                    aria-hidden="true"
                    className="hidden font-[family-name:var(--font-mono-label)] text-lg text-[#FDB927] group-open:inline"
                  >
                    [-]
                  </span>
                </summary>
                <div className="px-5 pb-5 text-sm leading-relaxed text-white/85">{item.a}</div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
