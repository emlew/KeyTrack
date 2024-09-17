import { DefaultLayout, UnauthenticatedLayout } from "@/layouts";
import { Auth, HomePage } from "@/pages";
import { Session } from "@supabase/supabase-js";
import { Navigate, Route, Routes } from "react-router-dom";

export const AppRouter: React.FC<{ session: Session | null }> = ({
  session,
}) => {
  return (
    <Routes>
      {session ? (
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      ) : (
        <Route path="/" element={<UnauthenticatedLayout />}>
          <Route index element={<Auth />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      )}
    </Routes>
  );
};
