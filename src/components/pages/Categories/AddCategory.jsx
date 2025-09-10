import { useState } from "react";
import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddCategory() {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const navigate = useNavigate();

  const handleImageUpload = (files) => {
    const file = files[0]; // only take the first file
    setImage(file);
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

    if (!category || !description || !image) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    alert("Category added successfully!");
    navigate("/category/list"); // redirect to category list page
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-bold">Add Category</h2>
        <div className="text-sm text-gray-500 mt-2 sm:mt-0">
          <span>Category</span> &gt;{" "}
          <span className="text-gray-800 font-medium">Add category</span>
        </div>
      </div>

      {/* Main Form Grid */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Left Section */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-5">
          {/* Category Name */}
          <div>
            <label className="block text-[16px] font-bold mb-1">
              Category Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter Category name"
              className="w-full border border-gray-200 rounded-lg outline-none px-4 py-2 text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">
              Do not exceed 20 characters when entering the category name.
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[16px] font-bold mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm h-24 outline-none"
            ></textarea>
            <p className="text-xs text-gray-400 mt-1">
              Do not exceed 100 characters when entering the description.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-5">
          {/* Upload Image */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Upload image
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
              <p className="text-sm">Drag & drop image here or click to upload</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files)}
                className="hidden"
                id="fileUpload"
              />
              <label
                htmlFor="fileUpload"
                className="mt-3 px-4 py-2 bg-red-900 text-white hover:bg-red-950 text-sm rounded-md border border-red-900 cursor-pointer"
              >
                Browse File
              </label>
            </div>

            {/* Preview */}
            {image && (
              <div className="flex flex-wrap gap-3 mt-4">
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded-md border"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-4">
            <button
              type="submit"
              className="border border-red-900 text-[15px] cursor-pointer text-red-900 px-4 py-2 rounded-lg hover:bg-red-900 hover:text-white transition"
            >
              Add Category
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
