import styled from "@emotion/styled";
import { Box, Card } from "@mui/material";

export const StyledPage = styled(Box)({
  display: "inline-flex",
  flexDirection: "row",
  alignItems: "stretch",
  gap: "40px",
  width: "100%",
  height: "100%",
});

export const StyledCard = styled(Card)({
  width: "50%",
});

export const StyledEventsTitle = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  alignSelf: "stretch",
});
