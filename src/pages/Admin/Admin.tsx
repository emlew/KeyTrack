import { Title } from "@/components";
import {
  StyledContent,
  StyledLink,
  StyledMenu,
  StyledPage,
} from "./Admin.styles";
import { Outlet } from "react-router-dom";

export const Admin: React.FC = () => {
  return (
    <StyledPage>
      <Title title="Administrator View" />
      <StyledContent>
        <StyledMenu>
          <StyledLink to={"/admin"}>Users</StyledLink>
          <StyledLink to={"/admin/hours"}>Hours</StyledLink>
          <StyledLink to={"/admin/reports"}>Reports</StyledLink>
        </StyledMenu>
        <StyledPage>
          <Outlet />
        </StyledPage>
      </StyledContent>
    </StyledPage>
  );
};
