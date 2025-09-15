import { useState } from "react";
import { Upload, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productSubTitle, setProductSubTitle] = useState("");
  const [category, setCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [date, setDate] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // basic validation
    if (!productId || !productName || !category || !productPrice || !description || images.length === 0) {
      alert("Please fill in all required fields and upload images.");
      return;
    }

    alert("Product added successfully!");
    navigate("/products/list"); // redirect to product list page
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-bold">Add Product</h2>
        <div className="text-sm text-gray-500 mt-2 sm:mt-0">
          <span>Products</span> &gt;{" "}
          <span className="text-gray-800 font-medium">Add product</span>
        </div>
      </div> */}

       {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-3xl font-semibold">Add Product</h1>

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mt-2 sm:mt-0">
          <span>Orders</span> &gt;{" "}
          <span className="text-gray-800 font-medium">Add Product</span>
        </div>
      </div>

      {/* Main Form Grid */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Section */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-5">
          {/* Product ID */}
          <div>
            <label className="block text-[16px] font-bold  mb-1">
              Product Id <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="#12345"
              className="w-full border border-gray-200 rounded-lg outline-none px-4 py-2 text-sm"
            />
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-[16px] font-bold  mb-1">
              Product name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              className="w-full border border-gray-200 rounded-lg outline-none px-4 py-2 text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">
              Do not exceed 20 characters when entering the product name.
            </p>
          </div>

          {/* Product SubTitle */}
          <div>
            <label className="block text-[16px] font-bold  mb-1">
              Product SubTitle <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={productSubTitle}
              onChange={(e) => setProductSubTitle(e.target.value)}
              placeholder="Enter product SubTitle"
              className="w-full border border-gray-200 rounded-lg outline-none px-4 py-2 text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">
              Do not exceed 50 characters when entering the product SubTitle.
            </p>
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-[16px] font-bold  mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
              >
                <option>Choose category</option>
                <option>Hair Care</option>
                <option>Skin Care</option>
                <option>Tea</option>
                <option>Herbal Products</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-[16px] font-bold  mb-1">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder="Enter product price"
                className="w-full border border-gray-200 rounded-lg outline-none px-4 py-2 text-sm"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[16px] font-bold  mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm h-24 outline-none"
            ></textarea>
            <p className="text-xs text-gray-400 mt-1">
              Do not exceed 100 characters when entering the product description.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-5">
          {/* Upload Images */}
          <div>
            <label className="block text-[16px] font-bold mb-2">
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
                className="mt-3 px-4 py-2 bg-red-900 text-white hover:bg-red-950 text-sm rounded-md border border-red-900 cursor-pointer"
              >
                Browse Files
              </label>
            </div>

            {/* Preview */}
            {images.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className="w-24 h-24 object-cover rounded-md border"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sizes & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[16px] font-bold mb-1">
                Add size
              </label>
              <select className="w-full border rounded-lg px-3 py-2 text-sm outline-none">
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
              <label className="block text-[16px] font-bold mb-1">
                Product date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
                <Calendar className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-4">
            <button
              type="submit"
              className="border border-red-900 text-[15px] cursor-pointer text-red-900 px-4 py-2 rounded-lg hover:bg-red-900 hover:text-white transition"
            >
              Add product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}



























// import { useState } from "react";
// import { Upload, Calendar } from "lucide-react";

// export default function AddProduct() {
//   const [productId, setProductId] = useState("");
//   const [productName, setProductName] = useState("");
//   const [productSubTitle, setProductSubTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [productPrice, setProductPrice] = useState("");
//   const [brand, setBrand] = useState("");
//   const [description, setDescription] = useState("");
//   const [images, setImages] = useState([]);
//   const [date, setDate] = useState("");
//   const [isDragging, setIsDragging] = useState(false);

//   const handleImageUpload = (files) => {
//     const newFiles = Array.from(files);
//     setImages((prev) => [...prev, ...newFiles]);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragging(false);
//     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//       handleImageUpload(e.dataTransfer.files);
//       e.dataTransfer.clearData();
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
//         <h2 className="text-2xl font-bold">Add Product</h2>
//         <div className="text-sm text-gray-500 mt-2 sm:mt-0">
//           <span>Products</span> &gt;{" "}
//           <span className="text-gray-800 font-medium">Add product</span>
//         </div>
//       </div>

//       {/* Main Form Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Left Section */}
//         <div className="bg-white p-6 rounded-lg shadow-md space-y-5">

//           {/* Product ID */}
//           <div>
//             <label className="block text-[16px] font-bold  mb-1">
//               Product Id <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               value={productId}
//               onChange={(e) => setProductId(e.target.value)}
//               placeholder="#12345"
//               className="w-full border border-gray-200 rounded-lg outline-none px-4 py-2 text-sm  "
//             />
//           </div>

//           {/* Product Name */}
//           <div>
//             <label className="block text-[16px] font-bold  mb-1">
//               Product name <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               value={productName}
//               onChange={(e) => setProductName(e.target.value)}
//               placeholder="Enter product name"
//               className="w-full border border-gray-200 rounded-lg outline-none px-4 py-2 text-sm  "
//             />
//             <p className="text-xs text-gray-400 mt-1">
//               Do not exceed 20 characters when entering the product name.
//             </p>
//           </div>

//           {/* Product SubTitle */}
//           <div>
//             <label className="block text-[16px] font-bold  mb-1">
//               Product SubTitle <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               value={productSubTitle}
//               onChange={(e) => setProductSubTitle(e.target.value)}
//               placeholder="Enter product SubTitle"
//               className="w-full border border-gray-200 rounded-lg outline-none px-4 py-2 text-sm  "
//             />
//             <p className="text-xs text-gray-400 mt-1">
//               Do not exceed 50 characters when entering the product SubTitle.
//             </p>
//           </div>

//           {/* Category & Gender */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

//             {/* Category */}
//             <div>
//               <label className="block text-[16px] font-bold  mb-1">
//                 Category <span className="text-red-500">*</span>
//               </label>
//               <select
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
//               >
//                 <option>Choose category</option>
//                 <option>Hair Care</option>
//                 <option>Skin Care</option>
//                 <option>Tea</option>
//                 <option>Herbal Products</option>
//               </select>
//             </div>


//             <div>
//               <label className="block text-[16px] font-bold  mb-1">
//                 Price <span className="text-red-500">*</span>
//               </label>
//               <input
//               type="number"
//               value={productPrice}
//               onChange={(e) => setProductPrice(e.target.value)}
//               placeholder="Enter product price"
//               className="w-full border border-gray-200 rounded-lg outline-none px-4 py-2 text-sm  "
//             />
              
//             </div>
//           </div>

//           {/* Brand */}
//           {/* <div>
//             <label className="block text-[16px] font-bold  mb-1">
//               Brand <span className="text-red-500">*</span>
//             </label>
//             <select
//               value={brand}
//               onChange={(e) => setBrand(e.target.value)}
//               className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
//             >
//               <option>Choose category</option>
//               <option>Brand A</option>
//               <option>Brand B</option>
//               <option>Brand C</option>
//             </select>
//           </div> */}

//           {/* Description */}
//           <div>
//             <label className="block text-[16px] font-bold  mb-1">
//               Description <span className="text-red-500">*</span>
//             </label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Description"
//               className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm h-24 outline-none"
//             ></textarea>
//             <p className="text-xs text-gray-400 mt-1">
//               Do not exceed 100 characters when entering the product name.
//             </p>
//           </div>
//         </div>

//         {/* Right Section */}
//         <div className="bg-white p-6 rounded-lg shadow-md space-y-5">
//           {/* Upload Images */}
//           <div>
//             <label className="block font-medium text-gray-700 mb-2">
//               Upload images
//             </label>
//             <div
//               className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-gray-400 cursor-pointer transition ${isDragging ? "bg-blue-50 border-blue-400" : "hover:bg-gray-50"
//                 }`}
//               onDragOver={(e) => {
//                 e.preventDefault();
//                 setIsDragging(true);
//               }}
//               onDragLeave={() => setIsDragging(false)}
//               onDrop={handleDrop}
//             >
//               <Upload className="w-10 h-10 mb-2" />
//               <p className="text-sm">Drag & drop images here or click to upload</p>
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={(e) => handleImageUpload(e.target.files)}
//                 className="hidden"
//                 id="fileUpload"
//               />
//               <label
//                 htmlFor="fileUpload"
//                 // className="mt-3 px-4 py-2 hover:bg-red-900 hover:text-white text-red-900 text-sm rounded-md border border-red-900 cursor-pointer"
//                 className="mt-3 px-4 py-2 bg-red-900 text-white hover:bg-red-950 text-sm rounded-md border border-red-900 cursor-pointer"
//               >
//                 Browse Files
//               </label>
//             </div>

//             {/* Preview */}
//             {images.length > 0 && (
//               <div className="flex flex-wrap gap-3 mt-4">
//                 {images.map((img, i) => (
//                   <img
//                     key={i}
//                     src={URL.createObjectURL(img)}
//                     alt="preview"
//                     className="w-24 h-24 object-cover rounded-md border"
//                   />
//                 ))}
//               </div>
//             )}

//             <p className="text-xs text-gray-400 mt-2">
//               You need to add at least 4 images. Pay attention to the quality of
//               the pictures you add.
//             </p>
//           </div>

//           {/* Sizes & Date */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-[16px] font-bold mb-1">
//                 Add size
//               </label>
//               <select className="w-full border rounded-lg px-3 py-2 text-sm outline-none">
//                 <option>EU - 44</option>
//                 <option>EU - 43</option>
//                 <option>EU - 42</option>
//                 <option>EU - 41.5</option>
//               </select>
//               <div className="flex flex-wrap gap-2 mt-3">
//                 {["EU - 38.5", "EU - 39", "EU - 40", "EU - 41.5", "EU - 42", "EU - 43"].map(
//                   (size, i) => (
//                     <span
//                       key={i}
//                       className="border rounded-lg px-3 py-1 text-sm bg-gray-50 cursor-pointer hover:bg-blue-100"
//                     >
//                       {size}
//                     </span>
//                   )
//                 )}
//               </div>
//             </div>

//             <div>
//               <label className="block text-[16px] font-bold mb-1">
//                 Product date
//               </label>
//               <div className="relative">
//                 <input
//                   type="date"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                   className="w-full border rounded-lg px-3 py-2 text-sm "
//                 />
//                 <Calendar className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" />
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-wrap gap-3 mt-4">
//             <button className="border border-red-900 text-[15px] cursor-pointer  text-red-900 px-4 py-2 rounded-lg hover:bg-red-900 hover:text-white transition">
//               Add product
//             </button>
//             {/* <button className="border border-red-900  cursor-pointer text-[15px] text-red-900 px-4 py-2 rounded-lg hover:bg-red-900 hover:text-white transition">
//               Save product
//             </button>
//             <button className="border border-red-900  cursor-pointer text-[15px] text-red-900 px-4 py-2 rounded-lg hover:bg-red-900 hover:text-white transition">
//               Schedule
//             </button> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
