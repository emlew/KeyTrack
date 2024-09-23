import styled from "@emotion/styled";
import { Box, DialogContent, Typography } from "@mui/material";

export const StyledPage = styled(Box)({
  display: "inline-flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "40px",
  width: "100%",
});

export const StyledInfo = styled(Box)({
  display: "flex",
  padding: "40px",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "40px",
});

export const StyledDialogContent = styled(DialogContent)({
  display: "flex",
  flexDirection: "column",
});

export const StyledShowPassword = styled(Typography)({
  cursor: "pointer",
});
