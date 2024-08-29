import { logo, logout } from "@/public/Icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Sidebar = ({ sidebarList, name }) => {
  const router = useRouter();
  const handleLogout = () => {
    if (name == "student") {
      sessionStorage.removeItem("studentToken");
      router.push("/student/studentLogin");
    } else if (name == "teacher") {
      sessionStorage.removeItem("teacherToken");
      router.push("/teacher/teacherLogin");
    }
  };
  return (
    <div className="hidden md:flex flex-col justify-between bg-slate-bg w-[16rem] sticky z-20 rounded-xl px-6 py-4 text-white">
      <div>
        <Link href="/">
          <div className="inline-flex items-center mb-5 gap-3">
            <Image
              src={logo}
              alt="logo"
              width={32}
              height={32}
              className="text-white"
            />
            <div>
              <h1 className="text-3xl font-bold">MyClass</h1>
            </div>
          </div>
        </Link>

        <ul className="pt-6 ">
          {sidebarList.map((item) => (
            <Link
              href={`${item.link}`}
              key={item.id}
              className="flex mt-3 pl-2 py-2 hover:bg-green-custom hover:rounded-lg"
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={24}
                height={24}
                className="text-white"
              />
              <h2 className="ml-2 lg:font-semibold md:font-medium">
                {item.label}
              </h2>
            </Link>
          ))}
        </ul>
      </div>

      <div
        onClick={handleLogout}
        className="flex items-center mt-4 pt-4 cursor-pointer px-3 py-4 rounded-full bg-green-custom hover:bg-[#6c8125] shadow-lg duration-300"
      >
        <Image src={logout} width={24} height={24} alt="logout" />
        <h2 className="ml-2 text-black text-md lg:font-semibold md:font-medium">
          Log Out
        </h2>
      </div>
    </div>
  );
};

export default Sidebar;
