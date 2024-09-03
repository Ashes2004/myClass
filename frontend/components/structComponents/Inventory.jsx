import { useState } from "react";
import AdminLayout from "../Administrator/administratorLayout";
import SearchBar from "./SearchBar";
import Image from "next/image";
import Link from "next/link";
import { sampleProfile } from "@/public/Images";
import {
  currentInventory,
  blackboardDetails,
  computerDetails,
  projectorDetails,
  whiteboardDetails,
  scannerDetails,
  printerDetails,
  furnitureDetails,
  stationaryDetails,
  items,
} from "@/app/constants/inventory";
import dayjs from "dayjs";
import { rightArrow } from "@/public/Icons";

const itemDetails = {
  Blackboard: blackboardDetails,
  Computers: computerDetails,
  Projector: projectorDetails,
  "White Board": whiteboardDetails,
  Scanner: scannerDetails,
  Printer: printerDetails,
  Furniture: furnitureDetails,
};

// Utility function to calculate maintenance date and color
const getMaintenanceInfo = (purchaseDate, itemType) => {
  const purchase = dayjs(purchaseDate);
  let maintenanceDate;

  switch (itemType) {
    case "Blackboard":
    case "White Board":
      maintenanceDate = purchase.add(2 + (Math.random() > 0.5 ? 1 : 0), "year");
      break;
    case "Computers":
    case "Projector":
    case "Scanner":
    case "Printer":
      maintenanceDate = purchase.add(3 + (Math.random() > 0.5 ? 1 : 0), "year");
      break;
    case "Furniture":
      maintenanceDate = purchase.add(5, "year");
      break;
    default:
      maintenanceDate = purchase.add(1, "year");
      break;
  }

  const now = dayjs();
  const diffMonths = maintenanceDate.diff(now, "month");
  let color;

  if (diffMonths > 12) {
    color = "bg-green-200";
  } else if (diffMonths > 6) {
    color = "bg-yellow-200";
  } else {
    color = "bg-red-200";
  }

  return { maintenanceDate: maintenanceDate.format("YYYY-MM-DD"), color };
};

const Inventory = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [details, setDetails] = useState([]);

  const handleChange = (event) => {
    const selected = event.target.value;
    setSelectedItem(selected);
    setDetails(itemDetails[selected] || []);
  };

  const tableHead = [
    "Product Id",
    "Item Name",
    "Brand",
    "Purchase Date",
    "Location",
    "Invoice Link",
    "Maintenance Date",
  ];

  const inventoryHead = ["Sl. No.", "Item Name", "Category", "Quantity"];

  return (
    <AdminLayout>
      <div className="bg-cream text-black flex flex-col p-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between md:items-center rounded-md">
          <h1 className="text-xl md:text-3xl font-bold">
            School Inventory Management
          </h1>
          <div className="flex sm:flex-row justify-start gap-3 md:justify-center items-center mt-3 mb-3 md:mb-0">
            <SearchBar />
            <div className="bg-white rounded-full">
              <Image
                src={sampleProfile}
                alt="profile"
                width={42}
                height={42}
                className="object-cover cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col md:grid grid-cols-1 lg:grid-cols-6 gap-6">
          {/* Left Section */}
          <div className="col-span-4">
            {/* Current Inventory Section */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg md:text-xl">
                Current Inventory Overview
              </h3>
              <Link
                href="#"
                className="hover:underline decoration-solid underline-offset-4 cursor-pointer hover:text-green-custom duration-200"
              >
                View All
              </Link>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="min-w-full border">
                <thead className="bg-orange-300">
                  <tr>
                    {inventoryHead.slice(0, 4).map((head, index) => (
                      <th key={index} className="p-2 border border-gray-300">
                        <h2 className="text-xs md:text-lg font-bold">{head}</h2>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-center">
                  {currentInventory.map((supply, itemIndex) => {
                    if (itemIndex < 3) {
                      return (
                        <tr
                          key={itemIndex}
                          className="border border-gray-300 hover:bg-gray-100"
                        >
                          <td className="p-4">{itemIndex + 1}</td>
                          <td className="p-4">{supply.item}</td>
                          <td className="p-4">{supply.category}</td>
                          <td className="p-4">{supply.quantity}</td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center my-3">
              <h3 className="font-bold text-lg md:text-xl">
                Check Inventory Details
              </h3>
              <div className="max-w-44">
                <select
                  value={selectedItem}
                  onChange={handleChange}
                  className="block w-full bg-white border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Choose an item...
                  </option>
                  {Object.keys(itemDetails).map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {selectedItem && (
              <div className="mt-4 max-h-[400px] overflow-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      {tableHead.map((head, index) => (
                        <th key={index} className="py-2 px-4 border-b">
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {details.map((detail, index) => {
                      const { maintenanceDate, color } = getMaintenanceInfo(
                        detail.purchaseDate,
                        detail.itemName
                      );

                      return (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="py-2 px-4 border-b">
                            {detail.productId}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {detail.itemName}
                          </td>
                          <td className="py-2 px-4 border-b">{detail.brand}</td>
                          <td className="py-2 px-4 border-b">
                            {detail.purchaseDate}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {detail.location}
                          </td>
                          <td className="py-2 px-4 border-b">
                            <Link
                              href={detail.invoiceLink}
                              className="text-blue-500 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Invoice
                            </Link>
                          </td>
                          <td className={`py-2 px-4 border-b ${color}`}>
                            {maintenanceDate}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="col-span-2">
            <div className="flex flex-col gap-4 pt-3">
              {/* Stationary Section */}
              <div className="bg-white shadow-xl rounded-xl flex flex-col p-2">
                <div className="flex justify-between items-center">
                  <h2 className="font-bold md:text-xl lg:text-2xl">
                    Stationary Details
                  </h2>
                  <Link
                    href="/"
                    className="text-blue-500 hover:underline"
                    target="_blank"
                  >
                    Place Order
                  </Link>
                </div>
                <div className="overflow-x-auto w-full py-3">
                  <table className="min-w-full border">
                    <thead className="bg-blue-300">
                      <tr>
                        {inventoryHead.slice(0, 4).map((head, index) => (
                          <th
                            key={index}
                            className="px-2 py-1 border border-gray-300"
                          >
                            <h2 className="text-xs md:text-lg font-bold">
                              {head}
                            </h2>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {stationaryDetails.map((stationary, index) => {
                        if (index < 4) {
                          return (
                            <tr
                              key={index}
                              className="border border-gray-300 hover:bg-gray-100"
                            >
                              <td className="p-2">{index + 1}</td>
                              <td className="p-2">{stationary.item}</td>
                              <td className="p-2">{stationary.brand}</td>
                              <td className="p-2">{stationary.quantity}</td>
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Place Section */}
              <div className="bg-white rounded-xl shadow-xl p-3 flex flex-col mt-4 overflow-auto max-h-[425px]">
                <h2 className="font-bold md:text-xl lg:text-2xl">
                  Place Order for Inventory
                </h2>
                <div className="pt-2 flex flex-col gap-2">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 rounded-lg flex justify-between items-center p-2"
                    >
                      <h2 className="font-bold text-lg">{item}</h2>
                      <Link href="/" className="bg-gray-300 hover:bg-gray-600 duration-200 p-3 rounded-full">
                        <Image
                          src={rightArrow}
                          alt="arrow"
                          width={28}
                          height={28}
                          className="object-cover"
                        />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Inventory;
