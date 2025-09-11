import { useRef, useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Invoice() {
  const invoiceRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  // Dynamic Invoice Data
  const invoiceData = {
    id: "#INV-0758267/90",
    issueDate: "23 April 2024",
    dueDate: "26 April 2024",
    amount: 737,
    status: "Paid",
    company: {
      name: "Himvedaa",
      address: "2437 Khangra, H.P",
      phone: "+91 XXXXXXXXXX",
    },
    issuedBy: {
      name: "Himvedaa",
      address: "2437 Khangra, H.P",
      phone: "+91 XXXXXXXXXX",
      email: "himvedaa@gmail.com",
    },
    issuedFor: {
      name: "Rohan Sharma",
      address: "1344 Adarsh Nagar, Delhi, India",
      phone: "+91 XXXXXXXXXX",
      email: "rohan.sharma@gmail.com",
    },
    items: [
      { name: "TusliTouch", size: "", qty: 1, price: 80, tax: 3 },
      { name: "Facewash", size: "", qty: 3, price: 110, tax: 4 },
      { name: "Baby Oil", size: "", qty: 1, price: 132, tax: 5 },
      { name: "Bringha", size: "", qty: 2, price: 110, tax: 5 },
    ],
    discount: 60,
    taxRate: 15.5,
  };

  // totals
  const subTotal = invoiceData.items.reduce(
    (sum, item) => sum + (item.price + item.tax) * item.qty,
    0
  );
  const estimatedTax = ((subTotal - invoiceData.discount) * invoiceData.taxRate) / 100;
  const grandTotal = (subTotal - invoiceData.discount) + estimatedTax;

  // Helper: apply computed color styles inline (returns saved styles for restore)
  const applyComputedColorsInline = (root) => {
    const elems = Array.from(root.querySelectorAll("*"));
    const saved = [];

    elems.forEach((el) => {
      const cs = window.getComputedStyle(el);

      // Save previous inline values (may be empty)
      saved.push({
        el,
        prev: {
          color: el.style.color || null,
          backgroundColor: el.style.backgroundColor || null,
          borderColor: el.style.borderColor || null,
          boxShadow: el.style.boxShadow || null,
          fill: el.style.fill || null,
          stroke: el.style.stroke || null,
        },
      });

      // Set inline styles to computed values (these will be rgb/rgba, not oklch)
      // Only set if computed value is non-empty (transparent still allowed)
      try {
        if (cs.color) el.style.color = cs.color;
        if (cs.backgroundColor) el.style.backgroundColor = cs.backgroundColor;
        // use borderTopColor as representative border color
        if (cs.borderTopColor) el.style.borderColor = cs.borderTopColor;
        if (cs.boxShadow) el.style.boxShadow = cs.boxShadow;
        if (cs.fill) el.style.fill = cs.fill;
        if (cs.stroke) el.style.stroke = cs.stroke;
      } catch (err) {
        // ignore any read-only style errors
      }
    });

    return saved;
  };

  const restoreInlineStyles = (saved) => {
    saved.forEach(({ el, prev }) => {
      if (prev.color !== null) el.style.color = prev.color;
      else el.style.removeProperty("color");

      if (prev.backgroundColor !== null) el.style.backgroundColor = prev.backgroundColor;
      else el.style.removeProperty("background-color");

      if (prev.borderColor !== null) el.style.borderColor = prev.borderColor;
      else el.style.removeProperty("border-color");

      if (prev.boxShadow !== null) el.style.boxShadow = prev.boxShadow;
      else el.style.removeProperty("box-shadow");

      if (prev.fill !== null) el.style.fill = prev.fill;
      else el.style.removeProperty("fill");

      if (prev.stroke !== null) el.style.stroke = prev.stroke;
      else el.style.removeProperty("stroke");
    });
  };

  // Handle PDF download (Print button)
  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return;

    // 1) Inline computed color styles so html2canvas sees rgb/rgba instead of oklch()
    const savedStyles = applyComputedColorsInline(invoiceRef.current);

    try {
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null, // keep transparent backgrounds if any
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // sanitize filename
      const safeFileName = invoiceData.id.replace(/[#\/\\ ]+/g, "_");
      pdf.save(`${safeFileName}.pdf`);
    } catch (err) {
      console.error("PDF export error:", err);
      alert("Failed to generate PDF. See console for details.");
    } finally {
      // 2) restore previous inline styles
      restoreInlineStyles(savedStyles);
    }
  };

  // Simple submit placeholder (replace URL with your backend)
  const handleSubmit = async () => {
    setSubmitting(true);
    setMessage(null);
    try {
      const resp = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...invoiceData, subTotal, estimatedTax, grandTotal }),
      });
      if (!resp.ok) throw new Error(`Server returned ${resp.status}`);
      const data = await resp.json();
      setMessage({ type: "success", text: "Invoice submitted." });
      console.log("Submit response:", data);
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Submit failed" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-3.5 md:p-10 min-h-screen flex flex-col items-center" style={{ backgroundColor: "#f9fafb" }}>
      {/* Invoice Card (captured to PDF) */}
      <div
        ref={invoiceRef}
        className="w-full max-w-4xl rounded-xl shadow p-6 space-y-6"
        style={{ backgroundColor: "#ffffff" }}>
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-4 border-b pb-4" style={{ borderColor: "#e5e7eb" }}>
          <div>
            <h1 className="text-xl font-bold" style={{ color: "#1f2937" }}>Rohit Patil</h1>
            <p style={{ color: "#4b5563" }}>{invoiceData.company.name}</p>
            <p className="text-sm" style={{ color: "#6b7280" }}>{invoiceData.company.address}</p>
            <p className="text-sm" style={{ color: "#6b7280" }}>Phone: {invoiceData.company.phone}</p>
          </div>

          <div className="px-6 py-4 rounded-xl flex flex-col gap-2" style={{ backgroundColor: "#4CAF50" }}>
            <div className="flex items-center justify-between gap-6">
              <div className="space-y-1 text-sm" style={{ color: "#ffffff" }}>
                <p><span className="font-semibold">Invoice:</span> {invoiceData.id}</p>
                <p><span className="font-semibold">Issue Date:</span> {invoiceData.issueDate}</p>
                <p><span className="font-semibold">Due Date:</span> {invoiceData.dueDate}</p>
                <p><span className="font-semibold">Amount:</span> ₹{grandTotal.toFixed(2)}</p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span className="px-3 py-1 text-xs rounded-full" style={{ backgroundColor: "#d1fae5", color: "#059669" }}>
                    {invoiceData.status}
                  </span>
                </p>
              </div>
              <CheckCircle className="w-12 h-12" style={{ color: "#d1fae5" }} />
            </div>
          </div>
        </div>

        {/* Issue From / For */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h2 className="font-semibold" style={{ color: "#374151" }}>Issue From:</h2>
            <p>{invoiceData.issuedBy.name}</p>
            <p>{invoiceData.issuedBy.address}</p>
            <p>Phone: {invoiceData.issuedBy.phone}</p>
            <p>Email: {invoiceData.issuedBy.email}</p>
          </div>
          <div>
            <h2 className="font-semibold" style={{ color: "#374151" }}>Issue For:</h2>
            <p>{invoiceData.issuedFor.name}</p>
            <p>{invoiceData.issuedFor.address}</p>
            <p>Phone: {invoiceData.issuedFor.phone}</p>
            <p>Email: {invoiceData.issuedFor.email}</p>
          </div>
        </div>

        {/* Items */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr style={{ backgroundColor: "#f3f4f6", color: "#374151", textAlign: "left" }}>
                <th className="p-3">Product Name</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Price</th>
                <th className="p-3">Tax</th>
                <th className="p-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, idx) => {
                const rowTotal = (item.price + item.tax) * item.qty;
                return (
                  <tr key={idx} style={{ borderTop: "1px solid #e5e7eb" }}>
                    <td className="p-3">
                      <div style={{ fontWeight: 600 }}>{item.name}</div>
                      <div className="text-xs" style={{ color: "#6b7280" }}>Size: {item.size}</div>
                    </td>
                    <td className="p-3">{item.qty}</td>
                    <td className="p-3">₹{item.price.toFixed(2)}</td>
                    <td className="p-3">₹{item.tax.toFixed(2)}</td>
                    <td className="p-3" style={{ fontWeight: 700 }}>₹{rowTotal.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-around">
          <div className="w-full p-3 space-y-2 text-sm">
            <div className="flex justify-between lg:pr-21">
              <span>Sub Total:</span>
              <span>₹{subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between lg:pr-21">
              <span>Discount:</span>
              <span style={{ color: "#dc2626" }}>- ₹{invoiceData.discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between lg:pr-21">
              <span>Estimated Tax ({invoiceData.taxRate}%):</span>
              <span>₹{estimatedTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg lg:pr-21" style={{ borderTop: "1px solid #e5e7eb", paddingTop: 8 }}>
              <span>Grand Amount:</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Note */}
        <div style={{ backgroundColor: "#fee2e2", color: "#b91c1c", padding: 16, borderRadius: 8 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <AlertCircle className="w-5 h-5" style={{ color: "#ef4444" }} />
            <div>
              <strong>Payment terms:</strong>
              <p style={{ marginTop: 6, fontSize: 12 }}>
                All accounts are to be paid within 7 days from receipt of invoice. If not paid within 7 days,
                credits details supplied as confirmation of work undertaken will be charged with the agreed quoted fee.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-center mt-6">
        <button
          onClick={handleDownloadPDF}
          className="px-6 py-2 rounded-lg text-white"
          style={{ backgroundColor: "#4CAF50" }}
        >
          Download PDF
        </button>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="px-6 py-2 rounded-lg text-white"
          style={{ backgroundColor: "#4CAF50", opacity: submitting ? 0.6 : 1 }}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>

      {message && (
        <div style={{ marginTop: 12, color: message.type === "success" ? "#059669" : "#dc2626" }}>
          {message.text}
        </div>
      )}
    </div>
  );
}
