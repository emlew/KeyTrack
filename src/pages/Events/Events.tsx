import { EventDrawer, EventListing } from "@/components";
import { useDrawer, useEventsData, useSupabase, useWorkersData } from "@/hooks";
import { StyledCard, StyledEventsTitle, StyledPage } from "./Events.styles";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { months } from "@/utils";

const isSignedUp = (userShifts: number[], eventShifts: number[]) => {
  const intersection = eventShifts.filter((s) => userShifts.includes(s));
  return intersection.length > 0;
};

export const Events: React.FC = () => {
  const supabase = useSupabase();
  const { data: events } = useEventsData(supabase);
  const { openDrawer } = useDrawer();
  const { data: userShifts } = useWorkersData(supabase);

  const [monthFilter, setMonthFilter] = useState(dayjs().month().toString());
  const filteredEvents = useMemo(() => {
    return events?.data?.filter(
      (e) => dayjs(e.time).month().toString() == monthFilter
    );
  }, [events, monthFilter]);

  const signedEvents = useMemo(() => {
    const shiftIds = userShifts?.map((s) => s.id);
    return events?.data?.filter((e) =>
      isSignedUp(
        shiftIds ?? [],
        e.shifts.map((s) => s.id)
      )
    );
  }, [events]);

  const handleFilterChange = (event: SelectChangeEvent) => {
    setMonthFilter(event.target.value);
  };

  return (
    <StyledPage>
      <StyledCard>
        <Typography variant="h4">Your Events</Typography>
        {signedEvents?.map((e) => (
          <EventListing
            key={e.id}
            event={e}
            buttonText="Edit"
            buttonCallback={(id) => {
              openDrawer(<EventDrawer variant="edit" id={id} />);
            }}
          />
        ))}
      </StyledCard>
      <StyledCard>
        <StyledEventsTitle>
          <Typography variant="h4">All Events</Typography>
          <FormControl id="month-filter-label" size="small">
            <InputLabel id="month-filter-label">Month</InputLabel>
            <Select
              labelId="month-filter-label"
              id="month-filter"
              value={monthFilter}
              label="Month"
              onChange={(event) => handleFilterChange(event)}
            >
              {months.map((m, i) => (
                <MenuItem key={m} value={i}>
                  {m}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </StyledEventsTitle>
        {filteredEvents?.map((e) => (
          <EventListing
            key={e.id}
            event={e}
            buttonText="Sign Up"
            buttonCallback={(id) => {
              openDrawer(<EventDrawer variant="sign-up" id={id} />);
            }}
          />
        ))}
      </StyledCard>
    </StyledPage>
  );
};
