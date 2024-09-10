import { useSupabaseClient } from "@/hooks";

export const HomePage: React.FC = () => {
  const supabase = useSupabaseClient();

  const logout = async () => {
    // TODO handle sign in and sign out errors
    // const { error } = await supabase.auth.signOut();
    await supabase.auth.signOut();
  };

  return (
    <>
      <h1>Home Page</h1>
      <button onClick={logout}>Log out</button>
    </>
  );
};
