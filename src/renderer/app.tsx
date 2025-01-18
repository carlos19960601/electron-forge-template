import { ThemeProvider } from "@renderer/context/theme-provider";
import router from "@renderer/router";
import { RouterProvider } from "react-router-dom";

const App = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
