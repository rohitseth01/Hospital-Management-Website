import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
    const { dToken, getDashData, dashData, completeAppointment, cancelAppointment } =
        useContext(DoctorContext);

    const { currency } = useContext(AppContext);
    const { slotDateFormat } = useContext(AppContext);

    useEffect(() => {
        if (dToken) {
            getDashData();
        }
    }, [dToken]);

    // --- Action Button Component ---
    const ActionButton = ({ onClick, type }) => {
        const isCancel = type === 'cancel';
        const colorClass = isCancel ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600';
        const icon = isCancel ? '×' : '✓';
        const title = isCancel ? 'Cancel Appointment' : 'Complete Appointment';

        return (
            <button
                onClick={onClick}
                className={`w-8 h-8 rounded-full ${colorClass} flex items-center justify-center text-white text-xl font-bold transition-colors shadow-md`}
                title={title}
            >
                {icon}
            </button>
        );
    };

    // --- Loading State ---
    if (!dashData) {
        return (
            <div className="p-4 md:p-8 w-full flex items-center justify-center min-h-[50vh]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading dashboard data...</p>
                </div>
            </div>
        );
    }

    // --- Main Render ---
    return (
        <div className="p-4 md:p-8 w-full">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Overview</h1>

            {/* 1. Metric Cards (KPIs) */}
            <div className="flex flex-wrap gap-6 mb-12">
                {/* Earnings Card */}
                <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-lg border border-gray-100 min-w-60 flex-1 cursor-pointer hover:shadow-xl transition-all duration-300">
                    <img className="w-12 h-12" src={assets.earning_icon} alt="Earnings" />
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Earnings</p>
                        <p className="text-3xl font-bold text-gray-800">
                            {currency} {dashData.earnings}
                        </p>
                    </div>
                </div>

                {/* Appointments Card */}
                <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-lg border border-gray-100 min-w-60 flex-1 cursor-pointer hover:shadow-xl transition-all duration-300">
                    <img className="w-12 h-12" src={assets.appointments_icon} alt="Appointments" />
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Appointments</p>
                        <p className="text-3xl font-bold text-blue-600">
                            {dashData.appointments}
                        </p>
                    </div>
                </div>

                {/* Patients Card */}
                <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-lg border border-gray-100 min-w-60 flex-1 cursor-pointer hover:shadow-xl transition-all duration-300">
                    <img className="w-12 h-12" src={assets.patients_icon} alt="Patients" />
                    <div>
                        <p className="text-sm font-medium text-gray-500">Unique Patients</p>
                        <p className="text-3xl font-bold text-green-600">
                            {dashData.patients}
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. Latest Bookings */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">

                <div className="flex items-center gap-3 px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <img className="w-5 h-5" src={assets.list_icon} alt="list" />
                    <p className="text-lg font-semibold text-gray-800">Latest Pending Bookings</p>
                </div>

                <div className="divide-y divide-gray-100">
                    {dashData.latestAppointment && dashData.latestAppointment.length > 0 ? (
                        dashData.latestAppointment.map((item, index) => (
                            <div
                                className="flex items-center justify-between px-6 py-4 hover:bg-blue-50/50 transition-colors"
                                key={index}
                            >

                                <div className="flex items-center gap-4 flex-1">
                                    <img
                                        className="rounded-full w-10 h-10 object-cover border border-gray-200"
                                        src={item.userData.image || assets.user_icon}
                                        alt={item.userData.name}
                                    />
                                    <div className="text-sm">
                                        <p className="text-gray-900 font-semibold">
                                            {item.userData.name}
                                        </p>
                                        <p className="text-gray-600 text-xs">
                                            {slotDateFormat(item.slotDate)} at {item.slotTime}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions/Status */}
                                <div className="flex items-center gap-3">
                                    {item.cancelled ? (
                                        <p className="text-red-500 text-xs font-semibold">Cancelled</p>
                                    ) : item.isCompleted ? (
                                        <p className="text-green-500 text-xs font-semibold">Completed</p>
                                    ) : (
                                        <div className="flex gap-3">
                                            <ActionButton onClick={() => cancelAppointment(item._id)} type="cancel" />
                                            <ActionButton onClick={() => completeAppointment(item._id)} type="complete" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-10">No latest appointments found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
