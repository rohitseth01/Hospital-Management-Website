import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from './../models/doctorModel.js';
import appointmentModel from "../models/appointmentModel.js";
import razorpay from 'razorpay'


//API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !password || !email) {
      return res.json({ success: false, message: "Missing Details" });
    }
    //validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }
    //validating strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }

    //Hasing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);

    const user = await newUser.save();

    //we wil get _id by user on saving so we will use this for authorization
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API FOR USER LOGIN

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      console.log(token);

      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get user profile data

const getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to update user profile

const updateProfile = async (req, res) => {
  try {
    // const { userId, name, phone, address, dob, gender } = req.body;
    const { name, phone, address, dob, gender } = req.body;
    const userId = req.userId; 
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }
     let parsedAddress = {};
    if (address) {
      try {
        parsedAddress = JSON.parse(address);
      } catch (err) {
        return res.json({ success: false, message: "Invalid address format" });
      }
    }
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: parsedAddress,
      dob,
      gender,
    });

    if (imageFile) {
      //upload image to clodinary

      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API TO book appointment

const  bookAppointment=async(req,res)=>{
  try {
     const userId = req.userId;  // get userId from middleware (authUser)
    const {docId,slotDate,slotTime}=req.body;

    const docData=await doctorModel.findById(docId).select('-password')

    if(!docData.available){
      return res.json({success:false,message:'Doctor not available'})
    }

    let slots_booked=docData.slots_booked

    //checking for slot availablity
    if(slots_booked[slotDate]){
      if(slots_booked[slotDate].includes(slotTime)){
        return res.json({success:false,message:'Slot not available'})
      }else{
        slots_booked[slotDate].push(slotTime)
      }
    }else{
      slots_booked[slotDate]=[]
      slots_booked[slotDate].push(slotTime)
    }

    const userData=await userModel.findById(userId).select('-password')

    delete docData.slots_booked

    const appointmentData={
      userId,
      docId,
      userData,
      docData,
      amount:docData.fees,
      slotTime,
      slotDate,
      date:Date.now()
    }

    const newAppointment=new appointmentModel(appointmentData)

    await newAppointment.save()

    //save new slots data in docData

    await doctorModel.findByIdAndUpdate(docId,{slots_booked})

    res.json({success:true,message:'Appointment Booked'})
    
  } catch (error) {
     console.log(error);
    res.json({ success: false, message: error.message });
    
  }
}

//API to get user appointments for frontend my-appointmnets page

const listAppointment=async(req,res)=>{
  try {

    const userId = req.userId;  // get userId from middleware (authUser)
    const appointments=await appointmentModel.find({userId})

    res.json({success:true,appointments})
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//API to cancel appointment

const cancelAppointment=async(req,res)=>{
  try {
    const userId = req.userId;
    const {appointmentId}=req.body

    const appointmentData=await appointmentModel.findById(appointmentId)

    //verify appointment user

    if(appointmentData.userId!=userId){
      return res.json({success:false,message:"Unauthorized action"})
    }

    await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})

    //releasing doctor slot

    const {docId,slotDate,slotTime}=appointmentData

    const doctorData=await doctorModel.findById(docId)

    let slots_booked=doctorData.slots_booked

    slots_booked[slotDate]=slots_booked[slotDate].filter(e=>e!==slotTime)

    await doctorModel.findByIdAndUpdate(docId,{slots_booked})

    res.json({success:true,message:'Appointment Cancelled'})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


//API to  make payment of appoinment using razorpay

const paymentRazorpay=async(req,res)=>{

}





// const getProfile=async(req,res)=>{
//   try {

//     const {userId}=req.body

//     const userData=await userModel.findById(userId).select('-password')

//     res.json({success:true,userData})

//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// }

export { registerUser, loginUser, getProfile, updateProfile,bookAppointment,listAppointment,cancelAppointment};
