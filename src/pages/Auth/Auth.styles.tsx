import { theme } from "@/styles";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const StyledPage = styled(Box)({
  display: "flex",
  height: "100vh",
  width: "100vw",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.primary[400],
});

export const ContentWrapper = styled(Box)({
  display: "flex",
  flexDirection: "row",
  overflow: "hidden",
  gap: "40px",
  backgroundColor: theme.palette.common.white,
  padding: "40px",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "10px",
  height: "50vh",
  minWidth: "500px",
});

export const StyledDivider = styled(Box)({
  width: "1px",
  height: "40vh",
  backgroundColor: theme.palette.primary[800],
});
