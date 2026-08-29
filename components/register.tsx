'use client'

import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Reveal } from '@/components/reveal'
import { CheckCircle2, AlertCircle, Loader2, MapPin, Globe } from 'lucide-react'

type AttendanceFormat = 'in-person' | 'virtual' | ''

export function Register() {
  const [format, setFormat] = useState<AttendanceFormat>('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = e.currentTarget
    const data = new FormData(form)

    // Validate hackathon interest for in-person registrants (field is required
    // but only rendered for in-person, so enforce it here as defense-in-depth).
    const hackathonInterest = data.get('hackathon_interest') as string
    if (format === 'in-person') {
      const allowed = ['yes', 'maybe', 'no']
      if (!hackathonInterest || !allowed.includes(hackathonInterest)) {
        setError('Please let us know if you would like to participate in the hackathon.')
        setLoading(false)
        return
      }
    }

    const payload = {
      first_name: data.get('first_name') as string,
      last_name: data.get('last_name') as string,
      email: data.get('email') as string,
      institution: data.get('institution') as string,
      experience_level: parseInt(data.get('experience_level') as string),
      attendance_format: data.get('attendance_format') as string,
      dietary_restrictions: (data.get('dietary_restrictions') as string) || null,
      phone: (data.get('phone') as string) || null,
      emergency_contact_name: (data.get('emergency_contact_name') as string) || null,
      emergency_contact_phone: (data.get('emergency_contact_phone') as string) || null,
      how_heard: (data.get('how_heard') as string) || null,
      interest: (data.get('interest') as string) || null,
      hackathon_interest: (data.get('hackathon_interest') as string) || null,
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await res.json()

      if (!res.ok) {
        setError(result.error || 'Something went wrong. Please try again.')
      } else {
        // Send confirmation email via EmailJS
        const formatLabel = payload.attendance_format === 'in-person' ? 'In-Person' : 'Virtual'
        const location = payload.attendance_format === 'in-person'
          ? 'NC A&T State University, Greensboro, NC'
          : 'Virtual — link will be shared before the event'

        await emailjs.send(
          'service_8beckth',
          'template_hlv309k',
          {
            email: payload.email,
            first_name: payload.first_name,
            attendance_format: formatLabel,
            location: location,
          },
          '9cRF0h_ATqBj-SFKc'
        ).catch((err) => {
          console.error('EmailJS error:', err)
          // Don't block registration if email fails
        })

        setSuccess(true)
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    }

    setLoading(false)
  }

  if (success) {
    return (
      <section id="register" className="scroll-mt-20 bg-gradient-to-br from-[#1B365D] via-[#6929C4] to-[#4C1D95] py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <Reveal>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-12 backdrop-blur-xl">
              <CheckCircle2 className="mx-auto size-16 text-emerald-400" />
              <h2 className="mt-6 font-display text-3xl font-bold text-cream">You&apos;re registered!</h2>
              <p className="mt-4 text-lg text-cream/70">
                Welcome to Qiskit Fall Fest 2026 at NC A&T. We&apos;ll send event details to your email as we get closer.
              </p>
              <p className="mt-6 text-sm text-cream/50">See you at the quantum revolution 🚀</p>
            </div>
          </Reveal>
        </div>
      </section>
    )
  }

  return (
    <section id="register" className="scroll-mt-20 bg-gradient-to-br from-[#1B365D] via-[#6929C4] to-[#4C1D95] py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-[#FF006B]">
            Register
          </p>
          <h2 className="mt-3 text-balance font-display text-2xl font-bold text-cream sm:text-4xl">
            Claim your spot at Fall Fest 2026
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-cream/70">
            Free to attend. Pick the format that works for you — both come with the full Qiskit experience.
          </p>
        </Reveal>

        {/* Attendance format selector */}
        <Reveal className="mt-10">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                setFormat('in-person')
                setTimeout(() => document.getElementById('reg-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
              }}
              className={`group relative flex cursor-pointer flex-col items-center rounded-2xl border p-6 text-center transition-all duration-300 ${
                format === 'in-person'
                  ? 'border-[#FF006B] bg-white/10 shadow-[0_0_30px_-5px_rgba(255,0,107,0.3)]'
                  : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
              }`}
            >
              <MapPin className={`size-8 ${format === 'in-person' ? 'text-[#FF006B]' : 'text-cream/60'}`} />
              <h3 className="mt-3 font-display text-lg font-bold text-cream">In-Person</h3>
              <p className="mt-1 text-sm text-cream/60">Greensboro, NC</p>
              <ul className="mt-4 space-y-1 text-left text-xs text-cream/50">
                <li>• Hands-on lab access with mentors</li>
                <li>• Face-to-face networking & swag</li>
                <li>• Compete on-site with your team</li>
              </ul>
              <p className="mt-4 text-xs text-cream/40 group-hover:text-cream/70 transition-colors">↑ Tap to select</p>
            </button>

            <button
              type="button"
              onClick={() => {
                setFormat('virtual')
                setTimeout(() => document.getElementById('reg-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
              }}
              className={`group relative flex cursor-pointer flex-col items-center rounded-2xl border p-6 text-center transition-all duration-300 ${
                format === 'virtual'
                  ? 'border-[#0084BD] bg-white/10 shadow-[0_0_30px_-5px_rgba(0,132,189,0.3)]'
                  : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
              }`}
            >
              <Globe className={`size-8 ${format === 'virtual' ? 'text-[#0084BD]' : 'text-cream/60'}`} />
              <h3 className="mt-3 font-display text-lg font-bold text-cream">Virtual</h3>
              <p className="mt-1 text-sm text-cream/60">Join from anywhere</p>
              <ul className="mt-4 space-y-1 text-left text-xs text-cream/50">
                <li>• Live-streamed workshops & talks</li>
                <li>• Cloud access to IBM Quantum</li>
                <li>• Q&amp;A with speakers & mentors</li>
              </ul>
              <p className="mt-4 text-xs text-cream/40 group-hover:text-cream/70 transition-colors">↑ Tap to select</p>
            </button>
          </div>
        </Reveal>

        {/* Registration form */}
        {format && (
          <Reveal className="mt-8">
            <form
              id="reg-form"
              onSubmit={handleSubmit}
              className="scroll-mt-20 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8"
            >
              <input type="hidden" name="attendance_format" value={format} />

              {/* Name row */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-cream/80">
                    First Name *
                  </label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    required
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-cream placeholder-cream/30 outline-none transition-colors focus:border-[#FF006B] focus:ring-1 focus:ring-[#FF006B]/50"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-cream/80">
                    Last Name *
                  </label>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    required
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-cream placeholder-cream/30 outline-none transition-colors focus:border-[#FF006B] focus:ring-1 focus:ring-[#FF006B]/50"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mt-4">
                <label htmlFor="email" className="block text-sm font-medium text-cream/80">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-cream placeholder-cream/30 outline-none transition-colors focus:border-[#FF006B] focus:ring-1 focus:ring-[#FF006B]/50"
                  placeholder="you@university.edu"
                />
              </div>

              {/* Institution */}
              <div className="mt-4">
                <label htmlFor="institution" className="block text-sm font-medium text-cream/80">
                  Institution / University *
                </label>
                <input
                  id="institution"
                  name="institution"
                  type="text"
                  required
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-cream placeholder-cream/30 outline-none transition-colors focus:border-[#FF006B] focus:ring-1 focus:ring-[#FF006B]/50"
                  placeholder="NC A&T State University"
                />
              </div>

              {/* Experience level */}
              <div className="mt-4">
                <label htmlFor="experience_level" className="block text-sm font-medium text-cream/80">
                  Quantum Computing Experience (0 = beginner, 10 = expert) *
                </label>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-xs text-cream/50">0</span>
                  <input
                    id="experience_level"
                    name="experience_level"
                    type="range"
                    min="0"
                    max="10"
                    defaultValue="2"
                    onChange={(e) => {
                      const display = document.getElementById('exp-display')
                      if (display) display.textContent = e.target.value
                    }}
                    className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-white/10 accent-[#FF006B]"
                  />
                  <span className="text-xs text-cream/50">10</span>
                  <span
                    id="exp-display"
                    className="ml-2 flex size-8 items-center justify-center rounded-lg bg-[#FF006B]/20 font-display text-sm font-bold text-[#FF006B]"
                  >
                    2
                  </span>
                </div>
              </div>

              {/* In-person only fields */}
              {format === 'in-person' && (
                <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-medium text-[#FF006B]">In-Person Attendee Details</p>
                  <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-medium text-cream/70">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-cream placeholder-cream/30 outline-none focus:border-[#FF006B]"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label htmlFor="dietary_restrictions" className="block text-xs font-medium text-cream/70">
                        Dietary Restrictions
                      </label>
                      <input
                        id="dietary_restrictions"
                        name="dietary_restrictions"
                        type="text"
                        className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-cream placeholder-cream/30 outline-none focus:border-[#FF006B]"
                        placeholder="Vegetarian, allergies, etc."
                      />
                    </div>
                    <div>
                      <label htmlFor="emergency_contact_name" className="block text-xs font-medium text-cream/70">
                        Emergency Contact Name
                      </label>
                      <input
                        id="emergency_contact_name"
                        name="emergency_contact_name"
                        type="text"
                        className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-cream placeholder-cream/30 outline-none focus:border-[#FF006B]"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="emergency_contact_phone" className="block text-xs font-medium text-cream/70">
                        Emergency Contact Phone
                      </label>
                      <input
                        id="emergency_contact_phone"
                        name="emergency_contact_phone"
                        type="tel"
                        className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-cream placeholder-cream/30 outline-none focus:border-[#FF006B]"
                        placeholder="+1 (555) 987-6543"
                      />
                    </div>
                  </div>

                  {/* Hackathon interest — in-person only (required) */}
                  <div className="mt-4">
                    <label htmlFor="hackathon_interest" className="block text-xs font-medium text-cream/70">
                      Would you like to participate in the hackathon? *
                    </label>
                    <select
                      id="hackathon_interest"
                      name="hackathon_interest"
                      required
                      onInvalid={(e) => e.currentTarget.setCustomValidity('Verify Hackathon Attendance')}
                      onChange={(e) => e.currentTarget.setCustomValidity('')}
                      className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-cream outline-none focus:border-[#FF006B]"
                    >
                      <option value="" className="bg-[#1B365D]">Select...</option>
                      <option value="yes" className="bg-[#1B365D]">Yes — count me in</option>
                      <option value="maybe" className="bg-[#1B365D]">Maybe / still deciding</option>
                      <option value="no" className="bg-[#1B365D]">No — just attending sessions</option>
                    </select>
                    <p className="mt-1 text-xs text-cream/40">
                      Beginner-friendly, no experience needed. This just helps us plan groups.
                    </p>
                  </div>
                </div>
              )}

              {/* Optional fields */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="how_heard" className="block text-sm font-medium text-cream/80">
                    How did you hear about us?
                  </label>
                  <select
                    id="how_heard"
                    name="how_heard"
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-cream outline-none transition-colors focus:border-[#FF006B]"
                  >
                    <option value="" className="bg-[#1B365D]">Select...</option>
                    <option value="social_media" className="bg-[#1B365D]">Social Media</option>
                    <option value="friend" className="bg-[#1B365D]">Friend / Classmate</option>
                    <option value="professor" className="bg-[#1B365D]">Professor / Faculty</option>
                    <option value="email" className="bg-[#1B365D]">Email / Newsletter</option>
                    <option value="campus_poster" className="bg-[#1B365D]">Campus Poster / Flyer</option>
                    <option value="ibm_qiskit" className="bg-[#1B365D]">IBM / Qiskit Community</option>
                    <option value="other" className="bg-[#1B365D]">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-cream/80">
                    Primary Interest
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-cream outline-none transition-colors focus:border-[#FF006B]"
                  >
                    <option value="" className="bg-[#1B365D]">Select...</option>
                    <option value="learning" className="bg-[#1B365D]">Learning Quantum Computing</option>
                    <option value="qiskit" className="bg-[#1B365D]">Hands-on Qiskit Programming</option>
                    <option value="hackathon" className="bg-[#1B365D]">Hackathon / Competition</option>
                    <option value="networking" className="bg-[#1B365D]">Networking & Career</option>
                    <option value="research" className="bg-[#1B365D]">Research Opportunities</option>
                    <option value="teaching" className="bg-[#1B365D]">Teaching / Mentoring</option>
                    <option value="curiosity" className="bg-[#1B365D]">Just Curious!</option>
                  </select>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  <AlertCircle className="size-4 shrink-0" />
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF006B] px-8 py-4 font-display font-semibold text-white shadow-lg shadow-[#FF006B]/25 transition-all duration-200 hover:bg-[#E0005F] hover:shadow-xl hover:shadow-[#FF006B]/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Registering...
                  </>
                ) : (
                  `Register — ${format === 'in-person' ? 'In-Person' : 'Virtual'}`
                )}
              </button>

              <p className="mt-4 text-center text-xs text-cream/40">
                By registering you agree to our code of conduct. We&apos;ll only use your info for event communications.
              </p>
            </form>
          </Reveal>
        )}

        {/* What You'll Get */}
        <Reveal className="mt-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#FF006B]/15 text-[#FF006B]">
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </span>
              <div>
                <h4 className="font-display font-bold text-cream">Certificate</h4>
                <p className="mt-1 text-sm text-cream/60">A shareable certificate of completion.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#6929C4]/15 text-[#6929C4]">
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </span>
              <div>
                <h4 className="font-display font-bold text-cream">Knowledge & Skills</h4>
                <p className="mt-1 text-sm text-cream/60">Real, applied quantum programming experience.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#0084BD]/15 text-[#0084BD]">
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </span>
              <div>
                <h4 className="font-display font-bold text-cream">Networking</h4>
                <p className="mt-1 text-sm text-cream/60">Connections across the quantum community.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
