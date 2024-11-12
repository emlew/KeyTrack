import { theme } from "@/styles";
import styled from "@emotion/styled";
import { TableCell, TableContainer, Typography } from "@mui/material";

export const StyledTable = styled(TableContainer)({
  borderRadius: "4px",
  border: `1px solid ${theme.palette.primary[800]}`,
  boxShadow: "none",
  width: "100%",
  maxHeight: "100%",
  alignSelf: "stretch",
});

export const StyledTableHeadCell = styled(TableCell)({
  backgroundColor: theme.palette.primary[400],
  color: theme.palette.common.white,
});

export const StyledTableEmpty = styled(Typography)({
  width: "100%",
  textAlign: "center",
  padding: "20px",
});
