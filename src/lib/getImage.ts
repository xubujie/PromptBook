import { supabase } from '../lib/supabase'

async function getImageUrl(bucket: string, path: string): Promise<string | null> {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)

  if (error) {
    console.error('Error fetching image URL:', error.message)
    return null
  }

  return publicURL
}
