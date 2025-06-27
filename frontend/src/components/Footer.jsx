import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* ----Left section */}
            <div>
                <img className='mb-5 w-40' src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6 '>Precripto is a smart and efficient Hospital Management System designed to simplify and organize the day-to-day activities of hospitals and clinics. It provides a centralized platform for managing appointments, doctor schedules, patient records, prescriptions, and billing. Patients can easily book appointments, view their medical history, and receive prescriptions online, while doctors can manage their availability and access patient information securely. </p>
            </div>

            {/* ----Center section */}

            <div >
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li> <NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/about">About Us</NavLink></li>
                    <li><NavLink to="/contact">Contact us</NavLink></li>
                    <li><NavLink to="/">Privacy policy</NavLink></li>
                </ul>
                
            </div>

            {/* ----Right section */}

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+1-212-456-7890</li>
                    <li>prescripto@gmail.com</li>
                </ul>
            </div>

        </div>
        <div >
            {/* -----Copyright Text */}
            <hr />
            <p className='py-5 text-sm text-center'>Copyright © 2025 Prescripto - All Right Reserved.</p>
        </div>

    </div>
  )
}

export default Footer