import { useState } from "react";
import { FaStar, FaTruck } from "react-icons/fa";
import first from "../../../assets/images/products/1st.png";
import second from "../../../assets/images/products/2nd.jpg";
import third from "../../../assets/images/products/3rd.jpg";
import forth from "../../../assets/images/products/4th.webp";
import NATURAL_PILES_CARE_HERBS from "../../../assets/images/products/NATURAL_PILES_CARE_HERBS.webp";
import { LuHeart, LuShare2 } from "react-icons/lu";
import { FlaskConical, Sprout } from "lucide-react";

import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import EditProduct from "./EditProduct";

const NoPreservatives = (props) => (

  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Circle outline */}
    <circle cx="12" cy="12" r="10" />

    {/* Bigger test tube body */}
    <path d="M9 6v9a3 3 0 0 0 6 0V6z" />

    {/* Tube top line (wider) */}
    <line x1="8" y1="6" x2="16" y2="6" />

    {/* Slash line */}
    <line x1="6" y1="20" x2="18" y2="6" />
  </svg>
);



const thumbnails = [first, second, third, forth, NATURAL_PILES_CARE_HERBS];

const ProductDetail = () => {
  const sizes = [
    { label: "Single Use", price: 299 },
    { label: "8 Tablets", price: 379 },
    { label: "15 Tablets", price: 449 },
    { label: "24 Tablets", price: 519 },
  ];

  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [deliveryOption, setDeliveryOption] = useState("one-time");
  const [mainImage, setMainImage] = useState(thumbnails[0]);
  const [activeTab, setActiveTab] = useState("description");

  // ✅ Price Calculation 
  const finalPrice = selectedSize.price;
  const oldPrice = selectedSize.price + 50;

  // ✅ Pincode Checker State
  const [pincode, setPincode] = useState("");
  const [locationInfo, setLocationInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkPincode = async () => {
    if (!pincode || pincode.length !== 6) {
      setError("Sorry! We are not able to deliver to this pincode.");
      return;
    }

    setLoading(true);
    setError("");
    setLocationInfo(null);

    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await res.json();

      if (data[0].Status === "Success" && data[0].PostOffice.length > 0) {
        const postOffice = data[0].PostOffice[0];
        setLocationInfo({
          pincode,
          area: postOffice.Name,
          district: postOffice.District,
          state: postOffice.State,
        });
      } else {
        setError("No data found for this pincode");
      }
    } catch (err) {
      setError("Failed to fetch location. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="w-full pt-5">
      <div className="flex justify-end w-full">
        <Link
          to="/products/edit"
          className="flex items-center gap-2 mb-5 hover:text-red-900"
        >
          <Pencil className="w-5 h-5" />
          <span>Edit</span>
        </Link>
      </div>

      <div className="max-w-[94%] mx-auto px-4 sm:px-6 lg:px-0 flex flex-col gap-10">
        {/* Product Section */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Section */}
          <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-1/2">
            {/* Thumbnails */}
            <div className="flex lg:flex-col flex-row gap-2 overflow-x-auto lg:overflow-visible max-h-[400px]">
              {thumbnails.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  onClick={() => setMainImage(src)}
                  className={`w-14 h-14 object-cover border rounded cursor-pointer shrink-0 ${mainImage === src ? "ring-2 ring-green-500" : ""
                    }`}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="flex justify-center bg-gray-50 w-full relative">
              <img
                src={mainImage}
                alt="Product"
                className="w-full max-w-[400px] h-auto object-contain rounded"
              />

              <div className="absolute top-2.5 right-2.5 flex space-x-2">
                <button className="p-1.5 border border-gray-300 bg-white rounded-full">
                  <LuHeart />
                </button>
                <button className="p-1.5 rounded-full bg-white border border-gray-300">
                  <LuShare2 />
                </button>
              </div>
            </div>
          </div>

          {/* Right Section md:pl-15*/}
          <div className="w-full  lg:w-1/2">
            {/* Ratings */}
            <div className="flex items-center gap-1 text-yellow-500 mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
              <span className="text-black ml-2 text-sm">425 Reviews</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1">
              MINT DAILY SWISH™
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mb-2">
              1100+ sold in the last 30 days
            </p>
            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Cool and refreshing pulling oil for clean, healthy teeth and gums.
            </p>

            {/* Sizes */}
            <div className="mb-4">
              <p className="font-semibold mb-2">Sizes:</p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size.label}
                    className={`border px-3 py-1 rounded text-sm ${selectedSize.label === size.label
                      ? "bg-green-600 text-white font-medium"
                      : "hover:bg-gray-100"
                      }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="font-bold text-xl pb-4">
              <span className="line-through font-semibold text-gray-400 mr-2">
                ₹{Math.round(oldPrice).toFixed(2)}
              </span>
              ₹ {Math.round(finalPrice).toFixed(2)}
            </div>

            {/* Quantity and Add to Cart / Buy Now */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
              <div className="flex border rounded items-center overflow-hidden w-[50%] sm:w-auto">
                <button
                  className="px-6 sm:px-4 py-2 text-lg font-bold"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  −
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button
                  className="px-6 sm:px-4 py-2 text-lg font-bold"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button className="bg-red-900 hover:bg-red-950 text-white rounded font-bold px-6 py-2.5 w-full sm:w-auto text-center">
                ADD TO CART
              </button>

              {/* ✅ Buy It Now */}
              <button className="bg-green-600 hover:bg-green-700 text-white rounded font-bold px-6 py-2.5 w-full sm:w-auto text-center">
                BUY IT NOW
              </button>
            </div>

            {/* ✅ Payment & Free Delivery Info */}
            <div className="pb-4 mt-4">
              <p className="text-sm text-gray-700 mb-2">
                Checkout safely using your preferred payment method
              </p>
              <div className="flex items-center gap-3 mb-2">
                <img src="https://img.icons8.com/color/48/mastercard-logo.png" alt="Mastercard" className="h-7" />
                <img src="https://img.icons8.com/color/48/paypal.png" alt="PayPal" className="h-7" />
                <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-7" />
                <img src="https://img.icons8.com/color/48/amex.png" alt="Amex" className="h-7" />
              </div>
              {/* <p className="text-sm font-semibold text-gray-800">
                Free Delivery on order worth INR 999/- & above
              </p> */}
            </div>


            {/* ✅ Delivery & Pickup Availability */}
            <div className="mb-4">
              <p className="font-semibold mb-1">Check Delivery & Pickup Availability</p>
              <div className="flex">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter Pincode"
                  className="border p-2 rounded-l w-sm outline-none"
                />
                <button
                  onClick={checkPincode}
                  disabled={loading}
                  className="bg-green-600 text-white px-4 py-2 rounded-r"
                >
                  {loading ? "Checking..." : "Check"}
                </button>
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

              {/* ✅ Show Delivery & Pickup Info */}
              {locationInfo && (
                <div className="mt-3 space-y-2 text-sm">
                  {/* Delivery Info */}
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaTruck className="text-orange-600" />
                    <span>
                      Delivery available to <b>{locationInfo.area}, {locationInfo.district}, {locationInfo.state}</b>
                    </span>
                  </div>

                  {/* Pickup Info */}
                  <div className="flex items-center gap-2 text-gray-700">
                    <FaTruck className="text-green-600" />
                    <span>
                      Pickup available at nearest store in <b>{locationInfo.district}</b> within few hours
                    </span>
                  </div>

                  <button className="mt-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm">
                    View store information
                  </button>
                </div>
              )}
            </div>

            {/* Shipping Notice md:w-[81%]*/}
            <div className="w-full md:w-[73.5%] flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded text-xs sm:text-sm font-medium">
              <span className="font-semibold">10 hours</span> left for same day
              shipping!
              <FaTruck />
            </div>
          </div>
        </div>




        {/* Tabs Section */}
        <div className="w-full mt-">
          <div className="flex justify-start gap-4 sm:gap-6 border-b">
            {["description", "shipping", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={` text-sm sm:text-base md:text-lg font-medium capitalize border-b-2 
                  ${activeTab === tab
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-gray-500 hover:text-black"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-6 text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed max-w-full">
            {activeTab === "description" && (
              <p className="text-justify">

                {/* ✅ Assurance Section */}
                <div className="grid grid-cols-3 gap-6 text-center my-11">
                  <div className="flex flex-col items-center">
                    {/* <img src="https://img.icons8.com/ios-filled/50/000000/test-tube.png" alt="Lab Tested" className="h-10 mb-2" /> */}
                    <FlaskConical className="h-10 w-10" />
                    <p className="font-semibold">Lab Tested</p>
                  </div>
                  <div className="flex flex-col items-center">
                    {/* <img src="https://img.icons8.com/ios-filled/50/000000/natural-food.png" alt="100% Natural" className="h-10 mb-2" /> */}
                    <Sprout className="h-10 w-10" />
                    <p className="font-semibold">100% Natural</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <NoPreservatives className="h-10 w-10" />
                    <p className="font-semibold">No Preservatives</p>
                  </div>
                </div>

                <span className="font-bold text-lg sm:text-xl">
                  Lorem, ipsum dolor:
                </span>
                <br />
                Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste esse vitae quos itaque aliquam dolorem qui doloremque suscipit non molestiae illo saepe, obcaecati quis reiciendis rerum fuga sunt, accusantium officiis repudiandae voluptate iure eveniet. Molestiae repudiandae utvoluptatem. Molestiae illum ducimus earum iusto incidunt, quisconsectetur soluta sequi quam odio.
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam,
                repellendus sequi debitis at ab placeat atque officiis corporis
                minus enim?
                <br /> <br />
                <span className="font-bold text-lg sm:text-xl">Ingredients</span>
                <br />- Ingredient 1
                <br />- Ingredient 2
                <br />- Ingredient 3
                <br />- Ingredient 4
                <br />- Ingredient 5
                <br /> <br />
                Lorem ipsum dolor, sit amet Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Enim, aperiam. consectetur
                adipisicing elit. Perferendis deserunt optio soluta iste sapiente
                et eligendi hic eos expedita, repellendus illum quam molestiae
                excepturi minima nihil quos ab similique eveniet totam, laborum
                odit. Alias, earum dicta illo magnam placeat quisquam nihil
                consequatur nostrum qui iste sunt labore sed esse magni!
              </p>
            )}
            {activeTab === "shipping" && (
              <p>
                <span className="font-bold text-lg sm:text-xl">
                  Returns Policy
                </span>
                <br />
                Within 30 days of delivery...
              </p>
            )}
            {activeTab === "reviews" && (
              <div>
                <p className="font-semibold">Customer Reviews</p>
                <p>⭐ 4.8/5 based on 425 reviews</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
