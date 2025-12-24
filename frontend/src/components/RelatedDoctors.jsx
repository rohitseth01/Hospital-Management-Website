import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from './../context/AppContext';
import { useNavigate } from 'react-router-dom';

/* changes start */
const RelatedDoctors = ({ speciality, docId }) => {

    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        }
    }, [doctors, speciality, docId])

    return (
        <div className='flex flex-col items-center gap-6 py-16 text-gray-900 border-t border-gray-100 mt-24'>
            <div className="text-center mb-4">
                <h1 className='text-3xl font-bold text-gray-900'>Related Specialists</h1>
                <p className='text-gray-500 mt-2 max-w-lg mx-auto'>
                    Expert doctors in the same field who can assist with your medical needs.
                </p>
            </div>

            <div
                className='w-full grid gap-6 px-4 sm:px-0'
                style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}
            >
                {
                    relDoc.slice(0, 5).map((item, index) => (
                        <div
                            onClick={() => {
                                navigate(`/appointment/${item._id}`);
                                scrollTo(0, 0);
                            }}
                            className="group bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer 
                           hover:shadow-xl hover:-translate-y-2 transition-all duration-500 relative"
                            key={index}
                        >
                            {/* Image Section */}
                            <div className="relative overflow-hidden bg-blue-50 h-56 flex items-end justify-center">
                                <img
                                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                    src={item.image}
                                    alt={item.name}
                                />

                                {/* Status Badge */}
                                <div className={`absolute top-3 right-3 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1.5 ${item.available ? 'bg-white/90 text-green-700' : 'bg-white/90 text-red-700'}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    {item.available ? 'Available' : 'Busy'}
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-5">
                                <p className="text-gray-900 text-lg font-semibold mb-1 group-hover:text-blue-600 transition-colors">
                                    {item.name}
                                </p>
                                <p className="text-gray-500 text-sm font-medium">
                                    {item.speciality}
                                </p>
                                <div className="flex items-center justify-between mt-4 border-t border-gray-50 pt-3">
                                    <span className="text-xs text-yellow-500 font-bold flex gap-0.5">★★★★★</span>
                                    <span className="text-blue-600 text-xs font-bold uppercase tracking-wide">View Profile</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* More Button */}
            <button
                onClick={() => (navigate('/doctors'), scrollTo(0, 0))}
                className='bg-transparent border border-gray-300 text-gray-600 px-10 py-3 rounded-full mt-10 
                   hover:bg-blue-600 hover:text-white hover:border-transparent transition-all duration-300 font-medium'
            >
                View All Doctors
            </button>
        </div>
    )
}
/* changes end */

export default RelatedDoctors