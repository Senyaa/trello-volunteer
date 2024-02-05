import { createSlice } from "@reduxjs/toolkit";

const initialState: AppSliceState = {
  didLoadStore: false,
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    appLoaded: (state) => {
      state.didLoadStore = true;
    },
  },
});

export interface AppSliceState {
  didLoadStore: boolean;
}
