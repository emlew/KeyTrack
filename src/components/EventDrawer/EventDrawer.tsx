import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { Drawer } from "../Drawer";
import {
  useDrawer,
  useInvalidateQueries,
  useShiftsData,
  useWorkersByEventData,
} from "@/hooks";
import dayjs from "dayjs";
import { Shift } from "@/api";
import { useState } from "react";
import { useSyncWorkers } from "@/hooks/useSyncWorkers";

type SignUp = "sign-up" | "edit";

export const EventDrawer: React.FC<{ variant: SignUp; id: number }> = ({
  variant,
  id,
}) => {
  const { closeDrawer } = useDrawer();
  const invalidateEvents = useInvalidateQueries("events");
  const { data: event, isLoading } = useShiftsData(id);
  const { data: shifts, isLoading: isLoadingWorkers } =
    useWorkersByEventData(id);

  const [assignedShifts, setAssignedShifts] = useState<number[]>(
    shifts?.map((s) => s.shift) ?? []
  );

  const { mutate } = useSyncWorkers(
    shifts?.map((s) => s.shift) ?? [],
    assignedShifts
  );

  const handleShiftChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAssignedShifts((prev) => {
      if (prev.includes(+event.target.name))
        return prev.filter((i) => i != +event.target.name);
      else return prev.concat(+event.target.name);
    });
  };

  const handleConfirm = () => {
    console.log(assignedShifts);
    mutate();
    invalidateEvents();
    closeDrawer();
  };

  return (
    <Drawer
      title={variant === "sign-up" ? "Sign Up" : "Edit Sign Up"}
      onConfirm={handleConfirm}
    >
      {!isLoading && !isLoadingWorkers && (
        <>
          <Box>
            <Typography variant="h5">{event?.name}</Typography>
            <Typography variant="h5">
              {dayjs(event?.time).format("MMMM D, YYYY h:mm A")}
            </Typography>
            <Typography variant="h5">{event?.location}</Typography>
          </Box>
          <FormGroup>
            {event?.shifts
              .sort((a, b) => dayjs(a.start_time).diff(b.start_time))
              .map((s: Shift) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      name={s.id.toString()}
                      disabled={
                        (s.is_full &&
                          !shifts?.map((s) => s.shift).includes(s.id)) ??
                        true
                      }
                      defaultChecked={shifts
                        ?.map((s) => s.shift)
                        .includes(s.id)}
                      onChange={handleShiftChange}
                    />
                  }
                  key={s.id}
                  label={
                    dayjs(s.start_time).format("MMMM D, YYYY h:mm A") +
                    " - " +
                    dayjs(s.end_time).format("h:mm A")
                  }
                />
              ))}
          </FormGroup>
        </>
      )}
    </Drawer>
  );
};

export default EventDrawer;
