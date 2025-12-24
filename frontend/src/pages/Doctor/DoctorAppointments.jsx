import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  // --- Component for Status Pill/Badge ---
  const StatusPill = ({ isCancelled, isCompleted }) => {
    if (isCancelled) {
      return <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-100 text-red-600">Cancelled</span>;
    }
    if (isCompleted) {
      return <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-600">Completed</span>;
    }
    return <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">Pending</span>;
  };


  return (
    <div className="p-4 md:p-8 w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Patient Appointments</h1>

      <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
        
        {/* Desktop Table Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1.5fr_2fr_1.5fr_2fr] gap-4 py-4 px-6 bg-gray-50 border-b font-semibold text-gray-700">
          <p>#</p>
          <p>Patient Details</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Payment / Fees</p>
          <p>Status / Action</p>
        </div>

        {/* Appointment Rows */}
        <div className="max-h-[70vh] overflow-y-auto">
          {appointments.slice().reverse().map((item, index) => (
            <div
              className="p-4 sm:p-6 border-b last:border-b-0 hover:bg-blue-50/50 transition-colors duration-200 
                        flex flex-col sm:grid sm:grid-cols-[0.5fr_3fr_1.5fr_2fr_1.5fr_2fr] sm:items-center gap-4 text-sm text-gray-600"
              key={index}
            >
              
              {/* Index */}
              <p className="max-sm:hidden font-medium">{index + 1}</p>

              {/* Patient Details */}
              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  src={item.userData.image || assets.user_icon}
                  alt={item.userData.name}
                />
                <div>
                  <p className="font-semibold text-gray-800">{item.userData.name}</p>
                  <p className="text-xs text-gray-500 max-sm:hidden">{item.userData.email}</p>
                </div>
              </div>

              {/* Age (Hidden on mobile) */}
              <p className="max-sm:hidden">{calculateAge(item.userData.dob)} years</p>

              {/* Date & Time */}
              <div className="font-medium max-sm:order-2 max-sm:mt-2">
                <p className="text-gray-800">{slotDateFormat(item.slotDate)}</p>
                <p className="text-blue-600 text-xs">{item.slotTime}</p>
              </div>

              {/* Payment / Fees */}
              <div className="flex flex-col gap-1 max-sm:order-1 max-sm:mb-2">
                <p className={`text-xs font-medium px-2 py-0.5 rounded-full w-fit 
                              ${item.payment ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-700'}`}>
                  {item.payment ? "PAID (Online)" : "CASH (Pending)"}
                </p>
                <p className="font-bold text-gray-800 text-base">
                  {currency}{item.amount}
                </p>
              </div>

              {/* Status / Action Buttons */}
              <div className="flex flex-col gap-2 sm:justify-center sm:items-center max-sm:order-3">
                {item.cancelled || item.isCompleted ? (
                  <StatusPill isCancelled={item.cancelled} isCompleted={item.isCompleted} />
                ) : (
                  <div className="flex gap-3">
                    {/* Cancel Button - FULLY VISIBLE CIRCLE */}
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-xl font-bold hover:bg-red-600 transition-colors shadow-sm"
                      title="Cancel Appointment"
                    >
                      &times; {/* Large 'X' icon */}
                    </button>
                    
                    {/* Complete Button - FULLY VISIBLE CIRCLE */}
                    <button
                      onClick={() => completeAppointment(item._id)}
                      className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xl font-bold hover:bg-green-600 transition-colors shadow-sm"
                      title="Mark as Completed"
                    >
                      &#10003; {/* Checkmark icon */}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {/* Empty State */}
          {appointments.length === 0 && (
            <p className="text-center text-gray-500 py-10">No appointments found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;

// import React from "react";
// import { useContext } from "react";
// import { DoctorContext } from "../../context/DoctorContext";
// import { useEffect } from "react";
// import { AppContext } from "../../context/AppContext";
// import { assets } from "../../assets/assets";

// const DoctorAppointments = () => {
//   const {
//     dToken,
//     appointments,
//     getAppointments,
//     completeAppointment,
//     cancelAppointment,
//   } = useContext(DoctorContext);
//   const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

//   useEffect(() => {
//     if (dToken) {
//       getAppointments();
//     }
//   }, [dToken]);

//   return (
//     <div className="w-full max-w-6xl m-5">
//       <p className="mb-3 text-lg font-medium">All Appointments</p>

//       <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll ">
//         <div className="max-sm:hidden grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
//           <p>#</p>
//           <p>Patient</p>
//           <p>Payment</p>
//           <p>Age</p>
//           <p>Date & Time</p>
//           <p>Fees</p>
//           <p>Action</p>
//         </div>

//         {appointments.reverse()?.map((item, index) => (
//           <div
//             className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
//             key={index}
//           >
//             <p className="max-sm:hidden">{index + 1}</p>
//             <div className="flex items-center gap-2">
//               <img
//                 className="w-8 rounded-full"
//                 src={item.userData.image}
//                 alt=""
//               />
//               <p>{item.userData.name}</p>
//             </div>

//             <div>
//               <p className="text-xs inline border border-blue-400  px-2 rounded-full">
//                 {item.payment ? "Online" : "CASH "}
//               </p>
//             </div>

//             <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>

//             <p>
//               {slotDateFormat(item.slotDate)},{item.slotTime}
//             </p>

//             <p>
//               {currency}
//               {item.amount}
//             </p>

//             {item.cancelled ? (
//               <p className="text-red-400 text-xs font-medium">Cancelled</p>
//             ) : item.isCompleted ? (
//               <p className="text-green-500 text-xs font-medium">Completed</p>
//                ) : (
//                  <div className="flex">
//                 <img
//                   onClick={() => cancelAppointment(item._id)}
//                   className="w-10 cursor-pointer"
//                   src={assets.cancel_icon}
//                   alt=""
//                 />
//                 <img
//                   onClick={() => completeAppointment(item._id)}
//                   className="w-10 cursor-pointer"
//                   src={assets.tick_icon}
//                   alt=""
//                 />
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DoctorAppointments;
