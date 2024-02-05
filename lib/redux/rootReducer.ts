import { AppSlice, userSlice } from "./slices";

export const reducer = {
  user: userSlice.reducer,
  app: AppSlice.reducer,
};
