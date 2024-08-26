import React, { useState } from "react";
import Image from "next/image";
import { sampleProfile } from "@/public/Images";
import AdminLayout from "../Administrator/administratorLayout";

const AdminProfilePage = () => {
  const [profilePic, setProfilePic] = useState(sampleProfile);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <AdminLayout>
      <div className="h-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center rounded-xl">
        <div className="bg-white rounded-xl shadow-xl p-8 w-full md:w-3/4 lg:w-1/2 text-black">
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
              <Image
                src={profilePic}
                layout="fill"
                alt="Profile Picture"
                className="object-cover"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              className="mt-3 text-sm text-gray-500"
              onChange={handleProfilePicChange}
            />
            <h1 className="text-2xl font-bold mt-4">John Doe</h1>
          </div>

          <div className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-lg font-medium">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                  defaultValue="+91 9XXXX XXX89"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-lg font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                  defaultValue="johndoe@example.com"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-lg font-medium">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  autoComplete="street-address"
                  className="mt-1 p-2 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
                  defaultValue="123 Main St, Springfield"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProfilePage;
