import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };
  
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
        withCredentials: true,
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        {
          headers: { token },
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-3">My Appointments</h1>
      
      <div className="flex flex-col gap-6">
        {appointments.length > 0 ? (
          appointments.slice(0, 5).map((item, index) => (
            <div
              className="flex flex-col sm:flex-row gap-4 p-5 bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg"
              key={index}
            >
              {/* Doctor Image */}
              <div className="flex-shrink-0 w-full sm:w-32">
                <img
                  className="w-full h-32 object-cover rounded-lg bg-blue-50"
                  src={item.docData.image}
                  alt={item.docData.name}
                />
              </div>

              {/* Appointment Details */}
              <div className="flex-1 text-sm text-gray-700">
                <p className="text-xl text-gray-900 font-bold">
                  {item.docData.name}
                </p>
                <p className="text-blue-600 font-medium">{item.docData.speciality}</p>
                
                <div className="mt-3">
                  <p className="font-semibold text-gray-800">Date & Time:</p>
                  <p className="text-base">
                    {slotDateFormat(item.slotDate)} at {item.slotTime}
                  </p>
                </div>
                
                <p className="text-sm mt-3">
                  <span className="font-semibold text-gray-800">Location:</span> 
                  {item.docData.address?.line1 || "N/A"}, {item.docData.address?.line2 || ""}
                </p>

              </div>

              {/* Action Buttons / Status */}
              <div className="flex flex-col gap-2 justify-center sm:justify-end sm:min-w-[180px]">
                
                {/* CANCELED STATUS */}
                {item.cancelled && (
                  <span className="py-2 px-4 rounded-lg bg-red-100 text-red-700 font-semibold text-center border border-red-300">
                    Appointment Cancelled
                  </span>
                )}

                {/* COMPLETED STATUS */}
                {item.isCompleted && (
                  <span className="py-2 px-4 rounded-lg bg-green-100 text-green-700 font-semibold text-center border border-green-300">
                    Completed
                  </span>
                )}

                {/* PENDING ACTIONS */}
                {!item.cancelled && !item.isCompleted && (
                  <>
                    <button className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Pay Online
                    </button>
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Cancel Appointment
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center py-10">You have no appointments booked yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;

// import React, { useContext, useEffect, useState } from "react";
// import { AppContext } from "./../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// const MyAppointments = () => {
//   const { backendUrl, token, getDoctorsData } = useContext(AppContext);

//   const [appointments, setAppointments] = useState([]);

//   const months = [
//     "",
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];

//   const slotDateFormat = (slotDate) => {
//     const dateArray = slotDate.split("_");
//     return (
//       dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
//     );
//   };
//   const getUserAppointments = async () => {
//     try {
//       const { data } = await axios.get(backendUrl + "/api/user/appointments", {
//         headers: { token },
//         withCredentials: true,
//       });

//       if (data.success) {
//         setAppointments(data.appointments.reverse());
//         console.log(data.appointments);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   const cancelAppointment = async (appointmentId) => {
//     try {
//       const { data } = await axios.post(
//         backendUrl + "/api/user/cancel-appointment",
//         { appointmentId },
//         {
//           headers: { token },
//           withCredentials: true,
//         }
//       );

//       if (data.success) {
//         toast.success(data.message);
//         getUserAppointments();
//         getDoctorsData();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       getUserAppointments();
//     }
//   }, [token]);

//   return (
//     <div>
//       <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
//         My appointments
//       </p>
//       <div>
//         {appointments.slice(0, 3).map((item, index) => (
//           <div
//             className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
//             key={index}
//           >
//             <div>
//               <img
//                 className="w-32 bg-indigo-50"
//                 src={item.docData.image}
//                 alt="doctor"
//               />
//             </div>
//             <div className="flex-1 text-sm text-zinc-600">
//               <p className="text-neutral-800 font-semibold">
//                 {item.docData.name}
//               </p>
//               <p>{item.docData.speciality}</p>
//               <p className="text-zinc-700 font-medium mt-1">Address:</p>
//               <p className="text-xs">{item.docData.address?.line1 || "N/A"}</p>
//               <p className="text-xs">{item.docData.address?.line2 || ""}</p>
//               <p className="text-xs mt-1">
//                 <span className="text-sm text-neutral-700 font-medium">
//                   Date & Time:
//                 </span>{" "}
//                 {slotDateFormat(item.slotDate)} | {item.slotTime}
//               </p>
//             </div>
//             <div className="flex flex-col gap-2 justify-end">
//               {!item.cancelled && !item.isCompleted && (
//                 <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-blue-400 hover:text-white transition-all duration-300">
//                   Pay Online
//                 </button>
//               )}
//               {!item.cancelled && !item.isCompleted && (
//                 <button
//                   onClick={() => cancelAppointment(item._id)}
//                   className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300"
//                 >
//                   Cancel appointment
//                 </button>
//               )}
//               {item.cancelled && !item.isCompleted && (
//                 <button className="sm:min-w-48 py-2 border border-red-500 text-red-500">
//                   Appointment Cancelled
//                 </button>
//               )}

//               {item.isCompleted && (
//                 <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
//                   Completed
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyAppointments;




// <div>
//     <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>
//     <div>
//       {
//         appointments.slice(0,3).map((item,index)=>(
//           <div className='grid grid-cols-[1fr_2fr]  gap-4 sm:flex sm:gap-6 py-2 border-b ' key={index}>
//             <div>
//               <img className='w-32 bg-indigo-50' src={item.docData.name} alt="" />
//             </div>
//             <div  className='flex-1 text-sm text-zinc-600'>
//               <p className='text-neutral-800 font-semibold'>{item.docData.image}</p>
//               <p >{item.docData.speciality}</p>
//               <p className='text-zinc-700  font-medium mt-1'>Address: </p>
//               <p className='text-xs'>{item.docData.address.line1}</p>
//               <p className='text-xs'>{item.docData.address.line2}</p>
//               <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time:</span>{item.slotDate} | {item.slotTime}</p>
//             </div>
//             <div></div>
//             <div className='flex flex-col gap-2 justify-end'>
//               <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-blue-400 hover:text-white transition-all duration-300'>Pay Online</button>
//               <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300 '>Cancel appointment</button>
//             </div>
//           </div>
//         ))
//       }
//     </div>
// </div>
