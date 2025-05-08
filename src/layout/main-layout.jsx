import { Outlet } from "react-router-dom";
import { AlertProvider } from "../context/alert-context";

const MainLayout = () => {
  return (
    <AlertProvider>
      <Outlet />
    </AlertProvider>
  );
};

export default MainLayout;
