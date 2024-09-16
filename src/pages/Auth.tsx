import { Button, TextField, Typography } from "@mui/material";
import { useSupabaseClient } from "../hooks";
import logo from "/LogoWithText.svg";
import {
  ContentWrapper,
  StyledDivider,
  StyledLoginForm,
  StyledPage,
} from "./Auth.styles";
import { useState } from "react";

export const Auth: React.FC = () => {
  const [name, setName] = useState("");

  const supabase = useSupabaseClient();

  const checkEmail = async () => {
    let { data, error } = await supabase.rpc("is_email_exist", {
      email_input: name,
    });
    if (error) {
      console.error(error);
      return false;
    } else return data;
  };

  const login = async () => {
    if (!checkEmail) return;
    else {
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
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setName(event.target.value);
            }}
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
