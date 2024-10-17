import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/utils'

export type TypedSupabaseClient = SupabaseClient<Database>