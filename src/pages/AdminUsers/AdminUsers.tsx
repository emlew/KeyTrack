import { ContextMenu, Table } from "@/components";
import {
  useAdminSupabase,
  useInvalidateQueries,
  useSnackbar,
  useUpdateUserRole,
  useUserData,
} from "@/hooks";
import {
  Button,
  Card,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AdminIcon from "@mui/icons-material/SupervisorAccountRounded";
import DeleteIcon from "@mui/icons-material/DeleteRounded";
import { Profile } from "@/api";
import { StyledContent } from "./AdminUsers.styles";
import { useState } from "react";

export const AdminUsers: React.FC = () => {
  const adminClient = useAdminSupabase();
  const { data: data, isLoading } = useUserData(true);
  const { mutate } = useUpdateUserRole();
  const invalidateQueries = useInvalidateQueries("users");
  const { addSnackbar } = useSnackbar();
  const [invitee, setInvitee] = useState("");

  const assignAdminRole = async (email: string) => {
    mutate({ email, is_admin: true });
  };

  const removeAdminRole = async (email: string) => {
    mutate({ email, is_admin: false });
  };

  const deleteUser = async (uid: string) => {
    const { error } = await adminClient.deleteUser(uid);
    if (error) {
      addSnackbar("Warning: User Deletion Failed");
    }
    invalidateQueries();
    addSnackbar("User Deleted Successfully");
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

  const create = async () => {
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
    <StyledContent>
      <Card sx={{ minWidth: "240px" }}>
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
      <Table columnNames={["Email", "Role", ""]} isLoading={isLoading}>
        <TableBody>
          {data &&
            (data as Profile[]).map((user) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  {user.email}
                </TableCell>
                <TableCell align="right">
                  {user.is_admin ? "Admin" : "Member"}
                </TableCell>
                <TableCell align="center">
                  <ContextMenu
                    id={user.email}
                    items={ContextMenuItems.filter((i) => {
                      if (user.is_admin) return i.title !== "Make Admin";
                      else return i.title != "Remove Admin";
                    })}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </StyledContent>
  );
};
