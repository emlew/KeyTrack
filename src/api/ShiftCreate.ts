export type ShiftCreate = {
  created_at?: string;
  end_time?: string | null;
  event_id: number;
  id?: number;
  is_full?: boolean | null;
  start_time?: string | null;
  workers_needed?: number | null;
};
