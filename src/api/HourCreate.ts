export type HourCreate = {
  date_completed: string | null;
  event_id: number | null;
  has_event: boolean;
  hours: number;
  shift_id: number | null;
};
