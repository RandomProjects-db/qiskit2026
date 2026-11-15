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

    // Require at least one day selected (checkboxes can't be marked `required`).
    const selectedDays = data.getAll('days_attending')
    if (selectedDays.length === 0) {
      setError('Please select at least one day you plan to attend.')
      setLoading(false)
      return
    }

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
      // New fields (item #8) — collected for both in-person and virtual.
      days_attending: data.getAll('days_attending') as string[],
      accessibility_needs: (data.get('accessibility_needs') as string) || null,
      team_matching: data.get('team_matching') === 'on',
      discord_username: (data.get('discord_username') as string) || null,
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
          ? 'JSNN — 2907 East Gate City Blvd, Greensboro, NC 27401'
          : 'Virtual — a join link will be emailed to registered attendees before the event'

        // Map the selected day codes to readable dates for the email.
        const dayLabels: Record<string, string> = {
          day1: 'Thu, Nov 12',
          day2: 'Fri, Nov 13',
          day3: 'Sat, Nov 14',
        }
        const selectedDaysLabel =
          (payload.days_attending || [])
            .map((d) => dayLabels[d])
            .filter(Boolean)
            .join(', ') || 'All three days'

        await emailjs.send(
          'service_8beckth',
          'template_hlv309k',
          {
            email: payload.email,
            first_name: payload.first_name,
            attendance_format: formatLabel,
            location: location,
            event_name: 'Qiskit Fall Fest 2026',
            event_dates: 'November 12–14, 2026 (Thursday–Saturday)',
            days_attending: selectedDaysLabel,
            website: 'https://qiskit-2026.vercel.app',
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
      <section id="register" className="scroll-mt-20 bg-gradient-to-br from-[#1B365D]/80 via-[#6929C4]/80 to-[#4C1D95]/80 py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <Reveal>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-12 backdrop-blur-xl">
              <CheckCircle2 className="mx-auto size-16 text-emerald-400" />
              <h2 className="mt-6 font-display text-3xl font-bold text-cream">You&apos;re registered!</h2>
              <p className="mt-4 text-lg text-cream/85">
                Welcome to Qiskit Fall Fest 2026 at NC A&T. We&apos;ll send event details to your email as we get closer.
              </p>
              <p className="mt-6 text-sm text-cream/85">See you at the quantum revolution 🚀</p>
            </div>
          </Reveal>
        </div>
      </section>
    )
  }

  return (
    <section id="register" className="scroll-mt-20 bg-gradient-to-br from-[#1B365D]/80 via-[#6929C4]/80 to-[#4C1D95]/80 py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <Reveal>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-12 backdrop-blur-xl">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-[#FF006B]">
              Register
            </p>
            <h2 className="mt-3 text-balance font-display text-2xl font-bold text-cream sm:text-4xl">
              Registration is closed
            </h2>
            <p className="mt-4 leading-relaxed text-cream/70">
              Qiskit Fall Fest 2026 has concluded. Thank you to everyone who attended.
            </p>
            <a
              href="https://discord.gg/MVGJmv3AC"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-11 items-center rounded-full border border-white/25 px-6 py-2.5 text-sm font-semibold text-cream transition-colors hover:border-[#00E5FF] hover:text-[#00E5FF]"
            >
              Stay in touch on Discord
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )

}
