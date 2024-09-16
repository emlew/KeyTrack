import { Button, Typography } from "@mui/material";
import { useSupabaseClient } from "./hooks";
import logo from "/KeyTrackLogo.svg";

export const Auth: React.FC = () => {
  const supabase = useSupabaseClient();

  const login = async () => {
    // TODO handle sign in and sign out errors
    // const { error } = await supabase.auth.signInWithOAuth({
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <>
      <img src={logo} alt="KeyTrack logo" />
      <Typography>Login page</Typography>
      <Button variant={"contained"} onClick={login}>
        Login
      </Button>
    </>
  );
};

export default Auth;
