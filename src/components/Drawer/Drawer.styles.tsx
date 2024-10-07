import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";

export const StyledDrawerLayout = styled(Box)({
  display: "flex",
  padding: "40px",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "flex-start",
  height: "100%",
  flexShrink: 0,
});

export const StyledDrawerContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  paddingTop: "40px",
  gap: "40px",
  minWidth: "30vw",
});

export const StyledButtonBox = styled(Box)({
  display: "flex",
  height: "72px",
  width: "100%",
  alignItems: "center",
  gap: "20px",
  alignSelf: "stretch",
});

export const StyledButton = styled(Button)({
  display: "flex",
  flex: "1 0 0",
});
