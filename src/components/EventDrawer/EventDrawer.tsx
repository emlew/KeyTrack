import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { Drawer } from "../Drawer";
import { useShiftsData, useSupabase } from "@/hooks";
import dayjs from "dayjs";
import { Shift } from "@/api";

type SignUp = "sign-up" | "edit";

export const EventDrawer: React.FC<{ variant: SignUp; id: number }> = ({
  variant,
  id,
}) => {
  const supabase = useSupabase();
  const { data: event, isLoading } = useShiftsData(supabase, id);

  return (
    <Drawer
      title={variant === "sign-up" ? "Sign Up" : "Edit Sign Up"}
      onConfirm={() => {}}
    >
      {!isLoading && (
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
                      disabled={s.workers_needed == (s.worker_ids?.length ?? 0)}
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
