'use client'

import { useState } from 'react'
import Link from 'next/link'

const PACKAGES = `numpy>=2.3.2
qiskit==2.5.1
qiskit-aer==0.17.2
qiskit-addon-sqd==0.12.1
ffsim>=0.0.81
pyscf==2.14.0
matplotlib==3.11.1
pylatexenc==2.10`

interface Step {
  n: string
  title: string
  body: React.ReactNode
}

const STEPS: Step[] = [
  {
    n: '01',
    title: 'Sign in to qBraid Lab',
    body: (
      <>
        Open{' '}
        <a
          href="https://lab.qbraid.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#00E5FF] underline-offset-4 hover:underline"
        >
          lab.qbraid.com
        </a>{' '}
        and sign in. Launch a <span className="text-white">small CPU</span> instance, then open the
        lab — it looks and behaves like a standard JupyterLab workspace.
      </>
    ),
  },
  {
    n: '02',
    title: 'Add your notebook',
    body: (
      <>
        Drag the <span className="font-mono text-white">.ipynb</span> file into the file-browser
        panel on the left. That is all it takes to load a notebook into your workspace.
      </>
    ),
  },
  {
    n: '03',
    title: 'Create the environment',
    body: (
      <>
        Open the <span className="text-white">Environments</span> panel (the stacked-layers control
        in the upper right), then choose <span className="text-white">Add → Create Environment</span>.
        Name it <span className="font-mono text-[#FDB927]">fall-fest-sqd</span>, open{' '}
        <span className="text-white">Advanced Customizations</span>, and paste the package list below
        into the <span className="text-white">Python packages</span> field.
      </>
    ),
  },
  {
    n: '04',
    title: 'Install',
    body: (
      <>
        Click <span className="text-white">Create</span> and wait. When the{' '}
        <span className="text-white">Installing…</span> label turns into{' '}
        <span className="text-white">Add kernel</span>, click <span className="text-white">Add kernel</span>.
        If the install throws an error, simply recreate the environment — it is a known, harmless hiccup.
      </>
    ),
  },
  {
    n: '05',
    title: 'Pick the kernel and run',
    body: (
      <>
        Open the notebook and, in the kernel selector at the top right, choose{' '}
        <span className="font-mono text-[#FDB927]">fall-fest-sqd</span>. Leave the{' '}
        <span className="font-mono text-white">%pip install</span> line commented out — the
        environment already has everything it needs. Run the cells and you are set.
      </>
    ),
  },
]

function PackageBlock() {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(PACKAGES).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    })
  }
  return (
    <div className="overflow-hidden rounded-xl border border-white/12 bg-[#05070f]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
          python packages
        </span>
        <button
          type="button"
          onClick={copy}
          className="rounded-md border border-white/15 px-3 py-1 font-mono text-xs text-white/80 transition-colors hover:border-[#00E5FF]/50 hover:text-[#00E5FF]"
        >
          {copied ? 'copied' : 'copy'}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-sm leading-relaxed text-[#cfe8ff]">
        {PACKAGES}
      </pre>
    </div>
  )
}

export default function SetupPage() {
  return (
    <main className="min-h-screen px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-3xl">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
        >
          <span className="font-mono">←</span> Back to Fall Fest
        </Link>

        {/* Header */}
        <header className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-md">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#00E5FF]">
            Environment Setup
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] text-white sm:text-6xl">
            qBraid Lab
            <span className="block text-white/40">Setup Guide</span>
          </h1>
          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-white/75">
            qBraid Lab is a JupyterLab environment that runs entirely in your browser — free tier, no
            local install. You build an environment once, and reuse it across every Fall Fest notebook.
            Set it up before the event so you can run from the first minute.
          </p>
        </header>

        {/* Steps as a numbered vertical timeline */}
        <ol className="mt-12 space-y-5">
          {STEPS.map((step, i) => (
            <li key={step.n} className="group relative grid grid-cols-[auto_1fr] gap-x-5">
              {/* Number + connecting rail */}
              <div className="flex flex-col items-center">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[#00E5FF]/30 bg-[#00E5FF]/5 font-mono text-sm font-semibold text-[#00E5FF]">
                  {step.n}
                </span>
                {i < STEPS.length - 1 && (
                  <span className="my-2 w-px flex-1 bg-gradient-to-b from-[#00E5FF]/30 to-transparent" />
                )}
              </div>
              {/* Content card — translucent with blur */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md">
                <h2 className="font-display text-xl font-bold text-white">{step.title}</h2>
                <p className="mt-2 leading-relaxed text-white/75">{step.body}</p>
                {step.n === '03' && (
                  <div className="mt-5">
                    <PackageBlock />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6" />

        {/* Screenshot placeholders */}
        <section className="mt-6 border-t border-white/10 pt-12">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">
            Walkthrough
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold text-white">Step by step, in pictures</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              'Launching a CPU instance',
              'Creating the environment',
              'Pasting the package list',
              'Selecting the fall-fest-sqd kernel',
            ].map((label, i) => (
              <figure key={label} className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-[#0b1733] to-[#161022]">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/30">
                    screenshot {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <figcaption className="px-4 py-3 text-sm text-white/70">{label}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Video placeholder */}
        <section className="mt-14 border-t border-white/10 pt-12">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">Video</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-white">Prefer to watch?</h2>
          <p className="mt-2 max-w-xl leading-relaxed text-white/75">
            A full video walkthrough of the qBraid setup will be linked here.
          </p>
          <div className="mt-6 flex aspect-video w-full items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-[#0b1733] to-[#161022]">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/30">
              video coming soon
            </span>
          </div>
        </section>

        {/* Footer note */}
        <p className="mt-14 border-t border-white/10 pt-8 text-sm leading-relaxed text-white/50">
          Why qBraid? Unlike a fresh Colab session — where you reinstall libraries every time with{' '}
          <span className="font-mono text-white/70">%pip install</span> — a qBraid environment
          persists. Build it once; it is there every time you, your team, or your mentors return.
        </p>
      </div>
    </main>
  )
}
