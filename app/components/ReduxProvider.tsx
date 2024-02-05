"use client";

import { Provider } from "react-redux";
import { reduxStore } from "@/lib/redux";
import React, { PropsWithChildren } from "react";


export const ReduxProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={reduxStore}>{children}</Provider>;
};
