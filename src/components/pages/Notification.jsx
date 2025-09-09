import { useState } from "react";
import { MoreVertical } from "lucide-react";

const notificationsData = [
  {
    id: 1,
    type: "News",
    message:
      "Lorem ipsum dolor sit amet consectetur. Malesuada dignissim vestibulum convallis nam senectus dolor ipsum.",
    time: "19m",
  },
  {
    id: 2,
    type: "Alerts",
    message:
      "Lorem ipsum dolor sit amet consectetur. Ultrices augue in ullamcorper platea gravida ac dui duis sagittis.",
    time: "22m",
  },
  {
    id: 3,
    type: "Mentions",
    message:
      "Lorem ipsum dolor sit amet consectetur. Eget ornare a morbi ultricies amet egestas. Blandit.",
    time: "30m",
  },
  {
    id: 4,
    type: "News",
    message:
      "Fringilla rhoncus pellentesque imperdiet amet fermentum morbi amet maecenas.",
    time: "1h",
  },
  {
    id: 5,
    type: "Alerts",
    message:
      "Odio lorem mattis tincidunt diam vivamus. Consectetur placerat in montes gravida lobortis orci cras.",
    time: "2h",
  },
  {
    id: 6,
    type: "Mentions",
    message:
      "Ut gravida enim ullamcorper aliquet elit. Eu maecenas ipsum ornare at cursus.",
    time: "3h",
  },
  {
    id: 7,
    type: "News",
    message: "Lorem ipsum dolor sit amet consectetur.",
    time: "4h",
  },
];

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [openMenu, setOpenMenu] = useState(null);

  const filteredNotifications =
    activeTab === "All"
      ? notificationsData
      : notificationsData.filter((n) => n.type === activeTab);

  const handleMenuToggle = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-semibold mb-6">Notification</h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {["All", "News", "Alerts", "Mentions"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-md border transition text-sm ${
              activeTab === tab
                ? "bg-green-600 text-white border-green-600"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((n) => (
          <div
            key={n.id}
            className="flex items-start gap-3 bg-gray-100 rounded-md p-3 hover:bg-gray-200 transition relative"
          >
            {/* Avatar */}
            <img
              src="https://via.placeholder.com/40x40.png?text=H"
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />

            {/* Content */}
            <div className="flex-1">
              <p className="text-sm text-gray-800">{n.message}</p>
            </div>

            {/* Right side (time + actions) */}
            <div className="flex flex-col items-end gap-2">
              <span className="text-xs text-gray-500">{n.time}</span>
              <div className="relative">
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => handleMenuToggle(n.id)}
                >
                  <MoreVertical className="w-5 h-5" />
                </button>

                {/* Dropdown Menu */}
                {openMenu === n.id && (
                  <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-md z-10">
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Mark as Read
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="text-center text-gray-500 py-6 italic">
            No notifications found
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
