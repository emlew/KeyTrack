import { theme } from "@/styles";
import styled from "@emotion/styled";
import { TableCell, TableContainer, TableRow } from "@mui/material";

export const StyledTable = styled(TableContainer)({
  borderRadius: "4px",
  border: `1px solid ${theme.palette.primary[800]}`,
  boxShadow: "none",
  width: "60vw",
});

export const StyledTableHeadRow = styled(TableRow)({
  backgroundColor: theme.palette.primary[400],
});

export const StyledTableHeadCell = styled(TableCell)({
  color: theme.palette.common.white,
});
