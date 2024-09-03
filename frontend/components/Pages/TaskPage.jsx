import { adminTasks } from "@/app/constants";
import AdminLayout from "../Administrator/administratorLayout";
import Image from "next/image";
import Link from "next/link";

const ManagementCard = ({ icon, task, type, link, bg }) => {
  return (
    <div
      className={`p-6 rounded-xl shadow-lg ${bg} flex items-center justify-between duration-300 hover:scale-105 hover:shadow-2xl`}
    >
      <div className="flex gap-4 items-center">
        <div className="bg-white p-4 rounded-full shadow-md">
          <Image
            src={icon}
            alt={`${task} icon`}
            width={36}
            height={36}
            className="object-contain"
          />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">{task}</h3>
          <p className="text-sm text-gray-700">{type}</p>
        </div>
      </div>
      {link && (
        <Link
          href={link}
          className="text-base text-gray-100 hover:text-gray-900 duration-300 underline"
        >
          Go
        </Link>
      )}
    </div>
  );
};

const TaskManagement = () => {
  return (
    <AdminLayout>
      <div className="h-full p-6">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-900">
          Tasks
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {adminTasks.map((item) => (
            <ManagementCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default TaskManagement;
