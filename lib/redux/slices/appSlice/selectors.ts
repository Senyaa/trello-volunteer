import { ReduxState } from "../../store";

export const isStoreLoaded = (state: ReduxState) => state.app.didLoadStore;
