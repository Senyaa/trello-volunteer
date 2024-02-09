import { ReduxState } from "../../store";

export const selectTrelloId = (state: ReduxState) => state.user.trelloId;
export const selectShiftId = (state: ReduxState) => state.user.shiftId;
export const selectSettings = (state: ReduxState) => state.user.settings;
export const selectCurrentShiftAll = (state: ReduxState) =>  state.user.currentShift.all;
export const selectCurrentShiftDoneIds = (state: ReduxState) =>  state.user.currentShift.idsDone;
export const selectCurrentShiftDoneCount = (state: ReduxState) =>  state.user.currentShift.idsDone.length;
