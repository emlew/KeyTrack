import { createClient } from "@/utils";

const client = createClient();

const {
  data: { user },
} = await client.auth.getUser();

export const useUserData = () => {
  return user;
};
