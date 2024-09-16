import { useSupabaseClient, useUserData } from "@/hooks";
import { Button, Typography } from "@mui/material";

export const HomePage: React.FC = () => {
  const supabase = useSupabaseClient();
  const user = useUserData();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error(error);
  };

  return (
    <>
      <Typography>Home Page</Typography>
      {user && <Typography>{"Hello " + user.email}</Typography>}
      <Button variant="contained" onClick={logout}>
        Log out
      </Button>
    </>
  );
};
