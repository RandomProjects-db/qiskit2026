'use client'

import { useState } from 'react'
import { Reveal } from '@/components/reveal'
import { MemberModal, avatarUrl, type Organizer } from '@/components/team'

// Confirmed featured speakers (Oct 27).
const SPEAKERS: Organizer[] = [
  {
    name: 'Dr. Carolyn Hartley',
    title: 'Emerging Technology Lead, IBM Chief Sustainability Office · IBM Quantum Ambassador',
    affiliation: 'IBM · Raleigh, North Carolina',
    talkTitle: 'Introduction to Quantum Computing & the IBM Quantum Platform',
    bio: 'Dr. Carolyn Hartley is the Emerging Technology Lead in IBM\u2019s Chief Sustainability Office and an IBM Quantum Ambassador. Based in Raleigh, North Carolina, she works at the intersection of emerging technology and sustainability, with a particular focus on quantum computing. Carolyn earned her Ph.D. in Chemistry from the University of North Carolina at Chapel Hill in 2021.',
    photo: '/speaker-carolyn.jpg',
  },
  {
    name: 'Dr. Rachel Noek',
    title: 'Technical Program Manager / Senior Research Scientist',
    affiliation: 'Duke Quantum Center · Pratt School of Engineering, Duke University',
    talkTitle: 'A Quantum Advantage Computer as an NSF Funded National Resource',
    bio: 'Dr. Noek started her career at Sandia National Laboratories as a year-round student intern. A few years after earning her B.S. in Mathematics from the University of New Mexico, she went on to earn a Ph.D. in Electrical and Computer Engineering from Duke University, where her thesis focused on integrated optics for light collection from trapped ions for quantum information processing. After a period as a Research Scientist, she became a Technical Program Manager (TPM) at Duke University for a large IARPA LogiQ grant. She later moved to the quantum computing startup IonQ to lead the engineering design and prototype build for the next quantum computing product. After seeing through completion of the prototype Tempo build at IonQ, early this year she moved back to Duke as a TPM for the NSF\u2019s National Quantum Virtual Laboratory: Quantum Advantage Class Trapped Ion quantum computer project led by Prof. Ken Brown. Her expertise is in leading large cross-functional quantum computer development projects.',
    photo: '/speaker-rachel.jpg',
    email: 'rachel.noek@duke.edu',
  },
  {
    name: 'Dr. Katanya B. Kuntz',
    title: 'Founder, CEO & Chief Quantum Scientist, Qubo Consulting Corp',
    affiliation: 'Research Associate, Institute for Quantum Computing, University of Waterloo',
    talkTitle: 'From Quantum Research to Enterprise: Careers, Entrepreneurship & Opportunities in the Quantum Industry',
    bio: 'Katanya B. Kuntz, PhD is Founder, CEO and Chief Quantum Scientist of Qubo Consulting Corp, and a Research Associate at the Institute for Quantum Computing, University of Waterloo, Canada. Qubo Consulting helps organizations and the future workforce make informed decisions about emerging disruptive technology by training and advising on quantum technologies. She is also the QEYSSat Science Team Coordinator for Canada\u2019s first quantum satellite mission: Quantum EncrYption and Science Satellite (QEYSSat), which will demonstrate the distribution of encrypted keys (Quantum Key Distribution) between ground and space. She is an excellent public speaker, known for explaining difficult concepts in easy-to-understand language. Katanya received her PhD in Electrical Engineering (Quantum Optics) from the University of New South Wales, Australia (2013), and a BSc in Physics from the University of Calgary (2008). She works in experimental quantum optics, such as generating quantum states of light using lasers and non-linear crystals to study quantum entanglement.',
    photo: '/speaker-katanya.png',
    linkedin: 'https://www.linkedin.com/in/katanya-b-kuntz/',
    website: 'https://quboquantum.com/',
  },
  {
    name: 'Dr. Olusola T. Odeyomi',
    title: 'Assistant Professor of Computer Science',
    affiliation: 'North Carolina A&T State University',
    talkTitle: 'Quantum AI: Where Quantum Computing Meets Machine Learning',
    bio: 'Dr. Olusola T. Odeyomi is an Assistant Professor of Computer Science at North Carolina Agricultural and Technical State University. He received his Ph.D. in Electrical Engineering and Computer Science from Wichita State University, Kansas, and his M.Sc. and B.Sc. degrees in Electronic and Electrical Engineering from Obafemi Awolowo University in Nigeria. He is a member of the IEEE Information Theory Society and the IEEE Computer Science Society, the author of numerous high-ranking journal papers and conference proceedings, and a frequent reviewer for journals including IEEE and ACM. He has served as a guest editor and technical program committee member for numerous journals and conferences. He was a recipient of the National Science Foundation CAREER Award in 2025. His research interests include trustworthy machine learning, game theory, signal processing, and quantum information security.',
    photo: '/speaker-olusola.png',
  },
]

export function Speakers() {
  const [selected, setSelected] = useState<Organizer | null>(null)

  return (
    <section id="speakers" className="scroll-mt-20 bg-[#060914]/20 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-cyan">
            Speakers
          </p>
          <h2 className="mt-3 text-balance font-display text-2xl font-bold text-white sm:text-4xl">
            Featured Speakers
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-white/85">
            Leading voices from quantum research, industry, and academia — with more to be announced.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SPEAKERS.map((s, i) => (
            <Reveal key={s.name} delay={(i % 3) * 0.08}>
              <article
                onClick={() => setSelected(s)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelected(s)
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${s.name}`}
                className="forge-card group flex h-full cursor-pointer flex-col overflow-hidden p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF006B]/50"
              >
                {/* Square photo — distinguishes speakers from the round team avatars */}
                <div className="relative aspect-square w-full overflow-hidden">
                  <img
                    src={s.photo || avatarUrl(s.name)}
                    alt={s.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#060914] to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-bold text-white">{s.name}</h3>
                  <p className="mt-0.5 text-sm font-semibold text-[#FF4D8F]">{s.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/85">{s.affiliation}</p>
                  {s.talkTitle && (
                    <p className="mt-3 text-sm italic leading-relaxed text-white/90">
                      “{s.talkTitle}”
                    </p>
                  )}
                  <span className="mt-auto pt-3 text-xs font-semibold text-[#FF4D8F]">
                    Read bio →
                  </span>
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
