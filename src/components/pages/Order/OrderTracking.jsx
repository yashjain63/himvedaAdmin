import React from "react";
import { Link } from "react-router-dom";

const OrderTracking = () => {
  const timeline = [
    {
      date: "20 Nov 2023",
      time: "2:30 PM",
      description: "The sender is preparing the goods",
      location: "2715 Ash Dr. San Jose, South Dakota 83475",
    },
    {
      date: "20 Nov 2023",
      time: "01:00 PM",
      description: "The order has arrived at the post office",
      location: "3517 W. Gray St. Utica, Pennsylvania 57867",
    },
    {
      date: "21 Nov 2023",
      time: "03:58 AM",
      description: "The carrier is picking up the goods",
      location: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
    },
    {
      date: "22 Nov 2023",
      time: "06:26 PM",
      description: "The order has been shipped",
      location: "4140 Parker Rd. Allentown, New Mexico 31134",
    },
    {
      date: "22 Nov 2023",
      time: "03:45 PM",
      description: "Your order will be delivered to you in 30 minutes",
      location: "8502 Preston Rd. Inglewood, Maine 98380",
    },
    {
      date: "23 Nov 2023",
      time: "12:21 AM",
      description: "The order has been delivered successfully",
      location: "3891 Ranchview Dr. Richardson, California 62639",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-0 sm:py-5 space-y-6">
      {/* Header */}
      {/* <div className="flex justify-between text-sm text-gray-500">
        <p className="font-medium">Dashboard &gt; Order &gt; Track Order</p>
      </div> */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-semibold">Order Tracking</h1>

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mt-2 sm:mt-0">
          <span>Orders</span> &gt;{" "}
          <span className="text-gray-800 font-medium">Order Tracking</span>
        </div>
      </div>

      {/* Product Info */}
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-6">
        <img
          src="/images/protct1.png"
          alt="product"
          className="w-40 h-40 object-contain rounded-lg border"
        />
        <div className="flex-1 space-y-2">
          <h2 className="text-lg font-semibold">Baby Oil</h2>
          <p className="text-sm text-gray-500">
            Order ID: <span className="font-medium">#192847</span>
          </p>
          <p className="text-sm text-gray-500">Brand: 20 Nov 2023</p>
          <p className="text-sm text-gray-500">Order Placed: 20 Nov 2023</p>
          <p className="text-sm text-gray-500">Quantity: 1</p>

          <div className="flex gap-3 pt-2">
            <Link to="/products/list">
              <button className="px-4 py-2 border border-red-900 text-red-900 hover:bg-red-800 hover:text-white cursor-pointer rounded-lg">
                View shop
              </button>
            </Link>
            {/* <Link to="/products/list">
              <button className="px-4 py-2 border border-red-900 text-red-900 hover:bg-red-800 hover:text-white cursor-pointer rounded-lg">
                View product
              </button>
            </Link> */}
          </div>
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-gray-600 text-sm mb-6">
          Your items is on the way. Tracking information will be available within
          24 hours.
        </p>

        <div className="flex justify-between items-center">
          {["Receiving orders", "Order processing", "Being delivered", "Delivered"].map(
            (step, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${i < 3 ? "bg-green-600 border-green-600 text-white" : "bg-gray-200 border-gray-300 text-gray-400"
                    }`}
                >
                  ✓
                </div>
                <p className="mt-2 text-sm font-medium">{step}</p>
                <p className="text-xs text-gray-500">
                  {i === 0 ? "05:43 AM" : i === 1 ? "01:21 PM" : i === 2 ? "Processing" : "Pending"}
                </p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Timeline Table */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Detail</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 font-medium">Date</th>
                <th className="px-4 py-2 font-medium">Time</th>
                <th className="px-4 py-2 font-medium">Description</th>
                <th className="px-4 py-2 font-medium">Location</th>
              </tr>
            </thead>
            <tbody>
              {timeline.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{item.date}</td>
                  <td className="px-4 py-2">{item.time}</td>
                  <td className="px-4 py-2">{item.description}</td>
                  <td className="px-4 py-2">{item.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
