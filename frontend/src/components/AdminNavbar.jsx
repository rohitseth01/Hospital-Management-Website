import React, { useContext } from 'react'
import { assets } from '../assets/assets';
import { AdminContext } from './../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { DoctorContext } from './../context/DoctorContext';
import { toast } from 'react-toastify';

const AdminNavbar = () => {
    const { aToken, setAToken } = useContext(AdminContext)
    const { dToken, setDToken } = useContext(DoctorContext)

    const navigate = useNavigate()

    const currentRole = aToken ? 'Admin' : dToken ? 'Doctor' : 'Guest';

    const logout = () => {
        // Clear tokens for the authenticated user only
        if (aToken) {
            setAToken('')
            localStorage.removeItem('aToken')
        }

        if (dToken) {
            setDToken('')
            localStorage.removeItem('dToken')
        }

        toast.info(`Logged out from ${currentRole} Portal.`)
        navigate('/login') // Navigate back to the unified Admin/Doctor login page
    }

    return (
        <div className='flex justify-between items-center px-4 md:px-10 py-4 border-b border-gray-200 bg-white shadow-sm'>
            {/* Branding and Role Badge */}
            <div className='flex items-center gap-4'>
                {/* Note: Using admin_logo or regular logo with role text */}
                <img
                    className='w-28 sm:w-36 cursor-pointer'
                    src={assets.admin_logo}
                    alt="Docient Admin"
                />

                {/* Role Badge */}
                <p className='px-3 py-1 rounded-full text-xs font-semibold 
                          bg-blue-100 text-blue-700 border border-blue-300'>
                    {currentRole} Panel
                </p>
            </div>

            {/* Logout Button */}
            <button
                onClick={logout}
                className='bg-blue-600 text-white font-medium text-sm px-6 py-2 rounded-full 
                       hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg'
            >
                Logout
            </button>
        </div>
    )
}

export default AdminNavbar
