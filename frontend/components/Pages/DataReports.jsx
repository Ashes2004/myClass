import { adminDataReview } from "@/app/constants";
import React from "react";
import AdminLayout from "../Administrator/administratorLayout";
import Image from "next/image";
import Link from "next/link";

const DataCard = ({ data, icon, bg, link }) => {
  return (
    <div
      className={`p-6 rounded-xl shadow-xl ${bg} flex items-center justify-between duration-300 hover:scale-105 hover:shadow-2xl`}
    >
      <div className="flex gap-4 items-center">
        <div className="bg-white p-3 rounded-full shadow-md">
          <Image
            src={icon}
            alt={`${data} icon`}
            width={32}
            height={32}
            className="object-contain"
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold md:font-bold text-gray-800">
            {data}
          </h3>
        </div>
      </div>
      {link && (
        <Link
          href={link}
          className="text-sm text-gray-100 hover:text-gray-800 underline duration-200"
        >
          View Details
        </Link>
      )}
    </div>
  );
};

const AdminDataReportPage = () => {
  return (
    <AdminLayout>
      <div className="h-full p-6">
        <h1 className="text-4xl font-bold mb-12 text-center text-gray-900">
          Admin Data Report
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {adminDataReview.map((item) => (
            <DataCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDataReportPage;
