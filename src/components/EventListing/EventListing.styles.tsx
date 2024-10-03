import { theme } from "@/styles";
import styled from "@emotion/styled";
import { Card } from "@mui/material";

export const StyledCard = styled(Card)({
  display: "flex",
  justifyContent: "space-between",
  borderRadius: "4px",
  boxShadow: "none",
  padding: "20px",
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "stretch",
  gap: "20px",
  backgroundColor: theme.palette.primary[400],
  color: theme.palette.common.white,
  borderWidth: 0,
});
