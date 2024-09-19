import { useUserData } from "@/hooks";
import { Typography } from "@mui/material";
import { StyledPage } from "./Home.styles";

export const Home: React.FC = () => {
  const { data: user } = useUserData();

  return (
    <StyledPage>
      <Typography>Home Page</Typography>
      {user && <Typography>{"Hello " + user.email}</Typography>}
    </StyledPage>
  );
};
