import { ReactNode } from "react";
import {
  StyledTable,
  StyledTableHeadCell,
  StyledTableHeadRow,
} from "./Table.styles";
import { Table as MuiTable, TableHead } from "@mui/material";

export const Table: React.FC<{
  children?: ReactNode;
  columnNames?: string[];
}> = ({ children, columnNames }) => {
  return (
    <StyledTable>
      <MuiTable>
        <TableHead>
          <StyledTableHeadRow>
            {columnNames?.map((c, i) => (
              <StyledTableHeadCell align={i == 0 ? undefined : "right"} key={c}>
                {c}
              </StyledTableHeadCell>
            ))}
          </StyledTableHeadRow>
        </TableHead>
        {children}
      </MuiTable>
    </StyledTable>
  );
};

export default Table;
