import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { AppRouter } from "./AppRouter";
import { BrowserRouter as Router } from "react-router-dom";
import { useSupabase } from "@/hooks";
import { Auth } from "@/pages";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const App: React.FC = () => {
  const supabase = useSupabase();
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
    <>
      {session ? (
        <>
          <Router>
            <AppRouter />
          </Router>
          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default App;
