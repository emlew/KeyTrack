import { Button, TextField, Typography } from "@mui/material";
import logo from "/LogoWithText.svg";
import {
  ContentWrapper,
  StyledDivider,
  StyledLoginForm,
  StyledPage,
} from "./Auth.styles";
import { useState } from "react";
import { useSupabaseClient } from "@/hooks";

export const Auth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [hasError, setHasError] = useState(false);
  const supabase = useSupabaseClient();

  const checkEmail = async () => {
    let { data, error } = await supabase.rpc("is_email_exist", {
      email_input: email,
    });
    if (error) {
      console.error(error);
      return false;
    } else return data;
  };

  const login = async () => {
    const hasAccount = await checkEmail();
    if (!hasAccount) {
      setHasError(true);
      return;}
    else {
      setHasError(false);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) console.error(error);
    }
  };

  return (
    <StyledPage>
      <ContentWrapper>
        <img src={logo} alt="KeyTrack logo" />
        <StyledDivider />
        <StyledLoginForm>
          <Typography variant="h4" sx={{ paddingBottom: "20px"}} >Welcome!</Typography>
          <TextField
            variant="outlined"
            label="Email"
            value={email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(event.target.value);
            }}
            error={hasError}
            helperText={hasError ? "No account found for this email." : ""}
          />
          <Button variant={"contained"} onClick={login}>
            Login
          </Button>
        </StyledLoginForm>
      </ContentWrapper>
    </StyledPage>
  );
};

export default Auth;
