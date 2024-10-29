import { useState } from "react";
import { Button, Card, TextField, Typography } from "@mui/material";
import { useAdminSupabase, useInvalidateQueries, useSnackbar } from "@/hooks";

export const AddUser: React.FC = () => {
  const [invitee, setInvitee] = useState("");
  const adminClient = useAdminSupabase();
  const invalidateQueries = useInvalidateQueries("users");
  const { addSnackbar } = useSnackbar();

  const create = async () => {
    // TODO: add bulk account creation option
    const { error } = await adminClient.createUser({
      email: invitee,
      password: "KeyClub24",
      email_confirm: true,
    });
    if (error) {
      addSnackbar("Warning: User Creation Failed");
    }
    invalidateQueries();
    addSnackbar("User Created Successfully");
  };

  return (
    <Card>
      <Typography variant="h6">Create a User</Typography>
      <TextField
        variant="outlined"
        label="User Email"
        value={invitee}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setInvitee(event.target.value);
        }}
      />
      <Button variant="contained" onClick={create}>
        Create
      </Button>
    </Card>
  );
};

export default AddUser;
