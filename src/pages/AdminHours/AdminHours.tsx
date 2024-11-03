import { Hour } from "@/api";
import { HoursTable } from "@/components";
import { useEventsData, useHoursData } from "@/hooks";
import {
  InputLabel,
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  Button,
} from "@mui/material";
import { useState } from "react";
import { StyledChoices, StyledPage, StyledTableBox } from "./AdminHours.styles";

export const AdminHours: React.FC = () => {
  const { data: hours } = useHoursData(true);
  const { data: events } = useEventsData();
  const [event, setEvent] = useState<number>(-1);
  const [approved, setApproved] = useState<Hour[]>([]);
  const [disproved, setDisproved] = useState<Hour[]>([]);

  const handleUndo = (hour: Hour) => {
    setApproved((prev) => prev.filter((h) => h != hour));
    setDisproved((prev) => prev.filter((h) => h != hour));
  };

  const filterHours = (hour: Hour) => {
    if (hour.is_approved || approved.includes(hour) || disproved.includes(hour))
      return false;
    if (event == -1) return !hour.has_event;
    return hour.event_id == event;
  };
  const handleFilterChange = (event: SelectChangeEvent<number>) => {
    typeof event.target.value == "number"
      ? setEvent(event.target.value)
      : setEvent(parseInt(event.target.value));
    setApproved([]);
    setDisproved([]);
  };

  return (
    <StyledPage>
      <Box>
        <InputLabel id="event-label">Event</InputLabel>
        <Select
          labelId="kc-event-label"
          id="kc-event"
          value={event}
          onChange={(event) => {
            handleFilterChange(event);
          }}
        >
          <MenuItem key={-1} value={-1}>
            No Event
          </MenuItem>
          {events?.data?.map((e) => (
            <MenuItem key={e.id} value={e.id}>
              {e.name}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <StyledTableBox>
        <HoursTable
          hours={hours?.filter((h) => filterHours(h)) ?? []}
          handleApprove={(h) => setApproved((prev) => [...prev, h])}
          handleDeny={(h) => setDisproved((prev) => [...prev, h])}
        />
        <StyledChoices>
          <Typography>Hours to Approve</Typography>
          <HoursTable
            hours={approved}
            hasUndoButton={true}
            handleUndo={(h) => handleUndo(h)}
          />
          <Typography>Hours to Deny</Typography>
          <HoursTable
            hours={disproved}
            hasUndoButton={true}
            handleUndo={(h) => handleUndo(h)}
          />
          <Button variant="contained" sx={{ alignSelf: "flex-start" }}>
            Save Changes
          </Button>
        </StyledChoices>
      </StyledTableBox>
    </StyledPage>
  );
};
