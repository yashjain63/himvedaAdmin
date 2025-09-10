import { useState } from "react";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Bell, ShoppingBasket } from "lucide-react";

export default function ProductList() {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(5);
  const [products, setProducts] = useState([
    {
      id: "#7712301",
      name: "Foundation",
      icon:<ShoppingBasket strokeWidth={1}/>,
      quantity: 1938,
      sale: 20,
      startDate: "20/09/2024",
      image: "/images/protct1.png",
    },
    {
      id: "#7712302",
      name:"Face",
      icon:<ShoppingBasket strokeWidth={1}/>,
      quantity: 1938,
      startDate: "20/10/2024",
      sale: 20,
      image: "/images/protct2.png",
    },
    {
      id: "#7712303",
      name: "Body",
      icon:<ShoppingBasket strokeWidth={1}/>,
      quantity: 1938,
      sale: 20,
      startDate: "20/10/2024",
      image: "/images/protct3.png",
    },
    {
      id: "#7712304",
      name: "Hair Care",
      icon:<ShoppingBasket strokeWidth={1}/>,
      quantity: 1938,
      sale: 20,
      startDate: "20/10/2024",
      image: "/images/protct3.png",
    },
    {
      id: "#7712305",
      name: "Herbal",
      icon:<ShoppingBasket strokeWidth={1}/>,
      quantity: 1938,
      sale: 20,
      startDate: "20/10/2024",
      image: "/images/protct2.png",
    },
    {
      id: "#7712306",
      name: "Our Combos",
      icon:<ShoppingBasket strokeWidth={1}/>,
      quantity: 1938,
      sale: 20,
      startDate: "20/10/2024",
      image: "/images/protct3.png",
    },
    {
      id: "#7712307",
      name: "Foundation1",
      icon:<ShoppingBasket strokeWidth={1}/>,
      quantity: 1938,
      sale: 20,
      startDate: "20/10/2024",
      image: "/images/protct1.png",
    },
    {
      id: "#7712308",
      name: "Face1",
      icon:<ShoppingBasket strokeWidth={1}/>,
      quantity: 1938,
      sale: 20,
      startDate: "20/10/2024",
      image: "/images/protct2.png",
    },
    {
      id: "#7712309",
      name: "Body1 ",
      icon:<ShoppingBasket strokeWidth={1}/>,
      quantity: 1938,
      sale: 20,
      startDate: "20/10/2024",
      image: "/images/protct3.png",
    },
    {
      id: "#7712310",
      name: "Hair Care1",
      icon:<ShoppingBasket strokeWidth={1}/>,
      quantity: 1938,
      sale: 20,
      startDate: "20/10/2024",
      image: "/images/protct1.png",
    },
    {
      id: "#7712311",
      name: "Herbal1",
      icon:<ShoppingBasket strokeWidth={1}/>,
      quantity: 1938,
      sale: 20,
      startDate: "20/10/2024",
      image: "/images/protct2.png",
    },
    {
      id: "#7712312",
      name: "Herbal Care1",
      icon:<ShoppingBasket strokeWidth={1}/>,
      quantity: 1938,
      sale: 20,
      startDate: "20/10/2024",
      image: "/images/protct3.png",
    },
    {
      id: "#7712313",
      name: "Body Care1",
      icon:<ShoppingBasket strokeWidth={1}/>,
      quantity: 1938,
      sale: 20,
      startDate: "20/10/2024",
      image: "/images/protct1.png",
    },
    {
      id: "#7712314",
      name: "Face Care1",
      icon:<ShoppingBasket strokeWidth={1}/>,
      quantity: 1938,
      sale: 20,
      startDate: "20/10/2024",
      image: "/images/protct2.png",
    },
    {
      id: "#7712315",
      name: "Herbal Wash1",
      icon:<ShoppingBasket strokeWidth={1}/>,
      quantity: 1938,
      sale: 20,
      startDate: "20/10/2024",
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
    alert(`Product Details:\n\nName: ${product.name}\nQuantity: ${product.quantity}\nSale: ${product.sale}`);
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
        <h1 className="text-3xl font-semibold">Category List</h1>

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mt-2 sm:mt-0">
          <span>Category</span> &gt;{" "}
          <span className="text-gray-800 font-medium">Category List</span>
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

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {/* Add New Button */}
          <Link to="/category/add">
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
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Icon</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Sale</th>
              <th className="px-4 py-3">Start Date</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedProducts.map((p, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50  transition"
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
                <td className="px-4 py-3">{p.icon}</td>
                <td className="px-4 py-3">{p.quantity}</td>
                <td className="px-4 py-3">{p.sale}</td>
                <td className="px-4 py-3">{p.startDate}</td>

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