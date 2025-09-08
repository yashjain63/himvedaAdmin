import { useState } from "react";
import { Upload, Calendar, X } from "lucide-react";

export default function AddProductPage() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("Male");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [date, setDate] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const handleImageUpload = (files) => {
    const newFiles = Array.from(files);
    setImages((prev) => [...prev, ...newFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageUpload(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-bold">Add Attribute</h2>
        <div className="text-sm text-gray-500 mt-2 sm:mt-0">
          <span>Dashboard</span> &gt; <span>Ecommerce</span> &gt;{" "}
          <span className="text-gray-800 font-medium">Add product</span>
        </div>
      </div>

      {/* Main Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Section */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-5">
          {/* Product Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Product name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-400 mt-1">
              Do not exceed 20 characters when entering the product name.
            </p>
          </div>

          {/* Category & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option>Choose category</option>
                <option>Food</option>
                <option>Toys</option>
                <option>Accessories</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Unisex</option>
              </select>
            </div>
          </div>

          {/* Brand */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Brand <span className="text-red-500">*</span>
            </label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option>Choose category</option>
              <option>Brand A</option>
              <option>Brand B</option>
              <option>Brand C</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full border rounded-lg px-3 py-2 text-sm h-24 focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <p className="text-xs text-gray-400 mt-1">
              Do not exceed 100 characters when entering the product name.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-5">
          {/* Upload Images */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Upload images
            </label>
            <div
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-gray-400 cursor-pointer transition ${
                isDragging ? "bg-blue-50 border-blue-400" : "hover:bg-gray-50"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <Upload className="w-10 h-10 mb-2" />
              <p className="text-sm">Drag & drop images here or click to upload</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files)}
                className="hidden"
                id="fileUpload"
              />
              <label
                htmlFor="fileUpload"
                className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 cursor-pointer"
              >
                Browse Files
              </label>
            </div>

            {/* Preview with Remove Button */}
            {images.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {images.map((img, i) => (
                  <div key={i} className="relative">
                    <img
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      className="w-24 h-24 object-cover rounded-md border"
                    />
                    <button
                      onClick={() => removeImage(i)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <p className="text-xs text-gray-400 mt-2">
              You need to add at least 4 images. Pay attention to the quality of
              the pictures you add.
            </p>
          </div>

          {/* Sizes & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Add size
              </label>
              <select className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500">
                <option>EU - 44</option>
                <option>EU - 43</option>
                <option>EU - 42</option>
                <option>EU - 41.5</option>
              </select>
              <div className="flex flex-wrap gap-2 mt-3">
                {["EU - 38.5", "EU - 39", "EU - 40", "EU - 41.5", "EU - 42", "EU - 43"].map(
                  (size, i) => (
                    <span
                      key={i}
                      className="border rounded-lg px-3 py-1 text-sm bg-gray-50 cursor-pointer hover:bg-blue-100"
                    >
                      {size}
                    </span>
                  )
                )}
              </div>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Product date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                />
                <Calendar className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-4">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
              Add product
            </button>
            <button className="border border-blue-600 text-blue-600 px-5 py-2 rounded-lg hover:bg-blue-50 transition">
              Save product
            </button>
            <button className="border border-gray-400 text-gray-600 px-5 py-2 rounded-lg hover:bg-gray-50 transition">
              Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


















// import { useState } from "react";
// import { Plus, Search, Info, Eye, Pencil, Trash2 } from "lucide-react";

// export default function ProductListPage() {
//   const [search, setSearch] = useState("");

//   // Sample data
//   const products = [
//     {
//       id: "#7712309",
//       name: "Dog Food, Chicken & Chicken Liver Recipe",
//       price: "$1,452.500",
//       quantity: 1638,
//       sale: 20,
//       stock: "Out of stock",
//       startDate: "$28,672.36",
//       image:
//         "https://via.placeholder.com/60x60.png?text=Food",
//     },
//     {
//       id: "#7712309",
//       name: "Grain Free Dry Dog Food | Rachael Ray® Nutrish®",
//       price: "$1,452.500",
//       quantity: 1638,
//       sale: 20,
//       stock: "Out of stock",
//       startDate: "$28,672.36",
//       image:
//         "https://via.placeholder.com/60x60.png?text=Dog",
//     },
//     {
//       id: "#7712309",
//       name: "Weruva Pumpkin Patch Up! Pumpkin With Ginger",
//       price: "$1,452.500",
//       quantity: 1638,
//       sale: 20,
//       stock: "Out of stock",
//       startDate: "$28,672.36",
//       image:
//         "https://via.placeholder.com/60x60.png?text=Pumpkin",
//     },
//   ];

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Top Bar */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
//         <h2 className="text-2xl font-bold">Add Attribute</h2>

//         {/* Breadcrumb */}
//         <div className="text-sm text-gray-500 mt-2 sm:mt-0">
//           <span>Dashboard</span> &gt; <span>Ecommerce</span> &gt;{" "}
//           <span className="text-gray-800 font-medium">Product List</span>
//         </div>
//       </div>

//       {/* Tip Bar */}
//       <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 text-sm text-gray-600 px-4 py-2 rounded-lg mb-6">
//         <Info className="w-5 h-5 text-blue-500 mt-0.5" />
//         <p>
//           Tip search by Product ID: Each product is provided with a unique ID,
//           which you can rely on to find the exact product you need.
//         </p>
//       </div>

//       {/* Controls Row */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//         {/* Show Entries */}
//         <div className="flex items-center gap-2 text-sm">
//           <span>Showing</span>
//           <select className="border rounded-md px-2 py-1 text-sm">
//             <option>10</option>
//             <option>25</option>
//             <option>50</option>
//           </select>
//           <span>entries</span>
//         </div>

//         {/* Search + Add New */}
//         <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
//           {/* Search Box */}
//           <div className="relative flex-1 sm:w-72">
//             <input
//               type="text"
//               placeholder="Search here..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full border rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//             <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
//           </div>

//           {/* Add New Button */}
//           <button className="flex items-center justify-center gap-2 border border-blue-500 text-blue-600 px-5 py-2 rounded-lg hover:bg-blue-50 transition">
//             <Plus className="w-5 h-5" />
//             Add new
//           </button>
//         </div>
//       </div>

//       {/* Product Table */}
//       <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//         <table className="w-full text-sm text-left">
//           <thead className="bg-gray-100 text-gray-600 text-sm">
//             <tr>
//               <th className="px-4 py-3">Product</th>
//               <th className="px-4 py-3">Product ID</th>
//               <th className="px-4 py-3">Price</th>
//               <th className="px-4 py-3">Quantity</th>
//               <th className="px-4 py-3">Sale</th>
//               <th className="px-4 py-3">Stock</th>
//               <th className="px-4 py-3">Start date</th>
//               <th className="px-4 py-3">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((p, index) => (
//               <tr
//                 key={index}
//                 className="border-t hover:bg-gray-50 transition"
//               >
//                 <td className="px-4 py-3 flex items-center gap-3">
//                   <img
//                     src={p.image}
//                     alt={p.name}
//                     className="w-12 h-12 rounded-md object-cover"
//                   />
//                   <span className="truncate max-w-[200px] font-medium">
//                     {p.name}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3">{p.id}</td>
//                 <td className="px-4 py-3">{p.price}</td>
//                 <td className="px-4 py-3">{p.quantity}</td>
//                 <td className="px-4 py-3">{p.sale}</td>
//                 <td className="px-4 py-3">
//                   <span className="text-red-500 rounded-md text-xs">
//                     {p.stock}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3">{p.startDate}</td>
//                 <td className="px-4 py-3 flex items-center gap-3">
//                   <Eye className="w-5 h-5 text-blue-500 cursor-pointer hover:scale-110 transition" />
//                   <Pencil className="w-5 h-5 text-green-500 cursor-pointer hover:scale-110 transition" />
//                   <Trash2 className="w-5 h-5 text-red-500 cursor-pointer hover:scale-110 transition" />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
