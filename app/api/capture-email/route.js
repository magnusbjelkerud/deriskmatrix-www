import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key || url === 'your_supabase_url_here') return null
  return createClient(url, key)
}

export async function POST(request) {
  try {
    const { analysisId, email, marketingConsent } = await request.json()
    const supabase = getSupabase()
    if (!supabase) return NextResponse.json({ error: 'Service not configured' }, { status: 503 })
    await supabase.from('analyzer_email_captures').insert({
      analysis_id: analysisId,
      email,
      marketing_consent: !!marketingConsent,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
