import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const StyledPage = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "60vh",
  gap: "20px",
});

export const StyledTableBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  maxHeight: "100%",
  gap: "20px",
  flexShrink: "1",
  alignItems: "flex-start",
});

export const StyledChoices = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  height: "100%",
  width: "50%",
});
