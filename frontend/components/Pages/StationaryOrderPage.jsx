import React, { useState } from "react";
import AdminLayout from "../Administrator/administratorLayout";

const StationaryOrderPage = () => {
  const stationaryData = {
    textbook: {
      brands: ["Brand A", "Brand B", "Brand C"],
      dealers: ["Dealer 1", "Dealer 2"],
      price: 40,
    },
    registers: {
      brands: ["Brand X", "Brand Y"],
      dealers: ["Dealer 3", "Dealer 4"],
      price: 70,
    },
    markers: {
      brands: ["Brand M", "Brand N", "Brand O"],
      dealers: ["Dealer 5", "Dealer 6"],
      price: 10,
    },
  };

  const [orderItems, setOrderItems] = useState([
    {
      stationaryType: "",
      brand: "",
      dealer: "",
      quantity: 0,
      totalCost: 0,
    },
  ]);

  // Add a new item row
  const addNewItem = () => {
    setOrderItems([
      ...orderItems,
      {
        stationaryType: "",
        brand: "",
        dealer: "",
        quantity: 0,
        totalCost: 0,
      },
    ]);
  };

  // Remove an item row by index
  const removeItem = (index) => {
    const updatedItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(updatedItems);
  };

  // Handle updates to item details
  const handleItemChange = (index, key, value) => {
    const updatedItems = [...orderItems];
    updatedItems[index][key] = value;

    if (key === "stationaryType") {
      updatedItems[index].brand = "";
      updatedItems[index].dealer = "";
      updatedItems[index].quantity = 0;
      updatedItems[index].totalCost = 0;
    }

    if (key === "quantity") {
      const price =
        stationaryData[updatedItems[index].stationaryType]?.price || 0;
      updatedItems[index].totalCost = (value * price).toFixed(2);
    }

    setOrderItems(updatedItems);
  };

  const handleQuantityChange = (index, qty) => {
    handleItemChange(index, "quantity", qty);
  };

  const getTotalOrderCost = () => {
    return orderItems.reduce(
      (acc, item) => acc + parseFloat(item.totalCost || 0),
      0
    );
  };

  const handleOrderPlacement = () => {
    alert("Order placed!");
  };

  const handleOrderCancel = () => {
    setOrderItems([
      {
        stationaryType: "",
        brand: "",
        dealer: "",
        quantity: 0,
        totalCost: 0,
      },
    ]);
  };

  return (
    <AdminLayout>
      <div className="h-full flex flex-col justify-center items-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
            Stationary Order Form
          </h2>

          {orderItems.map((item, index) => (
            <div
              key={index}
              className="mb-6 flex flex-col sm:flex-row items-end justify-between space-y-4 sm:space-y-0 sm:space-x-4"
            >
              {/* Dropdown for Stationary Type */}
              <div className="w-full sm:w-1/5">
                <label
                  className="block text-gray-700 font-bold mb-1"
                  htmlFor={`stationaryType-${index}`}
                >
                  Stationary Type
                </label>
                <select
                  id={`stationaryType-${index}`}
                  className="block w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                  value={item.stationaryType}
                  onChange={(e) =>
                    handleItemChange(index, "stationaryType", e.target.value)
                  }
                >
                  <option value="" disabled>
                    Select Item
                  </option>
                  {Object.keys(stationaryData).map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dropdown for Brand */}
              <div className="w-full sm:w-1/5">
                <label
                  className="block text-gray-700 font-bold mb-1"
                  htmlFor={`brand-${index}`}
                >
                  Brand
                </label>
                <select
                  id={`brand-${index}`}
                  className="block w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                  value={item.brand}
                  onChange={(e) =>
                    handleItemChange(index, "brand", e.target.value)
                  }
                  disabled={!item.stationaryType}
                >
                  <option value="" disabled>
                    Select Brand
                  </option>
                  {stationaryData[item.stationaryType]?.brands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dropdown for Dealer */}
              <div className="w-full sm:w-1/5">
                <label
                  className="block text-gray-700 font-bold mb-1"
                  htmlFor={`dealer-${index}`}
                >
                  Dealer
                </label>
                <select
                  id={`dealer-${index}`}
                  className="block w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                  value={item.dealer}
                  onChange={(e) =>
                    handleItemChange(index, "dealer", e.target.value)
                  }
                  disabled={!item.stationaryType}
                >
                  <option value="" disabled>
                    Select Dealer
                  </option>
                  {stationaryData[item.stationaryType]?.dealers.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity Input */}
              <div className="w-full sm:w-1/5">
                <label
                  className="block text-gray-700 font-bold mb-1"
                  htmlFor={`quantity-${index}`}
                >
                  Quantity
                </label>
                <input
                  id={`quantity-${index}`}
                  type="number"
                  className="block w-full p-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(index, parseInt(e.target.value, 10))
                  }
                  min="0"
                  disabled={!item.stationaryType}
                />
              </div>

              {/* Remove Item Button */}
              <button
                className="w-full sm:w-1/5 bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
                onClick={() => removeItem(index)}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Add another item */}
          <button
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 mb-6"
            onClick={addNewItem}
          >
            Add Another Item
          </button>

          {/* Total Order Cost */}
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">
              Total Order Cost:
            </label>
            <p className="text-xl font-semibold text-green-600">
              ₹{getTotalOrderCost().toFixed(2)}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
            <button
              className="w-full sm:w-auto bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
              onClick={handleOrderPlacement}
              disabled={
                orderItems.length === 0 ||
                !orderItems.every(
                  (item) =>
                    item.stationaryType &&
                    item.brand &&
                    item.dealer &&
                    item.quantity > 0
                )
              }
            >
              Place Order
            </button>
            <button
              className="w-full sm:w-auto bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700"
              onClick={handleOrderCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default StationaryOrderPage;
