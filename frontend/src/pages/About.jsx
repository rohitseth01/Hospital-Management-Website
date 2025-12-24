import React from "react";
import { assets } from "./../assets/assets";

/* changes start */
const About = () => {
    return (
        <div className="py-8 md:py-12 animate-fade-in-up">
            {/* ------- ABOUT US HEADER ------- */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900">
                    ABOUT <span className="text-blue-600">US</span>
                </h1>
            </div>

            {/* ------- MAIN CONTENT: IMAGE AND NARRATIVE ------- */}
            <div className="my-10 flex flex-col md:flex-row items-center gap-10 md:gap-16">
                {/* Image */}
                <img
                    className="w-full md:w-1/2 lg:w-[400px] h-auto object-cover rounded-xl shadow-2xl transition-transform hover:scale-[1.02] duration-500"
                    src={assets.about_image}
                    alt="Healthcare professional working with a tablet"
                />

                {/* Narrative Text */}
                <div className="flex flex-col justify-center gap-6 text-base text-gray-600 leading-relaxed font-light">
                    <p>
                        Welcome to <span className="font-semibold text-gray-800">Docient</span>, your trusted partner in managing your
                        healthcare needs conveniently and efficiently. At Docient, we
                        understand the challenges individuals face when it comes to
                        scheduling doctor appointments and managing their health records.
                    </p>
                    <p>
                        Docient is committed to excellence in healthcare technology. We
                        continuously strive to enhance our platform, integrating the latest
                        advancements to improve user experience and deliver superior
                        service. Whether you're booking your first appointment or managing
                        ongoing care, <span className="font-semibold text-gray-800">Docient</span> is here to support you every step of the
                        way.
                    </p>

                    <div className="mt-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Our Vision</h3>
                        <p>
                            Our vision at Docient is to create a seamless healthcare
                            experience for every user. We aim to bridge the gap between patients
                            and healthcare providers, making it easier for you to access the
                            care you need, when you need it.
                        </p>
                    </div>
                </div>
            </div>

            {/* ------- WHY CHOOSE US HEADER ------- */}
            <div className="text-center my-16">
                <h2 className="text-3xl font-bold text-gray-900">
                    WHY <span className="text-blue-600">CHOOSE US</span>
                </h2>
            </div>

            {/* ------- FEATURE CARDS ------- */}
            <div className="flex flex-col md:flex-row mb-20 gap-6">
                {/* Card 1: Efficiency */}
                <div className="flex-1 p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 text-gray-600 transition-all duration-300 cursor-pointer 
                        hover:bg-blue-600 hover:text-white hover:shadow-xl hover:-translate-y-2">
                    <b className="text-xl font-bold">Efficiency</b>
                    <p className="text-base leading-relaxed">Streamlined appointment scheduling that fits into your busy lifestyle.</p>
                </div>

                {/* Card 2: Convenience */}
                <div className="flex-1 p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 text-gray-600 transition-all duration-300 cursor-pointer 
                        hover:bg-blue-600 hover:text-white hover:shadow-xl hover:-translate-y-2">
                    <b className="text-xl font-bold">Convenience</b>
                    <p className="text-base leading-relaxed">Access to a network of trusted healthcare professionals in your area.</p>
                </div>

                {/* Card 3: Personalization */}
                <div className="flex-1 p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 text-gray-600 transition-all duration-300 cursor-pointer 
                        hover:bg-blue-600 hover:text-white hover:shadow-xl hover:-translate-y-2">
                    <b className="text-xl font-bold">Personalization</b>
                    <p className="text-base leading-relaxed">Tailored recommendations and reminders to help you stay on top of your health.</p>
                </div>
            </div>
        </div>
    );
};
/* changes end */

export default About;
