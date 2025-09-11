import { useState } from "react";
import {
  Eye,
  Plus,
  Pencil,
  Trash2,
  ReceiptText,
  ClipboardClock,
  ClipboardCheck,
  ClipboardX,
} from "lucide-react";
import { Link } from "react-router-dom";

const invoicesData = [
  { id: "#INV2540", name: "Shubhangi Bishnoi", date: "07 Jan, 2023", total: "₹452", method: "Mastercard", status: "Completed" },
  { id: "#INV3924", name: "Anuj Khanna", date: "03 Dec, 2023", total: "₹783", method: "Visa", status: "Cancelled" },
  { id: "#INV5032", name: "Tejasvi Matre", date: "28 Sep, 2023", total: "₹134", method: "Paypal", status: "Completed" },
  { id: "#INV1695", name: "Rohan Sharma", date: "06 Aug, 2023", total: "₹945", method: "Mastercard", status: "Pending" },
  { id: "#INV2001", name: "Natik Saini", date: "15 Sept, 2024", total: "₹995", method: "Visa", status: "Cancelled" },
  { id: "#INV2002", name: "Mohit Pandey", date: "20 Aug, 2024", total: "₹995", method: "Visa", status: "Completed" },
  { id: "#INV2003", name: "Parnav Sharma", date: "22 Aug, 2023", total: "₹995", method: "Visa", status: "Completed" },
  { id: "#INV2004", name: "Raghu Kumar", date: "30 Nov, 2024", total: "₹825", method: "Mastercard", status: "Pending" },
];

export default function InvoiceList() {
  const [invoices, setInvoices] = useState(invoicesData);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Status badge colors
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-600";
      case "Pending":
        return "bg-yellow-100 text-yellow-600";
      case "Cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // Delete invoice by id
  const handleDelete = (id) => {
    setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
  };

  // Filter + search
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesFilter = filter === "All" || invoice.status === filter;
    const matchesSearch = invoice.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-3xl font-semibold">Invoice List</h1>
        <div className="text-sm text-gray-500 mt-2 sm:mt-0">
          <span>Invoices</span> &gt;{" "}
          <span className="text-gray-800 font-medium">Invoice List</span>
        </div>
      </div>

      {/* Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-xl flex justify-between shadow py-5 px-5 bg-white">
          <div>
            <h2 className="text-md text-gray-700 font-semibold">Total Invoice</h2>
            <p className="text-2xl font-bold">{invoices.length}</p>
          </div>
          <ReceiptText className="mt-2 text-blue-500" size={25} strokeWidth={1} />
        </div>
        <div className="rounded-xl flex justify-between shadow p-5 bg-white">
          <div>
            <h2 className="text-md text-gray-700 font-semibold">Pending Invoice</h2>
            <p className="text-2xl font-bold">
              {invoices.filter((i) => i.status === "Pending").length}
            </p>
          </div>
          <ClipboardClock className="mt-2 text-yellow-500" size={25} strokeWidth={1} />
        </div>
        <div className="rounded-xl flex justify-between shadow p-5 bg-white">
          <div>
            <h2 className="text-md text-gray-700 font-semibold">Paid Invoice</h2>
            <p className="text-2xl font-bold">
              {invoices.filter((i) => i.status === "Completed").length}
            </p>
          </div>
          <ClipboardCheck className="mt-2 text-green-500" size={25} strokeWidth={1} />
        </div>
        <div className="rounded-xl flex justify-between shadow p-5 bg-white">
          <div>
            <h2 className="text-md text-gray-700 font-semibold">Cancelled Invoice</h2>
            <p className="text-2xl font-bold">
              {invoices.filter((i) => i.status === "Cancelled").length}
            </p>
          </div>
          <ClipboardX className="mt-2 text-red-500" size={25} strokeWidth={1} />
        </div>
      </div>

      {/* Filters */}
      <div className="flex justify-between md:flex-row md:items-center md:justify-between">
        <div className="flex md:w-1/3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-5.5 py-2  border border-red-900 text-red-900 rounded-lg outline-none">
            <option value="All">All Invoices</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Add New Button */}
        <Link to="/invoice/create">
          <button className="flex items-center text-[15px] justify-center gap-2 border border-red-900 text-red-900 px-5 py-2 rounded-lg hover:bg-red-900 hover:text-white transition">
            <Plus className="w-5 h-5" />
            Create new
          </button>
        </Link>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-left text-sm">
              <th className="p-3">Invoice ID</th>
              <th className="p-3">Billing Name</th>
              <th className="p-3">Order Date</th>
              <th className="p-3">Total</th>
              <th className="p-3">Payment Method</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice, index) => (
              <tr key={index} className="border-t text-sm hover:bg-gray-50 transition">
                <td className="p-3">{invoice.id}</td>
                <td className="p-3">{invoice.name}</td>
                <td className="p-3">{invoice.date}</td>
                <td className="p-3">{invoice.total}</td>
                <td className="p-3">{invoice.method}</td>
                <td className="p-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="p-2 flex gap-2">
                  <Link to="/invoice/detail">
                    <button className="p-2 rounded-full hover:text-blue-800 text-blue-600 cursor-pointer">
                      <Eye className="w-4 h-4" />
                    </button>
                  </Link>
                  <button className="p-2 rounded-full hover:text-green-800 text-green-600 cursor-pointer">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(invoice.id)}
                    className="p-2 rounded-full hover:text-red-800 text-red-500 cursor-pointer">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="grid md:hidden gap-4">
        {filteredInvoices.map((invoice, index) => (
          <div key={index} className="p-4 bg-white rounded-2xl shadow space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold">{invoice.id}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                {invoice.status}
              </span>
            </div>
            <p className="text-sm">{invoice.name}</p>
            <p className="text-sm">{invoice.date}</p>
            <p className="text-sm">{invoice.method}</p>
            <p className="text-lg font-bold">{invoice.total}</p>
            <div className="flex gap-2 mt-2">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Eye className="w-4 h-4 text-blue-500" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Pencil className="w-4 h-4 text-green-600" />
              </button>
              <button
                onClick={() => handleDelete(invoice.id)}
                className="p-2 rounded-full hover:bg-gray-100 text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}















// import { useState } from "react";
// import { Eye, Edit, Trash, Plus, Pencil, Trash2, ReceiptText, ClipboardClock, ClipboardCheck, ClipboardX } from "lucide-react";
// import { Link } from "react-router-dom";

// const invoicesData = [
//   { id: "#INV2540", name: "Shubhangi Bishnoi", date: "07 Jan, 2023", total: "₹452", method: "Mastercard", status: "Completed" },
//   { id: "#INV3924", name: "Anuj Khanna", date: "03 Dec, 2023", total: "₹783", method: "Visa", status: "Cancelled" },
//   { id: "#INV5032", name: "Tejasvi Matre", date: "28 Sep, 2023", total: "₹134", method: "Paypal", status: "Completed" },
//   { id: "#INV1695", name: "Rohan Sharma", date: "06 Aug, 2023", total: "₹945", method: "Mastercard", status: "Pending" },
//   { id: "#INV1695", name: "Natik Saini", date: "15 Sept, 2024", total: "₹995", method: "Visa", status: "Cancelled" },
//   { id: "#INV1695", name: "Mohit Pandey", date: "20 Aug, 2024", total: "₹995", method: "Visa", status: "Completed" },
//   { id: "#INV1695", name: "Parnav Sharma", date: "22 Aug, 2023", total: "₹995", method: "Visa", status: "Completed" },
//   { id: "#INV1695", name: "Raghu Kumar", date: "30 Nov, 2024", total: "₹825", method: "Mastercard", status: "Pending" },
// ];

// export default function InvoiceList() {
//   const [invoices, setInvoices] = useState(invoicesData);
//   const [entries, setEntries] = useState();
//   const [filter, setFilter] = useState("All");
//   const [search, setSearch] = useState("");

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Completed":
//         return "bg-green-100 text-green-600";
//       case "Pending":
//         return "bg-yellow-100 text-yellow-600";
//       case "Cancelled":
//         return "bg-red-100 text-red-600";
//       default:
//         return "bg-gray-100 text-gray-600";
//     }
//   };

//   const filteredInvoices = invoices
//     .filter((invoice) => {
//       const matchesFilter =
//         filter === "All" || invoice.status === filter;
//       const matchesSearch = invoice.name
//         .toLowerCase()
//         .includes(search.toLowerCase());
//       return matchesFilter && matchesSearch;
//     })
//     .slice(0, entries); // Apply entries limit

//   return (
//     <div className="p-6 space-y-6">
//       {/* Top Bar */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
//         <h1 className="text-3xl font-semibold">Invoice List</h1>
//         <div className="text-sm text-gray-500 mt-2 sm:mt-0">
//           <span>Invoices</span> &gt;{" "}
//           <span className="text-gray-800 font-medium">Invoice List</span>
//         </div>
//       </div>

//       {/* Header Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <div className="rounded-xl flex justify-between shadow py-5 px-5 bg-white">
//           <div className="pb-3">
//             <h2 className="text-md text-gray-700 font-semibold">Total Invoice</h2>
//             <p className="text-2xl font-bold">{invoices.length}</p>
//           </div>
//           <ReceiptText className="mt-2 text-blue-500" size={25} strokeWidth={1} />
//         </div>
//         <div className="rounded-xl flex justify-between shadow p-5 bg-white">
//           <div>
//             <h2 className="text-md text-gray-700 font-semibold">Pending Invoice</h2>
//           <p className="text-2xl font-bold">{invoices.filter(i => i.status === "Pending").length}</p>
//           </div>
//           <ClipboardClock className="mt-2 text-yellow-500" size={25} strokeWidth={1} />
//         </div>
//         <div className="rounded-xl flex justify-between shadow p-5 bg-white">
//           <div>
//             <h2 className="text-md text-gray-700 font-semibold">Paid Invoice</h2>
//             <p className="text-2xl font-bold">{invoices.filter(i => i.status === "Completed").length}</p>
//           </div>
//           <ClipboardCheck className="mt-2 text-green-500" size={25} strokeWidth={1} />
//         </div>
//         <div className="rounded-xl flex justify-between shadow p-5 bg-white">
//           <div>
//             <h2 className="text-md text-gray-700 font-semibold">Cancelled Invoice</h2>
//           <p className="text-2xl font-bold">{invoices.filter(i => i.status === "Cancelled").length}</p>
//           </div>
//           <ClipboardX className="mt-2 text-red-500" size={25} strokeWidth={1} />
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="px-4 py-2 border border-red-900 text-red-900 rounded-lg outline-none w-full md:w-1/4"
//         >
//           <option value="All">All Invoices</option>
//           <option value="Completed">Completed Invoices</option>
//           <option value="Pending">Pending Invoices</option>
//           <option value="Cancelled">Cancelled Invoices</option>
//         </select>

//         {/* Add New Button */}
//         <Link to="/invoice/create">
//           <button className="flex items-center text-[15px] justify-center gap-2 border border-red-900 text-red-900 px-5 py-2 rounded-lg hover:bg-red-900 hover:text-white transition">
//             <Plus className="w-5 h-5" />
//             Create new
//           </button>
//         </Link>
//       </div>

//       {/* Desktop Table */}
//       <div className="hidden md:block overflow-x-auto bg-white rounded-2xl shadow">
//         <table className="w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-100 text-gray-600 text-left text-sm">
//               <th className="p-3">Invoice ID</th>
//               <th className="p-3">Billing Name</th>
//               <th className="p-3">Order Date</th>
//               <th className="p-3">Total</th>
//               <th className="p-3">Payment Method</th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredInvoices.map((invoice, index) => (
//               <tr key={index} className="border-t text-sm hover:bg-gray-50 transition">
//                 <td className="p-3">{invoice.id}</td>
//                 <td className="p-3">{invoice.name}</td>
//                 <td className="p-3">{invoice.date}</td>
//                 <td className="p-3">{invoice.total}</td>
//                 <td className="p-3">{invoice.method}</td>
//                 <td className="p-3">
//                   <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}>
//                     {invoice.status}
//                   </span>
//                 </td>
//                 <td className="p-2 flex gap-2">
//                   <button className="p-2 rounded-full hover:text-blue-800 text-blue-600 cursor-pointer"><Eye className="w-5 h-5 " /></button>
//                   <button className="p-2 rounded-full hover:text-green-800 text-green-600 cursor-pointer"><Pencil className="w-4 h-4 " /></button>
//                   <button className="p-2 rounded-full hover:text-red-800 text-red-500 cursor-pointer"><Trash2 className="w-4 h-4 " /></button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Mobile Card View */}
//       <div className="grid md:hidden gap-4">
//         {filteredInvoices.map((invoice, index) => (
//           <div key={index} className="p-4 bg-white rounded-2xl shadow space-y-2">
//             <div className="flex justify-between">
//               <span className="font-semibold">{invoice.id}</span>
//               <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
//                 {invoice.status}
//               </span>
//             </div>
//             <p className="text-sm">{invoice.name}</p>
//             <p className="text-sm">{invoice.date}</p>
//             <p className="text-sm">{invoice.method}</p>
//             <p className="text-lg font-bold">{invoice.total}</p>
//             <div className="flex gap-2 mt-2">
//               <button className="p-2 rounded-full hover:bg-gray-100"><Eye className="w-4 h-4 text-blue" /></button>
//               <button className="p-2 rounded-full hover:bg-gray-100"><Edit className="w-4 h-4" /></button>
//               <button className="p-2 rounded-full hover:bg-gray-100 text-red-500"><Trash className="w-4 h-4" /></button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
