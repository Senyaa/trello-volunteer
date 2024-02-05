interface Shift {
  id: string;
  started: Date;
  finished: Date | null;
  shiftType: string;
  description: string | null;
}
