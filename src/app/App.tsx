import { useState, useEffect } from "react";
import Auth from "../Auth";
import { Session } from "@supabase/supabase-js";
import { AppRouter } from "./AppRouter";
import { BrowserRouter as Router } from "react-router-dom";
import { useSupabaseClient } from "@/hooks";
import { Box } from "@mui/material";

export const App: React.FC = () => {
  const supabase = useSupabaseClient();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Box>
      {!session ? (
        <Auth />
      ) : (
        <Router>
          <AppRouter />
        </Router>
      )}
    </Box>
  );
};

export default App;
