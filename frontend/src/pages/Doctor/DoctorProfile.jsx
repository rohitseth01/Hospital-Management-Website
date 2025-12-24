import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  // Base input styling
  const inputStyle = "p-1 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors text-sm text-gray-800 bg-gray-50";


  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: Number(profileData.fees), // Ensure fees is sent as a number
        available: profileData.available,
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    profileData && (
      <div className="p-4 md:p-8 w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Profile</h1>

        <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
          
          {/* Doctor Image (Left Column) */}
          <div className="flex-shrink-0 w-full md:w-64">
            <img
              className="w-full h-auto object-cover rounded-xl shadow-md bg-blue-50"
              src={profileData.image}
              alt={profileData.name}
            />
          </div>

          {/* Doctor Details (Right Column) */}
          <div className="flex-1 flex flex-col gap-4">
            
            {/* Name and Title */}
            <h2 className="text-3xl font-bold text-gray-900">
              {profileData.name}
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
              <p className="text-blue-600 font-semibold text-lg">
                {profileData.degree} - {profileData.speciality}
              </p>
              <span className="py-0.5 px-3 border border-gray-300 text-xs rounded-full font-medium bg-gray-50">
                {profileData.experience} Years Experience
              </span>
            </div>

            {/* Doctor About */}
            <div>
              <p className="font-semibold text-gray-800 mt-2">About:</p>
              <p className="text-sm text-gray-600 max-w-3xl mt-1">
                {profileData.about}
              </p>
            </div>

            <hr className="border-gray-100 my-2" />
            
            {/* Editable Information Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              {/* Appointment Fees */}
              <div className="flex items-center gap-1">
                <p className="font-medium text-gray-700">Appointment Fee:</p>
                <span className="text-gray-900 font-bold">
                  {currency}{" "}
                  {isEdit ? (
                    <input
                      type="number"
                      className={`${inputStyle} w-20`}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          fees: e.target.value,
                        }))
                      }
                      value={profileData.fees}
                      min="0"
                    />
                  ) : (
                    profileData.fees
                  )}
                </span>
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <p className="font-medium text-gray-700 mb-1">Clinic Address:</p>
                <p className="text-sm">
                  {isEdit ? (
                    <>
                      <input
                        type="text"
                        className={`${inputStyle} w-full mb-1`}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            address: { ...prev.address, line1: e.target.value },
                          }))
                        }
                        value={profileData.address?.line1 || ''}
                        placeholder="Address Line 1"
                      />
                      <input
                        type="text"
                        className={`${inputStyle} w-full`}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            address: { ...prev.address, line2: e.target.value },
                          }))
                        }
                        value={profileData.address?.line2 || ''}
                        placeholder="Address Line 2 (City, State, Zip)"
                      />
                    </>
                  ) : (
                    <p className="leading-relaxed text-gray-700">
                      {profileData.address?.line1 || 'N/A'}
                      <br />
                      {profileData.address?.line2 || ''}
                    </p>
                  )}
                </p>
              </div>

              {/* Availability Toggle */}
              <div className="flex items-center gap-3 mt-2 sm:col-span-2">
                <p className="font-medium text-gray-700">Availability Status:</p>
                <label className={`relative inline-flex items-center cursor-pointer ${!isEdit && 'opacity-70'}`}>
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={profileData.available}
                    disabled={!isEdit}
                    onChange={() =>
                      isEdit &&
                      setProfileData((prev) => ({
                        ...prev,
                        available: !prev.available,
                      }))
                    }
                  />
                  {/* Toggle Track */}
                  <div 
                    className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                  />
                  <span className={`ml-3 text-sm font-medium ${profileData.available ? 'text-green-600' : 'text-red-600'}`}>
                    {profileData.available ? 'Available' : 'Unavailable'}
                  </span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8">
              {isEdit ? (
                <button
                  onClick={updateProfile}
                  className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="border border-blue-600 text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-all"
                >
                  Edit Profile Info
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;

// import React, { useContext, useEffect, useState } from "react";
// import { DoctorContext } from "../../context/DoctorContext";
// import { AppContext } from "../../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// const DoctorProfile = () => {
//   const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
//     useContext(DoctorContext);
//   const { currency } = useContext(AppContext);

//   const [isEdit, setIsEdit] = useState(false);

//   const updateProfile = async () => {
//     try {
//       const updateData = {
//         address: profileData.address,
//         fees: profileData.fees,
//         available: profileData.available,
//       };

//       const { data } = await axios.post(
//         backendUrl + "/api/doctor/update-profile",
//         updateData,
//         { headers: { dToken } }
//       );
//       if (data.success) {
//         toast.success(data.message);
//         setIsEdit(false);
//         getProfileData();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (dToken) {
//       getProfileData();
//     }
//   }, [dToken]);

//   return (
//     profileData && (
//       <div>
//         <div className="flex flex-col gap-4 m-5">
//           <div>
//             <img
//               className="bg-blue-400/80 w-full sm:max-w-64 rounded-lg"
//               src={profileData.image}
//               alt=""
//             />
//           </div>

//           <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
//             {/*----- Doc Info :name,degree,experienc--- */}

//             <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
//               {profileData.name}
//             </p>
//             <div className="flex items-center gap-2 mt-1 text-gray-600">
//               <p>
//                 {profileData.degree} - {profileData.speciality}
//               </p>
//               <button className="py-0.5 px-2 border text-xs rounded-full">
//                 {profileData.experience}
//               </button>
//             </div>

//             {/* ----Doc About---- */}
//             <div>
//               <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
//                 About:
//               </p>
//               <p className="text-sm text-gray-600 max-w-[700px] mt-1">
//                 {profileData.about}
//               </p>
//             </div>

//             <p className="text-gray-600 font-medium mt-4">
//               Appointment fee:{" "}
//               <span className="text-gray-800">
//                 {currency}{" "}
//                 {isEdit ? (
//                   <input
//                     type="number"
//                     onChange={(e) =>
//                       setProfileData((prev) => ({
//                         ...prev,
//                         fees: e.target.value,
//                       }))
//                     }
//                     value={profileData.fees}
//                   />
//                 ) : (
//                   profileData.fees
//                 )}
//               </span>
//             </p>

//             <div className="flex gap-2 py-2">
//               <p>Address:</p>
//               <p className="text-sm">
//                 {isEdit ? (
//                   <input
//                     type="text"
//                     onChange={(e) =>
//                       setProfileData((prev) => ({
//                         ...prev,
//                         address: { ...prev.address, line1: e.target.value },
//                       }))
//                     }
//                     value={profileData.address.line1}
//                   />
//                 ) : (
//                   profileData.address.line1
//                 )}
//                 <br />
//                 {isEdit ? (
//                   <input
//                     type="text"
//                     onChange={(e) =>
//                       setProfileData((prev) => ({
//                         ...prev,
//                         address: { ...prev.address, line2: e.target.value },
//                       }))
//                     }
//                     value={profileData.address.line2}
//                   />
//                 ) : (
//                   profileData.address.line2
//                 )}
//               </p>
//             </div>

//             <div className="flex gap-1 pt-2">
//               <input
//                 onChange={() =>
//                   isEdit &&
//                   setProfileData((prev) => ({
//                     ...prev,
//                     available: !prev.available,
//                   }))
//                 }
//                 checked={profileData.available}
//                 type="checkbox"
//                 name=""
//                 id=""
//               />
//               <label htmlFor=""> Available</label>
//             </div>

//             {isEdit ? (
//               <button
//                 onClick={updateProfile}
//                 className="px-4 py-1 border border-blue-400 text-sm rounded-full mt-5 hover:bg-blue-400 hover:text-white transition-all"
//               >
//                 Save
//               </button>
//             ) : (
//               <button
//                 onClick={() => setIsEdit(true)}
//                 className="px-4 py-1 border border-blue-400 text-sm rounded-full mt-5 hover:bg-blue-400 hover:text-white transition-all"
//               >
//                 Edit
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default DoctorProfile;
