import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from "../../assets/assets";

const AllApointments = () => {
  
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  // --- Status Pill Component ---
  const StatusPill = ({ isCancelled, isCompleted }) => {
    if (isCancelled) {
      return <span className="text-xs font-semibold px-3 py-1 rounded-full bg-red-100 text-red-600">Cancelled</span>;
    }
    if (isCompleted) {
      return <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-600">Completed</span>;
    }
    return <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">Pending</span>;
  };

  // --- Action Button Component (Visible Cancel Circle) ---
  const CancelButton = ({ onClick }) => (
    <button
      onClick={onClick}
      className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-xl font-bold hover:bg-red-600 transition-colors shadow-sm"
      title="Cancel Appointment"
    >
      &times; {/* Large 'X' icon */}
    </button>
  );


  return (
    <div className='p-4 md:p-8 w-full'>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">All System Appointments</h1>

      <div className='bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden'>
        
        {/* Desktop Table Header */}
        <div className='hidden lg:grid grid-cols-[0.5fr_2.5fr_2.5fr_2fr_1.5fr_1.5fr] gap-4 py-4 px-6 bg-gray-50 border-b font-semibold text-gray-700'>
          <p>#</p>
          <p>Patient Details</p>
          <p>Doctor Details</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Status / Action</p>
        </div>
        

        <div className='max-h-[70vh] overflow-y-auto divide-y divide-gray-100'>
          {appointments && appointments.length > 0 ? (
            appointments.slice().reverse().map((item, index) => (
              <div 
                className='p-4 lg:p-6 flex flex-col lg:grid lg:grid-cols-[0.5fr_2.5fr_2.5fr_2fr_1.5fr_1.5fr] lg:items-center gap-4 text-sm text-gray-600 hover:bg-blue-50/50 transition-colors' 
                key={index}
              >
                {/* Index (Desktop Only) */}
                <p className='hidden lg:block font-medium'>{index + 1}</p>
                
                {/* Patient Details */}
                <div className='flex items-center gap-3 w-full lg:w-auto'>
                  <img 
                    className='w-10 h-10 rounded-full object-cover border border-gray-200' 
                    src={item.userData.image || assets.user_icon} 
                    alt={item.userData.name} 
                  />
                  <div>
                    <p className='font-semibold text-gray-800'>{item.userData.name}</p>
                    <p className='text-xs text-gray-500'>Age: {calculateAge(item.userData.dob)}</p>
                  </div>
                </div>

                {/* Doctor Details */}
                <div className='flex items-center gap-3 w-full lg:w-auto'>
                  <img 
                    className='w-10 h-10 rounded-full object-cover bg-gray-100 border border-gray-200' 
                    src={item.docData.image || assets.doctor_icon} 
                    alt={item.docData.name} 
                  />
                  <div>
                    <p className='font-semibold text-gray-800'>Dr. {item.docData.name}</p>
                    <p className='text-xs text-blue-600'>{item.docData.speciality}</p>
                  </div>
                </div>
                
                {/* Date & Time */}
                <div className='font-medium'>
                  <p className='text-gray-800'>{slotDateFormat(item.slotDate)}</p>
                  <p className='text-xs text-blue-600'>{item.slotTime}</p>
                </div>

                {/* Fees & Payment Status */}
                <div className='flex flex-col gap-1'>
                  <p className='font-bold text-gray-800'>{currency}{item.amount}</p>
                  <p className={`text-xs font-medium px-2 py-0.5 rounded-full w-fit 
                                ${item.payment ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {item.payment ? "Paid" : "Cash Pending"}
                  </p>
                </div>


                {/* Status / Action */}
                <div className='flex flex-col gap-2 lg:justify-center lg:items-center'>
                  {item.cancelled || item.isCompleted 
                    ? <StatusPill isCancelled={item.cancelled} isCompleted={item.isCompleted} />
                    : <CancelButton onClick={() => cancelAppointment(item._id)} />
                  }
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-10">No appointments found in the system.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllApointments;

// import React from 'react'
// import { useContext } from 'react'
// import { AdminContext } from '../../context/AdminContext'
// import { useEffect } from 'react'
// import { AppContext } from '../../context/AppContext'
// import { assets } from "../../assets/assets";

// const AllApointments = () => {
  
//   const {aToken,appointments,getAllAppointments,cancelAppointment}=useContext(AdminContext)
//   const {calculateAge,slotDateFormat,currency}=useContext(AppContext)


//   useEffect(()=>{
//     if(aToken){
//       getAllAppointments()

//     }
//   },[aToken])




//   return (
//     <div className='w-full max-w-6xl m-5 '>
//       <p className='mb-3 text-lg font-medium'>All Appointment</p>

//       <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>

//         <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
//           <p>#</p>
//           <p>Patient</p>
//           <p>Age</p>
//           <p>Date & Time</p>
//           <p>Doctor</p>
//           <p>Fees</p>
//           <p>Actions</p>
//         </div>
        

//         {appointments?.map((item,index)=>(
          
//           <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
//             <p className='max-sm:hidden'>{index+1}</p>
//             <div className='flex items-center gap-2'>
//               <img className='w-8 rounded-full' src={item.userData.image} alt="" /><p>{item.userData.name}</p>
//             </div>

//             <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
//             <p>{slotDateFormat(item.slotDate)},{item.slotTime}</p>

//             <div className='flex items-center gap-2'>
//               <img className='w-8 rounded-full bg-gray-200' src={item.docData.image} alt="" /><p>{item.docData.name}</p>
//             </div>

//             <p>{currency}{item.amount}</p>

//             {
//               item.cancelled 
//               ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
//               : item.isCompleted 
//                 ? <p  className='text-green-500 text-xs font-medium'>Completed</p>
//                 : <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
//             }

//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default AllApointments