import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate hackathon_interest for in-person registrants (server-side guard).
    // Virtual registrants don't see the field, so null is allowed for them.
    if (body.attendance_format === 'in-person') {
      const allowed = ['yes', 'maybe', 'no']
      if (!allowed.includes(body.hackathon_interest)) {
        return NextResponse.json(
          { error: 'Please select a hackathon participation option.' },
          { status: 400 }
        )
      }
    }

    // Require at least one valid day (both formats).
    const validDays = ['day1', 'day2', 'day3']
    const daysAttending = Array.isArray(body.days_attending)
      ? body.days_attending.filter((d: unknown): d is string => typeof d === 'string' && validDays.includes(d))
      : []
    if (daysAttending.length === 0) {
      return NextResponse.json(
        { error: 'Please select at least one day you plan to attend.' },
        { status: 400 }
      )
    }

    // Whitelist the exact columns we insert. Prevents unexpected keys from
    // breaking the insert and keeps the payload aligned with the DB schema.
    const row = {
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      institution: body.institution,
      experience_level: body.experience_level,
      attendance_format: body.attendance_format,
      dietary_restrictions: body.dietary_restrictions ?? null,
      phone: body.phone ?? null,
      emergency_contact_name: body.emergency_contact_name ?? null,
      emergency_contact_phone: body.emergency_contact_phone ?? null,
      how_heard: body.how_heard ?? null,
      interest: body.interest ?? null,
      hackathon_interest: body.hackathon_interest ?? null,
      days_attending: daysAttending,
      accessibility_needs: body.accessibility_needs ?? null,
      team_matching: body.team_matching === true,
      discord_username: body.discord_username ?? null,
    }

    // Insert into Supabase
    const { error: dbError } = await supabase.from('registrations').insert(row)

    if (dbError) {
      if (dbError.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already registered.' },
          { status: 409 }
        )
      }
      return NextResponse.json({ error: 'Registration failed.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Registration error:', err)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
