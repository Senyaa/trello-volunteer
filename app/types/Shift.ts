export interface Shift {
  id: string;
  started: Date | null;
  finished: Date | null;
  shiftType: string | null;
  description: string | null;
}

export interface GuestView {
  userId: string;
  id: string;
  createdAt: Date | null;
  content: unknown;
  endsAt: Date;
}