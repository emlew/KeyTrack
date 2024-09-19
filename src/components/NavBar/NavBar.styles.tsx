import { theme } from "@/styles";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const StyledNavBar = styled(Box)({
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "72px",
  top: 0,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.primary[800],
  gap: "20px",
  flexShrink: "0",
});
