import { StyledCard } from "./BigStatistic.styles";
import { Typography } from "@mui/material";

export const BigStatistic: React.FC<{
  text: string;
  value: number;
}> = ({ text, value }) => {
  return (
    <StyledCard>
      <Typography variant="h3">{value.toString()}</Typography>
      <Typography>{text}</Typography>
    </StyledCard>
  );
};

export default BigStatistic;
