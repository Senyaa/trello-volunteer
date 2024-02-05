import { SettingsFormType } from "@/app/(site)/protected/settings/SettingsForm";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: UserSliceState = {
  trelloId: "",
  shiftId: "",
  settings: {
    testsEnabled: false,
    medsEnabled: false,
    statusEnabled: false,
    personalityEnabled: false,
    castrationEnabled: false,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTrelloId: (state, action: PayloadAction<string>) => {
      state.trelloId = action.payload;
    },
    setShiftId: (state, action: PayloadAction<string>) => {
      state.shiftId = action.payload;
    },
    changeSettings: (
      state,
      action: PayloadAction<SettingsFormType>
    ) => {
      state.settings = action.payload;
    },
  },
});

export interface UserSliceState {
  trelloId: string;
  shiftId: string;
  settings: SettingsFormType;
}
