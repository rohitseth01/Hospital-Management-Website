import React, { useState, useEffect, useRef, useContext } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

/* changes start */
const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const { token, setToken, userData } = useContext(AppContext);
    const dropdownRef = useRef();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const logout = () => {
        setToken(false);
        localStorage.removeItem("token");
        navigate("/"); // Navigate home after logout
    };

    // --- NavLink Styling Helper ---
    const getNavLinkClasses = ({ isActive }) =>
        `py-1 px-2 transition-all duration-300 relative group font-medium ${isActive
            ? "text-blue-600 after:w-full"
            : "text-gray-700 hover:text-blue-600 after:w-0 hover:after:w-full"
        } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300`;


    return (
        <div className="bg-white/90 backdrop-blur-lg border-b border-gray-100 transition-all sticky top-0 z-50">
            <div className="flex items-center justify-between text-sm py-4 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <img
                    onClick={() => navigate("/")}
                    className="w-44 cursor-pointer hover:opacity-90 transition-opacity"
                    src={assets.logo}
                    alt="Docient Logo"
                />

                {/* Desktop NavLinks */}
                <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <NavLink to="/" className={getNavLinkClasses}>
                        HOME
                    </NavLink>
                    <NavLink to="/doctors" className={getNavLinkClasses}>
                        ALL DOCTORS
                    </NavLink>
                    <NavLink to="/about" className={getNavLinkClasses}>
                        ABOUT
                    </NavLink>
                    <NavLink to="/contact" className={getNavLinkClasses}>
                        CONTACT
                    </NavLink>
                </ul>

                {/* Auth/Profile Section & Mobile Menu Button */}
                <div className="flex items-center gap-4" ref={dropdownRef}>
                    {token && userData ? (

                        <div className="relative group">
                            <div
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                            >
                                <img
                                    className="w-9 h-9 object-cover rounded-full border border-gray-200"
                                    src={userData.image || assets.profile_pic} // Fallback to a default profile pic
                                    alt="profile"
                                />
                                <img
                                    className={`w-2.5 transform transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`}
                                    src={assets.dropdown_icon}
                                    alt="dropdown"
                                />
                            </div>

                            {showDropdown && (
                                <div className="absolute top-12 right-0 min-w-52 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-fade-in-down">
                                    <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                                        <p className="text-sm font-semibold text-gray-900 truncate">{userData.name || 'User'}</p>
                                    </div>
                                    <div className="flex flex-col p-2 text-sm font-medium text-gray-700">
                                        <p onClick={() => { navigate("/my-profile"); setShowDropdown(false); }}
                                            className="px-3 py-2 hover:bg-blue-50 hover:text-blue-600 rounded-lg cursor-pointer transition-colors flex items-center gap-2"
                                        > My Profile </p>
                                        <p onClick={() => { navigate("/my-appointments"); setShowDropdown(false); }}
                                            className="px-3 py-2 hover:bg-blue-50 hover:text-blue-600 rounded-lg cursor-pointer transition-colors flex items-center gap-2"
                                        > My Appointments </p>
                                        <div className="h-px bg-gray-100 my-1"></div>
                                        <p onClick={() => { logout(); setShowDropdown(false); }}
                                            className="px-3 py-2 hover:bg-red-50 hover:text-red-600 rounded-lg cursor-pointer transition-colors flex items-center gap-2"
                                        > Logout </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (

                        <button
                            onClick={() => navigate("/login")}
                            className="bg-blue-600 text-white px-7 py-2.5 rounded-full font-medium hidden md:block cursor-pointer
                        hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Create Account
                        </button>
                    )}

                    {/* Hamburger for Mobile */}
                    <img
                        onClick={() => setShowMenu(true)}
                        className="w-6 md:hidden cursor-pointer hover:opacity-70 transition-opacity"
                        src={assets.menu_icon}
                        alt="menu"
                    />

                    {/* Mobile Sidebar Overlay */}
                    <div
                        className={`${showMenu ? "fixed w-full backdrop-blur-sm bg-black/40" : "h-0 w-0"
                            } md:hidden right-0 top-0 bottom-0 z-[100] transition-all duration-300`}
                    >
                        {/* Actual Menu Container */}
                        <div className={`${showMenu ? "translate-x-0" : "translate-x-full"} absolute right-0 top-0 bottom-0 w-3/4 max-w-xs bg-white shadow-2xl transition-transform duration-300 flex flex-col`}>
                            <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100">
                                <img className="w-32" src={assets.logo} alt="logo" />
                                <div
                                    className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition-colors"
                                    onClick={() => setShowMenu(false)}
                                >
                                    <img className="w-6" src={assets.cross_icon} alt="close" />
                                </div>
                            </div>
                            <ul className="flex flex-col gap-2 mt-4 px-4 text-base font-semibold text-gray-600">
                                <NavLink onClick={() => setShowMenu(false)} to="/" className={({ isActive }) => `block px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}>
                                    Home
                                </NavLink>
                                <NavLink onClick={() => setShowMenu(false)} to="/doctors" className={({ isActive }) => `block px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}>
                                    ALL DOCTORS
                                </NavLink>
                                <NavLink onClick={() => setShowMenu(false)} to="/about" className={({ isActive }) => `block px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}>
                                    ABOUT
                                </NavLink>
                                <NavLink onClick={() => setShowMenu(false)} to="/contact" className={({ isActive }) => `block px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}>
                                    CONTACT
                                </NavLink>

                                {!token && (
                                    <button
                                        onClick={() => { navigate("/login"); setShowMenu(false); }}
                                        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold mt-6 hover:bg-blue-700 transition-colors shadow-md"
                                    >
                                        Create Account
                                    </button>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
/* changes end */

export default Navbar;
