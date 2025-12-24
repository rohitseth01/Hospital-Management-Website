import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

/* changes start */
const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    return (
        <div className="flex flex-col items-center gap-6 my-20 text-gray-900 md:mx-10 animate-fade-in-up">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Top Doctors to Book</h1>
                <p className="sm:w-3/4 max-w-md mx-auto text-center text-sm text-gray-500 leading-6">
                    Simply browse through our extensive list of trusted doctors and book your appointment in seconds.
                </p>
            </div>

            <div
                className="w-full grid gap-6 pt-8 px-4 sm:px-0"
                style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
            >
                {doctors.slice(0, 10).map((item, index) => (
                    <div
                        onClick={() => {
                            navigate(`/appointment/${item._id}`);
                            scrollTo(0, 0);
                        }}
                        className="group bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer 
                       hover:shadow-xl hover:-translate-y-2 transition-all duration-500 relative"
                        key={index}
                    >
                        {/* Image Container with Gradient Overlay on Hover */}
                        <div className="relative overflow-hidden bg-blue-50 h-64 flex items-end justify-center">
                            <img
                                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                src={item.image}
                                alt={item.name}
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            {/* Status Badge */}
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1.5">
                                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                <span className={item.available ? 'text-green-700' : 'text-red-700'}>
                                    {item.available ? 'Available' : 'Busy'}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <p className="text-gray-900 text-xl font-semibold mb-1 group-hover:text-blue-600 transition-colors">
                                {item.name}
                            </p>
                            <p className="text-gray-500 text-sm font-medium mb-3">
                                {item.speciality}
                            </p>

                            <div className="w-full h-0.5 bg-gray-50 mb-3 group-hover:bg-blue-50 transition-colors"></div>

                            <div className="flex items-center justify-between text-xs text-gray-400">
                                <span>{item.degree || 'MBBS'}</span>
                                <span className="flex items-center gap-1 text-yellow-500">
                                    ★★★★★
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => { navigate("/doctors"); scrollTo(0, 0); }}
                className="bg-white border border-gray-300 text-gray-600 px-12 py-3.5 rounded-full mt-12 font-medium 
                   hover:bg-blue-600 hover:text-white hover:border-transparent hover:shadow-lg transition-all duration-300"
            >
                View All Doctors
            </button>
        </div>
    );
};
/* changes end */

export default TopDoctors;
