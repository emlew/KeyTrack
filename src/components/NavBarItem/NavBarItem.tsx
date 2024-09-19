import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { StyledNavBarItem } from "./NavBarItem.styles";
import { Link } from "react-router-dom";

export const NavBarItem: React.FC<{
  icon: ReactNode;
  text: string;
  link: string;
}> = ({ icon, text, link }) => {
  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <StyledNavBarItem>
        {icon}
        <Typography variant="caption">{text}</Typography>
      </StyledNavBarItem>
    </Link>
  );
};

export default NavBarItem;
