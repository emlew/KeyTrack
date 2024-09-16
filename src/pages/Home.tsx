import { useSupabaseClient } from "@/hooks";
import { Button, Typography } from "@mui/material";

export const HomePage: React.FC = () => {
  const supabase = useSupabaseClient();

  const logout = async () => {
    // TODO handle sign in and sign out errors
    // const { error } = await supabase.auth.signOut();
    await supabase.auth.signOut();
  };

  return (
    <>
      <Typography>Home Page</Typography>
      <Button variant="contained" onClick={logout}>
        Log out
      </Button>
    </>
  );
};
