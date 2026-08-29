import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: Request) {
  try {
    const payload = await request.json()

    // Validate hackathon_interest for in-person registrants (server-side guard).
    // Virtual registrants don't see the field, so null is allowed for them.
    if (payload.attendance_format === 'in-person') {
      const allowed = ['yes', 'maybe', 'no']
      if (!allowed.includes(payload.hackathon_interest)) {
        return NextResponse.json(
          { error: 'Please select a hackathon participation option.' },
          { status: 400 }
        )
      }
    }

    // Insert into Supabase
    const { error: dbError } = await supabase.from('registrations').insert(payload)

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
