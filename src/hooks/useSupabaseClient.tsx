import { createClient } from "@/utils";

const client = createClient();

export const useSupabaseClient = () => client;
