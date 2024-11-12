import { Button, Card, TextField, Typography } from "@mui/material";

export const AdminReports: React.FC = () => {
  return (
    <Card>
      <Typography variant="h6">Generate Report</Typography>
      <TextField variant="outlined" label="Dates" />
      <Button variant="contained" disabled>
        Generate
      </Button>
    </Card>
  );
};
