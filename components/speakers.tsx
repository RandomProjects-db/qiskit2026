'use client'

import { useState } from 'react'
import { Atom } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { MemberModal, type Organizer } from '@/components/team'

/**
 * On-brand placeholder shown for a speaker whose headshot hasn't arrived yet.
 * A dark quantum tile with a glowing atom glyph — reads as an intentional
 * "photo coming soon" rather than a broken/generic avatar. Applies anywhere
 * a speaker has no `photo`.
 */
function SpeakerPhotoFallback({ name }: { name: string }) {
  return (
    <div
      aria-label={`${name} — photo coming soon`}
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#0b1733] via-[#0a1024] to-[#161022]"
    >
      {/* soft glow */}
      <div className="absolute size-40 rounded-full bg-[#00E5FF]/10 blur-3xl" />
      <div className="absolute size-28 rounded-full bg-[#6929C4]/15 blur-2xl" />
      {/* orbiting-atom glyph */}
      <Atom className="relative size-20 text-[#00E5FF] drop-shadow-[0_0_12px_rgba(0,229,255,0.5)]" strokeWidth={1.25} />
      <span className="absolute bottom-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
        Photo coming soon
      </span>
    </div>
  )
}

// Confirmed featured speakers (Oct 27).
const SPEAKERS: Organizer[] = [
  {
    name: 'Dr. Carolyn Hartley',
    title: 'Emerging Technology Lead, IBM Chief Sustainability Office · IBM Quantum Ambassador',
    affiliation: 'IBM · Raleigh, North Carolina',
    talkTitle: 'Introduction to Quantum Computing & the IBM Quantum Platform',
    bio: 'Dr. Carolyn Hartley is the Emerging Technology Lead in IBM\u2019s Chief Sustainability Office and an IBM Quantum Ambassador. Based in Raleigh, North Carolina, she works at the intersection of emerging technology and sustainability, with a particular focus on quantum computing. Carolyn earned her Ph.D. in Chemistry from the University of North Carolina at Chapel Hill in 2021.',
    photo: '/speaker-carolyn.jpg',
    linkedin: 'https://www.linkedin.com/in/carolyn-hartley-ph-d-2216a262/',
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
  {
    name: 'Dr. Krystal Maughan',
    title: 'Quantum Mathematical Researcher',
    affiliation: 'PhD in Computer Science, University of Vermont',
    talkTitle: 'Quantum-Safe Cryptography: Where Number Theory Meets Quantum Computing',
    bio: 'Dr. Krystal Maughan is a Quantum Mathematical Researcher who researches problems at the intersection of quantum computing, cryptography and number theory. Originally from Trinidad and Tobago, she earned her PhD in Computer Science in August 2026 from the University of Vermont, complementing her doctoral work with extensive graduate-level coursework in pure mathematics. She is interested in quantum-safe encryption that relies on hardness guarantees from mathematical problems that can be proven difficult for quantum computers to solve. She is also interested in questions that explore cryptanalysis for these protocols using quantum algorithms, and because of this she frequently works with both mathematicians and physicists.',
    photo: '/speaker-krystal.png',
    linkedin: 'https://www.linkedin.com/in/krystal-maughan-ph-d-3563a215',
  },
  {
    name: 'Dr. Quinton Rice',
    title: 'Teaching Assistant Professor of Electrical & Computer Engineering',
    affiliation: 'North Carolina A&T State University',
    talkTitle: 'The importance of quantum computing and its role in science and engineering',
    bio: 'Dr. Quinton Rice is a Teaching Assistant Professor of Electrical and Computer Engineering at North Carolina A&T State University. He received his Ph.D. in Physics from Hampton University and has taught undergraduate physics for nine years. His work connects foundational physics with engineering problem solving through educational hardware demonstrations. His background in optics, condensed matter, and quantum cryptography has led to the development of experimental hardware involving charge-trapping and optical systems to encourage undergraduate interest in quantum technologies. Dr. Rice believes that quantum computing is the intersection of science and engineering, and that accessible education is critical to the growth of the field.',
    photo: '/speaker-rice.png',
  },
  {
    name: 'Dr. Patrick Flanigan',
    title: 'Postdoctoral Researcher',
    affiliation: 'North Carolina Central University',
    talkTitle: 'The Physics of Quantum Computing & Photonic Entanglement',
    bio: 'Part 1 of this presentation will go over some of the basic physics underlying quantum computing, such as the Schrodinger equation, superposition, entanglement, and qubits; the material will be geared towards non-physics students so that they get a better understanding of the fundamental concepts that make quantum computing possible. Part 2 will go over an example of a system with photonic quantum entanglement that has been coupled to an optical resonator for increased efficiency. Patrick Flanigan is a postdoctoral researcher at North Carolina Central University. He obtained his Ph.D. from Brown University and Bachelor\u2019s from UC Berkeley. His research focuses on photonic simulations and component design optimization, with applications to quantum computing.',
    photo: '/speaker-flanigan.jpg',
  },
  {
    name: 'Dr. Christopher C. Doss',
    title: 'Associate Professor of Electrical & Computer Engineering · Director, Mobile Health Interoperability Lab',
    affiliation: 'North Carolina A&T State University',
    talkTitle: 'Qubit Control Research at NCAT',
    bio: 'Dr. Christopher C. Doss received his Bachelor of Science degree in Computer Engineering in Spring, 1994 from USF. He received his M.S. and Ph.D. degrees in Computer Engineering from NCSU in Spring, 1997 and 2001, respectively. Dr. Doss currently holds an Associate Professor position at NCAT. He is currently serving as Assistant Department Chair for the Department of Electrical and Computer Engineering. Dr. Doss\u2019 current research interests focus on the design and implementation of applications on reconfigurable computing systems, including biomimetic inspired design, adaptive controls, and quantum control.',
    photo: '/speaker-doss.png',
  },
  {
    name: 'Temitope Odeyomi Adeniyi',
    title: 'PhD Candidate in Computer Science',
    affiliation: 'Cleveland State University',
    talkTitle: 'Quantum Machine Learning',
    bio: 'Temitope Odeyomi Adeniyi is a PhD candidate in Computer Science at Cleveland State University, working on quantum computing, quantum sensing, and artificial intelligence. She helped develop and teach Cleveland State\u2019s first Quantum Machine Learning course, and since 2023 she has led summer quantum computing and machine learning workshops for Cleveland high school students and faculty. She is Program Director at the Africa Quantum Consortium and was selected as one of 20 researchers worldwide, from 629 applicants, for the 2026 Falling Walls Female Science Talents Intensive Track. She was honoured as a UNESCO Quantum 100 honoree during the International Year of Quantum (IYQ).',
    photo: '/team-temitope.jpg',
  },
  {
    name: 'Dr. Lu Qi',
    title: 'Research Scientist',
    affiliation: 'Duke Quantum Center, Duke University',
    talkTitle: 'Something from Nothing: Amplifying the Quantum Vacuum with Two Trapped Ions',
    bio: 'Lu Qi is a Research Scientist at the Duke Quantum Center, Duke University, working with Prof. Kenneth R. Brown. Lu\u2019s research has two parts. The first uses trapped ions, both atomic and molecular, for quantum simulation, computing, and sensing, and treats the shared motion of the ions as a quantum resource alongside their qubits. The second uses AI to help develop and operate quantum hardware. Lu received a Ph.D. from Beihang University and worked at RAL Space in the UK before joining Duke in 2018.',
    photo: '/speaker-luqi.jpg',
  },
]

export function Speakers() {
  const [selected, setSelected] = useState<Organizer | null>(null)

  return (
    <section id="speakers" className="scroll-mt-20 bg-[#060914]/20 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
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

        {/* Featured speaker (first) on top, the rest in a grid below.
            On mobile everything stacks to a single column. */}
        {(() => {
          const [featured, ...rest] = SPEAKERS
          return (
            <>
              {featured && (
                <Reveal className="mx-auto mt-12 max-w-4xl">
                  <article
                    onClick={() => setSelected(featured)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setSelected(featured)
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`View details for ${featured.name}`}
                    className="forge-card group flex h-full cursor-pointer flex-col overflow-hidden p-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF006B]/50 sm:flex-row"
                  >
                    <div className="relative aspect-square w-full shrink-0 overflow-hidden sm:w-72 sm:aspect-auto">
                      {featured.photo ? (
                        <img
                          src={featured.photo}
                          alt={featured.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <SpeakerPhotoFallback name={featured.name} />
                      )}
                      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#060914] to-transparent sm:hidden" />
                    </div>
                    <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
                      <span className="mb-2 w-fit rounded-full bg-[#FF006B]/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#FF4D8F]">
                        Featured Speaker
                      </span>
                      <h3 className="font-[family-name:var(--font-name)] text-3xl font-semibold leading-tight text-white sm:text-4xl">{featured.name}</h3>
                      <p className="mt-1.5 text-base font-semibold text-[#FF4D8F]">{featured.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-white/85">{featured.affiliation}</p>
                      {featured.talkTitle && (
                        <p className="mt-3 text-base italic leading-relaxed text-white/90">
                          “{featured.talkTitle}”
                        </p>
                      )}
                      <span className="mt-4 text-sm font-semibold text-[#FF4D8F]">Read bio →</span>
                    </div>
                  </article>
                </Reveal>
              )}

              <div className="mx-auto mt-6 flex max-w-6xl flex-wrap justify-center gap-6">
                {rest.map((s, i) => (
                  <Reveal
                    key={s.name}
                    delay={(i % 3) * 0.08}
                    className="flex w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                  >
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
                        {s.photo ? (
                          <img
                            src={s.photo}
                            alt={s.name}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <SpeakerPhotoFallback name={s.name} />
                        )}
                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#060914] to-transparent" />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="font-[family-name:var(--font-name)] text-2xl font-semibold leading-tight text-white">{s.name}</h3>
                        <p className="mt-1 text-base font-semibold leading-snug text-[#FF4D8F]">{s.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-white/85">{s.affiliation}</p>
                        {s.talkTitle && (
                          <p className="mt-3 text-base italic leading-relaxed text-white/90">
                            “{s.talkTitle}”
                          </p>
                        )}
                        <span className="mt-auto pt-3 text-sm font-semibold text-[#FF4D8F]">
                          Read bio →
                        </span>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </>
          )
        })()}
      </div>

      {selected && <MemberModal member={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
