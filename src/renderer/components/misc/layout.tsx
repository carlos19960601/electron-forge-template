import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="w-screen h-screen">
      <Outlet />
    </div>
  );
};
