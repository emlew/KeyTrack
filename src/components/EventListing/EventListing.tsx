import { Event } from "@/api";
import { StyledCard } from "./EventListing.styles";
import { Box, Button, Typography } from "@mui/material";
import dayjs from 'dayjs'

export const EventListing: React.FC<{
  event: Event;
  buttonText: string;
  buttonCallback: (id: number) => void;
}> = ({ event, buttonText, buttonCallback }) => {
  return (
    <StyledCard>
      <Box>
      <Typography variant="h5">{event.name}</Typography>
      <Typography>{dayjs(event.time).format("MMMM D, YYYY h:mm A")}</Typography>
      <Typography>{event.location}</Typography>
      </Box>
      <Button variant="contained" onClick={() => buttonCallback(event.id)}>
        {buttonText}
      </Button>
    </StyledCard>
  );
};

export default EventListing;
