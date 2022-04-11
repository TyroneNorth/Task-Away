import { createClient } from '@supabase/supabase-js'

const options = {
  schema: 'public',
  headers: { 'x-my-custom-header': 'my-app-name' },
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true
}

const supabase = createClient('https://daiojeiqjcemshacqzet.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhaW9qZWlxamNlbXNoYWNxemV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk2MDAwMjksImV4cCI6MTk2NTE3NjAyOX0.RcJ1Wi2akt-aHoDuhzxN7eCxMZiVQdcXcVZRjbtXCHQ', options,)

export default supabase;
