import { theme } from "@/styles";
import styled from "@emotion/styled";
import { Card } from "@mui/material";

export const StyledCard = styled(Card)({
  display: "flex",
  borderRadius: "4px",
  boxShadow: "none",
  padding: "40px 80px",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
  backgroundColor: theme.palette.primary[400],
  color: theme.palette.common.white,
  borderWidth: 0,
  flex: 1,
  textAlign: "center",
});
