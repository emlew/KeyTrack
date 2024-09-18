import { Box, Button, TextField, Typography } from "@mui/material";
import { StyledLoginForm } from "./Login.styles";
import { useState } from "react";
import { useSupabase } from "@/hooks";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [helperText, setHelperText] = useState("");
  const [hasError, setHasError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const supabase = useSupabase();

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      setHelperText(error.message);
      setHasError(true);
    }
  };

  return (
    <StyledLoginForm>
      <Typography variant="h4" sx={{ paddingBottom: "20px" }}>
        Welcome Back!
      </Typography>
      <TextField
        variant="outlined"
        label="Email"
        value={email}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(event.target.value);
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          variant="outlined"
          label="Password"
          type={showPassword ? undefined : "password"}
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
          error={hasError}
          helperText={helperText}
        />
        <Typography
          variant="caption"
          onClick={() => setShowPassword(!showPassword)}
          sx={{ cursor: "pointer" }}
        >
          {(showPassword ? "Hide" : "Show") + " Password"}
        </Typography>
      </Box>
      <Button variant={"contained"} onClick={login}>
        Login
      </Button>
      {/* TODO: Add ability to reset password */}
      {/* <Button onClick={onReset}>Reset Password</Button> */}
    </StyledLoginForm>
  );
};

export default Login;
