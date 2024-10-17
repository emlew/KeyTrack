import { useSupabase, useUserData } from "@/hooks";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  StyledDialogContent,
  StyledInfo,
  StyledPage,
  StyledShowPassword,
} from "./Account.styles";
import { Title } from "@/components";

export const Account: React.FC = () => {
  const supabase = useSupabase();
  const { data: user } = useUserData();
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error(error);
  };

  const open = () => {
    setIsResettingPassword(true);
  };

  const close = () => {
    setIsResettingPassword(false);
  };

  const changePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) {
      console.log(error); // TODO: deal with error messages
    }
    close();
    // TODO: add success snackbar
    // TODO: use drawer for password change
  };

  return (
    <StyledPage>
      <Dialog
        open={isResettingPassword}
        onClose={close}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const newPassword = formJson.password;
            changePassword(newPassword);
            close();
          },
        }}
      >
        <Card>
          <DialogTitle>Change Password</DialogTitle>
          <StyledDialogContent>
            <TextField
              autoFocus
              required
              id="name"
              name="password"
              label="New Password"
              variant="outlined"
              type={showPassword ? undefined : "password"}
            />
            <StyledShowPassword
              variant="caption"
              onClick={() => setShowPassword(!showPassword)}
            >
              {(showPassword ? "Hide" : "Show") + " Password"}
            </StyledShowPassword>
          </StyledDialogContent>
          <DialogActions>
            <Button onClick={close}>Cancel</Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </DialogActions>
        </Card>
      </Dialog>
      <Title
        title="Your Account"
        buttonAction={logout}
        buttonText="Log out"
        buttonVariant="contained"
      />
      <StyledInfo>
        <Box>
          <Typography variant="caption">Email</Typography>
          <Typography>{user?.email}</Typography>
        </Box>
        <Box>
          <Typography variant="caption">Status</Typography>
          <Typography>
            {user?.role === "kt_admin" ? "Administrator" : "Member"}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption">Password</Typography>
          <Typography>*********</Typography>
          <Button variant="contained" onClick={open}>
            Change Password
          </Button>
        </Box>
      </StyledInfo>
    </StyledPage>
  );
};
