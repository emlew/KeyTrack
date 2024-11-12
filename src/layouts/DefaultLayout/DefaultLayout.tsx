import { NavBar } from "@/components";
import { Outlet } from "react-router-dom";
import { StyledContent } from "./DefaultLayout.styles";
import { useDrawer, useModal, useSnackbar } from "@/hooks";

export const DefaultLayout: React.FC = () => {
  const { snackbar } = useSnackbar();
  const { drawer } = useDrawer();
  const { modal } = useModal();

  return (
    <>
      <NavBar />
      <StyledContent>
        {snackbar}
        {modal}
        {drawer}
        <Outlet />
      </StyledContent>
    </>
  );
};
