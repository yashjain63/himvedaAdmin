import { useState } from "react";
import { Upload } from "lucide-react";

export default function ProfileSetting() {
  const [profile, setProfile] = useState({
    firstName: "Admin",
    lastName: "Profile",
    email: "admin@gmail.com",
    phone: "+91 9876543210",
    address: "Himachal Pradesh, India",
    birthday: "1998-05-20",
    image: "/images/member.jpg",
  });

  const [isEditing, setIsEditing] = useState(false); // start in view mode

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false); // back to view mode
  };

  const handleEdit = () => {
    setIsEditing(true); // enable edit mode
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h1 className="text-3xl font-semibold">Profile Settings</h1>

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mt-2 sm:mt-0">
          <span>Settings</span> &gt;{" "}
          <span className="text-gray-800 font-medium">Profile Settings</span>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-white shadow rounded-md px-5 py-8 flex flex-col md:flex-row gap-8">
        {/* Left - Profile Image */}
        <div className="flex flex-col items-center md:w-1/3">
          <img
            src={profile.image}
            alt="Admin"
            className="w-32 h-32 rounded-full object-cover mb-3"
          />
          {isEditing && (
            <label className="cursor-pointer flex items-center gap-2 border px-3 py-1 rounded-md text-sm bg-gray-50 hover:bg-gray-100">
              <Upload className="w-4 h-4" />
              Upload
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>

        {/* Right - Profile Form */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="text-[16px] font-bold">First Name</label>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                className="w-full mt-1 border rounded-md px-3 outline-none text-sm py-2"
              />
            ) : (
              <p className="mt-1">{profile.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="text-[16px] font-bold">Last Name</label>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                className="w-full mt-1 border rounded-md outline-none text-sm px-3 py-2"
              />
            ) : (
              <p className="mt-1">{profile.lastName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-[16px] font-bold">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full mt-1 border outline-none rounded-md text-sm px-3 py-2"
              />
            ) : (
              <p className="mt-1">{profile.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="text-[16px] font-bold">Phone</label>
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange} 
                className="w-full mt-1 border outline-none rounded-md text-sm px-3 py-2"
              />
            ) : (
              <p className="mt-1">{profile.phone}</p>
            )}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="text-[16px] font-bold">Address</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
                className="w-full mt-1 border rounded-md outline-none text-sm px-3 py-2"
              />
            ) : (
              <p className="mt-1">{profile.address}</p>
            )}
          </div>

          {/* Birthday */}
          <div>
            <label className="text-[16px] font-bold">Birthday</label>
            {isEditing ? (
              <input
                type="date"
                name="birthday"
                value={profile.birthday}
                onChange={handleChange}
                className="w-full mt-1 border rounded-md outline-none text-sm px-3 py-2"
              />
            ) : (
              <p className="mt-1">{profile.birthday}</p>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="px-5 py-2 hover:bg-red-900 hover:text-white rounded-md bg-white text-red-900 border border-red-900 cursor-pointer">
            Save Changes
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="px-5 py-2 hover:bg-red-900 hover:text-white rounded-md bg-white text-red-900 border border-red-900 cursor-pointer">
            Edit Profile
          </button>
        )}
      </div>

      {/* Password & Account Section */}
      {/* <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6"> */}
        {/* Password Section */}
        {/* <div className="bg-gray-100 p-5 rounded-md flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Password</h2>
            <p className="text-sm text-gray-600">
              You can reset or change your password by clicking here
            </p>
          </div>
          <button className="border px-4 py-2 rounded-md hover:bg-gray-200">
            Change
          </button>
        </div> */}

        {/* Remove Account Section */}
        {/* <div className="bg-gray-100 p-5 rounded-md flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Remove account</h2>
            <p className="text-sm text-gray-600">
              Once you delete your account, there is no going back.
            </p>
          </div>
          <button className="border px-4 py-2 rounded-md text-red-600 hover:bg-red-100">
            Deactivate
          </button>
        </div> */}
      {/* </div> */}
    </div>
  );
}









// import { useState } from "react";
// import { Upload, Pencil } from "lucide-react";

// export default function AdminProfilePage() {
//   const [profile, setProfile] = useState({
//     firstName: "John",
//     lastName: "Doe",
//     email: "admin@example.com",
//     phone: "+1234567890",
//     address: "New Delhi, India",
//     birthday: "1990-01-01",
//     image: "/images/admin.jpg",
//   });

//   const [formData, setFormData] = useState(profile);
//   const [isEditing, setIsEditing] = useState(true);

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle profile image upload
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setFormData((prev) => ({ ...prev, image: url }));
//     }
//   };

//   // Save changes
//   const handleSave = (e) => {
//     e.preventDefault();
//     setProfile(formData);
//     setIsEditing(false);
//   };

//   return (
//     <div className="p-4 sm:p-8 min-h-screen bg-gray-50 flex justify-center">
//       <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-2xl font-semibold mb-6">Profile Settings</h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Profile Image Section (left) */}
//           <div className="flex flex-col items-center md:items-start">
//             <img
//               src={formData.image}
//               alt="Profile"
//               className="w-32 h-32 rounded-full object-cover mb-3"
//             />
//             {isEditing && (
//               <label className="flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer text-teal-600 hover:bg-teal-50">
//                 <Upload className="w-5 h-5" />
//                 Upload
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   className="hidden"
//                 />
//               </label>
//             )}
//           </div>

//           {/* Form Fields (right) */}
//           <div className="md:col-span-2">
//             {isEditing ? (
//               <form
//                 onSubmit={handleSave}
//                 className="grid grid-cols-1 sm:grid-cols-2 gap-6"
//               >
//                 {/* First Name */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-600">
//                     First name
//                   </label>
//                   <input
//                     type="text"
//                     name="firstName"
//                     value={formData.firstName}
//                     onChange={handleChange}
//                     required
//                     className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
//                   />
//                 </div>

//                 {/* Last Name */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-600">
//                     Last name
//                   </label>
//                   <input
//                     type="text"
//                     name="lastName"
//                     value={formData.lastName}
//                     onChange={handleChange}
//                     required
//                     className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
//                   />
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-600">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
//                   />
//                 </div>

//                 {/* Phone */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-600">
//                     Phone
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     required
//                     className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
//                   />
//                 </div>

//                 {/* Address */}
//                 <div className="sm:col-span-2">
//                   <label className="block text-sm font-medium text-gray-600">
//                     Address
//                   </label>
//                   <input
//                     type="text"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     required
//                     className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
//                   />
//                 </div>

//                 {/* Birthday */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-600">
//                     Birthday
//                   </label>
//                   <input
//                     type="date"
//                     name="birthday"
//                     value={formData.birthday}
//                     onChange={handleChange}
//                     required
//                     className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-teal-400 outline-none"
//                   />
//                 </div>

//                 {/* Save Button */}
//                 <div className="sm:col-span-2">
//                   <button
//                     type="submit"
//                     className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
//                   >
//                     Save changes
//                   </button>
//                 </div>
//               </form>
//             ) : (
//               // View-Only Mode
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <p>
//                   <span className="font-semibold">First Name:</span>{" "}
//                   {profile.firstName}
//                 </p>
//                 <p>
//                   <span className="font-semibold">Last Name:</span>{" "}
//                   {profile.lastName}
//                 </p>
//                 <p>
//                   <span className="font-semibold">Email:</span> {profile.email}
//                 </p>
//                 <p>
//                   <span className="font-semibold">Phone:</span> {profile.phone}
//                 </p>
//                 <p className="sm:col-span-2">
//                   <span className="font-semibold">Address:</span>{" "}
//                   {profile.address}
//                 </p>
//                 <p>
//                   <span className="font-semibold">Birthday:</span>{" "}
//                   {profile.birthday}
//                 </p>

//                 <div className="sm:col-span-2">
//                   <button
//                     onClick={() => setIsEditing(true)}
//                     className="flex items-center gap-2 px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
//                   >
//                     <Pencil className="w-4 h-4" />
//                     Edit Profile
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
