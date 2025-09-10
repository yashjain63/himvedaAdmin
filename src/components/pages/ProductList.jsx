// ...............PRODUCT LIST.............................
import { useState } from "react";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(5);
  const [products, setProducts] = useState([
    {
      id: "#7712301",
      name: "Dog Food, Chicken & Chicken Liver Recipe",
      price: "$1,452.500",
      quantity: 1638,
      sale: 20,
      stock: "In stock",
      revenue: "$28,672.36",
      image: "/images/protct1.png",
    },
    {
      id: "#7712302",
      name: "Grain Free Dry Dog Food | Rachael Ray® Nutrish®",
      price: "$1,452.500",
      quantity: 1638,
      sale: 20,
      stock: "Out of stock",
      revenue: "$28,672.36",
      image: "/images/protct2.png",
    },
    {
      id: "#7712303",
      name: "Weruva Pumpkin Patch Up! Pumpkin With Ginger",
      price: "$1,452.500",
      quantity: 1638,
      sale: 20,
      stock: "In stock",
      revenue: "$28,672.36",
      image: "/images/protct3.png",
    },
    {
      id: "#7712304",
      name: "Dog Food, Chicken & Chicken Liver Recipe",
      price: "$1,452.500",
      quantity: 1638,
      sale: 20,
      stock: "In stock",
      revenue: "$28,672.36",
      image: "/images/protct1.png",
    },
    {
      id: "#7712305",
      name: "Grain Free Dry Dog Food | Rachael Ray® Nutrish®",
      price: "$1,452.500",
      quantity: 1638,
      sale: 20,
      stock: "Out of stock",
      revenue: "$28,672.36",
      image: "/images/protct2.png",
    },
    {
      id: "#7712306",
      name: "Weruva Pumpkin Patch Up! Pumpkin With Ginger",
      price: "$1,452.500",
      quantity: 1638,
      sale: 20,
      stock: "In stock",
      revenue: "$28,672.36",
      image: "/images/protct3.png",
    },
    {
      id: "#7712307",
      name: "Dog Food, Chicken & Chicken Liver Recipe",
      price: "$1,452.500",
      quantity: 1638,
      sale: 20,
      stock: "In stock",
      revenue: "$28,672.36",
      image: "/images/protct1.png",
    },
    {
      id: "#7712308",
      name: "Grain Free Dry Dog Food | Rachael Ray® Nutrish®",
      price: "$1,452.500",
      quantity: 1638,
      sale: 20,
      stock: "Out of stock",
      revenue: "$28,672.36",
      image: "/images/protct2.png",
    },
    {
      id: "#7712309",
      name: "Weruva Pumpkin Patch Up! Pumpkin With Ginger",
      price: "$1,452.500",
      quantity: 1638,
      sale: 20,
      stock: "In stock",
      revenue: "$28,672.36",
      image: "/images/protct3.png",
    },
    {
      id: "#7712310",
      name: "Dog Food, Chicken & Chicken Liver Recipe",
      price: "$1,452.500",
      quantity: 1638,
      sale: 20,
      stock: "In stock",
      revenue: "$28,672.36",
      image: "/images/protct1.png",
    },
    {
      id: "#7712311",
      name: "Grain Free Dry Dog Food | Rachael Ray® Nutrish®",
      price: "$1,452.500",
      quantity: 1638,
      sale: 20,
      stock: "Out of stock",
      revenue: "$28,672.36",
      image: "/images/protct2.png",
    },
    {
      id: "#7712312",
      name: "Weruva Pumpkin Patch Up! Pumpkin With Ginger",
      price: "$1,452.500",
      quantity: 1638,
      sale: 20,
      stock: "In stock",
      revenue: "$28,672.36",
      image: "/images/protct3.png",
    },
    {
      id: "#7712313",
      name: "Dog Food, Chicken & Chicken Liver Recipe",
      price: "$1,452.500",
      quantity: 1638,
      sale: 20,
      stock: "In stock",
      revenue: "$28,672.36",
      image: "/images/protct1.png",
    },
    {
      id: "#7712314",
      name: "Grain Free Dry Dog Food | Rachael Ray® Nutrish®",
      price: "$1,452.500",
      quantity: 1638,
      sale: 20,
      stock: "Out of stock",
      revenue: "$28,672.36",
      image: "/images/protct2.png",
    },
    {
      id: "#7712315",
      name: "Weruva Pumpkin Patch Up! Pumpkin With Ginger",
      price: "$1,452.500",
      quantity: 1638,
      sale: 20,
      stock: "In stock",
      revenue: "$28,672.36",
      image: "/images/protct3.png",
    },
  ]);

  // Filter products by search
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Limit products shown by "entries" dropdown
  const displayedProducts = filteredProducts.slice(0, entries);

  // Handlers
  const handleView = (product) => {
    alert(`Product Details:\n\nName: ${product.name}\nPrice: ${product.price}\nStock: ${product.stock}`);
  };

  const handleEdit = (product) => {
    const newName = prompt("Edit product name:", product.name);
    if (newName) {
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, name: newName } : p))
      );
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-3xl font-semibold">Product List</h1>

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mt-2 sm:mt-0">
          <span>Products</span> &gt;{" "}
          <span className="text-gray-800 font-medium">Product List</span>
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
          <span>Products</span>
        </div>

        {/* Search + Add New */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          {/* Uncomment if you want search bar */}
          {/* <div className="flex items-center border border-gray-300 rounded-lg px-2 py-1 w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search product..."
              className="w-full outline-none text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div> */}

          {/* Add New Button */}
          <Link to="/products/add">
            <button className="flex items-center text-[15px] justify-center gap-2 border border-red-900 text-red-900 px-5 py-2 rounded-lg hover:bg-red-900 hover:text-white transition">
              <Plus className="w-5 h-5" />
              Add new
            </button>
          </Link>
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
              <th className="px-4 py-3">Revenue</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map((p, index) => (
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
                <td className="px-4 py-3">{p.id}</td>
                <td className="px-4 py-3">{p.price}</td>
                <td className="px-4 py-3">{p.quantity}</td>
                <td className="px-4 py-3">{p.sale}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      p.stock.toLowerCase() === "in stock"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.stock}
                  </span>
                </td>
                <td className="px-4 ">{p.revenue}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-3 h-full">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => handleView(p)}
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      className="text-green-600 hover:text-green-800"
                      onClick={() => handleEdit(p)}
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(p.id)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {displayedProducts.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  className="text-center text-gray-500 py-6 italic"
                >
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}




















// // import { useState } from "react";
// // import { Plus, Search, Eye, Pencil, Trash2 } from "lucide-react";
// // import { Link } from "react-router-dom";
// // import AddProduct from "./AddProduct";

// // export default function ProductList() {
// //   const [search, setSearch] = useState("");
// //   const [entries, setEntries] = useState(5);

// //   // Sample data
// //   const products = [
// //     {
// //       id: "#7712309",
// //       name: "Dog Food, Chicken & Chicken Liver Recipe",
// //       price: "$1,452.500",
// //       quantity: 1638,
// //       sale: 20,
// //       stock: "In stock",
// //       revenue: "$28,672.36",
// //       image: "/images/protct1.png",
// //     },
// //     {
// //       id: "#7712309",
// //       name: "Grain Free Dry Dog Food | Rachael Ray® Nutrish®",
// //       price: "$1,452.500",
// //       quantity: 1638,
// //       sale: 20,
// //       stock: "Out of stock",
// //       revenue: "$28,672.36",
// //       image: "/images/protct2.png",
// //     },
// //     {
// //       id: "#7712309",
// //       name: "Weruva Pumpkin Patch Up! Pumpkin With Ginger",
// //       price: "$1,452.500",
// //       quantity: 1638,
// //       sale: 20,
// //       stock: "In stock",
// //       revenue: "$28,672.36",
// //       image: "/images/protct3.png",
// //     },
// //   ];

// //   // Filter products by search
// //   const filteredProducts = products.filter((p) =>
// //     p.name.toLowerCase().includes(search.toLowerCase())
// //   );

// //   // Limit products shown by "entries" dropdown
// //   const displayedProducts = filteredProducts.slice(0, entries);

// //   return (
// //     <div className="p-6 bg-gray-50 min-h-screen">
// //       {/* Top Bar */}
// //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
// //         <h1 className="text-3xl font-semibold">Product List</h1>

// //         {/* Breadcrumb */}
// //         <div className="text-sm text-gray-500 mt-2 sm:mt-0">
// //           <span>Products</span> &gt;{" "}
// //           <span className="text-gray-800 font-medium">Product List</span>
// //         </div>
// //       </div>

// //       {/* Controls Row */}
// //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
// //         {/* Show Entries */}
// //         <div className="flex items-center gap-2 text-sm">
// //           <span>Showing</span>
// //           <select
// //             className="border border-gray-300 rounded-md outline-none px-2 py-1 text-sm"
// //             value={entries}
// //             onChange={(e) => setEntries(Number(e.target.value))}
// //           >
// //             <option value={5}>5</option>
// //             <option value={15}>15</option>
// //             <option value={50}>50</option>
// //           </select>
// //           <span>Products</span>
// //         </div>

// //         {/* Search + Add New */}
// //         <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
// //           {/* Search */}
// //           {/* <div className="flex items-center border border-gray-300 rounded-lg px-2 py-1 w-full sm:w-64">
// //             <Search className="w-4 h-4 text-gray-500 mr-2" />
// //             <input
// //               type="text"
// //               placeholder="Search product..."
// //               className="w-full outline-none text-sm"
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //             />
// //           </div> */}

// //           {/* Add New Button */}
// //           <Link to="/products/add">
// //             <button className="flex items-center text-[15px] justify-center gap-2 border border-red-900 text-red-900 px-5 py-2 rounded-lg hover:bg-red-50 transition">
// //               <Plus className="w-5 h-5" />
// //               Add new
// //             </button>
// //           </Link>
// //         </div>
// //       </div>

// //       {/* Product Table */}
// //       <div className="overflow-x-auto bg-white shadow-md rounded-lg">
// //         <table className="w-full text-sm text-left">
// //           <thead className="bg-gray-100 text-gray-600 text-sm">
// //             <tr>
// //               <th className="px-4 py-3">Product</th>
// //               <th className="px-4 py-3">Product ID</th>
// //               <th className="px-4 py-3">Price</th>
// //               <th className="px-4 py-3">Quantity</th>
// //               <th className="px-4 py-3">Sale</th>
// //               <th className="px-4 py-3">Stock</th>
// //               <th className="px-4 py-3">Revenue</th>
// //               <th className="px-4 py-3">Action</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {displayedProducts.map((p, index) => (
// //               <tr
// //                 key={index}
// //                 className="border-t hover:bg-gray-50 align-middle transition"
// //               >
// //                 <td className="px-4 py-3 flex items-center gap-3">
// //                   <img
// //                     src={p.image}
// //                     alt={p.name}
// //                     className="w-12 h-12 rounded-md object-cover"
// //                   />
// //                   <span className="truncate max-w-[200px] font-medium">
// //                     {p.name}
// //                   </span>
// //                 </td>
// //                 <td className="px-4 py-3">{p.id}</td>
// //                 <td className="px-4 py-3">{p.price}</td>
// //                 <td className="px-4 py-3">{p.quantity}</td>
// //                 <td className="px-4 py-3">{p.sale}</td>
// //                 <td className="px-4 py-3">
// //                   <span
// //                     className={`rounded-md text-xs ${p.stock.toLowerCase() === "in stock"
// //                         ? "text-green-600"
// //                         : "text-red-500"
// //                       }`}
// //                   >
// //                     {p.stock}
// //                   </span>
// //                 </td>

// //                 <td className="px-4 ">{p.revenue}</td>
// //                 <td className="px-4 py-3">
// //                   <div className="flex items-center justify-center gap-3 h-full">
// //                     <button className="text-blue-600 hover:text-blue-800">
// //                       <Eye className="w-5 h-5" />
// //                     </button>
// //                     <button className="text-green-600 hover:text-green-800">
// //                       <Pencil className="w-5 h-5" />
// //                     </button>
// //                     <button className="text-red-600 hover:text-red-800">
// //                       <Trash2 className="w-5 h-5" />
// //                     </button>
// //                   </div>
// //                 </td>
// //               </tr>
// //             ))}
// //             {displayedProducts.length === 0 && (
// //               <tr>
// //                 <td
// //                   colSpan="8"
// //                   className="text-center text-gray-500 py-6 italic"
// //                 >
// //                   No products found
// //                 </td>
// //               </tr>
// //             )}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }





















// // import { useState } from "react";
// // import { Plus, Search, Info, Eye, Pencil, Trash2 } from "lucide-react";

// // export default function ProductList() {
// //   const [search, setSearch] = useState("");

// //   // Sample data
// //   const products = [
// //     {
// //       id: "#7712309",
// //       name: "Dog Food, Chicken & Chicken Liver Recipe",
// //       price: "$1,452.500",
// //       quantity: 1638,
// //       sale: 20,
// //       stock: "Out of stock",
// //       revenue: "$28,672.36",
// //       image: "/images/protct1.png"
// //     },
// //     {
// //       id: "#7712309",
// //       name: "Grain Free Dry Dog Food | Rachael Ray® Nutrish®",
// //       price: "$1,452.500",
// //       quantity: 1638,
// //       sale: 20,
// //       stock: "Out of stock",
// //       revenue: "$28,672.36",
// //       image: "/images/protct2.png"
// //     },
// //     {
// //       id: "#7712309",
// //       name: "Weruva Pumpkin Patch Up! Pumpkin With Ginger",
// //       price: "$1,452.500",
// //       quantity: 1638,
// //       sale: 20,
// //       stock: "Out of stock",
// //       revenue: "$28,672.36",
// //       image: "/images/protct3.png"
// //     },
// //     {
// //       id: "#7712309",
// //       name: "Weruva Pumpkin Patch Up! Pumpkin With Ginger",
// //       price: "$1,452.500",
// //       quantity: 1638,
// //       sale: 20,
// //       stock: "Out of stock",
// //       revenue: "$28,672.36",
// //       image: "/images/protct4.png"
// //     },

// //   ];

// //   return (
// //     <div className="p-6 bg-gray-50 min-h-screen">
// //       {/* Top Bar */}
// //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
// //         <h1 className="text-3xl font-semibold">Product List</h1>

// //         {/* Breadcrumb */}
// //         <div className="text-sm text-gray-500 mt-2 sm:mt-0">
// //          <span>Products</span> &gt;{" "}
// //           <span className="text-gray-800 font-medium">Product List</span>
// //         </div>
// //       </div>

// //       {/* Tip Bar */}
// //       {/* <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 text-sm text-gray-600 px-4 py-2 rounded-lg mb-6">
// //         <Info className="w-5 h-5 text-blue-500 mt-0.5" />
// //         <p>
// //           Tip search by Product ID: Each product is provided with a unique ID,
// //           which you can rely on to find the exact product you need.
// //         </p>
// //       </div> */}

// //       {/* Controls Row */}
// //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
// //         {/* Show Entries */}
// //         <div className="flex items-center gap-2 text-sm">
// //           <span>Showing</span>
// //           <select className="border border-gray-300 rounded-md outline-none px-2 py-1 text-sm">
// //             <option>10</option>
// //             <option>25</option>
// //             <option>50</option>
// //           </select>
// //           <span>entries</span>
// //         </div>

// //         {/* Search + Add New */}
// //         <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
// //           {/* Search Box */}
// //           {/* <div className="relative flex-1 sm:w-72">
// //             <input
// //               type="text"
// //               placeholder="Search here..."
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //               className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm outline-none"
// //             />
// //             <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
// //           </div> */}

// //           {/* Add New Button */}
// //           <button className="flex items-center text-[15px] justify-center gap-2 border border-red-900 text-red-900 px-5 py-2 rounded-lg hover:bg-red-50 transition">
// //             <Plus className="w-5 h-5" />
// //             Add new
// //           </button>
// //         </div>
// //       </div>

// //       {/* Product Table */}
// //       <div className="overflow-x-auto bg-white shadow-md rounded-lg">
// //         <table className="w-full text-sm text-left">
// //           <thead className="bg-gray-100 text-gray-600 text-sm">
// //             <tr>
// //               <th className="px-4 py-3">Product</th>
// //               <th className="px-4 py-3">Product ID</th>
// //               <th className="px-4 py-3">Price</th>
// //               <th className="px-4 py-3">Quantity</th>
// //               <th className="px-4 py-3">Sale</th>
// //               <th className="px-4 py-3">Stock</th>
// //               <th className="px-4 py-3">Start date</th>
// //               <th className="px-4 py-3">Action</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {products.map((p, index) => (
// //               <tr
// //                 key={index}
// //                 className="border-t hover:bg-gray-50 align-middle transition"
// //               >
// //                 <td className="px-4 py-3 flex items-center gap-3">
// //                   <img
// //                     src={p.image}
// //                     alt={p.name}
// //                     className="w-12 h-12 rounded-md object-cover"
// //                   />
// //                   <span className="truncate max-w-[200px] font-medium">
// //                     {p.name}
// //                   </span>
// //                 </td>
// //                 <td className="px-4 py-3">{p.id}</td>
// //                 <td className="px-4 py-3">{p.price}</td>
// //                 <td className="px-4 py-3">{p.quantity}</td>
// //                 <td className="px-4 py-3">{p.sale}</td>
// //                 <td className="px-4 py-3">
// //                   <span className="text-red-500 rounded-md text-xs">
// //                     {p.stock}
// //                   </span>
// //                 </td>
// //                 <td className="px-4 ">{p.revenue}</td>
// //                 <td className="px-4 py-3">
// //                   <div className="flex items-center justify-center gap-3 h-full">
// //                     <button className="text-blue-600 hover:text-blue-800">
// //                       <Eye className="w-5 h-5" />
// //                     </button>
// //                     <button className="text-green-600 hover:text-green-800">
// //                       <Pencil className="w-5 h-5" />
// //                     </button>
// //                     <button className="text-red-600 hover:text-red-800">
// //                       <Trash2 className="w-5 h-5" />
// //                     </button>
// //                   </div>
// //                 </td>
// //                 {/* <td className="px-4 pt-0 flex items-center gap-3">
// //                   <Eye className="w-5 h-5 text-blue-500 cursor-pointer hover:scale-110 transition" />
// //                   <Pencil className="w-5 h-5 text-green-500 cursor-pointer hover:scale-110 transition" />
// //                   <Trash2 className="w-5 h-5 text-red-500 cursor-pointer hover:scale-110 transition" />
// //                 </td> */}
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }
