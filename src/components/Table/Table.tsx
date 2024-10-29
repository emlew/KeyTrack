import { ReactNode } from "react";
import {
  StyledTable,
  StyledTableEmpty,
  StyledTableHeadCell,
} from "./Table.styles";
import { Table as MuiTable, TableHead, TableRow } from "@mui/material";

export const Table: React.FC<{
  children?: ReactNode;
  columnNames?: string[];
  isEmpty?: boolean;
}> = ({ children, columnNames, isEmpty }) => {
  return (
    <StyledTable>
      <MuiTable stickyHeader>
        <TableHead>
          <TableRow>
            {columnNames?.map((c, i) => (
              <StyledTableHeadCell align={i == 0 ? undefined : "right"} key={c}>
                {c}
              </StyledTableHeadCell>
            ))}
          </TableRow>
        </TableHead>
        {children}
      </MuiTable>
      {isEmpty && (
        <StyledTableEmpty>No data to show at this time.</StyledTableEmpty>
      )}
    </StyledTable>
  );
};

export default Table;
