import { theme } from "@/styles";
import styled from "@emotion/styled";
import { Card } from "@mui/material";

export const StyledCard = styled(Card)({
  borderRadius: "4px",
  border: `1px solid ${theme.palette.primary[800]}`,
  boxShadow: "none",
  display: "inline-flex",
  padding: "40px",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "20px",
});
