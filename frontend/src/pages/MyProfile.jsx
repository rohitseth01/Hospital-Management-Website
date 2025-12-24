import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token }, withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Base input styling for editing fields
  const inputStyle = "w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors text-gray-800";
  const selectStyle = "p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors text-gray-800 bg-white";


  return (
    userData && (
      <div className="p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100 max-w-4xl mx-auto my-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">User Profile</h1>

        {/* Profile Image Section */}
        <div className="flex items-center gap-6 mb-8">
          {isEdit ? (
            <label htmlFor="image" className="relative cursor-pointer group">
              {/* Profile Image */}
              <img
                className="w-28 h-28 object-cover rounded-full border-4 border-gray-200 group-hover:opacity-75 transition-opacity"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt="Profile"
              />
              {/* Upload Icon Overlay */}
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity">
                <img className="w-8" src={assets.upload_icon} alt="Upload" />
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>
          ) : (
            <img className="w-28 h-28 object-cover rounded-full border-4 border-gray-200" src={userData.image} alt="Profile" />
          )}
          
          {/* User Name (Edit or View) */}
          {isEdit ? (
            <input
              className="text-3xl font-bold max-w-xs border-b border-gray-300 focus:border-blue-500 outline-none transition-colors"
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <p className="font-bold text-3xl text-gray-900">
              {userData.name}
            </p>
          )}
        </div>

        <hr className="border-gray-200 mb-6" />

        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          
          {/* Contact Information Section */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-600 mb-4 border-b border-gray-100 pb-2">CONTACT INFORMATION</h2>
            <div className="grid grid-cols-2 md:grid-cols-[1fr_2fr] gap-y-4 text-sm text-gray-700">
              
              <p className="font-medium">Email:</p>
              <p className="text-blue-600 font-medium">{userData.email}</p> 
              
              <p className="font-medium">Phone:</p>
              {isEdit ? (
                <input
                  type="text"
                  className={inputStyle}
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              ) : (
                <p className="text-gray-700">{userData.phone || 'N/A'}</p>
              )}
              
              <p className="font-medium">Address:</p>

              {isEdit ? (
                <div>
                  <input
                    className={`${inputStyle} mb-2`}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={userData.address?.line1 || ''}
                    type="text"
                    placeholder="Address Line 1"
                  />
                  <input
                    className={inputStyle}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={userData.address?.line2 || ''}
                    type="text"
                    placeholder="Address Line 2 (City, State, Zip)"
                  />
                </div>
              ) : (
                <p className="text-gray-700 leading-relaxed">
                  {userData.address?.line1 || 'N/A'}
                  <br />
                  {userData.address?.line2 || ''}
                </p>
              )}
            </div>
          </div>
          
          {/* Basic Information Section */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-600 mb-4 border-b border-gray-100 pb-2">BASIC INFORMATION</h2>
            <div className="grid grid-cols-2 md:grid-cols-[1fr_2fr] gap-y-4 text-sm text-gray-700">
              
              <p className="font-medium">Gender:</p>

              {isEdit ? (
                <select
                  className={selectStyle}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  value={userData.gender}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className="text-gray-700">{userData.gender || 'N/A'}</p>
              )}
              
              <p className="font-medium">Birthday:</p>
              {isEdit ? (
                <input
                  className={inputStyle}
                  type="date"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, dob: e.target.value }))
                  }
                  value={userData.dob || ''}
                />
              ) : (
                <p className="text-gray-700">{userData.dob || 'N/A'}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-8 pt-4 border-t border-gray-100">
          {isEdit ? (
            <button
              className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md mr-4"
              onClick={updateUserProfileData}
            >
              Save Changes
            </button>
          ) : (
            <button
              className="border border-blue-600 text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-all"
              onClick={() => setIsEdit(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default MyProfile;

// import React, { useContext, useState } from "react";
// import { AppContext } from "../context/AppContext";
// import { assets } from "../assets/assets";
// import axios from "axios";
// import { toast } from "react-toastify";

// const MyProfile = () => {
//   const { userData, setUserData, token, backendUrl, loadUserProfileData } =
//     useContext(AppContext);

//   const [isEdit, setIsEdit] = useState(false);
//   const [image, setImage] = useState(false);

//   const updateUserProfileData = async () => {
//     try {
//       const formData = new FormData();

//       formData.append("name", userData.name);
//       formData.append("phone", userData.phone);
//       formData.append("address", JSON.stringify(userData.address));
//       formData.append("gender", userData.gender);
//       formData.append("dob", userData.dob);

//       image && formData.append("image", image);

//       const { data } = await axios.post(
//         backendUrl + "/api/user/update-profile",
//         formData,
//         { headers: { token }, withCredentials: true }
//       );

//       if (data.success) {
//         toast.success(data.message);
//         await loadUserProfileData();
//         setIsEdit(false);
//         setImage(false);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   return (
//     userData && (
//       <div className="max-w-lg flex flex-col gap-2 text-sm">
//         {isEdit ? (
//           <label htmlFor="image">
//             <div className="inline-block relative cursor-pointer">
//               <img
//                 className="w-36 rounded opacity:75"
//                 src={image ? URL.createObjectURL(image) : userData.image}
//                 alt=""
//               />
//               <img
//                 className="w-10 absolute bottom-12 right-12"
//                 src={image ? "" : assets.upload_icon}
//                 alt=""
//               />
//             </div>
//             <input
//               onChange={(e) => setImage(e.target.files[0])}
//               type="file"
//               id="image"
//               hidden
//             />
//           </label>
//         ) : (
//           <img className="w-36 rounded" src={userData.image} alt="" />
//         )}

//         {isEdit ? (
//           <input
//             className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
//             type="text"
//             value={userData.name}
//             onChange={(e) =>
//               setUserData((prev) => ({ ...prev, name: e.target.value }))
//             }
//           />
//         ) : (
//           <p className="font-medium text-3xl text-neutral-800 mt-4">
//             {userData.name}
//           </p>
//         )}

//         <hr className="bg-zinc-400 h-[1px] border-none" />

//         <div>
//           <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
//           <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
//             <p className="font-medium">Email id:</p>
//             <p className="text-blue-500">{userData.email}</p>
//             <p className="font-medium">Phone:</p>
//             {isEdit ? (
//               <input
//                 type="text"
//                 className="bg-gray-100 max-w-52"
//                 value={userData.phone}
//                 onChange={(e) =>
//                   setUserData((prev) => ({ ...prev, phone: e.target.value }))
//                 }
//               />
//             ) : (
//               <p className="text-blue-400">{userData.phone}</p>
//             )}
//             <p className="font-medium">Address:</p>

//             {isEdit ? (
//               <p>
//                 <input
//                   className="bg-gray-50"
//                   onChange={(e) =>
//                     setUserData((prev) => ({
//                       ...prev,
//                       address: { ...prev.address, line1: e.target.value },
//                     }))
//                   }
//                   value={userData.address.line1}
//                   type="text"
//                 />
//                 <br />
//                 <input
//                   className="bg-gray-50"
//                   onChange={(e) =>
//                     setUserData((prev) => ({
//                       ...prev,
//                       address: { ...prev.address, line2: e.target.value },
//                     }))
//                   }
//                   value={userData.address.line2}
//                   type="text"
//                 />
//               </p>
//             ) : (
//               <p className="text-gray-500">
//                 {userData.address.line1}
//                 <br />
//                 {userData.address.line2}
//               </p>
//             )}
//           </div>
//         </div>
//         <div>
//           <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
//           <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
//             <p className="font-medium">Gender:</p>

//             {isEdit ? (
//               <select
//                 className="max-w-20 bg-gray-100"
//                 onChange={(e) =>
//                   setUserData((prev) => ({ ...prev, gender: e.target.value }))
//                 }
//                 value={userData.gender}
//               >
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>
//             ) : (
//               <p className="text-gray-400">{userData.gender}</p>
//             )}
//             <p className="font-medium">Birthday:</p>
//             {isEdit ? (
//               <input
//                 className="max-w-28 bg-gray-100"
//                 type="date"
//                 onChange={(e) =>
//                   setUserData((prev) => ({ ...prev, dob: e.target.value }))
//                 }
//                 value={userData.dob}
//               />
//             ) : (
//               <p className="text-gray-400">{userData.dob}</p>
//             )}
//           </div>
//         </div>
//         <div className="mt-10">
//           {isEdit ? (
//             <button
//               className="border border-blue-400 px-8 py-2 rounded-full hover:bg-blue-400 hover:text-white transition-all"
//               onClick={updateUserProfileData}
//             >
//               Save information
//             </button>
//           ) : (
//             <button
//               className="border border-blue-400 px-8 py-2 rounded-full  hover:bg-blue-400 hover:text-white transition-all"
//               onClick={() => setIsEdit(true)}
//             >
//               Edit
//             </button>
//           )}
//         </div>
//       </div>
//     )
//   );
// };

// export default MyProfile;
