import { useSupabase } from "@/hooks";
import { TextField, Button } from "@mui/material";
import { useState } from "react";

export const Admin: React.FC = () => {
  const supabase = useSupabase();
  const [invitee, setInvitee] = useState("");
  const [hasError, setHasError] = useState(false);
  const [helperText, setHelperText] = useState("");

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
  );
};
