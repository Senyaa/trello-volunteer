import { SettingsFormType } from "@/app/(site)/protected/settings/SettingsForm";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: UserSliceState = {
  trelloId: "",
  currentShift: {
    id: "",
    type: "cats",
    done: 0,
    all: 0,
  },
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
      state.currentShift.id = action.payload;
    },
    setAnimalsToDo: (state, action: PayloadAction<number>) => {
      state.currentShift.all = action.payload;
    },
    setAnimalsDone: (state, action: PayloadAction<number>) => {
      state.currentShift.done = action.payload;
    },
    checkAnimal: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.currentShift.done++;
      } else {
        state.currentShift.done--;
      }
    },
    changeSettings: (state, action: PayloadAction<SettingsFormType>) => {
      state.settings = action.payload;
    },
  },
});

export interface UserSliceState {
  trelloId: string;
  shiftId: string;
  settings: SettingsFormType;
  currentShift: CurrentShift;
}

interface CurrentShift {
  id: string;
  type: "cats" | "dogs";
  done: number;
  all: number;
}
