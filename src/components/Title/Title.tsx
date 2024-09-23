import { Typography, Button } from "@mui/material";
import { StyledTitle } from "./Title.styles";

export const Title: React.FC<{
  title: string;
  buttonText?: string;
  buttonAction?: () => void;
  buttonVariant?: "text" | "contained" | "outlined";
}> = ({ title, buttonText, buttonAction, buttonVariant }) => {
  return (
    <StyledTitle>
      <Typography variant="h3">{title}</Typography>
      {buttonText && (
        <Button variant={buttonVariant} onClick={buttonAction}>
          {buttonText}
        </Button>
      )}
    </StyledTitle>
  );
};

export default Title;
