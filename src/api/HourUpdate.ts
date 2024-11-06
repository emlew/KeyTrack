export type HourUpdate = {
  created_at?: string;
  date_completed?: string | null;
  email?: string;
  event_id?: number | null;
  has_event?: boolean;
  hours?: number;
  id?: number;
  is_approved?: boolean;
  shift_id?: number | null;
};
