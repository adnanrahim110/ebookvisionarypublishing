"use client";

import * as React from "react";

import { GLOBAL_SETTINGS } from "@/constants";

type GlobalSettings = typeof GLOBAL_SETTINGS;

const GlobalSettingsContext = React.createContext<GlobalSettings | null>(null);

export function GlobalSettingsProvider({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings: GlobalSettings;
}) {
  return (
    <GlobalSettingsContext.Provider value={settings}>
      {children}
    </GlobalSettingsContext.Provider>
  );
}

export function useGlobalSettings() {
  return React.useContext(GlobalSettingsContext);
}
