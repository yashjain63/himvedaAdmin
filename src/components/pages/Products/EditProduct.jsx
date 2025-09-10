import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    subtitle: "",
    size: "",
    price: "",
    description: "",
    stock: "In Stock",
    images: [],
  });

  // handle image upload (max 5)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + product.images.length > 5) {
      alert("You can only upload up to 5 images.");
      return;
    }
    const newImages = files.map((file) => URL.createObjectURL(file));
    setProduct({ ...product, images: [...product.images, ...newImages] });
  };

  // remove image
  const removeImage = (index) => {
    const updated = [...product.images];
    updated.splice(index, 1);
    setProduct({ ...product, images: updated });
  };

  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Product Data:", product);

    // 👉 After saving, redirect to another page
    alert("Product saved successfully!");
    navigate("/products/detail"); // change "/product-list" to your desired route
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md"
    >
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Product</h1>

      {/* Grid fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Name */}
        <div>
          <label className="block font-medium">Product Name</label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            className="w-full p-2 border rounded-md"
            placeholder="Enter product name"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block font-medium">Subtitle</label>
          <input
            type="text"
            value={product.subtitle}
            onChange={(e) => setProduct({ ...product, subtitle: e.target.value })}
            className="w-full p-2 border rounded-md"
            placeholder="Enter subtitle"
          />
        </div>

        {/* Size */}
        <div>
          <label className="block font-medium">Size</label>
          <input
            type="text"
            value={product.size}
            onChange={(e) => setProduct({ ...product, size: e.target.value })}
            className="w-full p-2 border rounded-md"
            placeholder="Enter size"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium">Price</label>
          <input
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            className="w-full p-2 border rounded-md"
            placeholder="Enter price"
          />
        </div>

        {/* Stock Status */}
        <div>
          <label className="block font-medium">Stock Status</label>
          <select
            value={product.stock}
            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
            className="w-full p-2 border rounded-md"
          >
            <option>In Stock</option>
            <option>Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div className="mt-6">
        <label className="block font-medium">Description</label>
        <textarea
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          className="w-full p-2 border rounded-md"
          rows="3"
          placeholder="Enter product description"
        />
      </div>

      {/* Images */}
      <div className="mt-6">
        <label className="block font-medium">Product Images (max 5)</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="mt-2"
        />
        <div className="flex flex-wrap gap-3 mt-3">
          {product.images.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img}
                alt="product"
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md border"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-center mt-8">
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded-md w-full sm:w-auto"
        >
          Save Product
        </button>
      </div>
    </form>
  );
};

export default EditProduct;
















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
