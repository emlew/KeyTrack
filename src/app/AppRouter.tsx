import { DefaultLayout } from "@/layouts";
import { Account, Admin, Events, Home, Hours } from "@/pages";
import { Navigate, Route, Routes } from "react-router-dom";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="hours" element={<Hours />} />
        <Route path="events" element={<Events />} />
        <Route path="account" element={<Account />} />
        <Route path="admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
