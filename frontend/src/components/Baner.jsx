// File: src/components/Baner.jsx
import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Baner = () => {
    const navigate = useNavigate()
    return (
        <div className='flex bg-blue-400 rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 overflow-hidden min-h-[250px] sm:min-h-[350px]'> 
            {/* Left Side: Text Centered on Mobile, Left-aligned on Desktop */}
            <div className='flex-1 py-12 sm:py-16 lg:py-24 lg:pl-5 flex flex-col justify-center items-center md:items-start text-center md:text-left'> 
                <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
                    <p>Book Appointment</p>
                    <p className='mt-4'>With 100+ Trusted Doctors</p>
                </div>
                {/* ... button remains the same ... */}
            </div>

            {/* Right Side: No changes needed, flex items-end ensures image sits at the bottom */}
            <div className='hidden md:block md:w-1/2 lg:w-[370px] flex items-end'> 
                <img 
                    className='w-full object-contain' 
                    src={assets.appointment_img} 
                    alt="Doctor" 
                />
            </div>
        </div>
    )
}

// const Baner = () => {
//     const navigate = useNavigate()
//     return (
//         <div className='flex bg-blue-400 rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 overflow-hidden min-h-[300px]'> 

//             {/* Left Side: Adjusted Padding for balance */}
//             <div className='flex-1 py-16 sm:py-20 lg:py-24 lg:pl-5 flex flex-col justify-center'> 
//                 <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
//                     <p>Book Appointment</p>
//                     <p className='mt-4'>With 100+ Trusted Doctors</p>
//                 </div>
//                 <button onClick={() => (navigate('/login'), scrollTo(0, 0))} 
//                     className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 
//                                 hover:scale-105 transition-all shadow-md'
//                 >
//                     Create Account
//                 </button>
//             </div>

//             {/* Right Side: Image is contained within the div */}
//             <div className='hidden md:block md:w-1/2 lg:w-[370px] flex items-end'> 
//                 <img 
//                     className='w-full object-contain' 
//                     src={assets.appointment_img} 
//                     alt="Doctor" 
//                 />
//             </div>
//         </div>
//     )
// }

export default Baner

// import React from 'react'
// import { assets } from '../assets/assets'
// import { useNavigate } from 'react-router-dom'

// const Baner = () => {
//     const navigate=useNavigate()
//   return (
//     <div className='flex bg-blue-400 rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>
//         {/* ----------Left Side */}

//         <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 '>
//             <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
//                 <p>Book Appointment</p>
//                 <p className='mt-4'>With 100+ Trusted Doctors</p>
//             </div>
//             <button onClick={()=>(navigate('/login'),scrollTo(0,0))} className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all '>Create Account</button>

//         </div>

//         {/* ------------Right Side */}

//         <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
//             <img className='w-full absolute bottom-0 right-0 max-w-md ' src={assets.appointment_img} alt="" />

//         </div>

//     </div>
//   )
// }

// export default Baner