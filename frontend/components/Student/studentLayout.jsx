import { studentSidebarLinks } from "@/app/constants";
import Sidebar from "../structComponents/Sidebar";

export default function StudentLayout({ children }) {
  return (
    <div className="flex sm:h-screen bg-cream p-4">
      <Sidebar sidebarList={studentSidebarLinks} />
      <div className="w-full pb-4 pl-3">{children}</div>
    </div>
  );
}
