import { useSupabase, useUserData } from "@/hooks";
import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { redirect } from "react-router-dom";
import { StyledPage } from "./Home.styles";

export const HomePage: React.FC = () => {
  const supabase = useSupabase();
  const [invitee, setInvitee] = useState("");
  const [hasError, setHasError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const { data: user } = useUserData();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error(error);
    redirect("/login");
  };

  const create = async () => {
    const { error } = await supabase.auth.signUp({
      email: invitee,
      password: "KeyClub24",
    });
    if (error) {
      setHasError(true);
      setHelperText(error.message);
    } else {
      setHelperText("Success!");
    }
  };

  const resetCreate = () => {
    setHasError(false);
    setHelperText("");
  };

  return (
    <StyledPage>
      <Typography>Home Page</Typography>
      {user && <Typography>{"Hello " + user.email}</Typography>}
      {user && user.role === "kt_admin" && (
        <>
          <TextField
            variant="outlined"
            label="User"
            value={invitee}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setInvitee(event.target.value);
            }}
            error={hasError}
            helperText={helperText}
          />
          <Button
            variant={"contained"}
            onClick={helperText === "Success!" ? resetCreate : create}
          >
            {helperText === "Success!" ? "Create another user" : "Create"}
          </Button>
        </>
      )}
      <Button variant="contained" onClick={logout}>
        Log out
      </Button>
    </StyledPage>
  );
};
