import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const StyledPage = styled(Box)({
  display: "inline-flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "40px",
  width: "100%",
});

export const StyledContent = styled(Box)({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  gap: "40px",
  alignContent: "flex-start",
});

export const StyledActions = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  width: "70vw",
  alignItems: "flex-start",
});

export const StyledActionsRow = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: "20px",
});
