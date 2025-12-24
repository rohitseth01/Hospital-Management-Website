import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from './../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {

  const {docId}=useParams()
  const {doctors,currencySymbol,backendUrl,token,getDoctorsData}=useContext(AppContext)
  
  // Use full weekday names for better clarity
  const daysOfWeek=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

  const navigate=useNavigate()

  const [docInfo,setDocInfo]=useState(null)

  const [docSlots,setDocSlots]=useState([])
  const [slotIndex,setSlotIndex]=useState(0)
  const [slotTime,setSlotTime]=useState('')

  const fetchDocInfo=async()=>{
    const docInfo=doctors.find(doc=>doc._id===docId)
    setDocInfo(docInfo)

  }

  const getAvailableSlots=async()=>{
    if(!docInfo) return; // Ensure docInfo is available

    setDocSlots([])
    setSlotIndex(0) // Reset index when slots are recalculated
    setSlotTime('') // Reset time when slots are recalculated

    // getting current date
    let today=new Date()

    for(let i=0;i<7;i++){
      //getting date with index
      let currentDate=new Date(today)
      currentDate.setDate(today.getDate()+i)

      //setting end time of the date with index (9 PM)
      let endTime=new Date()
      endTime.setDate(today.getDate()+i)
      endTime.setHours(21,0,0,0)
      
      //setting start time
      if(today.getDate()===currentDate.getDate()){
        // Start 1 hour from now, or 10 AM, whichever is later
        const startHour = today.getHours() + 1;
        currentDate.setHours(startHour > 10 ? startHour : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0) // Align to 30 or 0 minute mark
      }else{
        currentDate.setHours(10) // Start at 10 AM for future days
        currentDate.setMinutes(0)
      }

      let timeSlots=[]

      while(currentDate<endTime){
        // Only display in 12-hour format
        let formattedTime=currentDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})

        let day=currentDate.getDate()
        let month=currentDate.getMonth()+1
        let year=currentDate.getFullYear()

        const slotDate=day+ "_" + month + "_" +year
        const slotTimeFormatted=formattedTime

        // Check if slot is booked (using the backend format)
        const isSlotAvailable = docInfo.slots_booked && docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTimeFormatted) ? false : true

        if(isSlotAvailable){
          timeSlots.push({
            datetime:new Date(currentDate),
            time:formattedTime
          })
        }

        //increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes()+30)
      }
      setDocSlots(prev=>([...prev,timeSlots]))
    }
  }

  const bookAppointment=async()=>{
    if(!token){
      toast.warn('Login to book appointment')
      return navigate('/login')
    }

    if (!slotTime) {
      toast.error('Please select an available time slot.')
      return
    }

    try {
      
      // Ensure the selected slot day has elements
      if (!docSlots[slotIndex] || docSlots[slotIndex].length === 0) {
        toast.error('Selected date is unavailable.')
        return
      }

      const date=docSlots[slotIndex][0].datetime

      let day=date.getDate()
      let month=date.getMonth()+1 
      let year=date.getFullYear()

      const slotDate=day+ "_" + month + "_" +year
      
      const {data}=await axios.post(backendUrl+'/api/user/book-appointment',{docId,slotDate,slotTime},{headers:{token}})

      if(data.success){
        toast.success(data.message)
        getDoctorsData() // Refresh doctor data to update slot availability
        navigate('/my-appointments')
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'An error occurred during booking.')
    }

  }

  useEffect(()=>{
    fetchDocInfo()
  },[doctors,docId])

  useEffect(()=>{
    getAvailableSlots()
  },[docInfo])


  return docInfo && (
    <div className="py-8">
      
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Book an Appointment</h1>

      {/* ------- Doctor Details Section (Clean, Responsive Layout) */}

      <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8 bg-white rounded-xl shadow-lg border border-gray-100 mb-10">
        
        {/* Doctor Image Container */}
        <div className='flex-shrink-0 w-full md:w-80'>
          <img 
            className='w-full h-80 object-cover rounded-xl shadow-md bg-blue-50' 
            src={docInfo.image} 
            alt={docInfo.name} 
          />
        </div>

        {/* Doctor Details */}
        <div className='flex-1 pt-4 md:pt-0'> 
          {/* Name and Verification */}
          <h2 className='flex items-center gap-2 text-3xl font-bold text-gray-900 mb-1'>
            {docInfo.name}
            <img className='w-6' src={assets.verified_icon} alt="Verified" />
          </h2>

          {/* Degree/Speciality/Experience */}
          <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 mb-4'>
            <p className="text-blue-600 font-semibold">{docInfo.degree} - {docInfo.speciality}</p>
            <span className='py-0.5 px-3 border border-gray-300 text-xs rounded-full font-medium bg-gray-50'>
              {docInfo.experience} Experience
            </span>
          </div>

          {/* Doctor About */}
          <div className="mb-4">
            <h3 className='flex items-center gap-1 text-lg font-semibold text-gray-800 mb-1'>
              About
            </h3>
            <p className='text-sm text-gray-500 leading-relaxed max-w-2xl'>{docInfo.about}</p>
          </div>

          <p className='text-gray-600 font-semibold text-xl pt-4 border-t border-gray-100'>
            Appointment Fee: <span className='text-blue-700'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>


      {/* ----Booking Slots Section----- */}
      <div className='p-6 bg-white rounded-xl shadow-lg border border-gray-100 mb-10'>
        <h2 className='text-xl font-bold text-gray-800 mb-4 border-b pb-2'>Select Booking Slot</h2>
        
        {/* Date Picker (Days of the week) */}
        <div className='flex gap-4 items-center w-full overflow-x-auto py-2 mb-6'>
          {
            docSlots.length > 0 && docSlots.map((item,index)=>(
              item.length > 0 && ( // Only render if the day has available slots
                <div 
                  onClick={() => { setSlotIndex(index); setSlotTime(''); }} 
                  className={`
                    flex-shrink-0 flex flex-col items-center justify-center w-20 h-24 rounded-xl cursor-pointer transition-all border-2 
                    ${slotIndex===index ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'border-gray-200 text-gray-700 hover:bg-blue-50'}
                  `} 
                  key={index}
                >
                  <p className='text-xs font-medium uppercase'>{daysOfWeek[item[0].datetime.getDay()].substring(0,3)}</p>
                  <p className='text-2xl font-bold mt-1'>{item[0].datetime.getDate()}</p>
                  <p className='text-xs'>
                    {item[0].datetime.toLocaleDateString([], { month: 'short' })}
                  </p>
                </div>
              )
            ))
          }
        </div>

        {/* Time Slots */}
        <h3 className='text-lg font-semibold text-gray-800 mb-3 mt-6'>
          Available Times on {docSlots[slotIndex] && docSlots[slotIndex].length > 0 && docSlots[slotIndex][0].datetime.toLocaleDateString()}
        </h3>

        {docSlots.length > 0 && docSlots[slotIndex] && docSlots[slotIndex].length > 0 ? (
          <div className='flex flex-wrap items-center gap-3'>
            {docSlots[slotIndex].map((item,index)=>(
              <p 
                onClick={()=>setSlotTime(item.time)} 
                className={`
                  text-sm font-medium flex-shrink-0 px-4 py-2 rounded-full cursor-pointer transition-colors border 
                  ${item.time===slotTime ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-blue-100 hover:text-blue-700'}
                `} 
                key={index}
              >
                {item.time}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No time slots available for the selected day.</p>
        )}

        {/* Book Button (Primary Action) */}
        <button 
          onClick={bookAppointment}
          disabled={!slotTime} // Disabled if no slot is selected
          className={`
            font-semibold px-12 py-4 rounded-full mt-8 transition-all duration-300 w-full md:w-auto
            ${slotTime ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}
          `}
        >
          Book Appointment Now
        </button>
      </div>

      {/* Listing Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>  
      
    </div>
  )
}

export default Appointment

// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom';
// import { AppContext } from './../context/AppContext';
// import { assets } from '../assets/assets';
// import RelatedDoctors from '../components/RelatedDoctors';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// const Appointment = () => {

//   const {docId}=useParams()
//   const {doctors,currencySymbol,backendUrl,token,getDoctorsData}=useContext(AppContext)
//   const daysOfWeek=["SUN","MON","TUE","WED","THU","FRI","SAT"]

//   const navigate=useNavigate()

//   const [docInfo,setDocInfo]=useState(null)

//   const [docSlots,setDocSlots]=useState([])
//   const [slotIndex,setSlotIndex]=useState(0)
//   const [slotTime,setSlotTime]=useState('')

//   const fetchDocInfo=async()=>{
//     const docInfo=doctors.find(doc=>doc._id===docId)
//     setDocInfo(docInfo)

//   }

//   const getAvailableSlots=async()=>{
//     setDocSlots([])

//     // getting current date
//     let today=new Date()

//     for(let i=0;i<7;i++){
//       //getting date with index
//       let currentDate=new Date(today)
//       currentDate.setDate(today.getDate()+i)

//       //setting end time of the date with index
//       let endTime=new Date()
//       endTime.setDate(today.getDate()+i)
//       endTime.setHours(21,0,0,0)
      
//       //setting hours
//       if(today.getDate()===currentDate.getDate()){
//         currentDate.setHours(currentDate.getHours()>10 ?currentDate.getHours()+1 :10)
//         currentDate.setMinutes(currentDate.getMinutes()>30 ? 30 :0)
//       }else{
//         currentDate.setHours(10)
//         currentDate.setMinutes(0)
//       }

//       let timeSlots=[]

//       while(currentDate<endTime){
//         let formattedTime=currentDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})

//         let day=currentDate.getDate()
//         let month=currentDate.getMonth()+1
//         let year=currentDate.getFullYear()

//         const slotDate=day+ "_" + month + "_" +year
//         const slotTime=formattedTime

//         const isSlotAvailable=docInfo.slots_booked[slotDate]&& docInfo.slots_booked[slotDate].includes(slotTime)?false:true

//         if(isSlotAvailable){
          
//         //add slot to array
//         timeSlots.push({
//           datetime:new Date(currentDate),
//           time:formattedTime
//         })

//         }

//         //increment current time by 30 minutes
//         currentDate.setMinutes(currentDate.getMinutes()+30)
//       }
//       setDocSlots(prev=>([...prev,timeSlots]))
//     }
//   }

//   const bookAppointment=async()=>{
//     if(!token){
//       toast.warn('Login to book appointment')
//       return navigate('/login')
//     }

//     try {
      
//       const date=docSlots[slotIndex][0].datetime

//       let day=date.getDate()
//       let month=date.getMonth()+1 
//       let year=date.getFullYear()

//       const slotDate=day+ "_" + month + "_" +year
      
//       const {data}=await axios.post(backendUrl+'/api/user/book-appointment',{docId,slotDate,slotTime},{headers:{token}})

//       if(data.success){
//         toast.success(data.message)
//         getDoctorsData()
//         navigate('/my-appointments')
//       }else{
//         toast.error(data.message)
//       }

//     } catch (error) {
//       console.log(error);
//       toast.error(error.message)
//     }

//   }

//   useEffect(()=>{
//     fetchDocInfo()
//   },[doctors,docId])

//   useEffect(()=>{
//     getAvailableSlots()
//   },[docInfo])

//   useEffect(()=>{
//     console.log(docSlots);
//   },[docSlots])

//   return docInfo && (
//     <div>
//       {/* ------- Doctor Details */}

//       <div className='flex flex-col sm:flex-row gap-4'>
//         <div>
//           <img className='bg-blue-400 w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
//         </div>

//         <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'> 
//           {/* ----Doc info--name,degree,experience----- */}
//           <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
//             {docInfo.name}
//             <img className='w-5' src={assets.verified_icon} alt="" />
//           </p>

//           <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
//             <p>{docInfo.degree}-{docInfo.speciality}</p>
//             <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
//           </div>

//           {/* =----Doctor About ----*/}

//           <div>
//             <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
//               About
//               <img src={assets.info_icon} alt="" />
//             </p>
//             <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
//           </div>
//           <p className='text-gray-500 font-medium mt-4'>
//             Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span>
//           </p>
//         </div>
//       </div>

//       {/* ----Booking Slots--=-- */}
//       <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
//         <p>Booking slots</p>
//         <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
//           {
//             docSlots.length && docSlots.map((item,index)=>(
//               <div onClick={()=>setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex===index ? 'bg-blue-400 text-white' : 'border border-gray-200 '}`} key={index}>
//                 <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>

//                 <p>{item[0]&& item[0].datetime.getDate()}</p>

//               </div>
//             ))
//           }
//         </div>

//         <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
//           {docSlots.length && docSlots[slotIndex].map((item,index)=>(
//             <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time===slotTime ? 'bg-blue-400 text-white' : ' text-gray-400 border border-gray-200'}`} key={index}>
//               {item.time.toLowerCase()}
//             </p>
//           ))}
//         </div>

//         <button onClick={bookAppointment}  className='bg-blue-400 text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer'>Book an appointment</button>
//       </div>

//       {/* Listing Related Doctors */}
//       <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>  
      
//     </div>
//   )
// }

// export default Appointment