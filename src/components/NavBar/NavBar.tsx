import { NavBarItem } from "../NavBarItem";
import { StyledNavBar } from "./NavBar.styles";
import HomeIcon from "@mui/icons-material/HomeRounded";
import TimeIcon from "@mui/icons-material/AccessTimeFilledRounded";
import CalendarIcon from "@mui/icons-material/CalendarMonthRounded";
import PersonIcon from "@mui/icons-material/PersonRounded";
import AdminIcon from "@mui/icons-material/SupervisorAccountRounded";
import { useUserData } from "@/hooks";
import { Profile } from "@/api";

export const NavBar: React.FC = () => {
  const { data: user } = useUserData();

  return (
    <StyledNavBar position="static">
      <NavBarItem icon={<HomeIcon color="secondary" />} text="Home" link="/" />
      <NavBarItem
        icon={<TimeIcon color="secondary" />}
        text="Hours"
        link="/hours"
      />
      <NavBarItem
        icon={<CalendarIcon color="secondary" />}
        text="Events"
        link="/events"
      />
      <NavBarItem
        icon={<PersonIcon color="secondary" />}
        text="Account"
        link="/account"
      />
      {(user as Profile)?.is_admin && (
        <NavBarItem
          icon={<AdminIcon color="secondary" />}
          text="Admin"
          link="/admin"
        />
      )}
    </StyledNavBar>
  );
};

export default NavBar;
