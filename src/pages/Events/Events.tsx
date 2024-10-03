import { EventListing } from "@/components";
import { useEventsData, useSupabase } from "@/hooks";
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
import { useState } from "react";
import { months } from "@/utils";

export const Events: React.FC = () => {
  const supabase = useSupabase();
  const { data: events } = useEventsData(supabase);

  const [monthFilter, setMonthFilter] = useState(dayjs().month().toString());
  const [filteredEvents, setFilteredEvents] = useState(
    events?.data?.filter((e) => dayjs(e.time).month() == dayjs().month())
  );

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilteredEvents(
      events?.data?.filter(
        (e) => dayjs(e.time).month().toString() == event.target.value
      )
    );
    setMonthFilter(event.target.value);
  };

  return (
    <StyledPage>
      <StyledCard>
        <Typography variant="h4">Your Events</Typography>
        {events?.data?.map((e) => (
          <EventListing
            key={e.id}
            event={e}
            buttonText="Edit"
            buttonCallback={(id) => {
              console.log(id);
              // todo: add drawer and edit ability
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
              console.log(id);
              // todo: add drawer and sign up ability
            }}
          />
        ))}
      </StyledCard>
    </StyledPage>
  );
};
