import { TextField } from "@mui/material";
import { Drawer } from "../Drawer";
import { useCreateEvent, useDrawer } from "@/hooks";
import { useState } from "react";
import { StyledDetails, StyledDrawerContent } from "./AddEventDrawer.styles";
import { AddShifts } from "../AddShifts";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { ShiftCreate } from "@/api";

const combineDateTimes = (date: Dayjs, shifts: ShiftCreate[]) => {
  const updatedShifts: ShiftCreate[] = [];
  for (let s of shifts) {
    updatedShifts.push({
      event_id: -1,
      start_time: dayjs(
        `${date.format("YYYY-MM-DD")}T${dayjs(s.start_time).format("HH:mm:ss")}`
      ).toISOString(),
      end_time: dayjs(
        `${date.format("YYYY-MM-DD")}T${dayjs(s.end_time).format("HH:mm:ss")}`
      ).toISOString(),
      workers_needed: s.workers_needed,
      is_full: false,
    });
  }
  const startTime = updatedShifts.sort((a, b) =>
    dayjs(a.start_time).diff(b.start_time)
  )[0].start_time;

  return { updatedShifts, startTime };
};

export const AddEventDrawer: React.FC = () => {
  const { closeDrawer } = useDrawer();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState<Dayjs | null>(dayjs());
  const [shifts, setShifts] = useState<ShiftCreate[]>([]);
  const { mutate: createEvent } = useCreateEvent(
    { description, location, name, time: time?.toISOString() },
    shifts
  );

  const onAddShift = (shift: ShiftCreate) => {
    setShifts((prev) => {
      return [...prev, shift];
    });
  };

  const onDeleteShift = (id: number) => {
    setShifts((prev) => {
      return [...prev.slice(0, id), ...prev.slice(id + 1)];
    });
  };

  const handleConfirm = async () => {
    if (!time) return null;
    const { updatedShifts, startTime } = combineDateTimes(time, shifts);
    setTime(dayjs(startTime));
    setShifts(updatedShifts);
    await createEvent();
    closeDrawer();
  };

  return (
    <Drawer title="Create Event" onConfirm={handleConfirm}>
      <StyledDrawerContent>
        <StyledDetails>
          <TextField
            variant="outlined"
            label="Event Title"
            sx={{ width: "45%" }}
            required
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <TextField
            variant="outlined"
            label="Event Description"
            sx={{ width: "45%" }}
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
          <TextField
            variant="outlined"
            label="Event Location"
            sx={{ width: "45%" }}
            value={location}
            onChange={(event) => {
              setLocation(event.target.value);
            }}
          />
          <DatePicker
            label="Date"
            sx={{ width: "45%" }}
            value={dayjs(time)}
            onChange={(event) => setTime(event)}
          />
        </StyledDetails>
        <AddShifts
          onAddShift={onAddShift}
          onDeleteShift={onDeleteShift}
          shifts={shifts}
        />
      </StyledDrawerContent>
    </Drawer>
  );
};

export default AddEventDrawer;
