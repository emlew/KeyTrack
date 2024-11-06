import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const StyledContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "24px",
  paddingTop: "0px",
  gap: "40px",
  width: "40vw",
  height: "20vh",
});

export const StyledButtonBox = styled(Box)({
  display: "flex",
  width: "100%",
  justifyContent: "flex-end",
  gap: "20px",
  alignSelf: "stretch",
  padding: "24px",
});
