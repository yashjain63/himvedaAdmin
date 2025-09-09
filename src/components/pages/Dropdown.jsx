import React from "react";

const Dropdown = ({ open, title, items, type }) => {
  if (!open) return null;

  return (
    <div
      className={`
        absolute right-0 top-full
        bg-white shadow-lg rounded-2xl overflow-hidden z-50
        w-screen max-w-full px-3
        md:w-80 md:max-w-[90vw]
        transform transition-all duration-300 ease-out
        ${open ? "opacity-100 translate-y-2" : "opacity-0 -translate-y-2 pointer-events-none"}
      `}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 w-full">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      {/* Items */}
      <div className="w-full max-h-[70vh] md:max-h-72 overflow-y-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition w-full"
          >
            {/* Avatar/Icon */}
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

            {/* Content */}
            <div className="flex-1">
              <p className="font-semibold text-gray-800 text-sm">
                {type === "messages" ? item.name : item.title}
              </p>
              <p className="text-xs text-gray-500 truncate">{item.text}</p>
            </div>

            {/* Extra (for messages: time) */}
            {type === "messages" && (
              <span className="text-xs text-gray-400">{item.time}</span>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200 w-full">
        <button className="w-full border text-red-900 border-red-900 hover:bg-red-800 hover:text-white py-2 rounded-lg font-medium transition">
          View all
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
