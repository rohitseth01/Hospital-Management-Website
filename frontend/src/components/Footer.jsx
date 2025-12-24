import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom';

/* changes start */
const Footer = () => {
    return (
        <div className='bg-white border-t border-gray-100 mt-20 pt-16'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-5 text-sm'>

                    {/* Left Section */}
                    <div>
                        <img className='mb-6 w-44' src={assets.logo} alt="Docient Logo" />
                        <p className='w-full md:w-3/4 text-gray-500 leading-7 text-sm'>
                            Docient is a smart and efficient Hospital Management System designed to simplify and organize the day-to-day activities of hospitals and clinics. Patients can easily book appointments, view their medical history, and receive prescriptions online.
                        </p>
                    </div>

                    {/* Middle Section */}
                    <div>
                        <p className='text-lg font-semibold mb-6 text-gray-900 tracking-wide'>COMPANY</p>
                        <ul className='flex flex-col gap-3 text-gray-500 font-medium'>
                            <li> <NavLink to="/" className='hover:text-blue-600 transition-colors inline-block hover:translate-x-1 duration-200'>Home</NavLink></li>
                            <li><NavLink to="/about" className='hover:text-blue-600 transition-colors inline-block hover:translate-x-1 duration-200'>About Us</NavLink></li>
                            <li><NavLink to="/contact" className='hover:text-blue-600 transition-colors inline-block hover:translate-x-1 duration-200'>Contact us</NavLink></li>
                            <li><NavLink to="/" className='hover:text-blue-600 transition-colors inline-block hover:translate-x-1 duration-200'>Privacy policy</NavLink></li>
                        </ul>
                    </div>

                    {/* Right Section */}
                    <div>
                        <p className='text-lg font-semibold mb-6 text-gray-900 tracking-wide'>GET IN TOUCH</p>
                        <ul className='flex flex-col gap-3 text-gray-500 font-medium'>
                            <li className='flex items-center gap-2 group cursor-pointer'>
                                <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                    </svg>
                                </span>
                                +1-212-456-7890
                            </li>
                            <li className='flex items-center gap-2 group cursor-pointer'>
                                <span className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                    </svg>
                                </span>
                                docient@gmail.com
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Copyright */}
                <div className="border-t border-gray-100 py-6 mt-10">
                    <p className='text-sm text-center text-gray-400 font-medium'>
                        Copyright © 2025 Docient - All Right Reserved.
                    </p>
                </div>
            </div>
        </div>
    )
}
/* changes end */

export default Footer