import { useGenAdminReport } from "@/hooks";
import { Button, Card, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useState } from "react";

export const AdminReports: React.FC = () => {
  const generate = useGenAdminReport();

  const [start, setStart] = useState(dayjs().subtract(1, "year"));

  return (
    <Card>
      <Typography variant="h6">Generate Report</Typography>
      <DatePicker
        label="Date"
        value={dayjs(start)}
        onChange={(event) => setStart(dayjs(event))}
      />
      <Button variant="contained" onClick={() => generate(start)}>
        Generate
      </Button>
    </Card>
  );
};
