import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { ShoppingBag, DollarSign, CreditCard, Users, ArrowUpRight } from "lucide-react";


// ---------- Dummy Data ----------
const statsSparklines = [
  [{ value: 10 }, { value: 30 }, { value: 20 }, { value: 40 }, { value: 25 }, { value: 45 }, { value: 35 }],
  [{ value: 15 }, { value: 25 }, { value: 18 }, { value: 40 }, { value: 35 }, { value: 50 }, { value: 28 }],
  [{ value: 12 }, { value: 22 }, { value: 18 }, { value: 28 }, { value: 25 }, { value: 30 }, { value: 26 }],
  [{ value: 8 }, { value: 18 }, { value: 12 }, { value: 28 }, { value: 22 }, { value: 35 }, { value: 30 }],
];

const salesData = [
  { name: "Men Fashion", value: 400 },
  { name: "Women Fashion", value: 300 },
  { name: "Sports", value: 300 },
  { name: "Accessories", value: 200 },
  { name: "Underwear", value: 150 },
];
const COLORS = ["#4F46E5", "#3B82F6", "#06B6D4", "#22C55E", "#F59E0B"];

const earningsData = [
  { month: "Jan", revenue: 37000, profit: 28000 },
  { month: "Feb", revenue: 42000, profit: 30000 },
  { month: "Mar", revenue: 20000, profit: 15000 },
  { month: "Apr", revenue: 32000, profit: 25000 },
  { month: "May", revenue: 50000, profit: 37000 },
  { month: "Jun", revenue: 42000, profit: 31000 },
  { month: "Jul", revenue: 15000, profit: 12000 },
  { month: "Aug", revenue: 30000, profit: 24000 },
];

const orders = [
  {
    img: "https://via.placeholder.com/40",
    product: "Taste of the Wild Formula Finder",
    customer: "2,672",
    id: "28,672.36",
    qty: "X1",
    price: "₹28,672.36",
    status: "Delivered",
  },
  {
    img: "https://via.placeholder.com/40",
    product: "Proden PlaqueOff Dental Bites Dog, 150 G",
    customer: "2,672",
    id: "28,672.36",
    qty: "X2",
    price: "₹28,672.36",
    status: "Delivered",
  },
  {
    img: "https://via.placeholder.com/40",
    product: "Zuke's Lil' Links Healthy Little Sausage Links for Dogs",
    customer: "2,672",
    id: "28,672.36",
    qty: "X1",
    price: "₹28,672.36",
    status: "Delivered",
  },
  {
    img: "https://via.placeholder.com/40",
    product: "Rachael Ray Nutrish Grain Free Chicken Drumstick",
    customer: "2,672",
    id: "28,672.36",
    qty: "X3",
    price: "₹28,672.36",
    status: "Delivered",
  },
  {
    img: "https://via.placeholder.com/40",
    product: "Fruitables Dog Treats Sweet Potato & Pecan Flavor",
    customer: "2,672",
    id: "28,672.36",
    qty: "X2",
    price: "₹28,672.36",
    status: "Delivered",
  },
];

const topProducts = [
  { name: "Prodotti per i tuo cane…", review: "4.7", sold: "120", price: "₹16.96" },
  { name: "Wholesome Pride…", review: "4.7", sold: "120", price: "₹16.96" },
  { name: "Beneful Baked Delights…", review: "4.7", sold: "120", price: "₹16.96" },
  { name: "Taste of the Wild…", review: "4.7", sold: "120", price: "₹16.96" },
  { name: "Canagan - Britain's…", review: "4.7", sold: "120", price: "₹16.96" },
];

const earningsDonut = [
  { name: "Revenue", value: 37802 },
  { name: "Profit", value: 28305 },
];
const DONUT_COLORS = ["#3B82F6", "#F59E0B"];

const visitorsData = [
  { name: "Jan", visitors: 3000 },
  { name: "Feb", visitors: 2200 },
  { name: "Mar", visitors: 4000 },
  { name: "Apr", visitors: 2800 },
  { name: "May", visitors: 5000 },
  { name: "Jun", visitors: 3200 },
  { name: "Jul", visitors: 2100 },
  { name: "Aug", visitors: 3700 },
  { name: "Sep", visitors: 4500 },
  { name: "Oct", visitors: 3900 },
];

// ---------- Component ----------
const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <nav className="text-sm text-gray-500">
          Dashboard &gt; Favourites &gt; <span className="text-gray-700 font-medium">Title</span>
        </nav>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Sales" value="34,945" percentage={1.56} icon={ShoppingBag} color="text-green-500" sparkline={statsSparklines[0]} />
        <StatsCard title="Total Income" value="₹37,802" percentage={1.56} icon={DollarSign} color="text-orange-500" sparkline={statsSparklines[1]} />
        <StatsCard title="Orders Paid" value="34,945" percentage={0.0} icon={CreditCard} color="text-blue-500" sparkline={statsSparklines[2]} />
        <StatsCard title="Total Visitor" value="34,945" percentage={1.56} icon={Users} color="text-indigo-500" sparkline={statsSparklines[3]} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut */}
        <div className="bg-white shadow-sm rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2">Sale by category</h2>
          <p className="text-sm text-gray-500">Total Mar 20, 2023</p>
          <p className="text-xl font-semibold">₹37,802</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={salesData} dataKey="value" innerRadius={60} outerRadius={90}>
                {salesData.map((entry, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-around text-xs text-gray-600 mt-2 flex-wrap">
            {salesData.map((d, i) => (
              <span key={i}>{d.name}</span>
            ))}
          </div>
        </div>

        {/* Earnings Revenue */}
        <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Earnings</h2>
            <button className="text-gray-400">•••</button>
          </div>

          {/* Revenue Row */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <p className="text-gray-600 text-sm">Revenue</p>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold">₹37,802</h3>
              <span className="flex items-center text-green-600 text-sm font-medium">
                <ArrowUpRight size={14} className="mr-1" />
                0.56%
              </span>
            </div>
          </div>

          {/* Profit Row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-300 rounded-full"></span>
              <p className="text-gray-600 text-sm">Profit</p>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold">₹28,305</h3>
              <span className="flex items-center text-green-600 text-sm font-medium">
                <ArrowUpRight size={14} className="mr-1" />
                0.56%
              </span>
            </div>
          </div>

          {/* Chart */}


          {/* <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={earningsData} barGap={4} barCategoryGap="30%">
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Bar
                  dataKey="revenue"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  barSize={10} // 👈 control thickness here
                />
                <Bar
                  dataKey="profit"
                  fill="#93c5fd"
                  radius={[4, 4, 0, 0]}
                  barSize={10} // 👈 same here
                />
              </BarChart>
            </ResponsiveContainer>
          </div> */}

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={earningsData} barGap={4}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Bar dataKey="revenue" fill="#3b82f6" barSize={10} radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" fill="#93c5fd" barSize={10} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white shadow-sm rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Recent orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm">
                <th className="px-4 py-2 rounded-l-lg">Product</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Product ID</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2 rounded-r-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr
                  key={i}
                  className="bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                >
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={order.img}
                      alt="product"
                      className="w-10 h-10 rounded-lg object-cover border"
                    />
                    <span className="font-medium text-gray-800 truncate max-w-[180px]">
                      {order.product}
                    </span>
                  </td>
                  <td className="px-4 py-3">{order.customer}</td>
                  <td className="px-4 py-3">{order.id}</td>
                  <td className="px-4 py-3">{order.qty}</td>
                  <td className="px-4 py-3 font-medium">{order.price}</td>
                  <td className="px-4 py-3">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-4 space-x-2">
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              className={`px-3 py-1 rounded-full ₹{num === 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Product */}
        <div className="bg-white shadow-sm rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Top product</h2>
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-2 py-2">Product</th>
                <th className="px-2 py-2">Review</th>
                <th className="px-2 py-2">Sold</th>
                <th className="px-2 py-2">Profit</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="px-2 py-2">{p.name}</td>
                  <td className="px-2 py-2">{p.review}⭐</td>
                  <td className="px-2 py-2">{p.sold}</td>
                  <td className="px-2 py-2">{p.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Earnings Donut */}
        <div className="bg-white shadow-sm rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Earnings</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={earningsDonut} dataKey="value" innerRadius={60} outerRadius={90}>
                {earningsDonut.map((_, i) => (
                  <Cell key={i} fill={DONUT_COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-around text-sm text-gray-600 mt-3">
            <span>Revenue: ₹37,802</span>
            <span>Profit: ₹28,305</span>
          </div>
        </div>

        {/* Visitors */}
        <div className="bg-white shadow-sm rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Website visitors</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={visitorsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="visitors" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-500 mt-6">
        Copyright © 2025 Remos. Design with ❤️ by Themesflat. All rights reserved.
      </footer>
    </div>
  );
};

// ---------- Stats Card Component ----------
const StatsCard = ({ title, value, percentage, icon: Icon, color, sparkline }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col justify-between">
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-lg bg-opacity-20 ₹{color}`}>
            <Icon className={`w-5 h-5 ₹{color.replace("text-", "text-")}`} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">{title}</p>
            <h2 className="text-2xl font-bold">{value}</h2>
          </div>
        </div>
        <div
          className={`flex items-center text-sm font-medium ${percentage >= 0 ? "text-green-600" : "text-red-600"
            }`}
        >
          <span className="mr-1">{percentage >= 0 ? "▲" : "▼"}</span>
          {percentage}%
        </div>
      </div>

      {/* Chart Section */}
      <div className="h-16 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparkline}>
            <Tooltip content={() => null} />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color.includes("green") ? "#22c55e" : color.includes("orange") ? "#f97316" : color.includes("blue") ? "#3b82f6" : "#6366f1"}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


export default Dashboard;
