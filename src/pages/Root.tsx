import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <main className="mt-20 mb-2 mx-4">
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
