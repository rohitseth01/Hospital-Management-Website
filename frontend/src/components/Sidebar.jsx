import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
    const { aToken } = useContext(AdminContext)
    const { dToken } = useContext(DoctorContext)

    // Determine the current role to decide which links to display
    const isDoctor = !!dToken;
    const isAdmin = !!aToken;

    // Define link items based on role
    const adminLinks = [
        { to: "/admin-dashboard", icon: assets.home_icon, label: "Dashboard" },
        { to: "/all-appointments", icon: assets.appointment_icon, label: "Appointments" },
        { to: "/add-doctor", icon: assets.add_icon, label: "Add Doctor" },
        { to: "/doctor-list", icon: assets.people_icon, label: "Doctor List" },
    ];

    const doctorLinks = [
        { to: "/doctor-dashboard", icon: assets.home_icon, label: "Dashboard" },
        { to: "/doctor-appointments", icon: assets.appointment_icon, label: "Appointments" },
        { to: "/doctor-profile", icon: assets.people_icon, label: "Profile" },
    ];

    const links = isAdmin ? adminLinks : isDoctor ? doctorLinks : [];

    return (
        <div className="min-h-screen border-r border-gray-200 bg-white shadow-inner
                    w-16 md:w-64 transition-all duration-300 flex-shrink-0">

            <ul className="text-gray-700 pt-5 space-y-2">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                            `flex items-center gap-4 py-3 px-3 cursor-pointer transition-all duration-200 
               md:pl-6 text-base font-medium relative group
               ${isActive
                                ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600'
                                : 'hover:bg-gray-50 text-gray-600'
                            }`
                        }
                    >
                        {/* Icon Area */}
                        <img className="w-5 h-5 mx-auto md:mx-0 object-contain" src={link.icon} alt={link.label} />

                        {/* Label Area (hidden on small screens, shown on md screens and up) */}
                        <p className='hidden md:block'>{link.label}</p>

                        {/* Tooltip for small screens */}
                        <span className="md:hidden absolute left-14 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                            {link.label}
                        </span>
                    </NavLink>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar
