import { NavBar } from "@/components";
import { Outlet } from "react-router-dom";
import { StyledContent } from "./DefaultLayout.styles";

export const DefaultLayout: React.FC = () => {
  return (
    <>
      <NavBar />
      <StyledContent>
        <Outlet />
      </StyledContent>
    </>
  );
};
