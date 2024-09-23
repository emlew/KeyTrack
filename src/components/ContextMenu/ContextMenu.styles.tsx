import { theme } from "@/styles";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const StyledNavBarItem = styled(Box)({
  display: "flex",
  width: "40px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: theme.palette.common.white,
});
