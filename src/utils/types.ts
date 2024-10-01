import { SupabaseClient } from '@supabase/supabase-js'
import { Database } from '@/utils/database.types'

export type TypedSupabaseClient = SupabaseClient<Database>