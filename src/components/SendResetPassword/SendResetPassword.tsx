import { Button, TextField, Typography } from "@mui/material";
import { StyledLoginForm } from "./SendResetPassword.styles";
import { useState } from "react";
import { useSupabase } from "@/hooks";

export const SendResetPassword: React.FC<{ onToLogin: () => void }> = ({
  onToLogin,
}) => {
  const [email, setEmail] = useState("");
  const [helperText, setHelperText] = useState("");
  const [hasError, setHasError] = useState(false);
  const supabase = useSupabase();

  const sendPasswordResetEmail = async () => {
    // TODO: adjust confirmation url in supabase to direct to reset page
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      setHelperText(error.message);
      setHasError(true);
    } else {
      setHelperText("Reset link sent! Check your email.");
    }
  };

  return (
    <StyledLoginForm>
      <Typography variant="h4" sx={{ paddingBottom: "20px" }}>
        Reset Password
      </Typography>
      <TextField
        variant="outlined"
        label="Email"
        value={email}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(event.target.value);
        }}
        error={hasError}
        helperText={helperText}
      />
      <Button variant={"contained"} onClick={sendPasswordResetEmail}>
        Send Reset Email
      </Button>
      <Button onClick={onToLogin}>Back to Login</Button>
    </StyledLoginForm>
  );
};

export default SendResetPassword;
