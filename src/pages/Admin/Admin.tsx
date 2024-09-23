import { Card, ContextMenu, Table, Title } from "@/components";
import {
  useAdminSupabase,
  useAllUsersData,
  useInvalidateQueries,
} from "@/hooks";
import {
  TextField,
  Button,
  Typography,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { StyledActions, StyledContent, StyledPage } from "./Admin.styles";
import AdminIcon from "@mui/icons-material/SupervisorAccountRounded";
import DeleteIcon from "@mui/icons-material/DeleteRounded";

export const Admin: React.FC = () => {
  const [invitee, setInvitee] = useState("");
  const [hasError, setHasError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const adminClient = useAdminSupabase();
  const { data: data } = useAllUsersData();
  const invalidateQueries = useInvalidateQueries("users");

  const create = async () => {
    // TODO: add bulk account creation option
    const { error } = await adminClient.createUser({
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

  const assignAdminRole = async (uid: string) => {
    const { error } = await adminClient.updateUserById(uid, {
      role: "kt_admin",
    });
    if (error) {
      console.log(error.message);
    }
    invalidateQueries();
  };

  const removeAdminRole = async (uid: string) => {
    const { error } = await adminClient.updateUserById(uid, {
      role: "authenticated",
    });
    if (error) {
      console.log(error.message);
    }
    invalidateQueries();
  };

  const deleteUser = async (uid: string) => {
    const { error } = await adminClient.deleteUser(uid);
    if (error) {
      console.log(error.message);
    }
  };

  const ContextMenuItems = [
    {
      title: "Make Admin",
      icon: <AdminIcon />,
      callback: assignAdminRole,
    },
    {
      title: "Remove Admin",
      icon: <AdminIcon />,
      callback: removeAdminRole,
    },
    {
      title: "Delete",
      icon: <DeleteIcon color="warning" />,
      callback: deleteUser,
      isDestructive: true,
    },
  ];

  return (
    <StyledPage>
      <Title title="Administrator View" />
      <StyledContent>
        <StyledActions>
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
            <Button variant="contained" onClick={create}>
              Create
            </Button>
          </Card>
          <Card>
            <Typography variant="h6">Generate Report</Typography>
            <TextField variant="outlined" label="Dates" />
            <Button variant="contained" disabled>
              Generate
            </Button>
          </Card>
        </StyledActions>
        <Table columnNames={["Email", "Role", ""]}>
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
                  <TableCell align="center">
                    <ContextMenu
                      id={user.id}
                      items={ContextMenuItems.filter((i) => {
                        if (user.role === "kt_admin")
                          return i.title !== "Make Admin";
                        else return i.title != "Remove Admin";
                      })}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </StyledContent>
    </StyledPage>
  );
};
