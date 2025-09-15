import { useState } from "react";
import { Upload, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EditProduct() {
  const [productName, setProductName] = useState("");
  const [productSubTitle, setProductSubTitle] = useState("");
  const [category, setCategory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [stock, setStock] = useState("In Stock");
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

    if (!productName || !category || !productPrice || !description || images.length === 0) {
      alert("Please fill in all required fields and upload images.");
      return;
    }

    alert("Product saved successfully!");
    navigate("/products/detail"); // redirect after save
  };

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-semibold">Edit Product</h1>
        <div className="text-sm text-gray-500 mt-2 sm:mt-0">
          <span>Products</span> &gt;{" "}
          <span className="text-gray-800 font-medium">Edit Product</span>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Section */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-5">
          {/* Product Name */}
          <div>
            <label className="block text-[16px] font-bold mb-1">
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
            <label className="block text-[16px] font-bold mb-1">
              Product SubTitle <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={productSubTitle}
              onChange={(e) => setProductSubTitle(e.target.value)}
              placeholder="Enter product subtitle"
              className="w-full border border-gray-200 rounded-lg outline-none px-4 py-2 text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">
              Do not exceed 50 characters when entering the product subtitle.
            </p>
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[16px] font-bold mb-1">
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

            <div>
              <label className="block text-[16px] font-bold mb-1">
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

          {/* Stock Status */}
          <div>
            <label className="block text-[16px] font-bold mb-1">Stock Status</label>
            <select
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
            >
              <option>In Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[16px] font-bold mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
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
            <label className="block text-[16px] font-bold mb-2">Upload images</label>
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
              <label className="block text-[16px] font-bold mb-1">Add size</label>
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
              <label className="block text-[16px] font-bold mb-1">Product date</label>
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
          <div className="flex flex-wrap gap-3 mt-8">
            <button
              type="submit"
              className="border border-red-900 text-[15px] cursor-pointer text-red-900 px-4 py-2 rounded-lg hover:bg-red-900 hover:text-white transition"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}





























// import { useState } from "react";
// import { Upload, Calendar } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function EditProduct() {
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

//   const navigate = useNavigate();

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

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // basic validation
//     if (!productName || !category || !productPrice || !description || images.length === 0) {
//       alert("Please fill in all required fields and upload images.");
//       return;
//     }

//     alert("Product added successfully!");
//     navigate("/products/list"); // redirect to product list page
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
//         <h2 className="text-2xl font-bold">Add Product</h2>
//         <div className="text-sm text-gray-500 mt-2 sm:mt-0">
//           <span>Products</span> &gt;{" "}
//           <span className="text-gray-800 font-medium">Add product</span>
//         </div>
//       </div> */}

//       {/* Top Bar */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
//         <h1 className="text-3xl font-semibold">Edit Product</h1>

//         {/* Breadcrumb */}
//         <div className="text-sm text-gray-500 mt-2 sm:mt-0">
//           <span>Orders</span> &gt;{" "}
//           <span className="text-gray-800 font-medium">Edit Product</span>
//         </div>
//       </div>

//       {/* Main Form Grid */}
//       <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Left Section */}
//         <div className="bg-white p-6 rounded-lg shadow-md space-y-5">
//           {/* Product ID
//           <div>
//             <label className="block text-[16px] font-bold  mb-1">
//               Product Id <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               value={productId}
//               onChange={(e) => setProductId(e.target.value)}
//               placeholder="#12345"
//               className="w-full border border-gray-200 rounded-lg outline-none px-4 py-2 text-sm"
//             />
//           </div> */}

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
//               className="w-full border border-gray-200 rounded-lg outline-none px-4 py-2 text-sm"
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
//               className="w-full border border-gray-200 rounded-lg outline-none px-4 py-2 text-sm"
//             />
//             <p className="text-xs text-gray-400 mt-1">
//               Do not exceed 50 characters when entering the product SubTitle.
//             </p>
//           </div>

//           {/* Category & Price */}
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

//             {/* Price */}
//             <div>
//               <label className="block text-[16px] font-bold  mb-1">
//                 Price <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="number"
//                 value={productPrice}
//                 onChange={(e) => setProductPrice(e.target.value)}
//                 placeholder="Enter product price"
//                 className="w-full border border-gray-200 rounded-lg outline-none px-4 py-2 text-sm"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block font-medium">Stock Status</label>             <select
//               value={product.stock}
//               onChange={(e) => setProduct({ ...product, stock: e.target.value })}
//               className="w-full p-2 border rounded-md"
//             >
//               <option>In Stock</option>
//               <option>Out of Stock</option>
//             </select>
//           </div>
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-[16px] font-bold  mb-1">
//             Description <span className="text-red-500">*</span>
//           </label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Description"
//             className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm h-24 outline-none"
//           ></textarea>
//           <p className="text-xs text-gray-400 mt-1">
//             Do not exceed 100 characters when entering the product description.
//           </p>
//         </div>
//     </div>

//         {/* Right Section */ }
//   <div className="bg-white p-6 rounded-lg shadow-md space-y-5">
//     {/* Upload Images */}
//     <div>
//       <label className="block text-[16px] font-bold mb-2">
//         Upload images
//       </label>
//       <div
//         className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 text-gray-400 cursor-pointer transition ${isDragging ? "bg-blue-50 border-blue-400" : "hover:bg-gray-50"
//           }`}
//         onDragOver={(e) => {
//           e.preventDefault();
//           setIsDragging(true);
//         }}
//         onDragLeave={() => setIsDragging(false)}
//         onDrop={handleDrop}
//       >
//         <Upload className="w-10 h-10 mb-2" />
//         <p className="text-sm">Drag & drop images here or click to upload</p>
//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           onChange={(e) => handleImageUpload(e.target.files)}
//           className="hidden"
//           id="fileUpload"
//         />
//         <label
//           htmlFor="fileUpload"
//           className="mt-3 px-4 py-2 bg-red-900 text-white hover:bg-red-950 text-sm rounded-md border border-red-900 cursor-pointer"
//         >
//           Browse Files
//         </label>
//       </div>

//       {/* Preview */}
//       {images.length > 0 && (
//         <div className="flex flex-wrap gap-3 mt-4">
//           {images.map((img, i) => (
//             <img
//               key={i}
//               src={URL.createObjectURL(img)}
//               alt="preview"
//               className="w-24 h-24 object-cover rounded-md border"
//             />
//           ))}
//         </div>
//       )}
//     </div>

//     {/* Sizes & Date */}
//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//       <div>
//         <label className="block text-[16px] font-bold mb-1">
//           Add size
//         </label>
//         <select className="w-full border rounded-lg px-3 py-2 text-sm outline-none">
//           <option>EU - 44</option>
//           <option>EU - 43</option>
//           <option>EU - 42</option>
//           <option>EU - 41.5</option>
//         </select>
//         <div className="flex flex-wrap gap-2 mt-3">
//           {["EU - 38.5", "EU - 39", "EU - 40", "EU - 41.5", "EU - 42", "EU - 43"].map(
//             (size, i) => (
//               <span
//                 key={i}
//                 className="border rounded-lg px-3 py-1 text-sm bg-gray-50 cursor-pointer hover:bg-blue-100"
//               >
//                 {size}
//               </span>
//             )
//           )}
//         </div>
//       </div>

//       <div>
//         <label className="block text-[16px] font-bold mb-1">
//           Product date
//         </label>
//         <div className="relative">
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="w-full border rounded-lg px-3 py-2 text-sm"
//           />
//           <Calendar className="w-5 h-5 text-gray-400 absolute right-3 top-2.5" />
//         </div>
//       </div>
//     </div>

//     {/* Action Buttons */}
//     <div className="flex flex-wrap gap-3 mt-4">
//       <button
//         type="submit"
//         className="border border-red-900 text-[15px] cursor-pointer text-red-900 px-4 py-2 rounded-lg hover:bg-red-900 hover:text-white transition"
//       >
//         Submit
//       </button>
//     </div>
//   </div>
//       </form >
//     </div >
//   );
// }


























// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const EditProduct = () => {
//   const navigate = useNavigate();
//   const [product, setProduct] = useState({
//     name: "",
//     subtitle: "",
//     size: "",
//     price: "",
//     description: "",
//     stock: "In Stock",
//     images: [],
//   });

//   // handle image upload (max 5)
//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length + product.images.length > 5) {
//       alert("You can only upload up to 5 images.");
//       return;
//     }
//     const newImages = files.map((file) => URL.createObjectURL(file));
//     setProduct({ ...product, images: [...product.images, ...newImages] });
//   };

//   // remove image
//   const removeImage = (index) => {
//     const updated = [...product.images];
//     updated.splice(index, 1);
//     setProduct({ ...product, images: updated });
//   };

//   // submit handler
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Final Product Data:", product);

//     alert("Product saved successfully!");
//     navigate("/products/detail"); // change route as needed
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">

//       {/* Top Bar */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
//         <h1 className="text-3xl font-semibold">Edit Product</h1>

//         {/* Breadcrumb */}
//         <div className="text-sm text-gray-500 mt-2 sm:mt-0">
//           <span>Orders</span> &gt;{" "}
//           <span className="text-gray-800 font-medium">Edit Product</span>
//         </div>
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white rounded-2xl shadow-md p-6 lg:p-8"
//       >
//         {/* Grid fields */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Product Name */}
//           <div>
//             <label className="block font-medium">Product Name</label>
//             <input
//               type="text"
//               value={product.name}
//               onChange={(e) => setProduct({ ...product, name: e.target.value })}
//               className="w-full p-2 border rounded-md"
//               placeholder="Enter product name"
//             />
//           </div>

//           {/* Subtitle */}
//           <div>
//             <label className="block font-medium">Subtitle</label>
//             <input
//               type="text"
//               value={product.subtitle}
//               onChange={(e) =>
//                 setProduct({ ...product, subtitle: e.target.value })
//               }
//               className="w-full p-2 border rounded-md"
//               placeholder="Enter subtitle"
//             />
//           </div>

//           {/* Size */}
//           <div>
//             <label className="block font-medium">Size</label>
//             <input
//               type="text"
//               value={product.size}
//               onChange={(e) => setProduct({ ...product, size: e.target.value })}
//               className="w-full p-2 border rounded-md"
//               placeholder="Enter size"
//             />
//           </div>

//           {/* Price */}
//           <div>
//             <label className="block font-medium">Price</label>
//             <input
//               type="number"
//               value={product.price}
//               onChange={(e) =>
//                 setProduct({ ...product, price: e.target.value })
//               }
//               className="w-full p-2 border rounded-md"
//               placeholder="Enter price"
//             />
//           </div>

//           {/* Stock Status */}
//           <div>
//             <label className="block font-medium">Stock Status</label>
//             <select
//               value={product.stock}
//               onChange={(e) => setProduct({ ...product, stock: e.target.value })}
//               className="w-full p-2 border rounded-md"
//             >
//               <option>In Stock</option>
//               <option>Out of Stock</option>
//             </select>
//           </div>
//         </div>

//         {/* Description */}
//         <div className="mt-6">
//           <label className="block font-medium">Description</label>
//           <textarea
//             value={product.description}
//             onChange={(e) =>
//               setProduct({ ...product, description: e.target.value })
//             }
//             className="w-full p-2 border rounded-md"
//             rows="3"
//             placeholder="Enter product description"
//           />
//         </div>

//         {/* Images */}
//         <div className="mt-6">
//           <label className="block font-medium">Product Images (max 5)</label>
//           <input
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={handleImageChange}
//             className="mt-2"
//           />
//           <div className="flex flex-wrap gap-3 mt-3">
//             {product.images.map((img, index) => (
//               <div key={index} className="relative">
//                 <img
//                   src={img}
//                   alt="product"
//                   className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md border"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeImage(index)}
//                   className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs"
//                 >
//                   ✕
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Submit */}
//         <div className="flex justify-center mt-8">
//           <button
//             type="submit"
//             className="px-6 py-2 bg-green-600 text-white rounded-md w-full sm:w-auto"
//           >
//             Save Product
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditProduct;


















// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const EditProduct = () => {
//   const navigate = useNavigate();
//   const [product, setProduct] = useState({
//     name: "",
//     subtitle: "",
//     size: "",
//     price: "",
//     description: "",
//     stock: "In Stock",
//     images: [],
//   });

//   // handle image upload (max 5)
//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length + product.images.length > 5) {
//       alert("You can only upload up to 5 images.");
//       return;
//     }
//     const newImages = files.map((file) => URL.createObjectURL(file));
//     setProduct({ ...product, images: [...product.images, ...newImages] });
//   };

//   // remove image
//   const removeImage = (index) => {
//     const updated = [...product.images];
//     updated.splice(index, 1);
//     setProduct({ ...product, images: updated });
//   };

//   // submit handler
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Final Product Data:", product);

//     // 👉 After saving, redirect to another page
//     alert("Product saved successfully!");
//     navigate("/products/detail"); // change "/product-list" to your desired route
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md"
//     >
//       <h1 className="text-2xl font-bold mb-6 text-center">Edit Product</h1>

//       {/* Grid fields */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Product Name */}
//         <div>
//           <label className="block font-medium">Product Name</label>
//           <input
//             type="text"
//             value={product.name}
//             onChange={(e) => setProduct({ ...product, name: e.target.value })}
//             className="w-full p-2 border rounded-md"
//             placeholder="Enter product name"
//           />
//         </div>

//         {/* Subtitle */}
//         <div>
//           <label className="block font-medium">Subtitle</label>
//           <input
//             type="text"
//             value={product.subtitle}
//             onChange={(e) => setProduct({ ...product, subtitle: e.target.value })}
//             className="w-full p-2 border rounded-md"
//             placeholder="Enter subtitle"
//           />
//         </div>

//         {/* Size */}
//         <div>
//           <label className="block font-medium">Size</label>
//           <input
//             type="text"
//             value={product.size}
//             onChange={(e) => setProduct({ ...product, size: e.target.value })}
//             className="w-full p-2 border rounded-md"
//             placeholder="Enter size"
//           />
//         </div>

//         {/* Price */}
//         <div>
//           <label className="block font-medium">Price</label>
//           <input
//             type="number"
//             value={product.price}
//             onChange={(e) => setProduct({ ...product, price: e.target.value })}
//             className="w-full p-2 border rounded-md"
//             placeholder="Enter price"
//           />
//         </div>

//         {/* Stock Status */}
//         <div>
//           <label className="block font-medium">Stock Status</label>
//           <select
//             value={product.stock}
//             onChange={(e) => setProduct({ ...product, stock: e.target.value })}
//             className="w-full p-2 border rounded-md"
//           >
//             <option>In Stock</option>
//             <option>Out of Stock</option>
//           </select>
//         </div>
//       </div>

//       {/* Description */}
//       <div className="mt-6">
//         <label className="block font-medium">Description</label>
//         <textarea
//           value={product.description}
//           onChange={(e) =>
//             setProduct({ ...product, description: e.target.value })
//           }
//           className="w-full p-2 border rounded-md"
//           rows="3"
//           placeholder="Enter product description"
//         />
//       </div>

//       {/* Images */}
//       <div className="mt-6">
//         <label className="block font-medium">Product Images (max 5)</label>
//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           onChange={handleImageChange}
//           className="mt-2"
//         />
//         <div className="flex flex-wrap gap-3 mt-3">
//           {product.images.map((img, index) => (
//             <div key={index} className="relative">
//               <img
//                 src={img}
//                 alt="product"
//                 className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md border"
//               />
//               <button
//                 type="button"
//                 onClick={() => removeImage(index)}
//                 className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs"
//               >
//                 ✕
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Submit */}
//       <div className="flex justify-center mt-8">
//         <button
//           type="submit"
//           className="px-6 py-2 bg-green-600 text-white rounded-md w-full sm:w-auto"
//         >
//           Save Product
//         </button>
//       </div>
//     </form>
//   );
// };

// export default EditProduct;
















// import React, { useState } from "react";

// const EditProduct = () => {
//   const [product, setProduct] = useState({
//     name: "",
//     subtitle: "",
//     size: "",
//     price: "",
//     description: "",
//     stock: "In Stock",
//     images: [],
//   });

//   // handle image upload (max 5)
//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length + product.images.length > 5) {
//       alert("You can only upload up to 5 images.");
//       return;
//     }
//     const newImages = files.map((file) => URL.createObjectURL(file));
//     setProduct({ ...product, images: [...product.images, ...newImages] });
//   };

//   // remove image
//   const removeImage = (index) => {
//     const updated = [...product.images];
//     updated.splice(index, 1);
//     setProduct({ ...product, images: updated });
//   };

//   // submit handler
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Final Product Data:", product);
//     alert("Product saved successfully!");
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md"
//     >
//       <h1 className="text-2xl font-bold mb-6 text-center">Edit Product</h1>

//       {/* Grid fields */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Product Name */}
//         <div>
//           <label className="block font-medium">Product Name</label>
//           <input
//             type="text"
//             value={product.name}
//             onChange={(e) => setProduct({ ...product, name: e.target.value })}
//             className="w-full p-2 border rounded-md"
//             placeholder="Enter product name"
//           />
//         </div>

//         {/* Subtitle */}
//         <div>
//           <label className="block font-medium">Subtitle</label>
//           <input
//             type="text"
//             value={product.subtitle}
//             onChange={(e) => setProduct({ ...product, subtitle: e.target.value })}
//             className="w-full p-2 border rounded-md"
//             placeholder="Enter subtitle"
//           />
//         </div>

//         {/* Size */}
//         <div>
//           <label className="block font-medium">Size</label>
//           <input
//             type="text"
//             value={product.size}
//             onChange={(e) => setProduct({ ...product, size: e.target.value })}
//             className="w-full p-2 border rounded-md"
//             placeholder="Enter size"
//           />
//         </div>

//         {/* Price */}
//         <div>
//           <label className="block font-medium">Price</label>
//           <input
//             type="number"
//             value={product.price}
//             onChange={(e) => setProduct({ ...product, price: e.target.value })}
//             className="w-full p-2 border rounded-md"
//             placeholder="Enter price"
//           />
//         </div>

//         {/* Stock Status */}
//         <div>
//           <label className="block font-medium">Stock Status</label>
//           <select
//             value={product.stock}
//             onChange={(e) => setProduct({ ...product, stock: e.target.value })}
//             className="w-full p-2 border rounded-md"
//           >
//             <option>In Stock</option>
//             <option>Out of Stock</option>
//           </select>
//         </div>
//       </div>

//       {/* Description */}
//       <div className="mt-6">
//         <label className="block font-medium">Description</label>
//         <textarea
//           value={product.description}
//           onChange={(e) => setProduct({ ...product, description: e.target.value })}
//           className="w-full p-2 border rounded-md"
//           rows="3"
//           placeholder="Enter product description"
//         />
//       </div>

//       {/* Images */}
//       <div className="mt-6">
//         <label className="block font-medium">Product Images (max 5)</label>
//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           onChange={handleImageChange}
//           className="mt-2"
//         />
//         <div className="flex flex-wrap gap-3 mt-3">
//           {product.images.map((img, index) => (
//             <div key={index} className="relative">
//               <img
//                 src={img}
//                 alt="product"
//                 className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md border"
//               />
//               <button
//                 type="button"
//                 onClick={() => removeImage(index)}
//                 className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs"
//               >
//                 ✕
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Submit */}
//       <div className="flex justify-center mt-8">
//         <button
//           type="submit"
//           className="px-6 py-2 bg-green-600 text-white rounded-md w-full sm:w-auto"
//         >
//           Save Product
//         </button>
//       </div>
//     </form>
//   );
// };

// export default EditProduct;






















// import React, { useState } from "react";

// const EditProduct = () => {
// const [isEditing, setIsEditing] = useState(false);
//   const [product, setProduct] = useState({
//     name: "Sample Product",
//     subtitle: "Best Quality Product",
//     size: "Medium",
//     price: "499",
//     description: "This is a sample description of the product.",
//     stock: "In Stock",
//     images: [],
//   });

//   const [tempProduct, setTempProduct] = useState(product);

//   // handle image upload (max 5)
//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length + tempProduct.images.length > 5) {
//       alert("You can only upload up to 5 images.");
//       return;
//     }
//     const newImages = files.map((file) => URL.createObjectURL(file));
//     setTempProduct({ ...tempProduct, images: [...tempProduct.images, ...newImages] });
//   };

//   // remove image
//   const removeImage = (index) => {
//     const updated = [...tempProduct.images];
//     updated.splice(index, 1);
//     setTempProduct({ ...tempProduct, images: updated });
//   };

//   // save changes
//   const handleSave = () => {
//     setProduct(tempProduct);
//     setIsEditing(false);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md">
//       <h1 className="text-2xl font-bold mb-6 text-center">Product Details</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Product Name */}
//         <div>
//           <label className="block font-medium">Product Name</label>
//           {isEditing ? (
//             <input
//               type="text"
//               value={tempProduct.name}
//               onChange={(e) => setTempProduct({ ...tempProduct, name: e.target.value })}
//               className="w-full p-2 border rounded-md"
//             />
//           ) : (
//             <p className="mt-1">{product.name}</p>
//           )}
//         </div>

//         {/* Subtitle */}
//         <div>
//           <label className="block font-medium">Subtitle</label>
//           {isEditing ? (
//             <input
//               type="text"
//               value={tempProduct.subtitle}
//               onChange={(e) => setTempProduct({ ...tempProduct, subtitle: e.target.value })}
//               className="w-full p-2 border rounded-md"
//             />
//           ) : (
//             <p className="mt-1">{product.subtitle}</p>
//           )}
//         </div>

//         {/* Size */}
//         <div>
//           <label className="block font-medium">Size</label>
//           {isEditing ? (
//             <input
//               type="text"
//               value={tempProduct.size}
//               onChange={(e) => setTempProduct({ ...tempProduct, size: e.target.value })}
//               className="w-full p-2 border rounded-md"
//             />
//           ) : (
//             <p className="mt-1">{product.size}</p>
//           )}
//         </div>

//         {/* Price */}
//         <div>
//           <label className="block font-medium">Price</label>
//           {isEditing ? (
//             <input
//               type="number"
//               value={tempProduct.price}
//               onChange={(e) => setTempProduct({ ...tempProduct, price: e.target.value })}
//               className="w-full p-2 border rounded-md"
//             />
//           ) : (
//             <p className="mt-1">₹ {product.price}</p>
//           )}
//         </div>

//         {/* Stock Status */}
//         <div>
//           <label className="block font-medium">Stock Status</label>
//           {isEditing ? (
//             <select
//               value={tempProduct.stock}
//               onChange={(e) => setTempProduct({ ...tempProduct, stock: e.target.value })}
//               className="w-full p-2 border rounded-md"
//             >
//               <option>In Stock</option>
//               <option>Out of Stock</option>
//             </select>
//           ) : (
//             <p className="mt-1">{product.stock}</p>
//           )}
//         </div>
//       </div>

//       {/* Description */}
//       <div className="mt-6">
//         <label className="block font-medium">Description</label>
//         {isEditing ? (
//           <textarea
//             value={tempProduct.description}
//             onChange={(e) =>
//               setTempProduct({ ...tempProduct, description: e.target.value })
//             }
//             className="w-full p-2 border rounded-md"
//             rows="3"
//           />
//         ) : (
//           <p className="mt-1">{product.description}</p>
//         )}
//       </div>

//       {/* Images */}
//       <div className="mt-6">
//         <label className="block font-medium">Product Images (max 5)</label>
//         <div className="flex flex-wrap gap-3 mt-2">
//           {isEditing && (
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={handleImageChange}
//               className="block"
//             />
//           )}
//           {tempProduct.images.map((img, index) => (
//             <div key={index} className="relative">
//               <img
//                 src={img}
//                 alt="product"
//                 className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md border"
//               />
//               {isEditing && (
//                 <button
//                   onClick={() => removeImage(index)}
//                   className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs"
//                 >
//                   ✕
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
//         {isEditing ? (
//           <>
//             <button
//               onClick={handleSave}
//               className="px-6 py-2 bg-green-600 text-white rounded-md w-full sm:w-auto"
//             >
//               Save
//             </button>
//             <button
//               onClick={() => {
//                 setTempProduct(product);
//                 setIsEditing(false);
//               }}
//               className="px-6 py-2 bg-gray-400 text-white rounded-md w-full sm:w-auto"
//             >
//               Cancel
//             </button>
//           </>
//         ) : (
//           <button
//             onClick={() => setIsEditing(true)}
//             className="px-6 py-2 bg-blue-600 text-white rounded-md w-full sm:w-auto"
//           >
//             Edit
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EditProduct;
