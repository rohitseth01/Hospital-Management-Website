import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "./../context/AppContext";

/* changes start */
const Doctors = () => {
    const navigate = useNavigate();
    const { speciality } = useParams();
    const [filterDoc, setFilterDoc] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const { doctors } = useContext(AppContext);

    // List of all possible specialities
    const specialitiesList = [
        "General physician",
        "Gynecologist",
        "Dermatologist",
        "Pediatricians",
        "Neurologist",
        "Gastroenterologist",
    ];

    const applyFilter = () => {
        // Start with all doctors
        const allDoctors = doctors;
        if (speciality) {
            setFilterDoc(allDoctors.filter(doc => doc.speciality === speciality));
        } else {
            setFilterDoc(allDoctors);
        }
    };

    useEffect(() => {
        applyFilter();
    }, [doctors, speciality]);

    const handleFilterClick = (selectedSpeciality) => {
        if (speciality === selectedSpeciality) {
            navigate('/doctors');
        } else {
            navigate(`/doctors/${selectedSpeciality}`);
        }
        setShowFilter(false);
    };

    return (
        <div className="py-10 animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Specialists</h1>
            <p className="text-gray-500 mb-10 text-base max-w-2xl">
                Browse through our trusted list of {speciality ? <span className="font-semibold text-blue-600">{speciality}</span> : 'expert'} specialists and book your appointment with confidence.
            </p>

            {/* Main Layout: Filter Sidebar (Fixed Width) and Doctor Grid (Responsive) */}
            <div className="flex flex-col md:flex-row items-start gap-8">

                {/* Filter Button (Mobile Only) */}
                <button
                    onClick={() => setShowFilter(prev => !prev)}
                    className={`py-3 px-6 border rounded-lg font-semibold text-sm transition-all md:hidden w-full flex items-center justify-between
                     ${showFilter ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 shadow-sm'}`}
                >
                    <span>{showFilter ? 'Hide Filters' : 'Show Filters'}</span>
                    <svg className={`w-4 h-4 transform transition-transform ${showFilter ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </button>

                {/* Filter Sidebar */}
                <div
                    className={`
            flex-col gap-2 p-5 bg-white rounded-xl shadow-sm border border-gray-100 
            w-full md:w-72 flex-shrink-0 
            transition-all duration-300
            ${showFilter ? "flex" : 'hidden md:flex'} 
          `}
                >
                    <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Specialities</h3>

                    <p
                        onClick={() => { navigate('/doctors'); setShowFilter(false); }}
                        className={`
              py-2.5 px-4 rounded-lg cursor-pointer transition-all text-sm font-medium border
              ${!speciality
                                ? "bg-blue-50 text-blue-700 border-blue-100 shadow-sm"
                                : "bg-white text-gray-600 border-transparent hover:bg-gray-50 hover:text-gray-900"} 
            `}
                    >
                        All Doctors
                    </p>

                    {specialitiesList.map((spec) => (
                        <p
                            key={spec}
                            onClick={() => handleFilterClick(spec)}
                            className={`
                py-2.5 px-4 rounded-lg cursor-pointer transition-all text-sm font-medium border
                ${speciality === spec
                                    ? "bg-blue-50 text-blue-700 border-blue-100 shadow-sm"
                                    : "bg-white text-gray-600 border-transparent hover:bg-gray-50 hover:text-gray-900"} 
              `}
                        >
                            {spec}
                        </p>
                    ))}
                </div>

                {/* Doctor Grid */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {filterDoc.length > 0 ? (
                        filterDoc.map((item, index) => (
                            <div
                                onClick={() => navigate(`/appointment/${item._id}`)}
                                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer 
                           hover:shadow-xl hover:-translate-y-2 transition-all duration-500 relative"
                                key={index}
                            >
                                {/* Image Section */}
                                <div className="relative overflow-hidden bg-blue-50 h-64 flex items-end justify-center">
                                    <img
                                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                        src={item.image}
                                        alt={item.name}
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    {/* Status Badge */}
                                    <div className={`absolute top-4 right-4 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1.5 ${item.available ? 'bg-white/90 text-green-700' : 'bg-white/90 text-red-700'}`}>
                                        <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                        {item.available ? 'Available' : 'Busy'}
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6">
                                    <p className="text-gray-900 text-xl font-semibold mb-1 group-hover:text-blue-600 transition-colors">
                                        {item.name}
                                    </p>
                                    <p className="text-gray-500 text-sm font-medium mb-4">
                                        {item.speciality}
                                    </p>

                                    <div className="flex items-center justify-between mt-4">
                                        <button className="text-blue-600 text-sm font-semibold group-hover:underline">
                                            Book Now
                                        </button>
                                        <span className="text-gray-300 text-sm">
                                            Details &rarr;
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400">
                            <p className="text-lg font-medium">No doctors found.</p>
                            <p className="text-sm">Try modifying your filters.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};
/* changes end */

export default Doctors;
