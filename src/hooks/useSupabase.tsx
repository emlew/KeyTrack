import { TypedSupabaseClient } from "@/utils/types";
import { createClient } from "@supabase/supabase-js";
import { useMemo } from "react";

let client: TypedSupabaseClient | undefined;

const getSupabaseBrowserClient = () => {
  if (client) {
    return client;
  }

  client = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
    {
      global: {
        headers: { Authorization: import.meta.env.VITE_SUPABASE_ANON_KEY },
      },
    }
  );

  return client;
};

export const useSupabase = () => {
  return useMemo(getSupabaseBrowserClient, []);
};
