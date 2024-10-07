import { NavBar } from "@/components";
import { Outlet } from "react-router-dom";
import { StyledContent } from "./DefaultLayout.styles";
import { useDrawer, useSnackbar } from "@/hooks";

export const DefaultLayout: React.FC = () => {
  const { snackbar } = useSnackbar();
  const { drawer } = useDrawer();

  return (
    <>
      <NavBar />
      <StyledContent>
        {snackbar}
        {drawer}
        <Outlet />
      </StyledContent>
    </>
  );
};
