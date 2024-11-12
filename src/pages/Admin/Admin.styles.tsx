import { theme } from "@/styles";
import styled from "@emotion/styled";
import { Box, Card } from "@mui/material";
import { Link } from "react-router-dom";

export const StyledPage = styled(Box)({
  display: "inline-flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "40px",
  width: "100%",
  height: "100%",
});

export const StyledContent = styled(Box)({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  gap: "40px",
  height: "100%",
  alignItems: "flex-start",
});

export const StyledMenu = styled(Card)({
  backgroundColor: theme.palette.primary[50],
  minWidth: "15vw",
  border: "none",
});

export const StyledLink = styled(Link)({
  textDecoration: "none",
  color: theme.palette.primary.main,
});
