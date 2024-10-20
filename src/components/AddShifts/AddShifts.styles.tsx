import { theme } from "@/styles";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const StyledShiftContainer = styled(Box)({
  display: "flex",
  borderRadius: "4px",
  border: `1px solid ${theme.palette.primary[800]}`,
  flexDirection: "column",
});

export const StyledShift = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "20px",
  padding: "40px",
  justifyContent: "space-evenly",
});

export const StyledShiftRow = styled(Box)({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-evenly",
});

export const StyledShiftsTable = styled(Box)({
  overflow: "auto",
  maxHeight: "116px"
});
