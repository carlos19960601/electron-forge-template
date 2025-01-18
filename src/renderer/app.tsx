import { Toaster } from "@renderer/components/ui/toaster";
import { ThemeProvider } from "@renderer/context/theme-provider";
import router from "@renderer/router";
import { RouterProvider } from "react-router-dom";

const App = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
};

export default App;
