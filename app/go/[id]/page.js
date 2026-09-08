import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const DEFAULT_DESTINATION = 'https://app.deriskmatrix.com/register'

export default async function GoPage({ params }) {
  const { id } = await params

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (supabaseUrl && serviceKey && id) {
    try {
      const supabase = createClient(supabaseUrl, serviceKey)

      const { data: post } = await supabase
        .from('content_posts')
        .select('cta_url, click_count')
        .eq('id', id)
        .single()

      if (post) {
        await supabase
          .from('content_posts')
          .update({ click_count: (post.click_count || 0) + 1 })
          .eq('id', id)

        redirect(post.cta_url || DEFAULT_DESTINATION)
      }
    } catch { /* fall through to default */ }
  }

  redirect(DEFAULT_DESTINATION)
}
