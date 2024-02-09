"use client";

import {
  reduxStore,
  isStoreLoaded,
  useSelector,
  userSlice,
  AppSlice,
} from "@/lib/redux";
import React, { useEffect, useRef } from "react";
import { SettingsFormType } from "../(site)/protected/settings/SettingsForm";

interface Props extends React.PropsWithChildren {
  userSettings: SettingsFormType;
  shiftId: string;
}

export const StoreHydration = ({ children, shiftId, userSettings }: Props) => {
  const storeHydratedRef = useRef(false);
  const isAppLoaded = useSelector(isStoreLoaded);

  useEffect(() => {
    if (storeHydratedRef.current) {
      return;
    }

    storeHydratedRef.current = true;

    reduxStore.dispatch(userSlice.actions.setShiftId(shiftId));
    reduxStore.dispatch(userSlice.actions.changeSettings(userSettings));

    //has to be last
    reduxStore.dispatch(AppSlice.actions.appLoaded());
    
  }, [userSettings, shiftId]);

  if (!isAppLoaded) {
    return null;
  }

  return children;
};
