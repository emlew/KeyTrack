import { TextField } from "@mui/material";
import { Drawer } from "../Drawer";
import { useDrawer } from "@/hooks";
import { useState } from "react";
import { StyledDetails, StyledDrawerContent } from "./AddEventDrawer.styles";
import { AddShifts } from "../AddShifts";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useCreateEvent } from "@/hooks/useCreateEvent";

export const AddEventDrawer: React.FC = () => {
  const { closeDrawer } = useDrawer();
  const { mutate } = useCreateEvent();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState<Dayjs | null>(dayjs());

  const handleConfirm = () => {
    mutate({
      description,
      location,
      name,
      time: time?.toString(),
    });
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
        <AddShifts date={dayjs(time)} />
      </StyledDrawerContent>
    </Drawer>
  );
};

export default AddEventDrawer;
