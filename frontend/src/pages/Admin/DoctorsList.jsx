import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext';

const DoctorsList = () => {

  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);
  const { currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  // --- Availability Toggle Component ---
  const AvailabilitySwitch = ({ doctorId, isAvailable }) => {
    return (
      <div className="flex items-center gap-3">
        <label className={`relative inline-flex items-center cursor-pointer`}>
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isAvailable}
            onChange={() => changeAvailability(doctorId)}
          />
          {/* Toggle Track */}
          <div 
            className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
          />
        </label>
        <span className={`text-sm font-semibold ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
          {isAvailable ? 'Available' : 'Unavailable'}
        </span>
      </div>
    );
  };

  return (
    <div className='p-4 md:p-8 w-full'>
      <h1 className='text-3xl font-bold text-gray-900 mb-6'>All Registered Doctors ({doctors.length})</h1>
      
      {/* Grid adjusted for responsiveness: 1 on mobile, 2 on sm, 3 on lg, 4 on xl */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-5'>
        {
          doctors.length > 0 ? (
            doctors.map((item, index) => (
              <div 
                className='border border-gray-100 bg-white rounded-xl shadow-lg w-full overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 group' 
                key={index}
              >
                {/* Doctor Image Container: Increased height (h-64) and object-contain to prevent cropping */}
                <div className='h-64 bg-blue-50 overflow-hidden flex items-end justify-center'>
                  <img 
                    className='w-full h-full object-contain transition-transform duration-500 transform group-hover:scale-105' 
                    src={item.image} 
                    alt={`Dr. ${item.name}`} 
                  />
                </div>
                
                {/* Doctor Details: Increased vertical padding (py-5) */}
                <div className='px-4 py-5'>
                  <h2 className='text-xl font-bold text-gray-900'>Dr. {item.name}</h2>
                  <p className='text-blue-600 text-base font-medium'>{item.speciality}</p>
                  
                  <div className='mt-3 space-y-1 text-gray-700 text-sm'>
                    <p>
                      <span className='font-semibold'>Experience:</span> {item.experience}
                    </p>
                    <p>
                      <span className='font-semibold'>Fees:</span> {currency}{item.fees}
                    </p>
                  </div>

                  {/* Availability Toggle (Admin Control) */}
                  <div className='mt-4 pt-4 border-t border-gray-100'>
                    <AvailabilitySwitch 
                      doctorId={item._id} 
                      isAvailable={item.available} 
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-10 col-span-full">No doctors currently registered.</p>
          )
        }
      </div>
    </div>
  );
}

export default DoctorsList;


// import React, { useContext, useEffect } from 'react'
// import { AdminContext } from '../../context/AdminContext'

// const DoctorsList = () => {

//   const {doctors,aToken,getAllDoctors,changeAvailability}=useContext(AdminContext)

//   useEffect(()=>{
//     if(aToken){
//       getAllDoctors()

//     }
//   },[aToken])


//   return (
//     <div className='m-5 max-h-[90vh] overflow-y-scroll'>
//       <h1 className='text-lg font-medium'>All Doctors</h1>
//       <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
//         {
//           doctors.map((item,index)=>(
//             <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
//               <img className='bg-indigo-50 group-hover:bg-blue-400 transition-all duration-500' src={item.image} alt="" />
//               <div className='p-4'>
//                 <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
//                 <p className='text-zinc-600 text-sm'>{item.speciality}</p>
//                 <div className='mt-2 flex items-center gap-1 text-sm'>
//                   <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available}/>
//                   <p>Available</p>
//                 </div>
//               </div>
//             </div>
//           ))
//         }
//       </div>
//     </div>
//   )
// }

// export default DoctorsList