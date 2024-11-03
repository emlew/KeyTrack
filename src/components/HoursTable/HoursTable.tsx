import { Hour } from "@/api";
import { Table } from "@/components";
import { IconButton, TableBody, TableCell, TableRow } from "@mui/material";
import CloseIcon from "@mui/icons-material/CloseRounded";
import CheckIcon from "@mui/icons-material/CheckRounded";
import UndoIcon from "@mui/icons-material/UndoRounded";
import { StyledButtonCell } from "./HoursTable.styles";

export const HoursTable: React.FC<{
  hours: Hour[];
  hasUndoButton?: boolean;
  handleUndo?: (h: Hour) => void;
  handleApprove?: (h: Hour) => void;
  handleDeny?: (h: Hour) => void;
}> = ({
  hours,
  hasUndoButton = false,
  handleUndo = (_) => {},
  handleApprove = (_) => {},
  handleDeny = (_) => {},
}) => {
  return (
    <Table columnNames={["Email", "Hours", ""]} isEmpty={hours.length == 0}>
      <TableBody>
        {hours.map((h) => (
          <TableRow key={h.id}>
            <TableCell component="th" scope="row">
              {h.email.substring(0, h.email.indexOf("@"))}
            </TableCell>
            <TableCell align="right">{h.hours}</TableCell>
            <TableCell align="center">
              <StyledButtonCell>
                {hasUndoButton ? (
                  <IconButton
                    onClick={() => {
                      handleUndo(h);
                    }}
                  >
                    <UndoIcon />
                  </IconButton>
                ) : (
                  <>
                    <IconButton onClick={() => handleDeny(h)}>
                      <CloseIcon />
                    </IconButton>
                    <IconButton onClick={() => handleApprove(h)}>
                      <CheckIcon />
                    </IconButton>
                  </>
                )}
              </StyledButtonCell>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
