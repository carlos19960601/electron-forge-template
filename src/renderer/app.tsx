import { Toaster } from "@renderer/components/ui/toaster";
import { ThemeProvider } from "@renderer/context/theme-provider";
import router from "@renderer/router";
import { RouterProvider } from "react-router-dom";
import { AppSettingsProvider } from "./context/app-settings-provider";

const App = () => {
  return (
    <ThemeProvider>
      <AppSettingsProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AppSettingsProvider>
    </ThemeProvider>
  );
};

export default App;
