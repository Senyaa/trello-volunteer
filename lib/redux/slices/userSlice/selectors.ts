import { ReduxState } from "../../store";

export const selectTrelloId = (state: ReduxState) => state.user.trelloId;
export const selectSettings = (state: ReduxState) => state.user.settings;
export const selectIsLoading = (state: ReduxState) => state.user.isLoading;
