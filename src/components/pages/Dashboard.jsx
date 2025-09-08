import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample data
const pieData = [
  { name: "Men Fashion", value: 400 },
  { name: "Women Fashion", value: 300 },
  { name: "Sports", value: 300 },
  { name: "Accessories", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const barData = [
  { name: "Jan", revenue: 4000, orders: 2400 },
  { name: "Feb", revenue: 3000, orders: 1398 },
  { name: "Mar", revenue: 2000, orders: 9800 },
  { name: "Apr", revenue: 2780, orders: 3908 },
  { name: "May", revenue: 1890, orders: 4800 },
  { name: "Jun", revenue: 2390, orders: 3800 },
  { name: "Jul", revenue: 3490, orders: 4300 },
];

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Sales", value: "34,945", color: "text-green-600" },
          { title: "Total Income", value: "$37,802", color: "text-blue-600" },
          { title: "Orders Paid", value: "34,945", color: "text-orange-600" },
          { title: "Total Visitors", value: "34,945", color: "text-purple-600" },
        ].map((stat) => (
          <div
            key={stat.title}
            className="bg-white shadow rounded-xl p-4 flex flex-col"
          >
            <h2 className="text-sm text-gray-500">{stat.title}</h2>
            <p className={`text-2xl font-semibold ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-4">Sale by Category</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white shadow rounded-xl p-4 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Earnings Revenue</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#8884d8" />
              <Bar dataKey="orders" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white shadow rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Product ID</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  product: "Taste of the Wild Formula",
                  customer: "2672",
                  id: "#1234",
                  qty: "x1",
                  price: "$28.67",
                  status: "Delivered",
                },
                {
                  product: "Proden PlaqueOff Bites",
                  customer: "1872",
                  id: "#5678",
                  qty: "x2",
                  price: "$18.40",
                  status: "Pending",
                },
              ].map((order, idx) => (
                <tr key={idx} className="border-b">
                  <td className="px-4 py-2">{order.product}</td>
                  <td className="px-4 py-2">{order.customer}</td>
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">{order.qty}</td>
                  <td className="px-4 py-2">{order.price}</td>
                  <td
                    className={`px-4 py-2 font-medium ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : "text-orange-500"
                    }`}
                  >
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
