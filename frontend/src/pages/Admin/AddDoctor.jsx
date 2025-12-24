import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "./../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  // Base input styling
  const inputStyle = "w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors text-gray-800 text-sm";
  const labelStyle = "text-sm font-medium text-gray-700 mb-1";
  const selectStyle = "w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors text-gray-800 text-sm bg-white";

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Image Not Selected");
      }

      const formData = new FormData();

      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      console.log("Submitting Doctor Data...");
      
      const {data}=await axios.post(backendUrl + '/api/admin/add-doctor',formData,{headers:{aToken}})
      
      if (data.success) {
        toast.success(data.message);
        // Reset state after successful submission
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add doctor. Check server.");
      console.log(error);
    }
  };

  return (
    <div className="p-4 md:p-8 w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Add New Doctor</h1>

      <form onSubmit={onSubmitHandler} className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 w-full max-w-5xl mx-auto">
        
        {/* Doctor Image Upload */}
        <div className="flex items-center gap-6 mb-8 pb-6 border-b border-gray-100">
          <label htmlFor="doc-img" className="cursor-pointer group relative">
            <img
              className={`w-28 h-28 object-cover rounded-full border-4 ${docImg ? 'border-blue-500' : 'border-gray-300'} transition-all group-hover:opacity-80`}
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Doctor Image Upload"
            />
            {
              !docImg && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <img className="w-8" src={assets.upload_icon} alt="Upload" />
                </div>
              )
            }
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
            accept="image/*"
            required
          />
          <p className="text-gray-500">
            Upload Doctor <br />
            Profile Picture
          </p>
        </div>

        {/* Two Column Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6">
          
          {/* --- Left Column: Credentials & Professional --- */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Login & Identity</h3>
            
            {/* Doctor Name */}
            <div className="flex flex-col gap-1">
              <label className={labelStyle}>Doctor Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={inputStyle}
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
            
            {/* Doctor Email */}
            <div className="flex flex-col gap-1">
              <label className={labelStyle}>Doctor Email (Login ID)</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={inputStyle}
                type="email"
                placeholder="Email"
                required
              />
              
            </div>

            {/* Doctor Password */}
            <div className="flex flex-col gap-1">
              <label className={labelStyle}>Initial Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className={inputStyle}
                type="password"
                placeholder="Initial Password"
                required
              />
            </div>
            
            {/* Education / Degree */}
            <div className="flex flex-col gap-1">
              <label className={labelStyle}>Education / Degree</label>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className={inputStyle}
                type="text"
                placeholder="e.g., MBBS, MD"
                required
              />
            </div>

          </div>

          {/* --- Right Column: Speciality & Location --- */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Specialization & Fees</h3>

            {/* Speciality Dropdown */}
            <div className="flex flex-col gap-1">
              <label className={labelStyle}>Speciality</label>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className={selectStyle}
                required
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            {/* Experience */}
            <div className="flex flex-col gap-1">
              <label className={labelStyle}>Years of Experience</label>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className={selectStyle}
                required
              >
                {Array.from({ length: 20 }, (_, i) => i + 1).map(year => (
                  <option key={year} value={`${year} Year`}>{year} Year</option>
                ))}
              </select>
            </div>

            {/* Fees */}
            <div className="flex flex-col gap-1">
              <label className={labelStyle}>Appointment Fees ($)</label>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className={inputStyle}
                type="number"
                placeholder="Fees"
                required
                min="0"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col gap-1">
              <label className={labelStyle}>Clinic Address</label>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className={`${inputStyle} mb-2`}
                type="text"
                placeholder="Address Line 1"
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className={inputStyle}
                type="text"
                placeholder="Address Line 2 (City, State, Zip)"
                required
              />
            </div>
          </div>
        </div>

        {/* About Doctor (Full Width) */}
        <div className="mt-8">
          <label className={labelStyle}>About Doctor</label>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className={`${inputStyle} h-32 resize-none`}
            placeholder="Write a detailed biography for the doctor profile."
            rows={5}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 px-10 py-3 mt-8 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-lg"
        >
          Add Doctor to System
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;

// import React, { useContext, useState } from "react";
// import { assets } from "../../assets/assets";
// import { AdminContext } from "./../../context/AdminContext";
// import { toast } from "react-toastify";
// import axios from "axios";

// const AddDoctor = () => {
//   const [docImg, setDocImg] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [experience, setExperience] = useState("1 Year");
//   const [fees, setFees] = useState("");
//   const [about, setAbout] = useState("");
//   const [speciality, setSpeciality] = useState("General Physician");
//   const [degree, setDegree] = useState("");
//   const [address1, setAddress1] = useState("");
//   const [address2, setAddress2] = useState("");

//   const { backendUrl, aToken } = useContext(AdminContext);

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();

//     try {
//       if (!docImg) {
//         return toast.error("Image Not Selected");
//       }

//       const formData = new FormData();

//       formData.append("image", docImg);
//       formData.append("name", name);
//       formData.append("email", email);
//       formData.append("password", password);
//       formData.append("experience", experience);
//       formData.append("fees", Number(fees));
//       formData.append("about", about);
//       formData.append("speciality", speciality);
//       formData.append("degree", degree);
//       formData.append(
//         "address",
//         JSON.stringify({ line1: address1, line2: address2 })
//       );

//       //Console log formdata
//       formData.forEach((value, key) => {
//         console.log(`${key}:${value}`);
//       });
//       const {data}=await axios.post(backendUrl + '/api/admin/add-doctor',formData,{headers:{aToken}})
      

//       if (data.success) {
//         toast.success(data.message);
//         setDocImg(false)
//         setName('')
//         setPassword('')
//         setEmail('')
//         setAddress1('')
//         setAddress2('')
//         setDegree('')
//         setAbout('')
//         setFees('')
//       } else {
//         toast.error(data.message);
//       }

//     } catch (error) {
//       toast.error(error.message);
//       console.log(error);
      
//     }
//   };

//   return (
//     <form onSubmit={onSubmitHandler} className="m-5 w-full">
//       <p className="mb-3 text-lg font-medium">Add Doctor</p>

//       <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
//         <div className="flex items-center gap-4 mb-8 text-gray-500">
//           <label htmlFor="doc-img">
//             <img
//               className="w-16 bg-gray-100 rounded-full cursor-pointer"
//               src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
//               alt=""
//             />
//           </label>
//           <input
//             onChange={(e) => setDocImg(e.target.files[0])}
//             type="file"
//             id="doc-img"
//             hidden
//           />
//           <p>
//             Upload doctor <br />
//             picture
//           </p>
//         </div>

//         <div className="flex flex-col  lg:flex-row items-start gap-10 text-gray-600">
//           <div className="w-full  lg:flex-1 flex flex-col gap-4">
//             <div className="flex-1 flex flex-col gap-1">
//               <p>Doctor Name</p>
//               <input
//                 onChange={(e) => setName(e.target.value)}
//                 value={name}
//                 className="border rounded px-3 py-2"
//                 type="text"
//                 placeholder="Name"
//                 required
//               />
//             </div>

//             <div className="flex-1 flex flex-col gap-1">
//               <p>Doctor Email</p>
//               <input
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//                 className="border rounded px-3 py-2"
//                 type="email"
//                 placeholder="Email"
//                 required
//               />
//             </div>

//             <div className="flex-1 flex flex-col gap-1">
//               <p>Doctor Password</p>
//               <input
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//                 className="border rounded px-3 py-2"
//                 type="password"
//                 placeholder="Password"
//                 required
//               />
//             </div>

//             <div className="flex-1 flex flex-col gap-1">
//               <p>Experience</p>
//               <select
//                 onChange={(e) => setExperience(e.target.value)}
//                 value={experience}
//                 className="border rounded px-3 py-2"
//                 name=""
//                 id=""
//               >
//                 <option value="1 Year">1 Year</option>
//                 <option value="2 Year">2 Year</option>
//                 <option value="3 Year">3 Year</option>
//                 <option value="4 Year">4 Year</option>
//                 <option value="5 Year">5 Year</option>
//                 <option value="6 Year">6 Year</option>
//                 <option value="7 Year">7 Year</option>
//                 <option value="8 Year">8 Year</option>
//                 <option value="9 Year">9 Year</option>
//                 <option value="10 Year">10 Year</option>
//               </select>
//             </div>

//             <div className="flex-1 flex flex-col gap-1">
//               <p>Fees</p>
//               <input
//                 onChange={(e) => setFees(e.target.value)}
//                 value={fees}
//                 className="border rounded px-3 py-2"
//                 type="number"
//                 placeholder="fees"
//                 required
//               />
//             </div>
//           </div>

//           <div className="w-full lg:flex-1 flex flex-col gap-4">
//             <div className="flex-1 flex flex-col gap-1">
//               <p>Speciality</p>
//               <select
//                 onChange={(e) => setSpeciality(e.target.value)}
//                 value={speciality}
//                 className="border rounded px-3 py-2"
//                 name=""
//                 id=""
//               >
//                 <option value="General physician">General physician</option>
//                 <option value="Gynecologist">Gynecologist</option>
//                 <option value="Dermatologist">Dermatologist</option>
//                 <option value="Pediatricians">Pediatricians</option>
//                 <option value="Neurologist">Neurologist</option>
//                 <option value="Gastroenterologist">Gastroenterologist</option>
//               </select>
//             </div>

//             <div className="flex-1 flex flex-col gap-1">
//               <p>Education</p>
//               <input
//                 onChange={(e) => setDegree(e.target.value)}
//                 value={degree}
//                 className="border rounded px-3 py-2"
//                 type="text"
//                 placeholder="Education"
//                 required
//               />
//             </div>

//             <div className="flex-1 flex flex-col gap-1">
//               <p>Address</p>
//               <input
//                 onChange={(e) => setAddress1(e.target.value)}
//                 value={address1}
//                 className="border rounded px-3 py-2"
//                 type="text"
//                 placeholder="address1"
//                 required
//               />
//               <input
//                 onChange={(e) => setAddress2(e.target.value)}
//                 value={address2}
//                 className="border rounded px-3 py-2"
//                 type="text"
//                 placeholder="address2"
//                 required
//               />
//             </div>
//           </div>
//         </div>

//         <div>
//           <p className="mt-4 mb-2">About Doctor</p>
//           <textarea
//             onChange={(e) => setAbout(e.target.value)}
//             value={about}
//             className="w-full px-4 pt-2 border rounded"
//             placeholder="write about doctor"
//             rows={5}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-400 px-10 py-3 mt-4 text-white rounded-full"
//         >
//           Add doctor
//         </button>
//       </div>
//     </form>
//   );
// };

// export default AddDoctor;
