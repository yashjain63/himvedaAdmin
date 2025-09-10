import { useState } from "react";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductList() {
    const [search, setSearch] = useState("");
    const [entries, setEntries] = useState(5);
    const [orders, setOrders] = useState([
        {
            order_id: "#6612201",
            name: "GlowRoot Base",
            price: "₹1,452.500",
            quantity: 1638,
            payment: "COD",
            status: "Success",
            tracking: "Track",
            image: "/images/protct1.png",
        },
        {
            order_id: "#6612202",
            name: "Bhringa Root",
            price: "₹1,452.500",
            quantity: 1638,
            payment: "UPI",
            status: "Pending",
            tracking: "Track",
            image: "/images/protct2.png",
        },
        {
            order_id: "#6612203",
            name: "Amla Root Therapy",
            price: "₹1,452.500",
            quantity: 1638,
            payment: "Card",
            status: "Pending",
            tracking: "Track",
            image: "/images/protct3.png",
        },
        {
            order_id: "#6612204",
            name: "Tulsi Touch",
            price: "₹1,452.500",
            quantity: 1638,
            payment: "COD",
            status: "Cancelled",
            tracking: "Track",
            image: "/images/protct1.png",
        },
        {
            order_id: "#6612205",
            name: "Haldi Heal",
            price: "₹1,452.500",
            quantity: 1638,
            payment: "Card",
            status: "Success",
            tracking: "Track",
            image: "/images/protct2.png",
        },
        {
            order_id: "#6612206",
            name: "Keshamrit oil",
            price: "₹1,452.500",
            quantity: 1638,
            payment: "Card",
            status: "Success",
            tracking: "Track",
            image: "/images/protct3.png",
        },
        {
            order_id: "#6612207",
            name: "Fish oil",
            price: "₹1,452.500",
            quantity: 1638,
            payment: "COD",
            status: "Pending",
            tracking: "Track",
            image: "/images/protct1.png",
        },
        {
            order_id: "#6612208",
            name: "AyuBody Bliss",
            price: "₹1,452.500",
            quantity: 1638,
            payment: "UPI",
            status: "Success",
            tracking: "Track",
            image: "/images/protct2.png",
        },
        {
            order_id: "#6612209",
            name: "Turmeriche Root",
            price: "₹1,452.500",
            quantity: 1638,
            payment: "UPI",
            status: "Pending",
            tracking: "Track",
            image: "/images/protct3.png",
        },
        {
            order_id: "#6612210",
            name: "ChandanSilky Soap",
            price: "₹1,452.500",
            quantity: 1638,
            payment: "COD",
            status: "Pending",
            tracking: "Track",
            image: "/images/protct1.png",
        },
        {
            order_id: "#6612211",
            name: "Herbal Tea",
            price: "₹1,452.500",
            quantity: 1638,
            payment: "Card",
            status: "Success",
            tracking: "Track",
            image: "/images/protct2.png",
        },
        {
            order_id: "#6612212",
            name: "Herbal Shampoo",
            price: "₹1,452.500",
            quantity: 1638,
            payment: "Card",
            status: "Success",
            tracking: "Track",
            image: "/images/protct3.png",
        },
        {
            order_id: "#6612213",
            name: "Herbal Conditioner",
            price: "₹1,452.500",
            quantity: 1638,
            payment: "COD",
            status: "Cancelled",
            tracking: "Track",
            image: "/images/protct1.png",
        },
        {
            order_id: "#6612214",
            name: "Herbal Face Wash",
            price: "₹1,452.500",
            quantity: 1638,
            payment: "COD",
            status: "Success",
            tracking: "Track",
            image: "/images/protct2.png",
        },
        {
            order_id: "#6612215",
            name: "Amla Root oil",
            price: "₹1,452.500",
            quantity: 1638,
            payment: "UPI",
            status: "Pending",
            tracking: "Track",
            image: "/images/protct3.png",
        },
    ]);

    // Filter orders by search
    const filteredOrders = orders.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    // Limit orders shown by "entries" dropdown
    const displayedOrders = filteredOrders.slice(0, entries);

    // Handlers
    const handleView = (order) => {
        alert(`Order Details:\n\nName: ${order.name}\nPrice: ${order.price}\nStatus: ${order.status}`);
    };

    const handleEdit = (order) => {
        const newName = prompt("Edit order name:", order.name);
        if (newName) {
            setOrders((prev) =>
                prev.map((p) => (p.order_id === order.order_id ? { ...p, name: newName } : p))
            );
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            setOrders((prev) => prev.filter((p) => p.order_id !== id));
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <h1 className="text-3xl font-semibold">Order List</h1>

                {/* Breadcrumb */}
                <div className="text-sm text-gray-500 mt-2 sm:mt-0">
                    <span>Orders</span> &gt;{" "}
                    <span className="text-gray-800 font-medium">Order List</span>
                </div>
            </div>

            {/* Controls Row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                {/* Show Entries */}
                <div className="flex items-center gap-2 text-sm">
                    <span>Showing</span>
                    <select
                        className="border border-gray-300 rounded-md outline-none px-2 py-1 text-sm"
                        value={entries}
                        onChange={(e) => setEntries(Number(e.target.value))}
                    >
                        <option value={5}>5</option>
                        <option value={15}>15</option>
                        <option value={50}>50</option>
                    </select>
                    <span>orders</span>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                    {/* Add New Button */}
                    {/* <Link to="/orders/add">
                        <button className="flex items-center text-[15px] justify-center gap-2 border border-red-900 text-red-900 px-5 py-2 rounded-lg hover:bg-red-900 hover:text-white transition">
                            <Plus className="w-5 h-5" />
                            Add new
                        </button>
                    </Link> */}
                </div>
            </div>

            {/* Product Table */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-600 text-sm">
                        <tr>
                            <th className="px-4 py-3">Order</th>
                            <th className="px-4 py-3">Order ID</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">Quantity</th>
                            <th className="px-4 py-3">Payment</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Tracking</th>
                            <th className="px-4 py-3 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedOrders.map((p, index) => (
                            <tr
                                key={index}
                                className="border-t hover:bg-gray-50 align-middle transition"
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
                                <td className="px-4 py-3">{p.order_id}</td>
                                <td className="px-4 py-3">{p.price}</td>
                                <td className="px-4 py-3">{p.quantity}</td>
                                <td className="px-4 py-3">{p.payment}</td>
                                <td className="px-4 py-3">
                                    {/* <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${p.status.toLowerCase() === "success"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}>
                                        {p.status}
                                    </span> */}
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${p.status.toLowerCase() === "success"
                                            ? "bg-green-100 text-green-700"
                                            : p.status.toLowerCase() === "pending"
                                            ? "bg-gray-100 text-gray-500"
                                            : "bg-red-100 text-red-700"
                                            }`}>
                                        {p.status}
                                    </span>
                                </td>
                                <td className="px-4 ">
                                    <span className="text-blue-600 font-semibold hover:text-blue-800 cursor-pointer">
                                        {p.tracking}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex mr-5 justify-center gap-3 h-full">
                                        <button
                                            className="text-blue-600 hover:text-blue-800 cursor-pointer">
                                            {/* // onClick={() => handleView(p)} */}
                                            <Link to="/orders/detail ">
                                                <Eye className="w-5 h-5" />
                                            </Link>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {displayedOrders.length === 0 && (
                            <tr>
                                <td
                                    colSpan="8"
                                    className="text-center text-gray-500 py-6 italic"
                                >
                                    No orders found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

