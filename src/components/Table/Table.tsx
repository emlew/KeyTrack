import { ReactNode } from "react";
import {
  StyledLoaderBox,
  StyledTable,
  StyledTableEmpty,
  StyledTableHeadCell,
} from "./Table.styles";
import {
  CircularProgress,
  Table as MuiTable,
  TableHead,
  TableRow,
} from "@mui/material";

export const Table: React.FC<{
  children?: ReactNode;
  columnNames?: string[];
  isEmpty?: boolean;
  isLoading?: boolean;
}> = ({ children, columnNames, isEmpty, isLoading }) => {
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
        {!isLoading && children}
      </MuiTable>
      {isLoading && (
        <StyledLoaderBox>
          <CircularProgress />
        </StyledLoaderBox>
      )}
      {isEmpty && (
        <StyledTableEmpty>No data to show at this time.</StyledTableEmpty>
      )}
    </StyledTable>
  );
};

export default Table;
