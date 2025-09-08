import { useState } from "react";
import { Plus, Search, Info, Eye, Pencil, Trash2 } from "lucide-react";

export default function ProductListPage() {
  const [search, setSearch] = useState("");

  // Sample data
  const products = [
    {
      id: "#7712309",
      name: "Dog Food, Chicken & Chicken Liver Recipe",
      price: "$1,452.500",
      quantity: 1638,
      sale: 20,
      stock: "Out of stock",
      startDate: "$28,672.36",
      image:
        "https://via.placeholder.com/60x60.png?text=Food",
    },
    {
      id: "#7712309",
      name: "Grain Free Dry Dog Food | Rachael Ray® Nutrish®",
      price: "$1,452.500",
      quantity: 1638,
      sale: 20,
      stock: "Out of stock",
      startDate: "$28,672.36",
      image:
        "https://via.placeholder.com/60x60.png?text=Dog",
    },
    {
      id: "#7712309",
      name: "Weruva Pumpkin Patch Up! Pumpkin With Ginger",
      price: "$1,452.500",
      quantity: 1638,
      sale: 20,
      stock: "Out of stock",
      startDate: "$28,672.36",
      image:
        "https://via.placeholder.com/60x60.png?text=Pumpkin",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-2xl font-bold">Add Attribute</h2>

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mt-2 sm:mt-0">
          <span>Dashboard</span> &gt; <span>Ecommerce</span> &gt;{" "}
          <span className="text-gray-800 font-medium">Product List</span>
        </div>
      </div>

      {/* Tip Bar */}
      <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 text-sm text-gray-600 px-4 py-2 rounded-lg mb-6">
        <Info className="w-5 h-5 text-blue-500 mt-0.5" />
        <p>
          Tip search by Product ID: Each product is provided with a unique ID,
          which you can rely on to find the exact product you need.
        </p>
      </div>

      {/* Controls Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Show Entries */}
        <div className="flex items-center gap-2 text-sm">
          <span>Showing</span>
          <select className="border rounded-md px-2 py-1 text-sm">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span>entries</span>
        </div>

        {/* Search + Add New */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-72">
            <input
              type="text"
              placeholder="Search here..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>

          {/* Add New Button */}
          <button className="flex items-center justify-center gap-2 border border-blue-500 text-blue-600 px-5 py-2 rounded-lg hover:bg-blue-50 transition">
            <Plus className="w-5 h-5" />
            Add new
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Product ID</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Sale</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Start date</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <span className="truncate max-w-[200px] font-medium">
                    {p.name}
                  </span>
                </td>
                <td className="px-4 py-3">{p.id}</td>
                <td className="px-4 py-3">{p.price}</td>
                <td className="px-4 py-3">{p.quantity}</td>
                <td className="px-4 py-3">{p.sale}</td>
                <td className="px-4 py-3">
                  <span className="text-red-500 rounded-md text-xs">
                    {p.stock}
                  </span>
                </td>
                <td className="px-4 py-3">{p.startDate}</td>
                <td className="px-4 py-3 flex items-center gap-3">
                  <Eye className="w-5 h-5 text-blue-500 cursor-pointer hover:scale-110 transition" />
                  <Pencil className="w-5 h-5 text-green-500 cursor-pointer hover:scale-110 transition" />
                  <Trash2 className="w-5 h-5 text-red-500 cursor-pointer hover:scale-110 transition" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
