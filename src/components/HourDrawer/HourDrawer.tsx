import {
  Box,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Drawer } from "../Drawer";
import { useCreateHours, useDrawer, useEventsData } from "@/hooks";
import { HourCreate } from "@/api";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { StyledDrawerContent } from "./HourDrawer.styles";

export const HourDrawer: React.FC = () => {
  const { closeDrawer } = useDrawer();
  const { data: events } = useEventsData();
  const { mutate: createHour } = useCreateHours();
  const [hour, setHour] = useState<HourCreate>({
    date_completed: dayjs().toString(),
    event_id: null,
    has_event: false,
    hours: 0,
    shift_id: null,
  });

  const handleAddEvent = (event: SelectChangeEvent) => {
    const isAdding = event.target.value === "Yes";
    if (isAdding && events?.data && events?.data?.length > 0) {
      setHour((prev) => ({
        ...prev,
        has_event: isAdding,
        event_id: events?.data?.at(0)?.id ?? null,
        shift_id: events?.data?.at(0)?.shifts?.at(0)?.id ?? null,
      }));
      return;
    }
    if (!isAdding) {
      setHour((prev) => ({
        ...prev,
        has_event: isAdding,
        event_id: null,
      }));
    }
  };

  const handleEventChange = (event: SelectChangeEvent<number | null>) => {
    setHour((prev) => ({
      ...prev,
      event_id:
        typeof event.target.value == "number" ? event.target.value : null,
      shift_id:
        events?.data?.find((e) => e.id == event.target.value)?.shifts.at(0)
          ?.id ?? null,
    }));
  };

  const handleShiftChange = (event: SelectChangeEvent<number | null>) => {
    const shift = events?.data
      ?.find((e) => e.id == hour.event_id)
      ?.shifts.find((s) => s.id == event.target.value);
    setHour((prev) => ({
      ...prev,
      shift_id:
        typeof event.target.value == "number" ? event.target.value : null,
      date_completed: shift?.end_time ?? prev.date_completed,
      hours: dayjs(shift?.end_time).diff(shift?.start_time, "hour"),
    }));
  };

  const handleConfirm = () => {
    createHour(hour);
    closeDrawer();
  };

  return (
    <Drawer title="Log Hours" onConfirm={handleConfirm}>
      <FormGroup>
        <StyledDrawerContent>
          <TextField
            variant="outlined"
            label="Hours"
            type="number"
            value={hour.hours.toString()}
            onChange={(event) => {
              setHour((prev) => ({
                ...prev,
                hours:
                  parseInt(event.target.value).toString() == "NaN"
                    ? 0
                    : parseInt(event.target.value),
              }));
            }}
          />
          <DatePicker
            label="Date"
            value={dayjs(hour.date_completed)}
            onChange={(event) =>
              setHour((prev) => ({
                ...prev,
                date_completed: event?.toString() ?? "",
              }))
            }
          />
          <Box>
            <InputLabel id="has-event-label">
              Was this a Key Club Event?
            </InputLabel>
            <Select
              labelId="has-event-label"
              id="has-event"
              value={hour.has_event ? "Yes" : "No"}
              onChange={(event) => handleAddEvent(event)}
            >
              {["Yes", "No"].map((o) => (
                <MenuItem key={o} value={o}>
                  {o}
                </MenuItem>
              ))}
            </Select>
          </Box>
          {hour.has_event && (
            <StyledDrawerContent>
              <Box>
                <InputLabel id="event-label">Event</InputLabel>
                <Select
                  labelId="kc-event-label"
                  id="kc-event"
                  value={hour.event_id}
                  onChange={(event) => handleEventChange(event)}
                >
                  {events?.data?.map((e) => (
                    <MenuItem key={e.id} value={e.id}>
                      {e.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box>
                <InputLabel id="shift-label">Shift</InputLabel>
                <Select
                  labelId="shift-label"
                  id="shift"
                  value={hour.shift_id}
                  onChange={(event) => handleShiftChange(event)}
                >
                  {hour.event_id &&
                    events?.data
                      ?.find((e) => e.id == hour.event_id)
                      ?.shifts.map((s) => (
                        <MenuItem key={s.id} value={s.id}>
                          {dayjs(s.start_time).format("h:mm A") +
                            " - " +
                            dayjs(s.end_time).format("h:mm A")}
                        </MenuItem>
                      ))}
                </Select>
              </Box>
            </StyledDrawerContent>
          )}
        </StyledDrawerContent>
      </FormGroup>
    </Drawer>
  );
};

export default HourDrawer;
