import React, { useState } from "react";
import {
  FaBars,
  FaHome,
  FaBoxOpen,
  FaUser,
  FaShoppingCart,
  FaCog,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menus = [
    { name: "Dashboard", icon: <FaHome /> },
    { name: "Products", icon: <FaBoxOpen /> },
    { name: "Orders", icon: <FaShoppingCart /> },
    { name: "Users", icon: <FaUser /> },
    { name: "Settings", icon: <FaCog /> },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-green-700 text-white h-screen p-3 pt-5 transition-all duration-300 ${
          isOpen ? "w-56" : "w-16"
        }`}
      >
        {/* Logo + Toggle button */}
        <div className="flex justify-between items-center mb-6">
          <h1
            className={`text-xl font-bold transition-all duration-300 ${
              !isOpen && "hidden"
            }`}
          >
            Himveda
          </h1>
          <FaBars
            className="cursor-pointer text-xl"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>

        {/* Menu items */}
        <ul className="space-y-4">
          {menus.map((menu, i) => (
            <li
              key={i}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-green-600 cursor-pointer"
            >
              <span className="text-lg">{menu.icon}</span>
              <span className={`${!isOpen && "hidden"} text-sm`}>
                {menu.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold">Dashboard Content</h2>
        <p className="mt-2 text-gray-600">
          Welcome to the Himveda Admin Panel.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
