import { createContext, PropsWithChildren } from "react";

type AppSettingsProviderState = {
  EnjoyApp?: EnjoyAppType;
};

const initialState: AppSettingsProviderState = {};

export const AppSettingsProviderContext =
  createContext<AppSettingsProviderState>(initialState);

export const AppSettingsProvider = ({ children }: PropsWithChildren) => {
  const EnjoyApp = window.__ENJOY_APP__;

  return (
    <AppSettingsProviderContext.Provider value={{ EnjoyApp: EnjoyApp }}>
      {children}
    </AppSettingsProviderContext.Provider>
  );
};
