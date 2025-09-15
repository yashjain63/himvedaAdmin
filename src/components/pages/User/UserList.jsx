import { useState } from "react";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserList() {
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(5);
  const [users, setUsers] = useState([
    {
      id: "#7712301",
      name: "Shubham Sharma",
      phone: "XXXXXXXXXX",
      email: "sharmashubham@gmail.com",
      location: "Delhi",
      image: "/images/member.jpg",
    },
    {
      id: "#7712302",
      name: "Arun Kumar",
      phone: "XXXXXXXXXX",
      email: "arun10@gmail.com",
      location: "Uttar Pradesh",
      image: "/images/member3.jpg",
    },
    {
      id: "#7712303",
      name: "Shobita Rana",
      phone: "XXXXXXXXXX",
      email: "shobitarana@gmail.com",
      location: "Uttarakhand",
      image: "/images/member2.jpg",
    },
    {
      id: "#7712304",
      name: "Vishwas Pandey",
      phone: "XXXXXXXXXX",
      email: "vishwaspandey@gmail.com",
      location: "Uttarakhand",
      image: "/images/member3.jpg",
    },
    {
      id: "#7712305",
      name: "Ravi Singh",
      phone: "XXXXXXXXXX",
      email: "ravi55@gmail.com",
      location: "Naintal",
      image: "/images/member2.jpg",
    },
    {
      id: "#7712306",
      name: "Ankit Tiwari",
      phone: "XXXXXXXXXX",
      email: "ankittiwari@gmail.com",
      location: "Bihar",
      image: "/images/member.jpg",
    },
    {
      id: "#7712307",
      name: "B.K Pandey",
      phone: "XXXXXXXXXX",
      email: "bkpandey01@gmail.com",
      location: "Allahabad",
      image: "/images/member3.jpg",
    },
    {
      id: "#7712308",
      name: "Rohanpreet Singh",
      phone: "XXXXXXXXXX",
      email: "rohanpreet@gmail.com",
      location: "Punjab",
      image: "/images/member2.jpg",
    },
  ]);

  // Filter users by search
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  // Limit users shown by "entries" dropdown
  // const displayedUsers =
  //   entries === "all" ? filteredUsers : filteredUsers.slice(0, entries);
  const displayedUsers = filteredUsers;

  // Handlers
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="p-5 sm:p-6 bg-gray-50 min-h-screen">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-semibold">User List</h1>

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mt-2 sm:mt-0">
          <span>Users</span> &gt;{" "}
          <span className="text-gray-800 font-medium">User List</span>
        </div>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">User ID</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((u, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 align-middle transition"
              >
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={u.image}
                    alt={u.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <span className="truncate max-w-[200px] font-medium">
                    {u.name}
                  </span>
                </td>
                <td className="px-4 py-3">{u.id}</td>
                <td className="px-4 py-3">{u.phone}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3">{u.location}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-3 h-full">
                    {/* <Link
                      to="/users/detail"
                      className="text-blue-600 hover:text-blue-800 cursor-pointer">
                      <Eye className="w-5 h-5" />
                    </Link>
                    <Link
                      to="/users/edit"
                      className="text-green-600 hover:text-green-800 cursor-pointer">
                      <Pencil className="w-5 h-5" />
                    </Link> */}
                    <button
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                      onClick={() => handleDelete(u.id)}>
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {displayedUsers.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-gray-500 py-6 italic"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
