"use client";

import { Provider } from "react-redux";
import { reduxStore, userSlice } from "@/lib/redux";
import React, { useEffect } from "react";
import { SettingsFormType } from "../(site)/protected/settings/SettingsForm";

interface Props extends React.PropsWithChildren {
  userSettings: SettingsFormType;
}

export const ReduxProvider = (props: Props) => {

  useEffect(() => {
    reduxStore.dispatch(userSlice.actions.changeSettings(props.userSettings));
  }, [props.userSettings]);

  return <Provider store={reduxStore}>{props.children}</Provider>;
};
