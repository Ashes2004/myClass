import { teacherSidebarLinks } from "@/app/constants";
import Sidebar from "../structComponents/Sidebar";
import CustomNavbar from "../structComponents/CustomNavbar";

export default function TeacherLayout({ children }) {
  return (
    <>
      <CustomNavbar navbarList={teacherSidebarLinks} />
      <div className="flex w-full h-screen bg-cream dark:bg-dark-bg md:p-6 pt-2">
        <Sidebar sidebarList={teacherSidebarLinks} name={"teacher"} />
        <div className="w-full">{children}</div>
      </div>
    </>
  );
}
