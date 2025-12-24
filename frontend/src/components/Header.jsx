import React from 'react';
import { assets } from '../assets/assets';

/* changes start */
const Header = () => {
    return (
        <div className='flex flex-col md:flex-row flex-wrap bg-blue-600 rounded-2xl px-6 md:px-16 lg:px-20 overflow-hidden shadow-xl shadow-blue-200 my-8'>

            {/* ---- Left Side (Text Content) ---- */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-10 md:py-20 z-10 relative'>
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,_rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>

                <p className='text-3xl md:text-5xl lg:text-6xl text-white font-bold leading-tight drop-shadow-sm'>
                    Book Appointment <br />
                    <span className="font-light opacity-90">With Trusted Doctors</span>
                </p>

                {/* Subtext and Group Profiles */}
                <div className='flex flex-col md:flex-row items-center gap-4 text-white text-sm font-light opacity-90'>
                    <img className='w-28 flex-shrink-0 drop-shadow-md' src={assets.group_profiles} alt="Group Profiles" />
                    <p className='mt-2 md:mt-0 leading-relaxed max-w-sm'>
                        Simply browse through our extensive list of trusted doctors,
                        schedule your appointment hassle-free.
                    </p>
                </div>

                {/* Primary Call-to-Action (CTA) */}
                <a
                    href="#speciality"
                    className='flex items-center gap-3 bg-white px-8 py-3.5 rounded-full text-blue-600 text-sm md:text-base font-semibold 
                     hover:scale-105 hover:shadow-2xl hover:bg-gray-50 transition-all duration-300 mt-4 group'
                >
                    Book Appointment
                    <img className='w-3 group-hover:translate-x-1 transition-transform' src={assets.arrow_icon} alt="Arrow" />
                </a>
            </div>

            {/* ---- Right Side (Image) ---- */}
            <div className='md:w-1/2 relative flex items-end justify-end'>
                <img
                    className='w-full lg:w-[90%] h-auto rounded-lg object-contain relative -bottom-2 z-10 drop-shadow-xl'
                    src={assets.header_img}
                    alt="Trusted Doctors"
                />
                {/* Background decorative blob */}
                <div className="absolute bottom-0 right-0 w-full h-3/4 bg-white/5 blur-3xl rounded-full translate-y-1/4"></div>
            </div>
        </div>
    );
};
/* changes end */

export default Header;
