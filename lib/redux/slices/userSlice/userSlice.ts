import { SettingsFormType } from "@/app/(site)/protected/settings/SettingsForm";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: UserSliceState = {
  trelloId: "",
  settings: {
    testsEnabled: false,
    medsEnabled: false,
    statusEnabled: false,
    personalityEnabled: false,
    castrationEnabled: false,
  },
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTrelloId: (state, action: PayloadAction<string>) => {
      state.trelloId = action.payload;
    },
    changeSettings: (
      state,
      action: PayloadAction<SettingsFormType>
    ) => {
      state.settings = action.payload;
    },
    setLoading: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isLoading = action.payload;
    },
  },
});

export interface UserSliceState {
  trelloId: string;
  settings: SettingsFormType;
  isLoading: boolean;
}
