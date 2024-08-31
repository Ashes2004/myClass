import { studentSidebarLinks } from "@/app/constants";
import Sidebar from "../structComponents/Sidebar";
import CustomNavbar from "../structComponents/CustomNavbar";

export default function StudentLayout({ children }) {
  return (
    <>
      <CustomNavbar navbarList={studentSidebarLinks} />
      <div className="flex sm:h-screen bg-cream p-4">
        <Sidebar sidebarList={studentSidebarLinks} name={"student"} />
        <div className="w-full pb-4 pl-3">{children}</div>
      </div>
    </>
  );
}
