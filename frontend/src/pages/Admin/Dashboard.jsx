import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
    const { aToken, getDashData, cancelAppointment, dashData } =
        useContext(AdminContext);

    const { slotDateFormat } = useContext(AppContext);

    useEffect(() => {
        if (aToken) {
            getDashData();
        }
    }, [aToken]);

    // --- Action Button Component (Simplified for Admin - only Cancel is shown in original) ---
    // Note: Admin usually cancels, doctors complete.
    const CancelButton = ({ onClick }) => (
        <button
            onClick={onClick}
            className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-xl font-bold hover:bg-red-600 transition-colors shadow-sm"
            title="Cancel Appointment"
        >
            &times; {/* Large 'X' icon */}
        </button>
    );

    // --- Main Render ---
    if (!dashData) {
        return (
            <div className="p-4 md:p-8 w-full flex items-center justify-center min-h-[50vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading dashboard data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 w-full">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">System Overview (Admin)</h1>

            {/* 1. Metric Cards (KPIs) */}
            <div className="flex flex-wrap gap-6 mb-12">
                {/* Doctors Card */}
                <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-lg border border-gray-100 min-w-60 flex-1 cursor-pointer hover:shadow-xl transition-all duration-300">
                    <img className="w-12 h-12" src={assets.doctor_icon} alt="Doctors" />
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Doctors</p>
                        <p className="text-3xl font-bold text-blue-600">
                            {dashData.doctors}
                        </p>
                    </div>
                </div>

                {/* Appointments Card */}
                <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-lg border border-gray-100 min-w-60 flex-1 cursor-pointer hover:shadow-xl transition-all duration-300">
                    <img className="w-12 h-12" src={assets.appointments_icon} alt="Appointments" />
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Appointments</p>
                        <p className="text-3xl font-bold text-indigo-600"> {/* Distinct color for Admin */}
                            {dashData.appointments}
                        </p>
                    </div>
                </div>

                {/* Patients Card */}
                <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-lg border border-gray-100 min-w-60 flex-1 cursor-pointer hover:shadow-xl transition-all duration-300">
                    <img className="w-12 h-12" src={assets.patients_icon} alt="Patients" />
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Patients</p>
                        <p className="text-3xl font-bold text-green-600">
                            {dashData.patients}
                        </p>
                    </div>

                </div>
            </div>

            {/* 2. Latest Bookings */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">

                <div className="flex items-center gap-3 px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <img className="w-5 h-5" src={assets.list_icon} alt="list" />
                    <p className="text-lg font-semibold text-gray-800">Latest Global Bookings</p>
                </div>

                <div className="divide-y divide-gray-100">
                    {dashData.latestAppointments && dashData.latestAppointments.length > 0 ? (
                        dashData.latestAppointments.map((item, index) => (
                            <div
                                className="flex items-center justify-between px-6 py-4 hover:bg-blue-50/50 transition-colors"
                                key={index}
                            >

                                <div className="flex items-center gap-4 flex-1">
                                    <img
                                        className="rounded-full w-10 h-10 object-cover border border-gray-200"
                                        src={item.docData.image || assets.user_icon}
                                        alt={item.docData.name}
                                    />
                                    <div className="text-sm">
                                        <p className="text-gray-900 font-semibold">
                                            Dr. {item.docData.name} ({item.docData.speciality})
                                        </p>
                                        <p className="text-gray-600 text-xs">
                                            Appointment on {slotDateFormat(item.slotDate)}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions/Status */}
                                <div className="flex items-center gap-3">
                                    {item.cancelled ? (
                                        <p className="text-red-500 text-xs font-semibold">Cancelled</p>
                                    ) : item.isCompleted ? (
                                        <p className="text-green-500 text-xs font-semibold">Completed</p>
                                    ) : (
                                        <CancelButton onClick={() => cancelAppointment(item._id)} />
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-10">No latest appointments found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

// import React, { useContext, useEffect } from "react";
// import { AdminContext } from "../../context/AdminContext";
// import { assets } from "../../assets/assets";
// import { AppContext } from "../../context/AppContext";

// const Dashboard = () => {
//   const { aToken, getDashData, cancelAppointment, dashData } =
//     useContext(AdminContext);

//   const { slotDateFormat } = useContext(AppContext);

//   useEffect(() => {
//     if (aToken) {
//       getDashData();
//     }
//   }, [aToken]);

//   return (
//     dashData && (
//       <div className="m-5">
//         <div className="flex flex-wrap gap-3">
//           <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
//             <img className="w-14" src={assets.doctor_icon} alt="" />
//             <div>
//               <p className="text-xl font-semibold text-gray-600">
//                 {dashData.doctors}
//               </p>
//               <p className="text-gray-400">Doctors</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
//             <img className="w-14" src={assets.appointments_icon} alt="" />
//             <div>
//               <p className="text-xl font-semibold text-gray-600">
//                 {dashData.appointments}
//               </p>
//               <p className="text-gray-400">Appointments</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
//             <img className="w-14" src={assets.patients_icon} alt="" />
//             <div>
//               <p className="text-xl font-semibold text-gray-600">
//                 {dashData.patients}
//               </p>
//               <p className="text-gray-400">Patients</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white ">
//           <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
//             <img src={assets.list_icon} alt="" />
//             <p className="font-semibold">Latest Bookings</p>
//           </div>

//           <div className="pt-4 border border-t-0">
//             {dashData.latestAppointments?.map((item, index) => (
//               <div
//                 className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
//                 key={index}
//               >
//                 <img
//                   className="rounded-full w-10"
//                   src={item.docData.image}
//                   alt=""
//                 />
//                 <div className="flex-1 text-sm">
//                   <p className="text-gray-800 font-medium">
//                     {item.docData.name}
//                   </p>
//                   <p className="text-gray-600">
//                     {slotDateFormat(item.slotDate)}
//                   </p>
//                 </div>

//                 {item.cancelled ? (
//                   <p className="text-red-400 text-xs font-medium">Cancelled</p>
//                 ) : item.isCompleted ? (
//                   <p className="text-green-500 text-xs font-medium">
//                     Completed
//                   </p>
//                 ) : (
//                   <img
//                     onClick={() => cancelAppointment(item._id)}
//                     className="w-10 cursor-pointer"
//                     src={assets.cancel_icon}
//                     alt=""
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default Dashboard;
