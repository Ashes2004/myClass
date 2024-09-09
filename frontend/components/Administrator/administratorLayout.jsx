import { adminSidebarLinks } from "@/app/constants";
import Sidebar from "../structComponents/Sidebar";
import CustomNavbar from "../structComponents/CustomNavbar";

export default function AdminLayout({ children }) {
  return (
    <>
      <CustomNavbar navbarList={adminSidebarLinks} />
      <div className="flex sm:h-screen bg-cream dark:bg-dark-bg p-4">
        <Sidebar sidebarList={adminSidebarLinks} />
        <div className="w-full pb-4 pl-3">{children}</div>
      </div>
    </>
  );
}
