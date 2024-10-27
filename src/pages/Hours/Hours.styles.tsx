import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const StyledStatsRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "row",
  alignItems: "stretch",
  width: "100%",
  gap: "20px",
});

export const StyledContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "40px",
  alignItems: "flex-start",
  height: "100%"
});

export const StyledButtonRow = styled(Box)({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
});
