import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  CircleUserRound,
  PanelRightClose,
  X,
  ShoppingBag,
  Layers2,
  Archive,
  UserRound,
  Settings,
  Package,
  BadgeDollarSign,
  ReceiptText,
  Home,
  MessageCircleQuestionMark,
  Bell,
  MessageSquare,
  Search,
  Menu
} from "lucide-react";
import { HiMenu } from "react-icons/hi";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

// Pages
import Notification from "../pages/Notification";
import Dropdown from "../pages/Dropdown";

import Dashboard from "../pages/Dashboard/Dashboard";

import ProductList from "../pages/Products/ProductList";
import AddProduct from "../pages/Products/AddProduct";
import ProductDetail from "../pages/Products/ProductDetail";
import EditProduct from "../pages/Products/EditProduct";

import CategoryList from "../pages/Categories/CategoryList";
import AddCategory from "../pages/Categories/AddCategory";

import OrderList from "../pages/Order/OrderList";
import OrderDetail from "../pages/Order/OrderDetail";
import OrderTracking from "../pages/Order/OrderTracking";
import ReturningOrderList from "../pages/Order/ReturningOrderList";

import Transaction from "../pages/Transactions/Transaction";

import InvoiceList from "../pages/Invoice/InvoiceList";
import InvoiceDetail from "../pages/Invoice/InvoiceDetail";
import CreateInvoice from "../pages/Invoice/CreateInvoice";

import UserList from "../pages/User/UserList";
import ProfileSetting from "../pages/Setting/ProfileSetting";




const SidebarLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const navigate = useNavigate();

  // Handle resize for mobile/desktop
  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsOpen(window.innerWidth >= 768);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Sidebar menus with routes + components
  const menus = [
    {
      name: "Dashboard",
      icon: <Home strokeWidth={1} />,
      path: "/dashboard",
      component: <Dashboard />,
    },
    {
      name: "Products",
      icon: <ShoppingBag strokeWidth={1} />,
      children: [
        { name: "Product List", path: "/products/list", component: <ProductList /> },
        { name: "Add Product", path: "/products/add", component: <AddProduct /> },
        { name: "Product Detail", path: "/products/detail", component: <ProductDetail /> },
        { name: "Edit Product", path: "/products/edit", component: <EditProduct /> },
      ],
    },
    {
      name: "Category",
      icon: <Layers2 strokeWidth={1} />,
      children: [
        { name: "Category List", path: "/category/list", component: <CategoryList /> },
        { name: "Add Category", path: "/category/add", component: <AddCategory /> },

      ],
    },
    {
      name: "Orders",
      icon: <Archive strokeWidth={1} />,
      children: [
        { name: "Order List", path: "/orders/list", component: <OrderList /> },
        { name: "Order Detail", path: "/orders/detail", component: <OrderDetail /> },
        { name: "Order Tracking", path: "/orders/tracking", component: <OrderTracking /> },
        { name: "Returning Orders List", path: "/orders/returns", component: <ReturningOrderList/> },
      ],
    },
    {
      name: "Transactions",
      icon: <BadgeDollarSign strokeWidth={1} />,
      children: [
        { name: "Transaction List", path: "/transactions", component: <Transaction /> },
      ],
    },
    {
      name: "Invoice",
      icon: <ReceiptText strokeWidth={1} />,
      children: [
        { name: "Invoice List", path: "/invoice/list", component: <InvoiceList /> },
        { name: "Invoice Detail", path: "/invoice/detail", component: <InvoiceDetail /> },
        { name: "Create Invoice", path: "/invoice/create", component: <CreateInvoice /> },
      ],
    },
    {
      name: "Users",
      icon: <UserRound strokeWidth={1} />,
      children: [
        { name: "User List", path: "/users/list", component: <UserList /> },
        // { name: "User Roles", path: "/users/roles", component: <h2>User Roles Page</h2> },
        // { name: "User Permissions", path: "/users/permissions", component: <h2>User Permissions Page</h2> },
      ],
    },
    {
      name: "Settings",
      icon: <Settings strokeWidth={1} />,
      children: [
        // { name: "General Settings", path: "/settings/general", component: <h2>General Settings Page</h2> },
        { name: "Profile Settings", path: "/settings/profile", component: <ProfileSetting /> },
        // { name: "Security", path: "/settings/security", component: <h2>Security Page</h2> },
      ],
    },
    // {
    //   name: "Support",
    //   icon: <MessageCircleQuestionMark strokeWidth={1} />,
    //   children: [
    //     { name: "Help Centre", path: "/support/help", component: <h2>Help Centre Page</h2> },
    //     { name: "FAQ's", path: "/support/faq", component: <h2>FAQ Page</h2> },
    //   ],
    // },
  ];

  // Toggle parent menu
  const handleMenuClick = (menu) => {
    if (!menu.children) {
      if (menu.path) navigate(menu.path);
      setExpandedMenu(null);
      // if (isMobile) setIsOpen(false);
    } else {
      if (!isOpen && !isMobile) {
        setIsOpen(true);
        setExpandedMenu(menu.name);
      } else {
        setExpandedMenu((prev) => (prev === menu.name ? null : menu.name));
      }
    }
  };

  // Handle submenu click
  const handleChildClick = (child) => {
    if (child.path) navigate(child.path);
    setExpandedMenu(null);
    // setIsOpen(false);
  };

  const handleCloseSidebar = () => {
    setIsOpen(false);
    setExpandedMenu(null);
  };

  // for notification bell
  const notifications = [
    {
      id: 1,
      title: "Discount available",
      text: "Morbi sapien massa, ultricies at rhoncus at, ullamcorper nec diam",
      color: "bg-blue-100 text-blue-600",
      icon: "🏷️",
    },
    {
      id: 2,
      title: "Account has been verified",
      text: "Mauris libero ex, iaculis vitae rhoncus et",
      color: "bg-purple-100 text-purple-600",
      icon: "👤",
    },
    {
      id: 3,
      title: "Order shipped successfully",
      text: "Integer aliquam eros nec sollicitudin sollicitudin",
      color: "bg-green-100 text-green-600",
      icon: "📦",
    },
    {
      id: 4,
      title: "Order pending: ID 305830",
      text: "Ultricies at rhoncus at ullamcorper",
      color: "bg-red-100 text-red-600",
      icon: "🚚",
    },
  ];

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close notification dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // for message button
  const messages = [
    {
      id: 1,
      name: "Cameron Williamson",
      text: "Hello?",
      time: "10:13 PM",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Ralph Edwards",
      text: "Are you there? interested in this...",
      time: "10:13 PM",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Eleanor Pena",
      text: "Interested in this load?",
      time: "10:13 PM",
      img: "https://randomuser.me/api/portraits/men/55.jpg",
    },
    {
      id: 4,
      name: "Jane Cooper",
      text: "Okay...Do we have a deal?",
      time: "10:13 PM",
      img: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  const [open, setOpen] = useState(false);
  const dropdownnRef = useRef(null);

  // Close messages dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownnRef.current && !dropdownnRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  // for notification
  const [unreadCount, setUnreadCount] = useState(notifications.length); // default all as unread

  // const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);


  // Add refs
  const notificationRef = useRef(null);
  const messagesRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setIsNotificationOpen(false);
      }
      if (messagesRef.current && !messagesRef.current.contains(e.target)) {
        setIsMessagesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  return (
    <div className="h-screen bg-gray-50">

      {/* <Routes>
        <Route path="/notifications" element={<Notification />} />
      </Routes> */}

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={handleCloseSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full border border-red-900 bg-white text-red-900 z-30 transform transition-all duration-300 ease-in-out
        ${isMobile ? (isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64") : isOpen ? "w-72" : "w-16"}
        `}
      >
        {/* Logo / Toggle */}
        <div className="flex items-center justify-between px-3 pt-5 pb-4">
          <div className="flex items-center gap-2">
            <img
              src="/images/logo.png"
              alt="Logo"
              className={`transition-all duration-300 ${isOpen ? "w-32 h-16" : "w-10 h-10 mx-auto"}`}
            />
          </div>

          {/* Desktop toggle */}
          <button
            aria-label="Toggle sidebar"
            onClick={() => (isOpen ? handleCloseSidebar() : setIsOpen(true))}
            className="hidden md:block text-xl p-2 rounded-md hover:bg-green-700 hover:text-white"
          >
            <PanelRightClose
              className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
              strokeWidth={1}
            />
          </button>

          {/* Mobile close */}
          {isMobile && (
            <button
              aria-label="Close sidebar"
              onClick={handleCloseSidebar}
              className="md:hidden text-xl p-2 rounded-md hover:bg-green-700"
            >
              <X />
            </button>
          )}
        </div>

        {/* Menu */}
        <ul className="flex flex-col items-stretch gap-1 px-2">
          {menus.map((menu) => {
            const expanded = expandedMenu === menu.name;
            return (
              <li key={menu.name}>
                <button
                  onClick={() => handleMenuClick(menu)}
                  className={` group w-full rounded-lg text-red-900 hover:text-white transition-colors flex items-center
                    ${expanded ? "bg-green-700 text-white" : "hover:bg-green-700"}
                    ${isOpen ? "justify-between px-3 py-2" : "justify-center pl-7 p-4"}
                  `}
                >
                  <div className="flex items-center gap-3">
                    {/* <div className="bg-red-900 w-2 h-8 "></div> */}
                    <span className="w-6 h-6 flex items-center justify-center text-xl">
                      {menu.icon}
                    </span>
                    <span
                      className={`text-sm transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 w-0 pointer-events-none"}`}
                    >
                      {menu.name}
                    </span>
                  </div>
                  {menu.children && isOpen && (expanded ? <FiChevronDown /> : <FiChevronRight />)}
                </button>

                {menu.children && expanded && isOpen && (
                  <ul className="ml-10 mt-1 flex flex-col gap-1 text-sm">
                    {menu.children.map((child) => (
                      <li key={child.name}>
                        <button
                          onClick={() => handleChildClick(child)}
                          className="block w-full text-left px-2 py-1 rounded-md hover:bg-green-700 hover:text-white "
                        >
                          {child.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Main area */}
      <div
        className={`transition-all duration-300 h-full flex flex-col
        ${isMobile ? "ml-0" : isOpen ? "ml-72" : "ml-16"}`}
      >
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white shadow px-4 md:px-6 py-3 flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {isMobile && (
              <button
                onClick={() => setIsOpen(true)}
                className="md:hidden p-2 rounded-md hover:bg-gray-200"
              >
                <Menu className="text-gray-600 w-5.5 h-5.5 cursor-pointer" strokeWidth={1.5} />
              </button>
            )}

            {/* Desktop Search */}
            {!isMobile && (
              <div className="flex items-center bg-gray-100 rounded-md px-3 py-1 w-full sm:w-64 md:w-72 lg:w-96">
                <input
                  type="text"
                  placeholder="Search here..."
                  className="bg-gray-100 outline-none px-2 w-full"
                />
                <Search className="text-gray-500 w-4 h-4"/> 
              </div>
            )}
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4 md:gap-4 flex-shrink-0">


            {isMobile && (
              <>
                {showMobileSearch ? (
                  <div className="flex items-center bg-gray-100 rounded-md px-3 py-1 flex-1">
                    <input
                      type="text"
                      placeholder="Search here..."
                      className="bg-gray-100 outline-none px-2 w-full"
                    />
                    <button onClick={() => setShowMobileSearch(false)} className="ml-2">
                      <X className="text-gray-600 w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <Search
                    className="text-gray-600 text-xl cursor-pointer"
                    strokeWidth={1}
                    onClick={() => setShowMobileSearch(true)}
                  />
                )}
              </>
            )}

            {/* Notification Icon */}
            <button onClick={() => {
              setIsNotificationOpen(!isNotificationOpen);
              setIsMessagesOpen(false); // close messages if open
            }}>
              <Bell className="text-gray-600 text-xl cursor-pointer" strokeWidth={1} />
            </button>

            {/* Messages Icon */}
            <button onClick={() => {
              setIsMessagesOpen(!isMessagesOpen);
              setIsNotificationOpen(false); // close notifications if open
            }}>
              <MessageSquare className="text-gray-600 w-5.5 h-5.5 cursor-pointer" strokeWidth={1} />
            </button>


            {/* Notification Dropdown */}
            <Dropdown
              ref={notificationRef}
              open={isNotificationOpen}
              title="Notifications"
              type="notifications"
              items={notifications}
              onClose={() => setIsNotificationOpen(false)}
            />

            {/* Messages Dropdown */}
            <Dropdown
              ref={messagesRef}
              open={isMessagesOpen}
              title="Messages"
              type="messages"
              items={messages}
              onClose={() => setIsMessagesOpen(false)}
            />



            {/* if needed put here from bottom */}

            {/* Profile */}
            <div className="relative">
              <CircleUserRound
                className="text-gray-600 cursor-pointer w-7 h-7"
                strokeWidth={0.7}
              />

            </div>
          </div>
        </header>

        {/* Main content (React Router outlet) */}
        <main className="p-4 md:p-6 flex-1 overflow-y-auto">
          <Routes>
            {/* Redirect root path → /dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {menus.map((menu) => {
              if (menu.children) {
                return menu.children.map((child) => (
                  <Route key={child.path} path={child.path} element={child.component} />
                ));
              }
              return <Route key={menu.path} path={menu.path} element={menu.component} />;
            })}
            {/* ✅ Add Notification route here */}
            <Route path="/notifications" element={<Notification />} />

            {/* Catch-all (optional) */}
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;















// put this above if needed here

// {/* Notification bell */}
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setIsNotificationOpen(!isNotificationOpen)}
//                 className="relative p-2 rounded-full hover:bg-gray-100"
//               >
//                 <Bell className="text-gray-600 text-xl cursor-pointer" strokeWidth={1} />
//                 {unreadCount > 0 && (
//                   <span className="absolute top-1 right-1 bg-red-900 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                     {unreadCount}
//                   </span>
//                 )}

//               </button>

//               {isNotificationOpen && (
//                 <div
//                   className="
//                           fixed top-16 left-0 right-0 mx-3 z-50
//                           bg-white shadow-lg rounded-2xl overflow-hidden
//                           md:absolute md:top-auto md:left-1/2 md:right-auto md:mx-0 md:mt-5 md:-translate-x-1/2
//                           md:w-80 md:max-w-[90vw]
//                         "
//                 >
//                   <div className="p-4 border-b border-gray-200 w-full">
//                     <h3 className="text-lg font-semibold">Notifications</h3>
//                   </div>

//                   <div className="w-full max-h-[70vh] md:max-h-72 overflow-y-auto">
//                     {notifications.map((item) => (
//                       <div
//                         key={item.id}
//                         className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition w-full"
//                       >
//                         <div className={`flex items-center justify-center w-10 h-10 rounded-full ${item.color}`}>
//                           <span className="text-lg">{item.icon}</span>
//                         </div>
//                         <div className="flex-1">
//                           <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
//                           <p className="text-xs text-gray-500">{item.text}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="p-3 border-t border-gray-200 w-full">
//                     <button
//                       className="w-full border text-red-900 border-red-900 hover:bg-red-800 hover:text-white py-2 rounded-lg font-medium transition"
//                       onClick={() => {
//                         setUnreadCount(0);
//                         navigate("/notifications");
//                         setIsNotificationOpen(false);
//                         if (isMobile) setIsOpen(false);
//                       }}
//                     >
//                       View all
//                     </button>
//                   </div>
//                 </div>
//               )}

//             </div>

//             {/* Message dropdown */}
//             <div className="relative" ref={dropdownnRef}>
//               <button
//                 onClick={() => setOpen(!open)}
//                 className="relative p-2 rounded-full hover:bg-gray-100"
//               >
//                 <MessageSquare className="text-gray-600 w-5.5 h-5.5 cursor-pointer" strokeWidth={1} />
//                 <span className="absolute top-1 right-1 bg-red-900 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                   1
//                 </span>
//               </button>

//               {open && (
//                 <div
//                   className="
//       fixed top-16 left-0 right-0 mx-3 z-50
//       bg-white shadow-lg rounded-2xl overflow-hidden
//       md:absolute md:top-auto md:left-1/2 md:right-auto md:mx-0 md:mt-5 md:-translate-x-1/2
//       md:w-80 md:max-w-[90vw]
//     "
//                 >
//                   <div className="p-4 border-b border-gray-200 w-full">
//                     <h3 className="text-lg font-semibold">Messages</h3>
//                   </div>

//                   <div className="w-full max-h-[70vh] md:max-h-72 overflow-y-auto">
//                     {messages.map((msg) => (
//                       <div
//                         key={msg.id}
//                         className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition w-full"
//                       >
//                         <div className="flex items-center gap-3">
//                           <img
//                             src={msg.img}
//                             alt={msg.name}
//                             className="w-10 h-10 rounded-full object-cover"
//                           />
//                           <div>
//                             <p className="font-semibold text-gray-800 text-sm">{msg.name}</p>
//                             <p className="text-xs text-gray-500 truncate">{msg.text}</p>
//                           </div>
//                         </div>
//                         <span className="text-xs text-gray-400">{msg.time}</span>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="p-3 border-t border-gray-200 w-full">
//                     <button className="w-full border text-red-900 border-red-900 hover:bg-red-800 hover:text-white py-2 rounded-lg font-medium transition">
//                       View all
//                     </button>
//                   </div>
//                 </div>
//               )}

//             </div>


// End here





















// import React, { useEffect, useState, useRef } from "react";
// import Dashboard from "../pages/Dashboard";
// import {
//   FaHome,
//   FaBoxOpen,
//   FaUser,
//   FaShoppingCart,
//   FaCog,
//   FaBell,
//   FaSearch,
//   FaLayerGroup,
//   FaTags,
// } from "react-icons/fa";
// import { CircleUserRound, PanelRightClose, X, ShoppingBag, Layers2, Archive, UserRound, Settings, Package, BadgeDollarSign, ReceiptText, Home, MessageCircleQuestionMark, Bell, MessageSquare } from "lucide-react";
// import { HiMenu } from "react-icons/hi";
// import { FiChevronDown, FiChevronRight } from "react-icons/fi";
// import { BsGrid3X3Gap } from "react-icons/bs";
// import { MdOutlineDarkMode } from "react-icons/md";
// import { AiOutlineFullscreen } from "react-icons/ai";
// import { BiMessageDetail } from "react-icons/bi";
// import ProductListPage from "../pages/ProductList";
// import ProductList from "../pages/ProductList";
// // import whitelogo from "/images/white-logo.png";


// const SidebarLayout = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [activeMenu, setActiveMenu] = useState(<activeMenu />);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [expandedMenu, setExpandedMenu] = useState(null);
//   const [showMobileSearch, setShowMobileSearch] = useState(false);

//   // Handle resize for mobile/desktop
//   useEffect(() => {
//     const onResize = () => {
//       setIsMobile(window.innerWidth < 768);
//       setIsOpen(window.innerWidth >= 768);
//     };
//     onResize();
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   // Sidebar menus
//   const menus = [
//     { name: "Dashboard", icon: <Home strokeWidth={1} /> },
//     { name: "Products", icon: <ShoppingBag strokeWidth={1} />, children: ["Product List", "Add Product", "Product Detail", "Edit Product"] },
//     { name: "Category", icon: <Layers2 strokeWidth={1} />, children: ["Add Category", "Category List"] },
//     { name: "Inventory", icon: <Package strokeWidth={1} />, children: ["Warehouse List", "Received Order List"] },
//     { name: "Orders", icon: <Archive strokeWidth={1} />, children: ["Order List", "Order Detail", "Order Tracking", "Returning Orders List"] },
//     { name: "Transactions", icon: <BadgeDollarSign strokeWidth={1} />, children: ["Mode"] },
//     { name: "Invoice", icon: <ReceiptText strokeWidth={1} />, children: ["Invoice List", "Invoice Detail", "Create Invoice"] },
//     { name: "Users", icon: <UserRound strokeWidth={1} />, children: ["User List", "User Roles", "User Permissions"] },
//     { name: "Settings", icon: <Settings strokeWidth={1} />, children: ["General Settings", "Profile Settings", "Security"] },
//     { name: "Support", icon: <MessageCircleQuestionMark strokeWidth={1} />, children: ["Help Centre", "FAQ's"] },
//   ];

//   // Toggle parent menu
//   const handleMenuClick = (menu) => {
//     if (!menu.children) {
//       setActiveMenu(<activeMenu/> );
//       setExpandedMenu(null);
//       if (isMobile) setIsOpen(false);
//     } else {
//       if (!isOpen && !isMobile) {
//         setIsOpen(true);
//         setExpandedMenu(menu.name);
//       } else {
//         setExpandedMenu((prev) => (prev === menu.name ? null : menu.name));
//       }
//     }
//   };

//   // Handle submenu click
//   const handleChildClick = (child) => {
//     setActiveMenu(child);
//     setExpandedMenu(null);
//     setIsOpen(false);
//   };

//   const handleCloseSidebar = () => {
//     setIsOpen(false);
//     setExpandedMenu(null);
//   };

//   // for notification bell
//   const notifications = [
//     {
//       id: 1,
//       title: "Discount available",
//       text: "Morbi sapien massa, ultricies at rhoncus at, ullamcorper nec diam",
//       color: "bg-blue-100 text-blue-600",
//       icon: "🏷️",
//     },
//     {
//       id: 2,
//       title: "Account has been verified",
//       text: "Mauris libero ex, iaculis vitae rhoncus et",
//       color: "bg-purple-100 text-purple-600",
//       icon: "👤",
//     },
//     {
//       id: 3,
//       title: "Order shipped successfully",
//       text: "Integer aliquam eros nec sollicitudin sollicitudin",
//       color: "bg-green-100 text-green-600",
//       icon: "📦",
//     },
//     {
//       id: 4,
//       title: "Order pending: ID 305830",
//       text: "Ultricies at rhoncus at ullamcorper",
//       color: "bg-red-100 text-red-600",
//       icon: "🚚",
//     },
//   ];

//   const [isNotificationOpen, setIsNotificationOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // Close dropdown if clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setIsNotificationOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // for message button
//   const messages = [
//     {
//       id: 1,
//       name: "Cameron Williamson",
//       text: "Hello?",
//       time: "10:13 PM",
//       img: "https://randomuser.me/api/portraits/men/32.jpg",
//     },
//     {
//       id: 2,
//       name: "Ralph Edwards",
//       text: "Are you there? interested i this...",
//       time: "10:13 PM",
//       img: "https://randomuser.me/api/portraits/women/44.jpg",
//     },
//     {
//       id: 3,
//       name: "Eleanor Pena",
//       text: "Interested in this loads?",
//       time: "10:13 PM",
//       img: "https://randomuser.me/api/portraits/men/55.jpg",
//     },
//     {
//       id: 4,
//       name: "Jane Cooper",
//       text: "Okay...Do we have a deal?",
//       time: "10:13 PM",
//       img: "https://randomuser.me/api/portraits/women/65.jpg",
//     },
//   ];

//   const [open, setOpen] = useState(false);
//   const dropdownnRef = useRef(null);

//   // Close dropdown if clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownnRef.current && !dropdownnRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);


//   return (
//     <div className="h-screen bg-gray-50">
//       {/* Overlay for mobile */}
//       {isMobile && isOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-20 md:hidden"
//           onClick={handleCloseSidebar}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 h-full bg-green-700 text-white z-30 transform transition-all duration-300 ease-in-out
//         ${isMobile ? (isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64") : isOpen ? "w-72" : "w-16"}
//         `}
//       >
//         {/* Logo / Toggle */}
//         <div className="flex items-center justify-between px-3 pt-5 pb-4">
//           <div className="flex items-center gap-2">
//             <img
//               // src={Logo}
//               src="/images/whiteLogo.png"
//               alt="Logo"
//               className={`transition-all duration-300 ${isOpen ? "w-32 h-16" : "w-10 h-10 mx-auto"}`}
//             />
//           </div>

//           {/* Desktop toggle */}
//           <button
//             aria-label="Toggle sidebar"
//             onClick={() => (isOpen ? handleCloseSidebar() : setIsOpen(true))}
//             className="hidden md:block text-xl p-2 rounded-md hover:bg-green-600/60"
//           >
//             <PanelRightClose
//               className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
//               strokeWidth={1}
//             />
//           </button>

//           {/* Mobile close */}
//           {isMobile && (
//             <button
//               aria-label="Close sidebar"
//               onClick={handleCloseSidebar}
//               className="md:hidden text-xl p-2 rounded-md hover:bg-green-600/60"
//             >
//               <X />
//             </button>
//           )}
//         </div>

//         {/* Menu */}
//         <ul className="flex flex-col items-stretch gap-1 px-2">
//           {menus.map((menu) => {
//             const expanded = expandedMenu === menu.name;
//             return (
//               <li key={menu.name}>
//                 <button
//                   onClick={() => handleMenuClick(menu)}
//                   className={` group w-full rounded-lg text-white hover:text-white transition-colors flex items-center
//                     ${expanded ? "bg-green-600" : "hover:bg-green-600/70"}
//                     ${isOpen ? "justify-between px-3 py-2" : "justify-center pl-7 p-4"}
//                   `}
//                 >
//                   <div className="flex items-center gap-3">
//                     <span className="w-6 h-6 flex items-center justify-center text-xl">{menu.icon}</span>
//                     <span
//                       className={`text-sm transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 w-0 pointer-events-none"
//                         }`}
//                     >
//                       {menu.name}
//                     </span>
//                   </div>
//                   {menu.children && isOpen && (expanded ? <FiChevronDown /> : <FiChevronRight />)}
//                 </button>

//                 {menu.children && expanded && isOpen && (
//                   <ul className="ml-10 mt-1 flex flex-col gap-1 text-sm">
//                     {menu.children.map((child) => (
//                       <li key={child}>
//                         <button
//                           onClick={() => handleChildClick(child)}
//                           className={`block w-full text-left px-2 py-1 rounded-md hover:bg-green-600/50 ${activeMenu === child ? "bg-green-600" : ""
//                             }`}
//                         >
//                           {child}
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </li>
//             );
//           })}
//         </ul>
//       </aside>

//       {/* Main area */}
//       <div
//         className={`transition-all duration-300 h-full flex flex-col
//         ${isMobile ? "ml-0" : isOpen ? "ml-72" : "ml-16"}`}
//       >
//         {/* Header */}
//         <header className="sticky top-0 z-10 bg-white shadow px-4 md:px-6 py-3 flex items-center justify-between">
//           {/* Left section */}
//           <div className="flex items-center gap-3 w-full md:w-auto">
//             {isMobile && (
//               <button
//                 onClick={() => setIsOpen(true)}
//                 className="md:hidden p-2 rounded-md hover:bg-gray-200"
//               >
//                 <HiMenu className="text-2xl text-gray-700" />
//               </button>
//             )}

//             {/* Desktop Search */}
//             {!isMobile && (
//               <div className="flex items-center bg-gray-100 rounded-md px-3 py-1 w-full sm:w-64 md:w-72 lg:w-96">
//                 <input
//                   type="text"
//                   placeholder="Search here..."
//                   className="bg-gray-100 outline-none px-2 w-full"
//                 />
//                 <FaSearch className="text-gray-500 w-4 h-4" />
//               </div>
//             )}
//           </div>

//           {/* Right section */}
//           <div className="flex items-center gap-4 md:gap-6 flex-shrink-0">
//             {/* Mobile search icon */}
//             {isMobile && (
//               <FaSearch
//                 className="text-gray-600 w-4.5 h-4.5 text-xl cursor-pointer"
//                 onClick={() => setShowMobileSearch(true)}
//               />
//             )}

//             {/* <MdOutlineDarkMode className="text-gray-600 text-xl cursor-pointer" /> */}

//             {/* <Bell className="text-gray-600 text-xl cursor-pointer" strokeWidth={1} /> */}
//             <div className="relative" ref={dropdownRef}>
//               {/* Notification bell */}
//               <button
//                 onClick={() => setIsNotificationOpen(!isNotificationOpen)}
//                 className="relative p-2 rounded-full hover:bg-gray-100"
//               >
//                 <Bell className="text-gray-600 text-xl cursor-pointer" strokeWidth={1} />
//                 <span className="absolute top-1 right-1 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                   1
//                 </span>
//               </button>

//               {/* Dropdown */}
//               {isNotificationOpen && (
//                 <div className="absolute right-0 mt-5 w-80 bg-white shadow-lg rounded-2xl overflow-hidden z-50">
//                   <div className="p-4 border-b border-gray-200">
//                     <h3 className="text-lg font-semibold">Notifications</h3>
//                   </div>

//                   <div className="max-h-72 overflow-y-auto">
//                     {notifications.map((item) => (
//                       <div
//                         key={item.id}
//                         className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition"
//                       >
//                         {/* Icon */}
//                         <div
//                           className={`flex items-center justify-center w-10 h-10 rounded-full ${item.color}`}
//                         >
//                           <span className="text-lg">{item.icon}</span>
//                         </div>

//                         {/* Text */}
//                         <div className="flex-1">
//                           <p className="font-semibold text-gray-800 text-sm">
//                             {item.title}
//                           </p>
//                           <p className="text-xs text-gray-500">{item.text}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="p-3 border-t border-gray-200">
//                     <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition">
//                       View all
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>


//             {/* <MessageSquare className="text-gray-600 w-5.5 h-5.5 cursor-pointer" strokeWidth={1} /> */}
//             <div className="relative" ref={dropdownnRef}>
//               {/* Message button */}
//               <button
//                 onClick={() => setOpen(!open)}
//                 className="relative p-2 rounded-full hover:bg-gray-100"
//               >
//                 <MessageSquare className="text-gray-600 w-5.5 h-5.5 cursor-pointer" strokeWidth={1} />
//                 <span className="absolute top-1 right-1 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                   1
//                 </span>
//               </button>

//               {/* Dropdown */}
//               {open && (
//                 <div className="absolute right-0 mt-5 w-80 bg-white shadow-lg rounded-2xl overflow-hidden z-50">
//                   <div className="p-4 border-b border-gray-200">
//                     <h3 className="text-lg font-semibold">Message</h3>
//                   </div>

//                   <div className="max-h-72 overflow-y-auto">
//                     {messages.map((msg) => (
//                       <div
//                         key={msg.id}
//                         className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
//                       >
//                         <div className="flex items-center gap-3">
//                           <img
//                             src={msg.img}
//                             alt={msg.name}
//                             className="w-10 h-10 rounded-full object-cover"
//                           />
//                           <div>
//                             <p className="font-semibold text-gray-800">{msg.name}</p>
//                             <p className="text-sm text-gray-500 truncate w-40">
//                               {msg.text}
//                             </p>
//                           </div>
//                         </div>
//                         <span className="text-xs text-gray-400">{msg.time}</span>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="p-3 border-t border-gray-200">
//                     <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition">
//                       View all
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//             {/* <AiOutlineFullscreen className="text-gray-600 text-xl cursor-pointer" /> */}
//             {/* <BsGrid3X3Gap className="text-gray-600 text-xl cursor-pointer" /> */}
//             <div className="flex items-center gap-2 cursor-pointer">
//               <CircleUserRound className="w-6 h-6 text-gray-600" strokeWidth={1} />
//               <div className="hidden md:flex flex-col leading-tight">
//                 <span className="font-medium text-sm text-gray-700">Kristin Watson</span>
//                 <span className="text-xs text-gray-500">Admin</span>
//               </div>
//             </div>
//             <Settings className="text-gray-600 text-xl w-6 h-6 cursor-pointer" strokeWidth={1} />
//           </div>
//         </header>

//         {/* Mobile search overlay */}
//         {isMobile && showMobileSearch && (
//           <div className="fixed inset-0 bg-white z-40 flex items-start p-4 shadow-md">
//             <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-full">
//               <FaSearch className="text-gray-500" />
//               <input
//                 type="text"
//                 placeholder="Search here..."
//                 autoFocus
//                 className="bg-gray-100 outline-none px-2 w-full"
//               />
//               <button
//                 onClick={() => setShowMobileSearch(false)}
//                 className="ml-2 text-gray-600"
//               >
//                 <X />
//               </button>
//             </div>
//           </div>
//         )}

//         <main className="p-4 md:p-6">
//           <h2 className="text-2xl font-semibold">{activeMenu}</h2>
//           {/* <p className="mt-2 text-gray-600">Welcome to the Himveda Admin Panel.</p> */}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default SidebarLayout;






















// import React, { useEffect, useState } from "react";
// import {
//   FaHome,
//   FaBoxOpen,
//   FaUser,
//   FaShoppingCart,
//   FaCog,
//   FaBell,
//   FaSearch,
//   FaLayerGroup,
//   FaTags,
// } from "react-icons/fa";
// import { CircleUserRound, PanelRightClose, X } from "lucide-react";
// import { HiMenu } from "react-icons/hi";
// import { FiChevronDown, FiChevronRight } from "react-icons/fi";

// // logo
// import Logo from "/images/logo.png";

// const SidebarLayout = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [activeMenu, setActiveMenu] = useState("Dashboard");
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [expandedMenu, setExpandedMenu] = useState(null);

//   // Handle resize for mobile/desktop
//   useEffect(() => {
//     const onResize = () => {
//       setIsMobile(window.innerWidth < 768);
//       setIsOpen(window.innerWidth >= 768);
//     };
//     onResize();
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   // Sidebar menus
//   const menus = [
//     { name: "Dashboard", icon: <FaHome /> },
//     {
//       name: "Ecommerce",
//       icon: <FaShoppingCart />,
//       children: ["Add Product", "Product List", "Product Detail 1", "Product Detail 2", "Product Detail 3"],
//     },
//     { name: "Category", icon: <FaLayerGroup />, children: ["Add Category", "Category List"] },
//     { name: "Attributes", icon: <FaTags />, children: ["Add Attribute", "Attribute List"] },
//     { name: "Orders", icon: <FaBoxOpen />, children: ["Order List", "Order Detail"] },
//     { name: "Users", icon: <FaUser />, children: ["User List", "User Roles", "User Permissions"] },
//     { name: "Settings", icon: <FaCog />, children: ["General Settings", "Profile Settings", "Security"] },
//   ];

//   // Toggle parent menu
//   const handleMenuClick = (menu) => {
//     if (!menu.children) {
//       // Direct menu (like Dashboard)
//       setActiveMenu(menu.name);
//       setExpandedMenu(null);

//       if (isMobile) {
//         setIsOpen(false); // close only on mobile
//       }
//     } else {
//       // Has children
//       if (!isOpen && !isMobile) {
//         setIsOpen(true);
//         setExpandedMenu(menu.name);
//       } else {
//         setExpandedMenu((prev) => (prev === menu.name ? null : menu.name));
//       }
//     }
//   };
//   // Handle submenu click
//   const handleChildClick = (child) => {
//     setActiveMenu(child);
//     setExpandedMenu(null);
//     setIsOpen(false); // close sidebar (mobile & desktop)
//   };

//   const handleCloseSidebar = () => {
//     setIsOpen(false);
//     setExpandedMenu(null);
//   };

//   return (
//     <div className="h-screen bg-gray-50">
//       {/* Overlay for mobile */}
//       {isMobile && isOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-20 md:hidden"
//           onClick={handleCloseSidebar}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 h-full bg-green-700 text-white z-30 transform transition-all duration-300 ease-in-out
//         ${isMobile ? (isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64") : isOpen ? "w-72" : "w-16"}
//         `}
//       >
//         {/* Logo / Toggle */}
//         <div className="flex items-center justify-between px-3 pt-5 pb-4">
//           <div className="flex items-center gap-2">
//             <img
//               src={Logo}
//               alt="Logo"
//               className={`transition-all duration-300 ${isOpen ? "w-32 h-16" : "w-10 h-10 mx-auto"}`}
//             />
//           </div>

//           {/* Desktop toggle */}
//           <button
//             aria-label="Toggle sidebar"
//             onClick={() => (isOpen ? handleCloseSidebar() : setIsOpen(true))}
//             className="hidden md:block text-xl p-2 rounded-md hover:bg-green-600/60"
//           >
//             <PanelRightClose
//               className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
//             />
//           </button>

//           {/* Mobile close */}
//           {isMobile && (
//             <button
//               aria-label="Close sidebar"
//               onClick={handleCloseSidebar}
//               className="md:hidden text-xl p-2 rounded-md hover:bg-green-600/60"
//             >
//               <X />
//             </button>
//           )}
//         </div>

//         {/* Menu */}
//         <ul className="flex flex-col items-stretch gap-1 px-2">
//           {menus.map((menu) => {
//             const expanded = expandedMenu === menu.name;
//             return (
//               <li key={menu.name}>
//                 <button
//                   onClick={() => handleMenuClick(menu)}
//                   className={` group w-full rounded-lg text-white/90 hover:text-white transition-colors flex items-center
//                     ${expanded ? "bg-green-600" : "hover:bg-green-600/70"}
//                     ${isOpen ? "justify-between px-3 py-2" : "justify-center pl-7 p-4"}
//                   `}
//                 >
//                   <div className="flex items-center gap-3">
//                     <span className="w-6 h-6 flex items-center justify-center text-xl">{menu.icon}</span>
//                     <span
//                       className={`text-sm transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 w-0 pointer-events-none"
//                         }`}
//                     >
//                       {menu.name}
//                     </span>
//                   </div>
//                   {menu.children && isOpen && (expanded ? <FiChevronDown /> : <FiChevronRight />)}
//                 </button>

//                 {menu.children && expanded && isOpen && (
//                   <ul className="ml-10 mt-1 flex flex-col gap-1 text-sm">
//                     {menu.children.map((child) => (
//                       <li key={child}>
//                         <button
//                           onClick={() => handleChildClick(child)}
//                           className={`block w-full text-left px-2 py-1 rounded-md hover:bg-green-600/50 ${activeMenu === child ? "bg-green-600" : ""
//                             }`}
//                         >
//                           {child}
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </li>
//             );
//           })}
//         </ul>
//       </aside>

//       {/* Main area */}
//       <div
//         className={`transition-all duration-300 h-full flex flex-col
//         ${isMobile ? "ml-0" : isOpen ? "ml-72" : "ml-16"}`}
//       >
//         {/* Header */}
//         <header className="sticky top-0 z-10 bg-white shadow px-4 md:px-6 py-3 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             {isMobile && (
//               <button
//                 onClick={() => setIsOpen(true)}
//                 className="md:hidden p-2 rounded-md hover:bg-gray-200"
//               >
//                 <HiMenu className="text-2xl text-gray-700" />
//               </button>
//             )}

//             <div className="flex items-center bg-gray-100 rounded-md px-3 py-1 w-2/3 md:w-1/3">
//               <FaSearch className="text-gray-500" />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="bg-gray-100 outline-none px-2 w-full"
//               />
//             </div>
//           </div>

//           <div className="flex items-center gap-4 md:gap-6">
//             <FaBell className="text-gray-600 text-xl cursor-pointer" />
//             <div className="flex items-center gap-2 cursor-pointer">
//               <CircleUserRound className="w-8 h-8 text-gray-600" />
//               <span className="hidden md:block font-medium text-gray-700">Admin</span>
//             </div>
//           </div>
//         </header>

//         <main className="p-4 md:p-6">
//           <h2 className="text-2xl font-semibold">{activeMenu}</h2>
//           <p className="mt-2 text-gray-600">Welcome to the Himveda Admin Panel.</p>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default SidebarLayout;