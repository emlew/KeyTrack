import { AddEventDrawer, EventDrawer, EventListing } from "@/components";
import { useDrawer, useEventsData } from "@/hooks";
import { StyledCard, StyledEventsTitle, StyledPage } from "./Events.styles";
import {
  Button,
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
import { AddRounded } from "@mui/icons-material";

export const Events: React.FC = () => {
  const { data: events } = useEventsData();
  const { openDrawer } = useDrawer();

  const [monthFilter, setMonthFilter] = useState(dayjs().month().toString());

  const filteredEvents = useMemo(() => {
    return events?.data?.filter(
      (e) => dayjs(e.time).month().toString() == monthFilter
    );
  }, [events, monthFilter]);

  const signedEvents = useMemo(() => {
    return events?.data?.filter((e) => e.workers.length > 0);
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
          <Button
            variant="contained"
            onClick={() => openDrawer(<AddEventDrawer />)}
            endIcon={<AddRounded />}
          >
            Create Event
          </Button>
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
