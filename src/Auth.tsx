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
      <div>
        <img src={logo} alt="KeyTrack logo" />
      </div>
      <h1>Login page</h1>
      <button onClick={login}>Login</button>
    </>
  );
};

export default Auth;
