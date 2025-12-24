import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="py-8 md:py-12">

      {/* ------- CONTACT US HEADER ------- */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">
          CONTACT <span className="text-blue-600">US</span>
        </h1>
      </div>

      {/* ------- MAIN CONTENT: IMAGE AND DETAILS ------- */}
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 md:gap-16 mb-28 text-sm items-center'>
        
        {/* Image */}
        <img 
          className='w-full md:max-w-md h-auto object-cover rounded-xl shadow-xl' 
          src={assets.contact_image} 
          alt="Contact Illustration" 
        />

        {/* Contact Details Block */}
        <div className='flex flex-col justify-center items-start gap-5 p-4 md:p-0'>
          
          {/* OFFICE LOCATION */}
          <h2 className='font-bold text-xl text-gray-800 border-b-2 border-blue-500 pb-1'>Our OFFICE</h2>
          <p className='text-gray-600 text-base leading-relaxed'>
            54709 Willms Station <br />
            Suite 350, Washington, USA
          </p>

          {/* CONTACT INFO */}
          <h2 className='font-bold text-xl text-gray-800 border-b-2 border-blue-500 pb-1 mt-4'>Get in Touch</h2>
          <p className='text-gray-600 text-base'>
            Tel: (415) 555‑0132 <br /> 
            Email: rohitdev@gmail.com
          </p>

          {/* CAREERS SECTION */}
          <h2 className='font-bold text-xl text-gray-800 border-b-2 border-blue-500 pb-1 mt-4'>Careers at DOCIENT</h2>
          <p className='text-gray-600 text-base'>
            Learn more about our teams and job openings.
          </p>
          <button className='bg-blue-600 text-white px-8 py-3 text-base font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg'>
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;

// import React from 'react'
// import { assets } from '../assets/assets'

// const Contact = () => {
//   return (
//     <div>

//       <div className="text-center text-2xl pt-10 text-gray-500">
//         <p>CONTACT <span  className="text-gray-700 font-medium">US</span></p>
//       </div>

//       <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
//         <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />

//         <div className='flex flex-col justify-center items-start gap-6'>
//           <p className='font-semibold text-lg text-gray-600' >Our OFFICE</p>
//           <p className='text-gray-500'>54709 Willms Station <br />Suite 350, Washington, USA</p>
//           <p className='text-gray-500'>Tel: (415) 555‑0132 <br /> Email: rohitdev@gmail.com</p>
//           <p className='font-semibold text-lg text-gray-600'>Careers at DOCIENT</p>
//           <p className='text-gray-500'>Learn more about our teams and job openings.</p>
//           <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 '>Explore Jobs</button>
//         </div>
//       </div>
        
//     </div>
//   )
// }

// export default Contact