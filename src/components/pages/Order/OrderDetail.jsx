import React from "react";

const OrderDetail = () => {
  const order = {
    id: "#192847",
    date: "20 Nov 2023",
    total: "$948.50",
    subtotal: "$70.13",
    shipping: "$10.00",
    tax: "$5.00",
    finalTotal: "$90.58",
    address: "3517 W. Gray St. Utica, Pennsylvania 57867",
    payment:
      "Pay on Delivery (Cash/Card). Cash on delivery (COD) available. Card/Net banking acceptance subject to device availability.",
    deliveryDate: "20 Nov 2023",
    items: [
      {
        id: 1,
        name: "Baby Oil",
        image: "/images/protct1.png",
        quantity: 1,
        price: "$50.47",
      },
      {
        id: 2,
        name: "Face Cream",
        image: "/images/protct2.png",
        quantity: 1,
        price: "$50.47",
      },
      {
        id: 3,
        name: "Face Wash",
        image: "/images/protct3.png",
        quantity: 1,
        price: "$50.47",
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Left: Items + Totals */}
        <div className="lg:col-span-2 flex flex-col gap-6 h-full">
          {/* All Items */}
          <div className="bg-white rounded-2xl shadow p-4 flex-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-md">All item</h2>
              {/* <button className="text-gray-500 text-sm">Sort ▾</button> */}
            </div>

            {/* Header Row */}
            <div className="hidden md:flex justify-between px-4 py-2 bg-gray-100 rounded-lg font-semibold text-gray-700 text-sm">
              <div className="w-1/3">Product name</div>
              <div className="w-1/3 text-center">Quantity</div>
              <div className="w-1/3 text-right">Price</div>
            </div>

            {/* Item Rows */}
            <div className="space-y-4 mt-2">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  {/* Left: Product */}
                  <div className="flex items-center gap-4 w-full md:w-1/3 mb-3 md:mb-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                    </div>
                  </div>

                  {/* Center: Quantity */}
                  <div className="w-full md:w-1/3 text-sm md:text-center">
                    <p className="text-gray-600 md:hidden">Quantity:</p>
                    <p className="font-semibold">{item.quantity}</p>
                  </div>

                  {/* Right: Price */}
                  <div className="w-full md:w-1/3 text-sm md:text-right">
                    <p className="text-gray-600 md:hidden">Price:</p>
                    <p className="font-bold">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Totals */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="font-semibold text-lg mb-4">Cart Totals</h2>
            <div className="divide-y text-sm">
              <div className="flex justify-between py-2">
                <span>Subtotal:</span>
                <span>{order.subtotal}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Shipping:</span>
                <span>{order.shipping}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Tax (GST):</span>
                <span>{order.tax}</span>
              </div>
              <div className="flex justify-between py-2 font-semibold text-orange-600">
                <span>Total price:</span>
                <span>{order.finalTotal}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="flex flex-col gap-6 h-full">
          {/* Summary */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="font-semibold text-md mb-4">Summary</h2>
            <p className="text-sm">
              Order ID: <span className="font-semibold">{order.id}</span>
            </p>
            <p className="text-sm">
              Date: <span className="font-semibold">{order.date}</span>
            </p>
            <p className="text-sm">
              Total:{" "}
              <span className="font-semibold text-orange-600">{order.total}</span>
            </p>
          </div>

          {/* Shipping */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="font-semibold text-lg mb-2">Shipping Address</h2>
            <p className="text-sm text-gray-600">{order.address}</p>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="font-semibold text-lg mb-2">Payment Method</h2>
            <p className="text-sm text-gray-600">{order.payment}</p>
          </div>

          {/* Delivery */}
          <div className="bg-white rounded-2xl shadow p-4 flex-1">
            <h2 className="font-semibold text-lg mb-2">
              Expected Date Of Delivery
            </h2>
            <p className="text-green-600 font-medium mb-3">
              {order.deliveryDate}
            </p>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md">
              🚚 Track order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
