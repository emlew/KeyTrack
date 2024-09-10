import { DefaultLayout } from "@/layouts";
import { HomePage } from "@/pages";
import { Navigate, Route, Routes } from "react-router-dom";

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
