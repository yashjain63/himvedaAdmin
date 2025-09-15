import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreateInvoice() {
  const navigate = useNavigate();

  // From & For info
  const [issueFrom, setIssueFrom] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  const [issueFor, setIssueFor] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  // Extra invoice fields
  const [InvoiceID, setInvoiceID] = useState("");
  const [date, setDate] = useState("");
  const [method, setMethod] = useState("Visa");
  const [status, setStatus] = useState("Pending");

  // Items
  const [items, setItems] = useState([
    { product: "", size: "", qty: 1, price: 0, tax: 0 },
  ]);

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] =
      field === "product" || field === "size" ? value : Number(value);
    setItems(updated);
  };

  const addItem = () =>
    setItems([...items, { product: "", size: "", qty: 1, price: 0, tax: 0 }]);

  const removeItem = (index) =>
    setItems(items.filter((_, i) => i !== index));

  // Totals
  const calculateTotal = (item) => item.qty * item.price + item.tax;
  const grandTotal = items.reduce((acc, item) => acc + calculateTotal(item), 0);

  // Save
  const handleSave = () => {
    const newInvoice = {
      id: "#INV" + Math.floor(Math.random() * 10000),
      name: InvoiceID || issueFor.name || "Unnamed Customer",
      date: date || new Date().toLocaleDateString(),
      total: "₹" + grandTotal,
      method,
      status,
    };

    navigate("/invoice/list", { state: { newInvoice } });
  };

  return (
    <div className="py-3 px-3">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-white shadow rounded-xl space-y-6">
        {/* <h1 className="text-3xl font-semibold mb-4">Create Invoice</h1> */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h1 className="text-3xl font-semibold">Create Invoice</h1>
          <div className="text-sm text-gray-500 mt-2 sm:mt-0">
            <span>Invoices</span> &gt;{" "}
            <span className="text-gray-800 font-medium">Create Invoice</span>
          </div>
        </div>

        {/*Top fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pt-4 gap-4 sm:gap-6">
          <div>
            <label className="block text-[16px] font-bold mb-1">Invoice ID</label>
            <input
              type="text"
              value={InvoiceID}
              onChange={(e) => setInvoiceID(e.target.value)}
              required
              placeholder="Enter invoice ID"
              className="w-full border border-gray-200 rounded-lg p-2 outline-none text-sm " />
          </div>
          <div>
            <label className="block text-[16px] font-bold mb-1">Invoice Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-2 outline-none text-sm" />
          </div>
          <div>
            <label className="block text-[16px] font-bold mb-1">Payment Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-2 outline-none text-sm" >
              <option value="Visa">- Select -</option>
              <option value="Visa">Visa</option>
              <option value="Mastercard">Mastercard</option>
              <option value="Paypal">Paypal</option>
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-[16px] font-bold mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-200 rounded-lg p-2 outline-none text-sm">
              <option value="Pending">- Select -</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Issue From / For */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Issue From */}
          <div className="space-y-3">
            <h2 className="font-bold mb-2 text-[16px] sm:text-base">Issue From :</h2>
            <input
              placeholder="First name"
              value={issueFrom.name}
              onChange={(e) =>
                setIssueFrom({ ...issueFrom, name: e.target.value })
              }
              className="w-full border border-gray-200 text-sm rounded-lg p-2 outline-none" />
            <textarea
              placeholder="Enter address"
              value={issueFrom.address}
              onChange={(e) =>
                setIssueFrom({ ...issueFrom, address: e.target.value })
              }
              className="w-full border border-gray-200 text-sm rounded-lg p-2 outline-none" />
            <input
              placeholder="Number"
              value={issueFrom.phone}
              onChange={(e) =>
                setIssueFrom({ ...issueFrom, phone: e.target.value })
              }
              className="w-full border border-gray-200 text-sm rounded-lg p-2 outline-none"
            />
            <input
              placeholder="Email Address"
              value={issueFrom.email}
              onChange={(e) =>
                setIssueFrom({ ...issueFrom, email: e.target.value })
              }
              className="w-full border rounded-lg p-2 text-sm border-gray-200 outline-none"
            />
          </div>

          {/* Issue For */}
          <div className="space-y-3">
            <h2 className="font-bold mb-2 text-[16px] sm:text-base">Issue For :</h2>
            <input
              placeholder="First name"
              value={issueFor.name}
              onChange={(e) =>
                setIssueFor({ ...issueFor, name: e.target.value })
              }
              className="w-full border border-gray-200 text-sm rounded-lg p-2 outline-none" />
            <textarea
              placeholder="Enter address"
              value={issueFor.address}
              onChange={(e) =>
                setIssueFor({ ...issueFor, address: e.target.value })
              }
              className="w-full border border-gray-200 text-sm rounded-lg p-2 outline-none" />
            <input
              placeholder="Number"
              value={issueFor.phone}
              onChange={(e) =>
                setIssueFor({ ...issueFor, phone: e.target.value })
              }
              className="w-full border border-gray-200 text-sm rounded-lg p-2 outline-none" />
            <input
              placeholder="Email Address"
              value={issueFor.email}
              onChange={(e) =>
                setIssueFor({ ...issueFor, email: e.target.value })
              }
              className="w-full border border-gray-200 text-sm rounded-lg p-2 outline-none" />
          </div>
        </div>

        {/* Products Section */}
        <div>
          {/* Desktop */}
          <div className="hidden sm:block overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-sm md:text-base">
              <thead className="bg-gray-100 ">
                <tr>
                  <th className="p-3 text-left">Product Name</th>
                  <th className="p-3 text-left">Quantity</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Tax</th>
                  <th className="p-3 text-left">Total</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td className="p-3 space-y-2">
                      <input
                        placeholder="Product Name"
                        value={item.product}
                        onChange={(e) =>
                          handleItemChange(index, "product", e.target.value)
                        }
                        className="w-full border border-gray-200 text-sm rounded-lg p-2 outline-none " />
                      <input
                        placeholder="Product Size"
                        value={item.size}
                        onChange={(e) =>
                          handleItemChange(index, "size", e.target.value)
                        }
                        className="w-full border border-gray-200 text-sm rounded-lg p-2 outline-none" />
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            handleItemChange(index, "qty", Math.max(1, item.qty - 1))
                          }
                          className="px-2 bg-gray-200 rounded">
                          -
                        </button>
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) =>
                            handleItemChange(index, "qty", Number(e.target.value))
                          }
                          className="w-16 text-center outline-none" />
                        <button
                          onClick={() => handleItemChange(index, "qty", item.qty + 1)}
                          className="px-2 bg-gray-200 rounded">
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        placeholder="0"
                        value={item.price}
                        onChange={(e) =>
                          handleItemChange(index, "price", e.target.value)
                        }
                        className="w-full border border-gray-200 text-sm rounded-lg p-2 outline-none" />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        placeholder="0"
                        value={item.tax}
                        onChange={(e) =>
                          handleItemChange(index, "tax", e.target.value)
                        }
                        className="w-full border border-gray-200 text-sm rounded-lg p-2 outline-none" />
                    </td>
                    <td className="p-3 font-semibold">₹{calculateTotal(item)}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => removeItem(index)}
                        className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="sm:hidden space-y-4">
            <h2 className="font-bold mb-2 text-[16px] sm:text-base">Items :</h2>
            {items.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3 space-y-3">
                <div>
                  <label className="block font-bold mb-2 text-sm sm:text-base">Product Name</label>
                  <input
                    placeholder="Product Name"
                    value={item.product}
                    onChange={(e) =>
                      handleItemChange(index, "product", e.target.value)
                    }
                    className="w-full border border-gray-200 text-sm rounded-lg p-2 sm:p-3 outline-none" />
                </div>
                <div>
                  <label className="block font-bold mb-2 text-sm sm:text-base">Product Size</label>
                  <input
                    placeholder="Product Size"
                    value={item.size}
                    onChange={(e) =>
                      handleItemChange(index, "size", e.target.value)
                    }
                    className="w-full border border-gray-200 text-sm rounded-lg p-2 sm:p-3 outline-none" />
                </div>
                <div>
                  <label className="block font-bold mb-2 text-sm sm:text-base">Quantity</label>
                  <div className="flex items-center mt-1">
                    <button
                      onClick={() =>
                        handleItemChange(index, "qty", Math.max(1, item.qty - 1))
                      }
                      className="px-3 bg-gray-200 rounded">
                      -
                    </button>
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) =>
                        handleItemChange(index, "qty", Number(e.target.value))
                      }
                      className="w-16 text-center outline-none" />
                    <button
                      onClick={() => handleItemChange(index, "qty", item.qty + 1)}
                      className="px-3 bg-gray-200 rounded">
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block font-bold mb-2 text-sm sm:text-base">Price</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(index, "price", e.target.value)
                    }
                    className="w-full border border-gray-200 text-sm rounded-lg p-2 sm:p-3 outline-none" />
                </div>
                <div>
                  <label className="block font-bold mb-2 text-sm sm:text-base">Tax</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={item.tax}
                    onChange={(e) =>
                      handleItemChange(index, "tax", e.target.value)
                    }
                    className="w-full border border-gray-200 text-sm rounded-lg p-2 sm:p-3 outline-none" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold mb-2 text-sm sm:text-base">Total: ₹{calculateTotal(item)}</span>
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Item & Save */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {/* Grand Total */}
          <div className="flex md:justify-end text-lg font-bold">
            Grand Total: ₹{grandTotal}
          </div>
          <button
            onClick={addItem}
            className="flex justify-center sm:justify-start cursor-pointer items-center gap-2 px-4 sm:px-5.5 py-2 border border-red-900 text-red-900 rounded-lg hover:bg-red-900 hover:text-white transition w-full sm:w-auto">
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>
        <div className="flex justify-end ">
          <button
            onClick={handleSave}
            className="px-4 sm:px-6 py-2 bg-red-900 text-white rounded-lg cursor-pointer  hover:bg-red-800 transition w-full sm:w-auto">
            Save Invoice
          </button>
        </div>
      </div>
    </div>
  );
}

