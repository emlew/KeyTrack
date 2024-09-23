import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

export const StyledLoginForm = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  alignItems: "flex-start",
});

export const StyledShowPassword = styled(Typography)({
  cursor: "pointer",
});

export const StyledWelcome = styled(Typography)({
  paddingBottom: "20px",
});

export const StyledPasswordBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
});
