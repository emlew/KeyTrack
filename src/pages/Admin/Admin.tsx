import { Card, Table, Title } from "@/components";
import { useAdminSupabase, useAllUsersData } from "@/hooks";
import {
  TextField,
  Button,
  Typography,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { StyledContent, StyledPage } from "./Admin.styles";

export const Admin: React.FC = () => {
  const [invitee, setInvitee] = useState("");
  const [hasError, setHasError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const createUser = useAdminSupabase();
  const { data: data } = useAllUsersData();

  const create = async () => {
    // TODO: add bulk account creation option
    const { error } = await createUser.createUser({
      email: invitee,
      password: "KeyClub24",
    });
    if (error) {
      setHasError(true);
      setHelperText(error.message);
    } else {
      setHelperText(`User ${invitee} successfully created!`);
      setHasError(false);
      // TODO: add snackbars for feedback
    }
  };

  return (
    <StyledPage>
      <Title title="Administrator View" />
      <StyledContent>
        <Card>
          <Typography variant="h6">Create a User</Typography>
          <TextField
            variant="outlined"
            label="User Email"
            value={invitee}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setInvitee(event.target.value);
            }}
            error={hasError}
            helperText={helperText}
          />
          <Button variant={"contained"} onClick={create}>
            Create
          </Button>
        </Card>
        <Table columnNames={["Email", "Role"]}>
          <TableBody>
            {data &&
              data.users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    {user.email}
                  </TableCell>
                  <TableCell align="right">
                    {user.role === "kt_admin" ? "Admin" : "Member"}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </StyledContent>
    </StyledPage>
  );
};
