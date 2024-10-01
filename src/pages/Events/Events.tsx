import { useEventsData, useSupabase } from "@/hooks";

export const Events: React.FC = () => {
  const supabase = useSupabase();
  const { data: events, error, isLoading } = useEventsData(supabase);

  return (
    <>
      <p>Events</p>
      {events?.data?.map((e) => e.name)}
    </>
  );
};
