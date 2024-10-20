import { useState } from "react";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import { AddRounded, DeleteRounded } from "@mui/icons-material";
import { Shift } from "@/api";
import {
  StyledShift,
  StyledShiftContainer,
  StyledShiftRow,
  StyledShiftsTable,
} from "./AddShifts.styles";
import { theme } from "@/styles";

export const AddShifts: React.FC<{ date: Dayjs }> = ({ date }) => {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [start, setStart] = useState<Dayjs | null>(dayjs());
  const [end, setEnd] = useState<Dayjs | null>(dayjs());
  const [workers, setWorkers] = useState<number | undefined>(undefined);

  const handleAddShift = () => {
    if (start != null && end != null && workers != null) {
      setShifts((prev) => {
        return [
          ...prev,
          {
            end_time: end?.toString(),
            start_time: start?.toString(),
            workers_needed: workers,
            created_at: null,
            event_id: null,
            id: shifts.length,
            is_full: null,
          },
        ];
      });
      setStart(dayjs());
      setEnd(dayjs());
      setWorkers(0);
    }
  };

  const handleDeleteShift = (id: number) => {
    setShifts((prev) => {
      return [...prev.slice(0, id), ...prev.slice(id + 1)];
    });
  };

  return (
    <StyledShiftContainer>
      <StyledShift
        sx={{
          borderBottom:
            shifts.length > 0
              ? `1px solid ${theme.palette.primary[800]}`
              : "none",
        }}
      >
        <TimePicker
          label="Start Time"
          sx={{ width: "45%" }}
          value={dayjs(start)}
          onChange={(event) => setStart(event)}
        />
        <TimePicker
          label="End Time"
          sx={{ width: "45%" }}
          value={dayjs(end)}
          onChange={(event) => setEnd(event)}
        />
        <TextField
          label="Workers Needed"
          type="number"
          value={workers}
          onChange={(event) => setWorkers(parseInt(event.target.value))}
        />
        <Button
          variant="contained"
          endIcon={<AddRounded />}
          onClick={handleAddShift}
        >
          Add Shift
        </Button>{" "}
      </StyledShift>
      <StyledShiftsTable>
        {shifts.map((s, i) => (
          <StyledShiftRow
            sx={{
              backgroundColor:
                i % 2 == 0
                  ? theme.palette.primary[100]
                  : theme.palette.primary[50],
            }}
          >
            <Typography sx={{ width: "40%" }}>
              {dayjs(s.start_time).format("h:mm A") +
                " - " +
                dayjs(s.end_time).format("h:mm A")}
            </Typography>
            <Typography sx={{ width: "20%" }}>
              {s.workers_needed +
                (s.workers_needed && s.workers_needed > 1
                  ? " workers"
                  : " worker")}
            </Typography>
            <IconButton
              sx={{ width: "20%" }}
              onClick={() => handleDeleteShift(i)}
            >
              <DeleteRounded />
            </IconButton>
          </StyledShiftRow>
        ))}
      </StyledShiftsTable>
    </StyledShiftContainer>
  );
};

export default AddShifts;
