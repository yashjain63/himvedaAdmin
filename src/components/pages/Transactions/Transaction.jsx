import { useState } from "react";
import { Search } from "lucide-react";

const transactionsData = [
  {
    id: "#456667",
    paid: 294.0,
    method: {
      name: "Amex",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg",
    },
    date: "Jan 20, 2024",
  },
  {
    id: "#134768",
    paid: 294.0,
    method: {
      name: "Master card",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
    },
    date: "Sep 02, 2024",
  },
  {
    id: "#138721",
    paid: 294.0,
    method: {
      name: "Paypal",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
    },
    date: "Jan 18, 2024",
  },
  {
    id: "#132028",
    paid: 294.0,
    method: {
      name: "Amex",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg",
    },
    date: "Nov 10, 2024",
  },
  {
    id: "#024768",
    paid: 294.0,
    method: {
      name: "Master card",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
    },
    date: "Jan 18, 2024",
  },
  {
    id: "#137468",
    paid: 294.0,
    method: {
      name: "Master card",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
    },
    date: "Nov 10, 2024",
  },
  {
    id: "#694768",
    paid: 294.0,
    method: {
      name: "Paypal",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
    },
    date: "Jan 18, 2024",
  },
  {
    id: "#134768",
    paid: 294.0,
    method: {
      name: "Visa",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
    },
    date: "Nov 10, 2024",
  },
];

export default function TransactionList() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Methods");

  const filteredTransactions = transactionsData.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.method.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All Methods" || t.method.name === filter;
    return matchesSearch && matchesFilter;
  });

  const paymentMethods = ["All Methods", "Amex", "Master card", "Paypal", "Visa"];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-3xl font-semibold">Transactions List</h1>

        <div className="text-sm text-gray-500 mt-2 sm:mt-0">
          <span>Transactions</span> &gt;{" "}
          <span className="text-gray-800 font-medium">Transactions List</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-end gap-4 mb-6">
        {/* Dropdown Filter */}
        <select
          className="w-full md:w-1/4 px-4 py-2 border text-red-900 border-red-900 rounded-lg outline-none"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}>
          {paymentMethods.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="px-4 py-3">Transaction ID</th>
              <th className="px-4 py-3">Paid</th>
              <th className="px-4 py-3">Method</th>
              <th className="px-4 py-3">Date</th>
              {/* <th className="p-3 text-left">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((t, idx) => (
              <tr
                key={idx}
                className="border-t hover:bg-gray-50 align-middle transition"
              >
                <td className="px-4 py-3">{t.id}</td>

                <td className="px-4 py-3">₹{t.paid.toFixed(2)}</td>

                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={t.method.logo}
                    alt={t.method.name}
                    className="w-6 h-6 rounded-md object-cover"
                  />
                  <span className="truncate max-w-[200px] font-medium">
                    {t.method.name}
                  </span>
                </td>

                <td className="px-4 py-3">{t.date}</td>
                {/* <td className="p-3">
                  <button className="px-4 py-1 text-sm rounded-lg border border-red-900 text-red-900 hover:bg-red-900 hover:text-white transition">
                    Details
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredTransactions.map((t, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md p-4 space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Transaction ID</span>
              <span className="font-medium">{t.id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Paid</span>
              <span className="font-medium">₹{t.paid.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Method</span>
              <div className="flex items-center gap-2">
                <img
                  src={t.method.logo}
                  alt={t.method.name}
                  className="w-6 h-6 object-contain"
                />
                <span>{t.method.name}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Date</span>
              <span>{t.date}</span>
            </div>
            <button className="w-full mt-2 px-4 py-2 text-sm rounded-lg border border-red-900 text-red-900 hover:bg-red-900 hover:text-white transition">
              Details
            </button>
          </div>
        ))}
      </div>

      {filteredTransactions.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          No transactions found.
        </div>
      )}
    </div>
  );
}


















// import { useState } from "react";
// import { Search } from "lucide-react";

// const transactionsData = [
//   {
//     id: "#456667",
//     paid: 294.0,
//     method: { name: "Amex", logo: "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" },
//     date: "Jan 20, 2024",
//   },
//   {
//     id: "#134768",
//     paid: 294.0,
//     method: { name: "Master card", logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" },
//     date: "Sep 02, 2024",
//   },
//   {
//     id: "#138721",
//     paid: 294.0,
//     method: { name: "Paypal", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
//     date: "Jan 18, 2024",
//   },
//   {
//     id: "#132028",
//     paid: 294.0,
//     method: { name: "Amex", logo: "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" },
//     date: "Nov 10, 2024",
//   },
//   {
//     id: "#024768",
//     paid: 294.0,
//     method: { name: "Master card", logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" },
//     date: "Jan 18, 2024",
//   },
//   {
//     id: "#137468",
//     paid: 294.0,
//     method: { name: "Master card", logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" },
//     date: "Nov 10, 2024",
//   },
//   {
//     id: "#694768",
//     paid: 294.0,
//     method: { name: "Paypal", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
//     date: "Jan 18, 2024",
//   },
//   {
//     id: "#134768",
//     paid: 294.0,
//     method: { name: "Visa", logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" },
//     date: "Nov 10, 2024",
//   },
// ];

// export default function TransactionList() {
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("All Methods");

//   const filteredTransactions = transactionsData.filter((t) => {
//     const matchesSearch =
//       t.id.toLowerCase().includes(search.toLowerCase()) ||
//       t.method.name.toLowerCase().includes(search.toLowerCase());
//     const matchesFilter = filter === "All Methods" || t.method.name === filter;
//     return matchesSearch && matchesFilter;
//   });

//   const paymentMethods = ["All Methods", "Amex", "Master card", "Paypal", "Visa"];

//   return (
//     <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
//         <h1 className="text-3xl font-semibold">Transactions List</h1>
//         <div className="text-sm text-gray-500 mt-2 sm:mt-0">
//           <span>Transactions</span> &gt;{" "}
//           <span className="text-gray-800 font-medium">Transactions List</span>
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row md:items-center justify-end gap-4 mb-6">
//         <select
//           className="w-full md:w-1/4 px-4 py-2 border border-red-900 text-red-900 rounded-lg outline-none"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}>
//           {paymentMethods.map((method) => (
//             <option key={method} value={method}>
//               {method}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto bg-white rounded-xl shadow">
//         <table className="w-full text-sm">
//           <thead className="bg-gray-100 text-gray-700">
//             <tr>
//               <th className="p-3 text-left">Transaction ID</th>
//               <th className="p-3 text-left">Paid</th>
//               <th className="p-3 text-left">Method</th>
//               <th className="p-3 text-left">Date</th>
//               <th className="p-3 text-left">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredTransactions.map((t, idx) => (
//               <tr
//                 key={idx}
//                 className="border-t hover:bg-gray-50 transition"
//               >
//                 <td className="p-3">{t.id}</td>
//                 <td className="p-3 font-medium">₹{t.paid.toFixed(2)}</td>
//                 <td className="p-3 flex items-center gap-2">
//                   <img src={t.method.logo} alt={t.method.name} className="w-6 h-6 object-contain" />
//                   {t.method.name}
//                 </td>
//                 <td className="p-3">{t.date}</td>
//                 <td className="p-3">
//                   <button className="px-4 py-1 text-sm rounded-lg border border-red-900 text-red-900 hover:bg-red-900 cursor-pointer hover:text-white transition">
//                     Details
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {filteredTransactions.length === 0 && (
//           <div className="p-6 text-center text-gray-500">No transactions found.</div>
//         )}
//       </div>
//     </div>
//   );
// }
