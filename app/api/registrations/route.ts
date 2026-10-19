import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key')

  // Simple auth — use a secret key to access the CSV export
  if (key !== process.env.EXPORT_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Server-side only: use the service role key so reads bypass RLS.
  // The anon key must NOT be able to read this table (RLS SELECT is locked to
  // service_role). SUPABASE_SERVICE_ROLE_KEY is server-only — never NEXT_PUBLIC_.
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRoleKey) {
    return NextResponse.json(
      { error: 'Export is not configured.' },
      { status: 500 }
    )
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceRoleKey
  )

  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!data || data.length === 0) {
    return new Response('No registrations yet.', { status: 200 })
  }

  // Build CSV
  const headers = Object.keys(data[0])
  const csvRows = [
    headers.join(','),
    ...data.map((row) =>
      headers
        .map((h) => {
          const val = row[h] ?? ''
          // Escape commas and quotes
          const str = String(val).replace(/"/g, '""')
          return str.includes(',') || str.includes('"') || str.includes('\n')
            ? `"${str}"`
            : str
        })
        .join(',')
    ),
  ]

  const csv = csvRows.join('\n')

  return new Response(csv, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="registrations-${new Date().toISOString().split('T')[0]}.csv"`,
    },
  })
}
