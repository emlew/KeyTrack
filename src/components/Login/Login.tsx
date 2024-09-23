import { Button, TextField } from "@mui/material";
import {
  StyledLoginForm,
  StyledPasswordBox,
  StyledShowPassword,
  StyledWelcome,
} from "./Login.styles";
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
      <StyledWelcome variant="h4">Welcome Back!</StyledWelcome>
      <TextField
        variant="outlined"
        label="Email"
        value={email}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(event.target.value);
        }}
      />
      <StyledPasswordBox>
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
        <StyledShowPassword
          variant="caption"
          onClick={() => setShowPassword(!showPassword)}
          sx={{ cursor: "pointer" }}
        >
          {(showPassword ? "Hide" : "Show") + " Password"}
        </StyledShowPassword>
      </StyledPasswordBox>
      <Button variant={"contained"} onClick={login}>
        Login
      </Button>
      {/* TODO: Add ability to reset password */}
      {/* <Button onClick={onReset}>Reset Password</Button> */}
    </StyledLoginForm>
  );
};

export default Login;
