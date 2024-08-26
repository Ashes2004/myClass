import { adminSidebarLinks } from "@/app/constants";
import Sidebar from "../structComponents/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex sm:h-screen bg-cream p-4">
      <Sidebar sidebarList={adminSidebarLinks} />
      <div className="w-full pb-4 pl-3">{children}</div>
    </div>
  );
}
