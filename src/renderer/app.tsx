import { Toaster } from "@renderer/components/ui";
import { ThemeProvider } from "@renderer/context/theme-provider";
import router from "@renderer/router";
import { RouterProvider } from "react-router-dom";
import { AppSettingsProvider } from "./context/app-settings-provider";
import { DbProvider } from "./context/db-provider";

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <DbProvider>
        <AppSettingsProvider>
          <RouterProvider router={router} />
          <Toaster />
        </AppSettingsProvider>
      </DbProvider>
    </ThemeProvider>
  );
};

export default App;
