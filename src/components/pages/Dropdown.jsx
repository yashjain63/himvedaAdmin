// src/pages/Dropdown.jsx
import React, { forwardRef } from "react";
import { Link } from "react-router-dom";

const Dropdown = forwardRef(({ open, title, items, type, onClose }, ref) => {
  if (!open) return null;

  return (
    <div
      ref={ref}
      className={`
        absolute right-0 top-full
        bg-white shadow-lg rounded-2xl overflow-hidden z-50
        w-[95vw] md:w-80
        transform transition-all duration-300 ease-out
        ${open ? "opacity-100 translate-y-2" : "opacity-0 -translate-y-2 pointer-events-none"}
      `}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 w-full flex justify-between items-center">
        <h3 className="text-lg font-semibold">{title}</h3>

        {/* View All button in top-right */}
        {type === "messages" ? (
          <Link to="/messages">
            <button
              onClick={onClose}
              className="text-sm text-red-900 hover:text-green-600"
            >
              View all
            </button>
          </Link>
        ) : (
          <Link to="/notifications">
            <button
              onClick={onClose}
              className="text-sm text-red-900 hover:text-green-600"
            >
              View all
            </button>
          </Link>
        )}
      </div>

      {/* Items */}
      <div className="w-full max-h-[70vh] md:max-h-72 overflow-y-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition w-full"
          >
            {type === "messages" ? (
              <img
                src={item.img}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${item.color}`}
              >
                <span className="text-lg">{item.icon}</span>
              </div>
            )}

            <div className="flex-1">
              <p className="font-semibold text-gray-800 text-sm">
                {type === "messages" ? item.name : item.title}
              </p>
              <p className="text-xs text-gray-500 truncate">{item.text}</p>
            </div>

            {type === "messages" && (
              <span className="text-xs text-gray-400">{item.time}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

export default Dropdown;
