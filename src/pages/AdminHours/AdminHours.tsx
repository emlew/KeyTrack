import { ApproveHoursDrawer } from "@/components";
import { useDrawer } from "@/hooks";
import { Card, Typography, Button } from "@mui/material";

export const AdminHours: React.FC = () => {
  const { openDrawer } = useDrawer();

  return (
    <Card>
      <Typography variant="h6">Approve Hours</Typography>
      <Button
        variant="contained"
        onClick={() => openDrawer(<ApproveHoursDrawer />)}
      >
        Approve
      </Button>
    </Card>
  );
};
