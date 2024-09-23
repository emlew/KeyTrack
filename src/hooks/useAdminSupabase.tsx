import { createClient } from "@supabase/supabase-js";
import { useMemo } from "react";

const getSupabaseAdminClient = () => {
  const client = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  return client.auth.admin;
};

// Access auth admin api
export const useAdminSupabase = () => {
  return useMemo(getSupabaseAdminClient, []);
};
