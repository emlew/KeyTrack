import { useSupabase } from "@/hooks";
import { Button, Typography } from "@mui/material";

export const Account: React.FC = () => {
  const supabase = useSupabase();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error(error);
  };
  return (
    <>
      <Typography>Account Page</Typography>
      <Button variant="contained" onClick={logout}>
        Log out
      </Button>
    </>
  );
};
