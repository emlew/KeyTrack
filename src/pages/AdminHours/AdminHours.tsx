import { Hour } from "@/api";
import { HoursTable } from "@/components";
import { useEventsData, useHoursData, useModal, useUpdateHours } from "@/hooks";
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
import { ApproveHoursModal } from "@/components/ApproveHoursModal";

export const AdminHours: React.FC = () => {
  const { data: hours } = useHoursData(true);
  const { data: events } = useEventsData();
  const [event, setEvent] = useState<number>(-1);
  const [approved, setApproved] = useState<Hour[]>([]);
  const [disproved, setDisproved] = useState<Hour[]>([]);
  const { mutate } = useUpdateHours();
  const { openModal } = useModal();

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

  const saveFn = () => {
    mutate({
      approve: approved.map((h) => h.id),
      deny: disproved.map((h) => h.id),
    });
    setApproved([]);
    setDisproved([]);
  };

  const handleSave = () => {
    openModal(
      <ApproveHoursModal
        approved={approved}
        denied={disproved}
        onSave={saveFn}
      />
    );
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
            variant="green"
          />
          <Typography>Hours to Deny</Typography>
          <HoursTable
            hours={disproved}
            hasUndoButton={true}
            handleUndo={(h) => handleUndo(h)}
            variant="red"
          />
          <Button
            variant="contained"
            sx={{ alignSelf: "flex-start" }}
            onClick={handleSave}
            disabled={approved.length == 0 && disproved.length == 0}
          >
            Save Changes
          </Button>
        </StyledChoices>
      </StyledTableBox>
    </StyledPage>
  );
};
