import { SettingsFormType } from "@/app/(site)/protected/settings/SettingsForm";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: UserSliceState = {
  trelloId: "",
  userType: "USER",
  currentShift: {
    id: "",
    type: "cats",
    idsDone: [],
    all: 0,
  },
  shiftId: "",
  settings: {
    testsEnabled: false,
    medsEnabled: false,
    statusEnabled: false,
    personalityEnabled: false,
    castrationEnabled: false,
    dogInteractionEnabled: false,
    catInteractionEnabled: false,
    childrenInteractionEnabled: false,
    dewormingEnabled: false,
    healthEnabled: false,
    storyEnabled: false,
    infoForCarerEnabled: false,
    bedEnabled: false,
    walkEnabled: false,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTrelloId: (state, action: PayloadAction<string>) => {
      state.trelloId = action.payload;
    },
    setUserType: (state, action: PayloadAction<"USER" | "ADMIN">) => {
      state.userType = action.payload;
    },
    setShiftId: (state, action: PayloadAction<string>) => {
      state.shiftId = action.payload;
      state.currentShift.id = action.payload;
    },
    setAnimalsToDo: (state, action: PayloadAction<number>) => {
      state.currentShift.all = action.payload;
    },
    setAnimalsIdsDone: (state, action: PayloadAction<string[]>) => {
      state.currentShift.idsDone = action.payload;
    },
    checkAnimalWithId: (state, action: PayloadAction<string>) => {
      const newId = action.payload;
      if (state.currentShift.idsDone.includes(newId)) {
        const newIds = state.currentShift.idsDone.filter((id) => id !== newId);
        state.currentShift.idsDone = newIds;
      } else {
        state.currentShift.idsDone.push(newId);
      }
    },
    changeSettings: (state, action: PayloadAction<SettingsFormType>) => {
      state.settings = action.payload;
    },
  },
});

export interface UserSliceState {
  userType: "USER" | "ADMIN";
  trelloId: string;
  shiftId: string;
  settings: SettingsFormType;
  currentShift: CurrentShift;
}

interface CurrentShift {
  id: string;
  type: "cats" | "dogs";
  idsDone: string[];
  all: number;
}
