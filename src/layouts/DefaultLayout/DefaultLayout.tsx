import { NavBar } from "@/components";
import { Outlet } from "react-router-dom";
import { StyledContent } from "./DefaultLayout.styles";
import { useSnackbar } from "@/hooks";

export const DefaultLayout: React.FC = () => {
  const { snackbar } = useSnackbar();

  return (
    <>
      <NavBar />
      <StyledContent>
        {snackbar}
        <Outlet />
      </StyledContent>
    </>
  );
};
