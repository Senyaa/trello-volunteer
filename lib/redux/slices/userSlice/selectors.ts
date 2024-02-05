import { ReduxState } from "../../store";

export const selectTrelloId = (state: ReduxState) => state.user.trelloId;
export const selectShiftId = (state: ReduxState) => state.user.shiftId;
export const selectSettings = (state: ReduxState) => state.user.settings;
