import React, { useEffect, useState } from "react";
import {
  FaHome,
  FaBoxOpen,
  FaUser,
  FaShoppingCart,
  FaCog,
  FaBell,
  FaSearch,
  FaLayerGroup,
  FaTags,
} from "react-icons/fa";
import { CircleUserRound, PanelRightClose, X } from "lucide-react";
import { HiMenu } from "react-icons/hi";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { BsGrid3X3Gap } from "react-icons/bs";
import { MdOutlineDarkMode } from "react-icons/md";
import { AiOutlineFullscreen } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";

// logo
import Logo from "/images/logo.png";

const SidebarLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

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

  // Sidebar menus
  const menus = [
    { name: "Dashboard", icon: <FaHome /> },
    {
      name: "Ecommerce",
      icon: <FaShoppingCart />,
      children: [
        "Add Product",
        "Product List",
        "Product Detail 1",
        "Product Detail 2",
        "Product Detail 3",
      ],
    },
    { name: "Category", icon: <FaLayerGroup />, children: ["Add Category", "Category List"] },
    { name: "Attributes", icon: <FaTags />, children: ["Add Attribute", "Attribute List"] },
    { name: "Orders", icon: <FaBoxOpen />, children: ["Order List", "Order Detail"] },
    { name: "Users", icon: <FaUser />, children: ["User List", "User Roles", "User Permissions"] },
    { name: "Settings", icon: <FaCog />, children: ["General Settings", "Profile Settings", "Security"] },
  ];

  // Toggle parent menu
  const handleMenuClick = (menu) => {
    if (!menu.children) {
      setActiveMenu(menu.name);
      setExpandedMenu(null);
      if (isMobile) setIsOpen(false);
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
    setActiveMenu(child);
    setExpandedMenu(null);
    setIsOpen(false);
  };

  const handleCloseSidebar = () => {
    setIsOpen(false);
    setExpandedMenu(null);
  };

  return (
    <div className="h-screen bg-gray-50">
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={handleCloseSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-green-700 text-white z-30 transform transition-all duration-300 ease-in-out
        ${isMobile ? (isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64") : isOpen ? "w-72" : "w-16"}
        `}
      >
        {/* Logo / Toggle */}
        <div className="flex items-center justify-between px-3 pt-5 pb-4">
          <div className="flex items-center gap-2">
            <img
              src={Logo}
              alt="Logo"
              className={`transition-all duration-300 ${isOpen ? "w-32 h-16" : "w-10 h-10 mx-auto"}`}
            />
          </div>

          {/* Desktop toggle */}
          <button
            aria-label="Toggle sidebar"
            onClick={() => (isOpen ? handleCloseSidebar() : setIsOpen(true))}
            className="hidden md:block text-xl p-2 rounded-md hover:bg-green-600/60"
          >
            <PanelRightClose
              className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
            />
          </button>

          {/* Mobile close */}
          {isMobile && (
            <button
              aria-label="Close sidebar"
              onClick={handleCloseSidebar}
              className="md:hidden text-xl p-2 rounded-md hover:bg-green-600/60"
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
                  className={` group w-full rounded-lg text-white/90 hover:text-white transition-colors flex items-center
                    ${expanded ? "bg-green-600" : "hover:bg-green-600/70"}
                    ${isOpen ? "justify-between px-3 py-2" : "justify-center pl-7 p-4"}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 flex items-center justify-center text-xl">{menu.icon}</span>
                    <span
                      className={`text-sm transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 w-0 pointer-events-none"
                        }`}
                    >
                      {menu.name}
                    </span>
                  </div>
                  {menu.children && isOpen && (expanded ? <FiChevronDown /> : <FiChevronRight />)}
                </button>

                {menu.children && expanded && isOpen && (
                  <ul className="ml-10 mt-1 flex flex-col gap-1 text-sm">
                    {menu.children.map((child) => (
                      <li key={child}>
                        <button
                          onClick={() => handleChildClick(child)}
                          className={`block w-full text-left px-2 py-1 rounded-md hover:bg-green-600/50 ${activeMenu === child ? "bg-green-600" : ""
                            }`}
                        >
                          {child}
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
                <HiMenu className="text-2xl text-gray-700" />
              </button>
            )}

            {/* Desktop Search */}
            {!isMobile && (
              <div className="flex items-center bg-gray-100 rounded-md px-3 py-1 w-full sm:w-64 md:w-72 lg:w-96">
                <FaSearch className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search here..."
                  className="bg-gray-100 outline-none px-2 w-full"
                />
              </div>
            )}
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4 md:gap-6 flex-shrink-0">
            {/* Mobile search icon */}
            {isMobile && (
              <FaSearch
                className="text-gray-600 text-xl cursor-pointer"
                onClick={() => setShowMobileSearch(true)}
              />
            )}

            <MdOutlineDarkMode className="text-gray-600 text-xl cursor-pointer" />
            <FaBell className="text-gray-600 text-xl cursor-pointer" />
            <BiMessageDetail className="text-gray-600 text-xl cursor-pointer" />
            <AiOutlineFullscreen className="text-gray-600 text-xl cursor-pointer" />
            <BsGrid3X3Gap className="text-gray-600 text-xl cursor-pointer" />
            <div className="flex items-center gap-2 cursor-pointer">
              <CircleUserRound className="w-8 h-8 text-gray-600" />
              <div className="hidden md:flex flex-col leading-tight">
                <span className="font-medium text-gray-700">Kristin Watson</span>
                <span className="text-sm text-gray-500">Admin</span>
              </div>
            </div>
            <FaCog className="text-gray-600 text-xl cursor-pointer" />
          </div>
        </header>

        {/* Mobile search overlay */}
        {isMobile && showMobileSearch && (
          <div className="fixed inset-0 bg-white z-40 flex items-start p-4 shadow-md">
            <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 w-full">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search here..."
                autoFocus
                className="bg-gray-100 outline-none px-2 w-full"
              />
              <button
                onClick={() => setShowMobileSearch(false)}
                className="ml-2 text-gray-600"
              >
                <X />
              </button>
            </div>
          </div>
        )}

        <main className="p-4 md:p-6">
          <h2 className="text-2xl font-semibold">{activeMenu}</h2>
          <p className="mt-2 text-gray-600">Welcome to the Himveda Admin Panel.</p>
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;






















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