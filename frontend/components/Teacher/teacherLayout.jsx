import { teacherSidebarLinks } from "@/app/constants";
import Sidebar from "../structComponents/Sidebar";

export default function TeacherLayout({ children }) {
  return (
        <div className="flex w-full h-screen bg-cream md:p-6 pt-2">
          <Sidebar sidebarList={teacherSidebarLinks} />
          <div className="w-full">{children}</div>
        </div>
  );
}
