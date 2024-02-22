interface Shift {
  id: string;
  started: Date;
  finished: Date | null;
  shiftType: string;
  description: string | null;
}

export interface GuestView {
  userId: string;
  id: string;
  createdAt: Date | null;
  content: unknown;
  endsAt: Date;
}